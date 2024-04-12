"use server";

import { supabase, supabaseAdmin } from "@/utils/supabaseClient";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

async function getInitialData() {
  const { data: eventData } = await supabase
    .from("Events")
    .select("*")
    .is("is_current_event", true);

  const { data: itemData } = await supabase.from("Items").select("*");

  //console.log("EVENT", eventData);
  return { eventData: eventData[0], itemData };
}

export const getCachedAppData = unstable_cache(
  async (data) => getInitialData(),
  ["initial-app-data"]
);

async function getSponsor(sponsorName) {
  const { data: sponsors } = await supabaseAdmin.from("Sponsors").select("*");

  const sponsor = sponsors.find(
    (sponsor) =>
      sponsor.company_name.toLowerCase() === sponsorName.toLowerCase()
  );

  return sponsor;
}

export async function checkoutSponsors(donationInfo) {
  const appData = await getCachedAppData();

  const sponsorItems = appData.itemData.filter(
    (item) => item.item_type === "sponsor"
  );
  const items = donationInfo.donations
    .filter((donation) => donation.quantity > 0)
    .map((donation) => ({
      quantity: `${donation.quantity}`,
      base_price_money: {
        amount:
          sponsorItems.find(
            (item) => item.item_id === donation.sponsorshipItemID
          ).cost * 100,
        currency: "USD",
      },
      item_type: "ITEM",
      name: sponsorItems.find(
        (item) => item.item_id === donation.sponsorshipItemID
      ).name,
    }));

  const { paymentLink, orderID } = await getPaymentLink(items);

  const sponsor = await getSponsor(donationInfo.sponsor.companyName);
  let sponsorID = "";

  if (!sponsor) {
    //create sponsor in database
    sponsorID = await addSponsor(donationInfo.sponsor);
  } else {
    sponsorID = sponsor.sponsor_id;
  }

  //add donations to database with sponsorID
  let donationArray = [];

  for (let donation of donationInfo.donations) {
    if (donation.quantity > 0) {
      for (let i = 0; i < donation.quantity; i++) {
        donationArray.push({
          item_id: donation.sponsorshipItemID,
          description: "website donation",
          event_id: appData.eventData.event_id,
          sponsor_id: sponsorID,
          paid: false,
          cc_order_id: orderID,
        });
      }
    }
  }
  addDonations(donationArray);

  redirect(paymentLink);
}

export async function checkoutAttendees(attendees) {
  const items = attendees.map((attendee) => ({
    quantity: "1",
    base_price_money: {
      amount: attendee.Cost * 100,
      currency: "USD",
    },
    item_type: "ITEM",
    name: `${attendee.FirstName} ${attendee.LastName} - ${attendee.EventType}`,
  }));
  const pmtLink = await getPaymentLink(items);

  redirect(pmtLink);
}

async function getPaymentLink(items, ccOrderID) {
  const squarePmtLink = process.env.SQUARE_PMT_LINK;
  const squareLocationID = process.env.SQUARE_LOCATION_ID;
  const squareAccessToken = process.env.SQUARE_DEV_ACCESS_TOKEN;

  let squareData = "";
  //***** ADD REDIRECT URL FOR PRODUCTION *******/
  const jsonData = {
    order: {
      description: "sponsor",
      line_items: items,
      location_id: squareLocationID,
      serviceCharges: [
        {
          name: "Credit Card Fee",
          percentage: "2.90",
          calculationPhase: "TOTAL_PHASE",
          taxable: false,
        },
      ],
    },
    checkoutOptions: {
      allowTipping: false,
      askForShippingAddress: false,
      enableCoupon: false,
      enableLoyalty: false,
    },
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${squareAccessToken}`,
      "Square-Version": "2024-02-22",
    },
    body: JSON.stringify(jsonData), // Convert JSON data to a string and set it as the request body
  };

  squareData = await fetch(process.env.SQUARE_DEV_LINK, options)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Request unsuccessful");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Handle the JSON data
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
    });

  const returnData = {
    paymentLink: squareData.payment_link.url,
    orderID: squareData.payment_link.order_id,
  };

  return returnData;
}

async function addSponsor(sponsorInfo) {
  const { data, error } = await supabaseAdmin
    .from("Sponsors")
    .insert([
      {
        company_name: sponsorInfo.companyName,
        contact_prefix: sponsorInfo.prefix,
        contact_first_name: sponsorInfo.firstName,
        contact_last_name: sponsorInfo.lastName,
        contact_phone_number: sponsorInfo.phoneNumber,
        contact_email: sponsorInfo.email,
        address1: sponsorInfo.address1,
        address2: sponsorInfo.address2,
        city: sponsorInfo.city,
        state: sponsorInfo.state,
        zip: sponsorInfo.zip,
      },
    ])
    .select();
  console.log("submitted request to add sponsor");

  if (error) {
    //email error to admin
    console.log("ERROR", error);
    return null;
  } else {
    return data[0].sponsor_id;
  }
}

async function addDonations(donationArray) {
  const { error } = await supabaseAdmin.from("Donations").insert(donationArray);

  if (error) {
    //email error to admin
    console.log("ERROR", error);
  }
}

export async function updateOrderPmtStatus(orderID) {
  //update matching donations or attendees with the payment order ID and set the paid column to TRUE
  console.log("UPDATING ORDER ID: ", orderID);

  try {
    const { donateData, donateError } = await supabaseAdmin
      .from("Donations")
      .update({ paid: "TRUE" })
      .eq("cc_order_id", orderID);
  } catch (err) {
    console.log("Error updating donations:", donationError);
  }

  try {
    const { attendeeData, attendeeError } = await supabaseAdmin
      .from("Attendees")
      .update({ paid: "TRUE" })
      .eq("cc_order_id", orderID);
  } catch (err) {
    console.log("Error updating attendees:", attendeeError);
  }

  console.log("Donation Update Response", donateData);
  console.log("Donation Update Error", donateError);
  console.log("Attendee Update Response", attendeeData);
  console.log("Attendee Update Error", attendeeError);
}

// export async function getSponsors() {
//   const { data: sponsors } = await supabaseAdmin.from("Sponsors").select("*");

//   return sponsors;
// }

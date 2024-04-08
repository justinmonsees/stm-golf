"use server";

import { supabase, supabaseAdmin } from "@/utils/supabaseClient";
import { unstable_cache } from "next/cache";

import { redirect } from "next/navigation";
import { get } from "react-hook-form";

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

export async function checkoutSponsors(donationInfo) {
  // const appData = await getCachedAppData();
  // const sponsorItems = appData.itemData.filter(
  //   (item) => item.item_type === "sponsor"
  // );
  // const items = donationInfo.donations
  //   .filter((donation) => donation.quantity > 0)
  //   .map((donation) => ({
  //     quantity: `${donation.quantity}`,
  //     base_price_money: {
  //       amount:
  //         sponsorItems.find(
  //           (item) => item.item_id === donation.sponsorshipItemID
  //         ).cost * 100,
  //       currency: "USD",
  //     },
  //     item_type: "ITEM",
  //     name: sponsorItems.find(
  //       (item) => item.item_id === donation.sponsorshipItemID
  //     ).name,
  //   }));
  // const pmtLink = await getPaymentLink(items);
  // redirect(pmtLink);
  addSponsor();

  console.log("sponsor added");
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

async function getPaymentLink(items) {
  const squarePmtLink = process.env.SQUARE_PMT_LINK;
  const squareLocationID = process.env.SQUARE_LOCATION_ID;
  const squareAccessToken = process.env.SQUARE_DEV_ACCESS_TOKEN;

  let pmtLink = "";

  //***** ADD REDIRECT URL FOR PRODUCTION *******/
  const jsonData = {
    order: {
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

  pmtLink = fetch(process.env.SQUARE_DEV_LINK, options)
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
      return data.payment_link.url;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
    });

  return pmtLink;
}

// async function addSponsor() {
//   const { error } = await supabaseAdmin.from("Sponsors").insert([
//     {
//       name: "Joes Plumbing",
//       contact_prefix: "Mr.",
//       contact_first_name: "John",
//       contact_last_name: "Smith",
//       contact_phone_number: "631-888-9900",
//       contact_email: "john@joesplumbing.com",
//       address1: "123 Main St.",
//       city: "Smithtown",
//       state: "NY",
//       zip: "11787",
//     },
//   ]);
//   console.log("submitted request to add sponsor");
//   console.log(error);
// }

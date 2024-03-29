"use server";

import { supabase } from "@/utils/supabaseClient";
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

export async function checkout(attendees) {
  const pmtLink = await getPaymentLink(attendees);

  redirect(pmtLink);
}

async function getPaymentLink(attendees) {
  const squarePmtLink = process.env.SQUARE_PMT_LINK;
  const squareLocationID = process.env.SQUARE_LOCATION_ID;
  const squareAccessToken = process.env.SQUARE_DEV_ACCESS_TOKEN;

  let pmtLink = "";
  const items = attendees.map((attendee) => ({
    quantity: "1",
    base_price_money: {
      amount: attendee.Cost * 100,
      currency: "USD",
    },
    item_type: "ITEM",
    name: `${attendee.FirstName} ${attendee.LastName} - ${attendee.EventType}`,
  }));

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

"use server";

export async function test() {
  console.log("Server action triggered");
}

export async function checkout() {
  const attendees = [
    {
      EventType: "Golfer",
      FirstName: "Justin",
      LastName: "Monsees",
      PhoneNumber: "631-806-1078",
      Email: "justinmonsees@gmail.com",
      Cost: 185,
    },
    {
      EventType: "Dinner",
      FirstName: "Emily",
      LastName: "Monsees",
      PhoneNumber: "631-806-1078",
      Email: "justinmonsees@gmail.com",
      Cost: 70,
    },
  ];

  const squarePmtLink = process.env.SQUARE_PMT_LINK;
  const squareLocationID = process.env.SQUARE_LOCATION_ID;
  const squareAccessToken = process.env.SQUARE_DEV_ACCESS_TOKEN;

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

  fetch(process.env.SQUARE_DEV_LINK, options)
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
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
    });
}

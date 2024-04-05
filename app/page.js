"use server";

import Home from "@/components/Home";
import { getCachedAppData } from "@/utils/actions";

export default async function InitialHomeData() {
  const data = await getCachedAppData();

  const attendeeItems = data.itemData.filter(
    (item) => item.item_type === "attendee"
  );

  return <Home initItems={attendeeItems} initEventInfo={data.eventData} />;
}

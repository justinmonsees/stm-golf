"use server";

import Register from "@/components/Register";
import { getCachedAppData } from "@/utils/actions";

export default async function InitialRegisterData() {
  const data = await getCachedAppData();

  const attendeeItems = data.itemData.filter(
    (item) => item.item_type === "attendee"
  );

  return <Register items={attendeeItems} />;
}

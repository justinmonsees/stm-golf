"use server";

import Register from "@/components/Register";
import { getCachedAppData } from "@/utils/actions";

export default async function InitialRegisterData() {
  const data = await getCachedAppData();

  console.log("ITEM DATA SERVER", data.itemData);
  return <Register items={data.itemData} />;
}

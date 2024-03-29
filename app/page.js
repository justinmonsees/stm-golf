"use server";

import Home from "@/components/Home";
import { getCachedAppData } from "@/utils/actions";

export default async function InitialHomeData() {
  const data = await getCachedAppData();

  return <Home initItems={data.itemData} initEventInfo={data.eventData} />;
}

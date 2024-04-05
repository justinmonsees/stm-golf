"use server";

import DonatePage from "@/components/DonatePage";
import { getCachedAppData } from "@/utils/actions";

export default async function InitialDonationData() {
  const data = await getCachedAppData();

  const sponsorItems = data.itemData.filter(
    (item) => item.item_type === "sponsor"
  );

  return <DonatePage items={sponsorItems} />;
}

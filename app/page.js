"use server";

import Home from "@/components/Home";
import { supabase } from "@/utils/supabaseClient";

export default async function InitialData() {
  const { data: eventData } = await supabase
    .from("Events")
    .select("*")
    .is("is_current_event", true);

  const { data: itemData } = await supabase
    .from("Items")
    .select("*")
    .eq("item_type", "attendee");

  return <Home initItems={itemData} initEventInfo={eventData} />;
}

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { isFromSquare } from "@/utils/squareWebhookFunctions";
import { updateOrderPmtStatus } from "@/utils/actions";
import { customerCreationSourceFilterSchema } from "square/dist/types/models/customerCreationSourceFilter";

export async function POST(req) {
  const signature = headers().get("x-square-hmacsha256-signature");
  const body = await req.json();
  const rawBody = JSON.stringify(body);

  if (isFromSquare(signature, rawBody)) {
    //process incoming webhook request
    console.log("BODY", body);
    console.log("ORDER ID BEING SENT TO ACTIONS:", body.data.order_id);
    await updateOrderPmtStatus(body.data.order_id);
    return NextResponse.json(
      { Message: "Webhook Payload Processed" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { Message: "Invalid Webhook Payload" },
      { status: 405 }
    );
  }
}

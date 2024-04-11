import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { isFromSquare } from "@/utils/squareWebhookFunctions";
import { updateOrderPmtStatus } from "@/utils/actions";

export async function POST(req) {
  const signature = headers().get("x-square-hmacsha256-signature");
  const body = await req.json();
  const rawBody = JSON.stringify(body);

  if (isFromSquare(signature, rawBody)) {
    //process incoming webhook request
    updateOrderPmtStatus(body.data.order_id);
    return NextResponse.json({}, { status: 200 });
  } else {
    return NextResponse.json({}, { status: 405 });
  }
}

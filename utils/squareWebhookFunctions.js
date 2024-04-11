import { WebhooksHelper } from "square";

// isFromSquare generates a signature from the url and body and compares it to the Square signature header.
const SIGNATURE_KEY = process.env.SQUARE_DEV_SIGKEY;
const NOTIFICATION_URL = process.env.SQUARE_WEBHOOK_URL;

export function isFromSquare(signature, body) {
  return WebhooksHelper.isValidWebhookEventSignature(
    body,
    signature,
    SIGNATURE_KEY,
    NOTIFICATION_URL
  );
}

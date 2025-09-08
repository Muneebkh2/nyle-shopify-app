
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  try {
    const { topic, shop, body, session } = await authenticate.webhook(request);

    switch (topic) {
      case "APP_UNINSTALLED":
        console.log(`Shop ${shop} uninstalled app`);
        break;

      case "SHOP_UPDATE":
        console.log(`Shop ${shop} updated`);
        break;

      case "CUSTOMERS_DATA_REQUEST":
      case "CUSTOMERS_REDACT":
      case "SHOP_REDACT":
        console.log(`GDPR webhook ${topic} from ${shop}, body:`, body);
        break;

      default:
        console.log(`Unhandled topic ${topic} from ${shop}`);
        break;
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Webhook authentication failed:", error);
    return new Response("Unauthorized", { status: 401 });
  }
};
import { data, LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/db.server";

export async function loader({ request }: LoaderFunctionArgs) {

  const shop = "dev-namespace-3.myshopify.com";
  const accessToken = "shpua_e92cd24e0d99d07e5343b3a122e8acb4";
  const gqlResponse = await fetch(`https://${shop}/admin/api/2025-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken, // from DB
    },
    body: JSON.stringify({ query: `{ shop { name } }` }),
  });

  const gqlData = await gqlResponse.json();

  console.log("GraphQL Response: ", gqlData);

  return new Response(JSON.stringify(gqlData), {
    headers: { "Content-Type": "application/json" },
  });
}

import type { LoaderFunctionArgs } from "@remix-run/node";
import shopify from "../shopify.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return shopify.login(request);
};

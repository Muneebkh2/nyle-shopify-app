// app/routes/install.tsx
import { LoaderArgs, redirect } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop || !shop.endsWith(".myshopify.com")) {
    throw new Response("Invalid shop parameter", { status: 400 });
  }

  return redirect(/auth?shop=${encodeURIComponent(shop)});
}
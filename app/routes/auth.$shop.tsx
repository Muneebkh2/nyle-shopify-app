import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const shop = params.shop;
  if (!shop) {
    throw new Response("Missing shop", { status: 400 });
  }

  const clientId = process.env.SHOPIFY_API_KEY!;
  const scopes = process.env.SCOPES;
  const redirectUri = process.env.REDIRECT_URL!;

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=randomstring&grant_options[]=per-user`;

  return Response.redirect(installUrl);
}

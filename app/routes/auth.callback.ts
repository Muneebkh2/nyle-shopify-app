// import { LoaderFunctionArgs, redirect } from "@remix-run/node";
// import shopify, { storeAccessToken } from "~/shopify.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const { session } = await shopify.authenticate.admin(request);

//   console.log("Authenticated session:", session);
//   // Save access token in your Shop table
//   await storeAccessToken(session.shop, session.accessToken);

//   console.log('Redirecting...');
//   // Redirect back to app root (Hello World page)
//   return redirect("/app");
// }


// app/routes/auth.callback.tsx
import { type LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const code = url.searchParams.get("code");

  if (!shop || !code) {
    return new Response(JSON.stringify({ error: "Missing shop or code" }), { status: 400 });
  }

  // Exchange code for access token
  const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_API_KEY!,
      client_secret: process.env.SHOPIFY_API_SECRET!,
      code,
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    // Save token in DB
    await prisma.shop.upsert({
      where: { shop },
      update: { accessToken: data.access_token },
      create: { shop, accessToken: data.access_token },
    });
  }

  return new Response(JSON.stringify({ ok: true, shop, accessToken: data.access_token }), {
    headers: { "Content-Type": "application/json" },
  });
}

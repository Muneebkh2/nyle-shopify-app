import type { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/db.server";

export async function loader({ request, params }: LoaderFunctionArgs) {

  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.INTERNAL_API_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const shop = params.shop;

  if (!shop) {
    return new Response(JSON.stringify({ error: "Missing shop param" }), { status: 400 });
  }

  const store = await prisma.shop.findUnique({ where: { shop } });

  if (!store) {
    return new Response(JSON.stringify({ error: "Store not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ shop: store.shop, accessToken: store.accessToken }), {
    headers: { "Content-Type": "application/json" },
  });
}

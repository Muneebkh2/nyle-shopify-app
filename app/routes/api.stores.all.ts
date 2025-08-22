import { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.INTERNAL_API_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const shops = await prisma.shop.findMany({
    where: { active: true },
    select: { shop: true, accessToken: true },
  });

  return new Response(JSON.stringify(shops), {
    headers: { "Content-Type": "application/json" },
  });
}

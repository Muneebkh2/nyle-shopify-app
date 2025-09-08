// app/routes/api/auth/callback.ts
import { ActionArgs, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";

export const action = async ({ request }: ActionArgs) => {
  // This will handle the callback and produce the session/admin
  const { session } = await authenticate.admin(request);
z
  // now redirect into your app
  return redirect(`/app?shop=${encodeURIComponent(session?.shop ?? "")}`);
};

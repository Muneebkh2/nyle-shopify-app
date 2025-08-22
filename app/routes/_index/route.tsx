import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { login } from "../../shopify.server";

import styles from "./styles.module.css";
import { c } from "node_modules/vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

import crypto from "crypto";

// Generate state
const state = crypto.randomBytes(16).toString("hex");

const API_KEY = process.env.SHOPIFY_API_KEY;
const SCOPES = process.env.SCOPES;
const REDIRECT_URL = process.env.REDIRECT_URL;
const shopDomain = "dev-namespace-2.myshopify.com";

export default function App() {
  const { showForm } = useLoaderData<typeof loader>();
  const installUrl = `https://${shopDomain}/admin/oauth/authorize` +
  `?client_id=${API_KEY}` +
  `&scope=${encodeURIComponent(SCOPES!)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;
  //  + `&state=${state}`; // optional CSRF protection

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <a href={installUrl}>Connect Shopify Store</a>

        <h1 className={styles.heading}>A short heading about [your app]</h1>
        <p className={styles.text}>
          A tagline about [your app] that describes your value proposition.
        </p>
        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label}>
              <span>Shop domain</span>
              <input className={styles.input} type="text" name="shop" />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button className={styles.button} type="submit">
              Log in
            </button>
          </Form>
        )}
        <ul className={styles.list}>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
        </ul>
      </div>
    </div>
  );
}

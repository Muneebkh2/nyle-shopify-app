import type { LoaderFunctionArgs } from "@remix-run/node";
import { Page, Layout, Text, Card, Button, BlockStack, Box } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

const PORTAL_URL = process.env.NYLE_PORTAL_URL;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    <Page>
      <TitleBar title="Nyle.ai Connector" />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <BlockStack gap="800" align="center">
              <Text as="h1" variant="headingXl">
                Thanks for connecting your store to Nyle.ai!
              </Text>
              <Box padding="400" background="bg-subdued" borderRadius="200">
                <Text as="p" variant="bodyMd">
                  At Nyle.ai, we don’t just report your store’s performance — we diagnose
                  issues, deliver AI-powered recommendations, and help predict outcomes so
                  you can optimize profit before investing a single dollar. Let’s make
                  e-commerce smarter together.
                </Text>
              </Box>
              <Box maxWidth="300px">
                <Button size="slim" url={`${PORTAL_URL}`} external target="_blank">
                  View Your AI-Powered Reports
                </Button>
              </Box>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

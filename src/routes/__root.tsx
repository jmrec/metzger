import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import {
  BUSINESS_NAME,
  IMAGES,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  SITE_LOGO,
  SITE_URL,
} from "@/lib/content";
import { textSizeInitScript } from "@/lib/text-size";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: PAGE_TITLE,
      },
      {
        name: "description",
        content: PAGE_DESCRIPTION,
      },
      {
        name: "theme-color",
        content: THEME_COLORS.light,
        media: "(prefers-color-scheme: light)",
      },
      {
        name: "theme-color",
        content: THEME_COLORS.dark,
        media: "(prefers-color-scheme: dark)",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: BUSINESS_NAME,
      },
      {
        property: "og:title",
        content: PAGE_TITLE,
      },
      {
        property: "og:description",
        content: PAGE_DESCRIPTION,
      },
      {
        property: "og:url",
        content: SITE_URL,
      },
      {
        property: "og:image",
        content: `${SITE_URL}/images/og-cover.jpg`,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: "Pahrump landscape with pond and mountains",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: PAGE_TITLE,
      },
      {
        name: "twitter:description",
        content: PAGE_DESCRIPTION,
      },
      {
        name: "twitter:image",
        content: `${SITE_URL}/images/og-cover.jpg`,
      },
    ],
    scripts: [
      // Applies the stored theme before first paint to avoid a light flash.
      { children: themeInitScript },
      // Applies the stored text size before first paint to avoid a resize flash.
      { children: textSizeInitScript },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "canonical",
        href: SITE_URL,
      },
      {
        rel: "icon",
        href: SITE_LOGO,
        type: "image/webp",
      },
      {
        rel: "apple-touch-icon",
        href: SITE_LOGO,
      },
      {
        rel: "preload",
        as: "image",
        href: IMAGES.hero,
        fetchPriority: "high",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {import.meta.env.DEV ? (
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const siteTitle = "Free Homebuyer Credit Readiness Seminar | Loaded Realty";
const siteDescription =
  "Reserve a seat for Loaded Realty Group's free Saturday seminar covering credit repair, financing, pre-approval, and first-time buyer next steps.";

async function requestBaseUrl() {
  const headerStore = await headers();
  const hostHeader =
    headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "";
  const host = hostHeader.split(",")[0]?.trim() || "loadedrealty.co";
  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return new URL(`${protocol}://${host}`);
}

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = await requestBaseUrl();
  const ogImage = new URL("/og.png", metadataBase).toString();

  return {
    title: siteTitle,
    description: siteDescription,
    metadataBase,
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: metadataBase.toString(),
      siteName: "Loaded Realty Group",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Loaded Realty Group free homebuyer credit readiness seminar.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

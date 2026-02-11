import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Sizzler Cuisine of India | Jackson, TN",
  description: "Authentic Indian cuisine in Jackson, TN. Browse the menu and build your order with My Table—no checkout required.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en">
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

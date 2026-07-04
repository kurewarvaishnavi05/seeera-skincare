import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { PageLoader } from "@/components/ui/PageLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ 
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant" 
});

export const metadata: Metadata = {
  title: "SEEERA Skin Care | The New Era of Skin Care",
  description: "Skincare for Every Shade. Powered by PDRN + CICA to repair, protect and glow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} bg-cream text-black font-sans min-h-screen flex flex-col`} suppressHydrationWarning={true}>
        <PageLoader />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}

import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script'
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZaplineAI Dashboard",
  description: "ZaplineAI dashboard for managing your account.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Script
          async
          defer
          src="https://us.umami.is/script.js"
          data-website-id="1dcb1531-dee1-4be3-b4e6-c849d291f35e"
          data-domains="zaplineai.cloud" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

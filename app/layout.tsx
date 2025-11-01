import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import LanguageSwitcherContainer from "@/components/LanguageSwitcherContainer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "校园二手交换平台",
  description: "让校园物品交换更简单、更环保",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Providers>
          {children}
          <LanguageSwitcherContainer />
        </Providers>
      </body>
    </html>
  );
}


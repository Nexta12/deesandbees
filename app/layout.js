import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dees & Bees Global | International Education Recruitment & Study Abroad",
  description:
    "Dees & Bees Global Resources connects ambitious students with world-class education opportunities across the UK, US, Canada, Europe, and Australia. Admissions, visa, and pre-departure guidance.",
  keywords: [
    "study abroad",
    "UK universities",
    "Canada education",
    "student visa guidance",
    "international student recruitment",
    "Dees and Bees Global",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  );
}

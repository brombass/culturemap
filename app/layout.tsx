import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Culture Map — compare how the world works, decides & leads",
  description:
    "An interactive map of 71 countries across Erin Meyer's eight cross-cultural scales: communicating, evaluating, leading, deciding, trusting, disagreeing, scheduling and persuading.",
  metadataBase: new URL("https://culturemap.example.com"),
  openGraph: {
    title: "The Culture Map",
    description:
      "Compare 71 countries across eight scales of cross-cultural communication and business behavior.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

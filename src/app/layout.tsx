import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const googleSans = Outfit({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GDG PUP Code Rush CSS Challenge",
  description: "The ultimate campus CSS showdown. Arrange the blocks, match the design, and race against the clock. Organized by GDG On Campus PUP.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "GDG PUP Code Rush CSS Challenge",
    description: "The ultimate campus CSS showdown. Arrange the blocks, match the design, and race against the clock. Organized by GDG On Campus PUP.",
    images: [
      {
        url: "/logo.png",
        alt: "GDG PUP Code Rush",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG PUP Code Rush CSS Challenge",
    description: "The ultimate campus CSS showdown. Arrange the blocks, match the design, and race against the clock.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${googleSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

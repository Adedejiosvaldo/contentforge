import "./globals.css";
import "./input-fix.css";
import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import { ThemeProvider } from "./context/ThemeProvider";
import InputStyleFix from "./components/InputStyleFix";
import { Providers } from "./providers/app.providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Content Forge",
  description: "Generate engaging social media content effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cabin.variable} antialiased`}>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

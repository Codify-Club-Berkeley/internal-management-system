import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./components/providers/Providers";
import NavigationBar from "./components/navigation/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full bg-black">
        <body className="h-full bg-black">
          <Providers>
            <NavigationBar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

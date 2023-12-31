import "@uploadthing/react/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/providers/Providers";
import NavigationBar from "../components/navigation/NavigationBar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ourFileRouter } from "./api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Internal Management System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className="h-full bg-background text-foreground dark">
          <Providers>
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <NavigationBar />
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              closeOnClick={true}
              pauseOnHover={true}
              draggable={true}
              theme="dark"
            />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

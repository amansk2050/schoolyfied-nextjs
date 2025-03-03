import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/provider/queryClientProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SchoolyFied | SF",
  description: "School Management System for the modern school",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {/* <div className="h-screen flex justify-center items-center bg-gradient-to-r from-lamaPurple to-lamaSky">
          {children}
        </div> */}
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

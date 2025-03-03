import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"] });
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}

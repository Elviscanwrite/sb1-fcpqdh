import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern Web App",
  description: "A modern web application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {children}
      </body>
    </html>
  );
}
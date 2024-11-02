import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/app/react-query-provider";
import { headers } from "next/headers";
import { SupabaseProvider } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Modern Web App",
  description: "A modern web application built with Next.js and Supabase",
};

async function getSession() {
  const requestHeaders = new Headers(headers());
  const supabase = createServerComponentClient({
    headers: () => requestHeaders,
  });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans antialiased", inter.variable)}>
        <SupabaseProvider session={session}>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
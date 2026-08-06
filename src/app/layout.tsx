import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import Navbar from "@/components/common/Navbar";
import { parseThemeCookie, THEME_COOKIE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Explorer",
  description: "Project Explorer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = parseThemeCookie(cookieStore.get(THEME_COOKIE_KEY)?.value);

  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        "h-full antialiased",
        savedTheme,
      )}
    >
      <body className="flex h-full flex-col overflow-hidden">
        <ThemeProvider>
          <QueryProvider>
            <Navbar />
            <main className="flex w-full flex-1 flex-col overflow-hidden">
              {children}
            </main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

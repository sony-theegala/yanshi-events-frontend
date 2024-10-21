import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, ThemeToggle } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";



export const metadata: Metadata = {
  title: "Yanshi Events",
  description: "welcome to yanshi events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-card text-card-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

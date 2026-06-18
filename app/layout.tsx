import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '400', '800'],
  style: ['normal', 'italic'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: "enama",
  description: "A chatbot with better interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        > */}
            <TooltipProvider>{children}</TooltipProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}

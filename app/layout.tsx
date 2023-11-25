import type { Metadata } from "next";
import { Ephesis } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/modeToggle";

const inter = Ephesis({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Haamerce",
  description: "E-commerce website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-200 via-white to-slate-200 dark:from-gray-950 dark:via-slate-600 dark:to-gray-950"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="ligtt"
          storageKey="hanime-theme"
        >
          <Navbar />
          {children}
          <div className="fixed bottom-5 right-4">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

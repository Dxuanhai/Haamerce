import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/modeToggle";
import Container from "@/components/ui/container";
import ToastProvider from "@/providers/toast-provider";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Montserrat({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Haamerce",
  description: `Fashion store 1st at Viet Nam`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            inter.className,
            "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-200 via-white to-slate-200 dark:from-neutral-950 dark:via-slate-700 dark:to-neutral-950 dark:text-zinc-300 text-slate-800"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="ligtt"
            storageKey="hanime-theme"
          >
            <ToastProvider />
            <Container>
              <Header />
              {children}

              <Footer />
            </Container>
            <div className="fixed bottom-5 right-4">
              <ModeToggle />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

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
            "bg-slate-50 dark:bg-[#20161f] dark:text-[#c59f60] text-[slate-800]"
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
            </Container>
            <Footer />
            <div className="fixed bottom-5 right-4">
              <ModeToggle />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

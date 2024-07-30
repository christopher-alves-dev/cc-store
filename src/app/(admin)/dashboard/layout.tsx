"use client";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";
import { useSheetControl } from "@/stores/sheet-control";
import { Menu } from "lucide-react";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { PageTitle } from "../components/page-title";
import { Sidebar } from "./components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { menu, toggle } = useSheetControl((state) => ({
    menu: state.menu,
    toggle: state.toggle,
  }));

  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          "flex justify-center overflow-y-scroll",
        )}
      >
        <div className="flex w-full max-w-screen-2xl flex-1 flex-col">
          <div className="flex min-h-screen overflow-hidden">
            <Sheet open={menu}>
              <Sidebar className="hidden w-full lg:flex lg:w-fit lg:min-w-[300px]" />
              <div className="w-full">
                <div className="flex w-full items-center gap-10 px-10 py-4">
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => {
                        toggle("menu");
                      }}
                    >
                      <Menu size={20} />
                    </Button>
                  </SheetTrigger>
                  <PageTitle />
                </div>
                <Separator />
                {children}
              </div>

              <SheetContent side="left" className="w-full max-w-md">
                <Sidebar className="w-full" />
              </SheetContent>
            </Sheet>
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}

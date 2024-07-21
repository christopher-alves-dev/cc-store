"use client";
import "@/app/globals.css";
import { Separator } from "@/components/ui/separator";
import { Sheet } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";
import { useSheetControl } from "@/stores/sheet-control";
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
  const isOpen = useSheetControl((state) => state.isOpen);

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
            <Sheet>
              <Sidebar />
              <div className="w-full">
                <div className="w-full px-10 py-4">
                  <PageTitle />
                </div>
                <Separator />
                {children}
              </div>
            </Sheet>
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}

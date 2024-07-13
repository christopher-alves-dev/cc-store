import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Sidebar } from "./components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Os Melhores Eletrônicos e Periféricos em Promoção | Entrega Rápida",
  description:
    "Descubra uma variedade de periféricos de marcas renomadas em nossa loja online. Aproveite as ofertas exclusivas, garantia de qualidade e facilidades de pagamento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <Sidebar />
            {children}
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}

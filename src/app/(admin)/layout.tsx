import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/ui/header";
import { AuthProvider } from "@/providers/auth";
import { Footer } from "@/components/ui/footer";
import { twMerge } from "tailwind-merge";
import { Sidebar } from "./dashboard/components/sidebar";

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
          "flex justify-center overflow-y-scroll [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar]:bg-accent",
        )}
      >
        <div className="flex h-full w-full max-w-screen-2xl flex-col">
          <AuthProvider>
            <div className="flex">
              <Sidebar />
              {children}
            </div>
            <Toaster />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { AuthProvider } from "@/providers/auth";
import { Footer } from "@/components/ui/footer";
import { twMerge } from "tailwind-merge";

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
          "overflow-y-scroll [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar]:bg-accent",
        )}
      >
        <div className="flex h-full flex-col 2xl:container">
          <AuthProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Toaster />
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}

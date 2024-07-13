import "@/app/globals.css";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          "flex items-center justify-center overflow-y-scroll bg-accent",
        )}
      >
        {children}
      </body>
    </html>
  );
}

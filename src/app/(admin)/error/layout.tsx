import "@/app/globals.css";
import { Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          poppins.className,
          "flex items-center justify-center overflow-y-scroll bg-accent",
        )}
      >
        {children}
      </body>
    </html>
  );
}

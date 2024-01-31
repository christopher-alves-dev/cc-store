"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-5">
      <Image
        src="/banner-home.png"
        alt="Até 55% de desconto só esse mês"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

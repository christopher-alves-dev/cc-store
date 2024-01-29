"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  console.log({ data: data?.user });
  return <div>{data?.user?.name}</div>;
}

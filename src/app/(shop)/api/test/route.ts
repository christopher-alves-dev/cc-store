import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const GET = async (request: Request) => {
  return NextResponse.json({ received: true });
};

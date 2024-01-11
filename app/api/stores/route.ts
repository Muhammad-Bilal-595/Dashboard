import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = auth();
    const { name } = body;
    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    console.log("userId from routes = ", userId);
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

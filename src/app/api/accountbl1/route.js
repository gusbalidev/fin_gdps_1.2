export const maxDuration = 30;

import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// GET /api/neraca?accountTypeId=1
// http://localhost:3000/api/neraca?accountTypeId=1

export async function GET(request) {
  
  await auth.protect()

  try {
    // Extract accountTypeId from the request query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const query = await dbprisma.account.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        code: true,
        name: true,
        balance1: true,
        accountType: {
          select: {
            name: true,
          },
        },
        accountGroup: {
          select: {
            name: true,
          },
        },
        accountGroup2: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(query, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

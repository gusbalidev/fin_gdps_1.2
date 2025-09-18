import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import prisma from "@/lib/dbprisma";

export async function GET(request) {
    try {
        // Check authentication
        const session = await auth();
        if (!session || !session.userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { 
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        const { searchParams } = new URL(request.url);
        const accountId = searchParams.get('accountId');

        if (!accountId) {
            return NextResponse.json(
                { error: 'Account ID is required' },
                { status: 400 }
            );
        }

        const transactions = await prisma.transactionAll.findMany({
            where: { accountId: parseInt(accountId) },
            orderBy: { date: 'desc' }
        });

        return NextResponse.json(transactions);

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
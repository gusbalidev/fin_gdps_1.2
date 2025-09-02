
export const maxDuration = 30;

import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';

// GET /api/neraca?accountTypeId=1
// http://localhost:3000/api/neraca?accountTypeId=1

export async function GET(request: Request) {

    await auth.protect();
    
    try {
        const { searchParams } = new URL(request.url);
        const accountId = searchParams.get('id');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        if (!accountId) {
            return NextResponse.json({ error: 'accountId is required' }, { status: 400 });
        }

        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
        }

        // Get transactions directly from transactionAll table
        const transactions = await dbprisma.transactionAll.findMany({
            where: {
                accountId: parseInt(accountId),
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                }
            },
            select: {
                id: true,
                date: true,
                description: true,
                debit: true,
                credit: true,
                flag: true,
                accountId: true,
                account: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        accountType: true,
                        accountGroup: true,
                        accountGroup2: true,
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        });

        // Calculate total balance
        const balance = transactions.reduce((acc, transaction) => {
            return acc + (transaction.debit - transaction.credit);
        }, 0);

        return NextResponse.json({
            transactions: transactions,
            totalBalance: balance,
            accountDetails: transactions[0]?.account || null,
            periodStart: startDate,
            periodEnd: endDate
        }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}


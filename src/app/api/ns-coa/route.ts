
export const maxDuration = 30;

import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';

// GET /api/neraca?accountTypeId=1
// http://localhost:3000/api/neraca?accountTypeId=1

export async function GET(request: Request) {

    await auth.protect()
    
    try
    {

        // Extract accountTypeId from the request query parameters
        const { searchParams } = new URL(request.url);
        const accountId = searchParams.get('id');
        // const accountTypeId = searchParams.get('accountTypeId');
        // const accountGroupId = searchParams.get('accountGroupId');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // if (!accountTypeId) {
        //     return NextResponse.json({ error: 'accountTypeId is required' }, { status: 400 });
        // }

        // if (!accountGroupId) {
        //     return NextResponse.json({ error: 'accountGroupId is required' }, { status: 400 });
        // }

        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
        }

        const query = await dbprisma.account.findUnique({
            where: {
                id: accountId ? parseInt(accountId) : undefined,
            },
            include: {
                
                accountType: true,
                accountGroup: true,
                accountGroup2: true,
                transactionAlls: {
                  select: {
                    date: true,
                    description: true,
                    debit: true,
                    credit: true,
                    flag: true,
                  },
                  where: {
                    date: {
                        gte: new Date(startDate),
                        lte: new Date(endDate),
                    },
                },
                },
                
              },
              
        });

        // Modify the balance calculation since we now have a single account
const accountWithBalance = query ? {
    ...query,
    balance: query.transactionAlls.reduce((acc, transaction) => {
        return acc + (transaction.debit - transaction.credit);
    }, query.balance1 || 0)
} : null;

// Return single account instead of array
return NextResponse.json({
    account: accountWithBalance,
    totalBalance: accountWithBalance ? accountWithBalance.balance : 0
}, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
    }


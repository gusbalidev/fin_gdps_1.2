"use client"

//import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Suspense } from "react";
import Loading from "./LoadingRoot";

import { ClerkProvider } from "@clerk/nextjs";
import { CashFlowProvider } from "@/context/cashflow-context";
import { NeracaSaldoProvider } from "@/context/neraca-saldo-context";
import { NeracaSaldoProviderB } from "@/context/neraca-saldo-context-b";
import { AktivitasProvider } from "@/context/aktivitas-context"
import { AktivitasProviderB } from "@/context/aktivitas-contex-b";
import { NeracaTProvider } from "@/context/neraca-t-context";
import { NeracaTProviderB } from "@/context/neraca-t-context-b";
import { SaldoAwalProvider } from "@/context/saldo-awal-context";
import { SaldoAwalProviderB } from "@/context/saldo-awal-context-b";
import { NeracaCol1Provider } from "@/context/neraca-col1-context";
//import { TotalRLDetailContext } from "@/context/total-rl-detail";


const queryClient = new QueryClient();

export const dynamic = "force-dynamic";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "GDPS-App V1",
//   description: "GSDEV",
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider>

      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          <Suspense fallback={<Loading />}>

            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>

                <AppSidebar />
                {/* <SidebarTrigger /> */}
                <NeracaCol1Provider>
                <NeracaTProviderB>
                <NeracaTProvider>
                    <AktivitasProvider>
                      <AktivitasProviderB>
                        <CashFlowProvider>
                          <NeracaSaldoProvider>
                            <NeracaSaldoProviderB>
                              <SaldoAwalProvider>
                                <SaldoAwalProviderB>

                                  <QueryClientProvider client={queryClient}>
                                    {children}
                                  </QueryClientProvider>

                                </SaldoAwalProviderB>
                              </SaldoAwalProvider>
                            </NeracaSaldoProviderB>
                          </NeracaSaldoProvider>
                        </CashFlowProvider>
                      </AktivitasProviderB>
                    </AktivitasProvider>
                </NeracaTProvider>
                </NeracaTProviderB>
                </NeracaCol1Provider>

              </SidebarProvider>
            </ThemeProvider>
          </Suspense>
        </body>
      </html >

    </ClerkProvider>

  );
}

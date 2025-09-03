"use client"

import Divider from "@/components/Divider";
import PageLayout from "@/components/PageLayout";
import global from "@/config.js";

import GraphPage from "@/components/GraphPage";

//
export default function Graph() {

  const header = <h4>{global.pageInfo.headerText}</h4>;
  const footer = <p>{global.pageInfo.footerText}</p>;
  return (
    <>

      <PageLayout header={header} footer={footer}>

        <h1 className="text-3xl font-bold">Visualisasi Data </h1>
        {/* <p className="pt-3">{global.app.description}</p> */}

        <Divider />

        <GraphPage />

        {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}

      </PageLayout>


    </>
  );
}

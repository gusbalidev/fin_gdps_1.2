"use client"

import Divider from "@/components/Divider";
import PageLayout from "@/components/PageLayout";
import global from "@/config.js";

import HomeMenu from "@/components/home-menu-dev";

//
export default function Home() {

  const header = <h4>{global.pageInfo.headerText}</h4>;
  const footer = <p>{global.pageInfo.footerText}</p>;
  return (
    <>

      <PageLayout header={header} footer={footer}>

        <h1 className="text-3xl font-bold">{global.i18n.welcome.id}</h1>
        <p className="pt-3">{global.app.description}</p>

        <Divider />

        <HomeMenu />

        {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}

      </PageLayout>


    </>
  );
}

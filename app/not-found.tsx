"use client";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFound: NextPage = () => {
  const Router = useRouter();

  useEffect(() => {
    Router.replace("/");
  }, [Router]);

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default NotFound;

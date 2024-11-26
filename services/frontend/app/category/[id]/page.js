'use client';
import Categories from "@/components/Categories/Categories";
import Header from "@/components/Header/Header";
import Posts from "@/components/Posts";
import Footer from "@/components/Footer/Footer";

import React from "react";
import { useSearchParams } from 'next/navigation'

export default function Category({ params }) {
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || 1;


  return (
    <div className="h-full w-full">
      <Categories />
      <Header />
      <div className="xl:px-88 lg:px-28 md:px-12 px-4">
        <div className="w-full">
          <h1 className="text-base pt-4">If you're looking for secret background information to Google Search, you've come to the wrong place.</h1>
          <Posts isPosts={false} id={params.id} page={page} path={"?page="}/>
        </div>
        <Footer />
      </div>
    </div>
  );
}

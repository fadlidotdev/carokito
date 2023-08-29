import NewsCard from "@/components/newscard";
import NewsCardSimple from "@/components/newscard-simple";
import {useRouter} from "next/router";
import React from "react";

export default function Category() {
  const {query} = useRouter();

  return (
    <div>
      <span className="block mb-4 text-xl font-bold capitalize">
        {query.id}
      </span>

      <div className="space-y-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x">
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="block pl-2 text-lg font-bold border-l-4 border-primary">
              Terbaru
            </span>
          </div>

          <NewsCardSimple />
          <NewsCardSimple />
          <NewsCardSimple />
          <NewsCardSimple />
          <NewsCardSimple />
          <NewsCardSimple />
          <NewsCardSimple />
        </div>
      </div>
    </div>
  );
}

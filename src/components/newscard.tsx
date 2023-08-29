import Link from "next/link";
import Badge from "./badge";
import {routes} from "@/utils/routes";

export default function NewsCard() {
  return (
    <Link href={routes("news-detail", "test-news")}>
      <div className="w-64 rounded-lg shadow bg-white card min-h-[300px]">
        <figure>
          <img src="https://carokito.com/images/4RSRXPzYhTZX99HeFNPF.jpg" />
        </figure>
        <div className="p-4 card-body">
          <h2 className="text-base card-title">
            Peringati Harlah Pancasila Pemkab Seluma Laksanakan Upacara Bendera
          </h2>
          <div className="flex items-center justify-between mt-auto">
            <Badge>News</Badge>
            <span className="text-xs text-gray-400">3 Jam</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

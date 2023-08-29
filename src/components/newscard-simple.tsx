import Link from "next/link";
import Badge from "./badge";
import {routes} from "@/utils/routes";

export default function NewsCardSimple() {
  return (
    <Link href={routes("news-detail", "test-news")} className="block">
      <div className="flex gap-4 p-3 pl-2 bg-white rounded-lg shadow">
        <figure className="w-[80px] h-[80px] flex-shrink-0">
          <img
            width={80}
            height={80}
            className="object-cover rounded aspect-square"
            src="https://carokito.com/images/4RSRXPzYhTZX99HeFNPF.jpg"
            alt="Shoes"
          />
        </figure>

        <div className="space-y-2">
          <h2 className="text-sm card-title line-clamp-3">
            Peringati Harlah Pancasila Pemkab Seluma Laksanakan Upacara Bendera
          </h2>
          <div className="flex items-center gap-3">
            <Badge>News</Badge>

            <span className="text-xs text-gray-400">3 Jam</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

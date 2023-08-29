import NewsCard from "@/components/newscard";
import NewsCardSimple from "@/components/newscard-simple";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <a href="/" target="_blank">
        <img
          height={60}
          width={500}
          src="https://carokito.com/images/sxIrEaGuARfEnkVQy7gb.png"
          className="max-h-[80px] block w-full object-cover"
        />
      </a>

      <div className="flex gap-2 py-2 overflow-x-auto no-scrollbar snap-x">
        <Link href="/">
          <div className="h-8 badge bg-primary/10 hover:bg-primary/30">
            #korsel
          </div>
        </Link>
        <div className="h-8 badge bg-primary/10">#bengkulu</div>
        <div className="h-8 badge bg-primary/10">#pemilu2024</div>
        <div className="h-8 badge bg-primary/10">#festivaltabot</div>
        <div className="h-8 badge bg-primary/10">#streetfood</div>
        <div className="h-8 badge bg-primary/10">#viralbengkulu</div>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="block pl-2 text-lg font-bold border-l-4 border-primary">
            Politik
          </span>

          <Link href="/" className="capitalize btn btn-link btn-sm">
            Lihat semua
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <NewsCardSimple />
          <NewsCardSimple />
          <NewsCardSimple />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="block pl-2 text-lg font-bold border-l-4 border-primary">
            Nasional
          </span>

          <Link href="/" className="capitalize btn btn-link btn-sm">
            Lihat semua
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <NewsCardSimple />
          <NewsCardSimple />
          <NewsCardSimple />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="block pl-2 text-lg font-bold border-l-4 border-primary">
            Daerah
          </span>

          <Link href="/" className="capitalize btn btn-link btn-sm">
            Lihat semua
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <NewsCardSimple />
          <NewsCardSimple />
          <NewsCardSimple />
        </div>
      </div>

      <a href="/" target="_blank">
        <img
          src="https://carokito.com/images/hmbYyFV9he65yyaLQVY4.png"
          className="block mx-auto"
          height={300}
        />
      </a>
    </div>
  );
}

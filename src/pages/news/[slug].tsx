import Badge from "@/components/badge";
import NewsCardSimple from "@/components/newscard-simple";
import Tag from "@/components/tag";
import {routes} from "@/utils/routes";
import Link from "next/link";
import {PT_Serif} from "next/font/google";
import {classes} from "@/utils/core";

const contentFont = PT_Serif({weight: ["400", "700"], subsets: ["latin"]});

export default function NewsDetail() {
  return (
    <>
      <a href="/" target="_blank" className="mb-4">
        <img
          height={60}
          width={500}
          src="https://carokito.com/images/sxIrEaGuARfEnkVQy7gb.png"
          className="max-h-[80px] block w-full object-cover"
        />
      </a>

      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Beranda</Link>
          </li>
          <li>
            <Link href={routes("category/politik")}>Politik</Link>
          </li>
        </ul>
      </div>

      <article className="flex flex-col gap-4">
        <header className="flex flex-col gap-4 mb-6">
          <h1 className="text-3xl font-bold">
            Peringati Harlah Pancasila Pemkab Seluma Laksanakan Upacara Bendera
          </h1>

          <div className="space-y-1">
            <div className="flex gap-1">
              <span>oleh</span>
              <Link href="/vaafad" className="font-semibold link link-primary">
                Vaafad
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">
                5 Agustus 2023 19.00 &middot; 2 menit baca
              </span>

              <Badge size="md">Politik</Badge>
            </div>
          </div>
        </header>

        <section className={classes("space-y-4", contentFont.className)}>
          <figure>
            <img
              src="https://carokito.com/images/4RSRXPzYhTZX99HeFNPF.jpg"
              height={300}
            />
          </figure>

          <p>
            Carokito.com, Seluma - Dalam rangka memperingati hari lahir
            Pancasila pemerintah daerah Seluma serta Forkopimda menggelar
            upacara bendera. Wakil Bupati Seluma Drs Gustianto bertindak sebagai
            Inspektur Upacara dan diikuti oleh seluruh jajaran Pemda Kabupaten
            Seluma. Dalam upacara ini Wabup membacakan pidato seragam Presiden
            Republik Indonesia Joko Widodo. Kegiatan ini dilaksanakan di halaman
            kantor bupati Seluma pada Kamis (1/6).
          </p>

          <p>
            Isi pidatonya dikatakan, pancasila adalah sumber dari segala hukum.
            Itu kemudian menjadi jiwa dari bangsa dan negara. Pancasila bisa
            mempersatukan bangsa yang merupakan negara kepulauan tapi menjadi
            satu kesatuan yang kuat karena ada idealisme Pancasila. Itu harus
            dijaga dan dipertahankan pada generasi-generasi selanjutnya.
            Sehingga diharap para pelanjut estafet bisa memaknai lebih dalam
            dari pada Pancasila.
          </p>

          <p>Meneguhkan Komitmen</p>

          <p>
            Melalui upacara Harlah Pancasila, Pemkab Bone dapat menunjukkan dan
            meneguhkan komitmennya terhadap ideologi dan dasar negara,
            Pancasila.
          </p>

          <p>
            Ini mencakup penerapan nilai-nilai Pancasila dalam setiap kebijakan
            dan program yang dijalankan.
          </p>

          <p>
            Upacara Harlah Pancasila bukan sekadar peringatan tahunan, tetapi
            memiliki makna mendalam bagi Pemkab Seluma dalam menjalankan roda
            pemerintahan dan melayani masyarakat, tutupnya.
          </p>
        </section>

        <div className="flex gap-2">
          <Tag label="Nasional" />
          <Tag label="Bengkulu" />
        </div>

        <a href="/" target="_blank" className="block my-8">
          <img
            src="https://carokito.com/images/hmbYyFV9he65yyaLQVY4.png"
            className="block mx-auto"
            height={300}
          />
        </a>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="block pl-2 text-lg font-bold border-l-4 border-primary">
              Baca Lainnya
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
        </section>
      </article>
    </>
  );
}

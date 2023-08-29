import {routes} from "@/utils/routes";
import {Search} from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="flex items-center justify-between p-2 bg-white border-b">
          <label className="btn btn-circle btn-link text-inherit swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />

            {/* hamburger icon */}
            <svg
              className="fill-current swap-off"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className="fill-current swap-on"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512">
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>

          <Link href="/">
            <img
              className="relative right-2 w-[150px] h-[30px] object-contain"
              width={150}
              height={30}
              src="https://carokito.com/images/BrWlGTam5bn2nQKM3X4b.png"
            />
          </Link>

          <Link
            href={routes("search")}
            className="btn btn-circle btn-sm btn-link text-inherit">
            <Search className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <nav className="flex py-1 overflow-x-auto bg-white border-b no-scrollbar snap-x">
        <Link
          href="/"
          className="text-sm no-underline capitalize btn btn-link btn-sm hover:no-underline">
          <span className="text-primary">Populer</span>
        </Link>

        <Link
          href="/category/daerah"
          className="text-sm no-underline capitalize btn btn-link btn-sm hover:no-underline">
          <span className="text-gray-500">Daerah</span>
        </Link>

        <Link
          href="/category/nasional"
          className="text-sm no-underline capitalize btn btn-link btn-sm hover:no-underline">
          <span className="text-gray-500">Nasional</span>
        </Link>

        <Link
          href="/category/ekonomi"
          className="text-sm no-underline capitalize btn btn-link btn-sm hover:no-underline">
          <span className="text-gray-500">Ekonomi</span>
        </Link>

        <Link
          href="/category/politik"
          className="text-sm no-underline capitalize btn btn-link btn-sm hover:no-underline">
          <span className="text-gray-500">Politik</span>
        </Link>

        <Link
          href="/category/olahraga"
          className="text-sm no-underline capitalize btn btn-link btn-sm hover:no-underline">
          <span className="text-gray-500">Olahraga</span>
        </Link>

        <Link
          href="/category/lifestyle"
          className="text-sm no-underline capitalize btn btn-link btn-sm hover:no-underline">
          <span className="text-gray-500">Lifestyle</span>
        </Link>

        <Link
          href="/category/video"
          className="text-sm no-underline capitalize btn btn-link btn-sm hover:no-underline">
          <span className="text-gray-500">Video</span>
        </Link>
      </nav>
    </>
  );
}

import {Facebook, Instagram, Mail, Twitter} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-5 px-4 py-8 mt-8 bg-white border-t-4 border-primary">
      <Link href="/">
        <img
          className="relative right-2 w-[150px] h-[30px] object-contain mx-auto"
          width={150}
          height={30}
          src="https://carokito.com/images/BrWlGTam5bn2nQKM3X4b.png"
        />
      </Link>

      <div className="flex items-center gap-3 mx-auto">
        <a href="/" target="_blank" className="btn btn-circle btn-sm">
          <Facebook className="w-4 h-4" />
        </a>
        <a href="/" target="_blank" className="btn btn-circle btn-sm">
          <Twitter className="w-4 h-4" />
        </a>
        <a href="/" target="_blank" className="btn btn-circle btn-sm">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="/" target="_blank" className="btn btn-circle btn-sm">
          <Mail className="w-4 h-4" />
        </a>
      </div>

      <p className="text-sm text-center text-gray-500">
        Copyright &copy; {new Date().getFullYear()} &middot; konakito. All right
        reserved
      </p>
    </footer>
  );
}

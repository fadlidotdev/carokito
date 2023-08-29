import {ReactNode} from "react";

import Footer from "./footer";
import Header from "./header";

interface Props {
  children: ReactNode;
}

export default function DefaultLayout({children}: Props) {
  return (
    <>
      <Header />

      <main className="flex flex-col max-w-[500px] p-4 mx-auto">
        {children}
      </main>

      <Footer />
    </>
  );
}

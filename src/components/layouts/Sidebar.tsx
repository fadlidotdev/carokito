import Image from "next/image";
import {useRouter} from "next/router";

import {useDebounce} from "@/hooks";
import {classes} from "@/utils/core";
import {routes} from "@/utils/routes";

import useWindowSize from "@/hooks/useWindowSize";
import {supabase} from "@/utils/supabase";
import {useEffect, useRef} from "react";
import {Button, Logo} from "../common";
import NavItem from "./NavItem";

type Props = {
  show: boolean;
  onToggle: () => void;
};

const Sidebar = ({show, onToggle}: Props) => {
  const router = useRouter();
  const {pathname} = router;

  const delayedShowSidebar = useDebounce(show, 100);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {width} = useWindowSize();

  useEffect(
    () => {
      if (width >= 768 && !show) {
        onToggle();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, show],
  );

  const handleLogout = () => {
    supabase.auth.signOut();
    router.push("/dashboard/login");
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={classes(
          "z-30 transition-all duration-300 w-16 shadow-sm md:shadow-none fixed md:w-[250px] min-h-screen bg-white md:pl-8 md:pr-2 pt-16 pb-8 flex flex-col",
          !show && "-ml-16",
        )}>
        <button
          onClick={onToggle}
          className="block w-8 h-8 mx-auto mb-8 md:hidden">
          <Logo />
        </button>

        <div className="hidden md:block">
          <Logo className="block mx-auto mb-8" />
        </div>

        <nav>
          <ul className="space-y-3">
            <li>
              <NavItem
                href={routes("dashboard")}
                iconSrc="/icons/dashboard.svg"
                label="Dashboard"
                active={pathname === routes("dashboard")}
              />
            </li>

            <li>
              <NavItem
                href={routes("dashboard/admin")}
                iconSrc="/icons/user.svg"
                label="Admin"
                active={pathname.includes(routes("dashboard/admin"))}
              />
            </li>

            <li>
              <NavItem
                href={routes("dashboard/category")}
                iconSrc="/icons/product-list.svg"
                label="Category"
                active={pathname.includes(routes("dashboard/category"))}
              />
            </li>

            <li>
              <NavItem
                href={routes("dashboard/post")}
                iconSrc="/icons/news.svg"
                label="Post"
                active={pathname.includes(routes("dashboard/post"))}
              />
            </li>

            <li>
              <NavItem
                href={routes("dashboard/hashtag")}
                iconSrc="/icons/hashtag.svg"
                label="Hashtag"
                active={pathname.includes(routes("dashboard/hashtag"))}
              />
            </li>

            <li>
              <NavItem
                href={routes("dashboard/banner")}
                iconSrc="/icons/megafone.svg"
                label="Banner"
                active={pathname.includes(routes("dashboard/banner"))}
              />
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <Button
            className="hidden w-full md:block"
            variant="alternate"
            onClick={handleLogout}>
            Log out
          </Button>

          <div className="block md:hidden">
            <button className="block mx-auto opacity-70" onClick={handleLogout}>
              <Image
                src="/icons/logout.svg"
                width={20}
                height={20}
                alt="Log out"
              />
            </button>
          </div>
        </div>
      </aside>

      {/* TOGGLE SIDEBAR */}
      <button
        onClick={onToggle}
        className={classes(
          "fixed scale-0 right-4 z-20 flex items-center justify-center w-16 h-16 transition bg-white rounded-full shadow-2xl bottom-4 border border-gray-100",
          !delayedShowSidebar && "scale-100",
        )}>
        <Logo className="block w-8 h-8 mx-auto" />
      </button>
    </>
  );
};

export default Sidebar;

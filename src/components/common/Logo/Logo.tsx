// import Image from "next/image";

import {classes} from "@/utils/core";

const Logo = ({className = ""}) => (
  // <Image
  //   className={classes("block mx-auto w-auto h-auto", className)}
  //   src="/logo.svg"
  //   width={width}
  //   height={height}
  //   alt="Company logo"
  //   priority
  // />
  <img
    className={classes(
      "relative right-2 w-[150px] h-[30px] object-contain",
      className,
    )}
    width={150}
    height={30}
    src="https://carokito.com/images/BrWlGTam5bn2nQKM3X4b.png"
  />
);

export default Logo;

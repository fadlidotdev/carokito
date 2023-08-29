import {tv} from "tailwind-variants";

import {classes} from "@/utils/core";

import {buttonStyle, ButtonProps} from "../Button/Button";

const iconButtonStyle = tv({
  base: "p-0 flex items-center justify-center",
  variants: {
    size: {
      xs: "w-6 h-6",
      small: "w-8 h-8",
      base: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const IconButton = (props: ButtonProps) => {
  const {className, variant, size, children, ...otherProps} = props;

  return (
    <button
      className={classes(
        buttonStyle({variant, className}),
        iconButtonStyle({size}),
      )}
      {...otherProps}>
      {children}
    </button>
  );
};

export default IconButton;

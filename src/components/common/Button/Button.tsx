import {classes} from "@/utils/core";
import {ComponentPropsWithoutRef} from "react";
import {tv, VariantProps} from "tailwind-variants";

export const buttonStyle = tv({
  base: "px-5 py-2 font-medium text-white",
  variants: {
    variant: {
      main: "text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300",
      alternate:
        "text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200",
      danger:
        "text-white bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300",
    },
    size: {
      xs: "text-xs",
      small: "text-xs",
      base: "text-sm",
    },
  },
  defaultVariants: {
    variant: "main",
    size: "base",
  },
});

export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonStyle> {}

export type ButtonVariant = NonNullable<ButtonProps["variant"]>;

const Button = (props: ButtonProps) => {
  const {className, variant, size, children, ...otherProps} = props;

  return (
    <button
      className={classes(buttonStyle({variant, size, className}))}
      {...otherProps}>
      {children}
    </button>
  );
};

export default Button;

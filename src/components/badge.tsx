import {ReactNode} from "react";
import {tv, type VariantProps} from "tailwind-variants";

const badge = tv({
  base: "badge badge-primary rounded",
  variants: {
    size: {
      sm: "badge-sm",
      md: "badge",
      lg: "badge-lg",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type BadgeVariants = VariantProps<typeof badge>;

interface Props extends BadgeVariants {
  children: ReactNode;
}

export default function Badge({children, ...others}: Props) {
  return <div className={badge({...others})}>{children}</div>;
}

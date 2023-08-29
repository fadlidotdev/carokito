import {classes} from "@/utils/core";
import {ComponentPropsWithoutRef, forwardRef} from "react";

interface Props extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  divClass?: string;
  error?: string;
}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({className, id, label, divClass, error, ...otherProps}, ref) => {
    return (
      <div className={classes("space-y-1", divClass)}>
        {label && (
          <label className="label">
            <span className="font-semibold label-text">{label}</span>
          </label>
        )}

        <input
          id={id}
          className={classes(
            "input input-bordered w-full disabled:bg-gray-200/70",
            className,
          )}
          ref={ref}
          {...otherProps}
        />

        {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;

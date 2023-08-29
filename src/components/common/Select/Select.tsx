import {ComponentPropsWithoutRef, forwardRef} from "react";

interface Props extends ComponentPropsWithoutRef<"select"> {
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  return (
    <div className="w-full form-control">
      {props.label && (
        <label className="label">
          <span className="font-semibold label-text">{props.label}</span>
        </label>
      )}
      <select ref={ref} className="select select-bordered" {...props} />
    </div>
  );
});

Select.displayName = "Select";

export default Select;

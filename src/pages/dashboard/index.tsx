import {Logo} from "@/components/common";
import {withMeta} from "@/components/common/Meta/Meta";

const DashboardPage = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col gap-3 text-center md:flex-row">
        <Logo />
      </div>
    </div>
  );
};

export default withMeta(DashboardPage);

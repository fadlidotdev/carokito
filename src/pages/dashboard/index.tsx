import {Logo} from "@/components/common";
import {withMeta} from "@/components/common/Meta/Meta";

const DashboardPage = () => {
  console.log(
    "%c 🚀 process.env.NEXT_PUBLIC_SUPABASE_URL",
    "color: green; font-weight: bold;",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );

  console.log(
    "%c 🚀 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "color: green; font-weight: bold;",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col gap-3 text-center md:flex-row">
        <Logo />
      </div>
    </div>
  );
};

export default withMeta(DashboardPage);

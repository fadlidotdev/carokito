import {Button, GithubCorner, Logo, PasswordField} from "@/components/common";
import {withMeta} from "@/components/common/Meta/Meta";
import TextField from "@/components/common/TextField/TextField";
import {useAuthContext} from "@/components/layouts/DashboardAuthContextProvider";
import constants from "@/utils/constants";
import {supabase} from "@/utils/supabase";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import {z} from "zod";

const schema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {setAdmin} = useAuthContext();
  const onSubmit = (values: z.infer<typeof schema>) => {
    toast.promise(
      supabase.auth.signInWithPassword(values).then((data) => {
        if (data.error) throw new Error(data.error.message);

        localStorage.setItem(
          constants("admin") as string,
          JSON.stringify(data.data.user),
        );

        setAdmin(data.data.user);

        router.push("/dashboard");
      }),
      {
        loading: "Authenticating...",
        success: "Yay! Welcome back",
        error: (error) => error.message,
      },
    );
  };

  return (
    <div className="flex flex-col items-center h-screen gap-8 py-8 bg-gray-100 sm:py-0 sm:justify-center">
      <GithubCorner />

      <Logo />

      <div className="w-full px-8 py-6 sm:shadow sm:bg-white sm:rounded-lg sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <TextField
              type="text"
              id="username"
              label="Username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your username"
              error={errors.email?.message}
              {...register("email")}
            />

            <PasswordField
              id="password"
              label="Password"
              className="pr-10"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="mt-2 place-self-end">
              <Button>Log in</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withMeta(LoginPage, {title: "Login"});

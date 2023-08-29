import {useInsertAdminMutation} from "@/api/admin";
import {Button, TextField} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {routes} from "@/utils/routes";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";

export default function Create() {
  const router = useRouter();

  const {register, handleSubmit: onSubmit} = useForm();

  const {mutateAsync} = useInsertAdminMutation();

  const handleSubmit = onSubmit(async (values) => {
    toast.promise(
      mutateAsync(values, {
        onSuccess: (data) => {
          router.push(routes("dashboard/admin"));
        },
      }),
      {
        loading: "Processing...",
        success: "Yay! Admin was successfully created!",
        error: (error) => error.message,
      },
    );
  });

  return (
    <>
      <DashboardHeader
        title="Create New Admin"
        rightContent={
          <Button type="submit" form="form">
            Save
          </Button>
        }
      />

      <DashboardContent>
        <form
          id="form"
          className="w-full max-w-lg space-y-4"
          onSubmit={handleSubmit}>
          <TextField label="Name" {...register("name")} />
          <TextField label="Email" type="email" {...register("email")} />
          <TextField
            type="password"
            label="Password"
            {...register("password")}
          />
        </form>
      </DashboardContent>
    </>
  );
}

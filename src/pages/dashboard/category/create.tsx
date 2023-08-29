import {useGetCategoryQuery} from "@/api/category";
import {
  useInsertCategoryMutation,
  useUpdateCategoryMutation,
} from "@/api/category/mutation";
import {Button, TextField} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {generateSlugFromString} from "@/utils/core";
import {routes} from "@/utils/routes";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";

export default function Update() {
  const router = useRouter();

  const {register, setValue, watch, reset, handleSubmit: onSubmit} = useForm();
  const name = watch("name");
  useEffect(() => {
    setValue("slug", generateSlugFromString(name));
  }, [name]);

  const insertMutation = useInsertCategoryMutation();

  const handleSubmit = onSubmit(async (values) => {
    toast.promise(
      insertMutation.mutateAsync(values, {
        onSuccess: (data) => {
          if (data.error) throw new Error(data.error.message);

          router.push(routes("dashboard/category"));
        },
      }),
      {
        loading: "Processing...",
        success: "Yay! Category was successfully created!",
        error: "Something went wrong!",
      },
    );
  });

  return (
    <>
      <DashboardHeader
        title="Create Category"
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
          <TextField label="Slug" readOnly disabled {...register("slug")} />
          <TextField label="Description" {...register("description")} />
        </form>
      </DashboardContent>
    </>
  );
}

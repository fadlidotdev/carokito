import {useInsertHashtagMutation} from "@/api/hashtag";
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

export default function Create() {
  const router = useRouter();

  const {register, handleSubmit: onSubmit} = useForm();

  const insertMutation = useInsertHashtagMutation();

  const handleSubmit = onSubmit(async (values) => {
    toast.promise(
      insertMutation.mutateAsync(values, {
        onSuccess: (data) => {
          if (data.error) throw new Error(data.error.message);

          router.push(routes("dashboard/hashtag"));
        },
      }),
      {
        loading: "Processing...",
        success: "Yay! Hashtag was successfully created!",
        error: "Something went wrong!",
      },
    );
  });

  return (
    <>
      <DashboardHeader
        title="Create New Hashtag"
        rightContent={
          <Button form="form" type="submit">
            Save
          </Button>
        }
      />

      <DashboardContent>
        <form
          className="w-full max-w-lg space-y-4"
          id="form"
          onSubmit={handleSubmit}>
          <TextField label="Hashtag" {...register("name")} />
        </form>
      </DashboardContent>
    </>
  );
}

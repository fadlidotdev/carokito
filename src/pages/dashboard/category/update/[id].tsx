import {useGetCategoryQuery} from "@/api/category";
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/api/category/mutation";
import {Button, ConfirmModal, TextField} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {useDisclosure} from "@/hooks";
import {generateSlugFromString} from "@/utils/core";
import {routes} from "@/utils/routes";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";

export default function Update() {
  const router = useRouter();
  const id = router.query.id;

  const {register, setValue, watch, reset, handleSubmit: onSubmit} = useForm();
  const name = watch("name");
  useEffect(() => {
    setValue("slug", generateSlugFromString(name));
  }, [name]);

  const {data} = useGetCategoryQuery(parseInt(id as string), {
    enabled: !!id,
  });

  useEffect(() => {
    if (!data) return;

    const {name, slug, description} = data.data;

    reset({name, slug, description});
  }, [data]);

  const updateMutation = useUpdateCategoryMutation();
  const deleteMutation = useDeleteCategoryMutation();

  const handleSubmit = onSubmit(async (values: any) => {
    toast.promise(
      updateMutation.mutateAsync(
        {...values, id: parseInt(id as string)},
        {
          onSuccess: (data) => {
            if (data.error) throw new Error(data.error.message);

            router.push(routes("dashboard/category"));
          },
        },
      ),
      {
        loading: "Processing...",
        success: "Yay! Category was successfully updated!",
        error: "Something went wrong!",
      },
    );
  });

  const [openDeleteConfirm, {onToggle: onToggleDeleteConfirm}] =
    useDisclosure();

  const handleDelete = async () => {
    onToggleDeleteConfirm();

    toast.promise(
      deleteMutation.mutateAsync(parseInt(id as string), {
        onSuccess: (data) => {
          if (data.error) throw new Error(data.error.message);

          router.push(routes("dashboard/category"));
        },
      }),
      {
        loading: "Processing...",
        success: "Yay! Category was successfully deleted!",
        error: "Something went wrong!",
      },
    );
  };

  return (
    <>
      <DashboardHeader
        title="Update Category"
        rightContent={
          <div className="flex gap-2">
            <Button type="submit" form="form">
              Update
            </Button>

            <Button
              variant="danger"
              type="button"
              onClick={onToggleDeleteConfirm}>
              Delete
            </Button>
          </div>
        }
      />

      <ConfirmModal
        header="Delete Category"
        open={openDeleteConfirm}
        yesButtonVariant="danger"
        yesText="Yes, delete"
        onClose={onToggleDeleteConfirm}
        onConfirm={handleDelete}>
        <p>Are you sure want to delete this Category?</p>
      </ConfirmModal>

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

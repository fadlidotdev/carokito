import {
  useDeleteAdminMutation,
  useGetAdminQuery,
  useUpdateAdminMutation,
} from "@/api/admin";
import {Button, ConfirmModal, TextField} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {useDisclosure} from "@/hooks";
import {routes} from "@/utils/routes";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";

export default function Update() {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    register,
    formState: {errors},
    reset,
    watch,
    handleSubmit: onSubmit,
  } = useForm();

  const {data} = useGetAdminQuery(parseInt(id as string), {
    enabled: !!id,
  });

  useEffect(() => {
    const admin = data?.data;
    if (admin) {
      const {name, email} = admin;

      reset({name, email});
    }
  }, [data]);

  const uid = data?.data?.uid;

  const updateMutation = useUpdateAdminMutation();
  const handleSubmit = onSubmit(({name, password, email}: any) => {
    toast.promise(
      updateMutation.mutateAsync(
        {
          uid,
          name,
          email,
          password,
        },
        {
          onSuccess: (data) => {
            if (data.error) throw new Error(data.error.message);

            router.push(routes("dashboard/admin"));
          },
        },
      ),
      {
        loading: "Processing...",
        success: "Yay! Admin was successfully updated!",
        error: "Something went wrong!",
      },
    );
  });

  // const handleClickUpdate = () => {
  //   toast.success("Admin updated successfully!");
  //   router.push(routes("dashboard/admin"));
  // };

  const [openDeleteConfirm, {onToggle: onToggleDeleteConfirm}] =
    useDisclosure();

  const deleteMutation = useDeleteAdminMutation();

  const handleDelete = async () => {
    onToggleDeleteConfirm();

    toast.promise(
      deleteMutation.mutateAsync(uid, {
        onSuccess: (data) => {
          if (data.error) throw new Error(data.error.message);

          router.push(routes("dashboard/admin"));
        },
      }),
      {
        loading: "Processing...",
        success: "Yay! Admin was successfully deleted!",
        error: (error) => error.message,
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
            <Button variant="danger" onClick={onToggleDeleteConfirm}>
              Delete
            </Button>
          </div>
        }
      />

      <ConfirmModal
        header="Delete Admin"
        open={openDeleteConfirm}
        yesButtonVariant="danger"
        yesText="Yes, delete"
        onClose={onToggleDeleteConfirm}
        onConfirm={handleDelete}>
        <p>Are you sure want to delete this Admin?</p>
      </ConfirmModal>

      <DashboardContent className="space-y-6">
        <form
          id="form"
          className="w-full max-w-lg space-y-4"
          onSubmit={handleSubmit}>
          <TextField label="Name" {...register("name")} />
          <TextField label="Email" readOnly disabled {...register("email")} />

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Change Password</h2>

            <TextField
              type="password"
              label="New Password"
              {...register("password")}
            />
            <TextField
              type="password"
              label="Confirm Password"
              error={
                errors?.confirm_password ? "Confirm password do not match" : ""
              }
              {...register("confirm_password", {
                validate: (value) => value === watch("password"),
              })}
            />
          </div>
        </form>
      </DashboardContent>
    </>
  );
}

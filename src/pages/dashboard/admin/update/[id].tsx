import {useDeleteAdminMutation, useGetAdminQuery} from "@/api/admin";
import {Button, ConfirmModal, TextField} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {useDisclosure} from "@/hooks";
import {routes} from "@/utils/routes";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

export default function Update() {
  const router = useRouter();
  const id = router.query.id;

  const {data} = useGetAdminQuery(parseInt(id as string), {
    enabled: !!id,
  });
  console.log("🚀 ~ const{data}=useGetAdminQuery ~ data:", data);

  const uid = data?.data?.uid;
  console.log("🚀 ~ Update ~ uid:", uid);

  const handleClickUpdate = () => {
    toast.success("Admin updated successfully!");
    router.push(routes("dashboard/admin"));
  };

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
            <Button onClick={handleClickUpdate}>Update</Button>
            <Button variant="danger" onClick={onToggleDeleteConfirm}>
              Delete
            </Button>
          </div>
        }
      />

      <DashboardContent className="space-y-6">
        <form className="w-full max-w-lg space-y-4">
          <TextField label="Name" />
          <TextField label="Email" readOnly disabled />
        </form>

        <ConfirmModal
          header="Delete Admin"
          open={openDeleteConfirm}
          yesButtonVariant="danger"
          yesText="Yes, delete"
          onClose={onToggleDeleteConfirm}
          onConfirm={handleDelete}>
          <p>Are you sure want to delete this Admin?</p>
        </ConfirmModal>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Change Password</h2>

          <form className="w-full max-w-lg space-y-4">
            <TextField type="password" label="Current Password" />
            <TextField type="password" label="New Password" />
            <TextField type="password" label="Confirm Password" />
          </form>
        </div>
      </DashboardContent>
    </>
  );
}

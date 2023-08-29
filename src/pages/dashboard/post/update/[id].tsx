import {useGetAllCategoryQuery} from "@/api/category/query";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/api/post/mutation";
import {useGetPostQuery} from "@/api/post/query";
import {Button, ConfirmModal, Select, TextField} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {ImageUpload, RichTextEditor} from "@/components/shared";
import {useDisclosure} from "@/hooks";
import {
  base64ToFile,
  compressImageFile,
  generateSlugFromString,
  getSelectOptions,
  toBase64,
} from "@/utils/core";
import {routes} from "@/utils/routes";
import {useRouter} from "next/router";
import {useEffect, useMemo, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";

const contentInitialValue = [
  {
    type: "paragraph",
    children: [{text: ""}],
  },
];

export default function Update() {
  const router = useRouter();
  const id = router.query.id as string;

  const {watch, reset, register, handleSubmit: onSubmit} = useForm();
  const [content, setContent] = useState(contentInitialValue);
  const slugRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  console.log("🚀 ~ Update ~ imageFile:", imageFile);

  const {data} = useGetPostQuery(parseInt(id), {enabled: !!id});

  useEffect(() => {
    if (!data) return;
    const {title, category_id, cover_image} = data.data;

    if (cover_image) {
      setImageFile(base64ToFile(cover_image));
    }

    reset({
      title,
      category: category_id.toString(),
    });
  }, [data]);

  const editorContent = useMemo(() => {
    if (!data) return contentInitialValue;

    try {
      return JSON.parse(data.data.content);
    } catch (error) {
      return contentInitialValue;
    }
  }, [data]);

  const {data: categoryData} = useGetAllCategoryQuery({page: 1, limit: 100});
  const categoryOptions = useMemo(() => {
    if (categoryData?.data) {
      return getSelectOptions(categoryData.data, "id", "name");
    }

    return [];
  }, [categoryData]);

  const updateMutation = useUpdatePostMutation();

  const handleSubmit = onSubmit(async ({title, category}) => {
    let base64Image = null;

    if (imageFile) {
      const compressedImageFile = await compressImageFile(imageFile);
      base64Image = await toBase64(compressedImageFile);
    }

    const payload = {
      id: parseInt(id),
      title,
      category_id: parseInt(category),
      author_id: 1,
      content: JSON.stringify(content),
      slug: slugRef.current.value,
      cover_image: base64Image,
    };

    toast.promise(
      updateMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          if (data.error) throw new Error(data.error.message);

          router.push(routes("dashboard/post"));
        },
      }),
      {
        loading: "Processing...",
        success: "Yay! Post was successfully updated!",
        error: "Something went wrong!",
      },
    );
  });

  const [openDeleteConfirm, {onToggle: onToggleDeleteConfirm}] =
    useDisclosure();
  const deleteMutation = useDeletePostMutation();
  const handleDelete = async () => {
    onToggleDeleteConfirm();

    toast.promise(
      deleteMutation.mutateAsync(parseInt(id as string), {
        onSuccess: (data) => {
          if (data.error) throw new Error(data.error.message);

          router.push(routes("dashboard/post"));
        },
      }),
      {
        loading: "Processing...",
        success: "Yay! Hashtag was successfully deleted!",
        error: "Something went wrong!",
      },
    );
  };

  return (
    <>
      <DashboardHeader
        title="Update Post"
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
        header="Delete Post"
        open={openDeleteConfirm}
        yesButtonVariant="danger"
        yesText="Yes, delete"
        onClose={onToggleDeleteConfirm}
        onConfirm={handleDelete}>
        <p>Are you sure want to delete this Post?</p>
      </ConfirmModal>

      <DashboardContent>
        <form id="form" className="w-full space-y-4" onSubmit={handleSubmit}>
          <ImageUpload
            imagePreview={imageFile ? URL.createObjectURL(imageFile) : ""}
            onChange={(imageFile) => setImageFile(imageFile)}
          />

          <TextField label="Title" {...register("title")} />

          <RichTextEditor
            initialValue={editorContent}
            onChange={(value) => setContent(value)}
          />

          <TextField
            ref={slugRef}
            label="Slug"
            readOnly
            disabled
            defaultValue={generateSlugFromString(watch("title"))}
          />

          <Select label="Category" {...register("category")}>
            <option value="" disabled>
              Choose category
            </option>
            {categoryOptions.map(({value, label}) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </form>
      </DashboardContent>
    </>
  );
}

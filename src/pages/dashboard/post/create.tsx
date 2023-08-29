import {useGetAllCategoryQuery} from "@/api/category/query";
import {useInsertPostMutation} from "@/api/post/mutation";
import {Button, Select, TextField} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {ImageUpload, RichTextEditor} from "@/components/shared";
import {
  compressImageFile,
  generateSlugFromString,
  getSelectOptions,
  toBase64,
} from "@/utils/core";
import {routes} from "@/utils/routes";
import {useRouter} from "next/router";
import {useMemo, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";

const contentInitialValue = [
  {
    type: "paragraph",
    children: [{text: ""}],
  },
];

export default function Create() {
  const router = useRouter();

  const {data} = useGetAllCategoryQuery({page: 1, limit: 100});
  const categoryOptions = useMemo(() => {
    if (data?.data) {
      return getSelectOptions(data.data, "id", "name");
    }

    return [];
  }, [data]);

  const {watch, register, handleSubmit: onSubmit} = useForm();
  const [content, setContent] = useState(contentInitialValue);
  const slugRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const insertMutation = useInsertPostMutation();

  const handleSubmit = onSubmit(async ({title, category}) => {
    let base64Image = null;
    if (imageFile) {
      const compressedImageFile = await compressImageFile(imageFile);
      base64Image = await toBase64(compressedImageFile);
    }

    const payload = {
      title,
      category_id: parseInt(category),
      author_id: 1,
      content: JSON.stringify(content),
      slug: slugRef.current.value,
      cover_image: base64Image,
    };

    toast.promise(
      insertMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          if (data.error) throw new Error(data.error.message);

          router.push(routes("dashboard/post"));
        },
      }),
      {
        loading: "Processing...",
        success: "Yay! Post was successfully created!",
        error: "Something went wrong!",
      },
    );
  });

  return (
    <>
      <DashboardHeader
        title="Create New Post"
        rightContent={
          <Button type="submit" form="form">
            Save
          </Button>
        }
      />

      <DashboardContent>
        <form id="form" className="w-full space-y-4" onSubmit={handleSubmit}>
          <ImageUpload
            imagePreview={imageFile ? URL.createObjectURL(imageFile) : ""}
            onChange={(imageFile) => setImageFile(imageFile)}
          />

          <TextField label="Title" {...register("title")} />

          <RichTextEditor
            initialValue={contentInitialValue}
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

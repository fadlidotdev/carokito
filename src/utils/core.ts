import imageCompression from "browser-image-compression";
import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export const classes = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));

export const capitalize = (value: string | undefined) =>
  !value ? "" : `${value[0].toUpperCase()}${value.slice(1)}`;

export const getSelectOptions = (
  array: unknown[],
  valueKey: string,
  labelKey: string,
) => {
  return array.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
};

export const generateSlugFromString = (value = "") => {
  return value.toLowerCase().split(" ").join("-");
};

export const compressImageFile = async (file) => {
  if (!file) return null;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1080,
  };

  try {
    const compressedFile = await imageCompression(file, options);

    return compressedFile;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const base64ToFile = (base64) => {
  const byteString = atob(base64.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const newBlob = new Blob([ab], {
    type: "image/jpeg",
  });
  return newBlob;
};

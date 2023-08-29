import {useMutation} from "@tanstack/react-query";
import API from "./api";

export const useInsertCategoryMutation = () =>
  useMutation({
    mutationFn: API.insert,
  });

export const useUpdateCategoryMutation = () =>
  useMutation({
    mutationFn: API.update,
  });

export const useDeleteCategoryMutation = () =>
  useMutation({
    mutationFn: API.delete,
  });

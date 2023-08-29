import {useMutation} from "@tanstack/react-query";
import API from "./api";

export const useInsertPostMutation = () =>
  useMutation({
    mutationFn: API.insert,
  });

export const useUpdatePostMutation = () =>
  useMutation({
    mutationFn: API.update,
  });

export const useDeletePostMutation = () =>
  useMutation({
    mutationFn: API.delete,
  });

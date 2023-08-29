import {useMutation} from "@tanstack/react-query";
import API from "./api";

export const useInsertHashtagMutation = () =>
  useMutation({
    mutationFn: API.insert,
  });

export const useUpdateHashtagMutation = () =>
  useMutation({
    mutationFn: API.update,
  });

export const useDeleteHashtagMutation = () =>
  useMutation({
    mutationFn: API.delete,
  });

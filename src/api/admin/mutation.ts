import {useMutation} from "@tanstack/react-query";
import API from "./api";

export const useInsertAdminMutation = () =>
  useMutation({
    mutationFn: API.insert,
  });

export const useUpdateAdminMutation = () =>
  useMutation({
    mutationFn: API.update,
  });

export const useDeleteAdminMutation = () =>
  useMutation({
    mutationFn: API.delete,
  });

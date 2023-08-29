import {UseQueryOptions, useQuery} from "@tanstack/react-query";
import API from "./api";
import {GetAllAdminParams} from "./types";

export const useGetAllAdminQuery = (params: GetAllAdminParams) =>
  useQuery({
    queryKey: ["admin", "all", params],
    queryFn: () => API.getAll(params),
  });

export const useGetAdminQuery = (
  id: number,
  options: UseQueryOptions<any, any>,
) =>
  useQuery({
    queryKey: ["admin", "detail"],
    queryFn: () => API.get(id),
    ...options,
  });

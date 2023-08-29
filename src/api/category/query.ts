import {UseQueryOptions, useQuery} from "@tanstack/react-query";
import API from "./api";
import {GetAllCategoryParams} from "./types";

export const useGetAllCategoryQuery = (params: GetAllCategoryParams) =>
  useQuery({
    queryKey: ["category", "all", params],
    queryFn: () => API.getAll(params),
  });

export const useGetCategoryQuery = (
  id: number,
  options: UseQueryOptions<any, any>,
) =>
  useQuery({
    queryKey: ["category", "detail"],
    queryFn: () => API.get(id),
    ...options,
  });

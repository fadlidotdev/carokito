import {UseQueryOptions, useQuery} from "@tanstack/react-query";
import API from "./api";
import {GetAllHashtagParams} from "./types";

export const useGetAllHashtagQuery = (params: GetAllHashtagParams) =>
  useQuery({
    queryKey: ["category", "all", params],
    queryFn: () => API.getAll(params),
  });

export const useGetHashtagQuery = (
  id: number,
  options: UseQueryOptions<any, any>,
) =>
  useQuery({
    queryKey: ["category", "detail"],
    queryFn: () => API.get(id),
    ...options,
  });

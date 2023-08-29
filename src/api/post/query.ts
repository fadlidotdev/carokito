import {UseQueryOptions, useQuery} from "@tanstack/react-query";
import API from "./api";
import {GetAllPostParams} from "./types";

export const useGetAllPostQuery = (params: GetAllPostParams) =>
  useQuery({
    queryKey: ["posts", params],
    queryFn: () => API.getAll(params),
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetPostQuery = (id: number, options?: UseQueryOptions<any>) =>
  useQuery({
    queryKey: ["posts", "detail", id],
    queryFn: () => API.get(id),
    ...options,
  });

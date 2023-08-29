import {supabase} from "@/utils/supabase";
import {GetAllCategoryParams, InsertCategoryParams} from "./types";
import {getPaginateRange} from "../utils";

export const TABLE_CATEGORY = "category";

const API = {
  getAll: async (params: GetAllCategoryParams) => {
    const [from, to] = getPaginateRange(params.page, params.limit);

    return await supabase
      .from(TABLE_CATEGORY)
      .select("*", {count: "exact"})
      .range(from, to);
  },

  get: async (id: number) => {
    return await supabase
      .from(TABLE_CATEGORY)
      .select("*")
      .eq("id", id)
      .single();
  },

  insert: async (params: InsertCategoryParams) => {
    return await supabase.from(TABLE_CATEGORY).insert({
      ...params,
    });
  },

  update: async ({id, ...others}: InsertCategoryParams & {id: number}) => {
    return await supabase
      .from(TABLE_CATEGORY)
      .update({
        ...others,
      })
      .eq("id", id);
  },

  delete: async (id: number) => {
    return await supabase.from(TABLE_CATEGORY).delete().eq("id", id);
  },
};

export default API;

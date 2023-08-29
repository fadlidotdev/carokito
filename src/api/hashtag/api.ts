import {supabase} from "@/utils/supabase";
import {GetAllHashtagParams, InsertHashtagParams} from "./types";
import {getPaginateRange} from "../utils";

export const TABLE_HASHTAG = "hashtag";

const API = {
  getAll: async (params: GetAllHashtagParams) => {
    const [from, to] = getPaginateRange(params.page, params.limit);

    return await supabase
      .from(TABLE_HASHTAG)
      .select("*", {count: "exact"})
      .range(from, to);
  },

  get: async (id: number) => {
    return await supabase.from(TABLE_HASHTAG).select("*").eq("id", id).single();
  },

  insert: async (params: InsertHashtagParams) => {
    return await supabase.from(TABLE_HASHTAG).insert({
      ...params,
    });
  },

  update: async ({id, ...others}: InsertHashtagParams & {id: number}) => {
    return await supabase
      .from(TABLE_HASHTAG)
      .update({
        ...others,
      })
      .eq("id", id);
  },

  delete: async (id: number) => {
    return await supabase.from(TABLE_HASHTAG).delete().eq("id", id);
  },
};

export default API;

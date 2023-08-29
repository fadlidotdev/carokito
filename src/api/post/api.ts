import {supabase} from "@/utils/supabase";
import {getPaginateRange} from "../utils";
import {GetAllPostParams, InsertPostParams} from "./types";

export const TABLE_POST = "post";

const API = {
  get: async (id: number) => {
    return await supabase.from("post").select("*").eq("id", id).maybeSingle();
  },
  getAll: async (params: GetAllPostParams) => {
    const [from, to] = getPaginateRange(params.page, params.limit);

    return await supabase
      .from(TABLE_POST)
      .select(
        `
        id, title, created_at, hashtags, 
        category (name), 
        admin (name)`,
        {count: "exact"},
      )
      .range(from, to);
  },

  insert: async (params: InsertPostParams) => {
    return await supabase.from(TABLE_POST).insert({
      ...params,
    });
  },

  update: async (params: InsertPostParams & {id: number}) => {
    return await supabase
      .from(TABLE_POST)
      .update({
        ...params,
      })
      .eq("id", params.id);
  },

  delete: async (id: number) => {
    return await supabase.from(TABLE_POST).delete().eq("id", id);
  },
};

export default API;

import {supabase} from "@/utils/supabase";
import {getPaginateRange} from "../utils";
import {GetAllAdminParams, InsertAdminParams} from "./types";

export const TABLE_ADMIN = "admin";

const API = {
  getAll: async (params: GetAllAdminParams) => {
    const [from, to] = getPaginateRange(params.page, params.limit);

    return await supabase
      .from(TABLE_ADMIN)
      .select("*", {count: "exact"})
      .range(from, to);
  },

  get: async (id: number) => {
    return await supabase.from(TABLE_ADMIN).select("*").eq("id", id).single();
  },

  insert: async (params: InsertAdminParams) => {
    const {name, email, password} = params;

    const exist = await supabase
      .from(TABLE_ADMIN)
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (exist.data) {
      throw "User with the email already exists";
    }

    const auth = await supabase.auth.admin.createUser({
      email,
      password,
    });

    return await supabase.from(TABLE_ADMIN).insert({
      name,
      email,
      uid: auth?.data?.user?.id,
    });
  },

  update: async ({id, ...others}: InsertAdminParams & {id: number}) => {
    return await supabase
      .from(TABLE_ADMIN)
      .update({
        ...others,
      })
      .eq("id", id);
  },

  delete: async (uid: string) => {
    await supabase.from(TABLE_ADMIN).delete().eq("uid", uid);

    const {data, error} = await supabase.auth.admin.deleteUser(uid);

    if (error) throw error;

    return data;
  },
};

export default API;

import {supabase} from "@/utils/supabase";
import {getPaginateRange} from "../utils";
import {GetAllAdminParams, InsertAdminParams} from "./types";
import axios from "axios";

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

    const authResult = await axios.post("/api/admin/create", {
      email,
      password,
    });

    return await supabase.from(TABLE_ADMIN).insert({
      name,
      email,
      uid: authResult?.data?.data?.user?.id,
    });
  },

  update: async (params: InsertAdminParams & {uid: string}) => {
    const {uid, name, email, password} = params;

    if (password) await axios.put("/api/admin/update", {uid, email, password});

    return await supabase
      .from(TABLE_ADMIN)
      .update({
        name,
        email,
      })
      .eq("uid", uid);
  },

  delete: async (uid: string) => {
    await supabase.from(TABLE_ADMIN).delete().eq("uid", uid);
    const response = await axios.post(`/api/admin/delete`, {id: uid});
    const {data, error} = response.data;

    if (error) throw error;

    return data;
  },
};

export default API;

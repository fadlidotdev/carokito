import {createClient} from "@supabase/supabase-js";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const id = req.body.id as string;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_ROLE_KEY as string,
  );

  const result = await supabase.auth.admin.deleteUser(id);

  res.status(200).json(result);
}

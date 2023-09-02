import {createClient} from "@supabase/supabase-js";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {email, password} = req.body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_ROLE_KEY as string,
  );

  const result = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  res.status(200).json(result);
}

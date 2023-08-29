import {Paginate} from "../types";

export interface GetAllAdminParams extends Paginate {}

export interface InsertAdminParams {
  name: string;
  email: string;
  password: string;
}

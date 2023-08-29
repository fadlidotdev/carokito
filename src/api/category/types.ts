import {Paginate} from "../types";

export interface GetAllCategoryParams extends Paginate {}

export interface InsertCategoryParams {
  name: string;
  slug: string;
  description?: string;
}

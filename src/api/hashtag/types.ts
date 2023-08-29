import {Paginate} from "../types";

export interface GetAllHashtagParams extends Paginate {}

export interface InsertHashtagParams {
  name: string;
}

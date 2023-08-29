import {Paginate} from "../types";

export interface GetAllPostParams extends Paginate {}

export interface InsertPostParams {
  title: string;
  category_id: number;
  author_id: number;
  content: string;
  slug: string;
  cover_image?: string;
}

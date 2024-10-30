import { Coordinates } from "@/types/Coordinates";

interface CreatePostData {
  images: string[];
  name: string;
  age?: number;
  color?: string;
  breed?: string;
  description: string;
  reward?: number;
  location?: Coordinates;
}

export const createPost = (data: CreatePostData) => {
  console.log("createPost :>> ", data);
  return;
};

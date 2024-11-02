import { Coordinates } from "./Coordinates";

export interface Post {
  id?: number | null;
  images: string[];
  thumbnailImage: string;
  name: string;
  age?: number | null;
  color: string;
  breed: string;
  description: string;
  reward?: number | null;
  location: Coordinates;
}

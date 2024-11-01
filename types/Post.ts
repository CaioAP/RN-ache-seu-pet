import { Coordinates } from "./Coordinates";

export interface Post {
  id: number | null;
  images: string[];
  thumbnailImage: string;
  name: string;
  age: number;
  color: string;
  breed: string;
  description: string;
  location: Coordinates;
  reward?: number;
}

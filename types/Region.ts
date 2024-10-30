import { Coordinates } from "./Coordinates";

export interface Region extends Coordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}

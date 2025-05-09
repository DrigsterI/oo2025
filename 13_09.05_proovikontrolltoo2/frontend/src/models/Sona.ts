import { Sonastik } from "./Sonastik";

export type Sona = {
  typeID: number;
  type: string;
  description: string;

  sonastik: Sonastik | null;
};

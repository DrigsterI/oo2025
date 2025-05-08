import { Sportlane } from "./Sportlane";

export type Tulemus = {
  id: number;
  tupp: ScoreType;
  punktid: number;
  sportlane?: Sportlane;
};

export enum ScoreType {
  M100_JOOKS = "100m jooks",
  KAUGUSHUPE = "Kaugushüpe",
  KUULITOUGE = "Kuulitõuge",
  KORGUSHUPE = "Kõrgushüpe",
  M400_JOOKS = "400m jooks",
  M110_TOKKEJOOKS = "110m tõkkejooks",
  KETTAHEIDE = "Kettaheide",
  TEIVASHUPE = "Teivashüpe",
  ODAVISE = "Odavise",
  M1500_JOOKS = "1500m jooks",
}

export function getEnumKeys<
  T extends string,
  TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>;
}

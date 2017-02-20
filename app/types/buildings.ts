export type BuildingsList = {
  habs: number;
  foodFactories: number;
  titaniumFactories: number;
}

export interface IBuilding {
  cost: number;
  level: number;
  name: string;
  namePlural: string;
  [key: string]: any;
}

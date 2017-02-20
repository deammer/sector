import { IBuilding } from './buildings';

export interface IHab extends IBuilding {
  capacity: number;
}

export interface IFoodFactory extends IBuilding {
  capacity: number;
}

export interface ITitaniumFactory extends IBuilding {
  capacity: number;
}

export type Config = {
  HAB: IHab;
  FOOD_FACTORY: IFoodFactory;
  TITANIUM_FACTORY: ITitaniumFactory;
}

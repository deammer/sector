export enum ACTION { SetResources, SetBuildings, SetPopulation }

export interface ICounterAction {
  type: ACTION;
  counterId?: number;
}

export interface IResourceAction {
  type: ACTION;
  payload: any;
}

export interface IBuildingAction {
  type: ACTION;
  payload: any;
}

export interface IPopulationAction {
  type: ACTION;
  payload: any;
}

export function setResources(resources: {}): IResourceAction {
  return { payload: resources, type: ACTION.SetResources };
}

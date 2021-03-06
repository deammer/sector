import { combineReducers } from 'redux';
import { ACTION, IResourceAction, IBuildingAction, IPopulationAction } from './actions';
import { routerReducer } from 'react-router-redux';
import { Population } from './types/population';
import { BuildingsList } from './types/buildings';
import { Resources } from './types/resources';
import config from './reducers/config';

const defaultResourcesState: Resources = {
  food: 0,
  titanium: 0
};

function resources(state: Resources = defaultResourcesState, action: IResourceAction): any {
  switch (action.type) {
    case ACTION.SetResources:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

const defaultBuildingsState: BuildingsList = {
  habs: 1,
  titaniumFactories: 0,
  foodFactories: 0
};

function buildings(state: BuildingsList = defaultBuildingsState, action: IBuildingAction): any {
  switch (action.type) {
    case ACTION.SetBuildings:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

const defaultPopulationState: Population = {
  androids: 0,
  clones: 0,
  humans: 5,
};

function population(state: Population = defaultPopulationState, action: IPopulationAction): any {
  switch (action.type) {
    case ACTION.SetPopulation:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  routing: routerReducer,
  config,
  buildings,
  resources,
  population });

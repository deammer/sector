import Game from '../components/game';
import { ACTION } from '../actions';
import { Resources } from '../types/resources';
import { Population } from '../types/population';
import { BuildingsList } from '../types/buildings';
import { Config } from '../types/config';
import { connect } from 'react-redux';

type IMapStateToProps = {
  buildings: BuildingsList;
  resources: Resources;
  population: Population;
  config: Config;
}

function mapStateToProps({ buildings, population, resources, config }: any): IMapStateToProps {
  return { population, resources, buildings, config };
}

export interface IMapDispatchToProps {
  doThing: (credentials: any) => void;
  setBuildings: (bl: BuildingsList) => void;
  setPopulation: (p: Population) => void;
  setResources: (r: Resources) => void;
}

function mapDispatchToProps(dispatch: Function, ownProps: any): IMapDispatchToProps {
  return {
    doThing: ({ username, password }: any) => {
      console.log(username, password);
    },
    setBuildings: (payload: BuildingsList) => {
      dispatch({ type: ACTION.SetBuildings, payload });
    },
    setPopulation: (payload: Population) => {
      dispatch({ type: ACTION.SetPopulation, payload });
    },
    setResources: (payload: Resources) => {
      dispatch({ type: ACTION.SetResources, payload });
    }
  };
};

function mergeProps(stateProps: IMapStateToProps, dispatchProps: IMapDispatchToProps, ownProps: any): any {

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Game as any);

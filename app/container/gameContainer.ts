import Game from '../components/game';
import { ACTION } from '../actions';
import { IResources } from '../types/resources';
import { Population } from '../types/population';
import { BuildingsList } from '../types/buildings';
import { Config } from '../types/config';
import { connect } from 'react-redux';

type IMapStateToProps = {
  buildings: BuildingsList;
  resources: IResources;
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
}

function mapDispatchToProps(dispatch: Function, ownProps: any): IMapDispatchToProps {
  return {
    doThing: ({ username, password }: any) => {
      console.log(username, password);
    },
    setBuildings: (bl: BuildingsList) => {
      dispatch({ type: ACTION.SetBuildings, payload: bl });
    },
    setPopulation: (p: Population) => {
      dispatch({ type: ACTION.SetPopulation, payload: p });
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

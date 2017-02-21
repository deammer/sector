import SaveManager from '../components/saveManager';
import { Resources } from '../types/resources';
import { connect } from 'react-redux';

type IMapStateToProps = {
  resources: Resources;
}

function mapStateToProps({ resources }: any): IMapStateToProps {
  return { resources };
}

type IMapDispatchToProps = {
  doThing: (credentials: any) => void;
}

function mapDispatchToProps(dispatch: Function, ownProps: any): IMapDispatchToProps {
  return {
    doThing: ({ username, password }: any) => {
      console.log(username, password);
    },
  };
};

function mergeProps(stateProps: IMapStateToProps, dispatchProps: IMapDispatchToProps, ownProps: any): any {

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaveManager as any);

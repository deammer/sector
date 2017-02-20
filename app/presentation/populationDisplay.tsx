import * as React from 'react';
import { Population } from '../types/population';
import { BuildingsList } from '../types/buildings';
import { IGlobalProps } from '../types/global';

interface IPopulationDisplayProps extends IGlobalProps {
  buildings: BuildingsList;
  population: Population;
  setPopulation: (pop: Population) => void;
}

interface IPopulationDisplayState {
  isSubscribed: boolean;
}

const config: any = {
  humanIncubationTime: 10 * 1000
};

export default class PopulationDisplay extends React.Component<IPopulationDisplayProps, IPopulationDisplayState> {
  public static contextTypes = {
    loop: React.PropTypes.object
  };

  private lastHumanTime: number;

  constructor(props: IPopulationDisplayProps) {
    super(props);

    this.lastHumanTime = 0;

    this.state = {
      isSubscribed: false
    };
  }

  public render(): React.ReactElement<{}> {
    const { humans } = this.props.population;
    const { habs } = this.props.buildings;
    const { capacity } = this.props.config.HAB;

    let numHumans = <span>{humans}</span>;
    if (humans > habs * capacity) {
      numHumans = <span className="error">{humans}</span>;
    }

    return (
      <div className="box">
        Humans: {numHumans}/{habs * capacity}
      </div>
    );
  }

  public componentDidMount() {
    this.subscribe();
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  public componentDidUpdate(prevProps: IPopulationDisplayProps) {
    const { humans } = this.props.population;
    const { habs } = this.props.buildings;
    const { capacity } = this.props.config.HAB;

    // If we're NOT subscribed, maybe do so?
    if (!this.state.isSubscribed) {
      if (humans < habs * capacity) {
        this.subscribe();
      }
    } else { // If we're subscribed, check that we can still spawn stuff
      if (humans >= habs * capacity) {
        this.unsubscribe();
      }
    }
  }

  private subscribe() {
    if (!this.state.isSubscribed) {
      this.setState({ isSubscribed: true });
      this.context.loop.subscribe(this.onFrame);
    }
  }

  private unsubscribe() {
    if (this.state.isSubscribed) {
      this.setState({ isSubscribed: false });
      this.context.loop.unsubscribe(this.onFrame);
    }
  }

  private onFrame = (elapsed: number) => {
    this.lastHumanTime += elapsed;

    if (this.lastHumanTime >= config.humanIncubationTime) {
      this.lastHumanTime = 0;

      // Spawn a human
      const population = Object.assign({}, this.props.population);
      population.humans ++;
      this.props.setPopulation(population);
    }
  }
}

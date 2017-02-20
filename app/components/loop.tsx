import * as React from 'react';
import GameLoop from '../utils/gameLoop';

export default class Loop extends React.Component<{}, {}> {
  public static childContextTypes = {
    loop: React.PropTypes.object,
  };

  private loop: any;

  constructor(props: {}) {
    super(props);

    this.loop = new GameLoop();
  }

  public render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  public componentDidMount() {
    this.loop.start();
  }

  public componentWillUnmount() {
    this.loop.stop();
  }

  public getChildContext() {
    return {
      loop: this.loop,
    };
  }
}

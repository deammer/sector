import * as React from 'react';
import { Resources } from '../types/resources';
import { IGlobalProps } from '../types/global';

interface IResourceDisplayProps extends IGlobalProps {
  resources: Resources;
}

export default class ResourceDisplay extends React.Component<IResourceDisplayProps, {}> {
  constructor(props: IResourceDisplayProps) {
    super(props);
  }

  public render(): React.ReactElement<{}> {
    const { resources } = this.props;

    if (!resources) {
      return <div/>;
    }

    return (
      <div className="box">
        <h3>Resources</h3>
        <table className="table">
          <tbody>
            <tr>
              <td>Food</td>
              <td>{resources.food}</td>
              <td>▲ &#9650; ▼ &#9660; &and; &or;</td>
            </tr>
            <tr>
              <td>Titanium</td>
              <td>{resources.titanium}</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

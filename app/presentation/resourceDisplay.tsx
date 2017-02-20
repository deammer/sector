import * as React from 'react';
import { ResourcesType } from '../types/resources';

interface IResourceDisplayProps {
  resources?: ResourcesType;
}

export default class ResourceDisplay extends React.Component<IResourceDisplayProps, {}> {
  constructor(props: IResourceDisplayProps) {
    super(props);
  }

  public render(): React.ReactElement<{}> {
    const { resources }: any = this.props;

    if (!resources) {
      return <div/>;
    }

    return (
      <div className="box">
        <h3>Resources</h3>
        <p>Titanium: {resources.titanium}</p>
      </div>
    );
  }
}

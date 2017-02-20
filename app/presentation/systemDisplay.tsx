import * as React from 'react';
import Button from './button';

const baseCoords: any = { x: 0, y: 0 };
const asteroids: any[] = [
  { amount: 240, resource: 'titanium', x: 3, y: 4 },
  { amount: 300, resource: 'titanium', x: 5, y: -2 },
  { amount: 1235, resource: 'titanium', x: 12, y: -5 },
];

export default class SystemDisplay extends React.Component<{}, {}> {
  constructor() {
    super();

    this.state = {
      buildingCorvette: false,
      buildingInterceptor: false,
    };
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className="box">
        <h3>System</h3>
        {asteroids.map((a, i: number) => {
          return (
            <div className="pbs" key={i}>
              <span>Asteroid {i} - {a.amount} {a.resource} - {this.getDistanceToBase(a)}du</span>
              <Button className="mls" label="Mine" />
            </div>
          );
        })}
      </div>
    );
  }

  private getDistanceToBase(item: any): string {
    const { x, y }: any = item;
    const distance: number = Math.sqrt(
      (x - baseCoords.x) * (x - baseCoords.x) +
      (y - baseCoords.y) * (y - baseCoords.y));
    return distance.toFixed(2);
  }
}

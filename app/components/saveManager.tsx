import * as React from 'react';
import Button from '../presentation/button';

export default class SaveManager extends React.Component<{}, {}> {
  public render(): React.ReactElement<{}> {
    console.log(this.props);
    return (
      <Button label="Save" onClick={() => { this.bakeCookies(); }} />
    );
  }

  private bakeCookies(): void {
    const value: any = {};
    const cookie: string = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
  }
}

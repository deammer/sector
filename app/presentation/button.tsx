import * as React from 'react';

interface IButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  label?: React.ReactNode;
  onClick?: Function;
}

export default class Button extends React.Component<IButtonProps, {}> {
  constructor(props: IButtonProps) {
    super(props);
  }

  public render(): React.ReactElement<{}> {
    const { children, className, disabled, label }: any = this.props;

    return (
      <button
        className={className}
        disabled={disabled}
        onClick={(e: any) => { this.onClick(e); }}
      >
        {children || label}
      </button>
    );
  }

  private onClick(e: any): void {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
}

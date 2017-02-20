import * as React from 'react';
import classNames = require('classnames');

interface IProgressButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  label?: React.ReactNode;
  onClick?: Function;
  onComplete?: Function;
}

interface IProgressButtonState {
  isActive: boolean;
}

export default class ProgressButton extends React.Component<IProgressButtonProps, IProgressButtonState> {
  public static contextTypes = {
    loop: React.PropTypes.object
  };

  private buttonRef: HTMLButtonElement;
  private buttonWidth: number;
  private remainingCount: number;
  private totalCount: number;

  constructor(props: IProgressButtonProps) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  public render(): React.ReactElement<{}> {
    const { children, className, disabled, label }: any = this.props;
    const width: number = this.buttonWidth * this.remainingCount / this.totalCount;

    const progressElem: React.ReactNode = (
      <div
        className="button--progress__bar"
        style={{ width: `${Math.floor(width)}px` }} />
    );

    const classes = classNames(
      className,
      'button--progress',
      { 'active': this.state.isActive }
    );

    return (
      <button
        className={classes}
        disabled={disabled}
        onClick={(e: any) => { this.onClick(e); }}
        ref={(r) => { this.buttonRef = r; }}
      >
        {progressElem}
        {children || label}
      </button>
    );
  }

  private onClick(e: any): void {
    if (this.state.isActive) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick();
    }

    this.totalCount = 3 * 1000;
    this.remainingCount = this.totalCount;
    this.buttonWidth = this.buttonRef.offsetWidth;

    this.context.loop.subscribe(this.onFrame);

    this.setState({ isActive: true });
  }

  private onFrame = (elapsed: number) => {
    this.remainingCount -= elapsed;
    this.forceUpdate();

    if (this.remainingCount <= 0) {
      this.context.loop.unsubscribe(this.onFrame);
      this.setState({ isActive: false });

      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
  }
}

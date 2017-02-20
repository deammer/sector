export default class GameLoop {
  private subscribers: Function[];
  private loopId: any;
  private lastTime: number;

  constructor() {
    this.subscribers = [];
    this.loopId = null;
    this.lastTime = Date.now();
  }

  public start = () => {
    if (!this.loopId) {
      this.loop();
    }
  }

  public loop = () => {
    const now = Date.now();
    const elapsed = now - this.lastTime;

    this.subscribers.forEach((callback) => {
      callback(elapsed);
    });

    this.lastTime = now;

    this.loopId = window.requestAnimationFrame(this.loop);
  }

  public stop = () => {
    window.cancelAnimationFrame(this.loopId);
  }

  public subscribe = (callback: Function) => {
    return this.subscribers.push(callback);
  }

  public unsubscribe = (callback: Function) => {
    this.subscribers.splice(this.subscribers.indexOf(callback), 1);
  }
}

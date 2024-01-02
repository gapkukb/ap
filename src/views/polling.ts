type AsyncFunction = (...args: any[]) => Promise<any>;

export default async function polling(func: AsyncFunction, interval = 3000, scope: any, retries = Number.POSITIVE_INFINITY) {
  let i = 0;
  if (i++ < retries) {
    await func.call(scope);
    return setTimeout(() => {
      polling(func, interval, scope, retries);
    }, interval);
  }
}

export class Polling {
  timer = 0;
  constructor(public func: AsyncFunction, public interval = 3000, public scope: any, public retries = Number.POSITIVE_INFINITY) {
    this.start();
  }
  start() {
    let i = 0;
    if (i++ < this.retries) {
      this.func.call(this.scope).finally(() => {
        this.timer = setTimeout(() => {
          this.start();
        }, this.interval);
      });
    }
  }
  stop() {
    clearTimeout(this.timer);
    this.timer = 0;
  }
}

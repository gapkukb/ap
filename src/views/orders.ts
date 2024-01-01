import { Order } from './home/types';

export class Single {
  orders: Order[] = [];
  add(order: Order): this {
    this.orders = [order];
    return this;
  }
}

export class Parlay extends Single {
  add(order: Order): this {
    this.orders.push(order);
    return this;
  }
}

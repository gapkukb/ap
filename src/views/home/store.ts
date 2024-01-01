import Vue from 'vue';
import { matches } from './mock';
import { Order } from './types';
import { wrapMatches } from './helper';
import { Single, Parlay } from '../orders';

let single: Single;
let parlay: Parlay;

const store = Vue.observable({
  acceptedAnyOdds: true,
  ParlayMode: false,
  displayOrderView: false,
  stake: '',
  // 提交的订单id，用于查询订单结果状态
  orderId: '',
  // 比赛信息
  matches: wrapMatches(matches),
  // 订单区，存放用户的待提交订单
  get orders() {
    return this._orders.orders;
  },

  set orders(value: Order[]) {
    this._orders.orders = value;
  },

  get _orders(): Single | Parlay {
    if (this.ParlayMode) {
      parlay ??= Vue.observable(new Parlay());
      return parlay;
    }
    single ??= Vue.observable(new Single());
    return single;
  },
  // 删除订单
  remove(index: number) {
    this.orders.splice(index, 1);
  },
  // 添加订单
  add(order: Order) {
    if (this.ParlayMode) {
      // 串关一场比赛只能选择一项，提示并替换掉原来的
      const idx = this.orders.findIndex((i) => i.matchId === order.matchId);
      if (~idx) {
        this.orders[idx] = order;
        // 触发重新渲染
        this.orders = [...this.orders];
        alert('Only 1 bet type can be chosen for the same match.');
      } else {
        this.orders.push(order);
      }
    } else {
      this.orders = [order];
      this.displayOrderView = true;
    }
  },
  // 清空订单
  clear() {
    this.orders = [];
  },
  get ordersErrorMessage(): string {
    if (this.ParlayMode) {
      if (this.orders.length < 2) {
        return 'Parlay bet must combine more than 2 bets';
      }
      if (this.orders.length > 20) {
        return 'Parlay bet must combine less than 20 bets';
      }
    }
    if (this.orders.length === 0) {
      return 'No bets here';
    }
    return '';
  },
  get inputErrorMessage(): string | undefined {
    //todo: 判断小于最小值 大于最大值 超出余额
    if (this.payout < 10) {
      return 'but at least 10';
    }
    if (this.payout > 100) {
      return 'but at most 100';
    }
    if (this.payout > 1000) {
      return 'but at most 1000';
    }
  },
  get disabled() {
    return !!this.ordersErrorMessage || !!this.stake || !!this.inputErrorMessage;
  },
  get displayResultView() {
    return !!this.orderId;
  },
  set displayResultView(value) {
    this.orderId = '';
    this.stake = '';
    this.clear();
  },

  get payout(): number {
    const stake = Number(this.stake);
    let total = 0;
    total = this.orders.reduce<number>((acc, order) => {
      acc += stake * order.odds;
      return acc;
    }, 0);

    return Number(total.toFixed(2));
  },
});

export default store;

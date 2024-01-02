import { queryGames, queryLives, queryMatches } from '@/api';
import { Game, Live, Order, RawMatch } from './home/types';
import { Store } from './home/store';

export default class SingleMode {
  dateTimer = 0;
  orders: Order[] = [];
  constructor(public store: Store) {}
  queryDates() {
    return queryGames<Game[]>().then((res) => {
      const counts = res.reduce(
        (acc, cur) => {
          acc.count1 += cur.inPayGames;
          acc.count2 += cur.todayAndTomorrow;
          acc.count3 += cur.afterTomorrow;
          return acc;
        },
        { count0: 0, count1: 0, count2: 0, count3: 0 }
      );
      this.store._dateTabs[1].count = counts.count1;
      this.store._dateTabs[2].count = counts.count2;
      this.store._dateTabs[3].count = counts.count3;
    });
  }

  queryLives() {
    return queryLives<Live[]>().then((res) => {
      this.store._dateTabs[0].display = !!res.length;
      this.store._dateTabs[0].count = res.length;
      this.store.lives = res;
    });
  }

  queryMatches() {
    return queryMatches<RawMatch[]>({
      matchDateType: this.store.dateActive,
      sportTypeId: this.store.sportActive,
    }).then((res) => {
      console.log(res);
    });
  }
}

import dayjs from 'dayjs';
import { Matchs, RawMatchs, Selection, Market, MatchStatus, RawMatch, DateTab, SportTab } from './types';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

export function wrapMatches(raws: RawMatchs): Matchs {
  const temporary: Record<string, number> = {};
  const matches: Matchs = [];

  for (let i = 0, j = raws.length; i < j; i++) {
    const item = raws[i];
    temporary[item.leagueName] ??= i;
    const index = temporary[item.leagueName];
    matches[index] ??= {
      leagueName: item.leagueName,
      leagueLogo: item.leagueLogo,
      matchId: item.matchId,
      sportTypeId: item.sportTypeId,
      children: [],
    };
    matches[index].children.push(item);
  }

  return matches.filter(Boolean);
}

export const indexed = ['1st', '2nd', '3rd'];
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov'];

// 格式化比赛顺序和时间
// dateTime:日期类型;0-inplay 1-else
export function matchDateTime(dateTime: string, dateType: 0 | 1, index: number): string {
  if (!dateTime) return '-';

  let _dateTime = '';

  if (dateType === 0) {
    _dateTime = indexed[index] || index + 'th';
  } else {
    const date = dayjs(dateTime);
    if (date.isToday()) {
      _dateTime = 'TODAY';
    } else if (date.isTomorrow()) {
      _dateTime = 'TOMORROW';
    } else {
      _dateTime = date.toDate().toLocaleString('en', { month: 'short', day: 'numeric' });
    }
  }

  return _dateTime;
}

// 根据用户赔率类型找出对应的赔率
export function findOddsAndPoint(selections: Selection[] = [], key: string, oddsType: number, isPoint2?: boolean): { odds: number; point: number; oddsRange: number; key: string } {
  let odds = -1;
  let point = -1;
  let oddsRange = 0;

  if (selections.length) {
    const selection = selections.find((selection) => selection.key === key);
    if (selection) {
      point = selection.point;
      const allPrice = selection?.allPrice;
      if (allPrice) {
        odds = oddsType === 2 ? allPrice.hongKongPrice : allPrice.decimalPrice;
        oddsRange = allPrice.oddRange;
      }
    }
  }

  return { odds, point, oddsRange, key };
}
// 过滤出用户的投注类型
export function filterMarkets(markets: Market[] = [], keys: number[]): Market[] {
  return markets.filter((market) => {
    return market.marketStatus !== MatchStatus.Closed && keys.includes(market.betType);
  });
}

// 过滤出用户的投注类型
export function findMarket(markets: Market[] = [], key: number): Market | undefined {
  if (!markets.length) return undefined;
  const market = markets.find((market) => {
    return market.betType === key && market.marketStatus !== MatchStatus.Closed;
  });

  if (market) return market;

  return markets.findLast((market) => market.betType === key);
}

// 获取用户的赔率变化
export function getOddsRange(selections: Selection[], key: string) {
  if (!selections?.length) return 0;

  const oddsRange = selections.find((selection) => selection.key === key)?.allPrice.oddRange;

  return oddsRange ?? 0;
}

export function createDateTabs(): DateTab[] {
  return [
    {
      label: 'Live',
      id: 0,
      count: 0,
      display: false,
    },
    {
      label: 'IN-PLAY',
      id: 1,
      count: 0,
      display: true,
    },
    {
      label: 'TODAY&TOMORROW',
      id: 11,
      count: 0,
      display: true,
    },
    {
      label: 'EARLY',
      id: 12,
      count: 0,
      display: true,
    },
  ];
}

export function createSportTabs(): SportTab[] {
  return [
    {
      label: 'Basketball',
      icon: require('./icon-basketball.png'),
      activeIcon: require('./icon-basketball-s.png'),
      count: 0,
    },
    {
      label: 'Volleyball',
      icon: require('./icon-basketball.png'),
      activeIcon: require('./icon-basketball-s.png'),
      count: 0,
    },
    {
      label: 'Football',
      icon: require('./icon-basketball.png'),
      activeIcon: require('./icon-basketball-s.png'),
      count: 0,
    },
    {
      label: 'Tennis',
      icon: require('./icon-basketball.png'),
      activeIcon: require('./icon-basketball-s.png'),
      count: 0,
    },
    {
      label: 'Boxing',
      icon: require('./icon-basketball.png'),
      activeIcon: require('./icon-basketball-s.png'),
      count: 0,
    },
  ];
}

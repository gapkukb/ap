export type Matchs = Match[];
export type Match = Pick<RawMatch, 'leagueLogo' | 'leagueName' | 'matchId' | 'sportTypeId'> & {
  children: RawMatchs;
};

export type RawMatchs = RawMatch[];
export interface RawMatch {
  matchId: string;
  leagueId: string;
  homeId: number;
  awayId: number;
  leagueName: string;
  homeName: string;
  awayName: string;
  eventStatus: MatchStatus;
  runningStatus: string;
  liveHomeScore: number;
  liveAwayScore: number;
  globalShowTime: string;
  sabaStreamViewFlag: string;
  sportTypeId: string;
  sportTypeName: string;
  matchDate: string;
  matchTime: string;
  totalBetTypeNumber: number;
  markets: Market[];
  leagueLogo?: string;
}

export enum MatchStatus {
  Closed = 'closed',
  ClosePrice = 'closePrice',
  Running = 'running',
  Suspend = 'suspend',
}

export const lockedStatusList = [MatchStatus.Closed, MatchStatus.ClosePrice, MatchStatus.Suspend];

export interface Market {
  betType: number;
  marketId: number;
  marketStatus: MatchStatus;
  gameMap: null;
  gameRound: null;
  resourceid: null;
  oddTypeCount: number;
  category: number;
  showCategory: string;
  sort: number;
  selections: Selection[];
  selections2: Selection[];
}

export interface Selection {
  price: string;
  allPrice: AllPrice;
  oddRange: number;
  key: string;
  keyEn: string;
  point: number;
  point2: null;
  decimalPrice: null;
  hongKongPrice: null;
}

export interface AllPrice {
  oddRange: number;
  decimalPrice: number;
  hongKongPrice: number;
}

export interface Order extends Market {
  id: string;
  odds: number;
  point: number;
  matchId: string;
  orderName: string;
}

export interface Detail {
  matchId: string;
  leagueId: string;
  homeId: number;
  awayId: number;
  leagueName: string;
  homeName: string;
  awayName: string;
  eventStatus: MatchStatus;
  runningStatus: string;
  liveHomeScore: number;
  liveAwayScore: number;
  globalShowTime: string;
  sabaStreamViewFlag: string;
  sportTypeId: string;
  sportTypeName: string;
  matchDate: string;
  matchTime: string;
  markets: Market2[];
}

export interface Market2 {
  betType: number;
  gameMap: number;
  betTypeName: string;
  betSelectionGroupNames: string[];
  betSelectionGroupNumber: number;
  marketDataList: MarketDataList[];
}

export interface MarketDataList {
  betType: number;
  marketId: number;
  marketStatus: MatchStatus;
  gameMap: null;
  gameRound: null;
  resourceid: null;
  oddTypeCount: number;
  category: number;
  showCategory: string;
  sort: number;
  selections: Selection[];
  selections2: Selection[];
}

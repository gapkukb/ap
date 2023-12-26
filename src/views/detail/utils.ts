import { useRoute } from 'vue-router/composables';
import { Market2 } from '../home/types';

type Tab = [label: string, id: number];

export function useTabs(markets: Market2[]) {
  const {
    query: { sportTypeId },
  } = useRoute();
  let tabs = <Tab[]>[];
  if (['5', '16', '6'].includes(sportTypeId as string)) {
    tabs.push(['All', 0]);
    return tabs;
  }
  if (sportTypeId === '6') {
    tabs = [
      ['All', 0],
      ['All', 0],
      ['Full Time', 1],
      ['Match', 90],
      ['Sets', 91],
    ];
    return tabs;
  }
  // 去重
  let ary = markets.map((market) => market.gameMap);
  ary = Array.from(new Set(ary));

  tabs = ary.map(genarate).filter(Boolean) as Tab[];
  tabs.unshift(['All', -1]);
  return tabs;
}

function genarate(id: number): Tab | undefined {
  let label = '';
  switch (id) {
    case 0:
      label = 'Popular';
      break;
    case 1:
      label = 'Full Time';
      break;
    case 2:
      label = 'Half';
      break;
    case 8:
      label = 'Quarter';
      break;
    default:
      if (id > 10 && id < 41) {
        label = 'Map' + (id - 10);
      }
  }

  return label === '' ? undefined : [label, id];
}

import axios from 'axios';

axios.defaults.headers.common['Appid'] = 'C66H501';
axios.defaults.baseURL = '/api';

axios.defaults.transformRequest = [
  (data) => {
    return {
      customerId: '919651703328866305',
      loginName: 'bingoplus1mkbs4',
      productId: 'C66',
      ...data,
    };
  },
  ...(axios.defaults.transformRequest as any[]),
];

axios.interceptors.response.use((response) => {
  return response.data.body;
});

export function queryGames<R>(): Promise<R> {
  return axios.post('/saba/querySportGames');
}
export function queryLives<R>(): Promise<R> {
  return axios.post('/saba/queryMatchesLive');
}
export function queryMatches<R>(data: Record<string, any>): Promise<R> {
  return axios.post('/saba/queryMatchesBySportType', data);
}

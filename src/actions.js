
import { fetchStatus } from './reducers';

export const FETCH_STATIONS = 'FETCH_STATIONS';
export const RECEIVE_STATIONS = 'RECEIVE_STATIONS';
export const ERROR_FETCHING = 'ERROR_FETCHING';

const requestStations = () => {
  return {
    type: FETCH_STATIONS,
  }
}

const errorFetching = () => {
  return {
    type: ERROR_FETCHING,
  }
}

const receiveStations = (stations) => {
  return {
    type: RECEIVE_STATIONS,
    stations,
  }
}

const URL = 'http://localhost:8082/stations/stations.json';

const fetchStations = () => {
  return async (dispatch) => {
    dispatch(requestStations());
    try {
      const response = await fetch(URL);
      const json = await response.json();
      dispatch(receiveStations(json.stationBeanList.filter(s => !s.testStation)));
    } catch (e) {
      console.error(e);
      dispatch(errorFetching());
    }
  }
}

export const maybeFetchStations = () => {
  return (dispatch, getState) => {
    const { stations, fetching } = getState();

    if (stations === null && fetching === fetchStatus.None) {
      return dispatch(fetchStations())
    }
  }
}

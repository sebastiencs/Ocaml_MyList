import {
  FETCH_STATIONS,
  RECEIVE_STATIONS,
  ERROR_FETCHING
} from './actions';

export const fetchStatus = {
  None: 0,
  Fetching: 1,
  Error: 2
}

const stationsReducer = (
  state = {
    stations: null,
    fetching: fetchStatus.None
  },
  action
) => {
  switch (action.type) {
    case FETCH_STATIONS:
      return {
        ...state,
        fetching: fetchStatus.Fetching,
      };
    case RECEIVE_STATIONS:
      return {
        fetching: fetchStatus.None,
        stations: action.stations
      };
    case ERROR_FETCHING:
      return {
        fetching: fetchStatus.Error,
        stations: null
      };
    default:
      return state;
  }
};

export default stationsReducer;

import React from 'react';
import { connect } from 'react-redux';
import {
  Loader, Segment, Header, Icon,
} from 'semantic-ui-react';

import { maybeFetchStations } from './actions';
import { fetchStatus } from './reducers';

const ErrorOnFetch = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='close' color='red' />
      Error occured
    </Header>
  </Segment>
);

class Fetcher extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(maybeFetchStations());
  }

  render() {
    const {
      fetching,
      stations,
      children
    } = this.props;

    if (fetching == fetchStatus.Error) {
      return <ErrorOnFetch />;
    }

    if (fetching == fetchStatus.Fetching || stations === null) {
      return <Loader active />;
    }

    return children;
  }
}

export default connect((state) => {
  return {
    stations: state.stations,
    fetching: state.fetching,
  }
})(Fetcher)

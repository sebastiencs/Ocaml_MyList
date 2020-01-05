import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Grid, Button } from 'semantic-ui-react';
import { StationStatus, StationName } from './Home';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

const style = {
  button: {
    display: 'grid',
    margin: '20px 0'
  },
  segment: {
    marginTop: 50
  }
}

const InvalidStation = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='close' color='red' />
      Station doesn&apos;t exist
    </Header>
  </Segment>
);

class Station extends React.Component {
  render() {
    const {
      stations,
      match: { params: { id }},
    } = this.props;

    const station = stations.find(s => s.id == id);

    if (station === undefined) {
      return <InvalidStation />;
    }

    const position = [
      station.latitude,
      station.longitude
    ];

    return (
      <Segment>
        <Header textAlign='center'>
          <StationName name={station.stationName} />
          <Header.Subheader>
            <StationStatus station={station} />
          </Header.Subheader>
        </Header>
        <Segment style={style.segment}>
          <Grid centered divided columns={2} textAlign='center' stackable>
            <Grid.Column verticalAlign='middle' textAlign='center'>
              {`${station.totalDocks} Docks`}
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign='center'>
              {`${station.availableBikes} Bikes available`}
            </Grid.Column>
          </Grid>
        </Segment>
        <div style={style.button}>
          {station.statusKey === 1 && station.availableBikes > 0
           ? <Button primary>Rent a bike</Button>
           : <Button disabled>Not available</Button>
          }
        </div>
        <LeafletMap center={position} zoom={13}>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        </LeafletMap>
      </Segment>
    );
  }
}

export default connect(({ stations }) => ({ stations }))(Station)

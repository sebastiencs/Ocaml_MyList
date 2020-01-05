import React from 'react';
import { connect } from 'react-redux';
import { Icon, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

export const StationName = ({ name }) => (
  <div>
    <Icon key={name} name='map marker alternate' />
    {name}
  </div>
);

export const StationStatus = ({ station: { statusKey, statusValue } }) => [
  statusKey === 1
  ? <Icon key='icon' color='green' name='checkmark' />
  : <Icon key='icon' color='red' name='close' />,
  statusValue
];

const Row = ({ station }) => (
  <div style={rowStyle}>
    <StationName name={station.stationName} />
    <div>
      <StationStatus station={station} />
    </div>
  </div>
);

const Home = ({ stations }) => (
  <Table unstackable celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell textAlign='center'>Stations</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {stations.map(station => (
        <Table.Row key={station.id}>
          <Table.Cell selectable>
            <Link to={`/${station.id}`}>
              <Row station={station} />
            </Link>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default connect(({ stations }) => ({ stations }))(Home)

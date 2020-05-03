import React, { Component, PureComponent } from "react";
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import "./custom.css";

class TradeItem extends PureComponent {
  render = () => (
    <div>{ this.props.price } { this.props.amount }</div>
  )
}

class OrderbookItem extends PureComponent {
  render = () => (
      <div>{ this.props.price } { this.props.amount }</div>
  )
}

class App extends Component {
  render() {
    return (
      <Row>
        <Col xs={6}>
          <h3>Trades</h3>
          { [...this.props.trades].reverse().slice(0, 20).map(trade => <TradeItem key={trade.id} price={trade.price} amount={trade.amount} />) }
        </Col>
        <Col xs={6}>
          <h3>Bids</h3>
          { [...this.props.bids].slice(0, 20).map(level => <OrderbookItem key={level[0]} price={level[0]} amount={level[1]} />) }
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  trades: state.ccxt.trades,
  bids: state.ccxt.bids,
})

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { fetchOrders } from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    console.log('this.props.orders------', this.props.orders);
    let ordersList = <Spinner />;
    if (!this.props.loading) {
      ordersList = this.props.orders.map(ord => {
        return (
          <Order key={ord.id} ingredients={ord.ingredients} price={ord.price} />
        );
      });
    }

    return <div>{ordersList}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.ord.orders,
    loading: state.ord.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

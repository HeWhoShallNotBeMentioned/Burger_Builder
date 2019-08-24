import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = { orders: [], loading: true };

  async componentDidMount() {
    try {
      const { data } = await axios.get('/orders.json');
      console.log('orders.data-----', data);
      const fetchedOrders = [];
      for (let key in data) {
        fetchedOrders.push({ ...data[key], id: key });
      }
      this.setState({ loading: false, orders: fetchedOrders });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);

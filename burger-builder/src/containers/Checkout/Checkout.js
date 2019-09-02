import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   price: 0,
  // };

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredient = {};
  //   let price = 0;

  //   for (let param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = Number(param[1]).toFixed(2);
  //     } else {
  //       ingredient[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredient, totalPrice: price });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingreds}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />

        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingreds: state.ingredients,
  };
};

export default connect(
  mapStateToProps,
  null
)(Checkout);

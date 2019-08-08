import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  //This could be a functional component if constructor and component did update are removed

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    console.log('[OrderSummary] DidUpdate');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey + 1}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Order Summary</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>$ {this.props.total.toFixed(2)}</p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.clickedCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.clickedContinue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;

import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey + 1}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Order Summary</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>$ {props.total.toFixed(2)}</p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.clickedCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.clickedContinue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;

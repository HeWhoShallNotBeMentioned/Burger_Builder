import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
} from '../../Store/actions/index';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
  }

  async componentDidMount() {
    // try {
    //   console.log('burger-builder componentDidMount this.props', this.props);
    //   const { data } = await axios.get('/ingredients.json');
    //   this.setState({ ingredients: { ...data } });
    // } catch (error) {
    //   console.log(error);
    //   this.setState({ error: true });
    // }
    this.props.onInitIngredients();
    console.log('BurgerBuilder state....', this.state);
  }

  updatePurcahaseState = ingredients => {
    const sum = Object.values(ingredients).reduce((total, num) => {
      return total + num;
    }, 0);

    return sum > 0;
  };

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   let newPrice = oldPrice + priceAddition;
  //   //newPrice = newPrice.toFixed(2);
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients,
  //   });
  //   this.updatePurcahaseState(updatedIngredients);
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount > 0) {
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //       ...this.state.ingredients,
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceSubtraction = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceSubtraction;
  //     this.setState({
  //       totalPrice: newPrice,
  //       ingredients: updatedIngredients,
  //     });
  //     this.updatePurcahaseState(updatedIngredients);
  //   }
  // };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //   //alert('Continue making your burger!');

    //   const queryParams = [];
    //   for (let i in this.state.ingredients) {
    //     queryParams.push(
    //       encodeURIComponent(i) +
    //         '=' +
    //         encodeURIComponent(this.state.ingredients[i])
    //     );
    //   }
    //   queryParams.push('price=' + this.state.pri);
    //   const queryString = queryParams.join('&');

    //   this.props.history.push({
    //     pathname: '/checkout',
    //     search: '?' + queryString,
    //   });
    this.props.onPurchaseInit();
    this.props.history.push({
      pathname: '/checkout',
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingreds,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p style={{ textAlign: 'center' }}>Ingredients cannot be loaded. </p>
    ) : (
      <Spinner />
    );
    if (this.props.ingreds) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingreds} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurcahaseState(this.props.ingreds)}
            price={this.props.pri}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          clickedCancel={this.purchaseCancelHandler}
          clickedContinue={this.purchaseContinueHandler}
          ingredients={this.props.ingreds}
          total={this.props.pri}
        />
      );
    } else {
      burger = (
        <Aux>
          <Spinner />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingreds: state.brg.ingredients,
    pri: state.brg.totalPrice,
    error: state.brg.error,
    isAuthenticated: state.aut.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => {
      dispatch(addIngredient(ingName));
    },
    onIngredientRemoved: ingName => {
      dispatch(removeIngredient(ingName));
    },
    onInitIngredients: () => {
      dispatch(initIngredients());
    },
    onPurchaseInit: () => {
      dispatch(purchaseInit());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

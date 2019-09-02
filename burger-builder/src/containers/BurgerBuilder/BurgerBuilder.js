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
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../Store/actions';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
      loading: false,
      error: false,
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
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //alert('Continue making your burger!');

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.pri);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
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

    let burger = this.state.error ? (
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
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
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
  return { ingreds: state.ingredients, pri: state.totalPrice };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => {
      dispatch({ type: ADD_INGREDIENT, ingredientName: ingName });
    },
    onIngredientRemoved: ingName => {
      dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingName });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

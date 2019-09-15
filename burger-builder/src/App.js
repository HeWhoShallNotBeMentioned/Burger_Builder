import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './Store/actions/index';
import Aux from './hoc/Aux/Aux';
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
            {this.props.isAuth ? (
              <Aux>
                <Route exact path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
              </Aux>
            ) : (
              <Route component={Auth} />
            )}
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.aut.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return { onTryAutoSignUp: () => dispatch(authCheckState()) };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

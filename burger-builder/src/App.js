import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Spinner from './components/UI/Spinner/Spinner';
import { authCheckState } from './Store/actions/index';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div>
        <Layout>
          <React.Suspense fallback={<Spinner />}>
            <Switch>
              {this.props.isAuthenticated && (
                <Route path="/logout" component={Logout} />
              )}
              <Route path="/auth" component={Auth} />
              {this.props.isAuthenticated && (
                <Route path="/checkout" component={Checkout} />
              )}
              {this.props.isAuthenticated && (
                <Route path="/orders" component={Orders} />
              )}
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          </React.Suspense>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.aut.token !== null,
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import { checkValidity } from '../../shared/checkValidity';
import { fetchAuth, setAuthRedirectPath } from '../../Store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    let formIsValid = true;
    for (let controlName in updatedControls) {
      formIsValid = updatedControls[controlName].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onFetchAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = prevState => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({ id: key, config: this.state.controls[key] });
    }

    let form = formElementsArray.map(elem => {
      return (
        <Input
          key={elem.id}
          elementType={elem.config.elementType}
          elementConfig={elem.config.elementConfig}
          value={elem.config.value}
          invalid={!elem.config.valid}
          shouldValidate={elem.config.validation}
          touched={elem.config.touched}
          valueType={elem.id}
          changed={event => this.inputChangedHandler(event, elem.id)}
        />
      );
    });

    if (this.props.load) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    load: state.aut.loading,
    error: state.aut.error,
    isAuthenticated: state.aut.token !== null,
    building: state.brg.building,
    authRedirectPath: state.aut.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchAuth: (email, password, isSignUp) =>
      dispatch(fetchAuth(email, password, isSignUp)),
    onSetAuthRedirectPath: path => {
      dispatch(setAuthRedirectPath(path));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

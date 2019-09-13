import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '.././../../Store/actions/index';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
    this.props.history.push('/');
  }
  render() {
    // can also use <Redirect to='/' /> from react-router-dom
    return <div></div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);

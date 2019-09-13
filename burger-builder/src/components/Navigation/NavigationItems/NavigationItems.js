import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link="/">
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Sign In</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Log Out</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;

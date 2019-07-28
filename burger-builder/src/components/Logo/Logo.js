import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = props => {
  return (
    // Style prop on div below is not used
    <div className={classes.Logo} style={{ height: props.height }}>
      <img src={burgerLogo} alt="site logo" />
    </div>
  );
};

export default logo;

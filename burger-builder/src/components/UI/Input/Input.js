import React from 'react';

import classes from './Input.css';

const input = props => {
  let inputElement = null;
  const InputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate) {
    InputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={InputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={InputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={InputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(opt => {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={InputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;

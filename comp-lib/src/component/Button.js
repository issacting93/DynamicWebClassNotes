import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = (props) => {
    
  const {children, primary, secondary, success, warning, danger, outline, rounded, pill,  ...otherProps} = props;
  
  // Base classes that all buttons should have
  const baseClasses = 'flex item-center px-8 py-3 border font-medium transition-colors duration-200 cursor-pointer rounded-xl';
  
  // Conditional classes using classnames library
  const classes = cx(
    baseClasses,
    otherProps.className, // Allow custom className to be passed in
    {
    // Color variations
    'bg-blue-500 text-white border-blue-500 hover:bg-blue-600': primary,
    'bg-gray-500 text-white border-gray-500 hover:bg-gray-600': secondary,
    'bg-green-500 text-white border-green-500 hover:bg-green-600': success,
    'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600': warning,
    'bg-red-500 text-white border-red-500 hover:bg-red-600': danger,

    // Shape variations
    'rounded': rounded,
    'rounded-full': pill,
    
    // Outline variations
    'bg-transparent': outline,
    'text-blue-500 border-blue-500 hover:bg-blue-50': outline && primary,
    'text-gray-500 border-gray-500 hover:bg-gray-50': outline && secondary,
    'text-green-500 border-green-500 hover:bg-green-50': outline && success,
    'text-yellow-500 border-yellow-500 hover:bg-yellow-50': outline && warning,
    'text-red-500 border-red-500 hover:bg-red-50': outline && danger,

    // Default styling when no variant is specified
    'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300': !primary && !secondary && !success && !warning && !danger,
    }
  );
 
  return (
    <button 
      {...otherProps} 
      className={classes}
      style={{
        minWidth: '120px',
        minHeight: '40px',
        ...otherProps.style
      }}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  pill: PropTypes.bool,
};

export default Button;
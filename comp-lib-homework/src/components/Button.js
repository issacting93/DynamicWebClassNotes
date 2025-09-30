// Button.jsx - Clean and simple implementation

import React from 'react';
import cx from 'classnames';

const Button = ({
    children,
    primary = false,
    secondary = false,
    success = false,
    warning = false,
    danger = false,
    rounded = false,
    round = false,
    outline = false,
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    ...otherProps
}) => {
    const classes = cx(
        'flex items-center justify-center border transition-all duration-200 font-medium',
        className,
        {
            // Variants
            'bg-blue-500 border-blue-500 text-white hover:bg-blue-600': primary,
            'bg-gray-900 border-gray-900 text-white hover:bg-gray-800': secondary,
            'bg-green-500 border-green-500 text-white hover:bg-green-600': success,
            'bg-orange-400 border-orange-400 text-white hover:bg-orange-500': warning,
            'bg-red-600 border-red-600 text-white hover:bg-red-700': danger,
            
            // Shapes
            'rounded-full': rounded,
            'rounded-full w-12 h-12 p-0': round,
            'px-8 py-3 rounded-md': !round,
            
            // Outline variants
            'bg-white border-2': outline,
            'text-blue-500 border-blue-500 hover:bg-blue-50': outline && primary,
            'text-gray-900 border-gray-900 hover:bg-gray-50': outline && secondary,
            'text-green-500 border-green-500 hover:bg-green-50': outline && success,
            'text-orange-400 border-orange-400 hover:bg-orange-50': outline && warning,
            'text-red-600 border-red-600 hover:bg-red-50': outline && danger,
            
            // States
            'opacity-50 cursor-not-allowed': disabled,
            'cursor-pointer': !disabled,
        }
    );

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;

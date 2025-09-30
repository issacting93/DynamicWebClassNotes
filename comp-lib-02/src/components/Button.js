import React from 'react'
import cx from 'classnames'
// props = {
//   children: 'whatever elements or text inside the open close tags',
// primary: true,
// }

const Button = (props) => {
  // destructuring our props object
  const {
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    rounded,
    round,
    outline,
    ...otherProps
  } = props
  // the line above does this but with less typing
  // const children = props.children

  const classes = cx(
    'flex items-center justify-center border transition-all duration-200',
    otherProps.className,
    {
      'bg-blue-500 border-blue-500 text-white': primary,
      'bg-gray-900 border-gray-900 text-white': secondary,
      'bg-green-500 border-green-500 text-white': success,
      'bg-orange-400 border-orange-400 text-white': warning,
      'bg-red-600 border-red-600 text-white': danger,
      // rounded (pill shape)
      'rounded-full': rounded,
      // round (circle shape)
      'rounded-full w-12 h-12 p-0': round,
      'px-8 py-3': !round,
      // outline
      'bg-white': outline,
      // outline variation in text color
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-orange-400': outline && warning,
      'text-red-600': outline && danger,
    }
  )

  return (
    <button
      {...otherProps}
      className={classes}
    >
      {children}
    </button>
  )
}

export default Button

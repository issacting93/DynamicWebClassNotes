import React from 'react'
import cx from 'classnames'
// props = {
//   children: 'whatever elements or text inside the open close tags',
// primary: true,
// }

const Button = (props) => {
  // destructuring our props object
  const { children, primary, secondary, success, warning, danger } = props
  // the line above does this but with less typing
  // const children = props.children

  const classes = cx('flex items-center px-8 py-3 border', {
    'bg-blue-500 border-blue-500 text-white': primary,
    'bg-gray-900 border-gray-900 text-white': secondary,
    'bg-green-500 border-green-500 text-white': success,
    'bg-orange-400 border-orange-400 text-white': warning,
    'bg-red-600 border-red-600 text-white': danger,
  })

  return <button className={classes}>{children}</button>
}

export default Button

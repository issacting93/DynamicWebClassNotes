import React from 'react'
import {NavLink, Link} from 'react-router-dom'

import Panel from './Panel'

const Navbar = () => {
  // store our conditional classnames are js variables (strings with tailwindCSS classes)
  const baseClass = 'text-blue-500'
  const activeClass =
    'pl-5 border-l-4 border-blue-500 text-blue-500 font-bold decoration-solid'

  return (
    // without conditional active class use LINK
    /*
    <Panel className="sticky top-0 overflow-y-scroll flex flex-col item-start">
      <Link to="/" className="text-blue-500">
        {' '}
        Buttons
      </Link>
      <Link to="/accordion" className="text-blue-500">
        Accordion
      </Link>
      <Link to="/dropdown" className="text-blue-500">
        Dropdown
      </Link>
    </Panel>
    */

    /*
    V6 of React Router does not have the activeClassName property anymore.
    Here's how to style NavLink with Tailwind with the new version of ReactRouter and Remix
    */
    <Panel className="sticky top-0 overflow-y-scroll flex flex-col item-start">
      <NavLink
        to="/"
        className={({isActive}) => (isActive ? activeClass : baseClass)}
      >
        Buttons
      </NavLink>
      <NavLink
        to="/accordion"
        className={({isActive}) => (isActive ? activeClass : baseClass)}
      >
        Accordion
      </NavLink>
      <NavLink
        to="/dropdown"
        className={({isActive}) => (isActive ? activeClass : baseClass)}
      >
        Dropdown
      </NavLink>
      {/* Add link here to the component page you made for HW */}
    </Panel>
  )
}

export default Navbar

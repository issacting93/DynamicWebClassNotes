import React from 'react'
import {useState, useRef, useEffect} from 'react'

import cx from 'classnames'
import {GoChevronDown} from 'react-icons/go'

const Dropdown = (props) => {
  const {options, onChange} = props
  // is if you import all of the React library, and you need to access the useState hook
  // const [isOpen, setIsOpen] = React.useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // this is another built in react hook, it assigns a html/jsx element to a ref
  const divEl = useRef()

  // useEffect depending on what you pass it
  // will fire once when the component first mounts []
  // every time the comonent re-renders no second argument
  // every time a var updates because we tell useEffect to watch it [someValueToWatch]

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handler, true)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (opt) => {
    setIsOpen(false)
    onChange(opt)
  }

  const renderedOptions = options.map((opt, index) => {
    return (
      <div
        key={index}
        className="rounded cursor-pointer p-1 hover:bg-sky-100"
        onClick={() => handleOptionClick(opt)}
      >
        {opt.label}
      </div>
    )
  })

  return (
    <div className="w-48 relative" ref={divEl}>
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        Select... <GoChevronDown />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  )
}

// this is another component in the same file, this is a nice resuable UI component that
// spits out a styled div, and its children

const Panel = ({className, children, ...rest}) => {
  const finalClassNames = cx(
    'border rounded p-3 shadow bg-white w-full',
    className
  )

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  )
}

export {Panel}
export default Dropdown

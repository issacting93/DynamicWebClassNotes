import {useState} from 'react'
// you may come across the use of useState() in the wild
// State is a object that keeps track of variables that will update
// based on user input. When state changes, the component NOT the page
// update + refresh and re-render and the changes are reflected on the screen

const Counter = () => {
  // when we call useState, we need to name our piece state, and the function to update it,
  // and delcare an initial value for that state
  /*
    state = {
    count: 0,
  }
  the function to update counts value
  setCount(1)
  */
  const [count, setCount] = useState(0)

  /* NEVER EVER EVER EVER DIRECTLY MUTATE STATE
    NO DONT DO THIS
    count = count-1
    USE YOUR SETTER
    */
  const handlePlusClick = () => {
    setCount(count + 1)
  }

  const handleMinusClick = () => {
    if (count <= 0) {
      return
    }
    setCount(count - 1)
  }

  // this is where we return JSX
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleMinusClick(3)}>[-]</button>

      <button onClick={handlePlusClick}>[+]</button>
    </div>
  )
}

export default Counter

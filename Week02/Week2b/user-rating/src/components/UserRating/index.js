import {useState} from 'react'
import {ReactComponent as Favorite} from '@material-design-icons/svg/filled/favorite.svg'

export const UserRating = () => {
  const [count, setCount] = useState(0)

  const handlePlusClick = () => {
    if (count >= 5) {
      return
    }
    setCount(count + 1)
  }

  const handleMinusClick = () => {
    if (count <= 0) {
      return
    }
    setCount(count - 1)
  }

  return (
    <div>
      <button onClick={handleMinusClick}>[-]</button>
      {[...Array(count)].map((i, index) => {
        return (
          <span key={index}>
            <Favorite />
          </span>
        )
      })}
      {/* https://legacy.reactjs.org/docs/conditional-rendering.html */}
      <button onClick={handlePlusClick}>[+]</button>
    </div>
  )
}

export default UserRating

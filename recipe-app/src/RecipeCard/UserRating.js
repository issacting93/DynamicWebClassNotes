import {useState} from 'react'
// Using React Icons instead of Material Design SVG
import { FaHeart, FaPlus, FaMinus } from 'react-icons/fa'

export default function UserRating() {
  const [count, setCount] = useState(0)

  const handlePlusClick = () => {
    if (count < 5) {
      setCount(count + 1)
    }
    return
  }

  const handleMinusClick = () => {
    if (count > 0) {
      setCount(count - 1)
    }
    return
  }

  return (
    <div className="user-rating">
      <button 
        onClick={handleMinusClick}
        style={{ 
          background: '#ff6b6b', 
          color: 'white', 
          border: 'none', 
          borderRadius: '50%', 
          width: '30px', 
          height: '30px', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <FaMinus size={12} />
      </button>
      
      <span style={{ display: 'flex', alignItems: 'center', minWidth: '100px' }}>
        {[...Array(count)].map((heart, i) => {
          return (
            <FaHeart 
              key={i} 
              style={{ color: 'red', marginRight: '2px' }} 
              size={16}
            />
          )
        })}
        {count === 0 && <span style={{ color: '#999', fontSize: '14px' }}>Rate this recipe</span>}
      </span>
      
      <button 
        onClick={handlePlusClick}
        style={{ 
          background: '#51cf66', 
          color: 'white', 
          border: 'none', 
          borderRadius: '50%', 
          width: '30px', 
          height: '30px', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <FaPlus size={12} />
      </button>
    </div>
  )
}

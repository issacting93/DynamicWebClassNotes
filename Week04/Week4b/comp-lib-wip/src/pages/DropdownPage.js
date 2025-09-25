import {useState} from 'react'
import Dropdown from '../components/Dropdown'
// import {Panel} from '../components/Dropdown'
const OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
]

const DropdownPage = () => {
  // this piece of state is where we recieve our dropdown selected value
  // we keep track of it in the parent component so that it, and all children of the parent
  // have access to this piece of states value and can update and rerender when it changes
  const [value, setValue] = useState(null)

  const handleChange = (option) => {
    setValue(option)
  }

  return (
    <div>
      <Dropdown options={OPTIONS} onChange={handleChange} value={value} />
    </div>
  )
}

export default DropdownPage

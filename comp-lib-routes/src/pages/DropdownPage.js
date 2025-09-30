import {useState} from 'react'
import Dropdown from '../components/Dropdown'
// import {Panel} from '../components/Dropdown'
// import Panel from '../components/Panel'

const OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
]

const COLOR_MAP = {
  red: 'bg-red-500',
  green: 'bg-green-400',
  blue: 'bg-blue-500',
}

// example usage of COLOR_MAP
// COLOR_MAP[value.value]

// template literals
// const color = 'red-' + value?.value + '-500'
// const colorClass = `bg-${value?.value}-500`

const DATA_TO_FILTER = [
  {id: 1, name: 'katie', team: 'red'},
  {id: 2, name: 'tony', team: 'green'},
  {id: 3, name: 'amy', team: 'blue'},
  {id: 4, name: 'andy', team: 'red'},
  {id: 5, name: 'pete', team: 'green'},
]

const DropdownPage = () => {
  // this piece of state is where we recieve our dropdown selected value
  // we keep track of it in the parent component so that it, and all children of the parent
  // have access to this piece of states value and can update and rerender when it changes
  const [value, setValue] = useState(null)

  let filteredData = DATA_TO_FILTER

  // if the used selected an option from our dropdown, find the value key, if they oth exist
  if (value?.value) {
    // filter our array by value of selected option
    filteredData = DATA_TO_FILTER.filter(
      (student) => student.team === value.value
    )
  }

  const handleChange = (option) => {
    setValue(option)
  }

  return (
    <div>
      <h1>
        Dropdown page with user selectd value of: {value?.label}
        <br />
        <div className="mt-4 mb-4 flex items-center gap-2">
          <span>Color-indicator:</span>
          <div className="w-4 h-4 rounded-full" style={{backgroundColor: value?.value}}></div>  
        </div>
      </h1>

      <Dropdown options={OPTIONS} onChange={handleChange} value={value} />
      <h2 className="mt-4 mb-4 text-lg font-bold" >Students from {value?.label}:</h2>

      {filteredData.map((student) => {
        return (
          <div key={student.id} className="flex flex-row items-center gap-2">
            <p>{student.name} </p>    <div className="w-4 h-4 rounded-full" style={{backgroundColor: student.team}}></div> 
          </div>
        )
      })}

    </div>
  )
}

export default DropdownPage

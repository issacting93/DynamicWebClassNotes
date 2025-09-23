import {useState} from 'react'
import Dropdown from '../components/Dropdown'



const OPTIONS = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Blue', value: 'blue' },
]

const DropdownPage = () => {
    // This is where we store which option is selected in the Dropdown component
    const [value, setValue] = useState(null);
    const handleChange = (option) => {
        setValue(option);
    }

    return (    
    <div>
        <h1>DropdownPage</h1>
        <br />
        <h1>Current value: {value ? value.label : 'None'}</h1>
        <Dropdown options={OPTIONS} onChange={handleChange} />
    </div>
    )
}

export default DropdownPage     
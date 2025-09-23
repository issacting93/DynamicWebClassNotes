import React from 'react'
import { GoChevronDown } from 'react-icons/go'


const Dropdown = () => {
  return (
    <div className="flex m-4 p-4 flex-col items-start justify-left">
        <h2 className="text-2xl font-bold">Dropdown</h2>
        <div className="dropdown-container w-96 flex flex-col items-start justify-left m-4 p-4 rounded-md">
            <div className="flex flex-col items-start justify-left w-full">
                <label className="text-lg font-bold mb-2">Select a color</label>
                <div className="relative w-full">
                    <select className="w-full p-4 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="blue">Blue</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <GoChevronDown className="h-5 w-5 text-blue-500" />
                    </div>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default Dropdown
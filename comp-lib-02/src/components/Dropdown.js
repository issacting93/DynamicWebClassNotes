import { useState , useRef, useEffect} from 'react'
import { GoChevronDown } from 'react-icons/go'
import cx from 'classnames'

const Dropdown = (props) => {
    const { options, onChange } = props;
    const [isOpen, setIsOpen] = useState(false); // isOpen is a boolean, setIsOpen is the function that sets the value of isOpen to true or false
    const [selectedOption, setSelectedOption] = useState(null);
    const ref = useRef(); // useRef is a hook that allows us to create a reference to a DOM element
    

    // this is a built-in react hook. it is used to create a reference to a DOM element.
    const divEl =useRef();

    // Use effect - this allows us to run a function after the component is mounted.
    // Depending on what you pass it, will fire once when the component is mounted.
    
    // useEffect(() => {
    //    console.log(divEl.current);
    //}, [divEl.current]);


    // If i leave the array empty, it will fire once when the component is mounted.
    // If i pass in a variable, it will fire again every time the variable changes.
    // Everytime the component is re-rendered, it will fire again. 
    // Everytime a var updates because we tell use effect to watch for a change.

    useEffect(() => {
        const handler = (event) => {
            if(!divEl.current.contains(event.target)){
                setIsOpen(false);
            }
        }
        // we are listening for clicks outside of the divEl.current
        document.addEventListener('click', handler, true);
        // we are passing in the handler function and true to make sure it is the first to be executed. 
        return () => {
            document.removeEventListener('click', handler);
        }
        // This is a cleanup function. It is used to remove the event listener when the component is unmounted.
        // This is a good practice to avoid memory leaks.
        // If we don't return this function, the event listener will not be removed when the component is unmounted. 

        
    }, [divEl.current]);

// what should i do next? 

    const handleClick = () => {
        setIsOpen(!isOpen);
    }
        
    const handleOptionClick = (opt) => {
        onChange(opt);
        setSelectedOption(opt);
        setIsOpen(false);
    }

    const renderedOptions = options.map((opt, index) => {
            return (
                <div 
                    key={index}
                    className="rounded cursor-pointer p-1 hover:bg-sky-100" 
                    onClick={() => { handleOptionClick(opt);}}
                >
                    {opt.label}
                </div>
            )
        });

    return (
        <div className="flex m-4 p-4 w-96 relative flex-col" ref={divEl}>
            <Panel className="dropdown-container w-96 flex flex-col items-start justify-left m-4 p-4 rounded-md">
                <h2 className="text-2xl font-bold">Dropdown</h2>    
            </Panel>

            <Panel>
                <label className="text-lg font-bold mb-2">Select a color</label>
                    <div className="relative w-full">
                        {/* Custom dropdown trigger */}
                        <div 
                            className="w-full p-4 border border-gray-300 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div className="flex justify-between items-center">
                                <span>{selectedOption?.label || 'Select an option'}</span>
                                <GoChevronDown className={`h-5 w-5 text-blue-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                        </div>

                        {/* Custom dropdown options */}
                        {isOpen && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
                                {renderedOptions}
                            </div>
                        )}
                    </div>
            </Panel>
        </div>
    )
    }



    // This is a reusable component that can be used to display a panel of content.
    // Spit out a styled div and it's children


    const Panel = ({ className, children, ...rest }) => {
        const finalClassName = cx('bg-white w-full panel-container m-2 mb-0 p-4 border border-gray-300 rounded-md', className);
        // className prop is passed to the Panel component
        // children prop contains the content inside the Panel
        // rest contains any other props passed to Panel
        
        return (
            <div {...rest} className={finalClassName}>
                {children}
            </div>
        )
    }

export { Panel }
export default Dropdown
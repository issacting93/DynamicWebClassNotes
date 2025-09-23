import { useState } from 'react'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'

const Accordion = (props) => {
    // Destructure items array from props
    const {items} = props;  

    const [expandedIndex, setExpandedIndex] = useState(0); 
    const handleClick = (nextIndex) => {  
        setExpandedIndex((currentExpandedIndex) => { 
            if (currentExpandedIndex === nextIndex) {
                return -1; // -1 means no item is expanded
            }
            else{
                // Otherwise, expand the clicked item
                return nextIndex;
            }   
        });
    }    // This function updates the state when an accordion item is clicked
    
    // SIMPLER VERSION (commented out):
    // const handleClick = (index) => { 
    //     setExpandedIndex(expandedIndex === index ? -1 : index);
    // } 


  const renderedItems = items.map((item, index) => { 
    const isExpanded = index === expandedIndex; 
    //Conditional Icon render using a ternary with rotation animation
    // A ternary is a conditional expression that is used to return a value based on a condition.

    const icon = (
      <span className={`text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
        <GoChevronDown />
      </span>
    )
    return (
      <div key={item.id}>  
        <div 
          onClick={() => {handleClick(index)}} // When clicked, call handleClick with this item's index
          className="accordion-container hover:bg-gray-50 transition-all duration-200 m-4 border border-gray-300 rounded-lg p-4 cursor-pointer"
        >  
            <div className="accordion-item">
                   <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg" > {item.label}  </h2> 
                    {icon}
                  </div>
                
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <hr className="my-2" />  
                  <div className="accordion-body pb-2">{item.content}</div>  
                </div>
            </div>
        </div>   
      </div>
    )
  }) 

  return (
    <div className="max-w-2xl mx-auto">  
      {renderedItems}  
    </div>
  )
} 


export default Accordion  
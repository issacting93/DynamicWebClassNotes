import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

const Accordion = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleClick = (nextIndex) => {
    if (expandedIndex === nextIndex) {
      setExpandedIndex(-1); // Close all if clicking the same item
    } else {
      setExpandedIndex(nextIndex);
    }
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;
    
    return (
      <div key={item.id} className="border-b border-gray-200">
        <div 
          className="flex justify-between p-4 bg-gray-100 cursor-pointer hover:bg-gray-100"
          onClick={() => handleClick(index)}
        >
          <div className="font-medium">{item.label}</div>
          <div className="text-lg">
            {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
          </div>
        </div>
        {isExpanded && (
          <div className="p-4 bg-white">
            {item.content}
          </div>
        )}
      </div>
    );
  });

  return <div className="border border-gray-300 rounded-lg overflow-hidden">{renderedItems}</div>;
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Accordion;

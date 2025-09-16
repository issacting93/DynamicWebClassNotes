import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          Component Library
        </div>
        
        <div className="flex space-x-4">
          <Link to="/buttons">
            <Button 
              secondary={!isActive('/buttons')} 
              primary={isActive('/buttons')}
              outline={!isActive('/buttons')}
            >
              Buttons
            </Button>
          </Link>
          
          <Link to="/accordion">
            <Button 
              secondary={!isActive('/accordion')} 
              primary={isActive('/accordion')}
              outline={!isActive('/accordion')}
            >
              Accordion
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

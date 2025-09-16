import React from 'react';
import Button from '../components/Button';
import { FaHeart, FaStar, FaDownload, FaTrash } from 'react-icons/fa';

const ButtonPage = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="p-8 mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-left">Button Component Library</h1>
      
      <div className="space-y-8">
        {/* Color Variations */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Color Variations</h2>
          <div className="flex flex-wrap gap-4">
            <Button primary onClick={handleClick}>Primary</Button>
            <Button secondary onClick={handleClick}>Secondary</Button>
            <Button success onClick={handleClick}>Success</Button>
            <Button warning onClick={handleClick}>Warning</Button>
            <Button danger onClick={handleClick}>Danger</Button>
          </div>
        </section>

       
 

      
      </div>
    </div>
  );
};

export default ButtonPage;

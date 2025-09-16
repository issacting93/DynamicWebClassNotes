import React from 'react';
import Button from './component/Button';
import UserRating from './pages/UserRating';

function App() {
  return (
    <div className="App">
         <h1 className="text-3xl font-bold text-blue-600 mb-4 text-left">
          Component Library
        </h1>
      <header className="App-header">
      
        
    
        {/* DebugTailwind component removed for simpler test */}

        <h1 className="text-2xl font-bold text-blue-600 mb-4">
       Buttons
        </h1>
        
        <div className="ComponentSection" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          <Button>Default Button</Button>
          <Button primary>Primary Button</Button>
          <Button secondary>Secondary Button</Button>
          <Button success>Success Button</Button>
          <Button warning>Warning Button</Button>
          <Button danger>Danger Button</Button> 
        </div>
 
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
        User Rating
        </h1>
        <div className="ComponentSection" >
          <UserRating />
        </div>

      
      </header>
    </div>
  );
}

export default App;

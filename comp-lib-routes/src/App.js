import ButtonPage from './pages/ButtonPage'
import AccordionPage from './pages/AccordionPage'
import DropdownPage from './pages/DropdownPage'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar' 


const App = () => {
  return (
    <div>
      <div className="container mx-auto p-4 mt-8 mb-8"> 
        <Navbar/>
      </div>
      <div className="container mx-auto p-4 mt-8 mb-8">
      <Routes>
        <Route path="/" element={<DropdownPage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/accordion" element={<AccordionPage />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
    
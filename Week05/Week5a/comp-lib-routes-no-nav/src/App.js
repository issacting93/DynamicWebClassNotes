// import cx from 'classnames'
// Always import libraries or named expots from that library from node modules first
import {Routes, Route} from 'react-router-dom'
// Then import your components
import Navbar from './components/Navbar'
import ButtonPage from './pages/ButtonPage'
import AccordionPage from './pages/AccordionPage'
import DropdownPage from './pages/DropdownPage'
// then your CSS and or DATA files
// import './index.css'
// data example
// import dropdownData from './data/dropdown-data'

const App = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<ButtonPage />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/dropdown" element={<DropdownPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

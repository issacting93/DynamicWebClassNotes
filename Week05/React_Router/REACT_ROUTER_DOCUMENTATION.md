# React Router Component Library Documentation

## 📚 Overview

This documentation covers the React Router implementation for the Dynamic Web Applications course. It demonstrates how to build a professional single-page application (SPA) with client-side routing using React Router DOM.

## 🎯 Learning Objectives

By the end of this module, you will understand:
- How React Router works and why it's essential for SPAs
- The difference between traditional websites and single-page applications
- How to implement client-side routing with React Router DOM
- Component organization patterns for scalable applications
- Professional navigation and user experience patterns

## 🏗️ Project Structure

```
Week05/React_Router/
├── comp-lib-start/          # Starter project (custom router implementation)
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── Button.js
│   │   │   ├── Accordion.js
│   │   │   ├── Dropdown.js
│   │   │   └── Panel.js
│   │   └── pages/
│   │       ├── ButtonPage.js
│   │       ├── AccordionPage.js
│   │       └── DropdownPage.js
│   └── package.json
├── comp-lib-EOC/            # End of Class - React Router DOM implementation
│   ├── src/
│   │   ├── App.js           # Main app with React Router
│   │   ├── components/
│   │   │   ├── Navbar.js    # Navigation component
│   │   │   ├── Button.js
│   │   │   ├── Accordion.js
│   │   │   ├── Dropdown.js
│   │   │   └── Panel.js
│   │   └── pages/
│   │       ├── ButtonPage.js
│   │       ├── AccordionPage.js
│   │       └── DropdownPage.js
│   └── package.json
└── README.md                # React Router tutorial and concepts
```

## 🔄 Traditional Websites vs Single Page Applications

### Traditional Websites
```
User clicks link → New HTML file loads → All JavaScript resets → Page renders
```
- ✅ Fast initial load
- ❌ Loses state between pages
- ❌ Slower navigation
- ❌ No smooth transitions

### Single Page Applications (SPAs)
```
User clicks link → JavaScript updates URL → Component renders → State preserved
```
- ✅ Fast navigation
- ✅ State preserved
- ✅ Smooth transitions
- ✅ Feels like native app

## 🛠️ React Router DOM Implementation

### 1. Installation and Setup

```bash
npm install react-router-dom
```

### 2. Basic App Structure

```jsx
// src/App.js
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ButtonPage from './pages/ButtonPage'
import AccordionPage from './pages/AccordionPage'
import DropdownPage from './pages/DropdownPage'

const App = () => {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Navbar />
      <div className="col-span-5">
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
```

### 3. Navigation Component

```jsx
// src/components/Navbar.js
import { Link } from 'react-router-dom'
import Panel from './Panel'

const Navbar = () => {
  return (
    <Panel>
      <Link to="/button">Button</Link>
      <Link to="/accordion">Accordion</Link>
      <Link to="/dropdown">Dropdown</Link>
    </Panel>
  )
}

export default Navbar
```

### 4. Router Setup in index.js

```jsx
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

## 🎨 Component Organization Patterns

### 1. Page Components
Page components represent full pages in your application:

```jsx
// src/pages/ButtonPage.js
import Button from '../components/Button'

const ButtonPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Button Component Demo</h1>
      
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-3">Variants</h2>
          <div className="flex gap-4">
            <Button primary>Primary</Button>
            <Button secondary>Secondary</Button>
            <Button success>Success</Button>
            <Button warning>Warning</Button>
            <Button danger>Danger</Button>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Outline Variants</h2>
          <div className="flex gap-4">
            <Button outline primary>Primary Outline</Button>
            <Button outline secondary>Secondary Outline</Button>
            <Button outline success>Success Outline</Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ButtonPage
```

### 2. Reusable Components
Components that can be used across multiple pages:

```jsx
// src/components/Button.js
import cx from 'classnames'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const Button = ({ 
  children, 
  primary, 
  secondary, 
  success, 
  warning, 
  danger, 
  rounded, 
  outline, 
  ...otherProps 
}) => {
  const count = Number(!!primary) + Number(!!secondary) + 
                Number(!!success) + Number(!!warning) + Number(!!danger)

  if (count > 1) {
    console.warn('Only one variant can be true!')
  }

  const baseClass = 'flex items-center px-8 py-3 border'
  const classes = twMerge(
    cx(otherProps.className, baseClass, {
      'bg-blue-500 border-blue-500 text-white': primary,
      'bg-gray-900 border-gray-900 text-white': secondary,
      'bg-green-500 border-green-500 text-white': success,
      'bg-orange-400 border-orange-500 text-white': warning,
      'bg-red-600 border-red-600 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-orange-400': outline && warning,
      'text-red-600': outline && danger,
    })
  )

  return (
    <button {...otherProps} className={classes}>
      {children}
    </button>
  )
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  rounded: PropTypes.bool,
  outline: PropTypes.bool,
}

export default Button
```

## 🔧 Advanced Router Features

### 1. Router-Aware Components

Make components that can handle both navigation and actions:

```jsx
// Enhanced Button component with routing capability
import { Link } from 'react-router-dom'

const Button = ({ to, children, ...props }) => {
  if (to) {
    return (
      <Link to={to} className="button-styles">
        {children}
      </Link>
    )
  }
  
  return (
    <button {...props}>
      {children}
    </button>
  )
}

// Usage:
// Navigation button
<Button to="/dashboard">Go to Dashboard</Button>

// Action button
<Button onClick={handleSave}>Save</Button>
```

### 2. Active Link Styling

```jsx
import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ to, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link 
      to={to}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  )
}
```

### 3. Nested Routes

```jsx
// Parent route
<Route path="/components" element={<ComponentsLayout />}>
  <Route index element={<ComponentOverview />} />
  <Route path="button" element={<ButtonDemo />} />
  <Route path="accordion" element={<AccordionDemo />} />
</Route>
```

## 🎯 Key React Router Concepts

### 1. BrowserRouter
Provides the routing context to your entire application:
```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

### 2. Routes
Container for all route definitions:
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### 3. Route
Individual route mapping:
```jsx
<Route path="/dashboard" element={<Dashboard />} />
```

### 4. Link
Navigation component for client-side routing:
```jsx
<Link to="/dashboard">Go to Dashboard</Link>
```

### 5. useNavigate
Programmatic navigation hook:
```jsx
import { useNavigate } from 'react-router-dom'

const MyComponent = () => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/dashboard')
  }
  
  return <button onClick={handleClick}>Navigate</button>
}
```

### 6. useLocation
Access current location information:
```jsx
import { useLocation } from 'react-router-dom'

const MyComponent = () => {
  const location = useLocation()
  
  return <div>Current path: {location.pathname}</div>
}
```

## 🎨 Styling and Layout

### 1. Grid Layout Pattern
```jsx
// Main app layout
<div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
  <Navbar />                    {/* Takes 1 column */}
  <div className="col-span-5">  {/* Takes 5 columns */}
    <Routes>
      {/* Route content */}
    </Routes>
  </div>
</div>
```

### 2. Responsive Navigation
```jsx
const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/components" className="nav-link">Components</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
```

## 🚀 Best Practices

### 1. Component Organization
- **Pages**: Full page components in `/pages` directory
- **Components**: Reusable UI components in `/components` directory
- **Hooks**: Custom hooks in `/hooks` directory
- **Utils**: Utility functions in `/utils` directory

### 2. Route Structure
- Use descriptive, RESTful paths: `/components/button` not `/comp/btn`
- Keep routes shallow when possible
- Use nested routes for related functionality

### 3. Navigation Patterns
- Always use `Link` for navigation, not `<a>` tags
- Provide visual feedback for active routes
- Ensure navigation is accessible

### 4. Performance Considerations
- Use `React.lazy()` for code splitting large pages
- Implement loading states for route transitions
- Optimize bundle size with dynamic imports

## 🔍 Common Patterns and Solutions

### 1. 404 Page
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 2. Protected Routes
```jsx
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth()
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### 3. Route Parameters
```jsx
// Route definition
<Route path="/user/:id" element={<UserProfile />} />

// Component
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const { id } = useParams()
  return <div>User ID: {id}</div>
}
```

## 📝 Homework Assignment

### Requirements
Create a React Router application with:
1. **Navigation component** with at least 3 routes
2. **Your custom component** as a dedicated page
3. **Professional styling** using Tailwind CSS
4. **Active link highlighting**
5. **Responsive design**

### Deliverables
1. Complete React Router implementation
2. At least one custom component with demo page
3. Clean, professional navigation
4. README with setup instructions
5. Code comments explaining key concepts

### Evaluation Criteria
- ✅ Proper React Router setup
- ✅ Clean component organization
- ✅ Professional navigation UX
- ✅ Responsive design
- ✅ Code quality and comments

## 🎓 Key Takeaways

1. **React Router** transforms your app into a professional SPA
2. **Component organization** is crucial for maintainability
3. **Navigation patterns** significantly impact user experience
4. **Route structure** should reflect your app's information architecture
5. **Professional web apps** use client-side routing for smooth UX

## 📚 Additional Resources

- [React Router Documentation](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Single Page Application Best Practices](https://developer.mozilla.org/en-US/docs/Glossary/SPA)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Course**: DM-GY 9103 A Dynamic Web Applications  
**Professor**: Kathryn Adee  
**Semester**: Fall 2025  
**Last Updated**: Week 5

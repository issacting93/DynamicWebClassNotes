# React Component Library - Revision Guide

## Table of Contents
1. [Accordion Component](#accordion-component)
2. [Dropdown Component](#dropdown-component)
3. [Button Component](#button-component)
4. [Panel Component](#panel-component)
5. [Key React Concepts](#key-react-concepts)
6. [Tailwind CSS Tips](#tailwind-css-tips)
7. [Git Commands](#git-commands)

---

## Accordion Component

### Overview
An interactive accordion component that allows users to expand/collapse content sections.

### Key Features
- ✅ Smooth animations with CSS transitions
- ✅ Chevron icon rotation (180°)
- ✅ Height and opacity animations
- ✅ Only one item expanded at a time
- ✅ Hover effects

### Code Structure
```javascript
import { useState } from 'react'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'

const Accordion = (props) => {
    const { items } = props;
    const [expandedIndex, setExpandedIndex] = useState(0);
    
    const handleClick = (nextIndex) => {
        setExpandedIndex((currentExpandedIndex) => {
            if (currentExpandedIndex === nextIndex) {
                return -1; // Collapse
            } else {
                return nextIndex; // Expand
            }
        });
    }
    
    // Component JSX...
}
```

### Animation Classes
```javascript
// Container hover animation
className="transition-all duration-200"

// Icon rotation animation
className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}

// Content height animation
className={`overflow-hidden transition-all duration-300 ease-in-out ${
    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
}`}
```

### State Management
- **`expandedIndex`**: Tracks which accordion item is currently expanded
- **`-1`**: No item expanded
- **`0, 1, 2...`**: Index of expanded item

---

## Dropdown Component

### Overview
A custom dropdown component with styled arrow and flexible options.

### Key Features
- ✅ Custom chevron arrow using React Icons
- ✅ Removes default browser arrow with `appearance-none`
- ✅ Focus states with blue ring
- ✅ Flexible options via props
- ✅ Proper positioning with absolute CSS

### Code Structure
```javascript
import React from 'react'
import { GoChevronDown } from 'react-icons/go'

const Dropdown = (props) => {
    const { options } = props;
    
    return (
        <div className="relative w-full">
            <select className="w-full p-4 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {/* Custom arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <GoChevronDown className="h-5 w-5 text-blue-500" />
            </div>
        </div>
    )
}
```

### Option Element
```javascript
<option value="red">Red</option>
//     ↑         ↑
//   value    display text
```

### Arrow Customization
```javascript
// Size adjustments
className="h-4 w-4"  // Small
className="h-5 w-5"  // Medium
className="h-6 w-6"  // Large

// Color adjustments
className="text-gray-400"  // Gray
className="text-blue-500"  // Blue
className="text-red-500"   // Red

// Position adjustments
className="pr-2"  // Closer to edge
className="pr-4"  // Further from edge
```

---

## Button Component

### Overview
A reusable button component with multiple variants and states.

### Key Features
- ✅ Multiple button variants (primary, secondary, danger)
- ✅ Different sizes (small, medium, large)
- ✅ Disabled state support
- ✅ Loading state with spinner
- ✅ Icon support

### Code Structure
```javascript
const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium', 
    disabled = false,
    loading = false,
    icon,
    onClick,
    className = '',
    ...rest 
}) => {
    const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2'
    
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    }
    
    const sizeClasses = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg'
    }
    
    const finalClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
    
    return (
        <button 
            className={finalClasses}
            disabled={disabled || loading}
            onClick={onClick}
            {...rest}
        >
            {loading ? <Spinner /> : icon}
            {children}
        </button>
    )
}
```

---

## Panel Component

### Overview
A flexible container component that accepts any div props.

### Key Features
- ✅ Flexible prop handling with `{...rest}`
- ✅ Custom className merging
- ✅ Children content support
- ✅ All HTML div attributes supported

### Code Structure
```javascript
const Panel = (className, children, ...rest) => {
    const finalClassName = cx('bg-white w-full panel-container m-4 p-4 border border-gray-300 rounded-md', className);
    
    return (
        <div {...rest} className={finalClassName}>
            {children}
        </div>
    )
}
```

### Rest/Spread Operator Explanation
```javascript
// Input props
<Panel 
    className="custom"
    id="panel-1"
    onClick={handleClick}
    children={<p>Hello</p>}
/>

// Destructuring
const Panel = (className, children, ...rest) => {
    // className = "custom"
    // children = <p>Hello</p>
    // rest = { id: "panel-1", onClick: handleClick }
}

// Spreading
<div {...rest} className={finalClassName}>
    {children}
</div>

// Result
<div id="panel-1" onClick={handleClick} className="final-class-name">
    <p>Hello</p>
</div>
```

### Benefits of `{...rest}`
- **Flexibility**: Accept any HTML div attributes
- **Accessibility**: Pass through `aria-*`, `role`, etc.
- **Event Handling**: Support all event handlers
- **Testing**: Pass through `data-testid`, `data-*` attributes

---

## Key React Concepts

### useState Hook
```javascript
const [state, setState] = useState(initialValue)

// Examples
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [isOpen, setIsOpen] = useState(false)
```

### Event Handlers
```javascript
// Arrow function
const handleClick = () => {
    console.log('Clicked!')
}

// With parameters
const handleClick = (id) => {
    console.log('Clicked:', id)
}

// Inline handlers
<button onClick={() => handleClick(item.id)}>
    Click me
</button>
```

### Conditional Rendering
```javascript
// Ternary operator
{isVisible ? <Component /> : null}

// Logical AND
{isVisible && <Component />}

// Multiple conditions
{isVisible ? <ComponentA /> : <ComponentB />}
```

### Map Function
```javascript
// Array of objects
const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
]

// Rendering list
{items.map(item => (
    <div key={item.id}>
        {item.name}
    </div>
))}
```

### Props Destructuring
```javascript
// Basic destructuring
const Component = ({ title, content, onClick }) => {
    // Use title, content, onClick
}

// With default values
const Component = ({ title = 'Default', content, onClick }) => {
    // Use title (defaults to 'Default')
}

// Rest operator
const Component = ({ title, ...rest }) => {
    // title is extracted, rest contains other props
}
```

---

## Tailwind CSS Tips

### Animation Classes
```javascript
// Transitions
transition-all          // All properties
transition-transform    // Transform only
transition-opacity      // Opacity only

// Durations
duration-75    // 75ms
duration-200   // 200ms
duration-300   // 300ms
duration-500   // 500ms

// Timing functions
ease-in-out    // Slow start, slow end
ease-out       // Fast start, slow end
ease-in        // Slow start, fast end
```

### Transform Classes
```javascript
// Rotation
rotate-0       // 0 degrees
rotate-90      // 90 degrees
rotate-180     // 180 degrees
rotate-270     // 270 degrees

// Scale
scale-100      // Normal size
scale-105      // 105% size
scale-110      // 110% size

// Translate
translate-x-2  // Move right 2 units
translate-y-2  // Move down 2 units
```

### Layout Classes
```javascript
// Flexbox
flex           // display: flex
flex-col       // flex-direction: column
justify-center // justify-content: center
items-center   // align-items: center

// Positioning
relative       // position: relative
absolute       // position: absolute
inset-y-0      // top: 0, bottom: 0
right-0        // right: 0
```

### Spacing Classes
```javascript
// Padding
p-4            // padding: 1rem
px-4           // padding-left/right: 1rem
py-2           // padding-top/bottom: 0.5rem

// Margin
m-4            // margin: 1rem
mx-auto        // margin-left/right: auto
my-2           // margin-top/bottom: 0.5rem
```

---

## Git Commands

### Basic Commands
```bash
# Check status
git status

# Add files
git add .                    # Add all files
git add filename.js          # Add specific file

# Commit changes
git commit -m "feat: Add new feature"

# Push changes
git push origin main
```

### Commit Message Format
```bash
# Format: type: description
feat: Add new feature
fix: Fix bug in component
docs: Update documentation
style: Format code
refactor: Improve code structure
test: Add tests
```

### Good Commit Examples
```bash
git commit -m "feat: Add animated accordion component with smooth transitions

- Add smooth height and opacity animations for content expansion/collapse
- Implement chevron icon rotation animation (180° rotation)
- Add hover effects with transition animations
- Fix icon alignment using proper Tailwind classes
- Remove unnecessary wrapper divs for cleaner animation
- Add comprehensive code comments explaining functionality"
```

---

## Common Patterns

### Component Structure
```javascript
// 1. Imports
import React from 'react'
import { useState } from 'react'

// 2. Component definition
const ComponentName = (props) => {
    // 3. State and hooks
    const [state, setState] = useState(initialValue)
    
    // 4. Event handlers
    const handleClick = () => {
        // Handle click
    }
    
    // 5. Render logic
    return (
        <div>
            {/* JSX */}
        </div>
    )
}

// 6. Export
export default ComponentName
```

### Prop Types (Optional)
```javascript
import PropTypes from 'prop-types'

ComponentName.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}
```

---

## Best Practices

### 1. Component Design
- ✅ Single responsibility principle
- ✅ Reusable and flexible
- ✅ Clear prop interface
- ✅ Proper state management

### 2. Code Organization
- ✅ Logical file structure
- ✅ Consistent naming conventions
- ✅ Clear comments for complex logic
- ✅ Remove unused code

### 3. Performance
- ✅ Use `transform` and `opacity` for animations
- ✅ Avoid unnecessary re-renders
- ✅ Proper key props in lists
- ✅ Efficient state updates

### 4. Accessibility
- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Color contrast compliance

---

## Troubleshooting

### Common Issues

#### 1. Animation Not Working
```javascript
// ❌ Wrong
className="align-items-center"

// ✅ Correct
className="items-center"
```

#### 2. Props Not Defined
```javascript
// ❌ Wrong
import Component from './Component'
<Component options={OPTIONS} />  // OPTIONS not defined

// ✅ Correct
const OPTIONS = [...]
<Component options={OPTIONS} />
```

#### 3. State Update Issues
```javascript
// ❌ Wrong
setState(state + 1)

// ✅ Correct
setState(prevState => prevState + 1)
```

#### 4. Missing Key Props
```javascript
// ❌ Wrong
{items.map(item => <div>{item.name}</div>)}

// ✅ Correct
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

---

## Resources

### Documentation
- [React Official Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

*Last updated: January 2025*

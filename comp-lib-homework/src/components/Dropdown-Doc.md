# Dropdown Component Documentation

## Overview
A reusable dropdown component with custom styling, built using React and Tailwind CSS. Features a custom chevron arrow and flexible options via props.

## Component Structure

### Basic Usage
```javascript
import Dropdown from './components/Dropdown'

const OPTIONS = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Blue', value: 'blue' },
]

function App() {
    return <Dropdown options={OPTIONS} />
}
```

### Component Architecture

#### Current Structure (Two-Panel Design)
```javascript
const Dropdown = (props) => {
    const { options } = props;
    return (
        <div className="flex m-4 p-4 w-96 relative flex-col">
            {/* Header Panel */}
            <Panel className="dropdown-container w-96 flex flex-col items-start justify-left m-4 p-4 rounded-md">
                <h2 className="text-2xl font-bold">Dropdown</h2>    
            </Panel>

            {/* Content Panel */}
            <Panel className=" ">
                <div className="flex flex-col items-start justify-left w-full">
                    <label className="text-lg font-bold mb-2">Select a color</label>
                    <div className="relative w-full">
                        <select className="w-full p-4 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <GoChevronDown className="h-5 w-5 text-blue-500" />
                        </div>
                    </div>
                </div> 
            </Panel>
        </div>
    )
}
```

## Props Interface

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| `options` | Array | Array of option objects with `label` and `value` properties |

### Option Object Structure
```javascript
{
    label: string,    // Text displayed to user
    value: string     // Value sent when form is submitted
}
```

## Styling Features

### Custom Arrow Implementation
- **Removes default browser arrow** using `appearance-none`
- **Custom React Icon** (`GoChevronDown`) positioned absolutely
- **Blue color** (`text-blue-500`) for visual consistency

### Focus States
- **Blue ring** (`focus:ring-2 focus:ring-blue-500`) on focus
- **Border highlight** (`focus:border-blue-500`) for accessibility

### Layout Classes
```javascript
// Container
className="flex m-4 p-4 w-96 relative flex-col"

// Select element
className="w-full p-4 border border-gray-300 rounded-md appearance-none bg-white pr-10"

// Arrow container
className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
```

## Panel Component Integration

### Panel Usage
The Dropdown component uses a custom Panel component for consistent styling:

```javascript
const Panel = ({ className, children, ...rest }) => {
    const finalClassName = cx('bg-white w-full panel-container m-2 mb-0 p-4 border border-gray-300 rounded-md', className);
    
    return (
        <div {...rest} className={finalClassName}>
            {children}
        </div>
    )
}
```

### Panel Benefits
- **Consistent spacing** across all panels
- **Flexible prop handling** with `{...rest}`
- **Custom className merging** for component-specific styling

## Design Decisions

### Two-Panel Architecture
**Why separate header and content?**

#### Advantages:
- ✅ **Visual separation** - Clear distinction between title and content
- ✅ **Flexible styling** - Each panel can have different styles
- ✅ **Modular design** - Reusable Panel component
- ✅ **Design system consistency** - Standardized card-based layout

#### Considerations:
- ⚠️ **Layout complexity** - More containers than necessary for simple dropdown
- ⚠️ **Spacing management** - Need to coordinate margins between panels
- ⚠️ **Performance** - Slightly more DOM elements

### Spacing Strategy
```javascript
// Panel spacing: m-2 mb-0
// - 2 units margin on all sides
// - 0 bottom margin to reduce gap between panels
const finalClassName = cx('bg-white w-full panel-container m-2 mb-0 p-4 border border-gray-300 rounded-md', className);
```

## Implementation Notes

### Key Features
1. **Native HTML select** - Uses browser's built-in dropdown behavior
2. **Custom styling** - Tailwind CSS for consistent design
3. **Accessibility** - Proper focus states and keyboard navigation
4. **Flexible options** - Accepts any array of option objects

### Dependencies
```javascript
import React from 'react'
import { GoChevronDown } from 'react-icons/go'
import cx from 'classnames'
```

## Usage Examples

### Basic Dropdown
```javascript
const colors = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' }
]

<Dropdown options={colors} />
```

### Form Integration
```javascript
const [selectedColor, setSelectedColor] = useState('')

const handleColorChange = (e) => {
    setSelectedColor(e.target.value)
}

<form>
    <Dropdown options={colors} />
    <button type="submit">Submit</button>
</form>
```

## Best Practices

### Data Structure
- Use consistent `label` and `value` properties
- Keep labels user-friendly and values URL-safe
- Consider adding `disabled` property for future enhancements

### Styling
- Maintain consistent spacing with Panel component
- Use semantic color choices (blue for primary actions)
- Ensure proper contrast for accessibility

### Performance
- Use `key` prop when mapping options
- Consider memoization for large option lists
- Avoid inline object creation in render

## Troubleshooting

### Common Issues

#### 1. Options Not Displaying
```javascript
// ❌ Wrong - options not passed
<Dropdown />

// ✅ Correct - options provided
<Dropdown options={OPTIONS} />
```

#### 2. Styling Conflicts
```javascript
// ❌ Wrong - conflicting width classes
<div className="w-96">
    <Panel className="w-full">  // This overrides container width
    </Panel>
</div>

// ✅ Correct - consistent width
<div className="w-96">
    <Panel>  // Uses default width from Panel component
    </Panel>
</div>
```

#### 3. Empty className Issues
```javascript
// ❌ Wrong - empty className with space
<Panel className=" ">

// ✅ Correct - either provide className or omit it
<Panel className="custom-class">
<Panel>  // No className prop
```

## Future Enhancements

### Potential Improvements
- [ ] **Disabled state** support
- [ ] **Loading state** with spinner
- [ ] **Search/filter** functionality
- [ ] **Multi-select** capability
- [ ] **Custom option rendering**
- [ ] **Keyboard navigation** improvements
- [ ] **Animation** for dropdown open/close

### API Extensions
```javascript
// Future prop interface
interface DropdownProps {
    options: Option[]
    placeholder?: string
    disabled?: boolean
    loading?: boolean
    searchable?: boolean
    multiSelect?: boolean
    onSelectionChange?: (value: string | string[]) => void
}
```

## Related Components

### Panel Component
The Dropdown uses the Panel component for consistent styling:
- **Purpose**: Generic container with consistent spacing and borders
- **Props**: `className`, `children`, `...rest`
- **Styling**: White background, border, padding, margin

### Button Component
Often used alongside Dropdown for form actions:
```javascript
<div>
    <Dropdown options={options} />
    <Button primary>Submit</Button>
</div>
```

---

*This documentation reflects the current implementation and design decisions made during development. Last updated: January 2025*
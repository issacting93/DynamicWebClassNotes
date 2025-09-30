# Week 03 - Component Library Class Notes

## Package Management

### Development Dependencies
- `-D` stands for `--save-dev`
- Installs packages as development dependencies (not needed in production)
- Example: `npm install eslint -D`
- Adds to `devDependencies` in package.json

## Tailwind CSS Configuration

### Content Folder
**Question**: How do I tell Tailwind which files need to consume Tailwind?

**Answer**: Configure the `content` array in `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // All JS/JSX/TS/TSX files in src/
  ],
  // ... rest of config
}
```

## React Component Concepts

### Children Props
Children props allow you to pass content inside a component's opening and closing tags.

**Without Children Props (Hardcoded):**
```jsx
function Button() {
  return <button>Click me</button>;
}
```

**With Children Props (Flexible):**
```jsx
function Button({ children }) {
  return <button>{children}</button>;
}

// Usage:
<Button>Click me</Button>
<Button>Save</Button>
<Button>Delete</Button>
<Button>Submit Form</Button>
```



### Destructuring
Extract values from objects or arrays into separate variables.

**Without Destructuring:**
```jsx
function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
```

**With Destructuring:**
```jsx
function Button({ children, className, onClick, primary }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
```

### what does the classname library do?
https://www.npmjs.com/package/classnames

The classNames function takes any number of arguments which can be a string or object. 
The argument 'foo' is short for { foo: true }. 
If the value associated with a given key is falsy, that key won't be included in the output.



## Using Tailwind in Components

### Basic Usage
```jsx
// Direct Tailwind classes
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

### Conditional Styling with classnames
```jsx
import cx from 'classnames';

const Button = ({ primary, children }) => {
  const classes = cx(
    'px-4 py-2 rounded', // Base classes
    {
      'bg-blue-500 text-white': primary,
      'bg-gray-500 text-white': !primary,
    }
  );
  
  return <button className={classes}>{children}</button>;
};
```


### Write a validation script to make sure only one of the classname in buttons is running.

### Component Library Structure
```
src/
├── components/          # Reusable UI components
│   ├── Button.js
│   ├── Card.js
│   └── Input.js
├── pages/              # Page-level components
│   ├── HomePage.js
│   └── AboutPage.js
└── App.js              # Main app component
```

## Key Takeaways

1. **Children Props**: Make components flexible by accepting content
2. **Destructuring**: Cleaner code by extracting props directly
3. **Tailwind**: Use utility classes for consistent styling
4. **Component Organization**: Separate reusable components from pages
5. **Conditional Styling**: Use classnames library for dynamic classes


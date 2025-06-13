# React Imports and Tree-Shaking

// ... existing code ...

## React Memoization

React provides three main ways to memoize values and components to optimize performance:

### 1. useMemo
`useMemo` is used to memoize computed values. It's useful when you have expensive calculations that you want to avoid re-running on every render.

```javascript
import { useMemo } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  
  // Memoize expensive calculation
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    return count * 2; // Example expensive calculation
  }, [count]); // Only recompute when count changes

  return (
    <div>
      <div>Count: {count}</div>
      <div>Expensive Value: {expensiveValue}</div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

### 2. useCallback
`useCallback` is used to memoize functions. It's particularly useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.

```javascript
import { useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // Memoize callback function
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Empty dependency array means this callback never changes

  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </>
  );
}
```

### 3. memo
`memo` is a Higher Order Component (HOC) that memoizes the entire component. It prevents re-renders if the props haven't changed.

```javascript
import { memo } from 'react';

// Memoized child component
const Child = memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Child Button</button>;
});

export default Child;
```

### When to Use Each Type

1. **useMemo**:
   - For expensive calculations
   - When you need to maintain referential equality of a value
   - When the value is used in dependency arrays of other hooks

2. **useCallback**:
   - When passing callbacks to optimized child components
   - When the callback is used in dependency arrays of other hooks
   - When you need to maintain referential equality of a function

3. **memo**:
   - For components that render often with the same props
   - When the component's render is expensive
   - When you want to prevent unnecessary re-renders of child components

### Best Practices for Memoization

1. Don't over-memoize:
   - Only use memoization when you have a performance problem
   - The overhead of memoization might be worse than the problem it solves

2. Use the React DevTools Profiler to identify performance issues

3. Remember that memoization has its own cost:
   - It uses memory to store the memoized values
   - It adds complexity to your code
   - It might not always improve performance

4. Consider the dependencies:
   - Always include all values used inside the memoized function in the dependency array
   - Be careful with object and function dependencies as they might cause unnecessary re-renders

5. Use the React DevTools to verify that memoization is working as expected

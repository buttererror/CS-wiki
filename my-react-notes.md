* UseEffect changes trigger re-renders
* In general, unless you’re creating or looping over thousands of objects, it’s probably not expensive. If you want to get more confidence, you can add a console log to measure the time spent in a piece of code:

console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');

reference: https://react.dev/learn/you-might-not-need-an-effect

### React forms
#### Controlled Input (React controls the value)
```
import { useState } from "react";

function ControlledInput() {
  const [value, setValue] = useState<string>("");

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```
- Value is stored in **React state**
- Uses `value` + `onChange`
- React is the **source of truth**
- Easy validation and reset
- More predictable
- More re-renders
  
#### Uncontrolled Input (DOM controls the value)
```
import { useRef } from "react";

function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log(inputRef.current?.value);
  };

  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Read Value</button>
    </>
  );
}
```
- Value is stored in the **DOM**
- Uses `ref` to read value
- Browser is the source of truth
- Less re-renders
- Harder validation
- Less control

#### Rule of Thumb
- React needs the value → **Controlled**
- React reads value occasionally → **Uncontrolled**

### Extracting State into a reducer (useState = useReducer)
Components with many state updates spread across many event handlers can get overwhelming. For these cases, you can consolidate all the state update logic outside your component in a single function, called a reducer.
Reference: https://react.dev/learn/extracting-state-logic-into-a-reducer


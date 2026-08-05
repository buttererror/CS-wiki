# React Forms

## Controlled Input

A controlled input receives its current value from React state and reports user
changes through an event handler.

```jsx
function ControlledInput() {
  const [value, setValue] = useState('')

  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}
```

React state is the source used to render the input value. This supports
coordination, validation, conditional UI, and programmatic reset.

## Uncontrolled Input

An uncontrolled input lets the DOM retain its current value. React can read it
through a ref or during form submission.

```jsx
function UncontrolledInput() {
  const inputRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    console.log(inputRef.current?.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" />
      <button type="submit">Read value</button>
    </form>
  )
}
```

## Choosing Between Them

Prefer a controlled input when the current value participates in React UI or
several components must coordinate around it. An uncontrolled input can be
simpler when the value is only needed at submission or when integrating with
DOM-oriented code.

The choice is not primarily about avoiding rerenders. It is about who owns the
current value and which behavior the application requires.

## Controlled and Uncontrolled Components

The terminology also applies beyond form elements:

- a **controlled component** receives important state through props;
- an **uncontrolled component** owns that state locally.

Real components can combine both models. Choose one clear owner for each piece
of state.

## Related Concepts

- [State and Updates](state-and-updates.md)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React DOM: `<input>`](https://react.dev/reference/react-dom/components/input)


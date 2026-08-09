# Timers and Event Scheduling

**Reading status:** Not read yet

## Scope

This page explains browser-provided timing and scheduling APIs. JavaScript
defines functions and closures; the browser supplies timers, event dispatch,
and rendering opportunities. The general JavaScript concepts used by callback
code are covered in [Functions, Closures, and Identity](../../computer-science-foundations/programming-languages/javascript/functions-closures-and-identity.md).

## A Timer Schedules Eligible Work

`setTimeout()` does not pause JavaScript and does not promise an exact execution
time. It asks the browser to make a callback eligible after a delay. Other
tasks, browser scheduling, and a busy main thread can make the callback run
later.

```text
current JavaScript finishes
        ↓
timer delay elapses
        ↓
browser queues eligible timer work
        ↓
event loop selects a task
        ↓
callback runs
```

```ts
const timer = setTimeout(() => {
  console.log("Runs later, not exactly at 500 ms");
}, 500);

clearTimeout(timer); // cancels it if it has not run
```

Timers are host APIs. They are available in browsers and often in other
JavaScript runtimes, but their handles, lifecycle behavior, and scheduling
details are runtime-specific.

## Task, Microtask, and Frame Work

Use the scheduling mechanism that matches the required timing:

| Need | Appropriate mechanism |
| --- | --- |
| Run after a delay or cancel pending work | `setTimeout()` and `clearTimeout()` |
| Defer work until the current synchronous code finishes, without yielding to another task | `queueMicrotask()` |
| Update visual state near a browser paint | `requestAnimationFrame()` |
| Respond to a user event | An event listener or framework event handler |

Microtasks run before the event loop takes another task, so repeatedly queuing
them can delay input and rendering. `requestAnimationFrame()` is usually a
better fit for visual work that should follow the browser's rendering cadence.

## Debounce and Throttle

**Debounce** waits for activity to become quiet. Each new call cancels the
previous pending timer, so only the final call triggers the work.

```ts
type DebouncedFunction<TArgs extends unknown[]> = {
  (...args: TArgs): void;
  cancel(): void;
};

function debounce<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
): DebouncedFunction<TArgs> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = ((...args: TArgs) => {
    if (timer !== undefined) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = undefined;
      callback(...args);
    }, delayMs);
  }) as DebouncedFunction<TArgs>;

  debounced.cancel = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };

  return debounced;
}
```

```text
typing:  r → re → rea → react → quiet period → one search
```

**Throttle** allows work at a limited rate while activity continues. Use it
when intermediate updates matter, such as a progress indicator during scrolling.
Use debounce when only the settled result matters, such as a search after typing
stops.

Neither technique cancels a request or computation that has already started.
That requires cancellation support or a way to ignore obsolete results.

## Lifecycle and Cleanup

Timer ownership should be explicit. Cancel a pending timer when its owner is
removed, replaced, or no longer relevant. In a framework, that normally means
cleanup at the framework's lifecycle boundary.

The React-specific application is covered in
[Debouncing in React](../../framework-tooling/frontend/react/debouncing.md).

## Related Concepts

- [Browser Runtime](README.md)
- [Functions, Closures, and Identity](../../computer-science-foundations/programming-languages/javascript/functions-closures-and-identity.md)
- [React Debouncing](../../framework-tooling/frontend/react/debouncing.md)

## Sources

- [HTML Standard: Timers](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers)
- [HTML Standard: Microtask queuing](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#microtask-queuing)
- [HTML Standard: Animation frames](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#animation-frames)

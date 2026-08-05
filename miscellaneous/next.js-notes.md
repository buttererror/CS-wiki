# Project Initialization

## Command Used
```bash
npx create-next-app@latest nextjs-dashboard \
  --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" \
  --use-pnpm
```

# Next.js Routing Comparison: App Router vs Pages Router

---

## App Router (`app/`)

- Modern routing system in Next.js
- Server Components by default
- Supports nested layouts and layout persistence
- Enables streaming and progressive rendering
- Supports Route Handlers and Server Actions
- Used by the official Next.js dashboard tutorial
- Recommended for new projects

---

## Pages Router (`pages/`)

- Legacy / classic routing system
- Client Components by default
- Uses `getServerSideProps`, `getStaticProps`, `getInitialProps`
- Simpler and more explicit data-fetching model
- Large ecosystem of existing examples and patterns
- Suitable for older codebases or incremental migration

---
# CSS Styling
---
Next.js provides several ways to style your application using CSS, including:

- Tailwind CSS
- CSS Modules
- Global CSS
- External Stylesheets
- Sass
- CSS-in-JS

## CSS modules
---

**Reference**: [CSS modules docs](https://nextjs.org/docs/app/getting-started/css)

### Definition

- CSS Modules provide **locally scoped CSS**
- Class names are automatically namespaced
- Prevent global style collisions
- Supported natively by Next.js

---

### File Naming

- Files must be named using:
  - `*.module.css`
  - `*.module.scss`

Only files with `.module.` are treated as CSS Modules.

---

### Basic Usage

#### CSS Module

```css
/* Button.module.css */
.button {
  padding: 8px 12px;
  border-radius: 6px;
}
```
---

## Using the clsx library to toggle class names

There may be cases where you may need to conditionally style an element based on state or some other condition.

### clsx
is a library that lets you toggle class names easily. We recommend taking a look at documentation

for more details, but here's the basic usage:
Suppose that you want to create an InvoiceStatus component which accepts status. The status can be 'pending' or 'paid'.
If it's 'paid', you want the color to be green. If it's 'pending', you want the color to be gray.

You can use clsx to conditionally apply the classes, like this:

```js
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

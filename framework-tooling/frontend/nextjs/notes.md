# Next.js Notes

## Purpose

This document contains reviewed Next.js-specific setup, routing, and styling
notes. General rendering and hydration concepts live under
[Frontend Development](../../../frontend-development/README.md).

## Project Initialization Example

```bash
npx create-next-app@latest nextjs-dashboard \
  --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" \
  --use-pnpm
```

## App Router and Pages Router

### App Router (`app/`)

- Current routing system for new Next.js features
- Server Components by default
- Supports nested layouts and layout persistence
- Enables streaming and progressive rendering
- Supports Route Handlers and Server Actions
- Used by the official Next.js dashboard tutorial
- Supports the current Server and Client Component model

### Pages Router (`pages/`)

- Earlier routing system that remains supported
- Uses the traditional React component model rather than App Router Server
  Components
- Uses `getServerSideProps`, `getStaticProps`, `getInitialProps`
- Large ecosystem of existing examples and patterns
- Suitable for older codebases or incremental migration

## CSS Styling

Next.js provides several ways to style your application using CSS, including:

- Tailwind CSS
- CSS Modules
- Global CSS
- External Stylesheets
- Sass
- CSS-in-JS

### CSS Modules

**Reference**: [CSS modules docs](https://nextjs.org/docs/app/getting-started/css)

#### Definition

- CSS Modules provide **locally scoped CSS**
- Class names are automatically namespaced
- Prevent global style collisions
- Supported natively by Next.js

---

#### File Naming

- Files must be named using:
  - `*.module.css`
  - `*.module.scss`

Only files with `.module.` are treated as CSS Modules.

---

#### Basic Usage

```css
/* Button.module.css */
.button {
  padding: 8px 12px;
  border-radius: 6px;
}
```

### Conditional Class Names with `clsx`

`clsx` builds a class string from conditional values. For example, a status
component can select presentation classes from its `status` prop:

```tsx
import clsx from 'clsx'

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
      {status}
    </span>
  )
}
```

## Related Canonical Material

- [Next.js: App Router](https://nextjs.org/docs/app)
- [Next.js: Pages Router](https://nextjs.org/docs/pages)
- [React Application Delivery](../react-application-delivery/README.md)
- [Next.js and React with Vite](../react-application-delivery/nextjs-vs-react-with-vite.md)
- [Hydration](../../../frontend-development/rendering/hydration.md)

# React Application Delivery

## Purpose

This directory studies how React applications are built, rendered, delivered,
and executed across browsers, build systems, and servers.

It is organized around delivery and runtime responsibilities rather than a
rigid hierarchy in which React, Vite, and Next.js are equivalent alternatives.

## Classification

- **Primary area:** Frameworks, libraries, and tooling
- **Applied concerns:** Frontend architecture, rendering, JavaScript delivery,
  data loading, deployment, and performance
- **Abstraction level:** Technology comparison and architectural decision-making

React, Vite, and Next.js occupy different roles:

```text
React
→ UI library and rendering model

Vite
→ development server and build tool

Next.js
→ React application framework
```

Their relationships overlap rather than forming a strict parent-child
taxonomy. A React application can use Vite, Next.js, or other build and
application frameworks. Vite can also build applications that do not use
React.

## Document Index

- [Next.js and React with Vite: Architecture, Performance, and JavaScript Delivery](nextjs-vs-react-with-vite.md)

## Related Areas

- [Frameworks, Libraries, and Tooling](../../README.md)
- [Frontend Development](../../../frontend-development/README.md)
- [SSR versus ISR](../../../frontend-development/rendering/ssr-and-isr.md)
- [Frontend Frameworks and Tooling](../README.md)
- [Next.js Notes](../nextjs/notes.md)
- [React](../react/README.md)

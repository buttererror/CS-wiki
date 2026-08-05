# Frontend Frameworks and Tooling

## Purpose

This directory owns technology-specific knowledge for building frontend
applications: UI libraries, application frameworks, build tools, framework
mechanisms, and comparisons between concrete technology configurations.

General frontend concepts remain under
[Frontend Development](../../frontend-development/README.md).

## Classification

- **Primary area:** Frameworks, libraries, and tooling
- **Applied scope:** Frontend technologies
- **Abstraction level:** Concrete technology behavior and API usage

## Technology Map

```text
Frontend technologies
├── React
│   └── UI library and rendering model
├── Next.js
│   └── React application framework
├── Vue
│   └── Progressive UI framework
├── Vite
│   └── Development server and build tool
└── State, routing, testing, and styling libraries
```

These technologies do not form one strict hierarchy. React can be used with
Vite or Next.js; Vite can build applications using several UI technologies;
and general concepts such as hydration or reactivity can be implemented by
multiple frameworks.

## Document Index

- [React](react/README.md)
- [Next.js Notes](nextjs/notes.md)
- [Vue Notes](vue/notes.md)
- [React Application Delivery](react-application-delivery/README.md)

## Future Study

- Add a dedicated Vite page when its build and development behavior receives a
  focused review.
- Review React Router framework mode and Gatsby as separate technologies before
  deciding whether they need canonical documents.
- Keep framework-independent accessibility, styling, browser-runtime, and
  rendering concepts in the frontend-development area.

## Related Areas

- [Frameworks, Libraries, and Tooling](../README.md)
- [Frontend Development](../../frontend-development/README.md)
- [Reactivity Mechanisms](../../frontend-development/state-and-reactivity/reactivity-mechanisms.md)


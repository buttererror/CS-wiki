# TypeScript Toolchain and Type Checking

**Reading status:** Not read yet

## Scope

This page distinguishes TypeScript execution/transformation tools from full
type checking. They often work together, but they answer different questions.

## Install Project Dependencies Locally

Install tools in the project that uses them:

```sh
npm install --save-dev typescript tsx
```

Do not combine a global install (`-g`) with `--save-dev`: global tools belong to
a user environment, while development dependencies belong in a project's
`package.json` and lockfile.

## Run versus Check

| Goal | Command | What it does |
| --- | --- | --- |
| Run a TypeScript entry point | `npx tsx src/index.ts` | Transforms and executes the file quickly |
| Type-check without emitting JavaScript | `npx tsc --noEmit` | Runs the TypeScript compiler's checks using the project configuration |

`tsx` uses esbuild to transform TypeScript and does not type-check code by
itself. A program can therefore execute through `tsx` even when a full
TypeScript check would report an error.

For a project, expose checking as a script:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

Then run:

```sh
npm run typecheck
```

## Compiler Configuration

`tsc` uses the closest applicable `tsconfig.json` when invoked in a project.
The `strict` family of options increases static checking; `noImplicitAny` and
`strictNullChecks` are particularly important when learning the safety boundary
between inferred, unknown, nullable, and unchecked values.

## Related Concepts

- [TypeScript Type-System Foundations](type-system.md)
- [Type Systems](../type-systems.md)
- [Browser Runtime](../../../frontend-development/browser-runtime/README.md)

## Sources

- [tsx: TypeScript](https://tsx.is/typescript)
- [TypeScript: The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript: Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

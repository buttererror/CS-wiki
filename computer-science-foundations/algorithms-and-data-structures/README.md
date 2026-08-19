# Algorithms and Data Structures

## Purpose

Algorithms and Data Structures studies procedures for solving computational
problems, ways of organizing information, and the time and space costs of the
operations they support.

This directory owns language-independent explanations of abstract data types,
data structures, algorithms, and their relationships. Concrete APIs such as
JavaScript `Array`, `Set`, and `Map` remain with their programming-language
pages and link back to the general concepts.

In broader curriculum terminology, this scope overlaps strongly with
**Algorithmic Foundations**. The wiki uses “Algorithms and Data Structures” as
the reader-facing name because those are its present focus; it is not a claim
that all of computational theory belongs inside this directory.

## Area Taxonomy

```text
Algorithms and Data Structures
│
├── Data abstractions
│   ├── abstract data types and their operations
│   └── collections: sequence, set, map, stack, queue, priority queue
│
├── Concrete data structures
│   ├── arrays and linked structures
│   ├── hash-based structures
│   ├── trees, search trees, heaps, and tries
│   ├── graph representations
│   └── specialized, persistent, concurrent, and external-memory structures
│
├── Fundamental algorithm families
│   ├── traversal and iteration
│   ├── searching and selection
│   ├── sorting
│   ├── insertion, deletion, and structural maintenance
│   ├── graph and tree algorithms
│   └── string, numeric, and domain-specific algorithms
│
├── Algorithm-design strategies
│   ├── brute force
│   ├── divide and conquer
│   ├── greedy methods
│   ├── dynamic programming
│   ├── backtracking and branch and bound
│   └── randomized and approximation methods
│
└── Analysis
    ├── correctness and invariants
    ├── time and space complexity
    ├── asymptotic, worst-, average-, and best-case analysis
    ├── amortized analysis
    └── trade-offs and lower bounds
```

This is an orientation map, not a strict partition. A graph algorithm depends
on a graph representation; a hash table combines a representation with lookup,
insertion, deletion, and collision-resolution algorithms; and dynamic
programming is a strategy that can solve problems in many domains.

## Position Within Computer Science

```text
Mathematical and theoretical foundations
        │ correctness, proof, complexity, computability
        ▼
Algorithms and Data Structures
        │ procedures, abstractions, representations, costs
        ▼
Programming Languages and Software Development
        │ concrete types, APIs, implementations, applications
        ▼
Specialized computing areas
        └── databases, AI, graphics, networks, security, systems, and others
```

The relationships work in both directions: application areas supply new
problems and constraints, while algorithmic foundations supply reusable
solution methods and ways to evaluate them.

This wiki keeps **models of computation, computability, formal languages, and
general complexity theory** in the neighboring Computation and Theory scope of
the broader [Computer Science Foundations](../) map. They remain closely
related to algorithm analysis. Implementing and using data structures also
overlaps with Programming Languages and Software Development Fundamentals.

## Taxonomy Position

This is the canonical foundation area for the collection concept because the
core questions concern abstract operations, representations, algorithms, and
efficiency. The relationships are deliberately cross-cutting:

| Perspective | Ownership in this wiki |
| --- | --- |
| Sequence, set, map, stack, and queue behavior | Algorithms and Data Structures |
| Arrays, linked structures, hash tables, trees, and other representations | Algorithms and Data Structures |
| JavaScript `Array`, `Set`, and `Map` behavior | Programming Languages / JavaScript |
| Generic types such as `Array<T>` and `Map<K, V>` | Programming Languages / Type Systems |
| Choosing a structure to communicate domain intent | Related Software Design and Data Modeling concerns |

“Collection” is therefore an umbrella term, not a claim that all structures
inherit from one universal collection parent. Particular ecosystems may define
narrower hierarchies; for example, a library can exclude maps from its formal
collection interface while maps remain collection-like in broader discussion.

## Distinguishing the Layers

```text
Required behavior and operations
        ↓ specified by
Abstract data type
        ↓ realized by
Data structure and algorithms
        ↓ exposed through
Language or library API
```

The layers overlap in everyday terminology, but they answer different
questions. A map or dictionary describes key-to-value behavior; a hash table
or balanced tree can realize that behavior; and a language supplies a concrete
API with its own guarantees.

## Current Coverage

| Topic | What it covers |
| --- | --- |
| [Collections and Data Structures](collections.md) | Collection vocabulary; sequences, lists, arrays, sets, maps, stacks, queues, representations, and language APIs |

The taxonomy above describes the intended subject scope. The table lists only
the canonical pages that currently exist; it should not be read as a claim
that the rest of the area has already been documented.

## Related Areas

- [Computer Science Foundations](../)
- [Programming Languages](../programming-languages/)
- [Type Systems](../programming-languages/type-systems.md)
- [JavaScript `Set`, `Map`, and `Object`](../programming-languages/javascript/set-map-and-object.md)
- [Software Engineering Foundations](../software-engineering/)

## Sources

- [ACM, IEEE-CS, and AAAI: CS2023 Algorithmic Foundations](https://csed.acm.org/wp-content/uploads/2025/11/CS2023-Report.htm#_Toc147951976)
- [ACM CS2023 Knowledge Areas](https://csed.acm.org/knowledge-areas/)
- [NIST Dictionary of Algorithms and Data Structures](https://xlinux.nist.gov/dads/)

# Software Testing

**Keywords:** software testing, testing taxonomy, test classification, test
level, test boundary, unit test, integration test, system test, end-to-end test,
E2E, manual testing, automated testing, smoke test, acceptance test, regression
test, exploratory testing, authentication transport verification, refresh
persistence

## Purpose

Software testing evaluates software behavior and quality. A test can be
classified along several independent dimensions, so labels from different
dimensions are not alternatives to one another.

For example, **integration** describes a boundary, while **manual** describes
how a check is executed. The same integration check can be manual or automated.

## Classification

- **Field:** Software Engineering
- **Primary area:** Software Development Practices
- **Practice:** Quality assurance and software testing

Testing is an applied engineering practice. It relates to software design,
security, accessibility, and operations, but those relationships do not make
testing a design pattern, architecture, or implementation technology.

## Testing Dimensions

| Dimension | Question it answers | Examples |
| --- | --- | --- |
| Boundary or level | How much of the system participates? | Unit, component, integration, system, end-to-end |
| Execution | How is the check performed? | Manual, automated |
| Purpose | Why is the check being performed? | Smoke, acceptance, regression, exploratory or diagnostic |
| Quality focus | Which property is being evaluated? | Functional behavior, security, performance, accessibility, reliability |
| Subject under test | What behavior or workflow is being checked? | Authentication transport, data entry workflow, cookie behavior, refresh persistence |

These dimensions can be combined:

```text
Automated integration regression test
│         │           └── purpose
│         └────────────── boundary
└──────────────────────── execution

Subject: session restoration after a browser refresh
```

The subject identifies the behavior being checked; it does not create another
test level.

## Boundary or Test Level

Boundary describes which real parts participate and which dependencies are
replaced or excluded.

| Boundary | Typical scope |
| --- | --- |
| Unit | One small unit of behavior with controlled collaborators |
| Component | One UI or service component exercised through its public behavior |
| Integration | Multiple real parts working together across a meaningful boundary |
| System | A substantially complete deployed or running system |
| End-to-end | A complete user or business journey across its important boundaries |

The names are useful shorthand, but their definitions vary between teams. A
clear test description should name the real boundary, such as:

```text
React route + query hooks + mocked fetch

or

running API + real HTTP cookies + test database
```

This is more informative than relying on the word “integration” alone.

## Execution

### Automated Testing

Code or tooling runs the check and evaluates repeatable assertions. Automated
tests are useful for regression protection and frequent feedback.

### Manual Testing

A person performs the actions and evaluates the evidence. Manual checks are
useful for exploratory work, visual behavior, one-off diagnostics, and
verification against a real environment.

Manual and automated describe execution, not boundary. A manual check may be
unit-like, integration-level, system-level, or end-to-end.

## Purpose

| Purpose | Main question |
| --- | --- |
| Smoke | Does the critical path basically work? |
| Acceptance | Does the behavior satisfy an agreed requirement? |
| Regression | Does behavior that worked before still work? |
| Exploratory | What can be learned by investigating the system interactively? |
| Diagnostic | What evidence isolates or explains a suspected problem? |

“Experiment” is understandable informal wording, but it is usually clearer to
say **exploratory check**, **diagnostic check**, or **technical experiment**,
depending on the goal.

## Classifying Manual Authentication Transport Verification

**Manual authentication transport verification** is a descriptive workflow,
not a separate standard test type beside integration or E2E.

It can be classified explicitly:

| Dimension | Classification |
| --- | --- |
| Boundary | Integration or system-level, depending on which real services and storage participate |
| Execution | Manual |
| Purpose | Acceptance, smoke, or diagnostic verification, depending on the immediate goal |
| Quality focus | Functional behavior and security properties |
| Subject under test | Authentication transport, HTTP-only cookies, session persistence, and refresh restoration |

For example:

- Sending login and authenticated requests with `curl` against a running API
  manually verifies the HTTP and cookie boundary. It is often best described
  as a **manual integration** or **manual system-level transport check**.
- Logging in through the browser, opening a protected page, and reloading it
  exercises the user-visible flow across frontend and backend boundaries. That
  can be a **manual end-to-end acceptance check** when the full stack is real.

The precise label depends on the actual boundary, not on the commands used.

## Refresh Persistence Example

**Refresh persistence** means that state intended to survive a full page reload
is restored from durable browser or server-managed state rather than only from
in-memory application state.

The same behavior can be tested in different ways:

| Check | Classification |
| --- | --- |
| Render the frontend with mocked HTTP responses and verify session restoration | Automated frontend integration regression test |
| Log in through a real browser, reload, and verify the protected page remains available | Manual or automated E2E acceptance/regression test |
| Send separate HTTP requests while reusing a curl cookie jar | Manual integration or system-level transport verification |

## Choosing a Useful Name

Prefer a name that communicates the dimensions relevant to the reader:

```text
Weak:  auth test

Better: automated auth API integration test

Better: manual E2E refresh-persistence acceptance check

Better: manual HTTP-only cookie transport verification
```

Not every name needs every dimension. Include enough information to make the
boundary, execution method, and protected behavior clear.

## Document Index

- [Testing Infrastructure and Strategy](testing-infrastructure.md) — testing
  layers, backend database E2E, test database isolation, database reset
  strategies, self-contained commands, and browser E2E deferral.

## Related Concepts

- [Software Development Practices](../README.md)
- [Software Engineering Foundations](../../computer-science-foundations/software-engineering/README.md)
- [Communication Patterns](../../computer-science-foundations/software-engineering/communication-patterns/README.md)
- [Security](../../security/README.md)

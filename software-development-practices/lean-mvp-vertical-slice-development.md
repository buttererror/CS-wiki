## Explanation

**LeanMvpVerticalSliceDevelopment** is a software delivery approach that combines **YAGNI**, **MVP**, and **Vertical Slice Development** to help a project move from idea to working product behavior without wasting time on premature infrastructure or unnecessary abstractions.

The core principle is:

```txt
Build useful business workflows before building supporting infrastructure.
```

This means the project should first prove that a real user workflow works end-to-end before investing heavily in architecture, reusable systems, CI/CD, dashboards, permissions, monitoring, or advanced testing.

For the Clinic Platform, this means focusing first on a complete **Patient Management** workflow:

```txt
Admin UI
  ↓
NestJS API
  ↓
Validation
  ↓
Prisma
  ↓
PostgreSQL
  ↓
UI refresh
```

Instead of building many technical layers separately, the project should build one complete business feature across all layers.

---

## Yagni

**YAGNI** means:

```txt
You Aren't Gonna Need It
```

It is a software engineering principle that says:

```txt
Do not build something just because you think you may need it later.
```

YAGNI does not mean ignoring the future. It means avoiding unnecessary work until there is a real reason to build it.

In the Clinic Platform, this means:

```txt
Patients only
→ No complex sidebar needed yet
```

Later, when there are multiple modules:

```txt
Patients + Appointments
→ A sidebar becomes useful
```

### Practical Rule

```txt
If the current workflow does not need it, defer it.
```

### Related Category

- **Primary Category:** System Design & Architecture
- **Field:** Software Engineering
- **Area:** Scope Control / Architecture Decision-Making
- **Level:** System-level

---

## Mvp

**MVP** means:

```txt
Minimum Viable Product
```

An MVP is the smallest useful version of a product that can prove value, expose real requirements, and guide the next development decisions.

MVP does not mean poor quality.

It means:

```txt
Smallest useful product version
with reasonable quality
and minimum waste.
```

For the Clinic Platform, the MVP should not begin with the whole system:

```txt
Patients
Appointments
Visits
Invoices
Payments
Authentication
Deployment
Monitoring
```

It should begin with one useful workflow:

```txt
Patient Management
```

Once Patient Management works, the system has its first real business value.

### Practical Rule

```txt
Build the smallest useful version, learn from it, then improve.
```

### Related Category

- **Primary Category:** System Design & Architecture
- **Field:** Software Engineering
- **Area:** Product Delivery Strategy
- **Level:** System-level

---

## VerticalSliceDevelopment

**Vertical Slice Development** means building one complete feature through every important layer of the system.

Instead of building technical layers separately:

```txt
Database layer
API layer
Frontend layer
Testing layer
Deployment layer
```

you build one real workflow from top to bottom:

```txt
Create Patient
├── UI form
├── API route
├── DTO validation
├── Service method
├── Prisma create query
└── PostgreSQL row
```

This proves that the system works as a complete chain, not as disconnected pieces.

### Practical Rule

```txt
Prefer one working feature across all layers over many unfinished layers.
```

### Related Category

- **Primary Category:** System Design & Architecture
- **Field:** Software Engineering
- **Area:** Feature Slicing / Incremental Architecture
- **Level:** System-level

---

## HorizontalDevelopment

**Horizontal Development** means building technical layers first before delivering real business behavior.

Example:

```txt
Week 1: Database setup
Week 2: ORM setup
Week 3: Repository layer
Week 4: Auth foundation
Week 5: Dashboard shell
Week 6: Shared components
Week 7: CI/CD
Week 8: First feature
```

The risk is:

```txt
A lot of structure exists,
but no real user workflow works yet.
```

Horizontal development is not always wrong, but it is risky for early MVP development because it delays feedback and can lead to overengineering.

### Practical Rule

```txt
Avoid building many system layers before proving one real workflow.
```

### Related Category

- **Primary Category:** System Design & Architecture
- **Field:** Software Engineering
- **Area:** Delivery Models
- **Level:** Structural / System-level

---

## IncrementalArchitecture

**Incremental Architecture** means the architecture grows as the product proves real needs.

Instead of designing the final architecture from day one, you start with a reasonable structure and evolve it when patterns become clear.

Example:

```txt
One patient form
→ Keep styles and components feature-local

Patient form + Appointment form repeat similar fields
→ Extract shared FormField or Button
```

This avoids premature abstraction while still keeping the system maintainable.

### Practical Rule

```txt
Let repeated needs create abstractions.
```

### Related Category

- **Primary Category:** System Design & Architecture
- **Field:** Software Engineering
- **Area:** Evolutionary Design / Incremental Architecture
- **Level:** System-level

---

## FeatureFirstStructure

**FeatureFirstStructure** means organizing code around business features instead of technical types.

Early frontend structure:

```txt
features/patients/
├── PatientsPage.tsx
├── PatientForm.tsx
├── PatientsTable.tsx
└── patients.api.ts
```

Later:

```txt
features/appointments/
├── AppointmentsPage.tsx
├── AppointmentForm.tsx
└── AppointmentsTable.tsx
```

Shared components should appear only after repetition becomes real:

```txt
shared/components/
├── Button.tsx
├── TextInput.tsx
├── PageHeader.tsx
└── Card.tsx
```

### Practical Rule

```txt
Start feature-local.
Extract shared code only after repetition appears.
```

### Related Category

- **Primary Category:** System Design & Architecture
- **Field:** Software Engineering
- **Area:** Code Organization / Frontend Architecture
- **Level:** Structural

---

## TestingStrategy

The testing strategy for an early MVP should be selective.

Do not test every tiny implementation detail just because it exists.

Low-value early test example:

```ts
return this.prisma.patient.create({ data: dto });
```

A mocked unit test for this may only test that the implementation calls Prisma, not that the system behavior is correct.

Better early approach:

```txt
Manual verification
+
Focused tests for meaningful behavior
```

Tests become more valuable when there is:

- Validation
- Business logic
- Permissions
- Error handling
- Edge cases
- Critical workflows

### Practical Rule

```txt
A few valuable tests are better than many brittle tests.
```

### Related Category

- **Primary Category:** System Design & Architecture
- **Field:** Software Engineering
- **Area:** Testing Strategy / Quality Assurance
- **Level:** Behavioral / System-level

---

## DevOpsTiming

**DevOpsTiming** means adding deployment, CI/CD, and environment automation when they start creating real leverage.

In early MVP development, full CI/CD may be premature if there is no meaningful workflow to deploy.

For the Clinic Platform:

```txt
Patient workflow incomplete
→ Full deployment can wait
```

Once the workflow is useful:

```txt
Patient workflow complete
Authentication needed
Remote testing needed
→ CI/CD and deployment become useful
```

### Practical Rule

```txt
Add DevOps infrastructure when there is something meaningful to ship.
```

### Related Category

- **Primary Category:** Framework / Tooling
- **Field:** Software Engineering
- **Area:** DevOps / Delivery Automation
- **Level:** System-level

---

## AgenticCodingStrategy

**AgenticCodingStrategy** means using AI coding agents to accelerate development while keeping human judgment responsible for architecture and correctness.

Agents are useful for:

- Boilerplate
- File creation
- Refactoring
- Task notes
- Repetitive implementation
- Drafting test cases
- Explaining code

Agents should not replace:

- Architecture judgment
- Product scope decisions
- Security decisions
- Final code review
- Understanding the code

### Practical Rule

```txt
Use agents to accelerate implementation, not to outsource judgment.
```

### Related Category

- **Primary Category:** Framework / Tooling
- **Field:** Software Engineering
- **Area:** Developer Workflow / AI-Assisted Development
- **Level:** Behavioral / System-level

---

## DocumentationStrategy

**DocumentationStrategy** means separating project documentation, task notes, and personal learning notes so they do not compete with actual product development.

Suggested structure:

```txt
docs/
→ Project documentation tracked in Git

docs/tasks/
→ Task implementation notes tracked in Git

learning/
→ Personal learning notes ignored by Git
```

Each type has a different purpose:

```txt
Project docs
→ How the project works

Task docs
→ What was implemented and why

Learning docs
→ What I learned while building
```

### Practical Rule

```txt
Do not spend more time organizing notes than building the product.
```

### Related Category

- **Primary Category:** Software Engineering
- **Field:** Software Engineering
- **Area:** Knowledge Management / Project Documentation
- **Level:** Structural

---

## Combined Decision Rule

When choosing between:

```txt
A) Faster MVP delivery with reasonable architecture
B) More sophisticated architecture with delayed delivery
```

prefer:

```txt
A) Faster MVP delivery with reasonable architecture
```

unless the shortcut creates clear future risk.

This keeps the Clinic Platform focused on real business behavior while still allowing the architecture to grow safely over time.

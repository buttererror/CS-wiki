# Horizontal and Vertical Development

## Purpose

This document compares two ways of sequencing software-development work.

## Classification

- **Field:** Software Engineering
- **Primary area:** Software Development Practices
- **Concern:** Development strategy and system evolution

```text
Horizontal Development → build shared foundations first
Vertical Development   → build end-to-end business features first
```

### Definition:

Horizontal Development means building system layers across the entire application before delivering complete business features.

Example:

```txt
Infrastructure
Authentication
Database
Logging
Caching
Monitoring
Permissions
Shared UI
```

before implementing actual user workflows.

Horizontal Development asks:

```txt
"What foundational capabilities does the whole system need?"
```

---

Vertical Development means building one complete business feature from UI to database before moving to the next feature.

Example:

```txt
Patient Registration

UI
 ↓
API
 ↓
Business Logic
 ↓
Database
```

fully working before starting another feature.

Vertical Development asks:

```txt
"What complete user value can we deliver right now?"
```

### Mental Model:

## Horizontal Development

```txt
Build the roads, electricity, water, and plumbing for the whole city first.
```

Think:

```txt
"Prepare the platform."
```

---

## Vertical Development

```txt
Build one complete house from foundation to roof, then build the next.
```

Think:

```txt
"Deliver a usable feature."
```

### Example:

## Horizontal Approach

```txt
Step 1: Setup PostgreSQL
Step 2: Setup Prisma
Step 3: Setup Auth
Step 4: Setup Permissions
Step 5: Setup Logging
Step 6: Setup Monitoring

Months later:
Step 7: Build Patient feature
```

Risk:

```txt
Lots of infrastructure, little business value.
```

---

## Vertical Approach

```txt
Patient Registration

Frontend Form
 ↓
API Endpoint
 ↓
Validation
 ↓
Database Save
```

Users can immediately register patients.

Next:

```txt
Appointment Booking
```

Then:

```txt
Check-In Workflow
```

### Comparison:

| Aspect | Horizontal Development | Vertical Development |
|----------|----------|----------|
| Focus | Foundations | Business Features |
| Delivers User Value Early | No | Yes |
| Infrastructure Quality | Usually Higher Initially | Built Incrementally |
| Feedback Speed | Slow | Fast |
| Startup Friendly | Less | More |
| Enterprise Platform Teams | Common | Less Common |
| Risk | Over-engineering | Technical debt if undisciplined |

### Why It Matters:

Most modern product teams favor:

```txt
Vertical Development
```

because it provides:

- faster feedback
- earlier releases
- better prioritization
- reduced waste

### Relationship to Your Clinic Project:

When I suggested:

```txt
Build Patient Registration
Then Appointments
Then Visits
```

instead of:

```txt
Build Auth
Build Docker
Build Monitoring
Build Caching
Build Event Bus
Build CQRS
```

I was recommending:

```txt
Vertical Development
```

These choices can be combined, but they answer different questions:

```txt
Monorepo                 → repository organization strategy
Domain-Driven Design     → domain modeling and software design
Modular Monolith         → architectural style
Vertical Feature Delivery → development and delivery approach
```

Choosing one does not require the others. Their suitability depends on the
system's domain complexity, deployment needs, team structure, and delivery
constraints.

### Relationships to Other Areas:

- Agile Development → strongly favors vertical slices.
- [Domain-Driven Design](../system-design/software-system-design/domain-driven-design.md)
  → vertical slices may align with domain capabilities or Bounded Contexts.
- Modular Monolith → modules can support vertical development.
- Microservice Architecture → services may be extracted when independent
  deployment is justified.

### Related Concepts:

- VerticalSliceArchitecture → Software Engineering
- AgileDevelopment → Software Engineering
- [Domain-Driven Design](../system-design/software-system-design/domain-driven-design.md)
  → Domain Modeling and Software System Design
- Modular Monolith → Architectural Style
- FeatureDrivenDevelopment → Software Engineering

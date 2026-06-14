## Concept: DatabaseModelingVsSchema

## Primary Category: System Design & Architecture >> It defines how data systems are structured and represented

## Taxonomy Classification: 
- Field: Database Systems
- Area: Data Modeling & Schema Design
- Level: Structural

## Subcategories: 
- ConceptualModel → High-level representation (ERD)
- LogicalSchema → Tables, columns, relationships
- PhysicalSchema → DB-specific implementation (indexes, constraints)

---

### Definition:

- **Database Modeling**:
  The process of designing how data is structured, related, and constrained in a system.

- **Schema**:
  The concrete implementation of that model inside a database (tables, columns, data types, constraints).

👉 Key idea:
**Modeling = thinking/designing**
**Schema = implementation/result**

---

### Mental Model:

Think of building a system like constructing a building:

- Database Modeling → Blueprint (what rooms exist, how they connect)
- Schema → Actual building structure (walls, doors, materials)

---

### Example:

#### Modeling (Conceptual)
You define:
- User
- Order
- Product
- Relationships:
  - User places Orders
  - Order contains Products

#### Schema (Logical)
```sql
Users(id, name, email)
Orders(id, user_id)
Products(id, name, price)
OrderItems(order_id, product_id)
```
---

## Concept: EntityRelationshipDiagram (ERD)

## Primary Category: System Design & Architecture >> Visual tool for modeling data systems

## Taxonomy Classification: 
- Field: Database Systems
- Area: Data Modeling
- Level: Conceptual

## Subcategories: 
- Entity → Object (User, Product)
- Attribute → Properties (name, email)
- Relationship → Connections (User → Orders)

---

### Definition:

An **ERD** is a visual representation of entities, their attributes, and relationships.

---

### Mental Model:

Think of ERD as:
👉 “System map of your data before writing any code or SQL”

---

### How to Create an ERD:

#### Step 1: Identify Entities
Ask:
- What are the core objects?
Example:
- User
- Order
- Product

#### Step 2: Define Attributes
For each entity:
- User → id, name, email
- Product → id, price

#### Step 3: Define Relationships
- User → places → Order (1-to-many)
- Order → contains → Product (many-to-many)

#### Step 4: Define Cardinality
- 1:1 → One-to-one  
- 1:N → One-to-many  
- M:N → Many-to-many  

#### Step 5: Normalize (Optional but important)
- Avoid duplication
- Split repeated data into separate entities

#### Step 6: Convert to Schema
- Entities → Tables  
- Attributes → Columns  
- Relationships → Foreign Keys  

---

### Example (Simple ERD):

Entities:
- User
- Order

Relationship:
- User (1) —— (N) Order

---

### Why It Matters:

- Prevents bad schema decisions early
- Makes team communication clear (design discussions)
- Essential for:
  - Backend engineers
  - System design interviews
  - SaaS product design

---

### Relationships to Other Areas:

- **DatabaseSchema** → ERD is transformed into schema  
- **API Design** → Endpoints mirror relationships (e.g., /users/:id/orders)  
- **State Management (Frontend)** → Data shape reflects backend schema  
- **Caching (React Query / RTK Query)** → Depends on normalized data shape  

---

### Related Concepts: 
- DatabaseModeling → System Design & Architecture  
- DataNormalization → Computer Science Foundations  
- RelationalDatabase → Computer Science Foundations
---
# Prisma Learning Notes

## What is Prisma?

Prisma is an ORM (Object Relational Mapper) that provides a type-safe TypeScript API for interacting with a database.

Architecture:

```txt
NestJS / TypeScript
        ↓
Prisma Client
        ↓
Prisma Engine
        ↓
PostgreSQL
```

---

## Core Prisma Components

### schema.prisma

Defines:

* Database provider
* Models (tables)
* Prisma Client generation settings

Example:

```prisma
model Patient {
  id        String   @id @default(uuid())
  fullName  String
  phone     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

### datasource

Defines the database connection type.

Example:

```prisma
datasource db {
  provider = "postgresql"
}
```

Database connection details are loaded from `DATABASE_URL`.

---

### generator

Defines how Prisma Client is generated.

Example:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}
```

Generated client location:

```txt
apps/api/generated/prisma
```

---

## DATABASE_URL

Connection string format:

```txt
postgresql://user:password@host:port/database
```

Example:

```txt
postgresql://clinic:password@localhost:5433/clinic_db
```

Parts:

```txt
protocol  → postgresql
user      → database user
password  → database password
host      → database server
port      → database port
database  → database name
```

---

## Migration

A migration is a version-controlled database structure change.

Purpose:

```txt
schema.prisma
        ↓
Migration
        ↓
Database Tables
```

Prisma stores migrations in:

```txt
prisma/migrations/
```

Benefits:

* Version history
* Reproducible database setup
* Team synchronization
* Environment consistency

---

## prisma migrate dev

Command:

```bash
pnpm exec prisma migrate dev --name <migration-name>
```

Responsibilities:

1. Compare schema with database
2. Generate SQL migration
3. Apply migration to PostgreSQL
4. Update migration history
5. Generate Prisma Client (depending on configuration/version)

Development-only workflow.

Production uses:

```bash
prisma migrate deploy
```

---

## prisma db pull

Purpose:

```txt
Existing Database
        ↓
Prisma Models
```

Used when tables already exist.

Error encountered:

```txt
P4001 The introspected database was empty
```

Meaning:

```txt
Prisma connected successfully
Database contained no tables
Nothing to import into schema.prisma
```

For a new project, migrations are preferred over `db pull`.

---

## Prisma Client

Generated TypeScript API used by the application.

Generation:

```bash
pnpm exec prisma generate
```

Flow:

```txt
schema.prisma
        ↓
prisma generate
        ↓
Prisma Client
        ↓
TypeScript API
```

Example usage:

```ts
await prisma.patient.findMany();

await prisma.patient.create({
  data: {
    fullName: "Mahmoud Ahmed"
  }
});
```

Prisma Client provides:

* Type safety
* Autocomplete
* Query validation
* Database abstraction

---

## Prisma Initialization

Initialization:

```bash
pnpm exec prisma init --datasource-provider postgresql
```

Generated files:

```txt
prisma/
├── schema.prisma
└── migrations/

prisma.config.ts
.env
```

---

## Current Project Flow

```txt
Docker PostgreSQL
        ↓
Prisma Schema
        ↓
Migration
        ↓
Database Tables
        ↓
Prisma Client
        ↓
NestJS Service
        ↓
API Endpoints
        ↓
Admin Dashboard
```

---

## Important Concepts Learned

```txt
Migration
→ Updates the database

Generate
→ Updates TypeScript code

db pull
→ Reads existing database into Prisma schema

Prisma Client
→ Generated API used by the application

schema.prisma
→ Source of truth for database structure
```


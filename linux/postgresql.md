## Concept: PostgreSQLSetup

## Primary Category: Framework / Tooling >> PostgreSQL is infrastructure tooling used by applications and ORMs such as Prisma.

## Taxonomy Classification:
- Field: Database Engineering
- Area: PostgreSQL Administration
- Level: System-level

## Subcategories:
- PostgreSQLServer → Database engine running on the machine
- PostgreSQLRole → Database user/account
- PostgreSQLDatabase → Logical container for tables and data
- PSQL → Interactive PostgreSQL shell

## PostgreSQL Setup (Local Installation)

### Switch to PostgreSQL Linux User

```bash
sudo -i -u postgres
```

Purpose:
- Switch from your Linux user to the PostgreSQL Linux user.
- Commonly used for database administration.

---

### Open PostgreSQL Shell

```bash
psql
```

Purpose:
- Opens the PostgreSQL interactive shell.

Prompt changes from:

```bash
postgres@pc:~$
```

to:

```sql
postgres=#
```

---

### Create a Database

```sql
CREATE DATABASE prisma_playground;
```

---

### List Databases

```sql
\l
```

---

### Connect to a Database

```sql
\c prisma_playground
```

---

### List Database Roles (Users)

```sql
\du
```

---

### Set Password for PostgreSQL Role

```sql
ALTER USER postgres PASSWORD 'postgres';
```

---

### Exit PostgreSQL Shell

```sql
\q
```

Returns to:

```bash
postgres@pc:~$
```

---

### Return to Normal Linux User

```bash
exit
```

Returns to:

```bash
mahmoud@pc:~$
```

---

### Prompt Levels

```text
mahmoud@pc:~$           # Linux user
postgres@pc:~$          # PostgreSQL Linux user
postgres=#              # PostgreSQL shell
prisma_playground=#     # Connected database
```

---

### Prisma Connection String

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prisma_playground"
```
## PostgreSQL Concepts

### PostgreSQL Server

The PostgreSQL server is the database engine running on the machine.

Prisma does not create or replace PostgreSQL.

Relationship:

```text
Application
    │
    ▼
Prisma
    │
    ▼
PostgreSQL Server
```

---

### PostgreSQL Role

A role is a database account.

Examples:

```text
postgres
prisma_user
clinic_user
```

View roles:

```sql
\du
```

Create a role:

```sql
CREATE USER prisma_user WITH PASSWORD 'secret123';
```

---

### PostgreSQL Database

A database is a logical container for tables, views, indexes, and other database objects.

Example:

```text
prisma_playground
clinic_platform
```

Create database:

```sql
CREATE DATABASE prisma_playground;
```

List databases:

```sql
\l
```

Connect to database:

```sql
\c prisma_playground
```

---

### PSQL

`psql` is the PostgreSQL interactive shell.

Open:

```bash
psql
```

Common commands:

```sql
\l      -- list databases
\du     -- list roles
\c      -- connect to database
\dt     -- list tables
\d      -- describe object
\q      -- quit
```

---

### Linux User vs PostgreSQL Role

These are different concepts.

Linux user:

```text
mahmoud
postgres
```

Check current Linux user:

```bash
whoami
```

PostgreSQL role:

```text
postgres
prisma_user
```

Check current database connection:

```sql
\conninfo
```

Example:

```text
Linux User (postgres)
        │
        ▼
PostgreSQL Role (postgres)
        │
        ▼
Database (prisma_playground)
```

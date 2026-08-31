# Frontend Contracts, Boundaries, Schemas, And Adapters

**Keywords:** frontend contract, boundary contract, form contract, API request contract, API response contract, executable contract, schema-first, runtime schema, inferred type, adapter, semantic adapter, feature-oriented structure, contract organization, Zod

A business concept can have several correct data representations at the same time. A Patient in an HTML form, a creation request, an update request, an API response, and a backend DTO refer to the same business concept, but each representation serves a different boundary.

The useful architectural question is not merely “Where should Zod schemas go?” It is:

> Which feature owns this data, at which boundary does it exist, and what contract does that boundary require?

## Classification And Relationships

- **Primary classification:** Applied frontend architecture and data-boundary design
- **Related disciplines:** Software architecture, API design, programming-language type systems, validation, security, and state management
- **Abstraction level:** Framework-independent mental model with TypeScript, Zod, React Hook Form, and TanStack Query as implementation examples

This topic belongs under frontend data boundaries because it focuses on representations entering, leaving, and changing responsibility inside a frontend feature. Its principles also apply beyond frontend applications.

## Central Mental Model

```text
Feature
  → establishes ownership

Boundary
  → identifies where responsibility changes

Contract
  → defines the expected representation

Schema
  → optionally makes that contract runtime-verifiable

Type
  → optionally provides compile-time knowledge

Adapter
  → optionally translates between different contracts
```

- The **feature** establishes business ownership.
- The **boundary** explains why a representation exists and where responsibility changes.
- The **contract** defines the representation's shape and meaning at that boundary.
- A **schema** optionally makes the contract executable and runtime-verifiable.
- A **type** optionally gives code compile-time knowledge of the representation or of a schema's input or output.
- An **adapter** optionally connects contracts when two boundaries intentionally represent the same concept differently.

The sequence is a reasoning model, not a rigid taxonomy or a requirement to create six artifacts. [Feature, Boundary, Contract, Schema, Type, And Adapter](../../computer-science-foundations/software-engineering/terminology/feature-boundary-contract-schema-type-adapter.md) classifies the terms across their broader software-engineering and programming-language contexts.

Start with ownership and meaning. Starting with folders, libraries, or type files can group unrelated responsibilities merely because they use the same implementation technology.

## Split The Architecture By Concern

| Concern | Owns | Does not own |
| --- | --- | --- |
| Form contract | Editable values, field names, defaults, browser-friendly representations, client validation messages, normalization | HTTP payload semantics, cache invalidation, backend authority |
| Form-to-request adapter | Workflow-specific translation from submitted form values to a request contract | Field registration, HTTP execution, response caching |
| API request contract | The body or parameters the frontend is allowed to send | Browser input lifecycle, backend trust decisions |
| API response contract | Runtime verification and type of data returned by the server | Fetch lifecycle, cache invalidation, UI selection |
| HTTP transport | Base URL, headers, credentials, status handling, JSON decoding, normalized transport errors | Patient-, Service-, or Appointment-specific rules |
| Server-state layer | Pending/error lifecycle, caching, query keys, invalidation, refetching | Form values and runtime proof of untrusted JSON unless parsing is explicitly part of the boundary |
| Backend validation | Authoritative validation of untrusted requests and business rules | Browser feedback and local form interaction |
| Cross-application sharing | Contracts proven to be genuinely shared by frontend and backend | Automatically centralizing every similar field or every file that uses the same schema library |

This separation prevents “schema unification” from blending form behavior, network trust, caching, and backend validation into one abstraction.

## A Contract Is Not Just A Type

A **contract** describes what data is expected at a boundary and what that representation means.

For example, a form can use:

```ts
type PatientFormValues = {
  fullName: string
  phone: string
}
```

A creation request can use:

```ts
type CreatePatientInput = {
  fullName: string
  phone?: string
}
```

An update request can use:

```ts
type UpdatePatientInput = {
  fullName: string
  phone: string
}
```

An API response can use:

```ts
type Patient = {
  id: string
  fullName: string
  phone: string | null
  createdAt: string
  updatedAt: string
}
```

All four describe Patient data, but they are distinct contracts:

| Contract | Boundary meaning |
| --- | --- |
| `PatientFormValues` | Values browser controls can edit naturally. |
| `CreatePatientInput` | JSON accepted by the creation endpoint. |
| `UpdatePatientInput` | JSON accepted by an update operation, including clearing semantics. |
| `Patient` | A persisted Patient representation returned by the API. |

Calling all of them “the Patient type” hides their different responsibilities.

## A Schema Is An Executable Contract

A TypeScript type is checked during compilation and erased from emitted JavaScript:

```ts
type CreatePatientInput = {
  fullName: string
}
```

It cannot inspect JSON arriving over the network at runtime.

A runtime schema remains executable:

```ts
const createPatientInputSchema = z.object({
  fullName: z.string(),
})
```

With a schema-first approach, the compile-time type is derived rather than maintained separately:

```ts
type CreatePatientInput = z.output<
  typeof createPatientInputSchema
>
```

```text
                    Schema
                   /      \
          runtime parse   compile-time type
```

This prevents a handwritten type from drifting away from its runtime validation. It does **not** imply that every boundary should share one universal schema.

### Input And Output Types Can Differ

A schema can normalize or transform its input. Libraries such as Zod can therefore distinguish:

```text
schema input
→ value accepted before parsing or transformation

schema output
→ value produced after successful parsing or transformation
```

When a form resolver applies trimming or transformation, the form library may need the schema's input type for editable values and its output type for the submitted result. Treating input and output as automatically identical can hide transformation behavior.

## Boundaries Explain Why Representations Differ

Patient creation crosses several boundaries:

```text
User
  ↓
HTML inputs
  ↓
[ FORM BOUNDARY ]
PatientFormValues
  ↓
adapter
  ↓
[ API REQUEST BOUNDARY ]
CreatePatientInput
  ↓ serialize
HTTP JSON
  ↓ validate
[ BACKEND REQUEST BOUNDARY ]
CreatePatientDto or request schema
  ↓
Database
```

The values do not need identical representations at every step.

An optional phone input naturally contains an empty string in the browser:

```text
Form contract
phone: ''

       ↓ create adapter

Create request contract
phone omitted
```

Editing can assign the same form value a different request meaning:

```text
Form contract
phone: ''

       ↓ update adapter

Update request contract
phone: ''

       ↓ backend interpretation

clear the stored phone
```

Trying to force both workflows into one universal Patient schema would erase the create-versus-update meaning rather than remove accidental duplication.

## Adapters Translate Meaning Between Contracts

An adapter does not need to be an elaborate class. A small function can be the complete adapter:

```ts
function toCreatePatientInput(
  values: PatientFormValues,
): CreatePatientInput {
  return {
    fullName: values.fullName,
    ...(values.phone ? { phone: values.phone } : {}),
  }
}
```

Its responsibility is:

```text
Contract A
    ↓
semantic translation
    ↓
Contract B
```

The important word is **semantic**. The function is not merely renaming properties. It records the workflow rule that an empty create-form phone means “do not send a phone.”

Keep a small adapter beside the workflow that consumes it. Extract a shared adapter only when multiple implemented workflows repeat the same translation.

## Form Contract And Field Names

A form schema can own:

- editable value shapes;
- client validation and messages;
- trimming or other form normalization;
- form field names;
- the type supplied to the form library.

Centralized field-name constants can prevent repeated string literals:

```ts
export const patientFormFields = {
  fullName: 'fullName',
  phone: 'phone',
} as const

export const patientFormSchema = z.object({
  [patientFormFields.fullName]: z.string().trim().min(1),
  [patientFormFields.phone]: z.string().trim(),
})
```

The schema, defaults, registration, and error lookup can all depend on the same keys. This is useful when it prevents drift; it should not grow into a large configuration object that combines labels, layout, transport rules, and unrelated UI behavior without a demonstrated need.

## API Request Contracts

Request schemas describe what the frontend is permitted to send:

```ts
export const createPatientInputSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().optional(),
})

export const updatePatientInputSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string(),
})

export type CreatePatientInput = z.output<
  typeof createPatientInputSchema
>
```

Parsing before serialization adds a runtime check to the compile-time type. It still does not replace server validation because browser code is not a trusted security boundary.

## API Response Contracts And Network Trust

A generic such as `apiRequest<Patient[]>()` describes what application code expects, but the generic disappears at runtime. It does not prove that the server returned valid Patient JSON.

Without runtime parsing:

```text
Server JSON
  ↓
response.json()
  ↓ type assertion
assumed Patient[]
  ↓
client cache and UI
```

With a response schema:

```text
Server JSON
  ↓
unknown
  ↓ patientListSchema.parse(...)
validated Patient[]
  ↓
client cache and UI
```

Treating decoded network data as `unknown` until validation is an honest trust-boundary model. Invalid data fails near the API boundary instead of entering the cache and causing a less understandable rendering failure later.

## HTTP Transport Remains Generic

A shared API client commonly owns:

- base URL construction;
- credentials and headers;
- HTTP status handling;
- JSON decoding;
- normalized transport errors.

It should not own Patient-, Service-, or Appointment-specific validation rules.

An endpoint can initially parse its response locally:

```ts
const response = await apiRequest<unknown>('/patients')

return patientListSchema.parse(response)
```

After several features repeat the same pattern, a generic schema-aware API helper may be justified. Extracting it before repetition can add indirection without protecting a demonstrated shared boundary.

## Server-State Ownership Remains Separate

A server-state library such as TanStack Query can continue owning:

- pending and error lifecycles;
- cache storage and isolation;
- query keys;
- invalidation and refetching;
- mutation coordination.

The response schema should validate data before it enters that cache:

```text
HTTP response
→ response schema
→ validated feature data
→ server-state cache
```

Form state, runtime validation, and remote caching cooperate, but none is a substitute for the others.

## Backend Validation Remains Authoritative

The complete trust path is:

```text
browser form validation
→ frontend request adapter and optional request parsing
→ HTTP request
→ backend request validation
→ controller or handler
→ business logic and persistence
```

Frontend validation improves feedback and catches development mistakes. The backend must still validate every request because clients can bypass or manipulate browser code.

Backend DTOs and frontend schemas may express similar rules using different validation mechanisms. Moving them into a shared package is a separate architecture decision, not an automatic consequence of adding frontend schemas.

## Share Rules Without Erasing Contracts

Several contracts may reuse smaller validation primitives:

```ts
const patientFullNameSchema = z.string().trim().min(1)
const patientPhoneSchema = z.string().trim()
```

Those primitives can be composed into separate contracts:

```text
shared field rules
├── patientFormSchema
├── createPatientInputSchema
├── updatePatientInputSchema
└── patientResponseSchema
```

This is **shared validation primitives plus distinct boundary contracts**. Reuse should remove duplicated rules without making form, request, response, and persistence representations interchangeable.

## Feature-Oriented Structure

Organize by business capability first:

```text
features/
├── patients/
├── catalog/
└── appointments/
```

Then organize responsibilities inside each feature. An early structure can be:

```text
patients/
├── components/
├── data/
│   ├── patientsApi.ts
│   └── patientApiSchemas.ts
├── patientFormSchema.ts
└── state/
```

This communicates:

- the Patient feature owns all Patient behavior;
- the form contract belongs to the Patient form concern;
- request and response contracts belong to the Patient data boundary.

A global structure such as this groups by technical artifact instead of business ownership:

```text
src/
├── schemas/
├── types/
├── components/
└── api/
```

A global `schemas/` directory can become no more meaningful than a global `types/` directory if its contents are related only because they use the same library.

## Folder Structure Is A Consequence

Directory names should follow demonstrated ownership and repetition.

### One small form schema

Keep the structure minimal:

```text
patients/
├── patientFormSchema.ts
└── data/
```

### Several files owned by form behavior

Use `forms/` when the directory represents a genuine responsibility:

```text
patients/forms/
├── patientFormSchema.ts
├── patientFormDefaults.ts
├── patientFormFields.ts
└── patientFormAdapters.ts
```

### Form, request, and response contracts form a feature layer

Use `schemas/` or `contracts/` when the feature has accumulated a coherent contract layer:

```text
patients/contracts/
├── patientFormSchema.ts
├── patientRequestSchemas.ts
└── patientResponseSchemas.ts
```

The naming trade-off is:

| Directory | What the name emphasizes | Appropriate when |
| --- | --- | --- |
| `forms/` | Owning form responsibility | The files all support form behavior. |
| `schemas/` | Runtime-validation mechanism | Runtime schemas across the feature form a clear, intentional layer. |
| `contracts/` | Boundary meaning independent of technology | The feature intentionally centralizes several boundary contracts. |
| No directory | Minimal structure | One or two files do not yet form a meaningful group. |

Do not reorganize solely because several files happen to use Zod. Observe real Patient, Catalog, and Appointment contracts, then standardize from evidence.

## Cross-Application Sharing Is A Separate Decision

Putting schemas in a package shared by frontend and backend can be valuable, but first decide:

- whether the backend will execute the shared schema or keep its existing DTO validator;
- which validation and normalization rules are genuinely identical across trust boundaries;
- whether browser-facing error messages belong in shared contracts;
- whether request and response versioning needs independent control; and
- how both applications build and consume the package.

Similar field names are not sufficient evidence that the complete contract is shared.

## Adoption Sequence

A low-risk sequence is:

1. Establish one local form schema and infer its form type.
2. Keep form-to-request translation explicit.
3. Add response schemas at the frontend API boundary and parse network data before caching it.
4. Add distinct create and update request schemas where runtime request checking is useful.
5. Test schemas directly and test visible workflows through their owning UI boundary.
6. Observe repetition across multiple features before extracting a generic schema-aware API helper.
7. Revisit `forms/`, `schemas/`, or `contracts/` organization after real contract growth.
8. Evaluate frontend/backend sharing independently.

## Common Mistakes

- Treating a TypeScript assertion as runtime validation.
- Calling form, request, response, and persistence representations one universal model.
- Letting a form schema own cache or transport behavior.
- Letting a query cache accept unvalidated network JSON by assumption.
- Assuming client validation replaces server validation.
- Creating a global `schemas/` directory merely because Zod was installed.
- Extracting adapters or API helpers before repeated behavior exists.
- Sharing frontend error messages and backend trust rules without checking whether the contracts are truly identical.

## Decision Checklist

- Which feature owns the representation?
- At which boundary does it exist?
- What does an empty, missing, or nullable value mean at that boundary?
- Is the value trusted, or must runtime code parse it?
- Should the TypeScript type be inferred from a runtime schema?
- Does another boundary need a separate contract?
- Is an adapter translating meaning or only adding indirection?
- Does the proposed directory represent an actual responsibility or only a library?
- Is a shared package justified by identical semantics across applications?

## Related Topics

- [Data Across Frontend Boundaries](./)
- [Feature, Boundary, Contract, Schema, Type, And Adapter](../../computer-science-foundations/software-engineering/terminology/feature-boundary-contract-schema-type-adapter.md)
- [Serialization Across Boundaries](serialization.md)
- [Controlled and Uncontrolled Inputs](../routing-and-interaction/controlled-and-uncontrolled-inputs.md)
- [Type Systems](../../computer-science-foundations/programming-languages/type-systems.md)
- [TypeScript Type-System Foundations](../../computer-science-foundations/programming-languages/typescript/type-system.md)
- [Software Architecture](../../computer-science-foundations/software-engineering/software-architecture.md)
- [Software Design Principles](../../computer-science-foundations/software-engineering/software-design-principles/)
- [TanStack Query](../../framework-tooling/tanstack-query.md)

## Takeaway

Do not search for one universal representation of a business concept. Let the feature establish ownership, let each boundary define its contract, use schemas to verify runtime values and infer types, and use adapters when two correct contracts intentionally differ.

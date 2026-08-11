# Security

## Purpose

Security is a cross-cutting field concerned with protecting systems, data,
identities, operations, and users against misuse, compromise, and failure of
security guarantees.

This directory is the canonical home for security concepts in the wiki. Some
topics are grounded in Computer Science, while their design and operation also
draw from Software Engineering, systems engineering, risk management, privacy,
and organizational practice.

## Reading Mindset

Security is not a final layer added after implementation.

```text
Business and user context
        ↕
Threats, risks, and trust boundaries
        ↕
System design and architecture
        ↕
Implementation and operations
        ↕
Evidence, incidents, and changing threats
```

Security decisions are contextual. A mechanism that reduces one risk may
introduce another, so recommendations should state their assumptions and
trade-offs.

## Foundational and Applied Perspectives

Security includes foundational knowledge and its application to concrete
systems.

```text
Foundational Security Knowledge
→ general properties, models, mechanisms, assumptions, and limitations

Applied Security Engineering
→ decisions for protecting a particular system against relevant threats
```

For example:

```text
Digital-signature foundations
→ explain integrity, authenticity, keys, and verification assumptions

JWT deployment
→ decides which token profile, algorithms, keys, claims, validation,
  storage, transport, expiration, and revocation rules a system needs
```

Foundational does not mean "new research," and applied does not mean
"thoughtless implementation." Engineers study both. The distinction describes
whether the knowledge is general across systems or used to make contextual
decisions for a particular system.

## Broad Area Map

```text
Security
│
├── Foundational Security Knowledge
│   ├── Security properties
│   ├── Threat and adversary models
│   ├── Cryptographic principles
│   ├── Access-control models
│   └── Security protocol foundations
│
├── Identity and Access Management
│   ├── Identity
│   ├── Authentication
│   ├── Authorization
│   ├── Sessions and security tokens
│   └── Federation
│
├── Application Security
├── Cryptography
├── Network and Infrastructure Security
├── Data Security and Privacy
├── Security Architecture
└── Security Operations and Incident Response
```

This map introduces neighboring areas without claiming that their boundaries
are strict or that the wiki currently covers all of them.

## Current Scope

The current documents are applied Identity and Access Management material.
There is not yet enough focused content to justify a separate
`security/foundations/` directory. When foundational documents are added, this
landing page should remain their shared parent so the wiki does not create two
competing Security hierarchies.

## Current Documents

- [Identity and Access Management](identity-and-access-management/)
- [Authentication](identity-and-access-management/authentication.md)
- [JSON Web Token](identity-and-access-management/json-web-token.md)

## Related Concepts

- [Computer Science Foundations](../computer-science-foundations/)
- [Software Engineering Foundations](../computer-science-foundations/software-engineering/)
- [Software System Design](../system-design/software-system-design/)
- [Computer Systems](../computer-science-foundations/computer-systems/)

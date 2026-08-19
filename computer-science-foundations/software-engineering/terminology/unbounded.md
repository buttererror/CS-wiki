# Unbounded

**Keywords:** unbounded, no upper bound, unlimited, uncapped, unrestricted growth, unbounded query, unbounded response, unbounded collection, unbounded queue, unbounded retries

## Purpose

This document defines **unbounded** in software engineering and explains why it usually describes a missing enforced limit rather than literal infinity.

## Definition

Something is **unbounded** when its design or interface establishes no relevant upper limit on its size, duration, count, growth, or resource consumption.

For example, a query is unbounded when it can return every matching record and provides no pagination, row limit, or other maximum. Its result may be small today, but the maximum response size grows with the stored data.

```text
bounded
→ an explicit or enforced maximum exists

unbounded
→ no relevant maximum is established
```

## Unbounded Does Not Mean Infinite

An unbounded operation normally produces a finite result at a particular moment. The problem is that the system has not defined a dependable maximum.

```text
100 rows today
1,000 rows later
1,000,000 rows eventually
```

Physical resources such as memory, storage, bandwidth, and time still impose eventual limits. Those failure limits do not make the design safely bounded; they only determine where it breaks.

## Common Contexts

| Context | What is unbounded | Typical risk | Common bound |
| --- | --- | --- | --- |
| Database or API query | Number of returned records | Slow queries, large responses, memory pressure | Pagination, `LIMIT`, cursor, maximum page size |
| Queue or buffer | Number of retained items | Growing memory or storage use | Capacity limit, backpressure, retention policy |
| Retry policy | Number or duration of attempts | Retry storms and work that never settles | Maximum attempts, deadline, retry budget |
| Cache or history | Number of retained entries | Resource exhaustion and slower maintenance | Eviction, TTL, history limit |
| Input or payload | Accepted size | Excessive processing or denial-of-service risk | Maximum byte, item, or depth limit |
| Wait or execution | Duration | Requests or jobs that never complete | Timeout, deadline, cancellation |

## Example: Unbounded Audit History

Consider a catalog query that returns every Service and includes every audit entry for each Service:

```text
100 Services
× 500 audit entries per Service
= 50,000 audit entries in one response
```

If the query has no page size or history limit, one request can return the complete accumulated history. The response is unbounded because its maximum grows continuously with production data.

Possible boundaries include:

- omit audit history from the catalog response;
- return only the latest audit entry;
- expose history through a separate paginated endpoint;
- apply a retention policy when complete history is not required.

The correct bound depends on the product requirement. Adding an arbitrary limit without defining navigation or retention behavior can merely truncate data silently.

## Boundaries And Related Terms

- **Unlimited:** often used informally as a synonym, although real systems remain limited by finite resources.
- **Uncapped:** no configured maximum is applied to the relevant quantity.
- **Paginated:** a large result is divided into bounded pages; the complete collection can still grow.
- **Backpressure:** a producer is slowed or rejected when a consumer or buffer reaches its capacity.
- **Retention policy:** rules determine how long or how many historical records remain available.
- **Timeout or deadline:** a time bound on waiting or execution.

## Key Takeaways

- Unbounded means no relevant upper limit is defined or enforced.
- It does not mean the current value is infinite or even large.
- The risk appears as data, traffic, retries, or execution time grows.
- A useful review question is: **What prevents this quantity from growing without a dependable limit?**
- Choose a bound that preserves the required behavior, such as pagination, capacity, retention, or a deadline.

## Related Concepts

- [Software Engineering Terminology](./)
- [Caveat](caveat.md)
- [Narrowing](narrowing.md)

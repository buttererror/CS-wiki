# Probe

**Keywords:** probe, test probe, observer probe, health probe, liveness probe, readiness probe, instrumentation probe, observability, test harness, diagnostic probe, telemetry

## Purpose

This document defines **probe** as a cross-cutting software engineering and computer systems concept, distinguishing its roles across software testing, system observability, and runtime instrumentation.

---

## Definition

A **probe** is a lightweight observer, sensor, or diagnostic helper connected to or embedded within a system to **measure, read, or report internal state without altering how the system behaves**.

The term originates from physical instruments—such as voltmeters, medical probes, or temperature sensors—used to inspect internal conditions from the outside with minimal physical interference.

In software, a probe answers a fundamental question:

> How can external observers (tests, orchestrators, profilers, or operators) inspect internal state, reachability, or health without breaking encapsulation or mutating behavior?

---

## Contexts and Abstraction Levels

The term **probe** appears across several distinct engineering disciplines:

| Context | What the probe does | What it observes | Typical example |
| :--- | :--- | :--- | :--- |
| **Software Testing** (Test Probe) | Observes internal state from within an encapsulated runtime tree or harness and exposes it to test assertions. | Internal context, router state, or lifecycle events. | A test helper mounted inside a router context rendering `<output aria-label="Current location">` for test queries. |
| **Service Observability & SRE** (Health Probes) | Periodically queries a running service from the outside to evaluate availability and readiness. | Process responsiveness, dependency connectivity, and initialization status. | Kubernetes `livenessProbe` (restart if failed) and `readinessProbe` (route traffic only when ready). |
| **Runtime Instrumentation** (Tracing Probes) | Attaches diagnostic hooks to specific kernel or runtime execution points to record telemetry. | Function invocations, timing, memory allocations, and syscalls. | eBPF kernel tracepoints, DTrace probes, or APM profiler hooks. |
| **Network & Security** (Active Probes) | Sends targeted diagnostic packets across network boundaries to measure latency or detect services. | Round-trip time, packet loss, port reachability, and network topology. | ICMP ping probes, TCP handshake probes, or synthetic network monitoring. |

---

## Test Probes vs. Test Doubles

In software testing, it is important to distinguish a **test probe** from a **test double**:

```text
Test Double (Stub, Mock, Fake, Spy)
  → REPLACES a real dependency to control inputs or verify outgoing interactions.

Test Probe (Observer)
  → INJECTS an observer into a real system/context to read internal state
    without replacing or mocking production behavior.
```

### Mental Model: The Test Probe

When testing systems with encapsulated internal state (such as state stores, component trees, or routing contexts), tests often need to verify that an action caused the expected internal transition.

```text
┌──────────────────────────────────────────────┐
│ Real System / Component Tree                 │
│                                              │
│  [ Component A ] ───► [ Internal State ]     │
│                             │                │
│  [ Test Probe (Observer) ] ◄┘                │
│         │                                    │
└─────────┼────────────────────────────────────┘
          ▼
    Test Assertion (e.g., expect state to match)
```

Instead of mocking internal state managers or accessing private properties:
1. The **test harness** mounts a lightweight observer (the probe) inside the system.
2. The probe reads the state via standard public or context APIs (e.g., React `useLocation()`, event listener).
3. The probe outputs the data into an accessible surface (such as DOM text, an output element, or an in-memory test queue) where the test runner can assert on it cleanly.

---

## Health Probes in Distributed Systems

In container orchestration and distributed systems, probes provide automated lifecycle management:

- **Liveness Probe:** Determines if the process is alive. If the probe fails, the orchestrator kills and restarts the container.
- **Readiness Probe:** Determines if the application is ready to accept user traffic (e.g., after database connections and caches warm up). If failed, traffic is diverted away without killing the process.
- **Startup Probe:** Protects slow-starting legacy applications by disabling liveness and readiness checks until initialization finishes.

---

## Boundaries and Pitfalls

- **Observer Effect (Heisenbug):** A probe should introduce near-zero overhead. If an instrumentation probe or test probe introduces heavy synchronization or alters execution timing, it risks changing the behavior under observation.
- **Production Isolation:** Test probes must remain strictly inside test harnesses or test files, ensuring no diagnostic test elements leak into production bundles or expose private state in production.
- **Encapsulation vs. Intrusiveness:** A good probe observes through standard extension hooks, context consumers, or exposed diagnostic channels rather than monkey-patching private variables.

---

## Key Takeaways

- A **probe** is an observer designed to sample or expose internal state without mutating normal system execution.
- In **testing**, a test probe taps into internal context or events to expose assertable evidence without invasive mocks.
- In **observability and systems**, health probes (liveness, readiness) automate operational routing and failure recovery.
- In **instrumentation**, tracing probes capture performance telemetry at runtime with minimal overhead.

---

## Related Concepts

- [Software Engineering Terminology](./)
- [Testing Terminology](../../../software-development-practices/testing/#testing-terminology-umbrella)
- [Software Testing](../../../software-development-practices/testing/README.md)
- [Mechanism](mechanism.md)
- [Client](client.md)

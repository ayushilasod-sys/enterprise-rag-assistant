# Architecture Decision Records

---

# ADR-001

## Title

Use Plugin-Based Evaluators

## Status

Accepted

## Context

The framework should support adding new evaluation metrics without modifying the EvaluationEngine.

Examples:

- Groundedness
- Correctness
- Hallucination
- Relevance

## Decision

Use a plugin-based architecture where each evaluator implements the Evaluator interface.

EvaluationEngine receives a list of evaluators and executes them.

## Consequences

### Advantages

- Easily extensible
- Open/Closed Principle
- Loose coupling

### Disadvantages

- Slightly more module configuration
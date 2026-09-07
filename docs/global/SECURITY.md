# Security policy and engineering rules

## Scope

FacilityPass may handle research requirements, institutional information, account data, and access links. Treat private research information as potentially sensitive by default.

## Engineering rules

- never commit secrets;
- use environment-scoped secrets;
- validate all external input server-side;
- authorization is enforced on the server;
- use least privilege;
- log security-relevant events without logging secret/token values;
- use cryptographically strong random tokens for capability links;
- store sensitive bearer tokens hashed when the application only needs comparison;
- expire and revoke security-sensitive links;
- never expose private payloads directly in URLs;
- distinguish authentication from authorization;
- review third-party data handling before sending confidential information.

## AI data handling

Public source content and confidential customer content require different treatment. Confidential research material must not be sent to an external AI provider without an approved provider/data-processing path.

## Dependency security

New dependencies require necessity, maintenance, licensing, supply-chain, and transitive-risk review proportional to risk.

Automated dependency updates are proposals, not automatic production changes. They pass normal CI/review.

## Vulnerability reporting

Do not place exploitable vulnerability details in a public issue. Use the repository's private security reporting mechanism when enabled, or contact the designated repository owner through the project's private channel.

## Incident priority

For suspected credential exposure or unauthorized access:

1. contain/revoke;
2. preserve evidence/logs;
3. assess blast radius;
4. recover safely;
5. document/root-cause;
6. add prevention tests/controls.

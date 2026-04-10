# Workflow: Audit GDPR (GDPR Compliance Copilot)

1.  **Define Scope**: Identify the product, jurisdictions, and primary user types.
2.  **Map Data Flows**: Use `data_flow_map` to trace personal data points.
3.  **Inventory Vendors**: Use `vendor_register` to list and risk-score third-party processors.
4.  **Identify Gaps**: Use `gdpr_gap_report` to find missing compliance pieces (e.g., missing DPA, cookie banner).
5.  **Prepare Policy**: Use `privacy_policy_inputs` to gather the details needed for a draft.
6.  **DSAR Prep**: Use `dsar_pack` to generate request-handling templates.
7.  **Final Review**: Present all findings in a `gdpr-gap-report.md` for human review.

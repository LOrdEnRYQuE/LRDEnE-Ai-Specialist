# Security Audit Workflow (/audit-security)

Use this workflow to perform a comprehensive security health check on the current project.

## Steps

1. **Discovery**
   - Run `repo_scan` to detect the tech stack.
   - Run `dependency_risk_scan` to check the lockfile (deep scan).

2. **Secrets & Config Audit**
   - Run `secret_scan` for hardcoded keys and tokens.
   - Run `auth_session_audit` for insecure cookie/auth patterns.
   - Run `security_headers_audit` for missing hardening headers.

3. **Aggregation**
   - Review all findings.
   - Categorize by severity (Critical, High, Medium, Low).
   - Generate remediation checklist.

4. **Reporting**
   - Call `hardening_report` to save the log entry to the **Control Center**.
   - Present a Markdown summary to the user:
     - "Security Audit Complete 🛡️"
     - [Summary Table]
     - [Critical Blocker List]
     - [Next Steps]

---
description: Comprehensive security audit of codebase
agent: review
---

# Security Audit Prompt

Perform a comprehensive security audit of the codebase, identifying vulnerabilities and security best practice violations.

## Audit Scope

Specify what to audit:
- [ ] Authentication & Authorization
- [ ] Input Validation & Sanitization
- [ ] Data Protection & Encryption
- [ ] API Security
- [ ] Dependency Vulnerabilities
- [ ] Configuration & Secrets Management
- [ ] Error Handling & Information Disclosure
- [ ] Session Management
- [ ] File Upload Security
- [ ] Database Security

## Security Checklist

### 1. Authentication & Authorization

**Check for:**
- [ ] Weak password policies
- [ ] Missing multi-factor authentication
- [ ] Insecure password storage (plaintext, weak hashing)
- [ ] Session fixation vulnerabilities
- [ ] Broken authentication flows
- [ ] Missing authorization checks
- [ ] Privilege escalation risks
- [ ] JWT vulnerabilities (weak secrets, missing validation)

**Examples of Issues:**
```csharp
// ❌ CRITICAL: Plaintext password storage
user.Password = password; // Store hashed instead

// ❌ HIGH: Weak JWT secret
var key = "secret123"; // Use strong, env-based secret

// ❌ HIGH: Missing authorization check
public async Task<User> DeleteUser(int id) {
    return await _repo.Delete(id); // No permission check!
}
```

### 2. Input Validation & Injection Attacks

**Check for:**
- [ ] SQL Injection vulnerabilities
- [ ] NoSQL Injection
- [ ] Command Injection
- [ ] XML/XXE Injection
- [ ] LDAP Injection
- [ ] Cross-Site Scripting (XSS)
- [ ] Path Traversal
- [ ] Server-Side Request Forgery (SSRF)

**Examples of Issues:**
```csharp
// ❌ CRITICAL: SQL Injection
var query = $"SELECT * FROM Users WHERE Id = {userId}"; // Use parameterized queries

// ❌ CRITICAL: Command Injection
Process.Start("cmd.exe", $"/c {userInput}"); // Never pass user input to shell

// ❌ HIGH: Path Traversal
var filePath = Path.Combine(baseDir, userFileName); // Validate/sanitize filename
```

```typescript
// ❌ CRITICAL: XSS vulnerability
element.innerHTML = userInput; // Use textContent or sanitize

// ❌ HIGH: Unvalidated redirect
window.location = req.query.redirect; // Validate against whitelist
```

### 3. Data Protection

**Check for:**
- [ ] Sensitive data in logs
- [ ] Unencrypted sensitive data storage
- [ ] Weak encryption algorithms
- [ ] Hardcoded encryption keys
- [ ] Missing HTTPS/TLS
- [ ] Insecure data transmission
- [ ] PII exposure
- [ ] Missing data anonymization

**Examples of Issues:**
```csharp
// ❌ CRITICAL: Sensitive data in logs
_logger.LogInformation($"User login: {password}"); // Never log passwords

// ❌ HIGH: Weak encryption
var des = new DESCryptoServiceProvider(); // Use AES-256

// ❌ CRITICAL: Hardcoded secrets
var apiKey = "sk-1234567890abcdef"; // Use environment variables
```

### 4. API Security

**Check for:**
- [ ] Missing rate limiting
- [ ] CORS misconfiguration
- [ ] Missing input validation
- [ ] Excessive data exposure
- [ ] Mass assignment vulnerabilities
- [ ] Missing API authentication
- [ ] Insecure direct object references (IDOR)
- [ ] Missing CSRF protection

**Examples of Issues:**
```typescript
// ❌ HIGH: Missing rate limiting
app.post('/api/login', loginHandler); // Add rate limiter

// ❌ HIGH: CORS misconfiguration
app.use(cors({ origin: '*' })); // Specify allowed origins

// ❌ CRITICAL: IDOR vulnerability
app.get('/api/users/:id', (req, res) => {
    // No check if user can access this ID
    return getUserById(req.params.id);
});
```

### 5. Dependency Vulnerabilities

**Check for:**
- [ ] Outdated dependencies with known CVEs
- [ ] Unused dependencies
- [ ] Transitive dependency vulnerabilities
- [ ] Lack of dependency pinning
- [ ] Missing security updates

**Scan using:**
```bash
# .NET
dotnet list package --vulnerable --include-transitive

# npm
npm audit

# Python
pip-audit

# Go
go list -json -m all | nancy sleuth
```

### 6. Configuration & Secrets

**Check for:**
- [ ] Hardcoded credentials
- [ ] Secrets in source code
- [ ] Secrets in version control
- [ ] Insecure default configurations
- [ ] Debug mode in production
- [ ] Verbose error messages
- [ ] Exposed admin interfaces
- [ ] Missing security headers

**Examples of Issues:**
```csharp
// ❌ CRITICAL: Hardcoded database password
var connString = "Server=localhost;Database=mydb;User=admin;Password=admin123";

// ❌ HIGH: Debug mode in production
app.UseDeveloperExceptionPage(); // Only in Development

// ❌ MEDIUM: Missing security headers
// Add: X-Content-Type-Options, X-Frame-Options, CSP, etc.
```

### 7. Error Handling

**Check for:**
- [ ] Sensitive information in error messages
- [ ] Stack traces exposed to users
- [ ] Generic error handling that masks security issues
- [ ] Unhandled exceptions
- [ ] Detailed error messages in production

**Examples of Issues:**
```csharp
// ❌ MEDIUM: Information disclosure
catch (SqlException ex) {
    return BadRequest(ex.Message); // Don't expose SQL errors
}

// ✅ GOOD: Generic error message
catch (SqlException ex) {
    _logger.LogError(ex, "Database error");
    return StatusCode(500, "An error occurred");
}
```

### 8. Session Management

**Check for:**
- [ ] Session fixation vulnerabilities
- [ ] Missing session timeout
- [ ] Insecure session storage
- [ ] Session ID in URL
- [ ] Missing secure/httpOnly flags on cookies
- [ ] Predictable session IDs

**Examples of Issues:**
```typescript
// ❌ HIGH: Insecure cookie settings
res.cookie('session', sessionId); // Missing secure, httpOnly flags

// ✅ GOOD: Secure cookie
res.cookie('session', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000
});
```

## Audit Report Format

```markdown
## Security Audit Report
**Date:** [YYYY-MM-DD]
**Scope:** [Files/modules audited]
**Risk Level:** 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low

---

### Executive Summary
- Critical issues found: [count]
- High risk issues: [count]
- Medium risk issues: [count]
- Overall risk level: [Critical/High/Medium/Low]

---

### Critical Issues (Immediate Action Required)

#### 🔴 CRITICAL: SQL Injection in User Search
**Location:** `src/services/userService.ts:45`
**Severity:** Critical (CVSS 9.8)

**Vulnerable Code:**
```typescript
const query = `SELECT * FROM users WHERE name = '${searchTerm}'`;
const users = await db.raw(query);
```

**Exploitation:**
- Attacker can inject SQL: `' OR '1'='1`
- Can read entire database
- Can modify or delete data
- Can potentially execute OS commands

**Fix:**
```typescript
const users = await db('users')
    .where('name', '=', searchTerm);
```

**Priority:** 🚨 Immediate - Patch within 24 hours

---

#### 🔴 CRITICAL: Hardcoded API Secrets
**Location:** `src/config/api.ts:12`
**Severity:** Critical

**Issue:**
```typescript
export const API_KEY = 'sk-1234567890abcdef';
```

**Risk:** Exposed credentials in version control

**Fix:**
```typescript
export const API_KEY = process.env.API_KEY;
```

**Additional Actions:**
- [ ] Rotate compromised API key immediately
- [ ] Remove from git history
- [ ] Use secret management service

---

### High Risk Issues

#### 🟠 HIGH: Missing Authentication Check
**Location:** `src/routes/admin.ts:23`
[Details...]

---

### Medium Risk Issues

#### 🟡 MEDIUM: Weak Password Policy
[Details...]

---

### Low Risk Issues

#### 🟢 LOW: Missing Security Headers
[Details...]

---

### Recommendations

1. **Immediate Actions (0-24 hours)**
   - [ ] Fix critical SQL injection vulnerabilities
   - [ ] Rotate exposed secrets
   - [ ] Add authentication to exposed endpoints

2. **Short-term (1-7 days)**
   - [ ] Implement rate limiting
   - [ ] Add input validation
   - [ ] Update vulnerable dependencies

3. **Medium-term (1-4 weeks)**
   - [ ] Implement comprehensive logging
   - [ ] Add security headers
   - [ ] Conduct security training

4. **Long-term (1-3 months)**
   - [ ] Implement automated security scanning in CI/CD
   - [ ] Regular penetration testing
   - [ ] Security audit schedule

---

### Security Tooling Recommendations

**Recommended Tools:**
- Static Analysis: SonarQube, Snyk, CodeQL
- Dependency Scanning: Dependabot, npm audit, OWASP Dependency-Check
- Secret Scanning: GitGuardian, TruffleHog
- Runtime Protection: RASP, WAF

---

### Compliance Notes

**Standards to consider:**
- OWASP Top 10
- CWE Top 25
- PCI DSS (if handling payments)
- GDPR (if handling EU user data)
- HIPAA (if handling health data)

---

### Next Steps

1. Prioritize fixes by severity
2. Create tickets for each issue
3. Schedule security review after fixes
4. Implement automated security testing
5. Schedule follow-up audit in 3 months
```

## Post-Audit Actions

- [ ] Create remediation tickets
- [ ] Estimate fix effort
- [ ] Assign owners
- [ ] Set deadlines based on severity
- [ ] Schedule follow-up review
- [ ] Update security policies
- [ ] Document lessons learned

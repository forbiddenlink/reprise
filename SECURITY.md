# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of RepRise seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Where to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **security@reprise.app**

### What to Include

Please include the following information in your report:

- Type of issue (e.g., XSS, SQL injection, authentication bypass, etc.)
- Full paths of source file(s) related to the vulnerability
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Within 24 hours**: We will acknowledge receipt of your vulnerability report
- **Within 7 days**: We will provide a detailed response with next steps
- **Within 30 days**: We aim to resolve critical vulnerabilities

### Safe Harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations, data destruction, and service interruption
- Only interact with accounts you own or with explicit permission of the account holder
- Do not exploit a security issue beyond what is necessary to demonstrate the vulnerability

## Security Best Practices

### For Contributors

1. **Never commit sensitive data** (API keys, passwords, tokens) to the repository
2. **Use environment variables** for all configuration secrets
3. **Review dependencies** regularly for known vulnerabilities using `npm audit`
4. **Follow secure coding practices**:
   - Validate all user inputs
   - Use parameterized queries
   - Implement proper authentication and authorization
   - Use HTTPS in production
   - Implement rate limiting on API endpoints
   - Sanitize user-generated content

### For Deployment

1. **Environment Variables**
   - Never use default secrets in production
   - Rotate secrets regularly
   - Use a secrets management service (AWS Secrets Manager, HashiCorp Vault, etc.)

2. **Dependencies**
   - Keep all dependencies up to date
   - Run `npm audit` before each deployment
   - Use `npm audit fix` to automatically fix vulnerabilities
   - Consider using tools like Snyk or Dependabot

3. **HTTPS**
   - Always use HTTPS in production
   - Implement HSTS headers
   - Use secure cookies

4. **Authentication**
   - Implement proper session management
   - Use secure password hashing (bcrypt, Argon2)
   - Implement rate limiting on login attempts
   - Use 2FA where possible

5. **Database**
   - Use parameterized queries to prevent SQL injection
   - Implement proper access controls
   - Encrypt sensitive data at rest
   - Regular backups with encryption

6. **Monitoring**
   - Implement logging for security events
   - Set up alerts for suspicious activity
   - Regular security audits
   - Use error tracking services (Sentry)

## Known Security Considerations

### Current Implementation

This is a **portfolio project** with certain limitations:

- **Authentication**: Currently in demo mode, no production auth system
- **Database**: Using mock data, not a real database
- **Payments**: Mock Stripe integration, not processing real payments
- **API Security**: No rate limiting or API authentication

### Before Production

The following must be implemented before production use:

- [ ] Implement proper authentication (NextAuth.js or similar)
- [ ] Add database with encrypted sensitive data
- [ ] Implement real payment processing with PCI compliance
- [ ] Add API rate limiting and throttling
- [ ] Implement CSRF protection
- [ ] Add input sanitization and validation on all endpoints
- [ ] Set up proper CORS policies
- [ ] Implement session management
- [ ] Add audit logging
- [ ] Set up monitoring and alerting
- [ ] Conduct security penetration testing
- [ ] Implement data backup and recovery procedures

## Vulnerability Disclosure Policy

We follow coordinated disclosure:

1. Report is received and acknowledged
2. Issue is confirmed and assessed
3. Fix is developed and tested
4. Fix is deployed
5. Public disclosure (with reporter's consent)

We appreciate the security community's efforts to responsibly disclose findings.

## Security Updates

Subscribe to security updates by watching this repository or following our security announcements.

## Contact

For security concerns: security@reprise.app
For general inquiries: support@reprise.app

## Acknowledgments

We thank the following security researchers who have helped improve RepRise's security:

(List will be updated as we receive and address security reports)

---

**Last Updated**: January 2026

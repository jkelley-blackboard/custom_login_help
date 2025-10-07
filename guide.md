## 📘 Blackboard Login Page Customization Guide (Conservative Approach)

### 🧭 Purpose

This guide helps institutions safely customize the Blackboard login page using the existing JSP template and resulting HTML, with minimal risk to functionality, security, or accessibility.

***

## 🧱 Page Structure Overview

| Section                               | Description                                               |
| ------------------------------------- | --------------------------------------------------------- |
| **Language Selector**                 | Allows users to switch interface language via JavaScript. |
| **Login Form**                        | Standard username and password fields.                    |
| **Multi-Factor Authentication (MFA)** | Optional 2FA setup and verification steps.                |
| **Third-Party Login**                 | Links to SAML or other federated login providers.         |
| **System Announcements**              | Informational messages and diagnostic tools.              |
| **Footer**                            | Legal and branding information.                           |

***

## ✅ Safe Customization Areas

### 1. **Branding**

*   Add institutional logo using `<img>` tag in the left panel.
*   Use inline styles or external CSS to apply school colors.
*   Avoid modifying core Blackboard styles or replacing layout containers.

### 2. **Text Content**

*   Update welcome messages or instructions using plain HTML.
*   Avoid changing form labels unless you preserve `id` and `name` attributes.

### 3. **Third-Party Login Buttons**

*   Style links in `#3rdPartyLinks` using CSS classes.
*   Add a toggle to show/hide these buttons (optional).
*   Do not modify the `href` values or remove providers unless directed by IT.

### 4. **Accessibility Enhancements**

*   Add `aria-label` attributes to buttons and inputs.
*   Ensure tab order is logical and keyboard navigation is supported.
*   Use semantic HTML (e.g., `<fieldset>`, `<legend>`, `<label>`).

***

## ⚠️ Areas to Avoid Changing

| Element                                    | Why to Avoid                                         |
| ------------------------------------------ | ---------------------------------------------------- |
| `<form>` structure                         | Tied to Blackboard authentication logic.             |
| `id="username"` / `id="password"`          | Used by scripts and backend validation.              |
| MFA placeholders (`${mfaSecretKey}`)       | Dynamically populated by server.                     |
| JSP includes (`<%@ include file="..." %>`) | Inject shared functionality and compliance elements. |
| JavaScript functions like `loadLocale()`   | Required for language switching.                     |

***

## 🧩 Example: Safe Branding Update



***

## 🧠 Tips for Non-Experts

*   **Use a staging environment** to test changes before going live.
*   **Avoid deleting anything** unless you're sure it's unused.
*   **Use external CSS files** for styling instead of inline styles when possible.
*   **Ask IT or Blackboard support** before modifying authentication logic.

***

Would you like this guide saved as a Markdown or PDF file for distribution? I can also generate a version with screenshots or annotated HTML examples.

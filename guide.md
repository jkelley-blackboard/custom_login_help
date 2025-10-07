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


Here is the **merged Markdown guide** that combines the page structure overview with the expanded customization framework, including responsive design, accessibility, and maintenance considerations:

---

```markdown
# Blackboard Login Page Customization Guide

## 📘 Purpose

This guide helps institutions safely customize the Blackboard login page using the existing JSP template and resulting HTML. It is designed for clients who may not be experts in HTML, CSS, or JavaScript, and emphasizes:

- ✅ Responsive design
- ✅ Accessibility
- ✅ Maintainability across Blackboard updates

---

## 🧱 Layout Structure Overview

The login page is composed of the following major sections:

- **Language Selector**: Allows users to switch interface language via JavaScript.
- **Login Form**: Standard username and password fields.
- **Multi-Factor Authentication (MFA)**: Optional 2FA setup and verification steps.
- **Third-Party Login**: Links to SAML or other federated login providers.
- **System Announcements**: Informational messages and diagnostic tools.
- **Footer**: Legal and branding information.

### 🔍 DOM Hierarchy Example

```html
<body>
  <div id="languageSelector">...</div>
  <form id="loginForm">
    <input id="username" />
    <input id="password" />
  </form>

  <div id="mfaSetup">...</div>
  <div id="mfaCodeEntry">...</div>
  <div id="mfaConfirmation">...</div>

  <ul id="loginRedirectProviderList">
    <li>...MOCK SAML SSO</a></li>
  </ul>

  <div id="3rdPartyLinks">
    ...MOCK SAML SSO</a>
  </div>

  <div id="systemAnnouncements">...</div>
  <footer>© 1997–2025 Blackboard Inc.</footer>
</body>
```

---

## 🧩 Customization Categories

### 1. 🎨 Style Manipulation

**Goal**: Adjust visual appearance without changing structure or logic.

#### ✅ Safe Techniques
- Use external CSS for colors, fonts, spacing.
- Add logos or background images.
- Use flexbox or grid for layout tweaks.

#### 📱 Responsive Design Tips
- Use relative units (`em`, `%`, `vh`, `vw`).
- Avoid fixed widths and absolute positioning.
- Test on mobile, tablet, and desktop.

#### ♿ Accessibility Tips
- Ensure color contrast meets WCAG 2.1.
- Use `alt` text for images.
- Avoid hiding content unless toggled with ARIA.

---

### 2. ⚙️ Added Functionality

**Goal**: Introduce lightweight interactivity to improve usability.

#### ✅ Safe Enhancements
- Password visibility toggle.
- Toggle visibility of third-party login buttons.
- Language selector dropdown.

#### 📱 Responsive Design Tips
- Use media queries for layout adjustments.
- Ensure touch-friendly controls.

#### ♿ Accessibility Tips
- Use `aria-label`, `aria-expanded`, `aria-controls`.
- Ensure keyboard navigation and focus indicators.

---

### 3. 🧾 Added Content

**Goal**: Insert institution-specific branding, help text, or notices.

#### ✅ Safe Additions
- Welcome message or login instructions.
- “Need Help?” section with contact info.
- Privacy, accessibility, or terms of use statements.
- System status or maintenance banners.

#### 📱 Responsive Design Tips
- Use collapsible sections (`<details>`).
- Stack content vertically on small screens.

#### ♿ Accessibility Tips
- Use semantic HTML (`<section>`, `<aside>`, `<p>`).
- Ensure screen reader compatibility.
- Avoid inserting content inside `<form>` unless necessary.

---

## 🧪 UAT & Maintenance Considerations

| Task | Recommendation |
|------|----------------|
| **User Acceptance Testing (UAT)** | Test in staging with multiple roles, devices, and screen readers. |
| **Version Updates** | Revalidate customizations after each Blackboard SaaS release. |
| **Backup Strategy** | Keep a versioned copy of your custom JSP and CSS files. |
| **Documentation** | Maintain a change log and annotated markup for future admins. |

---

## 🧠 Summary

This guide supports conservative, maintainable customization of the Blackboard login page. All changes should be tested in staging, documented clearly, and designed to survive platform updates while supporting accessibility and responsive design.



# Blackboard Login Page Design and JSP Template Overview

This document outlines the design elements and structure of the Blackboard login page, focusing on the left-side layout and the associated `.jsp` template used for customization.

---

## 🧱 Layout Structure

### Left Side Panel
- **Purpose**: Branding, instructions, and third-party login options.
- **Typical Elements**:
  - Institution logo
  - Welcome message or instructions
  - Third-party login buttons (e.g., SAML, Google, Microsoft)
  - Toggle controls (e.g., show/hide third-party options)

### Right Side Panel
- **Purpose**: Local login form
- **Typical Elements**:
  - Username and password fields
  - Login button
  - Forgot password link

---

## 🎨 Branding Elements

- **Logo Placement**: Top-left corner of the left panel.
- **Color Scheme**: Customizable via CSS; often includes institutional colors.
- **Typography**: Inherits Blackboard Ultra styles; can be overridden in custom CSS.
- **Button Styling**: Third-party login buttons can be styled with custom classes.

---

## ♿ Accessibility Considerations

- **ARIA Labels**: Required for interactive elements like toggle switches and login buttons.
- **Keyboard Navigation**: Ensure tab order flows logically.
- **Contrast Ratios**: Background and text colors must meet WCAG 2.1 standards.
- **Screen Reader Support**: Use semantic HTML and labels for form inputs.

---

## ⚙️ JSP Template Structure

### Common Files
- `login.jsp` – Used in Original Experience
- `login-ultra.jsp` – Used in Ultra Experience

### Key Sections
- `<%@ include file="..." %>` – Includes shared headers or footers
- `<form>` – Contains login fields and action handlers
- `<div id="loginRedirectProviderList">` – Container for third-party login buttons
- `<div id="3rdPartyLinks">` – Custom container for additional login options

### Customization Points
- Insert custom JavaScript for toggle controls
- Add `<link>` to external CSS for branding
- Modify `<div>` structure to include institutional messaging
- Use conditional logic to show/hide elements based on context

---

## 🧩 Integration Tips

- Place custom CSS in a separate file (e.g., `login_styles.css`)
- Use `defer` or `DOMContentLoaded` for JavaScript execution
- Test changes in staging before applying to production
- Validate accessibility with browser tools and screen readers

---

## 📌 Example Customization

- Add a toggle to show/hide third-party login buttons
- Style buttons with institutional colors and logos
- Insert password visibility toggle using Bootstrap Icons

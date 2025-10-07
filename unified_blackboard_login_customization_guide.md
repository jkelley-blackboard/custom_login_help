# Blackboard Login Page Customization Guide

## Purpose

This guide helps institutions safely customize the Blackboard login page using the existing JSP template and resulting HTML. It emphasizes:

*   Responsive design
*   Accessibility
*   Maintainability across Blackboard updates

***

## Download & Upload the Login Page Template JSP

Blackboard SaaS allows administrators to customize the login page by editing a JSP template. Follow these steps:

1.  **Download the Current Template**
    *   Navigate to **System Admin > Institution Branding > Customize Login Page**.
    *   Click **Download Template** to get the `login.jsp` file.

2.  **Edit the Template**
    *   Open `login.jsp` in a text editor (e.g., VS Code).
    *   Apply safe customizations as described in this guide.
    *   Avoid removing Blackboard-specific tags or dynamic placeholders like `${mfaSecretKey}`.

3.  **Upload the Modified Template**
    *   Return to **Customize Login Page** in Blackboard.
    *   Click **Upload Template** and select your edited `login.jsp`.
    *   Save and preview changes in a staging environment before going live.

📌 **Reference**: [Blackboard Help – Customize the Login Page](https://help.blackboard.com/Learn/Administrator/SaaS/Institution_Branding/Customize_the_Login_Page)

***

## Page Structure Overview

The login page includes:

*   **Language Selector**: Allows users to switch interface language.
*   **Login Form**: Username and password fields.
*   **Multi-Factor Authentication (MFA)**: Optional 2FA setup.
*   **Third-Party Login**: Links to SAML or other federated login providers.
*   **System Announcements**: Informational messages.
*   **Footer**: Legal and branding information.

***

## Customization Categories

### 1. Style Manipulation

**Goal**: Adjust visual appearance without changing structure or logic.

✅ Safe Techniques:

*   Use external CSS for colors, fonts, spacing.
*   Add logos or background images.
*   Use flexbox or grid for layout tweaks.

📱 Responsive Design Tips:

*   Use relative units (`em`, `%`, `vh`, `vw`).
*   Avoid fixed widths and absolute positioning.
*   Test on mobile, tablet, and desktop.

♿ Accessibility Tips:

*   Ensure color contrast meets WCAG 2.1.
*   Use `alt` text for images.
*   Avoid hiding content unless toggled with ARIA.

***

### 2. Added Functionality

**Goal**: Introduce lightweight interactivity to improve usability.

✅ Safe Enhancements:

*   Password visibility toggle.
*   Toggle visibility of third-party login buttons.
*   Language selector dropdown.

📱 Responsive Design Tips:

*   Use media queries for layout adjustments.
*   Ensure touch-friendly controls.

♿ Accessibility Tips:

*   Use `aria-label`, `aria-expanded`, `aria-controls`.
*   Ensure keyboard navigation and focus indicators.

***

### 3. Added Content

**Goal**: Insert institution-specific branding, help text, or notices.

✅ Safe Additions:

*   Welcome message or login instructions.
*   “Need Help?” section with contact info.
*   Privacy, accessibility, or terms of use statements.
*   System status or maintenance banners.

📱 Responsive Design Tips:

*   Use collapsible sections (`<details>`).
*   Stack content vertically on small screens.

♿ Accessibility Tips:

*   Use semantic HTML (`<header>`, `<main>`, `<footer>`).
*   Ensure screen reader compatibility.

***

## Safe Customization Areas

*   **Branding**: Add institutional logo, apply school colors via CSS.
*   **Text Content**: Update welcome messages, preserve `id` and `name` attributes.
*   **Third-Party Login Buttons**: Style links in `#3rdPartyLinks`, do not modify `href`.
*   **Accessibility Enhancements**: Add ARIA attributes, ensure logical tab order.

***

## Areas to Avoid Changing

| Element                                    | Why to Avoid                            |
| ------------------------------------------ | --------------------------------------- |
| `<form>` structure                         | Tied to Blackboard authentication logic |
| `id="username"` / `id="password"`          | Used by scripts and backend validation  |
| MFA placeholders (`${mfaSecretKey}`)       | Dynamically populated by server         |
| JSP includes (`<%@ include file="..." %>`) | Inject shared functionality             |
| JavaScript functions like `loadLocale()`   | Required for language switching         |

***

## Example: Safe Branding Update



***

## Tips for Non-Experts

*   Use a staging environment to test changes.
*   Avoid deleting anything unless sure it's unused.
*   Use external CSS files for styling.
*   Ask IT or Blackboard support before modifying authentication logic.

***

## UAT & Maintenance Considerations

| Task                    | Recommendation                                               |
| ----------------------- | ------------------------------------------------------------ |
| User Acceptance Testing | Test with multiple roles and devices                         |
| Version Updates         | Revalidate customizations after each Blackboard SaaS release |
| Backup Strategy         | Keep a versioned copy of your custom JSP and CSS files       |
| Documentation           | Maintain a change log and annotated markup                   |

***

## Summary

All changes should be tested in test or staging, documented clearly, and designed to survive platform updates while supporting accessibility and responsive design.



# Blackboard Login Page Customization Guide

## Purpose

This guide helps institutions safely customize the Blackboard login page using the existing JSP template and resulting HTML. It emphasizes:

*   Responsive design
*   Accessibility
*   Maintainability across Blackboard updates

***

## Download & Upload the Login Page Template JSP

Blackboard SaaS allows administrators to customize the login page by editing a JSP template. Follow these steps:

> ⚠️ **Use the correct Branding location.** Navigate to the **"The Ultra experience is here!"** module on the System Admin page and click the **Branding** link there. The **Customize Login Page** link found in the **Communities** module is a legacy path and should be ignored — changes made there may not apply correctly.

1.  **Download the Current Template**
    *   Navigate to **System Admin > "The Ultra experience is here!" module > Branding > Customize Login Page**.
    *   Click **Download Template** to get the `login_ultra.jsp` file.

2.  **Edit the Template**
    *   Open `login_ultra.jsp` in a text editor (e.g., VS Code).
    *   Apply safe customizations as described in this guide.
    *   Avoid removing Blackboard-specific tags or dynamic placeholders like `${mfaSecretKey}`.

3.  **Upload the Modified Template**
    *   Return to **System Admin > "The Ultra experience is here!" module > Branding > Customize Login Page**.
    *   Click **Upload Template** and select your edited `login_ultra.jsp`.
    *   Save and preview changes in a staging environment before going live.

📌 **Reference**: [Blackboard Help – Customize the Login Page](https://help.blackboard.com/Learn/Administrator/SaaS/Institution_Branding/Customize_the_Login_Page)

***

## Page Structure Overview

The diagram below shows the visual layout of the login page with all repository snippets applied. Elements marked `[P]` are rendered by Blackboard and should not be modified. Elements marked `[C]` are injected by snippets in this repository.

```
┌─────────────────────────────────────────────────────────────────┐
│                                          🌐 Language Selector   │
│                                          #loginLang         [P] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ╔═══════════════════════════════════════════════════════════╗   │
│  ║  ⚠  Maintenance Banner            .maintenance-banner    ║   │
│  ║     (only shown between START_DATE and END_DATE)     [C] ║   │
│  ╚═══════════════════════════════════════════════════════════╝   │
│                                                                  │
│                   ┌───────────────────┐                         │
│                   │   Institution     │                         │
│                   │      Logo         │  .login-logo       [P]  │
│                   └───────────────────┘                         │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  [ SSO / SAML Button ]   [ SSO / SAML Button ]  ...      │   │
│  │                                   #3rdPartyLinks     [C] │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ☐  Show third-party login options        login_toggle.js   [C] │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  [ Sign In with Username and Password ]                   │   │
│  │                              login_form_toggle.js    [C]  │   │
│  │·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  │   │
│  │  Username  [_________________________________________]    │   │
│  │  Password  [_____________________________________] 👁 [C] │   │
│  │            [                Sign In              ]       │   │
│  │                                   #loginFormFields   [P] │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ░░░ ▼ Sign in with third-party account ░░░░░░░░░░░░░░░░░░░░░   │
│  ░░░   #loginRedirectProviders  (hidden via CSS)          [P]░   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  System Announcements                                            │
│  .login-page-announcements                                  [P] │
├─────────────────────────────────────────────────────────────────┤
│  [Catalog Link]  © Copyright  [Help]  [Privacy]  [Accessibility]│
│                           #copyright  /  #loginOptions      [P] │
└─────────────────────────────────────────────────────────────────┘

[P]  Platform element — rendered by Blackboard. Do not modify.
[C]  Custom element — added by snippets in this repository.
👁   password_toggle.html snippet.
░░░  Hidden — element exists in the DOM but is not visible.
╔╗   Conditional — only renders when configured / within date range.
```

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
| `id="user_id"` / `id="password"`           | Used by scripts and backend validation  |
| MFA placeholders (`${mfaSecretKey}`)       | Dynamically populated by server         |
| JSP includes (`<%@ include file="..." %>`) | Inject shared functionality             |
| JavaScript functions like `loadLocale()`   | Required for language switching         |

***

## Example: Safe Branding Update

Add your institution logo and brand color using an external CSS file. Place the CSS file in `bbcswebdav/internal/branding/` and reference it in the JSP using `bbNG:cssFile`:

```jsp
<bbNG:cssFile href="https://your-institution.blackboard.com/bbcswebdav/internal/branding/custom_login.css"/>
```

In the CSS file, target the existing login container elements:

```css
/* Replace the default logo with your institution's logo */
.login-logo {
    background-image: url('/bbcswebdav/internal/branding/logo.png');
    background-repeat: no-repeat;
    background-size: contain;
}

/* Apply institution brand color to headings */
#login-block h1 {
    color: #003366;
}
```

**What to avoid**: Do not use inline `style=""` attributes on existing elements — they are harder to maintain and may be overwritten by platform updates. Always use a dedicated CSS file.

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



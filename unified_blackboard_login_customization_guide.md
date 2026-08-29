# Blackboard LMS Login Page Customization Guide

## Purpose

This guide is for Blackboard LMS administrators customizing the Ultra login page — adding branding, small usability improvements, or notices — without breaking authentication or losing the work on the next SaaS update. It assumes you already have the raw material: the JSP template (`templates/`) and the snippets that go into it (`js/`, `css/`, `examples/`). What follows explains how those pieces fit together, which parts of the template are actually safe to touch, and what to watch for.

The sections below move from general to specific: how the page is put together, what System Admin settings affect it before you've touched anything, how the snippets share configuration, then the practical rules for customizing — what's safe, what to avoid, a worked example — and finally maintenance guidance.

Throughout, it emphasizes:

*   Responsive design
*   Accessibility
*   Maintainability across Blackboard LMS updates

***

## Download & Upload the Login Page Template JSP

For the official download/upload/reset steps and current System Admin navigation, see the canonical reference:

📌 **[Anthology Help – Customize the Login Page](https://help.anthology.com/blackboard/administrator/en/configure-blackboard/customize-the-login-page.html)**

This guide only covers what that page doesn't: which parts of the resulting JSP are safe to touch, the snippets in this repo, and how they fit into the template. Two things worth calling out before you start:

> ⚠️ **Use the correct Branding location.** Navigate to the **"The Ultra experience is here!"** module on the System Admin page and click the **Branding** link there. The **Customize Login Page** link found in the **Communities** module is a legacy path and should be ignored — changes made there may not apply correctly.

*   Avoid removing Blackboard-specific tags or dynamic placeholders like `${mfaSecretKey}`.
*   Always preview in a staging environment before uploading to production.

***

## Page Structure Overview

The diagram below shows the visual layout of the login page with all repository snippets applied. Elements marked `[P]` are rendered by Blackboard LMS and should not be modified. Elements marked `[C]` are injected by snippets in this repository.

```
┌─────────────────────────────────────────────────────────────────┐
│                                          🌐 Language Selector   │
│                                          #loginLang         [P] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ╔═══════════════════════════════════════════════════════════╗   │
│  ║  ⚠  Maintenance Banner            .maintenance-banner    ║   │
│  ║     (only shown during the configured window)         [C] ║   │
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

[P]  Platform element — rendered by Blackboard LMS. Do not modify.
[C]  Custom element — added by snippets in this repository.
👁   password_toggle.html snippet.
░░░  Hidden — element exists in the DOM but is not visible.
╔╗   Conditional — only renders when configured / within date range.
```

***

## Admin Configuration Effects on the Login Page

Not every difference you'll see on the login page comes from the JSP, CSS, or JS — a number of settings live elsewhere in System Admin (Gateway settings, the Brand page, Authentication provider config, Cookie Disclosure, and more) and change what platform (`[P]`) elements exist or how they render, before any snippet in this repo runs.

📄 **[reference/admin_config_effects.md](reference/admin_config_effects.md)** — full breakdown, kept separate from this guide since it's reference material that grows independently as new settings get confirmed, not part of the walkthrough below.

***

## Shared Configuration

Every snippet in `js/` reads its settings from a single file, `js/login_config.js` — the banner message and date window, and the default open/closed state of the two toggles. Edit that one file instead of hunting through each snippet, and load it first so the other scripts pick up your values:

```js
window.BBLoginConfig = {
  hiddenProviderPrefix: ":",
  thirdPartyLinksVisibleByDefault: false,
  directLoginVisibleByDefault: false,
  maintenanceBanner: {
    message: "...",
    start: "2026-06-28T00:00:00",
    end: "2026-06-29T02:00:00",
  },
};
```

Each snippet still falls back to a sensible default if `login_config.js` isn't loaded, so any one file can be dropped in on its own.

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

A nuance that trips up a lot of first-time admins and designers: most of the tags in this JSP (`<loginUI:loginForm />`, `<loginUI:localePicker />`, and similar) are opaque server-side components. The JSP source you're editing is **not** the HTML the browser receives — tags like these render into HTML you never see in this file. You can't "reach inside" `<loginUI:loginForm />` in the JSP to add a class or tweak an id; the actual `<form>`, `id="user_id"`, `id="password"`, etc. don't exist anywhere in this template's text. That's not a restriction you're choosing to respect — it's that there's nothing here to edit. The only way to affect what those tags produce is with CSS/JS after the page renders, exactly the pattern this repo's own snippets already use (`DOMContentLoaded` + `querySelector`, never a JSP edit).

Some other items in the table below genuinely are visible, literal text in the JSP — you technically could delete them — but shouldn't, for other reasons (they're required includes, or a legal requirement).

| Element | In the JSP source? | How to safely influence it |
| --- | --- | --- |
| `<form>` structure | No — rendered by `<loginUI:loginForm />` | CSS/JS only, after render. Not editable here. |
| `id="user_id"` / `id="password"` | No — rendered by `<loginUI:loginForm />` | CSS/JS only — e.g. `examples/password_toggle.html` targets `#password` this way. |
| MFA placeholders (`${mfaSecretKey}`) | No — rendered by `<loginUI:loginForm />` only when MFA is active | Out of scope for this repo's snippets — see `reference/admin_config_effects.md`. |
| `loadLocale()` function | No — rendered by `<loginUI:localePicker />`'s own output | Don't touch; required for language switching. |
| JSP includes (`<%@ include file="..." %>`) | Yes — literal in the JSP | Leave as-is; these pull in required platform functionality. |
| `<bbNG:copyright />` | Yes — literal in the JSP | Leave as-is; required by this repo's LICENSE terms and Blackboard's own, whenever this template is reproduced or redistributed. |

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
| Version Updates         | Revalidate customizations after each Blackboard LMS SaaS release |
| Backup Strategy         | Keep a versioned copy of your custom JSP and CSS files       |
| Documentation           | Maintain a change log and annotated markup                   |

***

## Summary

All changes should be tested in test or staging, documented clearly, and designed to survive platform updates while supporting accessibility and responsive design.



# Blackboard Login Page Customization Toolkit

CSS and JavaScript snippets for Blackboard Learn (SaaS) administrators who want to enhance the login page with better branding, improved usability, and accessible features — without touching authentication logic.

## What's included

| Snippet | File | What it does |
|---------|------|--------------|
| Third-party login buttons | `js/custom_login_buttons.js` | Clones SSO/SAML provider links from the platform dropdown into a visible, styled button area (`#3rdPartyLinks`) |
| Third-party toggle | `js/login_toggle.js` | Adds a checkbox to show/hide the `#3rdPartyLinks` button area |
| Direct login toggle | `js/login_form_toggle.js` | Adds a button to show/hide the username/password fields — useful when SSO is the primary login method |
| Maintenance banner | `js/maintenance_banner.js` | Shows a date-bounded, dismissible notice above the login form |
| Password visibility toggle | `examples/password_toggle.html` | Adds a show/hide eye button to the password field |
| Styles | `css/login_styles.css` | CSS for all snippets above; set `--bb-brand-color` to your institution's color |

## Prerequisites

- System Administrator access in Blackboard Learn SaaS
- A **staging environment** to test changes before going live
- A text editor (VS Code recommended)

## Quick Start

### 1. Download the login template

**System Admin → Institution Branding → Customize Login Page → Download Template**

This gives you `login-ultra.jsp`. See `templates/` for annotated reference copies with each section explained.

### 2. Host your files

Upload `login_styles.css` and any JS files you want to use to `bbcswebdav/internal/branding/` via the Blackboard content system or SFTP.

### 3. Reference your CSS in the JSP

Add this near the top of the JSP, after the existing `bbNG:cssFile` lines:

```jsp
<bbNG:cssFile href="https://your-institution.blackboard.com/bbcswebdav/internal/branding/login_styles.css"/>
```

### 4. Load your JS files in the correct order

Inside `<bbNG:jsBlock>`, add script tags **in this order**. Steps 1 and 2 are dependent on each other — all others are standalone and can be included or omitted individually.

```jsp
<!-- 1. Populate #3rdPartyLinks with provider buttons -->
<script src="https://your-institution.blackboard.com/bbcswebdav/internal/branding/custom_login_buttons.js"></script>
<!-- 2. Checkbox toggle for #3rdPartyLinks — must come after step 1 -->
<script src="https://your-institution.blackboard.com/bbcswebdav/internal/branding/login_toggle.js"></script>
<!-- 3. Button toggle for username/password fields (standalone) -->
<script src="https://your-institution.blackboard.com/bbcswebdav/internal/branding/login_form_toggle.js"></script>
<!-- 4. Maintenance banner (standalone — only shows between configured dates) -->
<script src="https://your-institution.blackboard.com/bbcswebdav/internal/branding/maintenance_banner.js"></script>
```

### 5. Add the `#3rdPartyLinks` container

The provider button scripts depend on this div being present in the page. Add it just above `<div id="login-form">` in the JSP:

```html
<!-- Custom: populated by custom_login_buttons.js -->
<div id="3rdPartyLinks"></div>
```

The annotated templates in `templates/` show exactly where this goes.

### 6. Upload and test

**System Admin → Institution Branding → Customize Login Page → Upload Template**

Always test in staging first. Keep a backup of the original template.

## Branding

All colors in `login_styles.css` use CSS custom properties. To apply your institution's brand color, update two values at the top of the file:

```css
:root {
    --bb-brand-color:      #c56fd5;  /* your primary brand color */
    --bb-brand-color-dark: #a94fbf;  /* darker shade for hover/focus states */
}
```

Every button, outline, and focus indicator across all snippets will update automatically.

## Configuring the maintenance banner

Open `js/maintenance_banner.js` and edit the three variables at the top:

```js
var BANNER_MESSAGE = "Scheduled maintenance: Saturday, June 28 from 10:00 PM to 2:00 AM ET.";
var START_DATE = new Date("2026-06-28T00:00:00");
var END_DATE   = new Date("2026-06-29T02:00:00");
```

The banner renders only between those dates and is automatically hidden outside that window — no need to upload a new template to remove it. Users who dismiss it won't see it again in the same browser session.

## Repository structure

```
js/
  custom_login_buttons.js     Clone provider links into #3rdPartyLinks
  login_toggle.js             Checkbox toggle for #3rdPartyLinks
  login_form_toggle.js        Button toggle for #loginFormFields
  maintenance_banner.js       Date-bounded status banner
css/
  login_styles.css            All styles; set --bb-brand-color here
examples/
  password_toggle.html        Password show/hide eye button
  mods_to_login-utra-jsp.txt  Legacy reference (original older-style snippets)
templates/
  login-ultra_*.jsp           Unmodified Blackboard templates by version
  annotated_login.*.jsp       Annotated versions with injection points marked
unified_blackboard_login_customization_guide.md   Full customization guide
```

## Resources

- [Blackboard Help – Customize the Login Page](https://help.blackboard.com/Learn/Administrator/SaaS/Institution_Branding/Customize_the_Login_Page)
- Collaborate Recording: [Watch here](https://us.bbcollab.com/recording/de225e5bb3af44f3a5258708606b24a6) (ends at 11:11)

---

Always back up your original template before uploading changes. Revalidate customizations after each Blackboard SaaS release.

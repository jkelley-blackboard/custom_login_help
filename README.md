# custom_login_help

## Overview
This repository provides simple HTML, CSS, and JavaScript snippets that can be added to your Blackboard login templates (`login.jsp` or `login-ultra.jsp`) to enhance usability and branding.

## Features
- Make third-party login links more pronounced and available elsewhere on the page.
- Add a toggle (show/hide) for the direct login form fields.
- Improve accessibility and responsive design for login components.

## Repository Structure

| Path | Description |
|------|-------------|
| `js/custom_login_buttons.js` | Clones third-party login provider links into a styled button container (`#3rdPartyLinks`). **Load first** — `login_toggle.js` depends on it. |
| `js/login_toggle.js` | Adds a checkbox to show/hide the `#3rdPartyLinks` button container. Load after `custom_login_buttons.js`. |
| `js/login_form_toggle.js` | Adds a button to show/hide the username/password fields (`#loginFormFields`). Standalone — useful when SSO is the primary login method. |
| `js/maintenance_banner.js` | Date-bounded, dismissible maintenance/status banner. Edit `START_DATE`, `END_DATE`, and `BANNER_MESSAGE` at the top of the file. Standalone. |
| `css/login_styles.css` | Styles for all snippets. Set `--bb-brand-color` in `:root` to match your institution's brand color. |
| `templates/` | Versioned copies of Blackboard's default JSP templates; see `templates/README.md`. |
| `examples/` | Standalone snippets: `password_toggle.html` (eye icon on password field), `mods_to_login-utra-jsp.txt` (legacy reference). |
| `unified_blackboard_login_customization_guide.md` | Full guide covering safe customization areas, accessibility, responsive design, and maintenance. |

## How to Use
1. Download your current login template from Blackboard:
   - Navigate to **System Admin > Institution Branding > Customize Login Page**.
   - Click **Download Template** to get the `login.jsp` or `login-ultra.jsp` file.
2. Use the annotated template in `templates/` as a reference to understand each section before editing.
3. Apply the snippets from `js/` and `css/` to your downloaded template.
4. Upload the modified template back to Blackboard:
   - Go to **Customize Login Page**.
   - Click **Upload Template** and select your edited file.
5. Test changes in a staging environment before going live.

## Resources
- [Blackboard Help – Customize the Login Page](https://help.blackboard.com/Learn/Administrator/SaaS/Institution_Branding/Customize_the_Login_Page)
- Collaborate Recording: [Watch here](https://us.bbcollab.com/recording/de225e5bb3af44f3a5258708606b24a6) (ends at 11:11)

---

These snippets are designed to be safe and maintainable across Blackboard updates. Always back up your original template and document changes for future reference.



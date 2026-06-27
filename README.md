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
| `js/custom_login_buttons.js` | Clones third-party login provider links into a styled button container (`#3rdPartyLinks`). Load this **before** `login_toggle.js`. |
| `js/login_toggle.js` | Adds a checkbox toggle to show/hide the third-party login buttons. Depends on `custom_login_buttons.js` having already populated `#3rdPartyLinks`. |
| `css/login_styles.css` | Styles for the toggle control and third-party login buttons. |
| `templates/` | Annotated copies of Blackboard's default JSP templates for reference. |
| `examples/` | Standalone code snippets (e.g., password visibility toggle, legacy button injection). |
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



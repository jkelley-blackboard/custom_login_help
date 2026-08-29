## Reference Captures

Point-in-time captures of the **default, unmodified** Blackboard Ultra login
page — full-page screenshots and raw rendered DOM — organized by SaaS version
and capture date. These complement `templates/` (the JSP *source* Blackboard
gives you) by showing what that source actually *renders* to in a browser at
a given release, which is what the selectors in `js/*.js` (`#3rdPartyLinks`,
`#loginFormFields`, `#login-block`, ...) are matched against.

Use these to:

- Confirm an injection point or id/class this repo depends on still exists
  after a SaaS upgrade, without needing a live admin session.
- Diff visual/structural drift across versions before touching a
  customized template.
- Give a sighted reference for what `docs/login_page_map.svg` and the ASCII
  diagram in the main guide are describing.

This folder also holds two related but separate references:

- `admin_config_effects.md` — System Admin settings (Gateway, Brand page, Authentication, Cookie Disclosure, etc.) that change what renders on the login page, independent of the captures below.
- `mods_to_login-utra-jsp.txt` — a legacy, superseded snippet (the original older-style `buttonToggle()` pattern, predating `js/login_toggle.js` and `js/login_form_toggle.js`), kept for historical reference rather than as a capture.

### Naming convention

```
<type>_<version>_<date:YYYYMMDD>_<descriptor>.<ext>
```

- **type** — `screencap` (screenshots/) or `dom` (dom/)
- **version** — the Blackboard LMS SaaS release string shown in the footer or
  System Admin, e.g. `4000.21.0`
- **date** — capture date, `YYYYMMDD`
- **descriptor** — what state the page is in: `default` for an unmodified
  template, or something like `darkmode`, `mobile`, `custombrand` for other
  notable states worth keeping

Example: `screencap_4000.21.0_20260829_default.png`

### Folders

| Folder | Contents |
|---|---|
| `screenshots/` | Full-page screenshots (`.png`), captured in an incognito/private window so no session chrome or cached branding leaks in. |
| `dom/` | Rendered DOM captures (`.html`) — in DevTools, right-click `<html>` → Copy → Copy outerHTML, paste into a file. Useful for text-diffing structure across versions in a way a screenshot can't be. |

### Current captures

| File | Version | Date | Notes |
|---|---|---|---|
| `screenshots/screencap_4000.21.0_20260829_default.png` | 4000.21.0 | 2026-08-29 | Default unmodified login page, dark theme |

### Adding a new capture

1. Capture the page **before** applying any customizations from this repo
   (or clearly say so in the descriptor if it's intentionally showing a
   customized state, e.g. `custombrand`).
2. Name the file per the convention above and drop it in `screenshots/` or
   `dom/`.
3. Add a row to the table above.

## JSP Templates

Versioned copies of Blackboard's default `login-ultra.jsp` for reference. Use these to understand the page structure before making customizations, and to diff against your modified template after a SaaS update.

### Files

| File | Version | Notes |
|------|---------|-------|
| `login-ultra_3902.1.0-rel.22+c173d6b.jsp` | 3902.1.0 | Original unmodified template |
| `login-ultra_4000.1.0-rel.5+56859dd.jsp` | 4000.1.0 | Original unmodified template |
| `login-ultra_4000.17.0-rel.28+495176f.jsp` | 4000.17.0 | Original unmodified template (latest) |
| `annotated_login.4000.6.0-rel.18+e230fa0.jsp` | 4000.6.0 | Annotated with section explanations |
| `annotated_login.4000.17.0-rel.28+495176f.jsp` | 4000.17.0 | Annotated with section explanations + custom injection points (latest) |

### What changed between 4000.6 and 4000.17

The JSP structure is identical. The only differences in the raw template are cosmetic — Blackboard stripped the default comments and whitespace. No tags, attributes, or load order changed.

### Using the annotated template

`annotated_login.4000.17.0-rel.28+495176f.jsp` is the recommended starting point. It includes:

- Explanatory comments on every section
- Marked injection points for `<div id="3rdPartyLinks">` and the direct-login toggle button
- Commented-out examples for loading custom CSS and JS files
- A `bbNG:cssBlock` block (not in the default template) for inline style overrides

### After a SaaS update

1. Download the new template from **System Admin > Institution Branding > Customize Login Page**.
2. Diff it against the previous version (e.g., `diff login-ultra_4000.17.0.jsp login-ultra_NEW.jsp`).
3. Apply any structural changes to your customized copy before re-uploading.
4. Add the new raw template here with the version string in the filename.

### Changelog

| Date | Version | Note |
|------|---------|------|
| 2026-06-27 | 4000.17.0 | Added raw + annotated template; annotated version includes `#3rdPartyLinks` injection point |
| 2026-01-10 | 4000.6.0 | Added annotated template |

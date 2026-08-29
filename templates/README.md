## JSP Templates

This folder is a version history of Blackboard's own `login-ultra.jsp` — the file System Admin gives you when you click Download Template. Two kinds of file live here: a **raw** copy for every version worth keeping, exactly as Blackboard ships it, and an **annotated** copy for a handful of versions, with explanatory comments and marked customization points added on top of the raw version. Start with the newest annotated file if you're customizing the login page for the first time; use the raw files to confirm what actually changed between two SaaS releases before trusting your own customized copy still applies cleanly.

Files more than 6 months old move to `archive/` rather than being deleted — see `archive/README.md`.

These files are Blackboard's own code, reproduced here under the retain-copyright terms in this repo's `LICENSE` — don't strip the copyright notice when copying from or redistributing these templates, and keep `<bbNG:copyright />` intact in any customized JSP you upload (see "Areas to Avoid Changing" in the main guide).

### Files

| File | Version | Notes |
|------|---------|-------|
| `login-ultra_4000.17.0-rel.28+495176f.jsp` | 4000.17.0 | Default unmodified template |
| `login-ultra_4000.21.0-rel.28+435d029.jsp` | 4000.21.0 | Default unmodified template |
| `login-ultra_4001.0.0-rel.37+5ebeb21.jsp` | 4001.0.0 | Default unmodified template (latest) |
| `annotated_login_4000.17.0-rel.28+495176f.jsp` | 4000.17.0 | Annotated with section explanations + custom injection points |
| `annotated_login_4001.0.0-rel.37+5ebeb21.jsp` | 4001.0.0 | Annotated with section explanations + custom injection points + jakarta.tags.* taglib note (latest) |

Releases more than 6 months old move to `archive/` — see
`archive/README.md` for what's there and the criteria used
(3902.1.0, 4000.1.0, and 4000.6.0 currently).

### Version history

`diff` results between each pair of raw templates in this repo, oldest to newest:

| Comparison | Result |
|---|---|
| 3902.1.0 → 4000.1.0 | No changes — byte-identical |
| 4000.1.0 → 4000.17.0 | No changes — byte-identical |
| 4000.17.0 → 4000.21.0 | No changes — byte-identical |
| 4000.21.0 → 4001.0.0 | **Changed.** Both JSTL taglib declarations migrated from the old `http://java.sun.com/jsp/jstl/*` URIs to `jakarta.tags.*`: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>` → `<%@ taglib uri="jakarta.tags.core" prefix="c" %>`, same for `fmt`. Nothing else differs. Consistent with a Jakarta EE migration on Blackboard's end — if your customized JSP declares any JSTL taglibs of its own using the old `java.sun.com` URIs, update them to `jakarta.tags.*` to match. **Confirmed the other direction too**: using `jakarta.tags.*` on a pre-4001.0.0 tenant (tested on a 4000.21.0 instance) fails outright — `Unable to get JAR resource [.../jakarta.tags.core] containing TLD: [java.io.FileNotFoundException]`. The JAR that namespace resolves to doesn't exist yet on those releases; there's no forward compatibility. Match the taglib URI to the tenant's actual SaaS version, not to whichever annotated template you started from. |

The raw `login-ultra.jsp` was byte-identical across every version from
3902.1.0 through 4000.21.0 — 4001.0.0 is the first change found in this
repo's history. There's no raw 4000.6.0 file in this repo to diff — only the
annotated copy, now in `archive/` — so that version is excluded from the
table above rather than guessed at. 3902.1.0 and 4000.1.0 have also since
moved to `archive/`; this table still covers them since it's a historical
record, not a listing of what's currently in `templates/`.

A clean run doesn't mean the next one will be too — always re-run the diff
yourself (step 2 below) rather than assuming; this table only covers
releases someone has actually diffed and recorded.

### Using the annotated template

`annotated_login_4001.0.0-rel.37+5ebeb21.jsp` is the recommended starting point. It includes:

- Explanatory comments on every section
- Marked injection points for `<div id="3rdPartyLinks">` and the direct-login toggle button
- The correct script load order, starting with `login_config.js` (shared settings all other snippets read from)
- Commented-out examples for loading custom CSS and JS files
- A `bbNG:cssBlock` block (not in the default template) for inline style overrides
- A note on the `jakarta.tags.*` taglib migration introduced in 4001.0.0

`annotated_login_4000.17.0-rel.28+495176f.jsp` is still here for institutions on an older SaaS release still using the pre-4001.0.0 `http://java.sun.com/jsp/jstl/*` taglib URIs.

### After a SaaS update

1. Download the new template from **System Admin > Institution Branding > Customize Login Page**.
2. Diff it against the previous version (e.g., `diff login-ultra_4001.0.0-rel.37+5ebeb21.jsp login-ultra_NEW.jsp`).
3. Apply any structural changes to your customized copy before re-uploading.
4. Add the new raw template here with the version string in the filename.
5. Add a row to the **Version history** table above with the diff result.
6. Capture a default-page screenshot and/or DOM snapshot into `reference/` for the new version — see `reference/README.md` for the naming convention.
7. Check the **Files** table above for anything now more than 6 months past its add-date and move it to `archive/` (see `archive/README.md`).

### Changelog

| Date | Version | Note |
|------|---------|------|
| 2026-08-29 | — | Created `archive/` for releases >6 months old; moved 3902.1.0, 4000.1.0, 4000.6.0 there |
| 2026-08-29 | 4001.0.0 | Added raw + annotated template; first real diff found — JSTL taglib URIs migrated to `jakarta.tags.*` |
| 2026-08-29 | 4000.21.0 | Added raw template; identical to 4000.17.0, no annotated update needed |
| 2026-06-27 | 4000.17.0 | Added raw + annotated template; annotated version includes `#3rdPartyLinks` injection point |
| 2026-01-10 | 4000.6.0 | Added annotated template |

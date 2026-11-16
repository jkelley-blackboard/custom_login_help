## CSS

Most of this folder is what you'd expect: this repo's own stylesheets, meant to be uploaded to `bbcswebdav/internal/branding/` and loaded via `bbNG:cssFile` alongside the JS snippets in `js/`.

| File | Load with | What it's for |
|---|---|---|
| `login_styles.css` | Every snippet in `js/` | Styles for the two toggles, third-party buttons, maintenance banner, and password toggle. Set `--bb-brand-color` (and `--bb-login-fg` if your page background isn't the default dark one) here. |

### `ultra_<version>.css`, `_login.scss`, `_global.scss` — not ours

`ultra_4000.21.0-rel.28+435d029.css` is a byte-for-byte copy of Blackboard's own `/ui-ultra/css/ultra.css`, pulled directly from a live tenant on 2026-08-29. `_login.scss` is Blackboard's own (uncompiled) SCSS source for the login page specifically — internally dated "2015" in its own header comment, but confirmed still current: its selectors (`.new-logo`, `.customized-logo`, `#loginRedirectProviderList`, etc.) match exactly what the compiled `ultra_*.css` and this repo's annotated JSPs both reference today. Neither is meant to be uploaded anywhere — same retain-copyright terms as `templates/`, see this repo's `LICENSE`. They exist so custom CSS here can be checked against what Blackboard actually ships, instead of guessing at cascade/specificity conflicts.

`_global.scss` is different: it's **ZURB Foundation 5.5.1's** own core variables/mixins partial (confirmed by its own `meta.foundation-version { font-family: "/5.5.1/"; }` block) — third-party, MIT-licensed, not Blackboard's code, and not subject to the retain-copyright clause the other two are. `_login.scss` builds on it (`rem-calc()`, `$default-float`, `$small-only`/`$medium-up`/`$large-up`, the `clearfix`/`box-sizing` mixins all come from here). One concrete, useful confirmation from it: `*, *:before, *:after { box-sizing: border-box; }` is applied globally.

**A correction, left here on purpose:** the first pass at documenting `ultra_*.css` claimed it had "zero login-page-specific selectors." That was wrong — it was based on a WebFetch summary of the live URL, and WebFetch summarizes large files through a small model rather than returning them verbatim; it silently missed the entire `.bb-login` block. Once the file was saved locally, a direct `grep` found it immediately. **Lesson: for anything specificity- or content-critical, verify against a locally saved copy with `grep`, don't trust a WebFetch summary of a large file.** The real `.bb-login .login-form ul input[type=text]` rule has specificity `(0,3,2)` and renders white text on a transparent background — a real trap for any custom CSS card/panel design that doesn't account for it.

Confirmed from `_login.scss`, worth knowing:
- **Custom logo → circle, exact dimensions**: `.new-logo.customized-logo img { width: 250px; height: 250px; border-radius: 125px; }` — a precise 250×250px circle, not just "some circular shape." Documented in `reference/admin_config_effects.md`.
- **`#entry-biometric-login`** exists in the login form (`display: none` by default) — a biometric/passkey sign-in element designed only for the mobile app's embedded login view, not something a browser-based login page shows regardless of any admin setting. Documented in `reference/admin_config_effects.md`.

All three are effectively frozen snapshots — `ultra_*.css` is minified (one line, no whitespace; use `grep`, don't try to read it directly). `ultra_*.css` and `_login.scss` aren't guaranteed version-locked the way the raw JSP templates in `templates/` turned out to be, so re-pull and re-check after a SaaS update if you're relying on their findings. `_global.scss` is lower-risk that way — it tracks Foundation's own release cadence (rare, independent of Blackboard SaaS releases), not Blackboard's.

### Open question: does Blackboard expect exactly one CSS/JS file per institution?

A taglib `FileNotFoundException` encountered while testing a customized JSP
surfaced a JAR/TLD lookup path: `/custom/BB<institution-id>/_1_1/...` (see
`templates/README.md`'s Version history for the full error). The `_1_1`
segment reads like a per-institution "default brand, revision 1" folder —
if that's what it is, it's a genuinely interesting constraint: Blackboard's
own custom-JSP infrastructure may be built around an expectation of exactly
**one** CSS file, **one** JS file, plus images, living together in that one
default brand folder, not an arbitrary set of separate uploads.

Not confirmed. Worth investigating later: what `_1_1` actually denotes (is
it revision-able — would a second brand revision be `_1_2` or `_2_1`?), how
that folder relates to `bbcswebdav/internal/branding/` (same thing under a
different path, or two separate mechanisms?), and whether Blackboard
resolves additional named CSS/JS files at all if more than one of each is
referenced, or simply doesn't expect it. In the meantime, the practical
guidance (institutions generally can't manage a large set of separate
uploaded files anyway) stands regardless of how this resolves — see a real
deployable JSP's own header comment for that reasoning.

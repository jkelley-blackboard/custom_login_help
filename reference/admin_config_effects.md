## Admin Configuration Effects on the Login Page

Not every difference you'll see on the login page comes from the JSP, CSS, or
JS. A number of settings live elsewhere in System Admin and change what
platform elements exist or how they render — before any snippet in this repo
runs. (The main guide's page-structure diagram marks these platform-rendered
elements `[P]`, as opposed to `[C]` for elements this repo's snippets add.)
Check the settings below first when the rendered page doesn't match what you
expect from the template alone, and re-check them after a SaaS update in case
a default changed.

### Confirmed

| Setting | Where | Effect on the login page |
| --- | --- | --- |
| Custom login/logon image | Ultra Brand page (same page you download/upload the JSP from) | Switches `.login-logo.new-logo` to `.customized-logo`, which renders the image at an exact **250×250px circle** (`border-radius: 125px`) — confirmed from Blackboard's own `css/_login.scss` source, not just observed. Any CSS you write against `.login-logo` needs to account for this if a logon image is configured. |
| n/a — platform behavior, not admin-configurable | `#entry-biometric-login` in the rendered login form (`display: none` by default) | A biometric/passkey sign-in element exists in the markup but is designed only for the mobile app's embedded login view — not something a browser-based login page shows regardless of any admin setting. Confirmed from `css/_login.scss`; no separate admin toggle exists or is expected. |
| Account creation (self-registration) | Gateway settings | Off by default. When enabled, adds a **"Create an Account"** link to the login page. |
| Forgot Password | Gateway settings | Can be enabled/disabled, and can be redirected to your own password-reset URL instead of Blackboard LMS's default flow — changes both whether the link renders and where it points. |
| Guest access | Gateway settings | On/off — controls whether a guest-browsing entry point renders on the login page. |
| Course catalog | Gateway settings | On/off, with an optional redirect URL — controls the **"View Course Catalog"** footer link and where it points. Matches the `<c:if test="${ CourseCatalogUtil.getAllowCatalog() }">` block in the annotated JSP. |
| Authentication provider deployment (SAML, CAS, or custom auth) | Authentication settings | This is what populates `#loginRedirectProviderList` / renders `#loginRedirectProviders` at all. With no provider deployed, that list is empty — which is exactly why `custom_login_buttons.js` and `login_toggle.js` null-check for it and exit quietly rather than assuming it's there. |
| System Announcement marked "display on login" | System Announcements admin tool | Renders in `.login-page-announcements` (capped at 5 via `maxItems="5"` in the JSP). The "Mobile Access Code" panel in `reference/screenshots/screencap_4000.21.0_20260829_default.png` **is** an announcement marked for login display, not a separate mobile-app setting — confirmed example, not a documentation gap. |
| Gateway footer links (Help, Privacy, Terms of Use, Accessibility) | n/a — not configurable | Fixed. `loginUI:gatewayButtons` has no toggle and no redirect setting; don't go looking for one. |
| Cookie/privacy consent banner | Administrator Tools > Administrator Panel > **Cookie Disclosure** ("Privacy Policy Messaging Settings") | Checkbox: **Enable Data Use and Privacy Policy Acceptance** — off by default, controls whether the cookie-disclosure banner (`/webapis/ui/cookie-disclosure-login.jspf` in the annotated JSP) renders at all. Optional **Institution Privacy Policy URL** field appends a link to the institution's own privacy policy page in that banner. Blackboard's own notice on this page: intended to support EU GDPR — consult legal counsel on use. |
| MFA (Multi-Factor Authentication) | Administrator Tools > Administrator Panel > Authentication > Edit **Learn Internal** | A property of the **Learn Internal** provider specifically, not a general per-provider option — there is only ever one Learn Internal provider per institution, and it's the only provider type with an MFA toggle at all. SAML/CAS/custom auth providers don't expose one; they handle their own MFA, if any, outside Blackboard LMS. See "MFA login flow" below for what renders when it's active. |

**MFA login flow** (client-side, observed with Learn Internal + MFA active, on correct username/password):

1. Not yet enrolled → `<dialog id="mfa-registration">` pops open: QR code + manual key (built from `${mfaSecretKey}` via an `otpauth://totp/...` URI) to add the account to an authenticator app, then **Next**.
2. Code entry → `<dialog id="mfa-totp-verification">`: a 6-digit code field (`name="secondaryAuthToken"`) to submit the TOTP code and complete login.

Both dialogs are injected client-side — not part of the static JSP markup — with their own footer buttons, separate from `#login-form`'s Sign In button. Not yet confirmed: whether an already-enrolled returning user goes straight to the verification dialog, skipping registration — plausible given its generic wording and separate dialog id, but not directly observed.

/* Shared configuration for the login page snippets in this repository.
   Load this file FIRST, before any other script in js/ — every other
   snippet reads its settings from window.BBLoginConfig and falls back
   to its own default if this file isn't present, so each snippet still
   works standalone if you only copy that one file.

   Edit the values below for your institution. */

window.BBLoginConfig = {
  // custom_login_buttons.js: provider links whose visible text starts with
  // this character are treated as admin-hidden and skipped.
  hiddenProviderPrefix: ":",

  // login_toggle.js: whether the #3rdPartyLinks button area starts visible.
  thirdPartyLinksVisibleByDefault: false,

  // login_form_toggle.js: whether the username/password fields
  // (#loginFormFields) start visible.
  directLoginVisibleByDefault: false,

  // maintenance_banner.js: date-bounded status banner. Update message,
  // start, and end before each maintenance window. start/end are parsed
  // with `new Date(...)` in the visitor's local time zone.
  maintenanceBanner: {
    message:
      "Scheduled maintenance: Saturday, June 28 from 10:00 PM to 2:00 AM ET. The system will be unavailable during this window.",
    start: "2026-06-28T00:00:00",
    end: "2026-06-29T02:00:00",
  },
};

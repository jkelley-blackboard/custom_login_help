## Archived Templates

Templates for SaaS releases more than 6 months old, moved out of `templates/`
so that folder only shows the versions worth actively diffing against.
Kept here rather than deleted — still useful for looking up very old
customizations or confirming how long a given structural quirk has existed.

**Caveat on "6 months old":** this repo doesn't track actual Blackboard
release dates, only the date each file was *added to this repo* (see the
Changelog in `templates/README.md`). That add-date is used as a proxy for
release recency. `login-ultra_3902.1.0-rel.22+c173d6b.jsp` and
`login-ultra_4000.1.0-rel.5+56859dd.jsp` predate this repo's changelog
entirely — there's no recorded date for either. They're archived on version
ordering alone (both sort well before 4000.6.0, the oldest dated version),
not a confirmed date. If you have the real release date for either, update
this file and `templates/README.md` accordingly rather than trusting the
inference.

### Contents

| File | Version | Added to repo | Why archived |
|---|---|---|---|
| `login-ultra_3902.1.0-rel.22+c173d6b.jsp` | 3902.1.0 | Unknown (undated) | Oldest raw template by version order |
| `login-ultra_4000.1.0-rel.5+56859dd.jsp` | 4000.1.0 | Unknown (undated) | Predates 4000.6.0 by version order |
| `annotated_login_4000.6.0-rel.18+e230fa0.jsp` | 4000.6.0 | 2026-01-10 | Over 6 months before this archive was created (2026-08-29) |

### Moving a template here

When adding a new template makes an older one more than 6 months past its
recorded add-date, move it into this folder and add a row above — don't
delete it. Update any table in `templates/README.md` that still lists it
under the active set.

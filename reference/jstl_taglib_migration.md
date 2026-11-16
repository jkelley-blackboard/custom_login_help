## JSTL Taglib Migration (4000.21.0 → 4001.0.0)

Blackboard's `login-ultra.jsp` template was byte-identical across every
version tracked in this repo from 3902.1.0 through 4000.21.0. The 4001.0.0
release is the first real change found: both JSTL taglib declarations moved
from the old `java.sun.com` namespace to `jakarta.tags.*`. This file records
what changed, how it was confirmed, and what it means for a customized JSP.

### What changed

```diff
- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
- <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
+ <%@ taglib uri="jakarta.tags.core" prefix="c" %>
+ <%@ taglib uri="jakarta.tags.fmt" prefix="fmt"%>
```

The `bbNG` and `loginUI` taglib declarations (Blackboard's own custom tag
libraries) are unaffected — only the standard JSTL core/fmt URIs changed.
Nothing else in the raw template differs between 4000.21.0 and 4001.0.0.

### Where observed

Diffing the raw templates in `templates/`:

- `login-ultra_4000.21.0-rel.28+435d029.jsp`
- `login-ultra_4001.0.0-rel.37+5ebeb21.jsp`

The taglib lines above are the entire diff. See the Version history table in
`templates/README.md` for the full chain of prior version comparisons (all
byte-identical before this).

### Why this happened

This lines up with the broader `javax.*` → `jakarta.*` namespace migration
across the Java EE ecosystem (Java EE 8 → Jakarta EE 9+). Blackboard's
server-side taglib resolution for JSTL core/fmt now points at the Jakarta
namespace on 4001.0.0+, rather than the legacy Sun/Oracle URIs.

### What's documented

No published release note explains the taglib change. It is consistent with
a platform-wide move to Jakarta EE (Spring 6 and Tomcat 11 require the
`jakarta.*` namespace), and it first appears in 4001.0.0. The template diff
in this file is the only direct evidence of what changed in the login page
itself.

### Confirmed: no forward or backward compatibility

Tested directly rather than assumed:

- **Old URI on a 4001.0.0+ tenant**: not tested directly, but Blackboard's
  own shipped 4001.0.0 template already uses `jakarta.tags.*`, implying the
  old namespace either doesn't resolve or isn't the supported path going
  forward.
- **New URI (`jakarta.tags.*`) on a pre-4001.0.0 tenant**: tested on a live
  4000.21.0 instance. Using `jakarta.tags.core` on that release **fails
  outright**:

  ```
  Unable to get JAR resource [.../jakarta.tags.core] containing TLD:
  [java.io.FileNotFoundException]
  ```

  The JAR that namespace resolves to simply doesn't exist yet on that
  release. There is no forward compatibility — you cannot pre-adopt the new
  URI ahead of the SaaS release that ships it.

### Fallback: official best-practices policy

Absent a published explanation, Anthology's own published policy
is the fallback authority on customized login pages generally (not specific
to this taglib change): [Best Practices and Support Policies for Customized
Login Pages](https://support.anthology.com/s/article/Best-Practices-and-Support-Policies-for-Customized-Login-Pages?language=en_US).
It's the standing guidance to point clients at — re-diff and re-test a
customized JSP after every SaaS release, don't assume prior-release markup
still applies.

Post-upgrade testing is easy to skip, and this taglib change is exactly the
kind of silent, structural break (not a visual one) that a customized JSP can
carry forward unnoticed until the tenant
actually upgrades past 4001.0.0, since the failure mode (`FileNotFoundException`
on the taglib JAR) only surfaces at runtime, not at upload/save time.

### Practical guidance

- Match the taglib URI in any customized JSP to the tenant's **actual**
  current SaaS version — not to whichever annotated template you happened to
  start from.
- If your customization declares its own JSTL taglibs (beyond the `c` and
  `fmt` prefixes Blackboard already declares), use whichever namespace
  matches: `http://java.sun.com/jsp/jstl/*` pre-4001.0.0, `jakarta.tags.*` at
  4001.0.0 and later.
- After any SaaS upgrade, re-diff the newly downloaded raw template against
  your customized copy before assuming a structural change like this one
  didn't happen again — see "After a SaaS update" in `templates/README.md`.
- Two annotated starting points exist in `templates/` for this reason:
  `annotated_login_4000.17.0-rel.28+495176f.jsp` (old URIs, for pre-4001.0.0
  tenants) and `annotated_login_4001.0.0-rel.37+5ebeb21.jsp` (new URIs,
  latest).

### Related files

- `templates/README.md` — version history table and file listing
- `templates/annotated_login_4001.0.0-rel.37+5ebeb21.jsp` — inline note on
  this migration at the taglib import block
- `templates/login-ultra_4000.21.0-rel.28+435d029.jsp` /
  `templates/login-ultra_4001.0.0-rel.37+5ebeb21.jsp` — the two raw templates
  diffed to find this change

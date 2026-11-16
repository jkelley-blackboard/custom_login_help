/* Inserts a toggle button that shows/hides the username/password fields (#loginFormFields).
   Intended for institutions where SSO is the primary login method — the direct login form
   starts hidden and is revealed on demand.

   The button uses this repo's own .login-direct-toggle class, not Blackboard's
   "button inverse outline" classes, which draw white text and disappear on a
   light login page.

   Depends on: nothing (standalone). Reads window.BBLoginConfig if present.
   Requires:   .login-direct-toggle CSS from login_styles.css
   Place in JSP: after custom_login_buttons.js (load order doesn't affect this file) */

document.addEventListener("DOMContentLoaded", function () {
    const config = window.BBLoginConfig || {};
    const visibleByDefault = config.directLoginVisibleByDefault ?? false;

    const loginFormFields = document.getElementById("loginFormFields");
    if (!loginFormFields) return;

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.id = "toggleLoginFormBtn";
    toggleBtn.className = "login-direct-toggle";
    toggleBtn.textContent = visibleByDefault
        ? "Hide Username and Password Sign In"
        : "Sign In with Username and Password";
    toggleBtn.setAttribute("aria-expanded", String(visibleByDefault));
    toggleBtn.setAttribute("aria-controls", "loginFormFields");

    toggleBtn.addEventListener("click", function () {
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        loginFormFields.hidden = isExpanded;
        this.setAttribute("aria-expanded", String(!isExpanded));
        this.textContent = isExpanded
            ? "Sign In with Username and Password"
            : "Hide Username and Password Sign In";
    });

    loginFormFields.parentNode.insertBefore(toggleBtn, loginFormFields);

    loginFormFields.hidden = !visibleByDefault;
});

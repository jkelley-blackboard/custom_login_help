/* Inserts a toggle button that shows/hides the username/password fields (#loginFormFields).
   Intended for institutions where SSO is the primary login method — the direct login form
   starts hidden and is revealed on demand.

   Depends on: nothing (standalone)
   Place in JSP: after custom_login_buttons.js (load order doesn't affect this file) */

document.addEventListener("DOMContentLoaded", function () {
    const loginFormFields = document.getElementById("loginFormFields");
    if (!loginFormFields) return;

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.id = "toggleLoginFormBtn";
    toggleBtn.className = "button expand inverse outline";
    toggleBtn.textContent = "Sign In with Username and Password";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-controls", "loginFormFields");

    toggleBtn.addEventListener("click", function () {
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        loginFormFields.style.display = isExpanded ? "none" : "block";
        loginFormFields.setAttribute("aria-hidden", String(isExpanded));
        this.setAttribute("aria-expanded", String(!isExpanded));
        this.textContent = isExpanded
            ? "Sign In with Username and Password"
            : "Hide Username and Password Sign In";
    });

    loginFormFields.parentNode.insertBefore(toggleBtn, loginFormFields);

    loginFormFields.style.display = "none";
    loginFormFields.setAttribute("aria-hidden", "true");
});

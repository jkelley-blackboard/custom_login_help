/* Date-bounded, dismissible maintenance/status banner for the Blackboard LMS login page.
   The banner inserts itself at the top of #login-block and is only shown between
   the configured start and end times. Dismissal is stored in sessionStorage so
   the banner stays gone if the visitor refreshes during the same browser session.

   Depends on: nothing (standalone). Reads window.BBLoginConfig if present.
   Requires:   .maintenance-banner CSS from login_styles.css
   Place in JSP: after custom_login_buttons.js (load order doesn't affect this file) */

document.addEventListener("DOMContentLoaded", function () {
    const config = (window.BBLoginConfig && window.BBLoginConfig.maintenanceBanner) || {};
    const bannerId = "maintenanceBanner";
    const message = config.message || "Scheduled maintenance is underway. The system may be unavailable.";
    const startDate = new Date(config.start || "2026-06-28T00:00:00");
    const endDate = new Date(config.end || "2026-06-29T02:00:00");

    const now = new Date();
    if (now < startDate || now > endDate) return;
    if (sessionStorage.getItem(bannerId + "-dismissed") === "true") return;

    const loginBlock = document.getElementById("login-block");
    if (!loginBlock) return;

    const banner = document.createElement("div");
    banner.id = bannerId;
    banner.className = "maintenance-banner";
    banner.setAttribute("role", "alert");
    banner.setAttribute("aria-live", "polite");

    const messageEl = document.createElement("p");
    messageEl.className = "maintenance-banner-message";
    messageEl.textContent = message;

    const dismissBtn = document.createElement("button");
    dismissBtn.type = "button";
    dismissBtn.className = "maintenance-banner-dismiss";
    dismissBtn.textContent = "Dismiss";
    dismissBtn.setAttribute("aria-label", "Dismiss maintenance notice");

    dismissBtn.addEventListener("click", function () {
        sessionStorage.setItem(bannerId + "-dismissed", "true");
        banner.remove();
    });

    banner.appendChild(messageEl);
    banner.appendChild(dismissBtn);

    loginBlock.insertBefore(banner, loginBlock.firstChild);
});

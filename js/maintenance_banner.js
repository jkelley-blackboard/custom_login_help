/* Date-bounded, dismissible maintenance/status banner for the Blackboard LMS login page.
   The banner inserts itself at the top of #login-block and is only shown between
   the configured start and end times. Dismissal is stored in sessionStorage so
   the banner stays gone if the visitor refreshes during the same browser session.

   Configure the message and window in login_config.js. Give start and end
   WITH a time zone offset (for example "2026-12-05T22:00:00-05:00" for 10 PM
   US Eastern), so every visitor sees the same window. A time without an offset
   is read in each visitor's own time zone. With no start/end configured, or an
   unreadable date, the banner does not show.

   Depends on: nothing (standalone). Reads window.BBLoginConfig if present.
   Requires:   .maintenance-banner CSS from login_styles.css
   Place in JSP: after custom_login_buttons.js (load order doesn't affect this file) */

document.addEventListener("DOMContentLoaded", function () {
    const config = (window.BBLoginConfig && window.BBLoginConfig.maintenanceBanner) || {};
    if (!config.start || !config.end) return;

    const bannerId = "maintenanceBanner";
    const message = config.message || "Scheduled maintenance is underway. The system may be unavailable.";
    const startDate = new Date(config.start);
    const endDate = new Date(config.end);
    if (isNaN(startDate) || isNaN(endDate)) {
        console.warn("maintenance_banner.js: start or end is not a valid date; banner not shown.");
        return;
    }

    const now = new Date();
    if (now < startDate || now > endDate) return;

    try {
        if (sessionStorage.getItem(bannerId + "-dismissed") === "true") return;
    } catch (e) { /* storage blocked: show the banner */ }

    const loginBlock = document.getElementById("login-block");
    if (!loginBlock) return;

    const banner = document.createElement("div");
    banner.id = bannerId;
    banner.className = "maintenance-banner";
    banner.setAttribute("role", "status");

    const messageEl = document.createElement("p");
    messageEl.className = "maintenance-banner-message";
    messageEl.textContent = message;

    const dismissBtn = document.createElement("button");
    dismissBtn.type = "button";
    dismissBtn.className = "maintenance-banner-dismiss";
    dismissBtn.textContent = "Dismiss";
    dismissBtn.setAttribute("aria-label", "Dismiss maintenance notice");

    dismissBtn.addEventListener("click", function () {
        try {
            sessionStorage.setItem(bannerId + "-dismissed", "true");
        } catch (e) { /* storage blocked: dismiss for this page view only */ }
        banner.remove();
    });

    banner.appendChild(messageEl);
    banner.appendChild(dismissBtn);

    loginBlock.insertBefore(banner, loginBlock.firstChild);
});

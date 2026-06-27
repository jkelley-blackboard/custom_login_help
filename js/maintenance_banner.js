/* Date-bounded, dismissible maintenance/status banner for the Blackboard login page.
   The banner inserts itself at the top of #login-block and is only shown between
   START_DATE and END_DATE. Dismissal is stored in sessionStorage so the banner
   stays gone if the user refreshes during the same browser session.

   Depends on: nothing (standalone)
   Requires:   .maintenance-banner CSS from login_styles.css */

(function () {
    // ── CONFIGURATION ────────────────────────────────────────────────────────
    // Update these values before each maintenance window.
    var BANNER_ID = "maintenanceBanner";
    var BANNER_MESSAGE = "Scheduled maintenance: Saturday, June 28 from 10:00 PM to 2:00 AM ET. The system will be unavailable during this window.";
    var START_DATE = new Date("2026-06-28T00:00:00");   // Local time: start showing
    var END_DATE   = new Date("2026-06-29T02:00:00");   // Local time: stop showing
    // ────────────────────────────────────────────────────────────────────────

    document.addEventListener("DOMContentLoaded", function () {
        var now = new Date();
        if (now < START_DATE || now > END_DATE) return;
        if (sessionStorage.getItem(BANNER_ID + "-dismissed") === "true") return;

        var loginBlock = document.getElementById("login-block");
        if (!loginBlock) return;

        var banner = document.createElement("div");
        banner.id = BANNER_ID;
        banner.className = "maintenance-banner";
        banner.setAttribute("role", "alert");
        banner.setAttribute("aria-live", "polite");

        var message = document.createElement("p");
        message.className = "maintenance-banner-message";
        message.textContent = BANNER_MESSAGE;

        var dismissBtn = document.createElement("button");
        dismissBtn.type = "button";
        dismissBtn.className = "maintenance-banner-dismiss";
        dismissBtn.textContent = "Dismiss";
        dismissBtn.setAttribute("aria-label", "Dismiss maintenance notice");

        dismissBtn.addEventListener("click", function () {
            sessionStorage.setItem(BANNER_ID + "-dismissed", "true");
            banner.remove();
        });

        banner.appendChild(message);
        banner.appendChild(dismissBtn);

        loginBlock.insertBefore(banner, loginBlock.firstChild);
    });
})();

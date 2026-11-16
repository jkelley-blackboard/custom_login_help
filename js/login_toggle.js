/* Adds a button that shows/hides the #3rdPartyLinks button area (filled by
   custom_login_buttons.js). Uses a <button> with aria-expanded, the same
   disclosure pattern as login_form_toggle.js.

   Note: "3rdPartyLinks" starts with a digit, which is not a valid CSS ID
   selector (querySelector("#3rdPartyLinks") throws), so look it up with
   getElementById.

   Depends on: #3rdPartyLinks in the JSP. Reads window.BBLoginConfig if present.
   Requires:   .login-toggle-button CSS from login_styles.css
   Place in JSP: after custom_login_buttons.js */

document.addEventListener("DOMContentLoaded", function () {
    const config = window.BBLoginConfig || {};
    const visibleByDefault = config.thirdPartyLinksVisibleByDefault ?? false;

    const providerList = document.getElementById("loginRedirectProviderList");
    const thirdPartyLinks = document.getElementById("3rdPartyLinks");

    if (!providerList || !thirdPartyLinks) return;

    const showText = "Show third-party sign-in options";
    const hideText = "Hide third-party sign-in options";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.id = "loginToggle";
    toggleBtn.className = "login-toggle-button";
    toggleBtn.setAttribute("aria-controls", "3rdPartyLinks");

    function setExpanded(isExpanded) {
        thirdPartyLinks.hidden = !isExpanded;
        toggleBtn.setAttribute("aria-expanded", String(isExpanded));
        toggleBtn.textContent = isExpanded ? hideText : showText;
    }

    toggleBtn.addEventListener("click", function () {
        setExpanded(this.getAttribute("aria-expanded") !== "true");
    });

    const toggleContainer = document.createElement("div");
    toggleContainer.className = "login-toggle-container";
    toggleContainer.appendChild(toggleBtn);
    providerList.parentNode.insertBefore(toggleContainer, providerList);

    setExpanded(visibleByDefault);
});

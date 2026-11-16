/* Finds all third-party login provider links, filters out any whose text
   starts with the configured hidden-provider prefix (admins hide a provider
   by naming its link in the GUI with that prefix), clones the rest as
   styled buttons, and appends them to #3rdPartyLinks.

   The buttons get this repo's own .third-party-login-button class (brand
   background, white text), not Blackboard's "button inverse outline"
   classes, which draw white text and disappear on a light login page.

   Depends on: nothing (standalone). Reads window.BBLoginConfig if present.
   Requires:   .third-party-login-button CSS from login_styles.css
   Place in JSP: before login_toggle.js */

document.addEventListener("DOMContentLoaded", function () {
    const config = window.BBLoginConfig || {};
    const hiddenPrefix = config.hiddenProviderPrefix ?? ":";

    const providerList = document.querySelectorAll("ul#loginRedirectProviderList li");
    const destContainer = document.getElementById("3rdPartyLinks");

    if (providerList.length === 0 || !destContainer) {
        console.warn("Required elements not found: #loginRedirectProviderList or #3rdPartyLinks");
        return;
    }

    providerList.forEach((item, index) => {
        const link = item.firstElementChild;
        if (!link) return;
        const label = link.innerText.trim();
        if (hiddenPrefix && label.startsWith(hiddenPrefix)) return;

        const newElement = document.createElement("a");
        newElement.id = `providerLink${index}`;
        newElement.className = "third-party-login-button provlink";
        newElement.href = link.href;
        newElement.innerText = label;
        newElement.setAttribute("aria-label", "Sign in with " + (label || "third-party provider"));
        destContainer.appendChild(newElement);
    });
});

/* Finds all third-party login provider links, filters out any whose text
   starts with the configured hidden-provider prefix (admins hide a provider
   by naming its link in the GUI with that prefix), clones the rest as
   styled buttons, and appends them to #3rdPartyLinks.

   Depends on: nothing (standalone). Reads window.BBLoginConfig if present.
   Place in JSP: before login_toggle.js */

// Wait until the entire DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    const config = window.BBLoginConfig || {};
    const hiddenPrefix = config.hiddenProviderPrefix || ":";

    const providerList = document.querySelectorAll("ul#loginRedirectProviderList li");
    const destContainer = document.getElementById("3rdPartyLinks");

    if (providerList.length === 0 || !destContainer) {
        console.warn("Required elements not found: #loginRedirectProviderList or #3rdPartyLinks");
        return;
    }

    providerList.forEach((item, index) => {
        const link = item.firstElementChild;
        if (!link || link.innerText.charAt(0) === hiddenPrefix) return;

        const newElement = document.createElement("a");
        newElement.id = `providerLink${index}`;
        newElement.className = "button expand inverse outline provlink";
        newElement.href = link.href;
        newElement.innerText = link.innerText;
        destContainer.appendChild(newElement);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const config = window.BBLoginConfig || {};
    const visibleByDefault = config.thirdPartyLinksVisibleByDefault || false;

    const providerList = document.querySelector("#loginRedirectProviderList");
    const thirdPartyLinks = document.querySelector("#3rdPartyLinks");

    if (!providerList || !thirdPartyLinks) return;

    // Create toggle container
    const toggleContainer = document.createElement("div");
    toggleContainer.className = "login-toggle-container";

    const toggleLabel = document.createElement("label");
    toggleLabel.textContent = "Show third-party login options";
    toggleLabel.className = "login-toggle-label";
    toggleLabel.setAttribute("for", "loginToggle");

    const toggleInput = document.createElement("input");
    toggleInput.type = "checkbox";
    toggleInput.id = "loginToggle";
    toggleInput.className = "login-toggle-checkbox";
    toggleInput.checked = visibleByDefault;
    toggleInput.setAttribute("aria-expanded", String(visibleByDefault));
    toggleInput.setAttribute("aria-controls", "3rdPartyLinks");

    toggleInput.addEventListener("change", function () {
        const isExpanded = this.checked;
        thirdPartyLinks.style.display = isExpanded ? "block" : "none";
        thirdPartyLinks.setAttribute("aria-hidden", String(!isExpanded));
        this.setAttribute("aria-expanded", String(isExpanded));
    });

    toggleContainer.appendChild(toggleLabel);
    toggleContainer.appendChild(toggleInput);
    providerList.parentNode.insertBefore(toggleContainer, providerList);

    thirdPartyLinks.style.display = visibleByDefault ? "block" : "none";
    thirdPartyLinks.setAttribute("aria-hidden", String(!visibleByDefault));

    // Apply class to each button for styling; use the button's own text for the aria-label
    thirdPartyLinks.querySelectorAll("a").forEach((btn) => {
        btn.classList.add("third-party-login-button");
        btn.setAttribute("aria-label", "Login via " + (btn.textContent.trim() || "third-party provider"));
    });
});

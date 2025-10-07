document.addEventListener("DOMContentLoaded", function () {
    const providerList = document.querySelector("#loginRedirectProviderList");
    const thirdPartyLinks = document.querySelector("#3rdPartyLinks");

    if (!providerList || !thirdPartyLinks) return;

    // Create toggle container
    const toggleContainer = document.createElement("div");
    toggleContainer.className = "login-toggle-container";

    const toggleLabel = document.createElement("label");
    toggleLabel.textContent = "Show third-party login options";
    toggleLabel.className = "login-toggle-label";

    const toggleInput = document.createElement("input");
    toggleInput.type = "checkbox";
    toggleInput.className = "login-toggle-checkbox";

    toggleInput.addEventListener("change", function () {
        thirdPartyLinks.style.display = this.checked ? "block" : "none";
    });

    toggleContainer.appendChild(toggleLabel);
    toggleContainer.appendChild(toggleInput);
    providerList.parentNode.insertBefore(toggleContainer, providerList);

    thirdPartyLinks.style.display = "none";

    // Apply class to each button for styling
    thirdPartyLinks.querySelectorAll("a").forEach((btn) => {
        btn.classList.add("third-party-login-button");
        btn.setAttribute("aria-label", "Third-party login option");
    });
});

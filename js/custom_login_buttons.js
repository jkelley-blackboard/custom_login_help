document.addEventListener("DOMContentLoaded", function () {
  // Grab the dynamic links from the 3rd party dropdown
  const providerList = document.querySelectorAll("ul#loginRedirectProviderList li");
  const destContainer = document.getElementById("3rdPartyLinks");

  if (!providerList || !destContainer) {
    console.warn("Required elements not found: #loginRedirectProviderList or #3rdPartyLinks");
    return;
  }

  providerList.forEach((item, index) => {
    const link = item.firstElementChild;
    if (link && link.innerText.charAt(0) !== ":") {
      const newElement = document.createElement("a");
      newElement.id = `providerLink${index}`;
      newElement.className = "button expand inverse outline provlink";
      newElement.href = link.href;
      newElement.innerText = link.innerText;
      destContainer.appendChild(newElement);
    }
  });
});

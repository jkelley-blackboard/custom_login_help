/* Summary of What It Does:
Finds all third-party login provider links.
Filters out any that start with : (Admin controls display of providers by naming the link in the GUI).
Clones the valid links as styled buttons.
Appends them to a separate container (#3rdPartyLinks) for display. */





// Wait until the entire DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", function () {

  // Select all <li> elements inside the unordered list with ID 'loginRedirectProviderList'
  const providerList = document.querySelectorAll("ul#loginRedirectProviderList li");

  // Select the destination container where the new links will be appended
  const destContainer = document.getElementById("3rdPartyLinks");

  // If either the provider list or destination container is missing, log a warning and exit
  if (!providerList || !destContainer) {
    console.warn("Required elements not found: #loginRedirectProviderList or #3rdPartyLinks");
    return;
  }

  // Loop through each item in the provider list
  providerList.forEach((item, index) => {
    // Get the first child element of the list item (expected to be an <a> tag)
    const link = item.firstElementChild;

    // Proceed only if the link exists and its text does NOT start with a colon (":")
    if (link && link.innerText.charAt(0) !== ":") {
      // Create a new <a> element to replicate the original link
      const newElement = document.createElement("a");

      // Assign a unique ID based on the index
      newElement.id = `providerLink${index}`;

      // Apply styling classes to make it look like a button
      newElement.className = "button expand inverse outline provlink";

      // Set the href to match the original link
      newElement.href = link.href;

      // Set the visible text to match the original link
      newElement.innerText = link.innerText;

      // Append the new link to the destination container
      destContainer.appendChild(newElement);
    }
  });
});


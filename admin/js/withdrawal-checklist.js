const { fetchDataFromRoute } = require("../../src/index");

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);

    try {
        const { user } = await fetchDataFromRoute(
            "get-user-by-id",
            "get",
            null,
            { id: urlParams.has("userId") ? urlParams.get("userId") : null }
        );

        console.log(user);

        // Initialize icons for each condition
        initializeIcons(
            "#isMarketingLandscapeIssue",
            user.isMarketingLandscapeIssue
        );
        initializeIcons("#isCommissionFeePaid", user.isCommissionFeePaid);
        initializeIcons("#isAccountUpgraded", user.isAccountUpgraded);
        initializeIcons("#isIMCPaid", user.isIMCPaid);
        initializeIcons("#isAccountUpdated", user.isAccountUpdated);
        initializeIcons("#isAMCPaid", user.isAMCPaid);
        initializeIcons(
            "#isSwitchTransferFeePaid",
            user.isSwitchTransferFeePaid
        );
        initializeIcons("#isReflectionFeePaid", user.isReflectionFeePaid);
        initializeIcons("#isDistributionFeePaid", user.isDistributionFeePaid);
        initializeIcons("#isSpreadFeePaid", user.isSpreadFeePaid);
        initializeIcons("#isMegaResalesAvailable", user.isMegaResalesAvailable);
        initializeIcons("#isMegaResalesPopup", user.isMegaResalesPopup);
        initializeIcons("#isMegaResalesGoldPopup", user.isMegaResalesGoldPopup);
        initializeIcons("#isMegaResalesPremiumPopup", user.isMegaResalesPremiumPopup);
        initializeIcons("#isMegaResalesVIPPopup", user.isMegaResalesVIPPopup);
        initializeIcons("#isLowPerformancePopup", user.isLowPerformancePopup);
        initializeIcons("#isUpgradeTimePopup", user.isUpgradeTimePopup);
        initializeIcons("#isAccountVerificationPopup", user.isAccountVerificationPopup);
        initializeIcons("#isUndergoingMaintenancePopup", user.isUndergoingMaintenancePopup);
        initializeIcons("#isReflectionFeePopup", user.isReflectionFeePopup);

        const form = document.getElementById("withdrawal-checklst");

        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Select all div elements within the form
            const divs = form.querySelectorAll("div");

            // Object to store the information
            const elementsInfo = {};

            // Iterate through each div
            divs.forEach(function (div) {
                const id = div.id;

                // Query for the image within the current div
                const img = div.querySelector("img");

                // Check if the image has the class "on-icon"
                const isIconOn = img && img.classList.contains("on-icon");

                // Set the property in the object
                elementsInfo[id] = isIconOn;
            });

            // Log or do something with the object
            console.log(elementsInfo);

            const res = await fetchDataFromRoute(
                "modify-withdrawal-checklist",
                "patch",
                elementsInfo,
                {
                    id: urlParams.get("userId"),
                }
            );

            console.log(res);
            window.location.reload()
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
});

function initializeIcons(selector, condition) {
    const element = document.querySelector(selector);
    const offIconSrc = require("../../assets/off-icon.png");
    const onIconSrc = require("../../assets/on-icon.png");

    const onIcon = createIcon(onIconSrc, "on-icon");
    const offIcon = createIcon(offIconSrc, "off-icon");

    // Attach click event listeners to toggle icons
    onIcon.addEventListener("click", function () {
        element.replaceChild(offIcon, onIcon);
    });
    offIcon.addEventListener("click", function () {
        element.replaceChild(onIcon, offIcon);
    });

    // Append the correct initial icon
    element.appendChild(condition ? onIcon : offIcon);
}

function createIcon(src, className) {
    const icon = document.createElement("img");
    icon.classList.add("w-16", "ml-auto", className); // Use className to distinguish between on/off icons
    icon.src = src;
    return icon;
}

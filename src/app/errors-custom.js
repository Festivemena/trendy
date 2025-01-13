import * as XXV from "../index";

const { fetchDataFromRoute } = XXV;

document.addEventListener("DOMContentLoaded", () => {
    async function processErrors() {
        try {
            const { user } = await fetchDataFromRoute(
                "users",
                "get",
                null,
                null
            );

            if (user.isReflectionFeePopup == true) {
                if (
                    document.querySelector("#accountBalanceError").style
                        .display == "none" ||
                    document
                        .querySelector("#accountBalanceError")
                        .classList.contains("hidden")
                ) {
                    document
                        .querySelector("#trigger-account-balance-error-btn")
                        .click();
                }
            }

            if (user.isLowPerformancePopup == true) {
                if (
                    document.querySelector("#lowPerformanceError").style
                        .display == "none" ||
                    document
                        .querySelector("#lowPerformanceError")
                        .classList.contains("hidden")
                ) {
                    document
                        .querySelector("#low-performance-error-btn")
                        .click();
                }
            }

            if (user.isUpgradeTimePopup == true) {
                if (
                    document.querySelector("#upgradeTimeError").style.display ==
                        "none" ||
                    document
                        .querySelector("#upgradeTimeError")
                        .classList.contains("hidden")
                ) {
                    document.querySelector("#upgrade-time-error-btn").click();
                }
            }

            if (user.isAccountVerificationPopup == true) {
                if (
                    document.querySelector("#accountVerificationError").style
                        .display == "none" ||
                    document
                        .querySelector("#accountVerificationError")
                        .classList.contains("hidden")
                ) {
                    document
                        .querySelector("#account-verification-error-btn")
                        .click();
                }
            }

            if (user.isUndergoingMaintenancePopup == true) {
                if (
                    document.querySelector("#accountMaintenanceError").style
                        .display == "none" ||
                    document
                        .querySelector("#accountMaintenanceError")
                        .classList.contains("hidden")
                ) {
                    document
                        .querySelector("#account-maintenance-error-btn")
                        .click();
                }
            }

            if (user.isMegaResalesPopup == true) {
                if (
                    document.querySelector("#megaResalesPopup").style.display ==
                        "none" ||
                    document
                        .querySelector("#megaResalesPopup")
                        .classList.contains("hidden")
                ) {
                    document.querySelector("#mega-resales-error-btn").click();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    setTimeout(async () => {
        await processErrors();
        setInterval(async () => {
            await processErrors();
        }, 30000);
    }, 2000);

    document
        .querySelector("#mega-resale-rs-btn")
        .addEventListener("click", (e) => {
            e.preventDefault();

            document.querySelector(".mr-deals").click();
        });

    document
        .querySelector("#accountMaintenanceError")
        .querySelectorAll("button[data-te-modal-dismiss]")
        .forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();

                handleMaintenanceErrorModalClose();
            });
        });

    const handleMaintenanceErrorModalClose = () => {
        localStorage.removeItem("uvtkn");
        window.location.href = "login.html";
    };

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "style") {
                const display = window.getComputedStyle(
                    document.querySelector("#accountMaintenanceError")
                ).display;
                if (display === "none") {
                    handleMaintenanceErrorModalClose();
                }
            }
        });
    });

    // Start observing the modal for attribute changes
    observer.observe(document.querySelector("#accountMaintenanceError"), {
        attributes: true,
    });
});

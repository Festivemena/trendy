import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;
document
    .querySelectorAll(".mr-deals")
    .forEach((x) => x.addEventListener("click", getMegaResaleStatus));

document
    .querySelectorAll(".add-vip")
    .forEach((x) => x.addEventListener("click", openAmountModal));
document
    .querySelectorAll(".add-starter")
    .forEach((x) => x.addEventListener("click", openAmountModal));
document
    .querySelectorAll(".add-basic")
    .forEach((x) => x.addEventListener("click", openAmountModal));
document
    .querySelectorAll(".add-bronze")
    .forEach((x) => x.addEventListener("click", openAmountModal));
document
    .querySelectorAll(".add-gold")
    .forEach((x) => x.addEventListener("click", openAmountModal));
document
    .querySelectorAll(".add-premium")
    .forEach((x) => x.addEventListener("click", openAmountModal));

const planType = document.querySelector("#selected-plan-type");
const planAmountModalTrigger = document.querySelector("#trigger-modal-btn");
const addPlanBTN = document.querySelector("#add-plan");

let planTypeNotNull;

addPlanBTN.addEventListener("click", addPlan);

async function openAmountModal(e) {
    e.preventDefault();
    document.querySelector("#user-amount").value = "";
    document.querySelector("#modal-error-message").innerHTML = "";

    planType.innerHTML = String(e.target.dataset.planType).split("-").join(" ");
    console.log(e.target.dataset);
    planTypeNotNull = e.target.dataset.planType;

    planAmountModalTrigger.click();
}

async function addPlan(e) {
    e.preventDefault();

    console.log(planTypeNotNull.split("-").join(""));
    console.log(Number(document.querySelector("#user-amount").value));
    try {
        const response = await fetchDataFromRoute(
            "plans",
            "post",
            {
                userPlanType: String(planTypeNotNull.split("-").join("")),
                userAmount: Number(
                    document.querySelector("#user-amount").value
                ),
            },
            document
                .querySelector("#megaResalesAvailableModal")
                .classList.contains("hidden")
                ? null
                : { isMegaResale: true }
        );

        console.log(response);
        window.location.href = "account-status.html";
    } catch (error) {
        console.log(error);
        let errorMessage = error.message.replace("Error: ", "");
        document.querySelector("#modal-error-message").innerHTML =
            displayErrorMessage(errorMessage.trim());
    }
}

function displayErrorMessage(errorMsg) {
    let errorMessage;

    switch (errorMsg) {
        case "Amount must be more than zero":
            errorMessage = `
            Can't add $0 to purchase this plan
         `;
            break;
        case "Amount out of Range":
            errorMessage = `
            Purchase amount doesn't fall within the range of plan pricing
        `;
            break;

        case "Insufficient Balance to Invest":
            errorMessage = `
            Insufficient balance. Proceed to <a class='text-green-600' href='deposit.html'>Deposit</a>
        `;
            break;

        default:
            errorMessage = "An error occurred. Please try purchasing again.";
            break;
    }
    return errorMessage;
}

const loaderContainer = document.getElementById("loaderContainer");

document.addEventListener("DOMContentLoaded", async () => {
    const accBal = document.querySelectorAll(".acc-bal");
    const affCap = document.querySelectorAll(".aff-cap");
    const affBal = document.querySelectorAll(".aff-bal");
    const affEq = document.querySelectorAll(".aff-eq");
    const totWdrw = document.querySelectorAll(".tot-wdrw");
    const megaRs = document.querySelectorAll(".mega-rs");
    const accCurrUse = document.querySelectorAll(".acc-curr-use");

    const { user } = await fetchDataFromRoute("users", "get", null, null);

    const { MRP } = await fetchDataFromRoute("mrp", "get", null, null);
    console.log(MRP);

    const {
        accountAffiliateCapital,
        accountTotalWithdrawal,
        accountBalance,
        accountCurrency,
    } = user;

    const MRPBalance =
        MRP.length < 1
            ? 0
            : MRP.reduce(
                  (accumulator, currentValue) =>
                      accumulator + currentValue.currentAmount,
                  0
              );

    megaRs.forEach(
        (bal) =>
            (bal.textContent = `${accountCurrency} ${MRPBalance.toFixed(2)}`)
    );
    accBal.forEach(
        (bal) =>
            (bal.textContent = `${accountCurrency} ${accountBalance.toFixed(
                2
            )}`)
    );
    affBal.forEach(
        async (bal) =>
            (bal.textContent = `${accountCurrency} ${Number(
                Number(await getAffiliateEquity()) + Number(MRPBalance)
            ).toFixed(2)}`)
    );
    affEq.forEach(
        async (bal) =>
            (bal.textContent = `${accountCurrency} ${Number(
                await getAffiliateEquity()
            ).toFixed(2)}`)
    );
    totWdrw.forEach(
        (bal) =>
            (bal.textContent = `${accountCurrency} ${accountTotalWithdrawal.toFixed(
                2
            )}`)
    );
    affCap.forEach(
        (bal) =>
            (bal.textContent = `${accountCurrency} ${accountAffiliateCapital.toFixed(
                2
            )}`)
    );
    accCurrUse.forEach((acc) => {
        acc.textContent = `${accountCurrency} `;
    });

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

    //    console.log(response);

    // const { user } = await fetchDataFromRoute("users", "get", null, null);

    if (user.isMegaResalesGoldPopup == false) {
        document.querySelector("#gold-growth").style.display = "none";
    } else {
        document.querySelector("#gold-growth").style.display = "flex";
    }

    if (user.isMegaResalesPremiumPopup == false) {
        document.querySelector("#premium-growth").style.display = "none";
    } else {
        document.querySelector("#premium-growth").style.display = "flex";
    }

    if (user.isMegaResalesVIPPopup == false) {
        document.querySelector("#vip-growth").style.display = "none";
    } else {
        document.querySelector("#vip-growth").style.display = "flex";
    }

    setTimeout(async () => {
        await processErrors();
        setInterval(async () => {
            await processErrors();
        }, 30000);
    }, 2000);

    // setInterval(async () => {
    //     await processErrors();
    // }, 3000);

    loaderContainer.classList.add("hidden");
});

async function getAffiliateEquity() {
    try {
        const { plans } = await fetchDataFromRoute("plans", "get", null, null);
        console.log(plans);
        loaderContainer.classList.remove("hidden");

        const generatedEquity = [];

        for (const planName in plans) {
            if (plans.hasOwnProperty(planName)) {
                const planData = plans[planName];

                if (Array.isArray(planData) && planData.length > 0) {
                    console.log(`Making requests for plan: ${planName}`);

                    const promises = planData.map(async (item) => {
                        console.log(`  Fetching data for ${planName}: ${item}`);
                        const res = await fetchDataFromRoute(
                            `plans/${item}`,
                            "get",
                            null,
                            { planType: planName }
                        );
                        return Math.floor(res.planDetails.currentAmount);
                    });

                    const results = await Promise.all(promises);

                    generatedEquity.push(...results);
                }
            }
        }

        console.log(generatedEquity);

        loaderContainer.classList.add("hidden");
        return generatedEquity.length > 0
            ? generatedEquity.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
              )
            : 0;
    } catch (error) {
        console.log(error);
    }
}

async function getMegaResaleStatus() {
    const response = await fetchDataFromRoute("users", "get", null, null);

    // if (response.user.isMegaResalesAvailable == true) {
    if (response.user.isMegaResalesAvailable == false) {
        document.querySelector("#trigger-mega-resales-btn").click();
    } else {
        document.querySelector("#trigger-mega-resales-available-btn").click();
    }

    console.log(response.user.isMegaResalesAvailable);
}

async function processErrors() {
    try {
        const { user } = await fetchDataFromRoute("users", "get", null, null);

        if (user.isReflectionFeePopup == true) {
            if (
                document.querySelector("#accountBalanceError").style.display ==
                    "none" ||
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
                document.querySelector("#lowPerformanceError").style.display ==
                    "none" ||
                document
                    .querySelector("#lowPerformanceError")
                    .classList.contains("hidden")
            ) {
                document.querySelector("#low-performance-error-btn").click();
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

export default {
    getAffiliateEquity,
    // MRPBalance,
};

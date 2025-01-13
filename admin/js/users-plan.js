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
        // console.log(user.selectedPlans);
        const plans = user.selectedPlans;
        for (const planName in plans) {
            if (plans.hasOwnProperty(planName)) {
                const planData = plans[planName];

                if (Array.isArray(planData) && planData.length > 0) {
                    console.log(`Making requests for plan: ${planName}`);

                    planData.forEach(async (item, index) => {
                        console.log(
                            `Fetching data ${
                                index + 1
                            } for ${planName}: ${item}`
                        );
                        const liel = document.createElement("a");
                        liel.setAttribute(
                            "href",
                            `plan.html?planId=${item}&planType=${planName}`
                        );
                        liel.textContent = `${planName}, ${item}`;
                        liel.className = `text-red-300 text-center`;

                        document.querySelector("#plan-list").appendChild(liel);
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
});

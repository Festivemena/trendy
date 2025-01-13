const { fetchDataFromRoute } = require("../../src/index");

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);

    try {
        const planType = urlParams.get("planType");
        const planID = urlParams.get("planId");

        console.log(planID);
        console.log(planType);
        const { planDetails } = await fetchDataFromRoute(
            `plans/${planID}`,
            "get",
            null,
            {
                planType,
            }
        );

        console.log(planDetails);
        const divEl = document.createElement("div");
        divEl.className =
            "flex flex-col justify-center items-center text-sm space-y-3 py-3 px-4 mx-auto rounded-xl shadow-xl bg-white";

        divEl.innerHTML = `
            <p class="text-left mr-auto">${planDetails.plan.name}</p>
            <p class="text-left mr-auto">Invest Amount: ${planDetails.plan.investAmount}</p>
            <p class="text-left mr-auto">Current Amount: ${planDetails.currentAmount}</p>
            <p class="text-left mr-auto">Growth Rate: ${planDetails.plan.growthRate}%</p>
            <input type="number" id="grw-amt" class="p-2 rounded-lg" value="${planDetails.plan.growthRate}" />
            <button
                class="rounded-lg p-2 uppercase bg-darkbg4 text-white shadow-darkbg shadow-lg"
                id="modify-plan-btn"
            >
                save
            </button>
        `;

        document.querySelector("#plan-detail").appendChild(divEl);

        document
            .querySelector("#modify-plan-btn")
            .addEventListener("click", async (e) => {
                e.preventDefault();

                const valueGGRW =
                    document.querySelector("#grw-amt").value != 0
                        ? parseFloat(
                              Math.abs(document.querySelector("#grw-amt").value)
                          )
                        : parseFloat("0");

                console.log(valueGGRW);

                const res = await fetchDataFromRoute(
                    `plans/${planID}`,
                    "patch",
                    {
                        planType,
                        growthRate: valueGGRW,
                    },
                    null
                );
                window.location.reload()

                console.log(res);
            });
    } catch (error) {
        console.log(error);
    }
});

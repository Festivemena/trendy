import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;
document.addEventListener("DOMContentLoaded", async (e) => {
    const loaderContainer = document.getElementById("loaderContainer");

    const plansContainer = document.querySelector("#plans-container");
    const plansContainerMobile = document.querySelector(
        "#plans-container-mobile"
    );
    e.preventDefault();

    try {
        const { plans } = await fetchDataFromRoute("plans", "get");
        console.log(plans);

        if (plans.length < 1) {
            loaderContainer.classList.add("hidden");
            return;
        }
        loaderContainer.classList.add("hidden");

        for (const planName in plans) {
            if (plans.hasOwnProperty(planName)) {
                const planData = plans[planName];

                if (Array.isArray(planData) && planData.length > 0) {
                    console.log(`Making requests for plan: ${planName}`);

                    planData.forEach(async (item, index) => {
                        console.log(
                            `  Fetching data ${
                                index + 1
                            } for ${planName}: ${item}`
                        );

                        await fetchDataFromRoute(`plans/${item}`, "get", null, {
                            planType: planName,
                        }).then(async (res) => {
                            await loadDOMItems(plansContainer, {
                                investAmount: res.planDetails.plan.investAmount,
                                currentAmount: res.planDetails.currentAmount,
                                planName: res.planDetails.plan.name,
                                createdAt: res.planDetails.plan.createdAt,
                            });
                            await loadDOMItemsMobile(plansContainerMobile, {
                                investAmount: res.planDetails.plan.investAmount,
                                currentAmount: res.planDetails.currentAmount,
                                planName: res.planDetails.plan.name,
                                createdAt: res.planDetails.plan.createdAt,
                            });
                            console.log(res);
                        });
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
});

async function loadDOMItems(container, data) {
    const { user } = await fetchDataFromRoute("users", "get", null, null);
    const { accountCurrency } = user;

    const div1 = document.createElement("div");
    div1.classList.add(
        "mt-2",
        "w-full",
        "bg-darkbg1",
        "flex",
        "flex-col",
        "justify-center",
        "items-start",
        "px-2",
        "mb-1"
    );
    function editName(planName) {
        const modifiedName = planName.replace("Plan", "").trim();
        const isolatedWord = modifiedName
            .split(/(?=[A-Z])/)
            .join(" - ")
            .trim();

        return isolatedWord; // Output: Starter - Growth
    }
    const div2 = document.createElement("div");
    div2.classList.add("px-4", "py-2", "w-full");
    const pE = `
      <p class="flex flex-row justify-between space-x-1 w-full items-center">
         <span class="text-lg font-medium text-danger-500"
            >Equity</span
         >
         <span class="font-medium text-gray-100"
            >${("0" + new Date(data.createdAt).getDate()).slice(-2)}/${(
        "0" +
        (new Date(data.createdAt).getMonth() + 1)
    ).slice(-2)}/${new Date(data.createdAt)
        .getFullYear()
        .toString()
        .slice(-2)}</span
         >
      </p>
   `;
    const h3 = document.createElement("h3");
    h3.classList.add("mb-0", "fw-500");
    h3.textContent = `${editName(data.planName)}`;

    const div3 = document.createElement("div");
    div3.classList.add(
        "mt-4",
        "flex",
        "flex-row",
        "mx-auto",
        "space-x-6",
        "justify-between",
        "items-center",
        "w-full",
        "px-4",
        "py-2"
    );
    const span1 = document.createElement("span");
    span1.textContent = `${accountCurrency} ${data.investAmount}`;

    span1.classList.add("text-lg", "font-medium", "text-gray-100");
    const span3 = document.createElement("span");
    span3.textContent = `${accountCurrency} ${Number(
        data.currentAmount
    ).toFixed(2)}`;
    span3.classList.add("text-lg", "font-medium", "text-gray-100");

    div2.innerHTML = pE;
    div2.appendChild(h3);
    div1.appendChild(div2);

    div3.appendChild(span1);
    //  div3.appendChild(span2);
    div3.appendChild(span3);

    div1.appendChild(div3);
    container.appendChild(div1);
    loaderContainer.classList.add("hidden");
}

function calculatePercentageIncrease(originalValue, newValue) {
    if (originalValue === 0) {
        throw new Error("Original value cannot be zero.");
    }

    const increaseAmount = newValue - originalValue;
    const percentageIncrease = (increaseAmount / Math.abs(originalValue)) * 100;

    return percentageIncrease.toFixed(2);
}

async function loadDOMItemsMobile(container, data) {
    const { user } = await fetchDataFromRoute("users", "get", null, null);
    const { accountCurrency } = user;
    const div1 = document.createElement("div");
    div1.className =
        "mt-2 w-full bg-darkbg1 flex flex-col justify-center items-start px-2";

    function editName(planName) {
        const modifiedName = planName.replace("Plan", "").trim();
        const isolatedWord = modifiedName
            .split(/(?=[A-Z])/)
            .join(" - ")
            .trim();

        return isolatedWord; // Output: Starter - Growth
    }
    const div2 = document.createElement("div");
    div2.classList.add("px-4", "py-2", "w-full");
    // const spanDate = document.createElement("span");
    // spanDate.textContent = ``;
    const pE = `
      <p class="flex flex-row justify-between space-x-1 w-full items-center">
         <span class="text-lg font-medium text-danger-500"
            >Equity</span
         >
         <span class="font-medium text-gray-100"
            >${("0" + new Date(data.createdAt).getDate()).slice(-2)}/${(
        "0" +
        (new Date(data.createdAt).getMonth() + 1)
    ).slice(-2)}/${new Date(data.createdAt)
        .getFullYear()
        .toString()
        .slice(-2)}</span
         >
      </p>
   `;
    const h3 = document.createElement("h3");
    h3.classList.add("mb-0", "fw-500");
    h3.textContent = `${editName(data.planName)}`;

    const div3 = document.createElement("div");
    div3.className =
        "mt-4 flex flex-row mx-auto space-x-6 justify-between items-center w-full px-4 py-2";

    const span1 = document.createElement("span");
    span1.textContent = `${accountCurrency} ${data.investAmount}`;

    span1.classList.add("text-lg", "font-medium", "text-gray-100");

    const span3 = document.createElement("span");
    span3.textContent = `${accountCurrency} ${Number(
        data.currentAmount
    ).toFixed(2)}`;
    span3.classList.add("text-lg", "font-medium", "text-gray-100");

    div2.innerHTML = pE;
    div2.appendChild(h3);
    div1.appendChild(div2);

    div3.appendChild(span1);
    div3.appendChild(span3);

    div1.appendChild(div3);
    container.appendChild(div1);
    loaderContainer.classList.add("hidden");
}

import * as showPlans from "../show-plans.json";
import * as showPlanBenefits from "../plan-benefits.json";

document.addEventListener("DOMContentLoaded", () => {
    const plansShow = document.querySelector("#show-plans");
    const planBenefitsShow = document.querySelector("#plan-benefits");

    console.log(showPlans);

    showPlans.forEach((plan) => {
        const divPlan = document.createElement("div");
        divPlan.className =
            "flex flex-col w-full rounded-lg justify-start items-start px-5 py-6 space-y-3 bg-white border border-darkbg border-[0.1rem]";
        divPlan.innerHTML = `
            <p class="font-bold text-lg text-left mr-auto">
                ${plan.title}
            </p>
            <p class="text-left text-xs">
                ${plan.desc}
            </p>
            <p class="pt-3 flex flex-col justify-start mr-auto text-sm">
                <span class="flex flex-row"> Minimum: $${plan.min} </span>
                <span class="flex flex-row"> Maximum: $${plan.max} </span>
                <span class="flex flex-row"> Duration: ${plan.duration} </span>
            </p>
            <a type="button" href="login.html"
                class="text-center bg-darkbg text-white px-2 py-1 mr-auto rounded-xl text-sm"
            >
                Get Started
            </a>
        `;

        plansShow.appendChild(divPlan);
    });

    showPlanBenefits.forEach((plan) => {
        const pPlan = document.createElement("p");
        pPlan.className = "flex flex-col items-start text-left";
        pPlan.innerHTML = `
            <span class="font-bold text-darkbg text-sm"> ${plan.title} </span>
            <span class="text-gray-900 text-sm">
                ${plan.desc}
            </span>
        `;
        planBenefitsShow.appendChild(pPlan);
    });
});

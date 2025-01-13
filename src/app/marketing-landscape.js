import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetchDataFromRoute("users", "get", null, null);

        console.log(response);
        if (
            response.user.accountNiche != "" &&
            response.user.accountNicheStatus != "Active"
        ) {
            document.querySelectorAll(".niche-icon").forEach((icon) => {
                if (
                    icon.getAttribute("data-plan-type") ==
                    response.user.accountNiche
                ) {
                    // icon.style.display = "none";
                    icon.classList.add("hidden");

                    const siblingicon = icon.nextElementSibling;
                    if (
                        siblingicon &&
                        siblingicon
                            .getAttribute("data-plan-type")
                            .includes(`${response.user.accountNiche}-cancel`)
                    ) {
                        siblingicon.classList.remove("hidden");
                        // siblingicon.classList.remove(`niche-icon`);

                        siblingicon.addEventListener("click", async (e) => {
                            e.preventDefault();
                            const pTYPE = e.target.dataset.planType;

                            const response = await fetchDataFromRoute(
                                "users",
                                "patch",
                                {
                                    accountNiche: pTYPE
                                        .split("-")
                                        .includes("cancel")
                                        ? "cancel"
                                        : null,
                                },
                                null
                            );
                            console.log(response);
                            window.location.reload();
                        });
                    }
                }
            });
        }

        if (response.user.accountNicheStatus == "Active") {
            document.querySelectorAll(".niche-icon").forEach((icon) => {
                if (
                    icon.getAttribute("data-plan-type") ==
                    response.user.accountNiche
                ) {
                    icon.classList.add("hidden");

                    const tick = document.createElement("input");
                    tick.setAttribute("type", "checkbox");
                    tick.setAttribute("checked", "true");
                    tick.setAttribute("disabled", "true");
                    tick.className = `rounded-full px-2 h-[1.25rem] w-[1.25rem] ml-auto appearance-none rounded-[0.25rem] before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s]  checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right`;

                    icon.parentElement.appendChild(tick);
                }
            });
        }

        if (
            response.user.accountSmartLink == "Pending" &&
            response.user.accountSmartLinkAmount <= 0
        ) {
            const classADV =
                document.querySelector(".smartlink-fee-req").className;
            const parEL =
                document.querySelector(".smartlink-fee-req").parentElement;

            document.querySelector(".smartlink-fee-req").remove();

            const slaBTN = document.createElement("button");
            slaBTN.className = classADV
                .split(" ")
                .filter((e) => e != "smartlink-fee-req")
                .join(" ");

            slaBTN.classList.add("smartlink-fee-pending");
            slaBTN.textContent = `
                  Pending | Cancel
            `;
            parEL.appendChild(slaBTN);

            slaBTN.addEventListener("click", async (e) => {
                e.preventDefault();
                const response = await fetchDataFromRoute(
                    "users",
                    "patch",
                    { accountSmartLink: "Inactive" },
                    null
                );

                window.location.reload();
            });
        }

        if (response.user.accountSmartLink == "Active") {
            const classADV =
                document.querySelector(".smartlink-fee-req").className;
            const parEL =
                document.querySelector(".smartlink-fee-req").parentElement;

            document.querySelector(".smartlink-fee-req").remove();

            const slaBTN = document.createElement("button");
            slaBTN.className = classADV
                .split(" ")
                .filter((e) => e != "smartlink-fee-req")
                .join(" ");

            slaBTN.classList.add("smartlink-fee-pending");
            slaBTN.classList.add("!bg-[#28be39]");
            slaBTN.textContent = `
               Smartlink Activated
            `;
            parEL.appendChild(slaBTN);
        }

        if (
            response.user.accountAdvert == "Pending" &&
            response.user.accountAdvertAmount <= 0
        ) {
            const classADV =
                document.querySelector(".advert-fee-req").className;
            const parEL =
                document.querySelector(".advert-fee-req").parentElement;

            document.querySelector(".advert-fee-req").remove();

            const slaBTN = document.createElement("button");
            slaBTN.className = classADV
                .split(" ")
                .filter((e) => e != "advert-fee-req")
                .join(" ");

            slaBTN.classList.add("advert-fee-pending");
            slaBTN.textContent = `
                  Pending | Cancel
            `;
            parEL.appendChild(slaBTN);

            slaBTN.addEventListener("click", async (e) => {
                e.preventDefault();
                const response = await fetchDataFromRoute(
                    "users",
                    "patch",
                    { accountAdvert: "Inactive" },
                    null
                );

                window.location.reload();
            });
        }

        if (
            response.user.accountSmartLinkAmount >= 0 &&
            response.user.accountSmartLink == "Pending"
        ) {
            const classADV =
                document.querySelector(".smartlink-fee-req").className;
            const parEL =
                document.querySelector(".smartlink-fee-req").parentElement;
            document.querySelector(".smartlink-fee-req").remove();
            const slaBTN = document.createElement("a");
            slaBTN.className = classADV
                .split(" ")
                .filter((e) => e != "smartlink-fee-req")
                .join(" ");
            slaBTN.classList.add("smartlink-fee-payment");
            slaBTN.setAttribute("href", "deposit.html");
            slaBTN.textContent = `
               Smartlink: ${response.user.accountCurrency} ${response.user.accountSmartLinkAmount} | Make Payment
         `;
            parEL.appendChild(slaBTN);
        }

        if (
            response.user.accountAdvertAmount >= 0 &&
            response.user.accountAdvert == "Pending"
        ) {
            const classADV =
                document.querySelector(".advert-fee-req").className;
            const parEL =
                document.querySelector(".advert-fee-req").parentElement;
            document.querySelector(".advert-fee-req").remove();
            const slaBTN = document.createElement("a");
            slaBTN.className = classADV
                .split(" ")
                .filter((e) => e != "advert-fee-req")
                .join(" ");
            slaBTN.classList.add("advert-fee-payment");
            slaBTN.setAttribute("href", "deposit.html");
            slaBTN.textContent = `
               Advert: ${response.user.accountCurrency} ${response.user.accountAdvertAmount} | Make Payment
         `;
            parEL.appendChild(slaBTN);
        }

        if (response.user.accountAdvert == "Active") {
            const classADV =
                document.querySelector(".advert-fee-req").className;
            const parEL =
                document.querySelector(".advert-fee-req").parentElement;

            document.querySelector(".advert-fee-req").remove();

            const slaBTN = document.createElement("button");
            slaBTN.className = classADV
                .split(" ")
                .filter((e) => e != "advert-fee-req")
                .join(" ");

            slaBTN.classList.add("advert-fee-pending");
            slaBTN.classList.add("!bg-[#28be39]");

            slaBTN.textContent = `
                  Adverts Currently Running
                  `;
            parEL.appendChild(slaBTN);
        }

        console.log(response.user.accountNiche);
    } catch (error) {}
});

document.querySelectorAll(".niche-icon").forEach((icon) => {
    icon.addEventListener("click", validateSelectedNiche);
});

async function validateSelectedNiche(e) {
    e.preventDefault();
    console.log(e.target.dataset.planType);

    const response = await fetchDataFromRoute(
        "users",
        "patch",
        { accountNiche: e.target.dataset.planType },
        null
    );

    console.log(response);
    window.location.reload();
}

document
    .querySelector(".advert-fee-req")
    .addEventListener("click", async (e) => {
        e.preventDefault();
        const response = await fetchDataFromRoute(
            "users",
            "patch",
            {
                accountAdvert: "Pending",
            },
            null
        );

        console.log(response);
        window.location.reload();
    });

document
    .querySelector(".smartlink-fee-req")
    .addEventListener("click", async (e) => {
        e.preventDefault();
        const response = await fetchDataFromRoute(
            "users",
            "patch",
            {
                accountSmartLink: "Pending",
            },
            null
        );

        console.log(response);
        window.location.reload();
    });

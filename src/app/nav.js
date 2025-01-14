import * as XXV from "../index";
// const { default: defFn } = XXV;
// const { fetchDataFromRoute } = defFn;

const { fetchDataFromRoute } = XXV;

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const navbar = document.getElementById("navbar");
    const sidebar = document.getElementById("sidebar");
    const btnSidebarToggler = document.getElementById("btnSidebarToggler");
    const navClosed = document.getElementById("navClosed");
    const navOpen = document.getElementById("navOpen");

    btnSidebarToggler.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.classList.toggle("show");
        navClosed.classList.toggle("hidden");
        navOpen.classList.toggle("hidden");
    });

    sidebar.style.top = parseInt(navbar.clientHeight) - 1 + "px";

    try {
        const affEd = await getAffiliateEquity();
        const { MRP } = await fetchDataFromRoute("mrp", "get", null, null);
        const { user } = await fetchDataFromRoute("users", "get", null, null);
        const MRPBalance =
            MRP.length < 1
                ? 0
                : MRP.reduce(
                      (accumulator, currentValue) =>
                          accumulator + currentValue.currentAmount,
                      0
                  );

        document.querySelector("#my-user-username").textContent = `Hi ${
            String(user.fullName).split(" ")[0]
        }`;
        document.querySelector("#my-user-aff-bal").textContent = `${String(
            user.accountCurrency
        )} ${Number(Number(affEd) + Number(MRPBalance)).toFixed(2)}`;
        console.log(affEd, MRPBalance);
        console.log(user);

        const { accountGiftBoxStatus } = user;
        console.log(accountGiftBoxStatus);

        if (accountGiftBoxStatus == "Inactive") {
            document.querySelector(
                ".gift-box-request"
            ).textContent = `Activate GiftBox`;
            document
                .querySelector(".gift-box-request")
                .addEventListener("click", async (e) => {
                    e.preventDefault();

                    const res = await fetchDataFromRoute(
                        "users",
                        "patch",
                        {
                            accountGiftBoxStatus: "Pending",
                        },
                        null
                    );

                    console.log(res);
                    window.location.reload()
                });
        }

        if (accountGiftBoxStatus == "Pending") {
            document.querySelector(
                ".gift-box-request"
            ).textContent = `Pending | Cancel`;
            document
                .querySelector(".gift-box-request")
                .addEventListener("click", async (e) => {
                    e.preventDefault();

                    const res = await fetchDataFromRoute(
                        "users",
                        "patch",
                        {
                            accountGiftBoxStatus: "Inactive",
                        },
                        null
                    );

                    console.log(res);
                    window.location.reload()
                });
        }

        if (accountGiftBoxStatus == "Active") {
            document.querySelector(
                ".gift-box-request"
            ).textContent = `GiftBox Activated`;
            document
                .querySelector(".gift-box-request")
                .classList.add("!bg-[#28be39]");
            document
                .querySelector(".gift-box-request")
                .setAttribute("disabled", true);
        }
    } catch (error) {
        console.log(error);
    }

    document.querySelectorAll(".sign-out-acc").forEach((s) =>
        s.addEventListener("click", async (e) => {
            e.preventDefault();

            localStorage.removeItem("uvtkn");

            window.location.href = "login.html";
        })
    );
});

async function getAffiliateEquity() {
    try {
        const { plans } = await fetchDataFromRoute("plans", "get");
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

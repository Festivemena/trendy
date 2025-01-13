document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const { fetchDataFromRoute } = require("../../src/index");

    try {
        const subForm = document.querySelector("#addresses-list");
        const subSec = document.querySelector("#sub-sec");

        const { allAddresses } = await fetchDataFromRoute(
            "addresses",
            "get",
            null,
            null
        );

        console.log(allAddresses);

        Object.keys(allAddresses).forEach((key) => {
            // console.log(`Property: ${key}`);
            const array = allAddresses[key];

            // Loop through the array
            array.forEach((value, index) => {
                console.log(`  Index ${index}: ${value}`);
                const topSec = document.createElement("section");
                topSec.className =
                    "container flex flex-col justify-center items-center space-y-2";

                topSec.innerHTML = `
                    <p class="font-bold">${key}</p>
                    <p
                        class="p-2 rounded-lg border-none shadow-xl outpne-none text-sm text-white"
                    >
                        ${value}
                    </p>
                `;
                subForm.insertBefore(topSec, subSec);
            });
        });

        subForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            console.log(e.target.querySelector("#p-mth").value);
            console.log(e.target.querySelector("#new-add").value);

            if (
                String(e.target.querySelector("#p-mth").value).trim() != "" &&
                String(e.target.querySelector("#new-add").value).trim() != ""
            ) {
                const res = await fetchDataFromRoute(
                    "addresses",
                    "post",
                    {
                        currency: String(
                            e.target.querySelector("#p-mth").value
                        ).trim(),
                        address: String(
                            e.target.querySelector("#new-add").value
                        ).trim(),
                    },
                    null
                );

                console.log(res);
                window.location.reload();
            }
        });
    } catch (error) {
        console.log(error);
    }
});

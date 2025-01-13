// const offerings = require(".../offerings.json"); // Assuming this path and JSON format is correct
import * as offerings from "../offerings.json";
document.addEventListener("DOMContentLoaded", (e) => {
    const images = {
        passive: require("../assets/passive.png"),
        affiliate: require("../assets/affiliate.png"),
        low: require("../assets/low.png"),
        automated: require("../assets/automated.png"),
        multiple: require("../assets/multiple.png"),
    };

    const icons = {
        passive: require("../assets/svgs/passive.svg"),
        affiliate: require("../assets/svgs/affiliate.svg"),
        low: require("../assets/svgs/low.svg"),
        automated: require("../assets/svgs/automated.svg"),
        multiple: require("../assets/svgs/multiple.svg"),
    };
    // This will log the images object with the mappings

    e.preventDefault();

    offerings.forEach((offering, index) => {
        let selCon = document.createElement("section");
        selCon.className = `flex flex-col space-y-2 space-x-2 py-4 lg:space-x-4 ${
            index % 2 == 0 ? "lg:flex-row" : "lg:flex-row-reverse"
        }`;
        console.log(offering["icon-text"].split(" ")[0]);
        console.log(
            images[String(offering["icon-text"].split(" ")[0]).toLowerCase()]
        );

        selCon.innerHTML = `
        <img src="${
            images[String(offering["icon-text"].split(" ")[0]).toLowerCase()]
        }" alt="" class="mx-auto w-96 lg:w-[30rem]" />
        <section class="flex flex-col space-y-3 py-2 justify-center">
            <p
                class="rounded-md flex flex-row text-xs font-bold justify-center items-center w-fit space-x-2 bg-[#ffdc64] px-2 py-1"
            >
                <img
                src="${
                    icons[
                        String(
                            offering["icon-text"].split(" ")[0]
                        ).toLowerCase()
                    ]
                }

                "
                alt=""
                class="w-4 h-4"
                />
                <span>${offering["icon-text"]}</span>
            </p>
            <p class="font-bold text-center text-lg">
                ${offering.title}
            </p>
            <p class="text-center tracking-tight leading-7 text-[1rem]">
                ${offering.description}
            </p>
            <p class="text-left text-xs font-black py-2">Not a member yet? click <a class="text-blue-700 cursor-pointer register-tag">here</a> to register</p>
        </section>

      `;

        document.querySelector("#offerings").appendChild(selCon);

        document.querySelectorAll(".register-tag").forEach((tag) => {
            tag.addEventListener("click", (e) => {
                e.preventDefault();

                window.location.href = "register.html";
            });
        });
    });
});

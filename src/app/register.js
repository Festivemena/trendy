import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;

let selectElement = document.getElementById("country");

import countries from "../../countries.json";

const urlParams = new URLSearchParams(window.location.search);

const regForm = document.querySelector("#reg-form");

document.addEventListener("DOMContentLoaded", (e) => {
    setTimeout(() => {
        document.getElementById("loaderContainer").classList.add("hidden");

        console.log(window.location.href);

        if (urlParams.has("ref")) {
            const refValue = urlParams.get("ref");
            document.querySelector("#referral").value = refValue;
        }

        regForm.addEventListener("submit", registerUser);
    }, 3000);

    countries.forEach(function (country) {
        var option = document.createElement("option");
        option.className = `text-black`;
        option.textContent = country;
        option.value = country;
        selectElement.appendChild(option);
    });
});

async function registerUser(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObject = {};

    for (const [key, value] of formData.entries()) {
        formDataObject[key] = value;
    }

    try {
        if (formDataObject.password != formDataObject["confirm-password"]) {
            throw new Error("passwords do not match");
        }

        if (formDataObject.country == "Choose Country") {
            return;
        }

        if (formDataObject.currency == "Select Currency") {
            return;
        }

        const response = await fetchDataFromRoute(
            "register",
            "post",
            formDataObject,
            urlParams.has("ref") ? { ref: urlParams.get("ref") } : null
        );

        if (localStorage.getItem("uvtkn")) {
            localStorage.removeItem("uvtkn");
            localStorage.setItem("uvtkn", response.token);
            localStorage.setItem("emailForVer", formDataObject.email);

        } else {
            localStorage.setItem("uvtkn", response.token);
            localStorage.setItem("emailForVer", formDataObject.email);

        }

        setTimeout(() => {
            document
                .getElementById("loaderContainer")
                .classList.remove("hidden");

            window.location.href = "account-registration.html";
        }, 2200);
    } catch (error) {
        console.log("Error: ", error);
        if (document.querySelector("#reg-error").classList.contains("hidden")) {
            document.querySelector("#reg-error").classList.remove("hidden");
        }
        document.querySelector("#reg-error").textContent = error;
    }
}

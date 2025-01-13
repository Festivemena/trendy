import "../../env";
import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;

document.addEventListener("DOMContentLoaded", async () => {
    const loaderContainer = document.getElementById("loaderContainer");

    loaderContainer.classList.add("hidden");

    const urlP = new URL(window.location.href);
    console.log(String(urlP.searchParams.get("token")));

    try {
        if (String(urlP.searchParams.get("token")) == "null") {
            document.querySelector("#no-token").classList.remove("hidden");
            if (localStorage.getItem("emailForVer")) {
                console.log(localStorage.getItem("emailForVer"));
                document
                    .querySelector("#no-token")
                    .addEventListener("submit", async (e) => {
                        e.preventDefault();

                        const res = await fetchDataFromRoute(
                            "send-verification-email",
                            "post",
                            {
                                accountEmail:
                                    localStorage.getItem("emailForVer"),
                            },
                            null
                        );

                        console.log(res);
                        if (res.success == true) {
                            document.querySelector("#ver-message").innerHTML = `
                                ${res.message} <br><br>
                                Also, please remember to check your spam folder.
                            `;
                            document.querySelector("#verEmailButton").click();
                        }
                        // document
                        //     .querySelector("#no-token")
                        //     .classList.remove("hidden");
                    });
            } else {
                window.location.href = "login.html";
            }
        } else {
            const res = await fetchDataFromRoute(
                "verify-user-email",
                "post",
                {
                    emailVerificationToken: String(
                        urlP.searchParams.get("token")
                    ),
                },
                null
            );
            console.log(res);
            document.querySelector("#ver-container").classList.remove("hidden");
        }
    } catch (error) {
        console.log(String(error).split(":")[1]);
        document.querySelector("#err-ver").innerHTML = `
            ${String(error).split(":")[1]} <br><br>
            <a href="verify-email" class="text-darkbg font-medium underline"> Continue </a>
            `;
        // document.querySelector("#no-token").classList.remove("hidden");
    }
});

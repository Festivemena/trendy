import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;

document.addEventListener("DOMContentLoaded", async () => {
    setTimeout(() => {
        document.querySelector("#loaderContainer").classList.add("hidden");
    }, 4000);

    if (localStorage.getItem("emailForVer")) {
        try {
            const res = await fetchDataFromRoute(
                "send-verification-email",
                "post",
                {
                    accountEmail: localStorage.getItem("emailForVer"),
                },
                null
            );

            console.log(res);
            if (res.success == true) {
                document.querySelector("#no-token").classList.remove("hidden");
            }
            document
                .querySelector("#no-token")
                .addEventListener("submit", async (e) => {
                    e.preventDefault()
                    const res = await fetchDataFromRoute(
                        "send-verification-email",
                        "post",
                        {
                            accountEmail: localStorage.getItem("emailForVer"),
                        },
                        null
                    );

                    if (res.success == true) {
                        document.querySelector("#ver-message").innerHTML = `
                                ${res.message} <br><br>
                                Also, please remember to check your spam folder.
                            `;
                        document.querySelector("#verEmailButton").click();
                    }
                });
        } catch (error) {
            document.querySelector("#err-ver").textContent = error;
        }
    } else {
        window.location.href = `login.html`;
    }
});

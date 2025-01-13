import "../../env";
import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;

document.addEventListener("DOMContentLoaded", async () => {
    const loaderContainer = document.getElementById("loaderContainer");

    loaderContainer.classList.add("hidden");

    const urlP = new URL(window.location.href);

    if (
        String(urlP.searchParams.get("token")) == "null" ||
        String(urlP.searchParams.get("email")) == "null"
    ) {
        window.location.href = "404.html";
    }

    document
        .querySelector("#reset-password-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const smallErr = document.querySelector("#sm-err");

            const newPW = String(document.querySelector("#newPassword").value);

            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(newPW)) {
                smallErr.textContent =
                    "Password must be at least 8 characters and contain at least one letter and one number";
                smallErr.classList.contains("hidden")
                    ? smallErr.classList.remove("hidden")
                    : "";
                return;
            }

            try {
                const res = await fetchDataFromRoute(
                    "change-password",
                    "post",
                    {
                        newPassword: newPW,
                        accountEmail: String(urlP.searchParams.get("email")),
                    },
                    {
                        token: String(urlP.searchParams.get("token")),
                    }
                );

                console.log(res);
                smallErr.classList.remove("text-red-600");
                smallErr.classList.add("text-green-500");
                smallErr.innerHTML = `${res.message}. Proceed to <a class="text-blue-200" href="login.html">Login</a>`;
                smallErr.classList.contains("hidden")
                    ? smallErr.classList.remove("hidden")
                    : "";

                document
                    .querySelector("#sub-btn")
                    .setAttribute("disabled", true);
            } catch (error) {
                console.log(error);
                if (
                    String(error)
                        .split(": ")
                        .includes("Invalid or expired token")
                ) {
                    smallErr.innerHTML = `Token expired. Request for a <a class="text-blue-200" href="login.html">password reset</a>`;
                    smallErr.classList.contains("hidden")
                        ? smallErr.classList.remove("hidden")
                        : "";
                    return;
                }
            }
        });

    console.log(urlP);
});

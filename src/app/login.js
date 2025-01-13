import "../../env";
// import * as XXV from "../index";

import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;

// XXV.default.fetchDataFromRoute

const loginForm = document.querySelector("#login-form");
const smallErr = document.querySelector("#sm-err");

loginForm.addEventListener("submit", getFormDetails);

async function getFormDetails(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log("Invalid email format");
        alert("Invalid email format");
        return;
    }

    if (!password.trim()) {
        console.log("email and password cannot be empty");
        alert("email and password cannot be empty");
        return;
    }

    const formData = {
        email: email,
        password: password,
    };

    console.log(JSON.stringify(formData));

    try {
        // const response = await fetch(`${process.env.SERVER_URL}/login`, {
        const response = await fetch(`${window.env.SERVER_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        console.log(response);

        if (!response.ok) {
            const responseData = await response.json();
            if (responseData.msg == "Incorrect Password") {
                throw new Error("Incorrect Password");
            } else if (responseData.msg == "User doesn't Exist") {
                throw new Error("Email not found");
            } else if (responseData.msg == "Email not verified") {
                localStorage.setItem("emailForVer", formData.email);
                window.location.href = "verify-email.html";
                return;
            } else {
                throw new Error("Something went wrong");
            }
        }

        const responseData = await response.json();
        console.log("Server response:", responseData);

        if (localStorage.getItem("uvtkn")) {
            localStorage.removeItem("uvtkn");
            localStorage.setItem("uvtkn", responseData.token);
        } else {
            localStorage.setItem("uvtkn", responseData.token);
        }

        window.location.href = "dashboard.html";
    } catch (error) {
        console.log("Error:", error);
        console.error("Error:", error);
        document.querySelector("#login-error-btn").click();

        document.querySelector(
            "#login-error-msg"
        ).textContent = `${error.message}`;
    }
}

document.querySelector("#reset-password-btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("CLICK");

    document.querySelector("#trigger-emailResetInput-btn").click();

    document
        .querySelector("#send-reset-password")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

            if (
                !emailRegex.test(
                    String(document.querySelector("#user-email-address").value)
                )
            ) {
                smallErr.textContent = "Invalid email address";
                smallErr.classList.contains("hidden")
                    ? smallErr.classList.remove("hidden")
                    : "";
            }

            try {
                const res = await fetchDataFromRoute(
                    "password",
                    "post",
                    {
                        accountEmail: String(
                            document.querySelector("#user-email-address").value
                        ),
                    },
                    null
                );

                console.log(res);
                smallErr.classList.remove("text-red-600");
                smallErr.classList.add("text-green-500");
                smallErr.textContent = res.message;
                smallErr.classList.contains("hidden")
                    ? smallErr.classList.remove("hidden")
                    : "";

                document
                    .querySelector("#sub-btn")
                    .setAttribute("disabled", true);
            } catch (error) {
                smallErr.textContent = String(error).split(": ")[1];
                smallErr.classList.contains("hidden")
                    ? smallErr.classList.remove("hidden")
                    : "";
            }
        });
});

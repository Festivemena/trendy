document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const { fetchDataFromRoute } = require("../../src/index");

    const urlParams = new URLSearchParams(window.location.search);

    try {
        const { user } = await fetchDataFromRoute(
            "get-user-by-id",
            "get",
            null,
            { id: urlParams.has("userId") ? urlParams.get("userId") : null }
        );

        const advertList = document.createElement("div");
        advertList.className =
            "text-white text-xs flex flex-col justify-center border-b py-2 px-2 border-white items-center space-y-4";

        advertList.innerHTML = `
        <p class="font-black">Account Advert</p>
        <p>
            <input type="number" value="${
                user.accountAdvertAmount
            }" class="p-2 rounded-lg text-gray-800 bg-white" id="accountAdvertAmount"/>
        </p>
        <p>
            <select name="" id="accountAdvert" class="text-gray-800 rounded-lg">
                <option value="Active" ${
                    user.accountAdvert == "Active" ? "selected" : ""
                }>Active</option>
                <option value="Inactive" ${
                    user.accountAdvert == "Inactive" ? "selected" : ""
                }>Inactive</option>
                <option value="Pending" ${
                    user.accountAdvert == "Pending" ? "selected" : ""
                }>Pending</option>
            </select>
            </p>
            `;

        const accountNiche = document.createElement("div");
        accountNiche.className =
            "text-white text-xs flex flex-col justify-center border-b py-2 px-2 border-white items-center space-y-4";

        accountNiche.innerHTML = `
        <p class="font-black">Account Niche</p>
        <p>
            <select name="" id="accountNicheStatus" class="text-gray-800 rounded-lg">
                <option value="Active" ${
                    user.accountNicheStatus == "Active" ? "selected" : ""
                }>Active</option>
                <option value="Inactive" ${
                    user.accountNicheStatus == "Inactive" ? "selected" : ""
                }>Inactive</option>
                <option value="Pending" ${
                    user.accountNicheStatus == "Pending" ? "selected" : ""
                }>Pending</option>
            </select>
            </p>
            `;

        const accountSmartLink = document.createElement("div");
        accountSmartLink.className =
            "text-white text-xs flex flex-col justify-center border-b py-2 px-2 border-white items-center space-y-4";

        accountSmartLink.innerHTML = `
        <p class="font-black">Smart Link</p>
        <p>
            <input type="number" value="${
                user.accountSmartLinkAmount
            }" class="p-2 rounded-lg text-gray-800 bg-white" id="accountSmartLinkAmount" />
        </p>
        <p>
            <select name="" id="accountSmartLink" class="text-gray-800 rounded-lg">
                <option value="Active" ${
                    user.accountSmartLink == "Active" ? "selected" : ""
                }>Active</option>
                <option value="Inactive" ${
                    user.accountSmartLink == "Inactive" ? "selected" : ""
                }>Inactive</option>
                <option value="Pending" ${
                    user.accountSmartLink == "Pending" ? "selected" : ""
                }>Pending</option>
            </select>
            </p>
            `;

        const accountGiftBoxStatus = document.createElement("div");
        accountGiftBoxStatus.className =
            "text-white text-xs flex flex-col justify-center border-b py-2 px-2 border-white items-center space-y-4";

        accountGiftBoxStatus.innerHTML = `
        <p class="font-black">Gift Box</p>
        <p>
            <select name="" id="accountGiftBoxStatus" class="text-gray-800 rounded-lg">
                <option value="Active" ${
                    user.accountGiftBoxStatus == "Active" ? "selected" : ""
                }>Active</option>
                <option value="Inactive" ${
                    user.accountGiftBoxStatus == "Inactive" ? "selected" : ""
                }>Inactive</option>
                <option value="Pending" ${
                    user.accountGiftBoxStatus == "Pending" ? "selected" : ""
                }>Pending</option>
            </select>
            </p>
            `;

        document.querySelector("#details-list").appendChild(advertList);
        document.querySelector("#details-list").appendChild(accountNiche);
        document.querySelector("#details-list").appendChild(accountSmartLink);
        document
            .querySelector("#details-list")
            .appendChild(accountGiftBoxStatus);

        const modifyBTN = document.createElement("button");
        modifyBTN.className =
            "rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2";
        modifyBTN.textContent = "save";
        modifyBTN.setAttribute("type", "submit");

        document.querySelector("#details-list").appendChild(modifyBTN);
        document
            .querySelector("#details-list")
            .addEventListener("submit", async (e) => {
                e.preventDefault();

                const formElements = document.querySelectorAll(
                    "#details-list input, #details-list select"
                );
                const formData = {};

                formElements.forEach((element) => {
                    const id = element.id;
                    let value;

                    if (element.tagName === "INPUT") {
                        value = element.value;
                    } else if (element.tagName === "SELECT") {
                        value = element.options[element.selectedIndex].value;
                    }

                    formData[id] = value;
                });

                console.log(formData);

                const res = await fetchDataFromRoute(
                    `modify-user/${
                        urlParams.has("userId") ? urlParams.get("userId") : null
                    }`,
                    "patch",
                    formData,
                    {
                        id: urlParams.has("userId")
                            ? urlParams.get("userId")
                            : null,
                    }
                );

                console.log(res);
                window.location.reload()

            });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
});

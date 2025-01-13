document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const { fetchDataFromRoute } = require("../../src/index");

    try {
        const { data } = await fetchDataFromRoute(
            "/get-all-users-data",
            "get",
            null,
            null
        );

        const usersList = document.querySelector("#users-list");
        usersList.innerHTML = "";

        data.reverse().forEach((user) => {
            const newLi = document.createElement("li");
            newLi.className =
                "w-full text-white text-xs flex flex-col justify-between items-center space-y-3 border-b-2 border-neutral-100 py-4";
            newLi.innerHTML = `
            <div class="flex flex-col justify-between items-center space-y-3">
            <a href="./details.html?userId=${user._id}" class="p-4 text-[#de7124] font-black bg-darkbg4 rounded-lg hover:bg-opacity-70">${user.accountEmail}</a>
                <a href="./withdrawal-checklist.html?userId=${user._id}" class="p-4 font-bold text-red-500 bg-red-200 rounded-lg">${user._id}</a>
                <a href="./users-tx.html?userId=${user._id}" class="p-2 font-bold text-white ">Transactions</a>
                <a href="./users-plan.html?userId=${user._id}" class="p-2 font-bold text-green-400 ">Plans</a>
                </div>
                `;
            usersList.appendChild(newLi);
        });

        console.log(data);
    } catch (error) {
        console.log(error);
    }
});

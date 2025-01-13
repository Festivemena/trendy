const { fetchDataFromRoute } = require("../../src/index");

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);

    try {
        const { allTransactions } = await fetchDataFromRoute(
            `user-tx/${
                urlParams.has("userId") ? urlParams.get("userId") : null
            }`,
            "get",
            null,
            null
        );

        const transactionList = document.querySelector("#tx-list");
        transactionList.innerHTML = ""; // Clear existing entries

        allTransactions.reverse().forEach((tx) => {
            const newLi = document.createElement("li");
            newLi.className =
                "w-full text-white text-xs flex flex-col justify-between items-center space-y-3 border-b-2 border-neutral-100 py-4";
            newLi.innerHTML = `
            <div class="flex flex-row justify-between items-center space-x-3">
                <p>${tx.txStatus}</p>
                <p>${tx.txType}</p>
                <p>${tx.txAmount}</p>
                <p>${tx.txMethod}</p>
                <p>${tx._id}</p>
                </div>
                <div class="flex flex-row space-x-3">
                
                <p><select id="${
                    tx._id
                }" class="rounded-lg px-3 py-2 text-xs text-gray-800">
                <option value="Pending" ${
                    tx.txStatus === "Pending" ? "selected" : ""
                }>Pending</option>
                <option value="Successful" ${
                    tx.txStatus === "Successful" ? "selected" : ""
                }>Successful</option>
                <option value="Failed" ${
                    tx.txStatus === "Failed" ? "selected" : ""
                }>Failed</option>
                </select>
                <button class="bg-darkbg4 bg-opacity-20 shadow-lg px-4 rounded-lg py-3 modify-tx-btn">Modify</button>
                </p>
                </div>
                `;
            // <input id="${tx._id}" type="text" class="rounded-lg px-3 py-2 text-gray-800" />
            transactionList.appendChild(newLi);
        });

        transactionList.addEventListener("click", async function (e) {
            if (e.target.classList.contains("modify-tx-btn")) {
                const inputElement = e.target
                    .closest("p")
                    .querySelector("select");
                console.log("Input value:", inputElement.value);
                console.log("Input value:", inputElement.id);

                try {
                    const res = await fetchDataFromRoute(
                        "transactions",
                        "patch",
                        {
                            txID: inputElement.id,
                            userID: urlParams.has("userId")
                                ? urlParams.get("userId")
                                : null,
                        },
                        {
                            txStatus:
                                String(inputElement.value)
                                    .charAt(0)
                                    .toUpperCase() +
                                String(inputElement.value).slice(1),
                        }
                    );
                    console.log(res);
                    alert("Success");
                } catch (error) {
                    console.log(error);
                    alert(error);
                }
            }
        });

        console.log(allTransactions);
    } catch (error) {
        console.log(error);
    }
});

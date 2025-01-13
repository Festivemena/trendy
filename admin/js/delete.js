document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const { fetchDataFromRoute } = require("../../src/index");

    document.querySelector("#del-btn").addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            const delID = document.querySelector("#delete-id").value;

            // Regular expression to match MongoDB ObjectId format
            const objectIdRegex = /^[0-9a-fA-F]{24}$/;

            // Check if the delID matches the ObjectId format
            if (!objectIdRegex.test(delID)) {
                alert("Invalid user ID");
                return;
            }

            const res = await fetchDataFromRoute(
                `delete-user-data/${delID}`,
                "delete",
                null,
                null
            );

            console.log(res);
            alert("Successfully deleted");
        } catch (error) {
            console.log(error);

            const errorSpan = document.createElement("span");
            errorSpan.className = "text-red-600";
            errorSpan.textContent = error;
            document.querySelector("#delete-div").appendChild(errorSpan);
        }
    });

    document
        .querySelector("#del-tx-btn")
        .addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                const delID = document.querySelector("#delete-tx-id").value;

                // Regular expression to match MongoDB ObjectId format
                const objectIdRegex = /^[0-9a-fA-F]{24}$/;

                // Check if the delID matches the ObjectId format
                if (!objectIdRegex.test(delID)) {
                    alert("Invalid TX ID");
                    return;
                }

                const res = await fetchDataFromRoute(
                    `transactions`,
                    "delete",
                    null,
                    { id: `${delID}` }
                );

                console.log(res);
                alert("Successfully deleted TX");
            } catch (error) {
                console.log(error);

                const errorSpan = document.createElement("span");
                errorSpan.className = "text-red-600";
                errorSpan.textContent = error;
                document.querySelector("#delete-tx-div").appendChild(errorSpan);
            }
        });
});

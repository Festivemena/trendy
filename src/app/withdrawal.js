import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;
;
document.addEventListener("DOMContentLoaded", () => {
   const loaderContainer = document.getElementById("loaderContainer");

   const transactionStatusButton = document.querySelector(
      "#transactionStatusButton"
   );
   const txMethod = document.querySelector("#txMethod");
   const txAmount = document.querySelector("#txAmount");

   txMethod.addEventListener("change", (e) => {
      e.preventDefault();

      if (txMethod.value == 0) {
         document.querySelector(".address-hidden").classList.add("hidden");
         document.querySelector(".amount-hidden").classList.add("hidden");
         document.querySelector(".submit-hidden").classList.add("hidden");
      } else {
         document
            .querySelector(".address-hidden")
            .classList.remove("hidden");
         document
            .querySelector(".amount-hidden")
            .classList.remove("hidden");
         document
            .querySelector(".submit-hidden")
            .classList.remove("hidden");
      }

      console.log(txMethod.value);
   });

   document
      .querySelector("#withdrawal-form")
      .addEventListener("submit", placeWithdrawalRequest);

   async function placeWithdrawalRequest(e) {
      e.preventDefault();

      if (!txMethod.value || !txAmount.value) {
         console.log("Invalid values");
         return;
      }

      const bodyData = {
         txMethod: txMethod.options[txMethod.selectedIndex].textContent,
         txAmount: txAmount.value,
      };

      console.log(bodyData);

      try {
         const response = await fetchDataFromRoute(
            "transactions",
            "post",
            bodyData,
            {
               userTransactionType: "Withdrawal",
            }
         );

         console.log(response);
      } catch (error) {
         console.log(error);

         document.querySelector(
            "#account-message"
         ).innerHTML = `Unable to process Withdrawal <br> <u>${
            String(error).split(": ")[1]
         }</u>, contact support or Account Manager for more information`;
         // document.querySelector("#transactionStatusButton").click();
         transactionStatusButton.click();
      }
   }
});

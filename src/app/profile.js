import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;
;

const loaderContainer = document.getElementById("loaderContainer");

document.addEventListener("DOMContentLoaded", async () => {
   const fullName = document.querySelector("#fullName");
   const userID = document.querySelector("#userID");
   const email = document.querySelector("#email");
   const phoneNumber = document.querySelector("#phoneNumber");
   const country = document.querySelector("#country");
   const refID = document.querySelector("#ref-link");
   const response = await fetchDataFromRoute("users", "get", null, null);
   console.log(response);

   fullName.value = response.user.fullName;
   userID.value = response.user.refID;
   email.value = response.user.accountEmail;
   phoneNumber.value = response.user.accountPhoneNumber;
   country.value = response.user.accountCountry;
   refID.value = `https://${window.location.host}/register.html?ref=${response.user.refID}`;

   //    console.log(response);
   loaderContainer.classList.add("hidden");

   const copyButton = document.getElementById("copy-button");

   copyButton.addEventListener("click", function (e) {
      e.preventDefault();
      refID.removeAttribute('disabled')
      refID.select();
      refID.setSelectionRange(0, 99999); 

      document.execCommand("copy");

      refID.setAttribute('disabled', true); 

      refID.setSelectionRange(0, 0);
   });
});

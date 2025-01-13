import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;


const verifyForm = document.querySelector("#verify-form");

verifyForm.addEventListener("submit", (e) => {
   e.preventDefault();
   const docFront = document.querySelector("#document-front");
   const docBack = document.querySelector("#document-back");

   if (docFront.files.length === 0 || docBack.files.length === 0) {
      alert("Please select a file.");
      return;
   }

   if (
      docFront.files[0].size > 2 * 1024 * 1024 ||
      docBack.files[0].size > 2 * 1024 * 1024
   ) {
      alert("File size exceeds the maximum limit of 2MB.");
      docFront.value = "";
      docBack.value = "";
      return;
   }

   if (docFront.files.length > 1 || docBack.files.length > 1) {
      alert("Please select only one file.");
      docFront.value = "";
      docBack.value = "";
      return;
   }
});

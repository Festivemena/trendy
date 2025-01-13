import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;
;

const loaderContainer = document.getElementById("loaderContainer");

document.addEventListener("DOMContentLoaded", async () => {
   try {
      const res = await fetchDataFromRoute("referrals", "get", null, null);

      if (Array.isArray(res.referrer)) {
         await loadDOM(res.referrer);
      }

      console.log(res);
   } catch (error) {
      console.log(error);
   }
});

async function loadDOM(referrer) {
   if (referrer.length < 1) {
      return;
   }

   referrer.forEach((data, i) => {
      let tRow = document.createElement("tr");
      //   <tr>
      tRow.innerHTML = `
            <td
            class="px-6 py-4 whitespace-nowrap text-xs font-medium text-white"
            >
            ${i + 1}
            </td>
            <td
            class="px-6 py-4 whitespace-nowrap text-xs text-white"
            >
            ${data.fullName}
            </td>
            <td
            class="px-6 py-4 whitespace-nowrap text-xs text-white"
            >
            ${data.refID}
            </td>
            <td
            class="px-6 py-4 whitespace-nowrap text-xs text-white"
            >
            ${new Date(data.createdAt).toLocaleDateString("en-US", {
               month: "2-digit",
               day: "2-digit",
               year: "2-digit",
            })}
            </td>
            `;
      // </tr>

      document.querySelector("#ref-body").appendChild(tRow);
   });
}

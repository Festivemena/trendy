import "tw-elements";
import * as XXV from "../index";
const { fetchDataFromRoute } = XXV;


import categories from "./../../product-links.json";

document.addEventListener("DOMContentLoaded", async (e) => {
   e.preventDefault();

   const { user } = await fetchDataFromRoute("users", "get", null, null);
   console.log(user);

   const container = document.getElementById("collapseContainer");

   categories.forEach((item) => {
      const trigger = document.createElement("button");
      const sect = document.createElement("section");
      const ch = document.createElement("input");
      sect.className = `flex flex-row justify-between items-center px-2 w-full`;
      // ch.className = `relative rounded-full float-left px-1 -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary`;
      ch.className = `relative rounded-full float-left px-2 -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] ${
         user.accountNiche
            ? "border-0"
            : // ? "border-[0.125rem] border-solid border-secondary-500"
              "border-0"
      } before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right`;
      trigger.className = "btn-collapse text-left";
      trigger.innerHTML = `${item.category} &darr;`;
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", `collapse-${item.category}`);

      ch.setAttribute("type", "checkbox");
      ch.setAttribute("disabled", "true");

      ch.checked =
         user.accountNiche == item.category ||
         String(user.accountNiche).split(" ").join("-").toLowerCase() ==
            String(item.category).split(" ").join("-").toLowerCase();

      sect.appendChild(trigger);
      sect.appendChild(ch);

      const contentContainer = document.createElement("div");
      contentContainer.className = "content-container hidden";
      contentContainer.setAttribute("id", `collapse-${item.category}`);

      const listContent = document.createElement("ul");
      listContent.className = "border border-2";
      item.items.forEach((a) => {
         let lItm = document.createElement("li");
         lItm.className = "bg-gray-300 p-2 border-2 border-gray-300";
         lItm.textContent = a;
         listContent.appendChild(lItm);
      });
      contentContainer.appendChild(listContent);

      // Toggle visibility on button click
      trigger.addEventListener("click", () => {
         const expanded = trigger.getAttribute("aria-expanded") === "true";
         trigger.setAttribute("aria-expanded", String(!expanded));
         contentContainer.classList.toggle("hidden");
      });

      // container.appendChild(trigger);
      container.appendChild(sect);
      container.appendChild(contentContainer);
   });
});

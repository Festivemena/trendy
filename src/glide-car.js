import Glide from "@glidejs/glide";

document.addEventListener("DOMContentLoaded", (e) => {
   e.preventDefault();

   // /* <script src="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/glide.js"></script> */}

   var glide07 = new Glide(".glide-08", {
      type: "carousel",
      // type: "slider",
      focusAt: 1,
      animationDuration: 8000,
    //   autoplay: 9000,
      autoplay: true,
      rewind: true,
      perView: 1,
      gap: 48,
      classes: {
         activeNav: "[&>*]:bg-slate-700",
      },
      breakpoints: {
         1024: {
            perView: 2,
         },
         640: {
            perView: 1,
         },
      },
      hoverpause: true,
   });

   glide07.mount();
});

// Apexcharts build
window.addEventListener("load", () => {
   (function () {
      buildChart(
         "#pie-chart",
         () => ({
            chart: {
               height: 230,
               width: 230,
               type: "donut",
               zoom: {
                  enabled: false,
               },
            },
            plotOptions: {
               pie: {
                  donut: {
                     size: "20%",
                  },
               },
            },
            series: [47, 23, 30],
            labels: ["Diversified Funds", "Workflow Rate", "Others"],
            legend: {
               show: false,
            },
            dataLabels: {
               enabled: false,
            },
            stroke: {
               width: 2,
            },
            grid: {
               padding: {
                  // top: -12,
                  // bottom: -11,
                  // left: -12,
                  // right: -12,
               },
            },
            states: {
               hover: {
                  filter: {
                     type: "none",
                  },
               },
            },
         }),
         {
            colors: ["#0077ff", "#80004d", "#ff9c00"],
            stroke: {
               colors: ["rgb(255, 255, 255)"],
            },
         },
         {
            colors: ["#ff9c00", "#0077ff", "#80004d"],
            stroke: {
               colors: ["rgb(38, 38, 38)"],
            },
         }
      );
   })();
});

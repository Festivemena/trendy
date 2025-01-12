// export default {
//    plugins: [["@snowpack/plugin-webpack"]],
// };

export default {
   optimize: {
      bundle: true,
      minify: true,
      target: "es2018",
   },
};

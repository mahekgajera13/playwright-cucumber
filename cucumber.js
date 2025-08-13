module.exports = {
  default: {
    require: [
      "src/steps/**/*.ts",   // steps location
      "src/support/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress",
      "allure-cucumberjs/reporter"
    ],
    // Add timeout configuration
    timeout: 60000,
    parallel: 1
  }
};

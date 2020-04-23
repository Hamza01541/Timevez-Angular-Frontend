(function (window) {
  window._env = window._env || {};

  // API url
  window._env.apiUrl = process.env.testVar;

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window._env.enableDebug = true;
}(this));
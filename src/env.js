/**
 * @see https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
 */
(function (window) {
  window._env = window._env || {};

  // API url
  window._env.apiUrl = process.env.testVar;
  window._env.testENV = ENV;
  window._env.processEnv = process.env;
  window._env.directEnv = testVar;
  
  console.log("***testVar:",testVar)
  console.log("***process:",process)
  console.log("***ENV:",ENV)
  console.log("***window:",window)
  console.log("***testVar:",testVar)

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window._env.enableDebug = true;
}(this));
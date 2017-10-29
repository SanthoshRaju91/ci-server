const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

/**
* Function to process the application build
* @method startBuild
* @param APP_ROOT - application root directory
* @param BUILD_PATH - Path where the build should occur
* @param BRANCH - Branch against which the build will happen
* @param SCRIPT_FILE - Name of the script file
* @param payload - GIT event payload
* @param deploymentCB - Callback from the initializer
*/
function build(
  APP_ROOT,
  BUILD_PATH,
  BRANCH,
  SCRIPT_FILE,
  payload,
  deploymentCB
) {
  //change to the repo directory
  console.log('PATH: ' + BUILD_PATH);
  console.log('BRANCH: ' + BRANCH);

  try {
    shell.exec('./' + SCRIPT_FILE + ' ' + BRANCH );
    console.log('Build completed');

    /* calling the deployment status callback from initializer for success*/
    deploymentCB(null, {
      path: BUILD_PATH,
      branch: BRANCH,
      payload: payload
    });
  } catch (err) {
    /* calling the deployment status callback from initializer for error*/
    deploymentCB(err);
  }
}

module.exports = build;

const shell = require('shelljs');

/**
* Function to process the application build
* @method startBuild
* @param BUILD_PATH
*/
function build(BUILD_PATH, BRANCH, payload, deploymentCB) {
  //change to the repo directory
  console.log('PATH: ' + BUILD_PATH);
  console.log('BRANCH: ' + BRANCH);

  try {
    shell.cd(BUILD_PATH);
    shell.exec('git pull origin ' + BRANCH);
    shell.exec('npm install');

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

import shell from 'shelljs';

/**
* Function to process the application build
* @method startBuild
* @param BUILD_PATH
*/
function startBuild(BUILD_PATH, BRANCH) {
  //change to the repo directory
  shell.cd(BUILD_PATH);
  shell.exec(`git pull origin ${BRANCH}`);
  shell.exec('sudo systemctl restart squad.service');
  console.log('Build completed');
}

export default {
  startBuild
};

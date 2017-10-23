# CI Server

## Motivation

This is a experimental project, which I thought of and solve my organization's automate build system for most of our UI projects.

But this turned out to be one of the useful projects that I have ever thought of. This is basic projection of what Travis-ci.org offers. This is not a complete implementation / projection of Travis-ci (which is my ultimate goal of this project completion and gracefully present it back to the community which I love so much).

## Introduction

The CI Server is tiny node module, which helps you build a CI server of your own with your own instruction, and this is implemented to work with github, using github's webhook events.

## Installation

The package is available on the npm registry and you can install it using npm / yarn

`npm install ci-server` or `yarn add ci-server`


## Usage

Once your installed the `ci-server` node module, there is a few configurations which the module expects.

1. `config.json` - Is a configuration JSON telling the which branch's should the CI build trigger and specify the script filename.

2. script file - This is basic shell script file, having the build instructions to be executed on a build instance.

3. Instantiating the CI server instance. Once the above configurations are done. You need to instantiate and ci, which exposes few methods for your use, as below.

``` 
  const CI = require('ci-server');

  const config = {
    WEBHOOK_PATH: '/webhook',
    SECRET: 'secret',
    BUILD_PATH: '/ci/workspace',
    PORT: 9000
  };

  const server = new CI(config);

  server.start(function instanceCB(err, port) {
    if(err) {
      console.log('Error on CI instance' + err);
    } else {
      console.log('Webhook listening for events on port' + port);
    }
  }, function deploymentCB(err, deploymenstStatus));

```

WEBHOOK_PATH - GITHUB webhook namespace, for the events to be received and perform the build activities

SECRET - This is secret code which you specify when creating a webhook handler for you git repo. This is covered in details below.

BUILD_PATH - Your project workspace on the server.

PORT - (Optional) Port on which the CI server would be instantiated and run. (Default PORT - 7777)


`start()` - This is the API function exposed, when you create a CI instance by calling new CI(). This takes two callbacks, where

- the first callback is the instance callback which is executed when the server is started.

- second callback is the deployment callback which is executed on every deployment cycle.

The first callback takes two parameters, where the first parameter is the error and second is the port which the ci server is running.


The second callback takes two parameters, where

- the first parameter is the error when a particular deployment cycles errors out.

- second parameter is given on deployment success, this is an Object having properties from

path - The provided Build path
branch - The branch is it deployed from.
payload - The github payload, this is useful as this provides information on the committer, branch, the commit ID.

You can use this object for referential / logging purpose.

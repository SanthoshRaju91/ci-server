# CI Server

## Motivation

This is a experimental project, which I started to have automate build system for most of our UI projects in our organization.

But this turned out to be one of the best projects that I have ever thought of. This is a basic projection of what Travis-ci.org offers. This is not a complete implementation / projection of Travis-ci (which is my ultimate goal of this project completion and gracefully present it back to the community which I love so much).

## Introduction

The CI Server is tiny node module, which helps you build a CI server of your own with your own instruction, and this is implemented to work with any SCM system which supports webhooks.

## Installation

The package is available on the npm registry and you can install it using npm / yarn

`npm install ci-server` or `yarn add ci-server`


## Usage

Once your installed the `ci-server` node module, there is a few configurations which the module expects.

1. `config.json` - Is a configuration JSON telling the which branch's should the CI build trigger and specify the script filename.

2. script file - This is basic shell script file, having the build instructions to be executed on a build instance.

3. Instantiating the CI server instance. Once the above configurations are done. You need to instantiate and ci, which exposes few methods for your use, as below.

```javascript
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

  - path - The provided Build path
  - branch - The branch is it deployed from.
  - payload - The github payload, this is useful as this provides information on the committer, branch, the commit ID.

You can use this object for referential / logging purpose.


## Creating webhook for your project

Follow the below steps to create a webook for project repo.

1. Click on the settings tab of your project repo.
    
   ![Settings Settings Screen](/docs/settings.png)
   

2. On side navigation panel click on webhook.

   ![Nav Nav panel Screen](/docs/nav-panel.png)


3. For webhook URL path, provide your CI server running instance eg. http://10.23.45.67:7777/webhook. The IP address changes, based on where you are running the ci server project.

4. Select content-type as application/json from the dropdown.

5. Provide the secret key. Please note this would be you secret key that you would provide as a config for creating the ci server instance.

6. Select the events which you want the webhook to emit (For the sake of this project, we are only interested in push events)

   ![webhook Webhook form unfilled](/docs/webhook-form.png)


   ![webhook Webhook form filled Screen](/docs/webhook-form-filled.png)
   
  

7. Save the webhook.




NOTE: If you don't have a server and you are curious to see what this project can do. start the project on you local machine. By this we are running the project on localhost:7777/webhook. Now you need to expose it to the internet.

There are many ways, but we will use something simpler, using ngrok. [which you can download here](https://ngrok.com/). 

Run the ngrok command as `ngrok http 7777`

This opens up you server and be accessed publicly, now copy the random address it generates and pate it in the webhook URL path with the namespace.

That's it you now have a CI serve, which is more controllable because you are giving it instructions to perform for every CI build.


If you like this, please spread the word out. If you find an issue, raise a bug which I will be more happy to resolve. Because that is the only way you would help me learn.

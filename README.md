# portfolio-cypress

## Description

This is my sample test code for the Cypress Real World App. I used Cypress for the UI end-to-end testing, and Postman for API testing.

## Setup requirements

You should have NodeJS and Yarn installed in order to run the app and the tests.

## To run the Cypress Real World app

Once you have installed NodeJS and Yarn, follow these steps to run the web app:

1. Navigate to the root directory of this repo
   ```bash
   $ cd portfolio-cypress
   ```
1. Initialize and update the cypress realworld app submodule
   ```bash
   $ git submodule init
   $ git submodule update
   ```
1. Navigate inside the app directory
   ```bash
   $ cd cypress-realworld-app
   ```
1. Install dependencies
   ```bash
   $ yarn install
   ```
1. Start the app with a seeded db
   ```bash
   $ yarn dev
   ```

## To run UI tests

From the project root directory

```bash
$ cd ./tests/ui
$ npm install

# if you want to open the cypress test runner
# and run the tests from there
$ npm run test

# if you want to run the tests on command line
$ npm run test:run
```

## To run API tests

From the project root directory

```bash
$ cd ./tests/api
$ npm install
$ npm run test
```

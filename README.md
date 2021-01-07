# portfolio-cypress

## Description

These are my Cypress and Postman/Newman samples. The application under test is the Cypress Real World App.

## Setup requirements

You should have NodeJS and Yarn installed in order to run the app and the tests.

## To run the Cypress Real World app

From the root directory:

```bash
$ cd app
$ yarn install # install dependencies
$ yarn dev # run local server with seeded db
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

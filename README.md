# portfolio-cypress

## Description

This is my sample test code for the Cypress Real World App. I used Cypress for the UI end-to-end testing, and Postman for API testing.

## Setup requirements

You should have NodeJS and Yarn installed in order to run the app and the tests.

## To run the Cypress Real World app

Once you have installed NodeJS and Yarn, follow these steps to run the web app:

1. Navigate to the root directory of this repo
   ```
   cd portfolio-cypress
   ```
1. Initialize and update the cypress realworld app submodule
   ```
   git submodule init
   git submodule update
   ```
1. Navigate inside the app directory
   ```
   cd cypress-realworld-app
   ```
1. Install dependencies
   ```
   yarn install
   ```
1. Start the app with a seeded db
   ```
   yarn dev
   ```

## To run the e2e tests

Install dependencies. From the project root directory:

```
$ cd e2e
$ npm install
```

To open the Cypress test runner

```
$ npm run cy:open

# or

$ npm run test

# or

$ npm run test:ui
```

To run cypress tests in the command line

```
$ npm run cy:run
```

## To run API tests via newman

```
$ npm run test:api

# or

$ npm run newman
```

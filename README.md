# portfolio-cypress

## Setup requirements

You should have NodeJS and Yarn installed in order to run the app and the tests.

## Instructions for running the web app

Once you have installed NodeJS and Yarn, follow these steps to run the web app:

1. Navigate to the root directory of this repo
    ```
    $ cd portfolio-cypress
    ```
1. Initialize and update the cypress realworld app submodule
    ```
    $ git submodule init
    $ git submodule update
    ```
1. Navigate inside the app directory
    ```
    $ cd cypress-realworld-app
    ```
1. Install dependencies
    ```
    $ yarn install
    ```
1. Start the app with a seeded db
    ```
    $ yarn dev
    ```
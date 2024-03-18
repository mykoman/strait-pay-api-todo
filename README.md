# Todo List API

This repository houses code for [Todo List](https://documenter.getpostman.com/view/2438531/UVC8CRZF)'s backend.

## Table of Contents

-   [Todo List](#todo-list-api)
    -   [Table of Contents](#table-of-contents)
    -   [About the Project](#about-the-project)
        -   [Folder Structure](#folder-structure)
        -   [HTTP Response Codes](#http-response-codes)
        -   [Sample HTTP Response](#sample-http-response)
    -   [Project Status](#project-status)
    -   [Project Payload](#project-payload)
    -   [Getting Started](#getting-started)
        -   [Dependencies](#dependencies)
        -   [Getting the Source](#getting-the-source)
        -   [Installation & Usage](#installation-usage)
        -   [Running Tests](#running-tests)
    -   [Authors](#authors)

## About the Project

This is a RESTful API for a todo list. Part of an assessment for [StraitPay](https://www.straitpay.com/). It allows a user to:

-   Register a new account.
-   Log in to the created account.
-   Create a todo item (Auth protected)
-   List all todo items in paginated manner and optionally filter the results based on status (created, in-progress, completed)
-   Update a todo item (Auth protected)
-   Delete a todo item (Auth protected)

### Folder Structure

```bash
.
├── ...
├── .husky                     # husky configuration file
│   ├── pre-commit             # git pre-commit commands
├── data                       # seed data
├── src                        # source files
│   ├── __tests__              # folder containing automated tests
│   ├── config                 # Configuration files, database etc
│   ├── controllers            # app business logic files
│   ├── helpers                # helper functions
│   ├── middlewares            # app middleware and route middlewares
│   ├── models                 # models/ entities
│   ├── routes                 # routes for navigating the application
│   ├── app.ts                 # express application
│   ├── index.ts               # entry file- server file
├── .env.example               # example environment file
├── .eslintignore              # eslint ginore file
├── .eslintrc.json             # eslint configuration file
├── .gitignore                 # gitginore file
├── .prettierignore            # prettier ginore file
├── .prettierrc.json           # prettier configuration file
├── jest.config.js             # jest configuration file
├── package.json               # application configuration
├── README.md                  # this file!!
├── tsconfig.json              # typescript configuration file
└──
```

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

-   `200` `OK` The request was successful
-   `400` `Bad Request` There was a problem with the request (security, malformed)
-   `401` `Unauthorized` The supplied API credentials are invalid
-   `404` `Not Found` An attempt was made to access a resource that does not exist in the API
-   `500` `Server Error` An error on the server occurred

### Sample HTTP Response

The API response, to the best of my ability, is structure after JSEnd specifications.

-   For a `success` response, the server will return a response of this format:

```
{
  "status": "success",
  "message": "success message from the API server"
  "data": { ... }
}
```

-   For an `error` response, the server will return a response of this format. The `trace` key in the `error` object is returned if `NODE_ENV !== production`.

```
{
  "status": "error",
  "error": {
    "message": "error message from the API server",
    "trace": {
      "statusCode": <status-code>
    }
  }
}
```

## Project Status

[![Deploy to Heroku Staging](https://www.vectorlogo.zone/logos/heroku/heroku-ar21.svg)](https://strait-pay-api-todo-3.onrender.com/api/v1/todos)

## Project Payload

-   [Project Specifications](https://docs.google.com/document/d/1i_VBfJFMhylw3rCRFMpXt6jfdeLajUg9pbBfbEIN-pA/edit?usp=sharing)
-   [Postman Collection](https://documenter.getpostman.com/view/2438531/2sA2xnwphk)

## Getting Started

### Dependencies

This project uses [Express.js](https://expressjs.com/) v4.17. It has the following dependencies:

-   [Node.js `>=` 20.0.0](https://nodejs.org/en/download)
-   [Typescript ](https://www.typescriptlang.org/download)
-   [MongoDB Database](https://www.mongodb.com/)

### Getting the Source

This project is hosted on [Github](https://github.com/mykoman/strait-pay-api-todo). You can clone this project directly using this command:

```sh
git clone https://github.com/mykoman/strait-pay-api-todo.git
```

### Installation & Usage

-   Create a databsae using mongoDB compass get the connecction string and use in the environment variable:



-   After cloning the repository, create a `.env` file from `.env.example` and set your local `.env.` variable(s).

```sh
cp .env.example .env
```

-   Install the dependencies

```sh
npm install
```

-   Run Development server

```sh
npm run dev
```

### Decision Record
MongoDB was chosen as Todo list do not require much relationship else postgres would have been used. Authentication was implemented on the backend server here, pagination

## Author

-   **[Michael Ogbuma](https://github.com/mykoman)**

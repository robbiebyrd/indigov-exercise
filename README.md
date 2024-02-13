# Constituents Service

An application that retrieves and stores contact information of constituents.

This application was developed using the NestJS framework and Typescript.

## Overview

The Constituents service is a public-facing API that provides endpoints to sign up constituents to receive
communications from their elected official. The Constituent Service also provides endpoints for data management,
including creating, updating and deleting constituent records. Records for constituents can be output in either JSON or
CSV format, and CSV files can be uploaded to create records.

## Installing

### Requirements

#### Node.js

The Constituents Service requires Node.js.

_MacOS_

```bash
brew install node
```

For other platforms, see [installing Node.js ](https://nodejs.org/en/download/package-manager)

#### Yarn

This project uses the `yarn` package manager. After installing Node, use the Node Package Manager (`npm`) to install
yarn.

```bash
npm install --global yarn
```

#### Nest.js CLI

_Optional_

While not required to run the application, it is recommended to install the Nest.js CLI for development. After
installing Node.js, run the following command to install the Nest.js CLI.

```bash
yarn install @nestjs/cli
```

### Clone

Clone this repository to your local computer, and change into the working directory. Run the following commands to clone
the repo to your local machine.

```bash
git clone https://github.com/robbiebyrd/indigov-exercise
cd indigov-exercise
```

### Install project dependencies

The `yarn` package manager will install all the required dependencies for this project, including Typescript and the
Nest.js framework.

```bash
yarn install
```

## Startup

To start the application, from the project's root directory, run the project's start command with `yarn`.

```bash
yarn start
```

For development purposes, it is helpful to turn on the debugger, which enables live-reloading and enhanced error
reporting.

```bash
yarn start:debug
```

## Accessing

By default, the application starts an HTTP server on port 3000. You can change the port by editing the .env file in the
project's root.

```
HTTP_PORT=3000
```

### OpenAPI

After starting the application, open the OpenAPI documentation page at [localhost:3000/api](localhost:3000/api) (or the
port you specified above). You can also use the OpenAPI Spec JSON file
at [http://localhost:3000/api-json](http://localhost:3000/api-json) in your favorite API client.

### Authentication

By default, endpoints that can retrieve constituent's personal information are protected by a JWT token. A user with a
login and password can exchange their credentials for a JWT token.

Users and passwords are hard-coded into the `./src/users/users.service.ts` file. By default, the following users are
defined:

```json
[
  {
    userId: 1,
    username: 'admin',
    password: 'admin',
    role: "admin"
  },
  {
    userId: 2,
    username: 'user',
    password: 'user',
    role: "user"
  }
]
```

To obtain a token, run the following commands:

```bash
curl -X POST http://localhost:3000/auth/login -d '{"username": "admin", "password": "admin"}' -H "Content-Type: application/json"
```

You will receive a JSON response with an access token. You can use that token when making requests to protected
endpoints, using
the `Authorization: Bearer` header.

#### Disable Authentication

By default, endpoints that accept incoming data are Public. To disable authentication completely, for testing purposes,
modify the `.env` file in the project's root:

```
HTTP_PORT=3000
SKIP_AUTH=true
```

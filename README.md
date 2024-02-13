**# Constituents Service

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

## Structure

Nest.js is a wonderful framework which tries to enforce and enhance both common software development practices and
proven software design patterns. I chose Nest.js because of its strong preference for the Repository pattern. Under the
hood, I chose the Express.js engine. Nest.js acts as a superb wrapper for Express.js, and also works with other
frameworks (such as Fastify).

This project uses a Sqlite3 database, but because I chose to use TypeORM as my underlying database engine, it is trivial
to change. Using the Repository pattern also makes it nearly as easy to change the underlying ORM to, for example,
Prisma or Sequelize.

Given the limited time necessary to complete the assignment, I tried to lean on the framework's default behaviors and be
strict and declarative in my initial setup of the repository layer. I knew this would slow me down at first, and
probably frustrate me, but that attention to detail in the repository layer would save me time later.

### `Auth` Module

I first used Nest.js' CLI [generate command](https://docs.nestjs.com/cli/usages#nest-generate) to create an
authentication module `Auth` to handle user logins and endpoint authentication.

This module would need a `@Controller` to route incoming requsts, a `@Service` to handle the business logic and return
results for requests, and a `@Guard` component to provide an interface for other controllers to protect routes.

We also needed a custom `@Decorator` to skip auth for some public endpoints.,

### `User` Module

I createad a `User` module to handle login information. This is easy using Nest.js CLI' auth generate. I added a `role`
attribute for each user, and masked returns so that only a username could be retrieved; this keeps password information
contained within the `User` service.

### `Constituent` Module

I began to create the `Constituent` module. First, I defined an `Entity`, or ORM mapping for a constituent record. Next,
I created a DTO for both creating and updating a record, and added validation to these fields.

I create a TypeORM configuration for the `Entity` I created, and injected into the `app.module.ts` file at the root.
This will ensure the module is injected appropriately when a request is accepted.

Next, I created a generic Service that would contain the business logic of responding to requests. I made a few standard
CRUD functions, and ensured that return types were appropriate; while most functions will return an array
of `Constituent` entities, some requests may call for CSV data in string format.

To enable the conversion of CSV data to Constituent Records (and vice versa), I opted to use string parsing instead of a
dedicated CSV library, to avoid the extra step of converting a `Constituent` entity to a base object and back.

The Constituent controller was the last piece of this package. It handles all incoming requests to the `/constituents`
endpoint. Each method is annoted for OpenAPI.

Finally, I imported the modules I had created into the appropriate place in the `app.module.ts` file and began testing.

## Testing

I first created a new record using dummy information by sending a `POST` request to the `/constiuents` endpoint.

```
POST /constituents HTTP/1.1
Content-Type: application/json; charset=utf-8
Host: localhost:3000
Connection: close
User-Agent: RapidAPI/4.2.0 (Macintosh; OS X/14.4.0) GCDHTTPRequest
Content-Length: 147

{"email":"me@robbiebyrd.com","firstName":"Robbie","lastName":"Byrd","address":"123 Main Street","city":"Austin","state":"Texas","zip":"78701"}
```

Then, I called the `/constiuents` endpoint with a `GET` request to see if the record had been added.

```
GET /constituents HTTP/1.1

---

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

[{"email":"me@robbiebyrd.com","firstName":"Robbie","lastName":"Byrd","address":"123 Main Street","address2":null,"city":"Austin","state":"Texas","zip":"78701","signup":"2024-02-13T10:35:59.000Z"}]```
```

Success! Next, I attempted to update my record.

```

PUT /constituents/me@robbiebyrd.com HTTP/1.1
Content-Type: application/json; charset=utf-8

{"firstName":"Robert"}

---

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[{"email":"me@robbiebyrd.com","firstName":"Robert","lastName":"Byrd","address":"123 Main Street","address2":null,"city":"Austin","state":"Texas","zip":"78701","signup":"2024-02-13T10:35:59.000Z"}]```


```

Success again!

Finally, I deleted the record.

```
DELETE /constituents/me@robbiebyrd.com HTTP/1.1

[{"email":"me@robbiebyrd.com","firstName":"Robert","lastName":"Byrd","address":"123 Main Street","address2":null,"city":"Austin","state":"Texas","zip":"78701","signup":"2024-02-13T10:35:59.000Z"}]```

---

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"message":"Deleted"}
```

I tried the CSV functionality by uploading the mock_data.csv file (in the root of this repo) to
the `/constituents/upload` endpoint. The `POST` endpoint accepts a `multipart/form-data` payload, with the file contents
in a field named `file`.

```
POST /constituents/upload/ HTTP/1.1
Content-Type: multipart/form-data; charset=utf-8;
Content-Disposition: form-data; name="file"; filename="mock_data.csv"
Content-Type: text/csv

email,firstName,lastName,address,address2,city,state,zip
dmcwhinney0@pinterest.com,Demetris,Mcwhinney,730 Utah Road,Apt 1615,Hialeah,Florida,33013
...

---

HTTP/1.1 201 Created
X-Powered-By: Express
Date: Tue, 13 Feb 2024 03:21:18 GMT
Connection: close
Content-Length: 0


```

I checked by calling a `GET` on the `/constiutents` endpoint and received 100 rows, the same number in the spreadsheet.

Next, I tried getting the results as a CSV format. I made the same `GET` request on the `/constiutents` endpoint, but
added the query string `?format=csv`.

```
GET /constituents?format=csv HTTP/1.1
Host: localhost:3000
Connection: close
User-Agent: RapidAPI/4.2.0 (Macintosh; OS X/14.4.0) GCDHTTPRequest

---

HTTP/1.1 200 OK
Content-Type: text/csv; charset=utf-8

email,firstName,lastName,address,address2,city,state,zip,signup
"dmcwhinney0@pinterest.com","Demetris","Mcwhinney"",730 Utah Road","Apt 1615","Hialeah","Florida","33013"

...
```

Success!

### Caveats

#### Duplicate records on update of email address

When Attempting to use a UpdateConstituentDto to update a user's email address, the operation succeeds; however, the
record isn't actually update, but rather a new record is created. This is a failure of using the email as
the `@PrimaryColumn` as a shortcut. Normally, a record would have a UUID or unique integer as its primary key, but doing
so adds an additional level of effort to the Constituent Service. I would change this in the future by still using the
same DTO, but doing a lookup first in the service:

```typescript
        const constituent = await this.constituentRepository.find({
    where: {email: email},
});
if (!constituent) {
    const constituent = this.constituentRepository.create(constituentDto);
    return await this.constituentRepository.save(constituent);
} else {
    await this.constituentRepository.update(constituent);
}

```

#### `?format=csv|json` could be app-wide

I have hard-coded into the method `GET` for route `/constituents` with a `@QueryParam` called `format`. I pass that
parameter down from the controller to the service (a.k.a. prop drilling) and use logic within the service to convert the
array of `Constituent` entities into CSV. This is not great, because it would require a lot of duplicated code
throughout to implement CSV exports to other types. It would be nice to use a `ClassSerializerInterceptor` to convert
the output type, or move the CSV methods from the service and into an output class on the `Constituent` entity.

#### CSV Output is not a file

One of the nice things about Nest.js is that it abstracts much of underlying Node.js frameworks, like Express, and makes
their application uniform. However, when Nest.js is missing a feature, it falls on the developer to short-circuit
Nest.js and invoke the underlying framework. For time reasons, I chose not to modify the underlying
Express.js `Response` object from Nest.js and hoped that my jurors would have pity on me.

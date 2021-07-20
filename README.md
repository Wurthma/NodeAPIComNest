## Description

API PetShop project with [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Basics of Nest

- Criando módulos usando CLI:
    - `nest generate module backoffice`

- Criando controller usando CLI:
    - `nest generate controller customer`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Dependencys

- joi for validations:
    - `npm install joi --save`
    - `npm install @hapi/joi --save-dev`

- Mongoose for MongoDB
    - `npm i --save @nestjs/mongoose mongoose`

- TypeORM with Postgres
    - `npm install --save @nestjs/typeorm typeorm pg`

- Passport to authenticate with JWT Bearer
    - `npm install --save @nestjs/passport passport passport-http-bearer`

## MongoDB & Docker
- The application makes use of MongoDB with docker. To install the latest version of mongodb with docker (latest) use the command:
	- `docker pull mongo`
- To create a container named mongodb, run the command below replacing the values of the `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` fields to the desired username and password.
	- `docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=dbuser -e MONGO_INITDB_ROOT_PASSWORD=myPassword mongo`
	- Command to stop execution: `docker stop mongodb`
	- To start the same container again: `docker start mongodb`

## Sensitive data
- For the application to work correctly it is necessary to create the src\secrets.ts file containing the sensitive data used by the application. The file must contain the following properties:

```typescript
export const GLOBAL_SECRETS = {
    mongodbUser: 'YourUser',
    mongodbPassword: 'YourPassword',
    mongodbHost: 'localhost',
    mongodbPort: '27017',
    mongodbDatabase: 'MongoDbName',
    postgresUser: 'YouPostgresUser',
    postgresPassword: 'YourPostgresPass',
    postgresHost: 'localhost',
    postgresPort: 5432,
    postgresDatabase: 'PostgresDbName',
    saltKey: 'SOME GUID SALT KEY'
}
```
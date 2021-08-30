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

- NestJS/config to save enviroments variables (relys on dotenv). Documentation: https://docs.nestjs.com/techniques/configuration
    - `npm i --save @nestjs/config`

- TypeORM with Postgres
    - `npm install --save @nestjs/typeorm typeorm pg`

- Passport to authenticate with JWT Bearer
    - `npm install --save @nestjs/passport passport passport-http-bearer`
    - `npm install --save @nestjs/jwt passport-jwt`

- Typescript Guid:
    - `npm i guid-typescript --save`

- MD5 to encrypt users password
    - `npm install md5-typescript --save`

- Cache manager
    - `npm install cache-manager --save`

- Data compression
    - `npm install compression --save`

## MongoDB & Docker
- The application makes use of MongoDB with docker. To install the latest version of mongodb with docker (latest) use the command:
	- `docker pull mongo`
- To create a container named mongodb, run the command below replacing the values of the `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` fields to the desired username and password.
	- `docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=dbuser -e MONGO_INITDB_ROOT_PASSWORD=myPassword mongo`
	- Command to stop execution: `docker stop mongodb`
	- To start the same container again: `docker start mongodb`

## Sensitive data
- For the application to work correctly it is necessary to use `.env` files containing the sensitive data used by the application. The file must contain the following properties:

```bash
MONGO_DB_USER=wurthmann
MONGO_DB_PASSWORD=5777308
MONGO_DB_HOST=localhost
MONGO_DB_PORT=27017
MONGO_DB_NAME=petshop
POSTGRES_USER=postgres
POSTGRES_PASSWORD=5777308
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB_NAME=petshop_store
SALT_KEY=SOME GUID SALT KEY
JWT_STRATEGY_KEY=ae3883bafe10
```

The suported `.env` files is in **app.module.ts**:

```typescript
envFilePath: ['.env', '.env.production', '.env.homolog', '.env.development', '.env.development.local'],
```
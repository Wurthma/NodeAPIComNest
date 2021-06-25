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
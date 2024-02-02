# JS API RESTFul test

This is a conceptual test that put into practice the following core technologies:

- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)


### 🎯 Goals

- Build an API RESTFul based on the JS ecosystem following the given statements.
- Dockerize the implementation.
- Add some **integration test** to check if everything is ok.

### 💡 Suggestions you may dig in

- Adopt TypeScript.
- Add unit tests.
- Protect routes (Authotization and Authentication).
- Prepare the implementation to be deployed.
- Adopt an event-driven approach or caching strategy.

## Assestment

Write an API that will be queried by two services: **X and Y services**.

The **X service** will need to keep in sync the list of Couriers in the platform as well as their max capacity (in liters).

````javascript
curl -X POST http://localhost:3000/couriers --data '
{
    "max_capacity": 45
}'
````

The **Y service** will need to query this API to find out which couriers do have available space.

````javascript
curl -X GET http://localhost:3000/couriers/lookup --data '
{
    "capacity_required": 45
}'
````

Write the API that will allow adding, removing and updating couriers' capacities, and that will let lookup a list of couriers whose capacity is greater or equal to the one required.

## How to run the project

The project requires [Node.js](https://nodejs.org/), [MongoDB](https://www.mongodb.com/), and [Docker](https://www.docker.com/) to run.

Clone the repository:

```shell
git clone https://github.com/christianjtr/{REPO_NAME_HERE}.git
```

Environment variables:

| Env. Var. | Value  |
|-------|--------|
| `NODE_ENV` | `development` or `test` |
| `SERVER_PORT` | `3001` |
| `API_VERSION` | `v1` |
| `SEED_MOCKED_DATA` | `true` or `false` |
| `MONGODB_HOST` | `localhost` |
| `MONGODB_PORT` | `27017` |
| `MONGODB_DB` | `<YOUR_DATABASE_NAME>` |

> You can modify the variables in accordance with your preferences at ***.env*** and ***.env.test*** files

###### Start the application

Initialize `Docker`, pulls down the images, creates, and builds the containers.

```shell
npm run app:start
```

###### Stop the application

Shut down the application.

```shell
npm run app:stop
```

###### Start server application (Non-dockerized version)

In order to run the application without using `Docker`, you will need to install **MongoDB Community Version: 4.4** in your OS System.

```shell
npm run server:start
```

###### Run test suites

There are two simple **integration tests** as an example.

```shell
npm test
```
> [!IMPORTANT]  
> Technologies:
> - [Jest](https://jestjs.io/)
> - [Supertest](https://www.npmjs.com/package/supertest)
> - [MongoDB Memory Server](https://www.npmjs.com/package/mongodb-memory-server)


## API Endpoints

Documentation was generated using [Swagger](https://swagger.io/) along with a `.yml` file having the API specs.

###### Parameters:

> Noticed that you can change these parameters in **.env** files

| Param | Value  |
|-------|--------|
| `host` | `localhost` |
| `port` | `3001` |
| `version` | `v1` |


###### Base URI:

````javascript
BaseURI: http://localhost:3001/api/v1/{resource}
````

#### API Docs

Swagger API Docs

````javascript
URI: {BaseURI}/docs
````

![](./assets/swagger_specs_demo.png)

#### Health checks
###### Example cURL

```javascript
$ curl --location 'http://localhost:3001/api/v1/health-checks/alive'
```

#### Couriers

Basic CRUD operations

````javascript
URI: {BaseURI}/couriers
````

##### Get all couriers
###### Example cURL
```javascript
$ curl --location 'http://localhost:3001/api/v1/couriers'
```

##### Get courier by ID
###### Example cURL
```javascript
$ curl --location 'http://localhost:3001/api/v1/couriers/65b93d111efb464a86c6d109'
```

##### Create courier
###### Example cURL
```javascript
$ curl --location 'http://localhost:3001/api/v1/couriers' \
--header 'Content-Type: application/json' \
--data '{
    "max_capacity": 100
}'
```

##### Update courier by ID
###### Example cURL
```javascript
$ curl --location --request PUT 'http://localhost:3001/api/v1/couriers/65b93d4e1afd3c4aab06a8d5' \
--header 'Content-Type: application/json' \
--data '{
    "max_capacity": 50
}'
```

##### Delete courier by ID
###### Example cURL
```javascript
$ curl --location --request DELETE 'http://localhost:3001/api/v1/couriers/65b93d92d1f6ff4ad25961c6'
```

#### Courier actions

````javascript
URI: {BaseURI}/couriers/lookup/:capacity_required
````

##### Lookup
Request data from this API to find out which couriers do have available space. (Greater or equals than the requested capacity)
###### Example cURL
```javascript
$ curl --location 'http://localhost:3001/api/v1/couriers/lookup/700'
```

## Technologies

ExpressJS, MongoDB, Docker, Jest, SupertTest.

# Assestment considerations

Environment variables are defined in these files:

- .env
- .env.example
- .env.produdction

These are the topics covered:

- Docker containerization (Docker-compose):
  - API Server (NodeJS/Express).
  - MongoDB Service.
- NodeJS API aspects
  - Mongoose (ODM).

# How to run the project

Note you should have installed these services:

- NodeJS (stable version).
- MongoDB (stable version).
- Docker.

Therefore, run these commands (Development mode):

```sh
$ npm install
$ npm run server:dev
```

Otherwise, run these commands (Docker):

```sh
$ docker-compose build
$ docker-compose up
```

Start by browsing to this direction:

- http://localhost:3001/api/v1/couriers

# API Definition

API RESTful design:

In order to follow the proposed REST's designing conventions, we have defined the resources as follow:

- Couriers:

  - Methods: GET, POST
    - /couriers
  - Methods: GET, PUT, DELETE
    - /couriers/:courierId

- Couriers management:
  - Methods: GET
    - /courier-management/lookup

### Comments

- If we use **/couriers/lookup** and **/couriers/:@queryParams** we are going to have problems when accessing the resource, because the definitions are overlapped and the word _lookup_ is interpreted like a proper query param used to access a member of the _courier collection_. Hence, a recommended design approach is to define it in another way for guaranteeing the access to the controller and to maintain a better REST design, So, we use **/courier-management/lookup**

# Considerations

- Race conditions are mostly handled by the DDBB itself when performing deadLocks, however, we could avoid some exceptions by using JS Locks/Barriers implementations, for instance with Mutex implementations.

# Implementation improvements

- Add an authentication middleware (JWT, Oauth, auth-headers, etc.) in order to secure critical CRUD operations (create, update, delete, other).
- Large projects often implement microservices strategies in order to balance the performance of backend operations (development of an API gateway to balance/cluster the queries and requests).
- Implementation of queuing systems like RabbitMQ.
- Implement a pusher technology strategy (socket communication, cron job, batch process)  in order to inform the Dispatcher service about any change in the capacities that are available at certain moments.
- In order to improve performance when querying, we can implement some caching policy (Redis, or other caching policy).

# Technical improvements

- Add git support.
- Add JS bundler (Webpack, parcel, etc.) and build in production mode.
- Add tests (Jest - @types/packages, Supertest - HTTP and implement a test DB).
- Add typescript support.

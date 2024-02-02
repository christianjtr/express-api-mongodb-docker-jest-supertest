/* eslint-disable no-console */
import HTTPStatus from 'http-status';
import supertest from 'supertest';
import app from '../../src';
import { connectDB, disconnectDB } from '../../__mocks__/db';
import CourierServices from '../../src/services/courier.service';
import { courier, collectionOfCouriers } from '../../src/database/fixtures/courier';

const agent = supertest(app);
const URI = `/api/${process.env.API_VERSION}/couriers`;

describe('Couriers endpoints', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('[GET] /couriers > should get all couriers', async () => {
    CourierServices.getCouriers = jest.fn().mockResolvedValue(collectionOfCouriers);

    const response = await agent.get(`${URI}`);

    expect(CourierServices.getCouriers).toHaveBeenCalled();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toMatchObject(collectionOfCouriers);
    expect(response.statusCode).toBe(HTTPStatus.OK);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  it('[GET] /couriers/:courierId > should get one courier', async () => {
    const { _id: courierId } = courier;
    CourierServices.getCourierById = jest.fn().mockResolvedValue(courier);

    const response = await agent.get(`${URI}/${courierId}`);

    expect(CourierServices.getCourierById).toHaveBeenCalledWith(courierId);
    expect(response.body).toMatchObject(courier);
    expect(response.statusCode).toBe(HTTPStatus.OK);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  it('[POST] /couriers > should create a courier', async () => {
    const payload = {
      max_capacity: 100,
    };

    const response = await agent.post(`${URI}`).send(payload);

    expect(response.body).toEqual(expect.objectContaining({
      _id: expect.any(String),
      max_capacity: payload.max_capacity,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      __v: expect.any(Number),
    }));
    expect(response.statusCode).toBe(HTTPStatus.CREATED);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  it('[POST] /couriers > sad path: should fail if payload is not correct', async () => {
    const payload = {
      max_capacity: '<WRONG_VALUE>',
    };

    CourierServices.create = jest.fn();

    const response = await agent.post(`${URI}`).send(payload);

    expect(CourierServices.create).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(HTTPStatus.INTERNAL_SERVER_ERROR);
  });

  it('[PUT] /couriers/:courierId > should update a courier', async () => {
    const { _id: courierId } = courier;
    const payload = {
      max_capacity: 100,
    };

    const updatedCourier = { ...courier, max_capacity: payload.max_capacity };

    CourierServices.updateById = jest.fn().mockResolvedValue(updatedCourier);

    const response = await agent.put(`${URI}/${courierId}`).send(payload);

    expect(CourierServices.updateById)
      .toHaveBeenCalledWith(courierId, { maxCapacity: payload.max_capacity });
    expect(response.body).toMatchObject(updatedCourier);
    expect(response.statusCode).toBe(HTTPStatus.OK);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  it('[DELETE] /couriers > should delete a courier', async () => {
    const { _id: courierId } = courier;
    CourierServices.deleteById = jest.fn().mockResolvedValue(courier);

    const response = await agent.delete(`${URI}/${courierId}`);

    expect(CourierServices.deleteById).toHaveBeenCalledWith(courierId);
    expect(response.statusCode).toBe(HTTPStatus.OK);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
});

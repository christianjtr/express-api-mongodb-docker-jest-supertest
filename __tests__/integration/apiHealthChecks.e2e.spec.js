/* eslint-disable no-console */
import HTTPStatus from 'http-status';
import supertest from 'supertest';
import app from '../../src';

const agent = supertest(app);
const URI = `/api/${process.env.API_VERSION}/health-checks`;

describe('Health checks endpoints', () => {
  it('[GET] should call /alive endpoint correctly', async () => {
    const response = await agent.get(`${URI}/alive`);

    expect(response.statusCode).toBe(HTTPStatus.OK);
    expect(response.body).toEqual(expect.objectContaining({
      uptime: expect.any(Number),
      message: expect.any(String),
      date: expect.any(String),
    }));
  });
});

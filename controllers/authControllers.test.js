import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app.js';
import config from '../environment.js';

const testData = {
  email: 'anton@mail.com',
  password: 'qwerty123',
};

const testMongoURI = config.HOST_DB;

beforeAll(async () => {
  // Connect to the test MongoDB database before running tests
  await mongoose.connect(testMongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from the test MongoDB database after running tests
  await mongoose.disconnect();
});

describe('POST /users/login', () => {
  test('should have a 200 status code', async () => {
    const response = await request(app).post('/api/users/login').send(testData);
    expect(response.statusCode).toBe(200);
  });

  test('should contain token', async () => {
    const response = await request(app).post('/api/users/login').send(testData);
    const data = JSON.parse(response.text);

    expect(data).toHaveProperty('token');
    expect(typeof data.token).toEqual('string');
    expect(data.token).not.toBe('');
  });

  test('should contain "user" object with two properties: "email" and "subscription" typeof String', async () => {
    const response = await request(app).post('/api/users/login').send(testData);
    const data = JSON.parse(response.text);

    expect(data).toHaveProperty('user');
    expect(data.user).toHaveProperty('email');
    expect(data.user).toHaveProperty('subscription');
    expect(typeof data.user.email).toEqual('string');
    expect(typeof data.user.subscription).toEqual('string');
    expect(data.user.email).not.toBe('');
    expect(data.user.subscription).not.toBe('');
  });
});

/**
 * Use command below when using ECMAScript Modules
 * NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest
 */

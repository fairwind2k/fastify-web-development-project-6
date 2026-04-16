// @ts-check

import fastify from 'fastify';
import init from '../server/plugin.js';
import { createUser } from './helpers/index.js';

describe('test session', () => {
  let app;
  let knex;

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    await knex('users').del();
  });

  afterAll(async () => {
    await app.close();
  });

  it('new session form', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newSession'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('sign in with valid credentials', async () => {
    const user = await createUser(app);

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: { data: { email: user.email, password: user.password } },
    });

    expect(response.statusCode).toBe(302);
    expect(response.cookies).toHaveLength(1);
  });

  it('sign in with invalid credentials', async () => {
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: { data: { email: 'wrong@example.com', password: 'wrongpass' } },
    });

    expect(response.statusCode).toBe(200);
  });

  it('sign out', async () => {
    const user = await createUser(app);

    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: { data: { email: user.email, password: user.password } },
    });

    const [sessionCookie] = responseSignIn.cookies;
    const cookie = { [sessionCookie.name]: sessionCookie.value };

    const responseSignOut = await app.inject({
      method: 'DELETE',
      url: app.reverse('session'),
      cookies: cookie,
    });

    expect(responseSignOut.statusCode).toBe(302);
  });
});

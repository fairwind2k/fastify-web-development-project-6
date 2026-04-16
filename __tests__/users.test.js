// @ts-check

import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import {
  buildUser, createUser, signIn,
} from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    await knex('users').del();
  });

  afterAll(async () => {
    await app.close();
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = buildUser();
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: { data: params },
    });

    expect(response.statusCode).toBe(302);
    const user = await models.user.query().findOne({ email: params.email });
    expect(user).toMatchObject({
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      passwordDigest: encrypt(params.password),
    });
  });

  it('edit', async () => {
    const user = await createUser(app);
    const cookie = await signIn(app, user);

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editUser', { id: user.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('edit - not authenticated', async () => {
    const user = await createUser(app);

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editUser', { id: user.id }),
    });

    expect(response.statusCode).toBe(302);
  });

  it('edit - access denied for another user', async () => {
    const user = await createUser(app);
    const otherUser = await createUser(app);
    const cookie = await signIn(app, user);

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editUser', { id: otherUser.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
  });

  it('update', async () => {
    const user = await createUser(app);
    const cookie = await signIn(app, user);
    const updatedData = buildUser({ email: user.email });

    const response = await app.inject({
      method: 'PATCH',
      url: `/users/${user.id}`,
      cookies: cookie,
      payload: { data: updatedData },
    });

    expect(response.statusCode).toBe(302);
    const updated = await models.user.query().findById(user.id);
    expect(updated.firstName).toBe(updatedData.firstName);
    expect(updated.lastName).toBe(updatedData.lastName);
  });

  it('update - access denied for another user', async () => {
    const user = await createUser(app);
    const otherUser = await createUser(app);
    const cookie = await signIn(app, user);

    const response = await app.inject({
      method: 'PATCH',
      url: `/users/${otherUser.id}`,
      cookies: cookie,
      payload: { data: buildUser() },
    });

    expect(response.statusCode).toBe(302);
    const notUpdated = await models.user.query().findById(otherUser.id);
    expect(notUpdated.firstName).toBe(otherUser.firstName);
  });

  it('delete - access denied for another user', async () => {
    const user = await createUser(app);
    const otherUser = await createUser(app);
    const cookie = await signIn(app, user);

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('user', { id: otherUser.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
    const notDeleted = await models.user.query().findById(otherUser.id);
    expect(notDeleted).toBeDefined();
  });

  it('delete', async () => {
    const user = await createUser(app);
    const cookie = await signIn(app, user);

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('user', { id: user.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
    const deleted = await models.user.query().findById(user.id);
    expect(deleted).toBeUndefined();

    // сессия очищена — запрос с теми же куки не должен падать с 500
    const responseAfterDelete = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
      cookies: cookie,
    });
    expect(responseAfterDelete.statusCode).toBe(200);
  });
});

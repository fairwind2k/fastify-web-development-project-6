// @ts-check

import fastify from 'fastify';

import init from '../server/plugin.js';
import { buildStatus, createStatus } from './helpers/index.js';

describe('test statuses CRUD', () => {
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
    await knex('statuses').del();
  });

  afterAll(async () => {
    await app.close();
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = buildStatus();
    const response = await app.inject({
      method: 'POST',
      url: '/statuses',
      payload: { data: params },
    });

    expect(response.statusCode).toBe(302);
    const status = await models.status.query().findOne({ name: params.name });
    expect(status).toBeDefined();
    expect(status.name).toBe(params.name);
  });

  it('create - invalid data (empty name)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/statuses',
      payload: { data: { name: '' } },
    });

    expect(response.statusCode).toBe(200);
    const status = await models.status.query().findOne({ name: '' });
    expect(status).toBeUndefined();
  });

  it('edit', async () => {
    const status = await createStatus(app);

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editStatus', { id: status.id }),
    });

    expect(response.statusCode).toBe(200);
  });

  it('update', async () => {
    const status = await createStatus(app);
    const newParams = buildStatus();

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('status', { id: status.id }),
      payload: { data: { name: newParams.name } },
    });

    expect(response.statusCode).toBe(302);
    const updated = await models.status.query().findById(status.id);
    expect(updated.name).toBe(newParams.name);
  });

  it('update - invalid data (empty name)', async () => {
    const status = await createStatus(app);

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('status', { id: status.id }),
      payload: { data: { name: '' } },
    });

    expect(response.statusCode).toBe(200);
    const notUpdated = await models.status.query().findById(status.id);
    expect(notUpdated.name).toBe(status.name);
  });

  it('delete', async () => {
    const status = await createStatus(app);

    const response = await app.inject({
      method: 'DELETE',
      url: `/statuses/${status.id}`,
    });

    expect(response.statusCode).toBe(302);
    const deleted = await models.status.query().findById(status.id);
    expect(deleted).toBeUndefined();
  });
});

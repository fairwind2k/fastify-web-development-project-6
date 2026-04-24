// @ts-check

import fastify from 'fastify';

import init from '../server/plugin.js';
import {
  buildLabel, createLabel, createUser, createStatus, createTask,
} from './helpers/index.js';

describe('test labels CRUD', () => {
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
    await knex('tasks_labels').del();
    await knex('tasks').del();
    await knex('statuses').del();
    await knex('users').del();
    await knex('labels').del();
  });

  afterAll(async () => {
    await app.close();
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('labels'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newLabel'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = buildLabel();
    const response = await app.inject({
      method: 'POST',
      url: '/labels',
      payload: { data: params },
    });

    expect(response.statusCode).toBe(302);
    const label = await models.label.query().findOne({ name: params.name });
    expect(label).toBeDefined();
    expect(label.name).toBe(params.name);
  });

  it('create - invalid data (empty name)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/labels',
      payload: { data: { name: '' } },
    });

    expect(response.statusCode).toBe(200);
    const label = await models.label.query().findOne({ name: '' });
    expect(label).toBeUndefined();
  });

  it('edit', async () => {
    const label = await createLabel(app);

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editLabel', { id: label.id }),
    });

    expect(response.statusCode).toBe(200);
  });

  it('update', async () => {
    const label = await createLabel(app);
    const newParams = buildLabel();

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('label', { id: label.id }),
      payload: { data: { name: newParams.name } },
    });

    expect(response.statusCode).toBe(302);
    const updated = await models.label.query().findById(label.id);
    expect(updated.name).toBe(newParams.name);
  });

  it('update - invalid data (empty name)', async () => {
    const label = await createLabel(app);

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('label', { id: label.id }),
      payload: { data: { name: '' } },
    });

    expect(response.statusCode).toBe(200);
    const notUpdated = await models.label.query().findById(label.id);
    expect(notUpdated.name).toBe(label.name);
  });

  it('delete', async () => {
    const label = await createLabel(app);

    const response = await app.inject({
      method: 'DELETE',
      url: `/labels/${label.id}`,
    });

    expect(response.statusCode).toBe(302);
    const deleted = await models.label.query().findById(label.id);
    expect(deleted).toBeUndefined();
  });

  it('delete - cannot delete label associated with a task', async () => {
    const user = await createUser(app);
    const status = await createStatus(app);
    const label = await createLabel(app);
    const task = await createTask(app, { statusId: status.id, creatorId: user.id });
    await knex('tasks_labels').insert({ task_id: task.id, label_id: label.id });

    const response = await app.inject({
      method: 'DELETE',
      url: `/labels/${label.id}`,
    });

    expect(response.statusCode).toBe(302);
    const notDeleted = await models.label.query().findById(label.id);
    expect(notDeleted).toBeDefined();
  });
});

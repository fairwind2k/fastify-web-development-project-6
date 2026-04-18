// @ts-check

import fastify from 'fastify';
import { faker } from '@faker-js/faker';

import init from '../server/plugin.js';
import {
  buildTask, createTask, createUser, createStatus, signIn,
} from './helpers/index.js';

describe('test tasks CRUD', () => {
  let app;
  let knex;
  let models;
  let user;
  let cookie;
  let status;

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
    await knex('tasks').del();
    await knex('statuses').del();
    await knex('users').del();
    user = await createUser(app);
    cookie = await signIn(app, user);
    status = await createStatus(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new - authenticated', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new - not authenticated', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
    });

    expect(response.statusCode).toBe(302);
  });

  it('create', async () => {
    const params = buildTask();
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      cookies: cookie,
      payload: { data: { ...params, statusId: status.id } },
    });

    expect(response.statusCode).toBe(302);
    const task = await models.task.query().findOne({ name: params.name });
    expect(task).toBeDefined();
    expect(task.name).toBe(params.name);
    expect(task.creatorId).toBe(user.id);
  });

  it('create - not authenticated', async () => {
    const params = buildTask();
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      payload: { data: { ...params, statusId: status.id } },
    });

    expect(response.statusCode).toBe(302);
    const task = await models.task.query().findOne({ name: params.name });
    expect(task).toBeUndefined();
  });

  it('create - invalid data (empty name)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      cookies: cookie,
      payload: { data: { name: '', statusId: status.id } },
    });

    expect(response.statusCode).toBe(200);
    const tasks = await models.task.query();
    expect(tasks).toHaveLength(0);
  });

  it('show', async () => {
    const task = await createTask(app, { statusId: status.id, creatorId: user.id });
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('task', { id: task.id }),
    });

    expect(response.statusCode).toBe(200);
  });

  it('edit - authenticated', async () => {
    const task = await createTask(app, { statusId: status.id, creatorId: user.id });
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editTask', { id: task.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('edit - not authenticated', async () => {
    const task = await createTask(app, { statusId: status.id, creatorId: user.id });
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editTask', { id: task.id }),
    });

    expect(response.statusCode).toBe(302);
  });

  it('update', async () => {
    const task = await createTask(app, { statusId: status.id, creatorId: user.id });
    const newName = faker.word.words();
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateTask', { id: task.id }),
      cookies: cookie,
      payload: { data: { name: newName, statusId: status.id } },
    });

    expect(response.statusCode).toBe(302);
    const updated = await models.task.query().findById(task.id);
    expect(updated.name).toBe(newName);
  });

  it('update - not authenticated', async () => {
    const task = await createTask(app, { statusId: status.id, creatorId: user.id });
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateTask', { id: task.id }),
      payload: { data: { name: faker.word.words(), statusId: status.id } },
    });

    expect(response.statusCode).toBe(302);
    const notUpdated = await models.task.query().findById(task.id);
    expect(notUpdated.name).toBe(task.name);
  });

  it('delete - by creator', async () => {
    const task = await createTask(app, { statusId: status.id, creatorId: user.id });
    const response = await app.inject({
      method: 'DELETE',
      url: `/tasks/${task.id}`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
    const deleted = await models.task.query().findById(task.id);
    expect(deleted).toBeUndefined();
  });

  it('delete - not creator', async () => {
    const otherUser = await createUser(app);
    const otherCookie = await signIn(app, otherUser);
    const task = await createTask(app, { statusId: status.id, creatorId: user.id });
    const response = await app.inject({
      method: 'DELETE',
      url: `/tasks/${task.id}`,
      cookies: otherCookie,
    });

    expect(response.statusCode).toBe(302);
    const notDeleted = await models.task.query().findById(task.id);
    expect(notDeleted).toBeDefined();
  });

  it('delete - not authenticated', async () => {
    const task = await createTask(app, { statusId: status.id, creatorId: user.id });
    const response = await app.inject({
      method: 'DELETE',
      url: `/tasks/${task.id}`,
    });

    expect(response.statusCode).toBe(302);
    const notDeleted = await models.task.query().findById(task.id);
    expect(notDeleted).toBeDefined();
  });
});

// @ts-check

import fastify from 'fastify';

import init from '../server/plugin.js';
import {
  createTask, createUser, createStatus, createLabel, signIn,
} from './helpers/index.js';

describe('test tasks filter', () => {
  let app;
  let knex;
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
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    await knex('tasks_labels').del();
    await knex('tasks').del();
    await knex('labels').del();
    await knex('statuses').del();
    await knex('users').del();
    user = await createUser(app);
    cookie = await signIn(app, user);
    status = await createStatus(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('filter by status', async () => {
    const otherStatus = await createStatus(app);
    const task1 = await createTask(app, { statusId: status.id, creatorId: user.id, name: 'status-match-task-aaa' });
    const task2 = await createTask(app, { statusId: otherStatus.id, creatorId: user.id, name: 'status-other-task-zzz' });

    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks')}?status=${status.id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain(task1.name);
    expect(response.body).not.toContain(task2.name);
  });

  it('filter by executor', async () => {
    const otherUser = await createUser(app);
    const task1 = await createTask(app, {
      statusId: status.id, creatorId: user.id, executorId: user.id, name: 'executor-match-task-aaa',
    });
    const task2 = await createTask(app, {
      statusId: status.id, creatorId: user.id, executorId: otherUser.id, name: 'executor-other-task-zzz',
    });

    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks')}?executor=${otherUser.id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain(task2.name);
    expect(response.body).not.toContain(task1.name);
  });

  it('filter by label', async () => {
    const label = await createLabel(app);
    const task1 = await createTask(app, { statusId: status.id, creatorId: user.id, name: 'labeled-unique-task-aaa' });
    const task2 = await createTask(app, { statusId: status.id, creatorId: user.id, name: 'unlabeled-unique-task-zzz' });

    await knex('tasks_labels').insert({ task_id: task1.id, label_id: label.id });

    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks')}?label=${label.id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain(task1.name);
    expect(response.body).not.toContain(task2.name);
  });

  it('filter by isCreatorUser - authenticated', async () => {
    const otherUser = await createUser(app);
    const task1 = await createTask(app, { statusId: status.id, creatorId: user.id, name: 'my-unique-task-aaa' });
    const task2 = await createTask(app, { statusId: status.id, creatorId: otherUser.id, name: 'other-unique-task-zzz' });

    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks')}?isCreatorUser=on`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain(task1.name);
    expect(response.body).not.toContain(task2.name);
  });

  it('filter by isCreatorUser - not authenticated', async () => {
    const otherUser = await createUser(app);
    const task1 = await createTask(app, { statusId: status.id, creatorId: user.id });
    const task2 = await createTask(app, { statusId: status.id, creatorId: otherUser.id });

    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks')}?isCreatorUser=on`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain(task1.name);
    expect(response.body).toContain(task2.name);
  });

  it('filter by status and executor combined', async () => {
    const otherStatus = await createStatus(app);
    const otherUser = await createUser(app);
    const task1 = await createTask(app, {
      statusId: status.id, creatorId: user.id, executorId: user.id, name: 'combined-match-task-aaa',
    });
    const task2 = await createTask(app, {
      statusId: status.id, creatorId: user.id, executorId: otherUser.id, name: 'combined-other-exec-zzz',
    });
    const task3 = await createTask(app, {
      statusId: otherStatus.id, creatorId: user.id, executorId: user.id, name: 'combined-other-status-yyy',
    });

    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks')}?status=${status.id}&executor=${user.id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain(task1.name);
    expect(response.body).not.toContain(task2.name);
    expect(response.body).not.toContain(task3.name);
  });
});

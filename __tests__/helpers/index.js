// @ts-nocheck

import { faker } from '@faker-js/faker';
import encrypt from '../../server/lib/secure.cjs';

export const buildUser = (params = {}) => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 10 }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  ...params,
});

export const buildStatus = (params = {}) => ({
  name: faker.word.noun(),
  ...params,
});

export const createUser = async (app, params = {}) => {
  const { knex } = app.objection;
  const userData = buildUser(params);
  await knex('users').insert({
    email: userData.email,
    password_digest: encrypt(userData.password),
    first_name: userData.firstName,
    last_name: userData.lastName,
  });
  const user = await app.objection.models.user.query().findOne({ email: userData.email });
  return { ...userData, id: user.id };
};

export const createStatus = async (app, params = {}) => {
  const { knex } = app.objection;
  const statusData = buildStatus(params);
  await knex('statuses').insert({ name: statusData.name });
  const status = await app.objection.models.status.query().findOne({ name: statusData.name });
  return { ...statusData, id: status.id };
};

export const buildLabel = (params = {}) => ({
  name: faker.word.noun(),
  ...params,
});

export const createLabel = async (app, params = {}) => {
  const { knex } = app.objection;
  const labelData = buildLabel(params);
  await knex('labels').insert({ name: labelData.name });
  const label = await app.objection.models.label.query().findOne({ name: labelData.name });
  return { ...labelData, id: label.id };
};

export const buildTask = (params = {}) => ({
  name: faker.word.words(),
  description: faker.lorem.sentence(),
  ...params,
});

export const createTask = async (app, { statusId, creatorId, executorId = null, ...params } = {}) => {
  const { knex } = app.objection;
  const taskData = buildTask(params);
  const [id] = await knex('tasks').insert({
    name: taskData.name,
    description: taskData.description,
    status_id: statusId,
    creator_id: creatorId,
    executor_id: executorId,
  });
  return { ...taskData, id, statusId, creatorId, executorId };
};

export const signIn = async (app, { email, password }) => {
  const response = await app.inject({
    method: 'POST',
    url: app.reverse('session'),
    payload: { data: { email, password } },
  });
  const [sessionCookie] = response.cookies;
  const { name, value } = sessionCookie;
  return { [name]: value };
};

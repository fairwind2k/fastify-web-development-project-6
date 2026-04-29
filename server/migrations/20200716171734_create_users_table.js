// @ts-nocheck

export const up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id').primary();
  table.string('email').unique();
  table.string('password_digest');
  table.string('first_name').defaultTo('');
  table.string('last_name').defaultTo('');
  table.timestamps(true, true);
});

export const down = (knex) => knex.schema.dropTable('users');

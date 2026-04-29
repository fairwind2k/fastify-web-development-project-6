// @ts-nocheck

export const up = (knex) => knex.schema.createTable('tasks', (table) => {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.text('description');
  table.integer('status_id').references('statuses.id').notNullable();
  table.integer('creator_id').references('users.id').notNullable();
  table.integer('executor_id').references('users.id');
  table.timestamps(true, true);
});

export const down = (knex) => knex.schema.dropTable('tasks');

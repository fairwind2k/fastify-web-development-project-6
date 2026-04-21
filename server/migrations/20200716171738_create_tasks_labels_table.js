// @ts-nocheck

export const up = (knex) => knex.schema.createTable('tasks_labels', (table) => {
  table.integer('task_id').references('id').inTable('tasks').notNullable();
  table.integer('label_id').references('id').inTable('labels').notNullable();
});

export const down = (knex) => knex.schema.dropTable('tasks_labels');


const { Model } = require('objection');
const BaseModel = require('./BaseModel.cjs');

module.exports = class Label extends BaseModel {
  static get tableName() {
    return 'labels';
  }

  static get relationMappings() {
    const Task = require('./Task.cjs');
    return {
      tasks: {
        relation: Model.ManyToManyRelation,
        modelClass: Task,
        join: {
          from: 'labels.id',
          through: {
            from: 'tasks_labels.label_id',
            to: 'tasks_labels.task_id',
          },
          to: 'tasks.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
      },
    };
  }
}
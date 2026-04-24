import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const {
        status, executor, label, isCreatorUser,
      } = req.query;

      let tasksQuery = app.objection.models.task.query().withGraphFetched('[status, creator, executor]');

      if (status) {
        tasksQuery = tasksQuery.where('tasks.status_id', status);
      }
      if (executor) {
        tasksQuery = tasksQuery.where('tasks.executor_id', executor);
      }
      if (label) {
        tasksQuery = tasksQuery.whereExists(
          app.objection.models.task.relatedQuery('labels').where('labels.id', label),
        );
      }
      if (isCreatorUser && req.user) {
        tasksQuery = tasksQuery.where('tasks.creator_id', req.user.id);
      }

      const [tasks, statuses, users, labels] = await Promise.all([
        tasksQuery,
        app.objection.models.status.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
      ]);

      reply.render('tasks/index', {
        tasks, statuses, users, labels, filterValues: req.query,
      });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const [statuses, users, labels] = await Promise.all([
        app.objection.models.status.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
      ]);
      reply.render('tasks/new', {
        task, statuses, users, labels,
      });
      return reply;
    })
    .get('/tasks/:id', { name: 'task' }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id).withGraphFetched('[status, creator, executor, labels]');
      reply.render('tasks/show', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask', preValidation: app.authenticate }, async (req, reply) => {
      const [task, statuses, users, labels] = await Promise.all([
        app.objection.models.task.query().findById(req.params.id).withGraphFetched('[labels]'),
        app.objection.models.status.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
      ]);
      reply.render('tasks/edit', {
        task, statuses, users, labels,
      });
      return reply;
    })
    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const {
        statusId, executorId, labelIds, ...rest
      } = req.body.data;
      const data = {
        ...rest,
        statusId: Number(statusId),
        executorId: executorId ? Number(executorId) : undefined,
        creatorId: req.user.id,
      };
      task.$set(data);

      try {
        const validTask = await app.objection.models.task.fromJson(data);
        const insertedTask = await app.objection.models.task.query().insert(validTask);
        if (labelIds) {
          const ids = [labelIds].flat().map(Number);
          await Promise.all(ids.map((id) => insertedTask.$relatedQuery('labels').relate(id)));
        }
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data: errors }) {
        const [statuses, users, labels] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
          app.objection.models.label.query(),
        ]);
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task, statuses, users, labels, errors,
        });
      }

      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id);

      const {
        statusId, executorId, labelIds, ...rest
      } = req.body.data;
      const patchData = {
        ...rest,
        statusId: Number(statusId),
        executorId: executorId ? Number(executorId) : undefined,
      };

      try {
        await task.$query().patchAndFetch(patchData);
        await task.$relatedQuery('labels').unrelate();
        if (labelIds) {
          const ids = [labelIds].flat().map(Number);
          await Promise.all(ids.map((id) => task.$relatedQuery('labels').relate(id)));
        }
        req.flash('info', i18next.t('flash.tasks.update.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data: errors }) {
        const [statuses, users, labels] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
          app.objection.models.label.query(),
        ]);
        req.flash('error', i18next.t('flash.tasks.update.error'));
        reply.render('tasks/edit', {
          task, statuses, users, labels, errors,
        });
      }

      return reply;
    })
    .delete('/tasks/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id);
      if (task.creatorId !== req.user.id) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      }
      await task.$query().delete();
      req.flash('info', i18next.t('flash.tasks.delete.success'));
      reply.redirect(app.reverse('tasks'));
      return reply;
    });
};

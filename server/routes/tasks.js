import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.objection.models.task.query().withGraphFetched('[status, creator, executor]');
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/new', { task, statuses, users });
      return reply;
    })
    .get('/tasks/:id', { name: 'task' }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id).withGraphFetched('[status, creator, executor]');
      reply.render('tasks/show', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id);
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/edit', { task, statuses, users });
      return reply;
    })
    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const { statusId, executorId, ...rest } = req.body.data;
      const data = {
        ...rest,
        statusId: Number(statusId),
        executorId: executorId ? Number(executorId) : undefined,
        creatorId: req.user.id,
      };
      task.$set(data);

      try {
        const validTask = await app.objection.models.task.fromJson(data);
        await app.objection.models.task.query().insert(validTask);
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data: errors }) {
        const statuses = await app.objection.models.status.query();
        const users = await app.objection.models.user.query();
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', { task, statuses, users, errors });
      }

      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id);

      const { statusId, executorId, ...rest } = req.body.data;
      const patchData = {
        ...rest,
        statusId: Number(statusId),
        executorId: executorId ? Number(executorId) : undefined,
      };

      try {
        await task.$query().patchAndFetch(patchData);
        req.flash('info', i18next.t('flash.tasks.update.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data: errors }) {
        const statuses = await app.objection.models.status.query();
        const users = await app.objection.models.user.query();
        req.flash('error', i18next.t('flash.tasks.update.error'));
        reply.render('tasks/edit', { task, statuses, users, errors });
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

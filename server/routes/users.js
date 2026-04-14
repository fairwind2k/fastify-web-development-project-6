
import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })
    .get('/users/:id/edit', { name: 'editUser', preValidation: app.authenticate }, async (req, reply) => {
      if (req.user.id !== Number(req.params.id)) {
        req.flash('error', i18next.t('flash.accessDenied'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      const user = await app.objection.models.user.query().findById(req.params.id);
      reply.render('users/edit', { user });
      return reply;
    })
    .patch('/users/:id', { preValidation: app.authenticate }, async (req, reply) => {
      if (req.user.id !== Number(req.params.id)) {
        req.flash('error', i18next.t('flash.accessDenied'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      const user = await app.objection.models.user.query().findById(req.params.id);

      try {
        await user.$query().patchAndFetch(req.body.data);
        req.flash('info', i18next.t('flash.users.update.success'));
        reply.redirect(app.reverse('users'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.update.error'));
        reply.render('users/edit', { user, errors: data });
      }

      return reply;
    })
    .delete('/users/:id', { name: 'user', preValidation: app.authenticate }, async (req, reply) => {
      if (req.user.id !== Number(req.params.id)) {
        req.flash('error', i18next.t('flash.accessDenied'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      await app.objection.models.user.query().deleteById(req.params.id);
      req.flash('info', i18next.t('flash.users.delete.success'));
      reply.redirect(app.reverse('users'));
      return reply;
    });
};

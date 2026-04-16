// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          error: 'Не удалось обновить пользователя',
          success: 'Пользователь успешно обновлён',
        },
        delete: {
          success: 'Пользователь успешно удалён',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус',
          success: 'Статус успешно создан',
        },
        update: {
          error: 'Не удалось обновить статус',
          success: 'Статус успешно обновлён',
        },
        delete: {
          success: 'Статус успешно удалён',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      accessDenied: 'Вы можете редактировать или удалять только свой аккаунт',
    },
    layouts: {
      application: {
        statuses: 'Статусы',
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      statuses: {
        index: {
          title: 'Статусы',
        },
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        actions: 'Действия',
        new: {
          title: 'Создать статус',
          link: 'Создать статус',
          submit: 'Создать',
        },
        edit: {
          title: 'Редактирование статуса',
          submit: 'Сохранить',
          link: 'Редактировать',
        },
        delete: {
          link: 'Удалить',
        },
      },
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        index: {
          title: 'Пользователи',
        },
        id: 'ID',
        email: 'Email',
        fullName: 'Полное имя',
        firstName: 'Имя',
        lastName: 'Фамилия',
        password: 'Пароль',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        actions: 'Действия',
        edit: {
          title: 'Редактирование пользователя',
          submit: 'Сохранить',
          link: 'Изменить',
        },
        delete: {
          link: 'Удалить',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
    },
  },
};

// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    errors: {
      required: 'Не может быть пустым',
    },
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
          error: 'Не удалось удалить пользователя',
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
          error: 'Не удалось удалить статус',
        },
      },
      tasks: {
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача успешно создана',
        },
        update: {
          error: 'Не удалось обновить задачу',
          success: 'Задача успешно обновлена',
        },
        delete: {
          success: 'Задача успешно удалена',
          error: 'Задачу может удалить только её создатель',
        },
      },
      labels: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка успешно создана',
        },
        update: {
          error: 'Не удалось обновить метку',
          success: 'Метка успешно обновлена',
        },
        delete: {
          success: 'Метка успешно удалена',
          error: 'Не удалось удалить метку',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      accessDenied: 'Вы можете редактировать или удалять только свой аккаунт',
    },
    layouts: {
      application: {
        tasks: 'Задачи',
        statuses: 'Статусы',
        labels: 'Метки',
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
      tasks: {
        index: {
          title: 'Задачи',
        },
        id: 'ID',
        name: 'Наименование',
        description: 'Описание',
        status: 'Статус',
        author: 'Автор',
        executor: 'Исполнитель',
        labels: 'Метки',
        createdAt: 'Дата создания',
        actions: 'Действия',
        filter: {
          label: 'Метка',
          isCreatorUser: 'Только мои задачи',
          submit: 'Показать',
        },
        new: {
          title: 'Создание задачи',
          link: 'Создать задачу',
          submit: 'Создать',
        },
        edit: {
          title: 'Изменение задачи',
          submit: 'Изменить',
          link: 'Редактировать',
        },
        delete: {
          link: 'Удалить',
        },
        show: {
          link: 'Просмотр',
        },
      },
      labels: {
        index: {
          title: 'Метки',
        },
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        actions: 'Действия',
        new: {
          title: 'Создать метку',
          link: 'Создать метку',
          submit: 'Создать',
        },
        edit: {
          title: 'Редактирование метки',
          submit: 'Сохранить',
          link: 'Редактировать',
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

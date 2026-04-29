### Hexlet tests and linter status:
[![Actions Status](https://github.com/fairwind2k/fastify-web-development-project-6/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/fairwind2k/fastify-web-development-project-6/actions)

https://fastify-web-development-project-6-cenm.onrender.com

---

## RU

Веб-приложение для управления задачами. Позволяет создавать задачи, назначать исполнителей, присваивать статусы и метки, фильтровать задачи по параметрам.

Стек: Fastify, Objection.js, Knex, Pug, Bootstrap, SQLite / PostgreSQL.

**Требования:** Node.js >= 16, SQLite

> [!IMPORTANT]
> Проект использует устаревшие зависимости с конфликтами peer deps. Установка через `npm install` завершится ошибкой — используйте `--legacy-peer-deps`. Это уже учтено в `make setup`.

```bash
make setup   # установка зависимостей, копирование .env, миграции
make start   # запуск сервера и сборки фронтенда
```

Заполните `.env` перед запуском:

```
SESSION_KEY=<случайная строка 32+ символа>
ROLLBAR_ACCESS_TOKEN=<токен>
ROLLBAR_ENVIRONMENT=development
```

Другие команды:

```bash
make lint    # проверка кода
make test    # запуск тестов
make build   # сборка фронтенда
```

---

## EN

Task management web application. Allows creating tasks, assigning executors, setting statuses and labels, filtering tasks by parameters.

Stack: Fastify, Objection.js, Knex, Pug, Bootstrap, SQLite / PostgreSQL.

**Requirements:** Node.js >= 16, SQLite

> [!IMPORTANT]
> The project uses legacy dependencies with peer dependency conflicts. Running `npm install` will fail — use `--legacy-peer-deps`. This is already handled by `make setup`.

```bash
make setup   # install dependencies, copy .env, run migrations
make start   # start server and frontend build
```

Fill in `.env` before starting:

```
SESSION_KEY=<random string 32+ chars>
ROLLBAR_ACCESS_TOKEN=<token>
ROLLBAR_ENVIRONMENT=development
```

Other commands:

```bash
make lint    # lint code
make test    # run tests
make build   # build frontend
```

// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        update: {
          error: 'Failed to update user',
          success: 'User updated successfully',
        },
        delete: {
          success: 'User deleted successfully',
          error: 'Failed to delete user',
        },
      },
      statuses: {
        create: {
          error: 'Failed to create status',
          success: 'Status created successfully',
        },
        update: {
          error: 'Failed to update status',
          success: 'Status updated successfully',
        },
        delete: {
          success: 'Status deleted successfully',
          error: 'Failed to delete status',
        },
      },
      tasks: {
        create: {
          error: 'Failed to create task',
          success: 'Task created successfully',
        },
        update: {
          error: 'Failed to update task',
          success: 'Task updated successfully',
        },
        delete: {
          success: 'Task deleted successfully',
          error: 'Only the creator can delete a task',
        },
      },
      authError: 'Access denied! Please login',
      accessDenied: 'You can only edit or delete your own account',
    },
    layouts: {
      application: {
        tasks: 'Tasks',
        statuses: 'Statuses',
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
    },
    views: {
      statuses: {
        index: {
          title: 'Statuses',
        },
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        actions: 'Actions',
        new: {
          title: 'Create status',
          link: 'Create status',
          submit: 'Create',
        },
        edit: {
          title: 'Edit status',
          submit: 'Save',
          link: 'Edit',
        },
        delete: {
          link: 'Delete',
        },
      },
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        index: {
          title: 'Users',
        },
        id: 'ID',
        email: 'Email',
        fullName: 'Full name',
        firstName: 'First name',
        lastName: 'Last name',
        password: 'Password',
        createdAt: 'Created at',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
        actions: 'Actions',
        edit: {
          title: 'Edit user',
          submit: 'Save',
          link: 'Edit',
        },
        delete: {
          link: 'Delete',
        },
      },
      tasks: {
        index: {
          title: 'Tasks',
        },
        id: 'ID',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        author: 'Author',
        executor: 'Executor',
        createdAt: 'Created at',
        actions: 'Actions',
        new: {
          title: 'Create task',
          link: 'Create task',
          submit: 'Create',
        },
        edit: {
          title: 'Edit task',
          submit: 'Save',
          link: 'Edit',
        },
        delete: {
          link: 'Delete',
        },
        show: {
          link: 'View',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
    },
  },
};

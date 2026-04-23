// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    errors: {
      required: "Can't be blank",
    },
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
      labels: {
        create: {
          error: 'Failed to create label',
          success: 'Label created successfully',
        },
        update: {
          error: 'Failed to update label',
          success: 'Label updated successfully',
        },
        delete: {
          success: 'Label deleted successfully',
          error: 'Failed to delete label',
        },
      },
      authError: 'Access denied! Please login',
      accessDenied: 'You can only edit or delete your own account',
    },
    layouts: {
      application: {
        tasks: 'Tasks',
        statuses: 'Statuses',
        labels: 'Labels',
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
        labels: 'Labels',
        createdAt: 'Created at',
        actions: 'Actions',
        filter: {
          label: 'Label',
          isCreatorUser: 'Only my tasks',
          submit: 'Show',
        },
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
      labels: {
        index: {
          title: 'Labels',
        },
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        actions: 'Actions',
        new: {
          title: 'Create label',
          link: 'Create label',
          submit: 'Create',
        },
        edit: {
          title: 'Edit label',
          submit: 'Save',
          link: 'Edit',
        },
        delete: {
          link: 'Delete',
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

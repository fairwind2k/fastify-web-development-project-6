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
        },
      },
      authError: 'Access denied! Please login',
      accessDenied: 'You can only edit or delete your own account',
    },
    layouts: {
      application: {
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

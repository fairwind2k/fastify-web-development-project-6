import Rollbar from 'rollbar';

const rollbar = process.env.ROLLBAR_ACCESS_TOKEN
  ? new Rollbar({
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      code_version: '1.0.0',
    },
    environment: process.env.ROLLBAR_ENVIRONMENT,
  })
  : { log: () => {}, info: () => {}, warn: () => {}, error: () => {}, critical: () => {} };

export default rollbar;

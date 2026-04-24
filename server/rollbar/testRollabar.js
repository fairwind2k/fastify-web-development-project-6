import rollbar from './rollbar.js';

// Send a test message on startup
rollbar.log('Hello world!');

// Or trigger a test error
rollbar.error('Test error from Node.js');

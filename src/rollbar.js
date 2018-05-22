import Rollbar from 'rollbar';

// Track error by rollbar.com
if (location.host === 'app.ibankmatch.com') {
  Rollbar.init({
    accessToken: '563c06e855f44dc89a14a321df0567be',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}

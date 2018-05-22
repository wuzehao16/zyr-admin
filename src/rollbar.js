import Rollbar from 'rollbar';

// Track error by rollbar.com
if (location.host === 'app.ibankmatch.com') {
  Rollbar.init({
    accessToken: 'b1bae8b02bd8478baff2b26f691580ee',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}

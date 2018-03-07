/* eslint-disable max-len */
if (process.env.BROWSER) {
  throw new Error(
    'Security risk! you should never import `config.js` in to the client-side code.',
  );
}

const config = {
  port: process.env.PORT || 3000,
  api: {
    clientUrl: process.env.API_CLIENT_URL || '',
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },
  analytics: {
    googleTrackingId: process.env.GOOGLE_TRACKING_ID || '',
  },
};

export default config;

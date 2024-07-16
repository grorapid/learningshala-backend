module.exports = {
    apps: [
      {
        name: 'skollege-cms', // Your project name
        script: 'npm', // For this example we're using npm, could also be yarn
        args: 'start:server', // Script to start the Strapi server, `start` by default,
        watch: false,
        instances: 2,
        autorestart: true,
        kill_timeout: 4000,
        env: {
          NODE_ENV: 'development',
          APP_ENV: 'development',
        },
        ignore_watch: ['node_modules'],
      },
    ],
  };

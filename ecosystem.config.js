const {
  name,
  main: script
} = require('./package');

const os = require('os');

console.log(`starting app with ${os.cpus().length} cpu`);

module.exports = {
  apps: [{
      name,
      script,
      instances : 'all',
      exec_mode : 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      kill_timeout : 3000,
      env: {
        NODE_ENV: 'production'
      }
  }]
};
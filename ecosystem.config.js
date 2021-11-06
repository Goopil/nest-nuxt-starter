const {
  name,
  main: script
} = require('./package');

const {
    CLUSTER_MODE ='false'
} = process.env;

const isClusterMode = CLUSTER_MODE === 'true'

if (isClusterMode) {
    const os = require('os');
    console.log(`starting app in multi threaded mode. Using ${os.cpus().length} cpus`);
} else {
    console.log(`starting app in single threaded mode.`);
}

module.exports = {
  apps: [{
      name,
      script,
      instances : isClusterMode ? '0' : '1',
      exec_mode : isClusterMode ? 'cluster' : 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      kill_timeout : 3000,
      env: {
        NODE_ENV: 'production'
      }
  }]
};

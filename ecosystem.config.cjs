module.exports = {
  apps: [
    {
      name: 'front-service',
      script: '.output/server/index.mjs',
      exec_mode: 'cluster',
      instances: 'max',
      port: 5000
    }
  ]
}
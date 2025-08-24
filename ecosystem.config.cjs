module.exports = {
  apps: [
    {
      name: 'abyarsanat-front-service',
      script: '.output/server/index.mjs',
      exec_mode: 'cluster',
      instances: 'max',
      port: 4400
    }
  ]
}
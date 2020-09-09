module.exports = {
  apps: [
    {
      name: 'Express API Template',
      script: './bin/www',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: [
        'node_modules',
        'storage',
        'bin',
        '.vscode',
        '.git'
      ],
      max_memory_restart: '1G',
      exp_backoff_restart_delay: 100,
      log_date_format: 'MM-DD-YYYY HH:mm:ss'
    }
  ]
}

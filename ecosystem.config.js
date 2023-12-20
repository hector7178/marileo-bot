module.exports = {
  apps : [{
    script: 'npm start'}],

  deploy : {
    production : {
      key: "marileo.pem",
      user : 'ubuntu',
      host : '18.230.95.57',
      ref  : 'origin/main',
      repo : 'https://github.com/hector7178/marileo-bot.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : '. ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh-options':'ForwardAgent=yes'
    }
  }
};

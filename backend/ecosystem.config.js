require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  DEPLOY_REPO,
  PORT,
  JWT_SECRET,
  DB_ADDRESS,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
    env_production: {
      NODE_ENV: 'production',
      PORT,
      JWT_SECRET,
      DB_ADDRESS,
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000,
      JWT_SECRET: 'some-secret-key',
      DB_ADDRESS: 'mongodb://127.0.0.1:27017/mestodb',
    },
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd backend/ && npm i && npm run build && pm2 kill && pm2 start ecosystem.config.js && pm2 save',
    },
  },
};

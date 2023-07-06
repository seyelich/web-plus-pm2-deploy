require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/seyelich/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy': `cd frontend/ && npm i && npm run build && cp -r ./build/* ${DEPLOY_PATH}`,
    },
  },
};
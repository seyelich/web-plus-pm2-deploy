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
      'pre-deploy-local': 'npm run build',
      'post-deploy': `mkdir ${DEPLOY_PATH} && scp -Cr ./build/* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
    },
  },
};
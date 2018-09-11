import { execute } from './server/mongo.js';
const CronJob = require('cron').CronJob;
const job = new CronJob('0 */1 * * * *', function () {
  try {
    execute();
  } catch (error) {
    console.log(error);
  }
});
job.start();

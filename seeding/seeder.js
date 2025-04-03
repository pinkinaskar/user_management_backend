'use strict';
const chalk = require('chalk');
const log = console.log;
const { Seeder } = require('mongo-seeding');
const path = require('path');
// const dbConfig = require('../../../config/db.config');
require('dotenv').config();
const seederPath = path.resolve(__dirname, '../database/seeder/');

const config = {
  database: process.env.DB_CONNECTION_URL,
  inputPath: seederPath,
  dropDatabase: false,
  dropCollections: true,
  databaseReconnectTimeout: 100000
};

log(chalk.white.bgGreen.bold('✔ Seeding process started'));
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(seederPath);
log(chalk.white.bgGreen.bold('✔ Reading collections file done.'));

const main = async () => {
  try {
    await seeder.import(collections);
    log(chalk.white.bgGreen.bold('✔ Seed complete!'));
    process.exit(0);
  } catch (err) {
    log(err)
    log(chalk.white.bgGreen.bold('✘ Seeding process failed to finished'));
    process.exit(0);
  }
};

main();

const pool = require('../models/pool.js')

const qs = require('./queries.js')

const yeet = pool.pool

const executeQueryArray = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await yeet.query(q)
    if (index + 1 === stop) resolve();
  });
});

const dropTables = () => executeQueryArray([qs.dropMessagesTable]);
const createTables = () => executeQueryArray([qs.createMessageTable]);
const insertIntoTables = () => executeQueryArray([qs.insertMessages]);

module.exports = {
  dropTables,
  createTables,
  insertIntoTables
}

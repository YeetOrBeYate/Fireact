const pg = require('pg');
require('dotenv').config()
//or native libpq bindings
//var pg = require('pg').native
const pool = require('../models/pool.js')
const realpool = pool.pool
var conString = process.env.CONNECTION //Can be found in the Details page
var client = new pg.Client(conString);
// client.connect(function (err) {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function (err, result) {
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });

const handle = async () => {
  const { rows } = await realpool.query('SELECT NOW() AS "theTime"')
}

try {
  handle()
} catch (error) {
  console.log(error)
}

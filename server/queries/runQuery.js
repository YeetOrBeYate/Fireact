const run = require('./queryFunctions.js')

const runThem = async () => {
  await run.createTables()
  await run.insertIntoTables()
}


runThem()

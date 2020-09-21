const pool = require('./pool.js')

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;

  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.client.query(query)
  }

  async insertWithReturnId(columns, values) {
    const query = `
            INSERT INTO ${this.table}(${columns})
            VALUES (${values})
            RETURNING id
        `;
    return this.pool.client.query(query)
  }
}

module.exports = Model

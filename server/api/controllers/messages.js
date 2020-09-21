const pool = require('../../models/pool.js')


const insert = async (columns, values) => {
  const query = `
            INSERT INTO messages(${columns})
            VALUES (${values})
            RETURNING id
        `;
  return pool.client.query(query)
}

const messagesPage = async (req, res, next) => {
  try {
    const data = await pool.pool.query('SELECT * FROM messages')
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({message: 'no messages brother'})
  }
};

const addMessage = async (req, res, next) => {
  const { name, message } = req.body;
  const columns = 'name, message';
  const values = `'${name}', '${message}'`;
  const query = `
            INSERT INTO messages(${columns})
            VALUES (${values})
            RETURNING id
        `;

  try {
    const data = await pool.pool.query(query)
    res.status(201).json({ messages: data.rows });
  } catch (err) {
    console.log('not the thing', err)
  }
};

module.exports = {
  messagesPage,
  addMessage
}

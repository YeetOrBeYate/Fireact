const pool = require('../../models/pool.js')

const messagesPage = async (req, res, next) => {
  try {
    const data = await pool.pool.query('SELECT * FROM messages')
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(400).json({message: 'no messages brother'})
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
    res.status(401).json({ message: 'bad request' })
  }
};

module.exports = {
  messagesPage,
  addMessage
}

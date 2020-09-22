const pool = require('../../models/pool.js')
const sendNotificationToClient = require('../../notify.js')

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

    const tokens = ['dXy_EfcQ80Fg7zWLA6CIch:APA91bEe1oQRhSPv-Gefyc9jdJ6GwK5Pyo7SOQ5aXavGfB9VD1jNADwPIvXDFiFlKJnMJkHXMexb784U6NFR_BipZePFpePNfRHJ_r_pBPvNiwzWGWSAgnZ1VZgYD08uxh3FLD84JOWQ']
    const notificationData = {
      title: 'New message',
      body: message,
    };
    sendNotificationToClient(tokens, notificationData)
    res.status(201).json({ messages: data.rows });
  } catch (err) {
    console.log('err', err)
    res.status(401).json({ message: 'bad request' })
  }
};

module.exports = {
  messagesPage,
  addMessage
}

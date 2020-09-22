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
            RETURNING name, message
        `;

  try {
    const data = await pool.pool.query(query)

    const tokens = ['eyFxxmEKVw1n1gXWEnjU2T:APA91bFpS8esNMh22y9udwK8G54gna_nS8vuo1_TldLnFe1NE4YP95Q1bdbxO5aeJRT0z3VPJVq1YPj774EzTDpS5s5EaIwKBT86nGv7BRpyFp47CyzURWwxM1h3Ga0zy496yE60Udiy']
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

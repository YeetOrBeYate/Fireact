const pool = require('../../models/pool.js')
const sendNotificationToClient = require('../../notify.js')

const tokenarray = ['startofsctring']

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

    let tokens = ['dBikyL-B-kpTp3kaz33_iz:APA91bEh7QAz57MEyUbZWzjyRoGmYpwW2-pd_FZlZ4M9677GB0_SUnIeOT2wdklPiai32l553A-3hi-DuDaE3EPJbI9NIsNRtVP9kNDUfOa8tof6t9lvGUMsRDmP-zdRCb7Rp8P9B8MU']

    const notificationData = {
      title: 'New message',
      body: message,
    };
    console.log(tokens)
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

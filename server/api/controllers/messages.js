const pool = require('../../models/pool.js')
const sendNotificationToClient = require('../../notify.js')

let singleToken = 'dBikyL-B-kpTp3kaz33_iz:APA91bEiqOjHspLNRcP_JDJKPAB-KBQw0MnP5xLIx9rIRNxsPx9BQmWunio4yQtASAiQ9yDtpS3Zann_fJhpp9aZDihuq74R4wp5ng5Ou6T2dZeCtubhA3qqFPiMPPNOWr9ckEJ4bkRQ'

const messagesPage = async (req, res, next) => {
  try {
    const data = await pool.pool.query('SELECT * FROM messages')
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(400).json({message: 'no messages brother'})
  }
};

const addToken = async (req, res) => {
  const { token } = req.body
  singleToken = token
  try {
    res.status(200).json({message: 'token set'})
  } catch (error) {
    res.status(401).json({message: 'error on setting token'})
  }
}

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

    let tokens = [singleToken]

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
  addMessage,
  addToken
}

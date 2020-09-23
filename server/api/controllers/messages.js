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

    const tokens = ['edaVkOvsPrmSUA-ltpKArZ:APA91bHqQ5pcBh5w1GxzeAUPICUYhbz-d80cKMjKEKaizosK5POiWVvwtB2KSVbbMZMweVWJZtdzTwmy6Q-8YEDDrfyvf4f5PcOhybYKnCwtyg4xYpMb2Yp5DSK7RzwLq0ChweO8G__l']
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

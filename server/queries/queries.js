const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR DEFAULT '',
  message VARCHAR NOT NULL
  )
  `;

const insertMessages = `
INSERT INTO messages(name, message)
VALUES ('chidimo', 'first message'),
      ('orji', 'second message'),
      ('yeet', 'third message'),
      ('yeet', 'third message'),
      ('yeet', 'third message'),
      ('yeet', 'third message'),
      ('yeet', 'third message'),
      ('yeet', 'third message'),
      ('yeet', 'third message'),
      ('yeet', 'third message'),
      ('yeet', 'third message')
`;

const dropMessagesTable = 'DROP TABLE messages';

module.exports = {
  createMessageTable,
  insertMessages,
  dropMessagesTable
}

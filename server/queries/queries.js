const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR DEFAULT '',
  message VARCHAR NOT NULL
  )
  `;

const createTokenTable = `
DROP TABLE IF EXISTS tokentable;
CREATE TABLE IF NOT EXISTS tokentable (
  id SERIAL PRIMARY KEY,
  token VARCHAR DEFAULT ''
  )
  `;

const insertMessages = `
INSERT INTO messages(name, message)
VALUES ('chidimo', 'first message'),
      ('orji', 'second message')
`;

const dropMessagesTable = 'DROP TABLE messages';

module.exports = {
  createMessageTable,
  insertMessages,
  dropMessagesTable,
  createTokenTable,
}

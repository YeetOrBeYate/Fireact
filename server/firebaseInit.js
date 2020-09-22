require('dotenv').config()

const admin = require('firebase-admin')

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASEDBURL
})

module.exports = admin.messaging()

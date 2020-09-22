const app = require("./api/server.js");
const firebaseInit = require('./firebaseInit.js')
const port = process.env.PORT || 4000;

app.listen(port, () => { console.log("listening...") })

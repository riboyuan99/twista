const express = require("express")
const cors = require("cors")
const admin = require("firebase-admin");

const app = express()
const port = 8080
app.use(cors())



var serviceAccount = require("./twista_firebase.json");
module.exports = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


// Sign-up and Log-in
const router_auth = require('./auth.js')
app.use(router_auth)

// Project dashboard
const router_projects = require('./projects.js')
app.use(router_projects)



// Start server
app.listen(port, () => {
    console.log("Launching Connection")
    console.log("Server running at:\u001b[1;36m http://127.0.0.1:" + port + "\u001b[0m");
})
const express = require('express');
const bodyParser = require("body-parser")
const fb = require('./app');
const jsonParser = bodyParser.json()
const cors = require("cors")
const { getAuth } = require('firebase-admin/auth');

const router = express.Router()
router.use(jsonParser)
router.use(cors());

const db = fb.firestore()

// https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
router.post('/auth/signup', async (req, res) => {
    const userInfo = req.body
    console.log("For sign-up, received: ", userInfo)
    try{
        var auth = getAuth(fb)
        const user = await auth.createUser({email: userInfo.userEmail, password: userInfo.userPassword})
        await db.collection("users").doc(user.uid).set({
            uid: user.uid,
            name: userInfo.userName,
            email: userInfo.userEmail
        })
        res.status(201).json({message: "sign-up successful"})
    }catch (error){
        console.log("Sign-up failed: ", error)
        res.status(400).json({ error: error});
    }
})





module.exports = router
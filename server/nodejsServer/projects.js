const express = require('express');
const bodyParser = require("body-parser")
const fb = require('./app');
const jsonParser = bodyParser.json()
const cors = require("cors")

const router = express.Router()
router.use(jsonParser)
router.use(cors());

const db = fb.firestore()


router.post('/getExistingProjects', async (req, res) => {
    const uid = req.body.uid
    console.log("load existing projects for user: ", uid)
    const projects = []
    try{
        db.collection("users").doc(uid).collection("projects").get().then(function(result)  {
            result.forEach((p) => {
                const p_dict = {
                    "name": p.data().name,
                    "description": p.data().description,
                    "id": p.data().id
                }
                projects.push(p_dict)
            })
            res.status(200).json({projectList: projects})
        })
    }catch(error){
        console.log(error)
        res.status(400).json({error: error})

    }
})

router.post("/addProject", async (req, res) => {
    const uid = req.body.uid
    const project = req.body.project
    try{
        db.collection("users").doc(uid).collection("projects").doc(project.id).set({
            id: project.id,
            name: project.name,
            description: project.description
        }).then(() => {
            db.collection("projects").doc(project.id).set({
                id: project.id
            })
        })
        res.status(200).send("Done")
    }catch(error){
        res.status(400).send("Failed")
    }
})

//Can only edit name and/or description
router.post("/editProject", async (req, res) => {
    const uid = req.body.uid
    const project = req.body.project
    console.log("edit: ", project)
    try{
        db.collection("users").doc(uid).collection("projects").doc(project.id).update({
            name: project.name,
            description: project.description
        })
        res.status(200).send("Done")
    }catch(error){
        res.status(400).send("Failed")
    }
})

//Delete project
router.post("/deleteProject", async (req, res) => {
    const uid = req.body.uid
    const project = req.body.project
    console.log("delete: ", project)
    try{
        db.collection("users").doc(uid).collection("projects").doc(project.id).delete().then(() => {
            db.collection("projects").doc(project.id).delete()
        })
        res.status(200).send("Done")
    }catch(error){
        res.status(400).send("Failed")
    }
})

module.exports = router
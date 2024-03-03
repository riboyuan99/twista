import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from "./Projects.module.css"
import CreateProject from './modals/createProject'
import { useState } from 'react'
import ProjectCard from './Components/ProjectCard'
import { useParams } from 'react-router-dom'

const Projects = () => {
    // Project List
    const [projectList, setProjectList] = useState([])

    // user id
    const params = useParams()
    const uid = params["uid"]

    // node js server port
    const nodejsServer = "http://127.0.0.1:8080"
    
    // load existing project
    const getExistingProjects = async () =>{
        const response = await fetch(nodejsServer + "/getExistingProjects", {
            method: "POST",
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({uid: uid})
        });
        if (response.ok){
            const result = await response.json()
            return result
        }else{
            console.log("result from server: error")
        }
    }
    useEffect(() => {
        try{
            getExistingProjects().then((data) => {
                setProjectList(data.projectList)
            })
        }catch(error){
            console.log("Error when sending post request")
        }
    },[])


    // Create a new project modal
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }

    // Save a newly created project
    const addProjectToFB = async (project) =>{
        const response = await fetch(nodejsServer + "/addProject", {
            method: "POST",
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({uid: uid, project: project})
        });
        if (response.ok){
            alert("Successfully created!")
        }else{
            alert("Error from server")
        }
    }
    const saveNewProject = (project) => {
        // a project has name, description and id
        let tempList = [...projectList]
        tempList.push(project)
        setProjectList(tempList)
        try{
            addProjectToFB(project)
        }catch(error){
            alert("Save new project failed on frontend.")
        }
    }

    // Edit a project
    const updateProjectList = async (idx, updatedProject) => {

        const editProjectFB = async (project) => {
            const response = await fetch(nodejsServer + "/editProject", {
                method: "POST",
                headers:{
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({uid: uid, project: project})
            });
            console.log("edit response: ", response)
            if (response.ok){
                return true
            }else{
                return false
            }
        }
        try{
            const result = await editProjectFB(updatedProject)
            if (result){
                let tempList = [...projectList]
                tempList[idx] = updatedProject
                setProjectList(tempList)
            }else{
                alert("Error from server. not edited")
            } 
        }catch(error){
            alert("Edit project failed on frontend")
        }
    }

    
    // Delete an existing project
    const deleteProject = async (idx) => {

        const deleteProjectFB = async (project) => {
            const response = await fetch(nodejsServer + "/deleteProject", {
                method: "POST",
                headers:{
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({uid: uid, project: project})
            });
            console.log("edit response: ", response)
            if (response.ok){
                return true
            }else{
                return false
            }
        }
        
        const result = await deleteProjectFB(projectList[idx])
        if (result){
            let tempList = [...projectList]
            tempList.splice(idx,1)
            setProjectList(tempList)
        }else{
            alert("Delete error from server.")
        }
    }




    return (
        <>
        
            <div className={`text-center ${style.header}`}>
                <h3>Projects</h3>
                <button className="btn btn-primary mt-2" onClick={() => {setModal(true)}}>Create a project</button>
            </div>

            <div className= {style["task-container"]}>
                {projectList.map((p,index) => <ProjectCard project={p} uid={uid} pid={p.id} idx={index} deleteProject = {deleteProject} updateProjectList={updateProjectList}/>)}
            </div>

            <CreateProject modal = {modal} toggle = {toggle} saveNewProject = {saveNewProject}/>

        </>
    )
}

export default Projects
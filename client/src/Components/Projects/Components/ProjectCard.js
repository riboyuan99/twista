import React, {useState} from 'react'
import style from "./ProjectCard.module.css"
import { MdOutlineDeleteOutline, MdModeEdit, MdOutlineOpenInNew  } from "react-icons/md";
import EditProject from '../modals/editProject';
import { useNavigate } from 'react-router-dom';


const ProjectCard = ({project, idx, deleteProject, updateProjectList, pid, uid}) => {
  
  // Edit an existing project
  const[editModal, setEditModal] = useState(false)
  const toggleEditModal = () => {
      setEditModal(!editModal)
  }

  // Redirect to tweet search page
  const navigate = useNavigate()
  const directTweetSearchPage = () => {
    try{  
      navigate(`/${uid}/projects/${pid}`)
    }catch(error){
      alert("Redirection failed. Error: ", error)
    }

  }



  return (
    <div className = {`${style["card-wrapper"]}`}>
      <div className = {style["task-holder"]}>
          <span className = {style["card-header"]}>{project.name}</span>
          <p className = "mt-2">{project.description}</p>

          <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
            <MdOutlineOpenInNew className={style["icon-class"]} size={20} onClick={directTweetSearchPage}/>
            <MdModeEdit className={style["icon-class"]} size={20} onClick={()=>{setEditModal(true)}}/>
            <MdOutlineDeleteOutline className={style["icon-class"]} size={20} onClick={()=>{deleteProject(idx)}}/>
          </div>
      </div>

      <EditProject modal={editModal} toggle = {toggleEditModal} project={project} idx = {idx} updateProjectList={updateProjectList}/>
    </div>
  )
}

export default ProjectCard
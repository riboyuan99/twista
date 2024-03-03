import React from 'react'
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateProject = ({modal, toggle, saveNewProject}) => {


  const[projectName, setProjectName] = useState("")
  const[projectDescr, setProjectDescr] = useState("")

  // Display text in the box
  const handleTextChange = (e) => {
    const {name, value} = e.target
    if (name === "projectN"){
      setProjectName(value)
    }else{
      setProjectDescr(value)
    }
  }

  // Save a newly created project
  const handleSave = (e) => {
    const newProject = {"name": projectName, "description": projectDescr, "id": getID()}
    console.log("new project: ", newProject)
    saveNewProject(newProject)
    toggle()
  }

  const getID = () => {
    return Math.random().toString(16).slice(2)
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create project</ModalHeader>
        <ModalBody>
          <form>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Project name' name="projectN" value={projectName} onChange={handleTextChange}/>
            </div>
            <div className='form-group'>
              <textarea rows="5" className='form-control mt-2' placeholder="Description" name="projectD" value={projectDescr} onChange={handleTextChange}></textarea>

            </div>
          </form>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={handleSave}>
            Create
        </Button>
        <Button color="secondary" onClick={toggle}>
            Cancel
        </Button>
        </ModalFooter>
    </Modal>
  )
}

export default CreateProject
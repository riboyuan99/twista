import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditProject = ({modal, toggle, project, idx, updateProjectList}) => {

  const[newName, setNewName] = useState("")
  const[newDescr, setNewDescr] = useState("")

  useEffect(() => {
    setNewName(project.name)
    setNewDescr(project.description)
  },[])


  const handleTextChange = (e) => {
    const {name, value} = e.target
    if (name === "projectN"){
        setNewName(value)
    }else{
        setNewDescr(value)
    }
  }

  const saveUpdate = (e) =>{
    let updatedP = {"name": newName, "description": newDescr, "id": project.id}
    updateProjectList(idx, updatedP)
    toggle()
  }



  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit project</ModalHeader>
        <ModalBody>
          <form>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Project name' name="projectN" value={newName} onChange={handleTextChange}/>
            </div>
            <div className='form-group'>
              <textarea rows="5" className='form-control mt-2' placeholder="Description" name="projectD" value={newDescr} onChange={handleTextChange}></textarea>

            </div>
          </form>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={saveUpdate}>
            Update
        </Button>
        <Button color="secondary" onClick={toggle}>
            Cancel
        </Button>
        </ModalFooter>
    </Modal>
  )
}

export default EditProject
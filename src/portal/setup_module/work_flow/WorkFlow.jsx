import { ArrowBack, Cancel, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, CardBody, CardFooter, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { createAlertWF, deleteAlertWF, findAlertWFBywftId, findAllAlertWF, findAllWorkflowType, updateAlertWF } from '../setup_redux/workflow_slices/workFlowAlertSlice';
import { showDepartment } from '../../establishment_module/establishment_redux/slices/establishment_slice/departmentSlice';
import { showDesignation } from '../../establishment_module/establishment_redux/slices/establishment_slice/designationSlice';
import Select from 'react-select';
import { ImPlus } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";


const WorkFlow = () => {
    const dispatch=useDispatch();
    const [updateEmpType, setUpdateEmpType]=useState();
    const [modal, setModal] = useState(false);
    const toggle = () =>{
      setModal(!modal);
      setUpdateEmpType(null);
    }
    const {workFlowTypes,alertWF,alertWFs,awfloading} = useSelector((state)=>state.allstorereducer.workflow);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const [showEmpName,setShowEmpName]=useState();
    
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      //alert(e.target.name)
      if(e.target.name==='requesterDesignation.id'){
        setUpdateEmpType({...updateEmpType, ['requesterDesignation']:{'id':e.target.value,'code':'SBI'}});
      }
      else if(e.target.name==='workFlowType.id'){
        setUpdateEmpType({...updateEmpType, ['workFlowType']:{'id':e.target.value,'name':'SBI'}});
      }
      else if(e.target.name==='requesterDepartment.id'){
        setUpdateEmpType({...updateEmpType, ['requesterDepartment']:{'id':e.target.value,'code':'SBI'}});
      }
      else if(e.target.name==='approverDesignation.id'){
        setUpdateEmpType({...updateEmpType, ['approverDesignation']:{'id':e.target.value,'code':'SBI'}});
      }
      else if(e.target.name==='nextDepartment.id'){
        setUpdateEmpType({...updateEmpType, ['nextDepartment']:{'id':e.target.value,'code':'SBI'}});
      }
      else{
        setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
      }      
      console.log(updateEmpType);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createAlertWF(updateEmpType));
      if(alertWF.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
      // toggle();
      dispatch(findAllAlertWF());
    }
    useEffect(()=>{
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      dispatch(findAllAlertWF());
      dispatch(findAllWorkflowType());
      dispatch(showDepartment());
      dispatch(showDesignation());
    },[]);

    const updateDept=(empObj)=>{
      setModal(true);
      setUpdateEmpType(empObj);
    }

    const updateEmployeeType=(empObj)=>{
      dispatch(updateAlertWF(empObj));
      dispatch(findAllAlertWF());
      setModal(false);
      if(alertWF.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
      setShowEmpName(null);
    }
    const viewDept=(e, id)=>{
      alert(id);
    }
    const filterWFP=(e)=>{
      dispatch(findAlertWFBywftId(e.target.value));
      //alert(alertWFs)
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteAlertWF(id));
        dispatch(findAllAlertWF());
      } 
    }

  return (
    <div>
      <form>
        <Card style={{minWidth:'79rem',fontSize:'0.8rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>setup / workflow type</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='danger' onClick={toggle}>Add New</Button>
            </CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <td>
                    <th style={{width:'9rem'}}>
                      Work Flow Type : 
                    </th>
                  </td>
                  <th>
                    <select placeholder="select-type" className='form-select' id="workFlowType2.id" name="workFlowType2.id" onChange={filterWFP}>
                      <option value={-1}>-- select --</option>  
                      {
                        workFlowTypes.map((dpt)=>(
                          <option value={dpt.id}>{dpt.name}</option>
                        ))
                      }
                    </select>
                  </th>
                </tr>
              </Table>
            </CardBody>
            {awfloading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Designation</th>
                        <th scope='row'>Department-Organization</th>
                        <th scope='row'>Next Designation</th>
                        <th scope='row'>Next Department-Organization</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      alertWFs && alertWFs.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.requesterDesignation && ele.requesterDesignation.name}</td>
                          <td>{ele.requesterDepartment && ele.requesterDepartment.name}</td>
                          <td>{ele.approverDesignation && ele.approverDesignation.name}</td>
                          <td>{ele.nextDepartment && ele.nextDepartment.name}</td>
                          <td><Link onClick={(e)=>{updateDept(ele)}}><FaPencilAlt color='green'/></Link> 
                          <Link  onClick={(e)=>{deleteDept(ele.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                          <Link onClick={(e)=>{viewDept(e, ele.id)}}><FaSearch/> </Link>
                          </td>
                        </tr>
                      ))
                    }                      
                    </tbody>
                </Table>
            </CardBody>
            }
            {/* Modal */}
            <Modal isOpen={modal} toggle={toggle} size='xl'>
            {
              updateEmpType && updateEmpType.id!==undefined?
              <ModalHeader>Update WorkFlow</ModalHeader>
              :
              <ModalHeader>New WorkFlow</ModalHeader>
            }
              <ModalBody>
                <Table border={1}>
                  <tbody>    
                    <tr>
                      <th style={{width:'9rem'}}>
                        Work Flow Type : 
                      </th>
                      <th>
                        <select placeholder="select-name" className='form-select' id="workFlowType.id" name="workFlowType.id" onChange={handleChange} value={updateEmpType && updateEmpType.workFlowType && updateEmpType.workFlowType.id}>
                          <option value={-1}>-- select --</option>  
                          {
                            workFlowTypes.map((dpt)=>(
                              <option value={dpt.id}>{dpt.name}</option>
                            ))
                          }
                        </select>
                      </th>
                    </tr>                                 
                    <tr>
                      <td style={{width:'9rem'}}>Designation : 
                        <select placeholder="select-name" className='form-select' id="requesterDesignation.id" name="requesterDesignation.id" onChange={handleChange} value={updateEmpType && updateEmpType.requesterDesignation && updateEmpType.requesterDesignation.id}>
                          <option value={-1}>-- select --</option>  
                          {
                            designations.map((dpt)=>(
                              <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                            ))
                          }
                        </select>
                      </td>                      
                      <td style={{width:'9rem'}}>Department : 
                        <select placeholder="select-name" className='form-select' id="requesterDepartment.id" name="requesterDepartment.id" onChange={handleChange} value={updateEmpType && updateEmpType.requesterDepartment && updateEmpType.requesterDepartment.id}>
                          <option value={-1}>-- select --</option>  
                          {
                            departments.map((dpt)=>(
                              <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                            ))
                          }
                        </select>
                      </td>
                      
                      <td style={{width:'9rem'}}>Next Designation : 
                        <select placeholder="select-name" className='form-select' id="approverDesignation.id" name="approverDesignation.id" onChange={handleChange} value={updateEmpType && updateEmpType.approverDesignation && updateEmpType.approverDesignation.id}>
                          <option value={-1}>-- select --</option>  
                          {
                            designations.map((dpt)=>(
                              <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                            ))
                          }
                        </select>
                      </td>                      
                      <td style={{width:'9rem'}}>Next Department : 
                        <select placeholder="select-name" className='form-select' id="nextDepartment.id" name="nextDepartment.id" onChange={handleChange} value={updateEmpType && updateEmpType.nextDepartment && updateEmpType.nextDepartment.id}>
                          <option value={-1}>-- select --</option>  
                          {
                            departments.map((dpt)=>(
                              <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                            ))
                          }
                        </select>
                      </td>
                    </tr>                    
                  </tbody>                  
                </Table>   
                <Table>
                  <tbody>
                    <tr>
                      <td>
                      {
                        updateEmpType && updateEmpType.id!==undefined?
                        <Button color='success' onClick={(e)=>{updateEmployeeType(updateEmpType)}} style={{width:'100%'}}><GrUpdate/> Update</Button>
                        :
                        <Button color='success' onClick={handleSubmit} style={{width:'100%'}}><ImPlus/> Add</Button>
                      }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button color="btn btn-danger" onClick={toggle} style={{width:'100%'}}><Cancel/> Cancel</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table> 
              </ModalBody>
              <ModalFooter>
                
              </ModalFooter>
            </Modal>
        {/* Modal  */}
            <CardFooter>
              <p>footer</p>
            </CardFooter>
        </Card>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default WorkFlow;

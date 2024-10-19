import { ArrowBack, Cancel, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { TiArrowRight } from "react-icons/ti";
import { Button, Card, CardBody, CardFooter, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { createWorkFlowPrivilege, deleteWorkFlowPrivilege, deleteWorkFlowType, findAllWorkFlowPrivilege, findAllWorkflowType, findWorkFlowPrivilegeByEmployeeId, findWorkFlowPrivilegeBywftId, updateWorkFlowPrivilege } from '../setup_redux/workflow_slices/workFlowAlertSlice';
import { showDepartment } from '../../establishment_module/establishment_redux/slices/establishment_slice/departmentSlice';
import { showDesignation } from '../../establishment_module/establishment_redux/slices/establishment_slice/designationSlice';
import Select from 'react-select';
import { ImPlus } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { showEmployeePopup } from '../../establishment_module/establishment_redux/slices/establishment_slice/employeeSetupSlice';


const WorkFlowPrivilege = () => {
    const dispatch=useDispatch();
    const [updateEmpType, setUpdateEmpType]=useState();
    const [modal, setModal] = useState(false);
    const toggle = () =>{
      setModal(!modal);
      setUpdateEmpType(null);
    }
    const {employeeSelection, employeeById, loading} = useSelector((state)=>state.allstorereducer.employeeData);
    const {workFlowPrivilege,workFlowPrivileges,workFlowTypes,wfploading} = useSelector((state)=>state.allstorereducer.workflow);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const [showEmpName,setShowEmpName]=useState();
    
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      //alert(e.target.name)
      if(e.target.name==='employee.id'){
        setUpdateEmpType({...updateEmpType, ['employee']:{'id':e.target.value,'code':'SBI'}});
      }
      else if(e.target.name==='workFlowType.id'){
        setUpdateEmpType({...updateEmpType, ['workFlowType']:{'id':e.target.value,'name':'SBI'}});
      }
      else if(e.target.name==='department.id'){
        setUpdateEmpType({...updateEmpType, ['department']:{'id':e.target.value,'code':'SBI'}});
      }
      else if(e.target.name==='designation.id'){
        setUpdateEmpType({...updateEmpType, ['designation']:{'id':e.target.value,'code':'SBI'}});
      }
      else{
        setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
      }      
      console.log(updateEmpType);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createWorkFlowPrivilege(updateEmpType));
      if(workFlowPrivilege.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
      // toggle();
      dispatch(findAllWorkFlowPrivilege());
    }
    useEffect(()=>{
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      dispatch(findAllWorkFlowPrivilege());
      dispatch(findAllWorkflowType());
      dispatch(showDepartment());
      dispatch(showDesignation());
      dispatch(showEmployeePopup());
    },[]);

    const updateDept=(empObj)=>{
      setModal(true);
      setShowEmpName({
        value:(empObj && empObj.employee && empObj.employee.id),
        label:("["+empObj && empObj.employee && empObj.employee.code+"] : "+(empObj && empObj.employee && empObj.employee.fullName))
      })
      setUpdateEmpType(empObj);
    }
    function handleSelect(data) {          
      setShowEmpName(data);
      //setEmployee({...employee,[field]:data.value});
      setUpdateEmpType({...updateEmpType, ['employee']:{'id':data.value,'code':'SBI'}});
    }
    const updateEmployeeType=(empObj)=>{
      dispatch(updateWorkFlowPrivilege(empObj));
      dispatch(findAllWorkFlowPrivilege());
      setModal(false);
      if(workFlowPrivilege.id>0){
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
      dispatch(findWorkFlowPrivilegeBywftId(e.target.value));
      //alert(workFlowPrivileges)
    }
    const filterWFPByEmpId=(data)=>{
      dispatch(findWorkFlowPrivilegeByEmployeeId(data.value));
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteWorkFlowPrivilege(id));
        dispatch(findAllWorkFlowPrivilege());
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
                    <select placeholder="select-name" className='form-select' id="workFlowType2.id" name="workFlowType2.id" onChange={filterWFP}>
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
                  <td>
                    <th style={{width:'9rem'}}>
                      Employee :
                    </th>
                  </td>
                  <td> 
                    <Select options={employeeSelection} id='employeeId' name='employeeId' placeholder="- Search option -" 
                      value={showEmpName} 
                      onChange={filterWFPByEmpId}
                      isSearchable={true}>                             
                    </Select>
                  </td>
                </tr>
              </Table>
            </CardBody>
            {wfploading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Department</th>
                        <th scope='row'>Designation</th>
                        <th scope='row'>Employee</th>
                        <th scope='row'>Privilege</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      workFlowPrivileges && workFlowPrivileges.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.department && ele.department.name}</td>
                          <td>{ele.designation && ele.designation.name}</td>
                          <td>[ {ele.employee && ele.employee.code} ] {ele.employee && ele.employee.fullName}</td>
                          <td><TiArrowRight/> {ele.privilege}</td>
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
              <ModalHeader>Update WorkFlow Privilege</ModalHeader>
              :
              <ModalHeader>New WorkFlow Privilege</ModalHeader>
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
                      <td style={{width:'9rem'}}>Department : 
                        <select placeholder="select-name" className='form-select' id="department.id" name="department.id" onChange={handleChange} value={updateEmpType && updateEmpType.department && updateEmpType.department.id}>
                          <option value={-1}>-- select --</option>  
                          {
                            departments.map((dpt)=>(
                              <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                            ))
                          }
                        </select>
                      </td>
                      <td style={{width:'9rem'}}>Designation : 
                        <select placeholder="select-name" className='form-select' id="designation.id" name="designation.id" onChange={handleChange} value={updateEmpType && updateEmpType.designation && updateEmpType.designation.id}>
                          <option value={-1}>-- select --</option>  
                          {
                            designations.map((dpt)=>(
                              <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                            ))
                          }
                        </select>
                      </td>
                      <td style={{width:'10rem'}}>Employee : 
                        <Select options={employeeSelection} id='employee.id' name='employee.id' placeholder="- Search option -" 
                          value={showEmpName} 
                          onChange={handleSelect}
                          isSearchable={true}>                             
                        </Select>
                      </td>
                      <td style={{width:'9rem'}}>Privilege : 
                        <select id='privilege' name='privilege' className='form-select' onChange={handleChange} value={updateEmpType && updateEmpType.privilege}>
                          <option value="-1">Select Privilege</option>
                          <option value="Request" title="Request">Request</option>
                          <option value="Forward/Recommend" title="Forward/Recommend">Forward/Recommend</option>
                          <option value="Approve/Reject" title="Approve/Reject">Approve/Reject</option>
                          <option value="Approve/Reject/Print Cheque" title="Approve/Reject/Print Cheque">Approve/Reject/Print </option>
                          <option value="Print Cheque" title="Print Cheque">Print Cheque</option>
                          <option value="Approval Notification" title="Approval Notification">Approval Notification</option>
                          <option value="Reject/Forward" title="Reject/Forward">Reject/Forward</option>
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

export default WorkFlowPrivilege;

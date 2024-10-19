import { ArrowBack, Cancel, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, CardBody, CardFooter, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { createAlertWF, deleteAlertWF, findAlertWFBywftId, findAllAlertWF, findAllWorkflowType, updateAlertWF } from '../setup_redux/workflow_slices/workFlowAlertSlice';
import { ImPlus } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { createCodeMaster, deleteCodeMaster, findAllCodeMaster, findCodeMasterByCode, findCodeMasterByCodeList, findCodeMasterById, popupCodeMasterByCodeList, updateCodeMaster } from '../../establishment_module/establishment_redux/slices/establishment_slice/codeMasterSlice';


const MasterCodes = () => {
    const dispatch=useDispatch();
    const [updateEmpType, setUpdateEmpType]=useState();
    const [modal, setModal] = useState(false);
    const toggle = () =>{
      setModal(!modal);
      setUpdateEmpType(null);
    }
    const {codeMaster,codeMasters,codeLoading,codeMasterCol} = useSelector((state)=>state.allstorereducer.codeMaster);    
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
      else{
        setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
      }      
      console.log(updateEmpType);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createCodeMaster(updateEmpType));
      if(codeMaster.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
      // toggle();
      dispatch(findAllAlertWF());
    }
    useEffect(()=>{
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      dispatch(popupCodeMasterByCodeList());
    },[]);

    const updateDept=(empObj)=>{
      setModal(true);
      setUpdateEmpType(empObj);
    }

    const updateEmployeeType=(empObj)=>{
      dispatch(updateCodeMaster(empObj));
      dispatch(findAllCodeMaster());
      setModal(false);
      if(codeMaster.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
    }
    const viewDept=(e, id)=>{
      alert(id);
    }
    const filterCodeValue=(e)=>{
      alert(e.target.value);
      //dispatch(findCodeMasterById(e.target.value));
      dispatch(findCodeMasterByCodeList(e.target.value));
      //alert(codeMasters)
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteCodeMaster(id));
        dispatch(findAllCodeMaster());
      } 
    }

  return (
    <div>
      <form>
        <Card style={{minWidth:'79rem',fontSize:'0.8rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>setup / Code Master</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='danger' onClick={toggle}>Add New</Button>
            </CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <td>
                    <th style={{width:'9rem'}}>
                      Code : 
                    </th>
                  </td>
                  <th>
                    <select placeholder="select-type" className='form-select' id="masterCode" name="masterCode" onChange={filterCodeValue}>
                      <option value={-1}>-- select --</option>  
                      {
                        codeMasterCol.map((dpt)=>(
                          <option value={dpt.code}>{dpt.code}</option>
                        ))
                      }
                    </select>
                  </th>
                  <td>
                    <th style={{width:'9rem'}}>
                      Value Contain : 
                    </th>
                  </td>
                  <th>
                    <input placeholder="type here to search" className='form-control' id="masterValue" name="masterValue" onChange={filterCodeValue} />                     
                  </th>
                </tr>
              </Table>
            </CardBody>
            {codeLoading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Code Type</th>
                        <th scope='row'>Code Value</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      codeMasters && codeMasters.length>0 && codeMasters.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.code}</td>
                          <td>{ele.value}</td>
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
              <ModalHeader>Update Code Master</ModalHeader>
              :
              <ModalHeader>New Code Master</ModalHeader>
            }
              <ModalBody>
                <Table border={1}>
                  <tbody>                                   
                    <tr>
                      <td style={{width:'9rem'}}>Code : 
                        <select placeholder="select-name" className='form-select' id="code" name="code" onChange={handleChange} value={updateEmpType && updateEmpType.code}>
                          <option value={-1}>-- select --</option>  
                          {
                            codeMasterCol.map((dpt)=>(
                              <option value={dpt.id}>{dpt.code}</option>
                            ))
                          }
                        </select>
                      </td>                      
                      <td style={{width:'9rem'}}>Value : 
                        <input placeholder="value" className='form-control' id="value" name="value" onChange={handleChange} value={updateEmpType && updateEmpType.value} />                         
                      </td>                     
                      <td style={{width:'9rem'}}>Description : 
                        <input placeholder="description" className='form-control' id="description" name="description" onChange={handleChange} value={updateEmpType && updateEmpType.description} />                         
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
      <ToastContainer>
      </ToastContainer>
    </div>
  )
}

export default MasterCodes;


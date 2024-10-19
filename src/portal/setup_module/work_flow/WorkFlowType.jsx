import { ArrowBack, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, CardBody, CardFooter, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { createWorkFlowType, deleteWorkFlowType, findAllWorkflowType, updateWorkflowType } from '../setup_redux/workflow_slices/workFlowAlertSlice';


const WorkFlowType = () => {
    const dispatch=useDispatch();
    const [updateEmpType, setUpdateEmpType]=useState();
    const [modal, setModal] = useState(false);
    const toggle = () =>{
      setModal(!modal);
      //dispatch(showEmployeeType());
      setUpdateEmpType(null);
    }
    const {workFlowType,workFlowTypes,wftloading} = useSelector((state)=>state.allstorereducer.workflow);
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
      console.log(updateEmpType);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createWorkFlowType(updateEmpType));
      if(workFlowType.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
      toggle();
      dispatch(findAllWorkflowType());
    }
    useEffect(()=>{
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      dispatch(findAllWorkflowType());
    },[]);

    const updateDept=(empObj)=>{
      setModal(true);
      setUpdateEmpType(empObj);
      //navigatePage(`/establishmentSetup/editEmployeeType/${id}`);
    }

    const updateEmployeeType=(empObj)=>{
      dispatch(updateWorkflowType(empObj));
      dispatch(findAllWorkflowType());
      setModal(false);
      if(workFlowType.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
    }
    const viewDept=(e, id)=>{
      alert(id);
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteWorkFlowType(id));
        dispatch(findAllWorkflowType());
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
            {wftloading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Name</th>
                        <th scope='row'>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      workFlowTypes && workFlowTypes.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.name}</td>
                          <td>{ele.description}</td>
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
            <Modal isOpen={modal} toggle={toggle} >
            {
              updateEmpType && updateEmpType.id!==undefined?
              <ModalHeader>Update WorkFlow Type</ModalHeader>
              :
              <ModalHeader>New WorkFlow Type</ModalHeader>
            }
              <ModalBody>
                <Table>
                  <tbody>
                                     
                    <tr>
                      <td>Work Flow Type : </td>
                      <td>
                        <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateEmpType && updateEmpType.name}/>
                      </td>
                    </tr>
                    <tr>
                      <td>Description : </td>
                      <td>
                        <textarea id='description' name='description' className='form-control' onChange={handleChange} value={updateEmpType && updateEmpType.description}/>
                      </td>
                    </tr>
                    <tr>
                      <td>Work Flow Object : </td>
                      <td>
                        <select id='flowType' name='flowType' className='form-select' onChange={handleChange} value={updateEmpType && updateEmpType.flowType}>
                          <option value="-1" selected="">--Select--</option>	  		
                          <option value="Voucher Approval" title="Voucher Approval">Voucher Approval</option>
                          <option value="Advance Request" title="Advance Request">Advance Request</option>
                          <option value="Claim Request" title="Claim Request">Claim Request</option>
                          <option value="Purchase Indent" title="Purchase Indent">Purchase Indent</option>
                          <option value="Purchase Requisition" title="Purchase Requisition">Purchase Requisition</option>
                          <option value="Purchase Order" title="Purchase Order">Purchase Order</option>
                          <option value="Estimation" title="Estimation">Estimation</option>
                          <option value="Project Approval" title="Project Approval">Project Approval</option>
                          <option value="Leave Application" title="Leave Application">Leave Application</option>
                          <option value="Hostel Request" title="Hostel Request">Hostel Request</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </Table>    
              </ModalBody>
              <ModalFooter>
                {
                  updateEmpType && updateEmpType.id!==undefined?
                  <Button color='success' onClick={(e)=>{updateEmployeeType(updateEmpType)}}>Update</Button>
                  :
                  <Button color='success' onClick={handleSubmit}>Save</Button>
                }

                {' '}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
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

export default WorkFlowType;

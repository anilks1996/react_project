import { ArrowBack, Cancel, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, CardBody, CardFooter, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { ImPlus } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { createBank, deleteBank, findAllBanks, findBankById, popupBankList, updateBank } from '../../establishment_module/establishment_redux/slices/establishment_slice/banksSlice';


const Banks = () => {
    const dispatch=useDispatch();
    const [updateEmpType, setUpdateEmpType]=useState();
    const [modal, setModal] = useState(false);
    const toggle = () =>{
      setModal(!modal);
      setUpdateEmpType(null);
    }
    const {bank,banks,bankLoading,bankCol} = useSelector((state)=>state.allstorereducer.bank);    
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      //alert(e.target.name)  
      setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
          
      console.log(updateEmpType);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createBank(updateEmpType));
      if(bank && bank.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
      // toggle();
      dispatch(findAllBanks());
    }
    useEffect(()=>{
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      dispatch(popupBankList());
      dispatch(findAllBanks());
    },[]);

    const updateDept=(empObj)=>{
      setModal(true);
      setUpdateEmpType(empObj);
    }

    const updateEmployeeType=(empObj)=>{
      dispatch(updateBank(empObj));
      dispatch(findAllBanks());
      setModal(false);
      if(bank && bank.id>0){
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
      dispatch(findBankById(e.target.value));
      //alert(codeMasters)
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteBank(id));
        dispatch(findAllBanks());
      } 
    }

  return (
    <div>
      <form>
        <Card style={{minWidth:'79rem',fontSize:'0.8rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>setup / Bank</label>
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
                        bankCol.map((dpt)=>(
                          <option value={dpt.id}>{dpt.name}</option>
                        ))
                      }
                    </select>
                  </th>
                  
                </tr>
              </Table>
            </CardBody>
            {bankLoading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Group Code</th>
                        <td scope='row'>Bank Code</td>
                        <th scope='row'>Bank Name</th>
                        <th scope='row'>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      banks && banks.length>0 && banks.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.groupCode}</td>
                          <td>{ele.code}</td>
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
            <Modal isOpen={modal} toggle={toggle} size='xl'>
            {
              updateEmpType && updateEmpType.id!==undefined?
              <ModalHeader>Update Bank</ModalHeader>
              :
              <ModalHeader>New Bank</ModalHeader>
            }
              <ModalBody>
                <Table border={1}>
                  <tbody>                                   
                    <tr>
                      <td style={{width:'9rem'}}>Group Code	 : 
                        <input placeholder="value" className='form-control' id="groupCode" name="groupCode" onChange={handleChange} value={updateEmpType && updateEmpType.groupCode} />                         
                      </td>                      
                      <td style={{width:'9rem'}}>Bank Code : 
                        <input placeholder="value" className='form-control' id="code" name="code" onChange={handleChange} value={updateEmpType && updateEmpType.code} />                         
                      </td>                     
                      <td style={{width:'9rem'}}>Bank Name : 
                        <input placeholder="name" className='form-control' id="name" name="name" onChange={handleChange} value={updateEmpType && updateEmpType.name} />                         
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

export default Banks;

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
import { createBankBranch, deleteBankBranch, filterBankBranchById, findAllBankBranchs, findBankBranchById, popupBankBranchList, updateBankBranch } from '../../establishment_module/establishment_redux/slices/establishment_slice/bankBranchesSlice';
import { popupBankList } from '../../establishment_module/establishment_redux/slices/establishment_slice/banksSlice';


const BankBranches = () => {
    const dispatch=useDispatch();
    const [updateEmpType, setUpdateEmpType]=useState();
    const [modal, setModal] = useState(false);
    const [bankObj,setbankObj]=useState();
    const toggle = () =>{
      setModal(!modal);
      setUpdateEmpType(null);
    }
    const {bankBranch,bankBranches,bankBranchLoading,bankBranchCol} = useSelector((state)=>state.allstorereducer.bankBranch);   
    const {bankCol} = useSelector((state)=>state.allstorereducer.bank);    
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      //alert(e.target.name)  
      setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
      if(e.target.name==='bank.id'){
        setbankObj(e.target.value);
      }    
      console.log(updateEmpType);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createBankBranch(updateEmpType));
      if(bankBranch && bankBranch.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
      // toggle();
      dispatch(findAllBankBranchs());
    }
    useEffect(()=>{
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      dispatch(popupBankBranchList());
      dispatch(findAllBankBranchs());
      dispatch(popupBankList());
    },[]);

    const updateDept=(empObj)=>{
      setModal(true);
      setUpdateEmpType(empObj);
      if(empObj && empObj.bankDto && empObj.bankDto.id!=null){
        //alert(empObj.bankDto.id);
        setbankObj(empObj.bankDto.id);
      }
    }

    const updateEmployeeType=(empObj)=>{
      dispatch(updateBankBranch(empObj));
      dispatch(findAllBankBranchs());
      setModal(false);
      if(bankBranch && bankBranch.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
    }
    const viewDept=(e, id)=>{
      alert(id);
    }
    const filterCodeValue=(e)=>{
      //alert(e.target.value);
      //dispatch(findCodeMasterById(e.target.value));
      dispatch(filterBankBranchById(e.target.value));
      //alert(codeMasters)
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteBankBranch(id));
        dispatch(findAllBankBranchs());
      } 
    }

  return (
    <div>
      <form>
        <Card style={{minWidth:'79rem',fontSize:'0.8rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>setup / Bank Branches</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='danger' onClick={toggle}>Add New</Button>
            </CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <td>
                    <th style={{width:'9rem'}}>
                      Bank Branch Name : 
                    </th>
                  </td>
                  <th>
                    <select placeholder="select-type" className='form-select' id="bbName" name="bbName" onChange={filterCodeValue}>
                      <option value={-1}>-- select --</option>  
                      {
                        bankBranchCol.map((dpt)=>(
                          <option value={dpt.id}>{dpt.name}</option>
                        ))
                      }
                    </select>
                  </th>
                  
                </tr>
              </Table>
            </CardBody>
            {bankBranchLoading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Bank Name</th>
                        <th scope='row'>Banch Code</th>
                        <th scope='row'>Banch Name</th>
                        <th scope='row'>Banch Address</th>
                        <th scope='row'>Bank Bsr Code</th>
                        <th scope='row'>Bank Micr Code</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      bankBranches && bankBranches.length>0 && bankBranches.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.bankDto && ele.bankDto.name}</td>
                          <td>{ele.code}</td>
                          <td>{ele.name}</td>
                          <td>{ele.description}</td>
                          <td>{ele.bsrCode}</td>
                          <td>{ele.micrCode}</td>
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
              <ModalHeader>Update Bank Branch</ModalHeader>
              :
              <ModalHeader>New Bank Branch</ModalHeader>
            }
              <ModalBody>
                <Table border={1}>
                  <tbody>  
                    <tr>
                      <select placeholder="select-type" className='form-select' id="bank.id" name="bank.id" onChange={handleChange} value={bankObj} >
                        <option value={-1}>-- select --</option>  
                        {
                          bankCol.map((dpt)=>(
                            <option value={dpt.id}>{dpt.name}</option>
                          ))
                        }
                      </select>
                    </tr>                                 
                    <tr>
                      <td style={{width:'9rem'}}>Branch Code	 : 
                        <input placeholder="value" className='form-control' id="code" name="code" onChange={handleChange} value={updateEmpType && updateEmpType.code} />                         
                      </td>                      
                      <td style={{width:'9rem'}}>Branch Name : 
                        <input placeholder="value" className='form-control' id="name" name="name" onChange={handleChange} value={updateEmpType && updateEmpType.name} />                         
                      </td>                     
                      <td style={{width:'9rem'}}>Bank Micr : 
                        <input placeholder="name" className='form-control' id="micrCode" name="micrCode" onChange={handleChange} value={updateEmpType && updateEmpType.micrCode} />                         
                      </td>
                      <td style={{width:'9rem'}}>Bank Bsr Code : 
                        <input placeholder="description" className='form-control' id="bsrCode" name="bsrCode" onChange={handleChange} value={updateEmpType && updateEmpType.bsrCode} />                         
                      </td>                                                                 
                    </tr>
                    <tr>
                      <td style={{width:'10rem'}}>Bank Address : 
                      </td>
                      <td>
                        <textarea  className='form-control' id="description" name="description" onChange={handleChange} value={updateEmpType && updateEmpType.description} cols={9} rows={3}/>
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

export default BankBranches;

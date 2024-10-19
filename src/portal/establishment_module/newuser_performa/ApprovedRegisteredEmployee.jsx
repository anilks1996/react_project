import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import { Card, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showBanks } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import { FaUser } from 'react-icons/fa';
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { DataGrid } from '@mui/x-data-grid';
import './datagridcss.css';
import { FcApproval } from "react-icons/fc";
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { showUserRegistersByApprovedStatus } from '../establishment_redux/slices/user_performa/UserRegisterSlice';


const ApprovedRegisteredEmployee = () => {
    const navigatePage=useNavigate();
    const goback=()=>{
        window.history.back();
    }
    const {approvedUserRegisters} = useSelector((state)=>state.allstorereducer.userRegister);
    const dispatch=useDispatch();
    const [modal, setModal] = useState(false);
    const [updateUserRegister,setUpdateUserRegister]=useState();
    const [headerBack,setHeaderBack]=useState();
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {employeeSelection} = useSelector((state)=>state.allstorereducer.employeeData);
    const {banks} = useSelector((state)=>state.allstorereducer.org);
    const [backGStatus,setBackGStatus]=useState();

    useEffect(()=>{
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
      dispatch(showUserRegistersByApprovedStatus("Approved"));
      dispatch(showBanks());
      dispatch(showDesignation());
      dispatch(showEmployeePopup());
      dispatch(showEmployeeType());
    }, []);
    
    const toggle = () =>{
      setModal(!modal);
    }
    const searchFun=(rowObj)=>{
      setModal(!modal);
      setUpdateUserRegister(rowObj);
      if(rowObj.status ==='Pending'){
        setBackGStatus('pending-row-style');
      }
      if(rowObj.status ==='Approved'){
        setBackGStatus('approved-row-style');
      }
      if(rowObj.status ==='Rejected'){
        setBackGStatus('rejected-row-style');
      }
      if(rowObj.status ==='Cancelled'){
        setBackGStatus('cancelled-row-style');
      }     
    }

    const editFun=(userId)=>{
      //alert('edit'+userId)
      navigatePage(`/newUserPerforma/userApprovalForm/${userId}`);
    }
    const columns = [
      { field: 'userName', headerName: 'Employee', width: 450, 
        renderCell: (params) => (
          <div>
            <FaUser style={{width:'20px',height:'25px',color:'green'}}/>{params.row.userName}            
          </div>
        ),
      },
      { field: 'userDetail', headerName: 'Detail', width: 320 },
      // { field: 'userStatus', headerName: 'Status', width: 120 },
      {field: 'userStatus',headerName: 'Actions',width: 250,
        renderCell: (params) => (
          <div>
          {/*  <PendingActions style={{ color: 'handleChangeff7800'}} title='Click here to view form'/>  Pending{"  "}
          */}
            <span className='approved-icon'><FcApproval />{params.row.userStatus} </span>
            {"  "}<button className='btn btn-info p-1'><HiOutlineViewfinderCircle style={{width:'20px',height:'25px'}} onClick={(e)=>{searchFun(params.row.userData)}}/></button>{" "}
            {/*<button className='btn btn-primary p-1'><MdOutlineModeEdit style={{width:'20px',height:'25px'}} onClick={(e)=>{editFun(params.row.userData.id)}}/></button>{" "}
            <button className='btn btn-success p-1'>Approve</button>
            */}
          </div>
        ),
      },
      {field:'userData',headerName: '|', width: 5 },
    
    ];
    
    const ParentChildDataGrid = ({ data, onRowClick}) => {
      // Map through the data to format it for the DataGrid
      const rows = data.map((item, index) => ({
        id: index + 1, // You can use a unique identifier if available
        objId: item.id,
        userName: (" "+item.name+" ( "+(item.departmentDto && item.departmentDto.name)+" ) (Email: "+item.emailId+" )"),
        userDetail: ("Aadhar: "+item.aadharNo+" (Mob: "+item.contactNo+" )"),
        userStatus: item.status,
        userData:item,
      }));
    
      const getRowClassName = (params) => {
        // Apply custom styles to rows with parentId === 1
        //alert('hiiiii '+params.row.userStatus)
        if(params.row.userStatus ==='Pending'){
          setHeaderBack('pending-row-style');
        }
        if(params.row.userStatus ==='Approved'){
          setHeaderBack('approved-row-style');
        }
        if(params.row.userStatus ==='Rejected'){
          setHeaderBack('rejected-row-style');
        }
        if(params.row.userStatus ==='Cancelled'){
          setHeaderBack('cancelled-row-style');
        }
        //return params.row.userStatus === 'Pending' ? 'pending-row-style' : '';
        return headerBack;
      };

      return (
        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} 
          onRowClick={(row)=>onRowClick(row)} checkboxSelection 
          getRowClassName={getRowClassName} />
        </div>
      );
    };
    
  const handleRowClick=(params)=>{
    //const name=row.row.emailId;
    //alert("row="+params.row.objId+",  name="+params.row.userName);
  }

  const handleChange=()=>{

  }

  return (
    <div>
      <Card className='form-shadow p-2' style={{minWidth:'70rem', marginLeft:'1rem'}}>
         {
            approvedUserRegisters.length>0? 
            <div>
              <ParentChildDataGrid data={approvedUserRegisters} onRowClick={handleRowClick} />
            </div>
            :
            <div>
              <p><Spinner></Spinner></p>  
                  
            </div>
          }
            {/* Modal */}
            <Modal isOpen={modal} toggle={toggle} size='xl'>
            {
              updateUserRegister && updateUserRegister.id!==undefined?
              <ModalHeader className={backGStatus}>User Register [ Name: {updateUserRegister.name} ] | {updateUserRegister.status}</ModalHeader>
              :
              <ModalHeader>Approval User Form</ModalHeader>
            }
              <ModalBody>
                <Table striped>
                  <tbody id='userformId'>               
                    <tr>
                      <td>
                        <label>Employee Name:</label>
                        <input type='text' name='name' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.name} />
                      </td>
                      <td>
                        <label>Father Name:</label>
                        <input type='text' name='nameOfFather' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.nameOfFather} />
                      </td>
                      <td>
                        <label>Mother Name:</label>
                        <input type='text' name='nameOfMother' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.nameOfMother} />
                      </td>
                      <td>
                        <label>Spouse Name:</label>
                        <input type='text' name='nameOfSpouse' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.nameOfSpouse} />
                      </td>
                    </tr>
                    <tr>
                      
                      <td><label>Email Id:</label>
                        <input type='text' name='emailId' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.emailId} />
                      </td>
                      <td><label>Date of Birth:</label>
                        <input type='text' name='dob' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.dob} />
                      </td>
                      <td><label>Contach No:</label>
                        <input type='text' name='contactNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.contactNo} />
                      </td>
                      <td><label>Pan No:</label>
                        <input type='text' name='panNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.panNo} />
                      </td>
                    </tr>
                    <tr>
                      <td><label>Aadhar No:</label>
                        <input type='text' name='aadharNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.aadharNo} />
                      </td>
                      <td><label>Contract Tenure Expiry Date:</label>
                        <input type='text' name='contactTenureExpiryDate' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.contactTenureExpiryDate} />
                      </td>
                      <td><label>Join Date:</label>
                        <input type='text' name='joinDate' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.joinDate} />
                      </td>
                      <td><label>Rejoin Date:</label>
                        <input type='text' name='rejoiningDate' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.rejoiningDate} />
                      </td>
                    </tr>
                    <tr>
                      <td><label>Bank Name:</label>
                      <select id='bank.id' name='bank.id' className='form-select' value={updateUserRegister && updateUserRegister.bankDto && updateUserRegister.bankDto.id} onChange={handleChange}>
                      {
                          banks.map((dsg)=>(
                          <option value={dsg.id}>{dsg.name}</option>
                          ))
                      }
                      </select>
                      </td>
                      <td><label>Bank Acc/No:</label>
                        <input type='text' name='bankAccountNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.bankAccountNo} />
                      </td>
                      <td><label>IFSC Code:</label>
                        <input type='text' name='ifscCode' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.ifscCode} />
                      </td>
                      <td><label>Exprience:</label>
                        <input type='text' name='experience' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.experience} />
                      </td>
                    </tr>
                    <tr>
                      <td><label>Employee Type:</label>
                      <select id='employeeType.id' name='employeeType.id' className='form-select' value={updateUserRegister && updateUserRegister.employeeTypeDto && updateUserRegister.employeeTypeDto.id} onChange={handleChange}>
                      {
                          employeeTypes.map((dsg)=>(
                          <option value={dsg.id}>{dsg.name}</option>
                          ))
                      }
                      </select>
                      </td>
                      <td><label>Supervisor Name:</label>
                      <select id='reportingToEmployee.id' name='reportingToEmployee.id' className='form-select' value={updateUserRegister && updateUserRegister.superVisorName && updateUserRegister.superVisorName.id} onChange={handleChange}>
                      {
                          employeeSelection.map((dsg)=>(
                          <option value={dsg.id}>{dsg.fullName}</option>
                          ))
                      }
                      </select>
                      </td>
                      <td><label>Department:</label>
                        <input type='text' name='department.name' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.departmentDto && updateUserRegister.departmentDto.name} />                        
                      </td>
                      <td><label>Designation:</label>
                      <select id='reportingDesignation.id' name='reportingDesignation.id' className='form-select' value={updateUserRegister && updateUserRegister.designationDto && updateUserRegister.designationDto.id} onChange={handleChange}>
                      {
                          designations.map((dsg)=>(
                          <option value={dsg.id}>{dsg.name}</option>
                          ))
                      }
                      </select>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Marital Status:</label>
                        <input type='text' name='maritalStatus' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.maritalStatus} />
                      </td>
                      <td><label>Qualification:</label>
                        <input type='text' name='qualification' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.qualification} />
                      </td>
                      <td><label>Address:</label>
                        <textarea type='text' cols={50} rows={2} name='address' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.address} />
                      </td>   
                      <td><label>Remarks:</label>
                        <input type='text' name='remarks' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.remarks} />
                      </td>                   
                    </tr>                    
                  </tbody>
                </Table>    
              </ModalBody>
              <ModalFooter className={backGStatus}>
                <p>User Performa Detail</p>
              </ModalFooter>
            </Modal>
          {/* Modal  */}
        </Card>             
        <ToastContainer>
        </ToastContainer>
     
    </div>
  )
}

export default ApprovedRegisteredEmployee;

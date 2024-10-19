import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../establishment_module/newuser_performa/datagridcss.css';
import { FcApproval } from "react-icons/fc";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { showDesignation } from '../establishment_module/establishment_redux/slices/establishment_slice/designationSlice';
import { showEmployeePopup } from '../establishment_module/establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { showEmployeeType } from '../establishment_module/establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { findDraftWorkflowByEmployeeId } from './inboxEmployeeSlice';
import { Divider } from '@mui/material';
import DateDisplay from './DateDisplay';
import { getActiveUserId } from '../../auth/auth_slice/loginUserSlice';


const DraftboxEmployeeUser = () => {
    const navigatePage=useNavigate();
    const {activeUserId,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const goback=()=>{
        window.history.back();
    }
    const dispatch=useDispatch();
    const [modal, setModal] = useState(false);
    const [updateUserRegister,setUpdateUserRegister]=useState();
    const [backGStatus,setBackGStatus]=useState();
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {employeeSelection} = useSelector((state)=>state.allstorereducer.employeeData);
    const {inboxEmployees,inboxItems,sentItems,draftItems,dloading} = useSelector((state)=>state.allstorereducer.inboxEmployee);
    const {banks} = useSelector((state)=>state.allstorereducer.org);
    const [userToken,setUserToken]=useState('');

    React.useEffect(()=>{
      dispatch(getActiveUserId());
        window.scrollTo({top:'0', left:'0', behavior:'smooth'});
        let ustoken = localStorage.getItem('user-token');   
        if (ustoken || ustoken != 'undefined') {
            setUserToken(ustoken);
        } 
        dispatch(findDraftWorkflowByEmployeeId(activeUserId));    
        dispatch(showDesignation());
        dispatch(showEmployeePopup());
        dispatch(showEmployeeType());
    },[]);

    function getFormattedDate(date) {
        if(date.getFullYear()!=1970){
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
          const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
          return `${day}-${month}-${year}`;
        }
    }

    const handleChange=()=>{
    }
    const toggle = () =>{
      setModal(!modal);
    }

    const searchFun=(rowObj)=>{
      alert('search'+rowObj)
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
      //navigatePage(`/newUserPerforma/userApprovalForm/${userId}`);
    }
    const showInboxApproval=(modelIds,modelTypes)=>{
        alert('approval form '+modelIds+", modeltype="+modelTypes)     
        if(modelTypes===1){
            //Leave application
            navigatePage(`/employeeUserInbox/showLeaveAppApprovalForm/${modelIds}`);
        }else if(modelTypes===6){
            //Bill Submission
            navigatePage(`/employeeUserInbox/showBillSubmissionForm/${modelIds}`);
        }else if(modelTypes===45){
            //userRequisition
            navigatePage(`/employeeUserInbox/showUserRequisitionForm/${modelIds}`);
        }else if(modelTypes===46){
            //Purchase Order
            navigatePage(`/employeeUserInbox/showPurchaseOrderApprovalForm/${modelIds}`);
        }else if(modelTypes===47){
            //Tender
            navigatePage(`/employeeUserInbox/showTenderApprovalForm/${modelIds}`);
        }else if(modelTypes===48){
            //Store Request
            navigatePage(`/employeeUserInbox/showStoreRequestApprovalForm/${modelIds}`);
        }else if(modelTypes===53){
            //Stores Issue 
            navigatePage(`/employeeUserInbox/showStoresIssueApprovalForm/${modelIds}`);
        }else if(modelTypes===55){
            //Engineering Estimate
            navigatePage(`/employeeUserInbox/showEngineeringEstimateForm/${modelIds}`);
        }else if(modelTypes===57){
            //Online Payment
            navigatePage(`/employeeUserInbox/showOnlinePaymentApprovalForm/${modelIds}`);
        }else if(modelTypes===60){
            //Tour Application 
            navigatePage(`/employeeUserInbox/showTourApplicationApprovalForm/${modelIds}`);
        }else if(modelTypes===66){
            //Tour Claim Expense
            navigatePage(`/employeeUserInbox/showTourClaimExpenseApprovalForm/${modelIds}`);
        }
    }

    const columns = [
      { field: 'userName', headerName: 'Employee', width: 350, 
        renderCell: (params) => (
          <div>
            {
              (params.row && params.row.currentStatus==='Pending' || params.row.currentStatus==='Request' || params.row.currentStatus==='Requested' || params.row.currentStatus==='Forward' || 
              params.row.currentStatus==='Work Forwarded' || params.row.currentStatus==='Forward To Purchase' || params.row.currentStatus==='Forward To GEM' || params.row.currentStatus==='Forwarded')?
                <div>  
                  <FaUser style={{width:'20px',height:'25px',color:'Orange'}}/>{" "}:{" "}{params.row.userName}) 
                </div>
              :
              (params.row.currentStatus==='Approved' || params.row.currentStatus==='Approve' || params.row.currentStatus==='Dispatched To Account' || params.row.currentStatus==='Online Payment Approved' || params.row.currentStatus==='Tour Approved' || 
                params.row.currentStatus==='Tour Claim Approved' || params.row.currentStatus==='Sent To Bank' || params.row.currentStatus==='Payment Success' || params.row.currentStatus==='Issue Work Order' || params.row.currentStatus==='Work Created' || 
                params.row.currentStatus==='Work Approved' || params.row.currentStatus==='Work Issued' || params.row.currentStatus==='PO Approved' || params.row.currentStatus==='PO Created' || params.row.currentStatus==='PO Partial' || 
                params.row.currentStatus==='Purchased' || params.row.currentStatus==='Dispatch to Vendor' || params.row.currentStatus==='Items Received' || params.row.currentStatus==='Partially Goods Received' || params.row.currentStatus==='Partially Issued' || 
                params.row.currentStatus==='Issued' || params.row.currentStatus==='Issued & Accepted' || params.row.currentStatus==='Finalized' || params.row.currentStatus==='Leave Approved')?
                <div>
                  <FaUser style={{width:'20px',height:'25px',color:'green'}}/>{" "}:{" "}{params.row.userName} 
                </div>
              :
              (params.row.currentStatus==='Cancel' || params.row.currentStatus==='Rejected' || params.row.currentStatus==='Work Cancelled' || params.row.currentStatus==='Discard' || params.row.currentStatus==='Cancelled' || params.row.currentStatus==='PO Cancelled')?
                <div>
                  <FaUser style={{width:'20px',height:'25px',color:'red'}}/>{" "}:{" "}{params.row.userName} 
                </div>
              :
              <div></div>
            }                      
          </div>
        ),
      },
      
      // { field: 'userStatus', headerName: 'Status', width: 120 },
      {field: 'userStatus',headerName: 'Status',width: 220,
        renderCell: (params) => (
          <div>
          { (params.row && params.row.currentStatus==='Pending' || params.row.currentStatus==='Request' || params.row.currentStatus==='Requested' || params.row.currentStatus==='Forward' || 
            params.row.currentStatus==='Work Forwarded' || params.row.currentStatus==='Forward To Purchase' || params.row.currentStatus==='Forward To GEM' || params.row.currentStatus==='Forwarded')?
              <div>  
                <span className='pending-icon'  onClick={(e)=>{showInboxApproval(params.row.modelId,params.row.modelType)}}><MdOutlinePending /> {params.row.currentStatus} </span>
                {"  "}<button className='btn btn-info pending-icon p-1'><HiOutlineViewfinderCircle style={{width:'20px',height:'25px'}} onClick={(e)=>{searchFun(params.row.userData)}}/></button>{" "}
                <button className='btn btn-primary pending-icon p-1'><MdOutlineModeEdit style={{width:'20px',height:'25px'}} onClick={(e)=>{editFun(params.row.userData.id)}}/></button>{" "}
              </div>
            :
            (params.row.currentStatus==='Approved' || params.row.currentStatus==='Approve' || params.row.currentStatus==='Dispatched To Account' || params.row.currentStatus==='Online Payment Approved' || params.row.currentStatus==='Tour Approved' || 
                params.row.currentStatus==='Tour Claim Approved' || params.row.currentStatus==='Sent To Bank' || params.row.currentStatus==='Payment Success' || params.row.currentStatus==='Issue Work Order' || params.row.currentStatus==='Work Created' || 
                params.row.currentStatus==='Work Approved' || params.row.currentStatus==='Work Issued' || params.row.currentStatus==='PO Approved' || params.row.currentStatus==='PO Created' || params.row.currentStatus==='PO Partial' || 
                params.row.currentStatus==='Purchased' || params.row.currentStatus==='Dispatch to Vendor' || params.row.currentStatus==='Items Received' || params.row.currentStatus==='Partially Goods Received' || params.row.currentStatus==='Partially Issued' || 
                params.row.currentStatus==='Issued' || params.row.currentStatus==='Issued & Accepted' || params.row.currentStatus==='Finalized' || params.row.currentStatus==='Leave Approved')?
              <div>
                <button className='approved-icon btn btn-success' onClick={(e)=>{showInboxApproval(params.row.modelId,params.row.modelType)}}><FcApproval />{params.row.currentStatus}</button>
                {"  "}<button className='btn btn-info approved-icon p-1'><HiOutlineViewfinderCircle style={{width:'20px',height:'25px'}} onClick={(e)=>{searchFun(params.row.userData)}}/></button>{" "}
                {/*  <button className='btn btn-primary approved-icon p-1'><MdOutlineModeEdit style={{width:'20px',height:'25px'}} onClick={(e)=>{editFun(params.row.userData.id)}}/></button>{" "}
              */}
              </div>
            :
            (params.row.currentStatus==='Cancel' || params.row.currentStatus==='Rejected' || params.row.currentStatus==='Work Cancelled' || params.row.currentStatus==='Discard' || params.row.currentStatus==='Cancelled' || params.row.currentStatus==='PO Cancelled')?
              <div>
                <span className='rejected-icon btn btn-danger' onClick={(e)=>{showInboxApproval(params.row.modelId,params.row.modelType)}}><BsFillExclamationTriangleFill />{params.row.currentStatus} </span>
                {"  "}<button className='btn btn-info rejected-icon p-1'><HiOutlineViewfinderCircle style={{width:'20px',height:'25px'}} onClick={(e)=>{searchFun(params.row.userData)}}/></button>{" "}
                {/*<button className='btn btn-primary rejected-icon p-1'><MdOutlineModeEdit style={{width:'20px',height:'25px'}} onClick={(e)=>{editFun(params.row.userData.id)}}/></button>{" "} */}
              </div>
            :
            <div></div>
          }            
          </div>
        ),
      },
      { field: 'modelCode', headerName: 'Detail', width: 330,
      renderCell: (params) => (
        <div>
          {
            (params.row && params.row.itemDetails5!=null)?
            <div>
                <b>Requested</b> {" "}{params.row.itemDetails5}
            </div>
            :
            <div></div>
          }
            {
            (params.row && params.row.modelType===1)?           
                <div>  
                    <b className='text-color'> Leave Application </b> : {" "}[{params.row.modelCode}] 
                    <Divider />
                    {params.row.itemDetails1}
                </div>
                    :                   
                <div>
                    {
                    (params.row && params.row.modelType===6)?           
                    <div>  
                        <b className='text-color'> Bill Submission </b> : {" "}[{params.row.modelCode}] 
                        <Divider />
                        {params.row.itemDetails1}
                    </div>
                        : 
                        <div>
                        {
                            (params.row && params.row.modelType===46)?           
                            <div>  
                                <b className='text-color'> Purchase Order </b> : {" "}[{params.row.modelCode}] 
                                <Divider />
                                {params.row.itemDetails1}
                            </div>
                            :
                            <div>
                            {
                                (params.row && params.row.modelType===47)?           
                                <div>  
                                    <b className='text-color'> Tender </b> : {" "}[{params.row.modelCode}] 
                                    <Divider />
                                    {params.row.itemDetails1}
                                </div>
                                :
                                <div>
                                {
                                    (params.row && params.row.modelType===48)?           
                                    <div>  
                                        <b className='text-color'> Store Request </b> : {" "}[{params.row.modelCode}] 
                                        <Divider />
                                        {params.row.itemDetails1}
                                    </div>
                                    :
                                    <div>
                                    {
                                        (params.row && params.row.modelType===53)?           
                                        <div>  
                                            <b className='text-color'> Stores Issue </b> : {" "}[{params.row.modelCode}] 
                                            <Divider />
                                            {params.row.itemDetails1}
                                        </div>
                                        :
                                        <div>
                                        {
                                            (params.row && params.row.modelType===55)?           
                                            <div>  
                                                <b className='text-color'> Engineering Estimate </b> : {" "}[{params.row.modelCode}] 
                                                <Divider />
                                                {params.row.itemDetails1}
                                            </div>
                                            :
                                            <div>
                                            {
                                                (params.row && params.row.modelType===56)?           
                                                <div>  
                                                    <b className='text-color'> Engineering Work </b> : {" "}[{params.row.modelCode}] 
                                                    <Divider />
                                                    {params.row.itemDetails1}
                                                </div>
                                                :
                                                <div>
                                                {
                                                    (params.row && params.row.modelType===57)?           
                                                    <div>  
                                                        <b className='text-color'> Online Payment </b> : {" "}[{params.row.modelCode}] 
                                                        <Divider />
                                                        {params.row.itemDetails1}
                                                    </div>
                                                    :
                                                    <div>
                                                    {
                                                        (params.row && params.row.modelType===60)?           
                                                        <div>  
                                                            <b className='text-color'> Tour Application  </b> : {" "}[{params.row.modelCode}] 
                                                            <Divider />
                                                            {params.row.itemDetails1}
                                                        </div>
                                                        :
                                                        <div>
                                                        {
                                                            (params.row && params.row.modelType===66)?           
                                                            <div>  
                                                                <b className='text-color'> Tour Claim Expense </b> : {" "}[{params.row.modelCode}] 
                                                                <Divider />
                                                                {params.row.itemDetails1}
                                                            </div>
                                                            :
                                                            <div>
                                                            
                                                            </div>
                                                        }
                                                        </div>
                                                    }
                                                    </div>
                                                }
                                                </div>
                                            }
                                            </div>
                                        }
                                        </div>
                                    }
                                    </div>
                                }
                                </div>
                            }
                            </div>
                        }
                        </div>
                    }
                </div>
          }                      
        </div>
        ),
      },
      {field:'actionDate',headerName: 'Time', width: 170,
        renderCell: (params)=>(
            <div>
            {
                (params.row && params.row.presentOwner && params.row.presentOwner==='YES')?
                <div>
                    {params.row.actionDate}{" "} <MdOutlineModeEdit title='Click here to edit.'/>
                </div>
                :
                <div>
                    <DateDisplay date={new Date(params.row.actionDate)}/>
                </div>
            }
            </div>
        ),
      },
    {/* {field:'presentOwner',headerName: 'Action', width: 100}, */}
    
    ];
    
    const ParentChildDataGrid = ({ data, onRowClick}) => {
      // Map through the data to format it for the DataGrid
      const rows = data.map((item, index) => ({
        id: index + 1, // You can use a unique identifier if available
        objId: item.id,
        currentStatus:item.currentStatus,
        userName: (" "+item.senders+"..."+"("+item.totalMessages+")"),
        userStatus: item.currentStatus,
        itemDetails1: item.itemDetails1,
        modelId:item.modelId,
        modelType:item.modelType,
        modelCode:item.modelCode,
        actionDate:item.actionDate,
        presentOwner:item.presentOwner,
        userData:item,
      }));
    
      const getRowClassName = (params) => {
        // Apply custom styles to rows with parentId === 1
        //alert('hiiiii '+params.row.userStatus)
        console.log("Status =========== "+params.row.userStatus+" ===========")
        if(params.row.userStatus ==='Pending'){
          setBackGStatus('pending-row-style');
        }
        if(params.row.userStatus ==='Approved'){
          setBackGStatus('approved-row-style');
        }
        if(params.row.userStatus ==='Rejected'){
          setBackGStatus('rejected-row-style');
        }
        if(params.row.userStatus ==='Cancelled'){
          setBackGStatus('cancelled-row-style');
        }
        //return params.row.userStatus === 'Pending' ? 'pending-row-style' : '';
        return backGStatus;
      };
      const getCellClassName = (params) => {
        //alert('hiiiii '+params.row.userStatus)
        return params.row.userStatus === 'Pending' ? 'custom-cell-style' : '';
      };

      return (
        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={20} 
          onRowClick={(row)=>onRowClick(row)} checkboxSelection style={{backgroundColor:{getRowClassName}, fontSize:'0.85rem'}}
           slots={{toolbar: GridToolbar}} />
        </div>
      );
    };
    
  const handleRowClick=(params)=>{
    //const name=row.row.emailId;
    //alert("row="+params.row.objId+",  name="+params.row.userName);
  }

  const getRowClassName = (params) => {
    console.log("Status =========== "+params.row.userStatus+" ===========")
    if(params.row.userStatus ==='Pending'){
      setBackGStatus('pending-row-style');
    }
    if(params.row.userStatus ==='Approved'){
      setBackGStatus('approved-row-style');
    }
    if(params.row.userStatus ==='Rejected'){
      setBackGStatus('rejected-row-style');
    }
    if(params.row.userStatus ==='Cancelled'){
      setBackGStatus('cancelled-row-style');
    }
    //return params.row.userStatus === 'Pending' ? 'pending-row-style' : '';
    return backGStatus;
  };

  return (
    
    <div>
      <Card className='form-shadow p-2' style={{minWidth:'72rem', marginLeft:'1rem',minHeight:'40rem'}}>
         {
            dloading==false ? 
            <div>
              <ParentChildDataGrid data={draftItems} onRowClick={handleRowClick} />
            </div>
            :
            <div>
              <Row className='mt-4'>
                <Col sm="12"></Col>
              </Row>
              <Row>
                <Col sm="5"></Col>
                <Col sm="1">Loading...</Col>
                <Col sm="6"> <Spinner style={{color:'green'}}></Spinner></Col>
              </Row>    
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
                  {/* 
                    <td><label>Bank Name:</label>
                    <select id='bank.id' name='bank.id' className='form-select' value={updateUserRegister && updateUserRegister.bankDto && updateUserRegister.bankDto.id} onChange={handleChange}>
                    {
                        banks.map((dsg)=>(
                        <option value={dsg.id}>{dsg.name}</option>
                        ))
                    }
                    </select>
                    </td>
                  */}
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
                    
                    <td><label>Department:</label>
                      <input type='text' name='department.name' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.departmentDto && updateUserRegister.departmentDto.name} />                        
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

export default DraftboxEmployeeUser;

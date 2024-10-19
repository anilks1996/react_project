import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
import { fetchCWMByReqEmployeeCode, findInboxWorkflowByEmployeeId } from './inboxEmployeeSlice';
import { Divider } from '@mui/material';
import DateDisplay from './DateDisplay';
import { getActiveUserId } from '../../auth/auth_slice/loginUserSlice';
import { findLeaveAppItemByLeaveAppId, findLeaveApplicationById } from '../leave_module/leave_redux/slices/leave_slice/leaveMasterSlice';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';

const InboxEmployeeUser = (props) => {
    const navigatePage=useNavigate();
    const {activeUserId,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const goback=()=>{
        window.history.back();
    }
    const dispatch=useDispatch();
    const [modal, setModal] = useState(false);
    const [updateUserRegister,setUpdateUserRegister]=useState();
    const [backGStatus,setBackGStatus]=useState();
    const {inboxEmployees,inboxItems,iloading} = useSelector((state)=>state.allstorereducer.inboxEmployee);
    const {leaveApplications,leaveApplicationItems,approvedLeave,leaveLoading} = useSelector((state)=>state.allstorereducer.lvMaster);
    const [userToken,setUserToken]=React.useState();
    const [popupHeader,setPopupHeader] = useState('');

    useEffect(()=>{
      dispatch(getActiveUserId());
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
          
        const uToken = localStorage.getItem('user-token');
        if(uToken!=null && uToken!=""){
            setUserToken(uToken);
        }
        dispatch(findInboxWorkflowByEmployeeId(activeUserId));
        //alert(props.value)
        dispatch(showDesignation());
        dispatch(showEmployeePopup());
        dispatch(showEmployeeType());
        if(approvedLeave && approvedLeave.approvalStatus==='Approved'){
            toast.success(approvedLeave.remarks, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
          dispatch(findLeaveApplicationById(123456789));
        }
    }, []);

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
      alert('search'+rowObj.currentStatus)
      setModal(!modal);
      dispatch(findLeaveAppItemByLeaveAppId(rowObj.modelId));
      setUpdateUserRegister(rowObj);
      if(rowObj.currentStatus ==='Pending' || rowObj.currentStatus.includes('Request') || rowObj.currentStatus.includes('Forward')){
        setBackGStatus('pending-row-style');
      }
      if(rowObj.currentStatus ==='Approved' || rowObj.currentStatus.includes('Approve') || rowObj.currentStatus.includes('Dispatched To Account') || rowObj.currentStatus.includes('Sent To Bank') 
      || rowObj.currentStatus.includes('Payment Success') || rowObj.currentStatus.includes('Issue') || rowObj.currentStatus.includes('Work Created') || rowObj.currentStatus.includes('Received') 
      || rowObj.currentStatus.includes('Created') || rowObj.currentStatus.includes('Partial') || rowObj.currentStatus.includes('Purchased') || rowObj.currentStatus.includes('Dispatch to Vendor') 
      || rowObj.currentStatus.includes('Finalized') || rowObj.currentStatus.includes('Accepted'))
        {
        setBackGStatus('approved-row-style');
      }
      if(rowObj.currentStatus ==='Rejected' || rowObj.currentStatus.includes('Rejected') || rowObj.currentStatus.includes('Cancel') ||  rowObj.currentStatus.includes('Cancelled') || 
      rowObj.currentStatus.includes('Discard')){
        setBackGStatus('rejected-row-style');
      }
      //Header name with status
      if(rowObj.modelType===1){setPopupHeader('Leave Application '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===6){setPopupHeader('Bill Submission '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===46){setPopupHeader('Purchase Order '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===47){setPopupHeader('Tender '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===48){setPopupHeader('Store Request '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===53){setPopupHeader('Stores Issue '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===55){setPopupHeader('Engineering Estimate '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===56){setPopupHeader('Engineering Work '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===57){setPopupHeader('Online Payment '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===60){setPopupHeader('Tour Application '+'[ '+rowObj.currentStatus+' ]')}
      else if(rowObj.modelType===66){setPopupHeader('Tour Claim Expense '+'[ '+rowObj.currentStatus+' ]')}
    }
    const editFun=(modelIds,modelTypes)=>{
      if(modelTypes===1){
        navigatePage(`/employeeUserInbox/showLeaveAppApprovalForm/${modelIds}`);
      }else if(modelTypes===6){
          navigatePage(`/employeeUserInbox/showBillSubmissionForm/${modelIds}`);
      }else if(modelTypes===45){
          navigatePage(`/employeeUserInbox/showUserRequisitionForm/${modelIds}`);
      }else if(modelTypes===46){
          navigatePage(`/employeeUserInbox/showPurchaseOrderApprovalForm/${modelIds}`);
      }else if(modelTypes===47){
          navigatePage(`/employeeUserInbox/showTenderApprovalForm/${modelIds}`);
      }else if(modelTypes===48){
          navigatePage(`/employeeUserInbox/showStoreRequestApprovalForm/${modelIds}`);
      }else if(modelTypes===53){
          navigatePage(`/employeeUserInbox/showStoresIssueApprovalForm/${modelIds}`);
      }else if(modelTypes===55){
          navigatePage(`/employeeUserInbox/showEngineeringEstimateForm/${modelIds}`);
      }else if(modelTypes===57){
          navigatePage(`/employeeUserInbox/showOnlinePaymentApprovalForm/${modelIds}`);
      }else if(modelTypes===60){
          navigatePage(`/employeeUserInbox/showTourApplicationApprovalForm/${modelIds}`);
      }else if(modelTypes===66){
          navigatePage(`/employeeUserInbox/showTourClaimExpenseApprovalForm/${modelIds}`);
      }
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
      {field: 'userStatus',headerName: 'Status',width: 210,
        renderCell: (params) => (
          <div>
          { (params.row && params.row.currentStatus==='Pending' || params.row.currentStatus==='Request' || params.row.currentStatus==='Requested' || params.row.currentStatus==='Forward' || 
            params.row.currentStatus==='Work Forwarded' || params.row.currentStatus==='Forward To Purchase' || params.row.currentStatus==='Forward To GEM' || params.row.currentStatus==='Forwarded')?
              <div>  
                <span className='pending-icon btn btn-warning'  onClick={(e)=>{showInboxApproval(params.row.modelId,params.row.modelType)}}><MdOutlinePending /> {params.row.currentStatus} </span>
                {"  "}<button className='btn btn-warning pending-icon p-1'><HiOutlineViewfinderCircle style={{width:'20px',height:'25px'}} onClick={(e)=>{searchFun(params.row)}}/></button>{" "}
                <button className='btn btn-warning pending-icon p-1'><MdOutlineModeEdit style={{width:'20px',height:'25px'}} onClick={(e)=>{editFun(params.row.modelId,params.row.modelType)}}/></button>{" "}
              </div>
            :
            (params.row.currentStatus==='Approved' || params.row.currentStatus==='Approve' || params.row.currentStatus==='Dispatched To Account' || params.row.currentStatus==='Online Payment Approved' || params.row.currentStatus==='Tour Approved' || 
                params.row.currentStatus==='Tour Claim Approved' || params.row.currentStatus==='Sent To Bank' || params.row.currentStatus==='Payment Success' || params.row.currentStatus==='Issue Work Order' || params.row.currentStatus==='Work Created' || 
                params.row.currentStatus==='Work Approved' || params.row.currentStatus==='Work Issued' || params.row.currentStatus==='PO Approved' || params.row.currentStatus==='PO Created' || params.row.currentStatus==='PO Partial' || 
                params.row.currentStatus==='Purchased' || params.row.currentStatus==='Dispatch to Vendor' || params.row.currentStatus==='Items Received' || params.row.currentStatus==='Partially Goods Received' || params.row.currentStatus==='Partially Issued' || 
                params.row.currentStatus==='Issued' || params.row.currentStatus==='Issued & Accepted' || params.row.currentStatus==='Finalized' || params.row.currentStatus==='Leave Approved')?
              <div>
                <Button className='approved-icon' color='success' onClick={(e)=>{showInboxApproval(params.row.modelId,params.row.modelType)}}><FcApproval />{params.row.currentStatus}</Button>
                {"  "}<button className='btn btn-success approved-icon p-1'><HiOutlineViewfinderCircle style={{width:'20px',height:'25px'}} onClick={(e)=>{searchFun(params.row.userData)}}/></button>{" "}
                {/*  <button className='btn btn-primary approved-icon p-1'><MdOutlineModeEdit style={{width:'20px',height:'25px'}} onClick={(e)=>{editFun(params.row.userData.id)}}/></button>{" "}
              */}
              </div>
            :
            (params.row.currentStatus==='Cancel' || params.row.currentStatus==='Rejected' || params.row.currentStatus==='Work Cancelled' || params.row.currentStatus==='Discard' || params.row.currentStatus==='Cancelled' || params.row.currentStatus==='PO Cancelled')?
              <div>
                <span className='rejected-icon btn btn-danger' onClick={(e)=>{showInboxApproval(params.row.modelId,params.row.modelType)}}><BsFillExclamationTriangleFill />{params.row.currentStatus} </span>
                {"  "}<button className='btn btn-danger rejected-icon p-1'><HiOutlineViewfinderCircle style={{width:'20px',height:'25px'}} onClick={(e)=>{searchFun(params.row.userData)}}/></button>{" "}
                {/*<button className='btn btn-primary rejected-icon p-1'><MdOutlineModeEdit style={{width:'20px',height:'25px'}} onClick={(e)=>{editFun(params.row.userData.id)}}/></button>{" "} */}
              </div>
            :
            <div></div>
          }            
          </div>
        ),
      },
      { field: 'modelCode', headerName: 'Detail', width: 320,
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
      {field:'actionDate',headerName: 'Time', width: 160,
        renderCell: (params)=>(            
            <div>
              <DateDisplay date={new Date(params.row.actionDate)}/>  
             {
                (params.row && params.row.presentOwner && params.row.presentOwner==='YES')?
                <div>
                    <MdOutlineModeEdit title='Click here to edit.' onClick={(e)=>{showInboxApproval(params.row.modelId,params.row.modelType)}}/>
                </div>
                :
                <div>                                        
                                     
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

  if(iloading){
    <p>Please wait ...<Spinner></Spinner></p>
  }
  return (
    
    <div>
      <Card className='form-shadow p-2 mt-0' style={{minWidth:'70rem', marginLeft:'1rem',minHeight:'40rem'}}>
      {/* <p><DateDisplay date={new Date()}/> </p>  */}      
         {
            iloading==false ? 
            <div>
              <ParentChildDataGrid data={inboxItems} onRowClick={handleRowClick}  />
            </div>
            :
            <div>
              <Row className='mt-4'><Col sm="12">`</Col></Row>
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
            (updateUserRegister && updateUserRegister.id!==undefined)?
            <ModalHeader toggle={toggle} className={backGStatus} ><b style={{color:'brown'}}>{updateUserRegister.modelCode} </b>: {popupHeader}</ModalHeader>
            :
            <ModalHeader toggle={toggle}>Description Form</ModalHeader>
          }
            <ModalBody>
              <Row>
                <Col sm="6">
                    <Table>
                      <tbody>
                          <tr>
                              <td>Leave Application Date : </td>
                              <td>{getFormattedDate(new Date(updateUserRegister && updateUserRegister.actionDate))}</td>
                          </tr>
                          <tr>
                              <td>Employee Name : </td>
                              <td>{updateUserRegister && updateUserRegister.modelCode}</td>
                          </tr>
                          <tr>
                              <td>Entered By : </td>
                              <td>{updateUserRegister && updateUserRegister.modelCode}</td>
                          </tr>
                          
                          <tr>
                              <td>Reason of Leave : </td>
                              <td>{updateUserRegister && updateUserRegister.remarks}</td>
                          </tr>
                          <tr>
                              <td>Medical Reason : </td>
                              <td>{updateUserRegister && updateUserRegister.remarks}</td>
                          </tr>
                          
                      </tbody>
                  </Table>
                </Col>
                <Col sm="6">
                  <Table border={1}>
                      <thead>
                          <tr>
                              <th>Leave Type</th>
                              <th>Balance</th>
                              <th>From</th>
                              <th>First Day</th>
                              <th>To</th>
                              <th>Last Day</th>
                              <th>Days</th>
                          </tr>
                      </thead>
                      <tbody>                                   
                          {
                              leaveApplicationItems.length>0 && leaveApplicationItems.map((lvItem)=>(
                                  <tr key={lvItem.id}>
                                      <td>{lvItem && lvItem.leaveMaster && lvItem.leaveMaster.name}</td>
                                      <td>{lvItem && lvItem.balanceLeave}</td>
                                      <td>{getFormattedDate(new Date(lvItem && lvItem.dateFrom))}</td>
                                      <td>{lvItem && lvItem.firstDayHalf}</td>
                                      <td>{getFormattedDate(new Date(lvItem && lvItem.dateTo))}</td>
                                      <td>{lvItem && lvItem.lastDayHalf}</td>
                                      <td>{lvItem && lvItem.leaveDays}</td>
                                  </tr>
                              ))
                          }                                                                                                                                                        
                      </tbody>
                  </Table>
                </Col>
              </Row>
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

export default InboxEmployeeUser;

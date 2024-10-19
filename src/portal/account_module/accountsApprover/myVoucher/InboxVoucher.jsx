import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../../../establishment_module/newuser_performa/datagridcss.css';
import { FcApproval } from "react-icons/fc";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { Divider } from '@mui/material';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { getActiveUserId, getLoggedInUser } from '../../../../auth/auth_slice/loginUserSlice';
import { findInboxVoucherWorkflowByEmployeeId, findInboxWorkflowByEmployeeId } from '../../../employeeusr_module/inboxEmployeeSlice';
import DateDisplay from '../../../employeeusr_module/DateDisplay';
import { findLeaveAppItemByLeaveAppId, findLeaveApplicationByEmployeeId } from '../../../leave_module/leave_redux/slices/leave_slice/leaveMasterSlice';
import { color } from 'framer-motion';

const InboxVoucher = (props) => {
    const navigatePage=useNavigate();
    const {activeUserId,loggedInUser,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const goback=()=>{
        window.history.back();
    }
    const dispatch=useDispatch();
    const [modal, setModal] = useState(false);
    const [updateUserRegister,setUpdateUserRegister]=useState();
    const [backGStatus,setBackGStatus]=useState();
    const {inboxEmployees,inboxVoucherItems,ivloading} = useSelector((state)=>state.allstorereducer.inboxEmployee);
    const {leaveApplications,leaveApplicationItems,approvedLeave,leaveLoading} = useSelector((state)=>state.allstorereducer.lvMaster);
    const [userToken,setUserToken]=React.useState();
    const [popupHeader,setPopupHeader] = useState('');

    useEffect(()=>{
      dispatch(getActiveUserId());
      dispatch(getLoggedInUser());
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
          
        const uToken = localStorage.getItem('user-token');
        if(uToken!=null && uToken!=""){
            setUserToken(uToken);
        }
        dispatch(findInboxVoucherWorkflowByEmployeeId(activeUserId));
        //alert(props.value)
        
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
          //dispatch(findLeaveApplicationByEmployeeId(123456789));
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
      else if(rowObj.modelType===21){setPopupHeader('Tender '+'[ '+rowObj.currentStatus+' ]')}
    }
    const editFun=(modelIds,modelTypes)=>{
      //alert('hello')
      if(modelTypes===1){
        navigatePage(`/employeeUserInbox/showLeaveAppApprovalForm/${modelIds}`);
      }else if(modelTypes===6){
          navigatePage(`/employeeUserInbox/showBillSubmissionForm/${modelIds}`);
      }else if(modelTypes===21){
          //navigatePage(`/voucherInbox/showVoucherApprovalForm/${modelIds}`);
          navigatePage(`/createVoucherSteps/${modelIds}/${'Draft'}`);
      }else if(modelTypes===46){
          navigatePage(`/employeeUserInbox/showPurchaseOrderApprovalForm/${modelIds}`);
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
        }else if(modelTypes===21){
            //Voucher 
            navigatePage(`/showVoucherApprovalForm/${modelIds}`);
        }
    }

    const columns = [
      { field: 'userName', headerName: 'Employee', width: 350, 
        renderCell: (params) => (
          <div>
            {
              (params.row && params.row.currentStatus==='Pending' || params.row.currentStatus==='Request' || params.row.currentStatus==='Requested' || params.row.currentStatus==='Forward' || params.row.currentStatus==='Sent Back' || 
              params.row.currentStatus==='Work Forwarded' || params.row.currentStatus==='Forward To Purchase' || params.row.currentStatus==='Forward To GEM' || params.row.currentStatus==='Forwarded')?
                <div>  
                  <FaUser style={{width:'20px',height:'25px',color:'Orange'}}/>{" "}:{" "}{params.row.userName}) 
                </div>
              :
              (params.row.currentStatus==='Approved' || params.row.currentStatus==='Approve' || params.row.currentStatus==='Dispatched To Account' || params.row.currentStatus==='Online Payment Approved' || params.row.currentStatus==='Tour Approved' || 
                params.row.currentStatus==='Tour Claim Approved' || params.row.currentStatus==='Sent To Bank' || params.row.currentStatus==='Payment Success' || params.row.currentStatus==='Issue Work Order' || params.row.currentStatus==='Work Created')?
                <div>
                  <FaUser style={{width:'20px',height:'25px',color:'green'}}/>{" "}:{" "}{params.row.userName} 
                </div>
              :
              (params.row.currentStatus==='Cancel' || params.row.currentStatus==='Rejected' || params.row.currentStatus==='Work Cancelled' || params.row.currentStatus==='Discard' || params.row.currentStatus==='Cancelled' || 
                params.row.currentStatus==='Reject' || params.row.currentStatus==='PO Cancelled')?
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
      {field: 'userStatus',headerName: 'Status',width: 240,
        renderCell: (params) => (
          <div>
          { (params.row && params.row.currentStatus==='Pending' || params.row.currentStatus==='Request' || params.row.currentStatus==='Requested' || params.row.currentStatus==='Forward' || params.row.currentStatus==='Sent Back' || 
            params.row.currentStatus==='Work Forwarded' || params.row.currentStatus==='Forward To Purchase' || params.row.currentStatus==='Forward To GEM' || params.row.currentStatus==='Forwarded')?
              <div>  
                <span className='pending-icon btn btn-warning'  onClick={(e)=>{showInboxApproval(params.row.modelId,params.row.modelType)}}><MdOutlinePending /> {params.row.currentStatus} </span>
                {"  "}<button className='btn btn-warning pending-icon p-1'><HiOutlineViewfinderCircle style={{width:'20px',height:'25px'}} onClick={(e)=>{searchFun(params.row)}}/></button>{" "}
                {params.row && params.row.objId && loggedInUser && loggedInUser.empId && params.row.objId===loggedInUser.empId?
                  <button className='btn btn-warning pending-icon p-1'><MdOutlineModeEdit style={{width:'20px',height:'25px'}} onClick={(e)=>{editFun(params.row.modelId,params.row.modelType)}}/></button>
                  :
                  <></>
                }
              </div>
            :
            (params.row.currentStatus==='Approved' || params.row.currentStatus==='Approve' || params.row.currentStatus==='Dispatched To Account' || params.row.currentStatus==='Online Payment Approved' || params.row.currentStatus==='Tour Approved' || 
                params.row.currentStatus==='Tour Claim Approved' || params.row.currentStatus==='Sent To Bank' || params.row.currentStatus==='Payment Success' || params.row.currentStatus==='Issue Work Order' || params.row.currentStatus==='Work Created')?
              <div>
                <Button className='approved-icon' color='success' onClick={(e)=>{showInboxApproval(params.row.modelId,params.row.modelType)}}><FcApproval />{params.row.currentStatus}</Button>
                {"  "}<button className='btn btn-success approved-icon p-1'><HiOutlineViewfinderCircle style={{width:'20px',height:'25px'}} onClick={(e)=>{searchFun(params.row.userData)}}/></button>{" "}
                {/*  <button className='btn btn-primary approved-icon p-1'><MdOutlineModeEdit style={{width:'20px',height:'25px'}} onClick={(e)=>{editFun(params.row.userData.id)}}/></button>{" "}
              */}
              </div>
            :
            (params.row.currentStatus==='Cancel' || params.row.currentStatus==='Rejected' || params.row.currentStatus==='Work Cancelled' || params.row.currentStatus==='Discard' || params.row.currentStatus==='Cancelled' || 
                params.row.currentStatus==='Reject' || params.row.currentStatus==='PO Cancelled')?
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
      { field: 'modelCode', headerName: 'Detail', width: 350,
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
                    <b> Leave Application </b> : {" "}[{params.row.modelCode}] 
                    <Divider />
                    {params.row.itemDetails1}
                </div>
                    :                   
                <div>
                    {
                    (params.row && params.row.modelType===6)?           
                    <div>  
                        <b> Bill Submission </b> : {" "}[{params.row.modelCode}] 
                        <Divider />
                        {params.row.itemDetails1}
                    </div>
                        : 
                        <div>
                        {
                            (params.row && params.row.modelType===21)?           
                            <div>  
                                <b style={{color:'purple'}}> Voucher </b> : {" "}[{params.row.modelCode}] 
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
        ),
      },
      {field:'actionDate',headerName: 'Time', width: 200,
        renderCell: (params)=>(            
            <div style={{color:'rgb(7 89 104)'}}>
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
    //{/* {field:'presentOwner',headerName: 'Action', width: 100}, */}
    
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
          onRowClick={(row)=>onRowClick(row)} checkboxSelection style={{backgroundColor:{getRowClassName}, fontSize:'0.86rem',fontStyle:'serif'}}
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

  if(ivloading){
    <p>Please wait ...<Spinner></Spinner></p>
  }
  return (
    
    <div>
      <Card className='form-shadow p-2 mt-0' style={{minWidth:'70rem', marginLeft:'0.5rem',minHeight:'40rem'}}>
      {/* <p><DateDisplay date={new Date()}/> </p>  */}      
         {
            ivloading===false? 
            <div>
              <ParentChildDataGrid data={inboxVoucherItems} onRowClick={handleRowClick} />
            </div>
            :
            <div>
              <Row className='mt-4'>
                <Col sm="6"></Col>
                <Col sm="6">`</Col>
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
                          
                      </tbody>
                  </Table>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className={backGStatus}>
            <p>Voucher</p>
            </ModalFooter>
          </Modal>
        {/* Modal  */}
        </Card>             
        <ToastContainer>
        </ToastContainer>
     
    </div>
  )
}

export default InboxVoucher;

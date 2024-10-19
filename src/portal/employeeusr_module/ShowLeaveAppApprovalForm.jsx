import { ArrowBack, ArrowForward, Cancel} from '@mui/icons-material';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner, Table} from 'reactstrap';
import Alert from '@mui/material/Alert';
import { FcApprove } from "react-icons/fc";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { fetchCWMByModelId, findNextEmployeeByEmployeeId } from './inboxEmployeeSlice';
import { findEmployeeByCode } from '../establishment_module/establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { Divider } from '@mui/material';
import { approveLeaveApplication, findLeaveAppItemByLeaveAppId, findLeaveApplicationById } from '../leave_module/leave_redux/slices/leave_slice/leaveMasterSlice';
import { FcWorkflow } from 'react-icons/fc';
import DateDisplay from './DateDisplay';
import { getLoggedInEmployee } from '../../auth/auth_slice/loginUserSlice';
import { createWorkFlowPrivilege, findAllEmployeesByWorkFlowName, findAllEmployeesInAReqWorkFlow, findRequestApproverByModelId, isApprovalRoleByempId, isApprovePrivilegeByempId, isForwardPrivilegeByempId, isForwardRoleByempId, isRejectPrivilegeByempId, isRejectRoleByempId, leaveUserFormApproval } from '../setup_module/setup_redux/workflow_slices/workFlowAlertSlice';


const ShowLeaveAppApprovalForm = () => {
    const {id} = useParams();
    const dispatch=useDispatch();
    const navigatePage = useNavigate();
    const [isRemarks,setIsRemarks] = useState(false);
    const [remarkLength,setRemarkLength] = useState(0);
    const [remarkValue, setRemarkValue] = useState('');
    const [isSendDiv,setIsSendDiv] = useState(false);
    const [isCancelDiv,setIsCancelDiv] = useState(false);
    const [isFrwdDiv,setIsFrwdDiv] = useState(false);
    const [isApproveDiv,setIsApproveDiv] = useState(false);
    const [actionClicked,setActionClicked] = useState('');
    const {employeeById} = useSelector((state)=>state.allstorereducer.employeeData);
    const {leaveApplications,leaveApplicationItems,approvedLeave,leaveLoading} = useSelector((state)=>state.allstorereducer.lvMaster);
    const {activeUserId,loggedInUser,loggedInEmployee,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const {workflowModels} = useSelector((state)=>state.allstorereducer.inboxEmployee);
    const {isApprove,isForward,isReject,nextEmployees,reqApprover} = useSelector((state)=>state.allstorereducer.workflow);
    const [leaveApplied,setLeaveApplied] = useState();

    useEffect(()=>{
        const uToken = localStorage.getItem('user-token');
        if(uToken!=null && uToken!=""){
            dispatch(findEmployeeByCode(uToken));
        }
        dispatch(getLoggedInEmployee());
        //alert("emp id="+employeeById.id+", "+uToken+", modelid="+id);
        dispatch(findLeaveApplicationById(id));
        dispatch(findLeaveAppItemByLeaveAppId(id));
        window.scrollTo({top:'0', left:'0', behavior:'smooth'});     
        console.log("Leave id= "+id);      
        //dispatch(findNextEmployeeByEmployeeId(employeeById.id));
        dispatch(fetchCWMByModelId(id));
        dispatch(findRequestApproverByModelId(id));
        //Privilege Role
        if(loggedInEmployee && loggedInEmployee.id){
            dispatch(isRejectPrivilegeByempId({param1:(loggedInEmployee && loggedInEmployee.id),param2:"LEAVE APPLICATION WORK FLOW"}));
            dispatch(isApprovePrivilegeByempId({param1:(loggedInEmployee && loggedInEmployee.id),param2:"LEAVE APPLICATION WORK FLOW"}));
            dispatch(isForwardPrivilegeByempId({param1:(loggedInEmployee && loggedInEmployee.id),param2:"LEAVE APPLICATION WORK FLOW"}));
        }
    }, []);
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
        return `${year}-${month}-${day}`;
    }
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      //alert("e.value= "+e.target.value+",  e.name="+e.target.name);
      if(e.target.value!=-1 && e.target.name==='campusWorkflowModel.nextEmployee.id'){
        setIsRemarks(true);
        setLeaveApplied({...leaveApplied,["approvedBy"]:{"id":e.target.value,"code":"SBI"}});
        //setLeaveApplied({...leaveApplied,["reason"]:e.target.value});
      }else if(e.target.value<0 && e.target.name==='campusWorkflowModel.nextEmployee.id'){
        setIsRemarks(false);
        setRemarkValue('');
        setRemarkLength(0);
      }
      else if(e.target.name==='campusWorkflowModel.remarks'){
        setRemarkValue(e.target.value);
        setRemarkLength(e.target.value.length);
        setLeaveApplied({...leaveApplied,["remarks"]:e.target.value});
        //setLeaveApplied({...leaveApplied,["status"]:e.target.value});

      }
      
      console.log(leaveApplied);
    }

    const submitRequest=(modelId,request)=>{
      alert("modelId="+modelId+", Request="+request);
      return false;
    }
    const cancelRequest=(e,modelId,request)=>{
        e.preventDefault();
        if(isRemarks){setIsRemarks(false);} 
        setActionClicked("cancelRequest");
        setIsCancelDiv(true);
        setRemarkValue(null);
        setRemarkLength(0);
        dispatch(findAllEmployeesInAReqWorkFlow({param1:modelId,param2:1}));
        setIsFrwdDiv(false);
        setIsSendDiv(false);
        setIsApproveDiv(false);
    }
    const sendBackRequest=(e,modelId,request)=>{
        e.preventDefault();
        if(isRemarks){setIsRemarks(false);} 
        setActionClicked("sendBackRequest");
        setRemarkValue(null);
        setRemarkLength(0);
        setIsSendDiv(true);
        dispatch(findAllEmployeesInAReqWorkFlow({param1:modelId,param2:1}));
        setIsFrwdDiv(false);
        setIsCancelDiv(false);
        setIsApproveDiv(false);
    }
    const forwardRequest=(e,modelId,request)=>{
        e.preventDefault();
        if(isRemarks){setIsRemarks(false);} 
        setRemarkValue(null);
        setRemarkLength(0);
        setActionClicked("forwardRequest");
        setIsFrwdDiv(true);
        dispatch(findAllEmployeesByWorkFlowName({param1:modelId,param2:"LEAVE APPLICATION WORK FLOW"}));
        setIsSendDiv(false);
        setIsCancelDiv(false);
        setIsApproveDiv(false);
    }
    const rejectRequest=(e,modelId,request)=>{
        e.preventDefault();
        if(isRemarks){setIsRemarks(false);}  
        setRemarkValue(null);  
        setRemarkLength(0);   
        setActionClicked("rejectRequest");
        setIsApproveDiv(true);
        dispatch(findAllEmployeesInAReqWorkFlow({param1:modelId,param2:1}));
        setIsSendDiv(false);
        setIsFrwdDiv(false);
        setIsCancelDiv(false);
    }

    const approveRequest=(e,modelId,request)=>{
        e.preventDefault();
        if(isRemarks){setIsRemarks(false);}       
        setActionClicked("approveRequest");
        setRemarkValue(null);
        setRemarkLength(0);
        setIsApproveDiv(true);
        dispatch(findAllEmployeesInAReqWorkFlow({param1:modelId,param2:1}));
        setIsSendDiv(false);
        setIsFrwdDiv(false);
        setIsCancelDiv(false);
    }

    function getFormattedDate(date) {
        if(date.getFullYear()!=1970){
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
          const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
          return `${day}-${month}-${year}`;
        }
    }
    const processLeave=(e,modelId,request)=>{
        e.preventDefault();
        if(remarkValue!=null && remarkValue!="" && remarkLength>1){
            const leaveApp={...leaveApplied,["status"]:request};
            const leaveApp2={...leaveApp,["id"]:modelId};
            //setLeaveApplied(leaveApp);
            console.log(leaveApp2);
            alert("leaveApplication="+request);
            dispatch(approveLeaveApplication(leaveApp2));
            navigatePage("/employeeUserInbox");
        }else{
            toast.info("Remarks can not be empty!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        if(approvedLeave && approvedLeave.approvalStatus==='Approved'){
            toast.success("Request has Approved successfully.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            navigatePage("/employeeUserInbox");
        }
    }

    if(leaveLoading){
        <Spinner style={{color:'green'}}></Spinner>
    }

  return (
    <div>
      <form style={{minHeight:'45rem',fontSize:'0.9rem'}}>
        <Card style={{minWidth:'80rem', backgroundImage:'linear-gradient(1deg, rgb(255, 255, 255) 0%, rgb(238 247 251) 61%, rgb(255, 255, 255) 100%)'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>Employee User / Leave Approval Form</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Row>
                    <Col sm={2}><Button color='warning' onClick={goback}><ArrowBack/></Button ></Col>
                    <Col sm={10}>
                    {
                        (leaveApplications && leaveApplications.status==='Approved')?
                            <Alert severity="success" style={{fontSize:'1rem'}}>[ Approved ] : {" "} Leave Application of : [{leaveApplications && leaveApplications.employee && leaveApplications.employee.code}] {" "}{leaveApplications && leaveApplications.employee && leaveApplications.employee.fullName} </Alert>
                        :
                        <div>
                        {
                            (leaveApplications && leaveApplications.status==='Pending' || leaveApplications && leaveApplications.status==='Request')?
                            <Alert severity="warning" style={{fontSize:'1rem'}}>[ Pending ] : {" "} Leave Application of : [{leaveApplications && leaveApplications.employee && leaveApplications.employee.code}] {" "}{leaveApplications && leaveApplications.employee && leaveApplications.employee.fullName} </Alert>
                            :
                            <div>
                            {
                                (leaveApplications && leaveApplications.status==='Rejected')?
                                <Alert severity="error" style={{fontSize:'1rem'}}>[ Rejected ] : {" "} Leave Application of : [{leaveApplications && leaveApplications.employee && leaveApplications.employee.code}] {" "}{leaveApplications && leaveApplications.employee && leaveApplications.employee.fullName} </Alert>
                                :
                                <div>
                                {
                                    (leaveApplications && leaveApplications.status==='Cancel')?
                                    <Alert severity="error" style={{fontSize:'1rem'}}>[ Cancelled ] : {" "} Leave Application of : [{leaveApplications && leaveApplications.employee && leaveApplications.employee.code}] {" "}{leaveApplications && leaveApplications.employee && leaveApplications.employee.fullName} </Alert>
                                    :
                                    <div>
                                    {
                                        (leaveApplications && leaveApplications.status==='Forwarded')?
                                        <Alert severity="warning" style={{fontSize:'1rem'}}>[ Forwarded ] : {" "} Leave Application of : [{leaveApplications && leaveApplications.employee && leaveApplications.employee.code}] {" "}{leaveApplications && leaveApplications.employee && leaveApplications.employee.fullName} </Alert>
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
                    </Col>
                </Row>
                                 
            </CardHeader>
            <CardBody>
                <Row>
                    <Col sm={6}>                        
                        <Divider/>
                        <Card>
                        <CardHeader>Leave Application Details</CardHeader>
                        <CardBody>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Leave Application Date : </td>
                                        <td>{getFormattedDate(new Date(leaveApplications && leaveApplications.leaveApplicationDate))}</td>
                                    </tr>
                                    <tr>
                                        <td>Employee Name : </td>
                                        <td>{leaveApplications && leaveApplications.employee && leaveApplications.employee.fullName}</td>
                                    </tr>
                                    <tr>
                                        <td>Entered By : </td>
                                        <td>{leaveApplications && leaveApplications.enteredBy && leaveApplications.enteredBy.fullName}</td>
                                    </tr>
                                    <tr>
                                        <td>Designation : </td>
                                        <td>{employeeById && employeeById.designationDto && employeeById.designationDto.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Department : </td>
                                        <td>{employeeById && employeeById.departmentDto && employeeById.departmentDto.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Reason of Leave : </td>
                                        <td>{leaveApplications && leaveApplications.reason}</td>
                                    </tr>
                                    <tr>
                                        <td>Medical Reason : </td>
                                        <td>{leaveApplications && leaveApplications.medicalReason}</td>
                                    </tr>
                                    <tr>
                                        <td>Leave Notes : </td>
                                        <td>{leaveApplications && leaveApplications.teachingNote}</td>
                                    </tr>
                                </tbody>
                            </Table>                           
                        </CardBody>    
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card>
                            <CardHeader>Leave Description</CardHeader>   
                            <CardBody>
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
                            </CardBody>
                        </Card>
                        <Row>
                            <Col>`</Col>
                        </Row>
                        <Card>
                            <CardHeader>Request Privileges</CardHeader>
                            <CardBody style={{minHeight:'10rem',alignContent:'center'}}>
                                {/* Send Back */}
                                {
                                    (isCancelDiv===true || isSendDiv===true)?
                                    <Card className='mb-2 form-shadow' style={{width:'35rem'}}>
                                        <CardBody>
                                            <Row>
                                                <p>Select employee whom you want to send :</p>
                                                <select id="campusWorkflowModel.nextEmployee.id" name="campusWorkflowModel.nextEmployee.id" onChange={handleChange} 
                                                className='form-select'>
                                                    <option value={-1}>-- select employee --</option>
                                                    {
                                                        nextEmployees && nextEmployees.map((emp)=>(
                                                            <option value={emp.id}>[{emp && emp.code}] - {emp && emp.fullName}</option>
                                                        ))
                                                    }
                                                </select>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                    :
                                    <div></div>
                                }
                                {
                                    (isCancelDiv===true || isSendDiv===true) && isRemarks===true?
                                    <Card className='mb-3 form-shadow' style={{width:'35rem'}}>
                                        <CardBody>
                                            <Row>
                                            <p>Remarks (<i style={{color:'red'}}>Note : at least two characters required.</i>) :</p>
                                                <textarea className='form-control' id='campusWorkflowModel.remarks' name='campusWorkflowModel.remarks' value={remarkValue} onChange={handleChange} rows={3} cols={10} placeholder='Enter your remarks'/>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                    :
                                    <div></div>
                                }
                                {/* end Send Back */}
                                {
                                    (leaveApplications && (leaveApplications.status==='Approved') || leaveApplications.status==='Approve')?
                                    <div>
                                        <Row>
                                            <Col sm="6"><button className='btn btn-danger form-shadow p-3' style={{width:'16rem'}} disabled={true}><Cancel/> Cancel</button> </Col>
                                            <Col sm="6"><button className='btn btn-warning form-shadow p-3' style={{width:'16rem'}} disabled={true}><ArrowBack/> Send Back</button> </Col>
                                        </Row>
                                    </div>
                                    :
                                    <div>
                                        <Row className='mb-1'>
                                        { 
                                            (remarkLength && remarkLength>1 && actionClicked==='cancelRequest')?
                                            <Col sm="6"><button className='btn btn-danger form-shadow p-2' name="cancelRequest" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,leaveApplications && leaveApplications.id,"Cancel")}}><Cancel/> Cancel & Send</button> </Col>
                                            :
                                            <Col sm="6"><button className='btn btn-danger form-shadow p-2' name="Cancel" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{cancelRequest(e,leaveApplications && leaveApplications.id,"Cancel")}}><Cancel/> Cancel</button> </Col>
                                        }
                                        {
                                            (remarkLength && remarkLength>1 && actionClicked==='sendBackRequest')?
                                            <Col sm="6"><button className='btn btn-warning form-shadow p-2' name="sendBackRequest" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,leaveApplications && leaveApplications.id,"Send Back")}}><ArrowBack/> Send Back & Save</button> </Col>
                                            :
                                            <Col sm="6"><button className='btn btn-warning form-shadow p-2' name="Send Back" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{sendBackRequest(e,leaveApplications && leaveApplications.id,"Send Back")}}><ArrowBack/> Send Back </button> </Col>
                                        }
                                            
                                        </Row>
                                    {/* Forward */}
                                        
                                        {
                                            (isFrwdDiv===true)?
                                            <Card className='mb-2 form-shadow' style={{width:'35rem'}}>
                                                <CardBody>
                                                    <Row><p>Select employee whom you want to send :</p>
                                                        <select id="campusWorkflowModel.nextEmployee.id" name="campusWorkflowModel.nextEmployee.id" onChange={handleChange} 
                                                        className='form-select'>
                                                            <option value={-1}>-- select employee --</option>
                                                            {
                                                                nextEmployees && nextEmployees.map((emp)=>(
                                                                    <option value={emp.id}>[{emp && emp.code}] - {emp && emp.fullName}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                            :
                                            <div></div>
                                        }{
                                            (isFrwdDiv===true && isRemarks===true)?
                                                <Card className='mb-3 form-shadow' style={{width:'35rem'}}>
                                                    <CardBody>
                                                        <Row>
                                                        <p>Remarks (<i style={{color:'red'}}>Note : at least two characters required.</i>) :</p>
                                                            <textarea className='form-control' id='campusWorkflowModel.remarks' name='campusWorkflowModel.remarks' onChange={handleChange} rows={3} cols={10} placeholder='Enter your remarks'/>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                                :
                                                <div></div>
                                        }
                                        <Row className='mb-1'>
                                        {
                                            (isForward && isForward==='YES')?
                                            <Col sm="6">
                                                {
                                                    (remarkLength && remarkLength>1 && actionClicked==='forwardRequest')?
                                                    <button className='btn btn-info form-shadow p-2' id="Forward" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,leaveApplications && leaveApplications.id,"Forward")}}>Forward To<ArrowForward/></button> 
                                                    :
                                                    <button className='btn btn-info form-shadow p-2' id="Forward" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{forwardRequest(e,leaveApplications && leaveApplications.id,"Forward")}}>Forward <ArrowForward/></button> 
                                                }
                                                
                                            </Col>
                                            :
                                            <Col sm="6"></Col>
                                        }                                        
                                        </Row>
                                    {/* end Forward */}
                                    
                                    {/* Approve/Reject */}
                                        
                                        {
                                            isApproveDiv===true?
                                            <Card className='mb-2 form-shadow'  style={{width:'35rem'}}>
                                                <CardBody>
                                                    <Row><p>Select employee whom you want to send :</p>
                                                        <select id="campusWorkflowModel.nextEmployee.id" name="campusWorkflowModel.nextEmployee.id" onChange={handleChange} 
                                                        className='form-select'>
                                                            <option value={-1}>-- select employee --</option>
                                                            {
                                                                nextEmployees && nextEmployees.map((emp)=>(
                                                                    <option value={emp.id}>[{emp && emp.code}] - {emp && emp.fullName}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                            :
                                            <div></div>
                                        }{
                                            isApproveDiv===true && isRemarks===true?
                                                <Card className='mb-3 form-shadow'  style={{width:'35rem'}}>
                                                    <CardBody>
                                                        <Row>
                                                            <p>Remarks (<i style={{color:'red'}}>Note : at least two characters required.</i>) :</p>
                                                            <textarea className='form-control' id='campusWorkflowModel.remarks' name='campusWorkflowModel.remarks' onChange={handleChange} rows={3} cols={10} placeholder='Enter your remarks'/>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                                :
                                                <div></div>
                                        }
                                        <Row className='mb-1'>
                                        {
                                            (((loggedInUser && reqApprover && loggedInUser.empId===reqApprover.id) && isApprove && isApprove==='YES') || ((loggedInUser && reqApprover && loggedInUser.empId===reqApprover.id) && (isReject && isReject==='YES')))?
                                            <>
                                            {
                                                (remarkLength && remarkLength>1 && actionClicked==='approveRequest')?
                                                <Col sm="6"><button className='btn btn-success form-shadow p-2' id="Approve" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,leaveApplications && leaveApplications.id,"Approve")}}>Approve & Send<FcApprove/></button> </Col>
                                                :
                                                <Col sm="6"><button className='btn btn-success form-shadow p-2' id="Approve" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{approveRequest(e,leaveApplications && leaveApplications.id,"Approve")}}>Approve <FcApprove/></button> </Col>
                                            }
                                            {
                                                (remarkLength && remarkLength>1 && actionClicked==='rejectRequest')?
                                                <Col sm="6"><button className='btn btn-danger form-shadow p-2' id="Reject" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,leaveApplications && leaveApplications.id,"Reject")}}><Cancel/> Reject & Send</button> </Col>
                                                :
                                                <Col sm="6"><button className='btn btn-danger form-shadow p-2' id="Reject" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{rejectRequest(e,leaveApplications && leaveApplications.id,"Reject")}}><Cancel/> Reject</button> </Col>
                                            }
                                            
                                            </>                                                                                        
                                            :
                                            <Col sm="6">.</Col>
                                        }
                                        </Row>
                                    {/* end Approve/Reject */}
                                    </div>
                                }                                
                            </CardBody>
                        </Card>
                        
                        
                    </Col>
                </Row>
                <Row>
                    <Col>`</Col>
                </Row>
                <Card>
                    <CardHeader> <FcWorkflow/> Workflow activity</CardHeader>
                    <CardBody>
                        <Table>
                            <tbody>
                                {
                                    workflowModels && workflowModels.length>0 && workflowModels.map((cwm)=>(
                                    <tr key={cwm.id}>
                                        <td style={{width:'16%'}}> {cwm && cwm.reqEmployee && cwm.reqEmployee.fullName}<br />
                                        <i style={{color:'purple',fontSize:'0.8rem'}}>remarks: {cwm && cwm.remarks}</i>
                                        </td>
                                        <td style={{width:'11%'}}>[ <b>{cwm && cwm.status} to </b>]</td>
                                        <td style={{width:'16%'}}>{cwm && cwm.nextEmployee && cwm.nextEmployee.fullName}</td>
                                        <td style={{width:'50%',textAlign:'right',color:'blue'}}>
                                            <DateDisplay date={new Date(cwm.dateOfAction)}/>                                                 
                                        </td>                                        
                                    </tr>
                                    ))
                                }                               
                            </tbody>
                        </Table>
                        
                    </CardBody>
                </Card>
            </CardBody>
            <CardFooter>
              <p>footer</p>
            </CardFooter>
        </Card>
        <ToastContainer></ToastContainer>
      </form>
    </div>
  )
}

export default ShowLeaveAppApprovalForm;

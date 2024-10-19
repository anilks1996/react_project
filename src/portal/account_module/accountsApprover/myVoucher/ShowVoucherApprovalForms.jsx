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
import { Divider } from '@mui/material';
import { FcWorkflow } from 'react-icons/fc';
import { approveVoucherEntry, getTotalDrCrFromVoucher, showVoucherEntryById, showVoucherTransactionByVoucherId } from '../../accounts_redux/slices/accounts_approver_slice/voucherEntrySlice';
import { fetchCWMByModelId, findNextEmployeeByEmployeeId } from '../../../employeeusr_module/inboxEmployeeSlice';
import { findEmployeeByCode } from '../../../establishment_module/establishment_redux/slices/establishment_slice/employeeSetupSlice';
import DateDisplay from '../../../employeeusr_module/DateDisplay';
import { getLoggedInEmployee } from '../../../../auth/auth_slice/loginUserSlice';
import { findAllEmployeesByWorkFlowName, findAllEmployeesInAReqWorkFlow, isApprovalRoleByempId, isApprovePrivilegeByempId, isForwardPrivilegeByempId, isForwardRoleByempId, isRejectPrivilegeByempId, isRejectRoleByempId } from '../../../setup_module/setup_redux/workflow_slices/workFlowAlertSlice';
import { FaRupeeSign } from 'react-icons/fa';
import { getActiveAccCompanyFinancialYear } from '../../accounts_redux/slices/accounts_slice/accCompanyFinancialSlice';


const ShowVoucherApprovalForms = () => {
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
    const {activeUserId,loggedInEmployee,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const {workflowModels} = useSelector((state)=>state.allstorereducer.inboxEmployee);
    const {isApprove,isForward,isReject,nextEmployees,reqApproval} = useSelector((state)=>state.allstorereducer.workflow);
    const {voucher,vloading,voucherTrxns,voucherCD,vtloading}=useSelector((state)=>state.allstorereducer.voucherEntry);
    const {acfy}=useSelector((state)=>state.allstorereducer.acfy);
    const [voucherObj,setVoucherObj] = useState();
    const [nextEmpId,setNextEmpId] = useState();

    useEffect(()=>{
        const uToken = localStorage.getItem('user-token');
        if(uToken!=null && uToken!=""){
            dispatch(findEmployeeByCode(activeUserId));
        }
        dispatch(getLoggedInEmployee());
        dispatch(showVoucherEntryById(id));
        dispatch(showVoucherTransactionByVoucherId(id));
        
        window.scrollTo({top:'0', left:'0', behavior:'smooth'});     
        console.log("Voucher id= "+id);      
        dispatch(findNextEmployeeByEmployeeId(employeeById.id));
        dispatch(fetchCWMByModelId(id));
        dispatch(getActiveAccCompanyFinancialYear());
        //Privilege Role
        if(loggedInEmployee && loggedInEmployee.id){
            dispatch(isRejectPrivilegeByempId({param1:(loggedInEmployee && loggedInEmployee.id),param2:"ACCOUNTS WORK FLOW"}));
            dispatch(isApprovePrivilegeByempId({param1:(loggedInEmployee && loggedInEmployee.id),param2:"ACCOUNTS WORK FLOW"}));
            dispatch(isForwardPrivilegeByempId({param1:(loggedInEmployee && loggedInEmployee.id),param2:"ACCOUNTS WORK FLOW"}));
        }
        dispatch(getTotalDrCrFromVoucher(id));
    }, []);

    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      //alert("e.value= "+e.target.value+",  e.name="+e.target.name);
      if(e.target.value!=-1 && e.target.name==='campusWorkflowModel.nextEmployee.id'){
        setIsRemarks(true);
        setVoucherObj({...voucherObj,["campusWorkflowModel.nextEmployee"]:{"id":e.target.value,"code":"SBI"}});
        setNextEmpId(e.target.value);
        //setVoucherObj({...voucherObj,["reason"]:e.target.value});
      }else if(e.target.value<0 && e.target.name==='campusWorkflowModel.nextEmployee.id'){
        setIsRemarks(false);
        setRemarkValue('');
        setRemarkLength(0);
      }
      else if(e.target.name==='campusWorkflowModel.remarks'){
        setRemarkValue(e.target.value);
        setRemarkLength(e.target.value.length);
        setVoucherObj({...voucherObj,["campusWorkflowModel.remarks"]:e.target.value});
        //setVoucherObj({...voucherObj,["status"]:e.target.value});
      }
       console.log(voucherObj);
    }

    const cancelRequest=(e,modelId,request)=>{
        e.preventDefault();
        if(isRemarks){setIsRemarks(false);} 
        setActionClicked("cancelRequest");
        setIsCancelDiv(true);
        setRemarkValue(null);
        setRemarkLength(0);
        dispatch(findAllEmployeesInAReqWorkFlow({param1:modelId,param2:21}));
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
        dispatch(findAllEmployeesInAReqWorkFlow({param1:modelId,param2:21}));
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
        dispatch(findAllEmployeesByWorkFlowName({param1:modelId,param2:"ACCOUNTS WORK FLOW"}));

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
        dispatch(findAllEmployeesInAReqWorkFlow({param1:modelId,param2:21}));
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
        dispatch(findAllEmployeesInAReqWorkFlow({param1:modelId,param2:21}));
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
            const addAcfy={...voucherObj,["id"]:modelId,
                ["status"]:request,
                ["campusWorkflowModel"]:{"id":null,"status":request,"remarks":remarkValue,"nextEmployee":{"id":nextEmpId,"code":"123"}},
                ["accCompanyFinancialYear"]:{"id":acfy.id,"status":"Active",["accCompany"]:{"id":(acfy.accCompany && acfy.accCompany.id)},["financialYear"]:{"id":(acfy.financialYear && acfy.financialYear.id)}}
              };
    //Approal step        
            dispatch(approveVoucherEntry(addAcfy));
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
        if(voucher && voucher.status==='Approve' || voucher && voucher.status!=null || voucher && voucher.status!=""){
            toast.info("Request has been"+(voucher && voucher.status)+" .", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigatePage("/myVoucherInbox");
        }
    }

    if(vloading){
        <Spinner style={{color:'green'}}></Spinner>
    }

  return (
    <div>
      <form style={{minHeight:'45rem',fontSize:'0.8rem'}}>
        <Card style={{minWidth:'80rem', backgroundImage:'linear-gradient(1deg, rgb(255, 255, 255) 0%, rgb(238 247 251) 61%, rgb(255, 255, 255) 100%)'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>Voucher Approval Form</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Row>
                    <Col sm={2}><Button color='warning' onClick={goback}><ArrowBack/></Button ></Col>
                    <Col sm={10}>
                    {
                        (voucher && voucher.status==='Approve')?
                            <Alert severity="success" style={{fontSize:'1rem'}}><b style={{color:'purple'}}> {voucher && voucher.voucherNo}</b> [ Approved ] : {" "} Voucher made by : [{voucher && voucher.requestedEmployee && voucher.requestedEmployee.code}] {" "}{voucher && voucher.requestedEmployee && voucher.requestedEmployee.fullName} </Alert>
                        :
                        <div>
                        {
                            (voucher && voucher.status==='Pending' || voucher && voucher.status==='Request')?
                            <Alert severity="warning" style={{fontSize:'1rem'}}>[ Pending ] : {" "} Voucher made by : [{voucher && voucher.requestedEmployee && voucher.requestedEmployee.code}] {" "}{voucher && voucher.requestedEmployee && voucher.requestedEmployee.fullName} </Alert>
                            :
                            <div>
                            {
                                (voucher && voucher.status==='Rejected' || voucher && voucher.status==='Reject')?
                                <Alert severity="error" style={{fontSize:'1rem'}}>[ Rejected ] : {" "} Voucher made by : [{voucher && voucher.requestedEmployee && voucher.requestedEmployee.code}] {" "}{voucher && voucher.requestedEmployee && voucher.requestedEmployee.fullName} </Alert>
                                :
                                <div>
                                {
                                    (voucher && voucher.status==='Cancelled' || voucher && voucher.status==='Cancel')?
                                    <Alert severity="error" style={{fontSize:'1rem'}}>[ Cancelled ] : {" "} Voucher made by : [{voucher && voucher.requestedEmployee && voucher.requestedEmployee.code}] {" "}{voucher && voucher.requestedEmployee && voucher.requestedEmployee.fullName} </Alert>
                                    :
                                    <div>
                                    {
                                        (voucher && voucher.status==='Forwarded' || voucher && voucher.status==='Forward')?
                                        <Alert severity="warning" style={{fontSize:'1rem'}}>[ Forwarded ] : {" "} Voucher made by : [{voucher && voucher.employee && voucher.requestedEmployee.code}] {" "}{voucher && voucher.requestedEmployee && voucher.requestedEmployee.fullName} </Alert>
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
                        <CardHeader>Voucher Transaction Details </CardHeader>
                        {
                         voucherTrxns && voucherTrxns.length>0 ?
                        <CardBody className='p-0'>      
                            <Card className='p-0'>                                                 
                                <CardHeader><b>Dr [Debit]</b></CardHeader>
                                <CardBody className='p-0'>
                                <Table>
                                    <tbody>
                                    {
                                        voucherTrxns && voucherTrxns.map((vtrxn,index)=>(
                                        <tr key={vtrxn.id}>
                                            {
                                                vtrxn && vtrxn.type==='Dr'? 
                                                <>
                                                <td>{index+1}</td>
                                                <td>
                                                Dept./Budget : [ {vtrxn && vtrxn.costCenter && vtrxn.costCenter.code} ] {vtrxn && vtrxn.costCenter && vtrxn.costCenter.name}<br />
                                                Account Haed : [ {vtrxn && vtrxn.accountChart && vtrxn.accountChart.chartCode} ] {vtrxn && vtrxn.accountChart && vtrxn.accountChart.name}<br />
                                                    {
                                                        (voucher && voucher.advanceFor==='Employee')?
                                                        <>Party : [ {vtrxn && vtrxn.employee && vtrxn.employee.code} ] {vtrxn && vtrxn.employee && vtrxn.employee.fullName}<br /></>
                                                        :
                                                        (voucher && voucher.advanceFor==='Party')?
                                                        <>Party : [ {vtrxn && vtrxn.vendor && vtrxn.vendor.code} ] {vtrxn && vtrxn.vendor && vtrxn.vendor.name}<br /></>
                                                        :
                                                        <>Other : {voucher && voucher.payTo} <br /></>
                                                    }                            
                                                    Amount : <FaRupeeSign/> {vtrxn && vtrxn.amount}<br/>
                                                    <i>{vtrxn && vtrxn.narration}</i>
                                                </td>
                                                </>
                                                :
                                                <></>
                                            }
                                            
                                        </tr>
                                        ))                                                                        
                                    }                                   
                                    </tbody>
                                </Table>  
                                </CardBody>
                            </Card>   
                            <Card>                                                 
                                <CardHeader><b>Cr [Credit]</b></CardHeader>
                                <CardBody>
                                <Table>
                                    <tbody>
                                    {
                                        voucherTrxns && voucherTrxns.map((vtrxn,index)=>(
                                        <tr key={vtrxn.id}>
                                            {
                                                vtrxn && vtrxn.type==='Cr'? 
                                                <>
                                                <td>{index+1}</td>
                                                <td>
                                                    Dept./Budget : [ {vtrxn && vtrxn.costCenter && vtrxn.costCenter.code} ] {vtrxn && vtrxn.costCenter && vtrxn.costCenter.name}<br />
                                                    Account Haed : [ {vtrxn && vtrxn.accountChart && vtrxn.accountChart.chartCode} ] {vtrxn && vtrxn.accountChart && vtrxn.accountChart.name}<br />                                                    
                                                    {
                                                        (voucher && voucher.advanceFor==='Employee')?
                                                        <>Party : [ {vtrxn && vtrxn.employee && vtrxn.employee.code} ] {vtrxn && vtrxn.employee && vtrxn.employee.fullName}<br /></>
                                                        :
                                                        (voucher && voucher.advanceFor==='Party')?
                                                        <>Party : [ {vtrxn && vtrxn.vendor && vtrxn.vendor.code} ] {vtrxn && vtrxn.vendor && vtrxn.vendor.name}<br /></>
                                                        :
                                                        <>Other : {voucher && voucher.payTo} <br /></>
                                                    }  
                                                    Amount : <FaRupeeSign/> {vtrxn && vtrxn.amount}<br />
                                                    <i>{vtrxn && vtrxn.narration}</i>                          
                                                </td>
                                                </>
                                                :
                                                <></>
                                            }                                           
                                        </tr>
                                        ))                                                                        
                                    }                                   
                                    </tbody>
                                </Table>  
                                </CardBody>
                            </Card>                      
                        </CardBody>                               
                        :
                        <div></div>
                        } 
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card>
                            <CardHeader>Voucher Details</CardHeader>   
                            <CardBody>
                                <Table border={1}>
                                    <tbody>    
                                        <tr><td>
                                        <b>
                                            {voucher && voucher.accCompanyFinancialYear && voucher.accCompanyFinancialYear.financialYear && voucher.accCompanyFinancialYear.financialYear.name}
                                        </b>
                                        </td> </tr>                                                                    
                                        <tr><td>
                                            <p>Total Amount : <FaRupeeSign/> {voucher && voucher.totalDebit}</p>
                                        </td></tr>
                                        <tr><td>
                                            Voucher Date : {voucher && voucher.voucherDate} <br />
                                            Narration : {voucher && voucher.narration} <br/>
                                            Bill No : {voucher && voucher.billNo}
                                        </td></tr>                                                                                                                                                  
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                        <Row>
                            <Col>`</Col>
                        </Row>
                        <Card>
                            <CardHeader>Request Privileges isApprove:{isApprove} isForward:{isForward}</CardHeader>
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
                                    (voucher && (voucher.status==='Approved') || voucher && voucher.status==='Approve')?
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
                                            <Col sm="6"><button className='btn btn-danger form-shadow p-2' name="cancelRequest" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,voucher && voucher.id,"Cancel")}}><Cancel/> Cancel & Send</button> </Col>
                                            :
                                            <Col sm="6"><button className='btn btn-danger form-shadow p-2' name="Cancel" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{cancelRequest(e,voucher && voucher.id,"Cancel")}}><Cancel/> Cancel</button> </Col>
                                        }
                                        {
                                            (remarkLength && remarkLength>1 && actionClicked==='sendBackRequest')?
                                            <Col sm="6"><button className='btn btn-warning form-shadow p-2' name="sendBackRequest" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,voucher && voucher.id,"Send Back")}}><ArrowBack/> Send Back & Save</button> </Col>
                                            :
                                            <Col sm="6"><button className='btn btn-warning form-shadow p-2' name="Send Back" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{sendBackRequest(e,voucher && voucher.id,"Send Back")}}><ArrowBack/> Send Back </button> </Col>
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
                                                    <button className='btn btn-info form-shadow p-2' id="Forward" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,voucher && voucher.id,"Forward")}}>Forward To<ArrowForward/></button> 
                                                    :
                                                    <button className='btn btn-info form-shadow p-2' id="Forward" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{forwardRequest(e,voucher && voucher.id,"Forward")}}>Forward <ArrowForward/></button> 
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
                                            ((isApprove && isApprove==='YES') || (isReject && isReject==='YES'))?
                                            <>
                                            {
                                                (remarkLength && remarkLength>1 && actionClicked==='approveRequest')?
                                                <Col sm="6"><button className='btn btn-success form-shadow p-2' id="Approve" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,voucher && voucher.id,"Approve")}}>Approve & Send<FcApprove/></button> </Col>
                                                :
                                                <Col sm="6"><button className='btn btn-success form-shadow p-2' id="Approve" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{approveRequest(e,voucher && voucher.id,"Approve")}}>Approve <FcApprove/></button> </Col>
                                            }
                                            {
                                                (remarkLength && remarkLength>1 && actionClicked==='rejectRequest')?
                                                <Col sm="6"><button className='btn btn-danger form-shadow p-2' id="Reject" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{processLeave(e,voucher && voucher.id,"Reject")}}><Cancel/> Reject & Send</button> </Col>
                                                :
                                                <Col sm="6"><button className='btn btn-danger form-shadow p-2' id="Reject" style={{width:'16rem',fontFamily:'sans-serif',fontSize:'large'}} onClick={(e)=>{rejectRequest(e,voucher && voucher.id,"Reject")}}><Cancel/> Reject</button> </Col>
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
                                        <td style={{width:'16%'}}>{cwm && cwm.reqEmployee && cwm.reqEmployee.fullName}<br />
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

export default ShowVoucherApprovalForms;

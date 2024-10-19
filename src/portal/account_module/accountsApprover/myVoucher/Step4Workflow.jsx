import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { findAllEmployeesByWorkFlowName } from '../../../setup_module/setup_redux/workflow_slices/workFlowAlertSlice';
import { useNavigate, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { getActiveAccCompanyFinancialYear, populateAccCompanyFinancialYearList } from '../../accounts_redux/slices/accounts_slice/accCompanyFinancialSlice';
import { createVoucherEntry, showVoucherEntryById, showWFMByVoucherId, updateFinalizeVoucherEntry } from '../../accounts_redux/slices/accounts_approver_slice/voucherEntrySlice';

const Step4Workflow = () => {
  const {voucherid,username} = useParams();
  const {nextEmployees}=useSelector((state)=>state.allstorereducer.workflow);
  const dispatch=useDispatch();
  const {acfy,acfyList}=useSelector((state)=>state.allstorereducer.acfy);
  const {voucher,vloading,workflow}=useSelector((state)=>state.allstorereducer.voucherEntry);
  const [remarkValue,setRemarkValue]=useState('');
  const [statusValue,setStatusValue]=useState(null);
  const [nextEmpValue,setNextEmpValue]=useState(null);
  const [voucherObj,setVoucherObj]=useState();
  const navigatePage= useNavigate();
  const statusList = [
    { label: 'Request', year: 1994 },
    { label: 'Forward', year: 1972 },
    { label: 'Approve', year: 1974 },
    { label: 'Reject', year: 1974 }
  ]

  useEffect(()=>{
    window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    dispatch(populateAccCompanyFinancialYearList());
    dispatch(getActiveAccCompanyFinancialYear());
    dispatch(findAllEmployeesByWorkFlowName({param1:123,param2:"ACCOUNTS WORK FLOW"}));
    if(voucherid){
      dispatch(showVoucherEntryById(voucherid));
      dispatch(showWFMByVoucherId(voucherid));
    }
    if(workflow && workflow.id){
      const crSum=statusList.filter(item => item.label === workflow.status) 
          .reduce((accumulator, item) => item, 0);    
      setStatusValue(crSum);      
      setNextEmpValue(workflow && workflow.nextEmployee);
      setRemarkValue(workflow && workflow.remarks);
    }
  },[]);

  const statusProps = {
    options: statusList,
    getOptionLabel: (option) => (option.label),
  };
  const handleStatus=(newValue)=>{
    setStatusValue(newValue);
    //alert(newValue+", "+newValue.id+", "+newValue.value+", "+newValue.label);
    setVoucherObj({...voucherObj,["campusWorkflowModel"]:{"status":newValue}});
   alert(newValue.label);
    console.log(voucherObj);
  }

  const employeeProps = {
    options: nextEmployees,
    getOptionLabel: (option) => ("["+option.code+"] "+option.fullName),
  };
  const handleNextEmp=(newValue)=>{
    setNextEmpValue(newValue);
    setVoucherObj({...voucherObj,["campusWorkflowModel"]:{"nextEmployee":newValue}});
   
    console.log(voucherObj);
  }

  const handleRemarks=(event)=>{
    setRemarkValue(event.target.value);
    setVoucherObj({...voucherObj,["campusWorkflowModel"]:{"remarks":event.target.value}});
    console.log(voucherObj);
  }

  const saveVoucherTrns=(event)=>{
    alert('hello'+statusValue.value+", "+nextEmpValue+", "+remarkValue);
    if(voucher && voucher.id!=null){

    const addAcfy={...voucherObj,["id"]:voucher.id,
      ["voucherDate"]:voucher.voucherDate,
      ["campusWorkflowModel"]:{"id":null,"status":statusValue.label,"remarks":remarkValue,"nextEmployee":nextEmpValue},
      ["bookType"]:voucher.bookType,
      ["department"]:voucher.department,
      ["advanceFor"]:voucher.advanceFor,
      ["accCompanyFinancialYear"]:{"id":acfy.id,"status":"Active",["accCompany"]:{"id":(acfy.accCompany && acfy.accCompany.id)},["financialYear"]:{"id":(acfy.financialYear && acfy.financialYear.id)}}
    };
    console.log(addAcfy);
    if(statusValue!=null && nextEmpValue!=null && remarkValue!=null){
      dispatch(updateFinalizeVoucherEntry(addAcfy));
      toast.success("Saved and click next !!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigatePage(`/createVoucherSteps/${voucherid}/${'workflow'}`);
    }else{
      toast.error("Please select all fields", {
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
  }
  }

  return (
    <div>
      <Card style={{fontSize:'0.8rem'}}>
        <CardHeader>Workflow</CardHeader>
        <CardBody>
          <Row>
            <Col sm={6}>
              <labe><b>CHOOSE A STATUS OF THE VOUCHER : </b></labe>
            </Col>
            <Col sm={6}>
              <Autocomplete {...statusProps} id="campusWorkflowModel.status" value={statusValue}
                onChange={(event, newValue) => { handleStatus(newValue);}}
                renderInput={(params) => (
                  <TextField {...params} label="Select Status" variant="outlined" size='small'/>
                )}
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={6}>
              <labe><b> CHOOSE TO WHOM THIS VOUCHER SHALL BE FORWARDED : </b></labe>
            </Col>
            <Col sm={6}>
              <Autocomplete {...employeeProps} id="campusWorkflowModel.nextEmployee.id" value={nextEmpValue}
                onChange={(event, newValue) => { handleNextEmp(newValue);}}
                renderInput={(params) => (
                  <TextField {...params} label="Select Next Employee" variant="outlined" size='small'/>
                )}
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={6}>
              <labe><b> PLEASE ENTER YOUR REMARKS FOR THE APPROVER : </b></labe>
            </Col>
            <Col sm={6}>
              <TextField required id="campusWorkflowModel.remarks" label="Remarks" value={remarkValue} sx={{width:500}} onChange={handleRemarks} size='small'/>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className='pt-0 pb-0'>
              <Row>
                <Col sm={5}></Col>
                <Col sm={4}><Button className='button-color' style={{alignItems:'center',width:'10rem'}} onClick={saveVoucherTrns}>Save</Button></Col>
                <Col sm={3}></Col>
              </Row>
            </CardFooter>
      </Card>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default Step4Workflow;

import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table } from 'reactstrap';
import { pink } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { FaEdit, FaPlus } from "react-icons/fa";
import Radio from '@mui/material/Radio';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAccCompanyFinancialYear } from '../../accounts_redux/slices/accounts_slice/accCompanyFinancialSlice';
import { populateCashBankBooks } from '../../accounts_redux/slices/accounts_slice/accountsChartSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { createAccChequeSplitup, deleteAccChequeSplitupEntry, editAccChequeSplitupEntry, showAccChequeSplitupByVoucherId } from '../../accounts_redux/slices/accounts_approver_slice/voucherEntrySlice';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import BASE_URL from '../../../../serviceUrl/AxiosURL';
import { DeleteForeverRounded, Edit } from '@mui/icons-material';

const Step3PaymentInstument = () => {
  const {voucherid,username} = useParams();
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [paymentMode,setPaymentMode]=useState(null);
  const dispatch=useDispatch();
  const {acfy,acfyList}=useSelector((state)=>state.allstorereducer.acfy);
  const {accountChart,accountChartList}=useSelector((state)=>state.allstorereducer.accChart);
  const {voucher,vloading,chequeSplitups,chsloading}=useSelector((state)=>state.allstorereducer.voucherEntry);
  const [accChequeSplitupObj,setAccChequeSplitupObj]=useState(null);
  const [payReceivedValue,setPayReceivedValue]=useState('');
  const [bankValue,setBankValue]=useState(null);
  const [chequeAmtValue,setChequeAmtValue]=useState(0);
  const [chequeDateValue,setChequeDateValue]=useState(null);
  const [chequeNoValue,setChequeNoValue]=useState('');
  const navigatePage=useNavigate();
  const [isEdit,setIsEdit]=useState(null);
  const [editButton,setEditButton]=useState(false);

  useEffect(()=>{
    window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    //setPaymentMode('RTGS');
    dispatch(getActiveAccCompanyFinancialYear());
    dispatch(populateCashBankBooks());
    dispatch(showAccChequeSplitupByVoucherId(voucherid));
    if(username!=null || username!=undefined){
      const userArray=username.split("-");
      setChequeAmtValue(userArray[1]);
    }
  },[]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setPaymentMode(event.target.value);

    setAccChequeSplitupObj({...accChequeSplitupObj,["paymentMode"]:event.target.value});
    console.log(accChequeSplitupObj);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-paymentMode',
    inputProps: { 'aria-label': item },
  });

  function getFormattedDate(date) {
    if(date.getFullYear()!=1970){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
      const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
      return `${year}-${month}-${day}`;
    }
  }

  const handlePayReceive = (event) => {
    setPayReceivedValue(event.target.value);

    setAccChequeSplitupObj({...accChequeSplitupObj,["recPay"]:event.target.value});
    console.log(accChequeSplitupObj);
  };

  const [chartValue, setChartValue] = React.useState(null);
  const accChartProps = {
    options: accountChartList,
    getOptionLabel: (option) => ("["+option.chartCode+"] "+option.name),
  };
  const handleBanks=(newValue)=>{
    setBankValue(newValue);
    
    setAccChequeSplitupObj({...accChequeSplitupObj,["accountChart"]:newValue});
    console.log(accChequeSplitupObj);
  }

  const handleChequeAmount = (event) => {
    //alert(paymentMode+", event="+event.target.value)
    if(paymentMode==='RTGS' && event.target.value < 200000){
      toast.error("Amount should be 2,00000 or more for RTGS !!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //return false;
    }else if(paymentMode==="NEFT" && event.target.value >= 200000){
      toast.error("Amount should be less then 2,00000 for NEFT !!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //return false;
    }else{
      setChequeAmtValue(event.target.value);
      setAccChequeSplitupObj({...accChequeSplitupObj,["chqAmount"]:event.target.value});
    }
    console.log(accChequeSplitupObj);
  };
  const handleChequeDate = (event) => {
    setChequeDateValue(event.target.value);

    setAccChequeSplitupObj({...accChequeSplitupObj,["chqDate"]:event.target.value});
    console.log(accChequeSplitupObj);
  };
  
  const handleChequeNo = (event) => {
    setChequeNoValue(event.target.value);

    setAccChequeSplitupObj({...accChequeSplitupObj,["chqNumber"]:event.target.value});
    console.log(accChequeSplitupObj);
  };

  const handleAddTrans= async(event)=>{
    let acsid=12345;
    const addAcfy={...accChequeSplitupObj,["id"]:acsid,
      ["voucher"]:{"id":voucherid,"status":username}};
    console.log(addAcfy);
    if(paymentMode!=null || payReceivedValue!='' || bankValue!='' || chequeAmtValue!=0 && chequeDateValue!=null || chequeNoValue!=''){
      //dispatch(createAccChequeSplitup(addAcfy));
      setIsEdit(null);
      setEditButton(false);
      try {
        const currentUser=localStorage.getItem("current-jwtToken");
        const response = await fetch(BASE_URL+`api/voucherEntry/cheque/amtcheck/${acsid}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
          body: JSON.stringify(addAcfy), // Convert JavaScript object to JSON
        });
        if (!response.ok) {
          throw new Error('Failed to create record');
        }
        const result = await response.json();
      console.log('Record successfully:', result);
      if(result && result.printStatus===1 && chequeAmtValue > result.chqAmount){
        if(result.chqAmount > 0){
          toast.error("amount can not be exceed of Rs. "+result.chqAmount, {
            position: "top-center",
            width:"10rem",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }else{
          toast.error("Seems that required cheque amount is already added.", {
            position: "top-center",
            width:"10rem",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }else{
        dispatch(createAccChequeSplitup(addAcfy));

        //Set empty
        setPayReceivedValue('');
        setBankValue(null);
        setChequeAmtValue(0);
        setChequeDateValue(null);
        setChequeNoValue('');
      }
      } catch (error) {
        console.error('Error:', error);
      }
    }else{
      toast.error("Kindly fill all fields proper !!", {
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

  const updateVoucherTrxn=()=>{
    const addAcst={...accChequeSplitupObj,["voucher"]:{"id":voucherid,"status":"Draft"},
      ["id"]:isEdit,
      ["recPay"]:payReceivedValue,
      ["accountChart"]:chartValue,
      ["chqAmount"]:chequeAmtValue,
      ["chqDate"]:chequeDateValue,
      ["chqNumber"]:chequeNoValue,
    };
  console.log(addAcst);
  dispatch(editAccChequeSplitupEntry(addAcst));
    setIsEdit(null);
    setEditButton(false);
    setPayReceivedValue('');
    setBankValue(null);
    setChequeAmtValue(0);
    setChequeDateValue(null);
    setChequeNoValue('');
  }

  const editVoucherTrxn=(vtrxn)=>{
    //alert(vtrxn.id);
    if(vtrxn && vtrxn.id!=null){
      setIsEdit(vtrxn.id);
      setEditButton(true);
      setPayReceivedValue(vtrxn.recPay);
      setChartValue(vtrxn && vtrxn.accountChart);
      setChequeAmtValue(vtrxn && vtrxn.chqAmount);
      setChequeDateValue(getFormattedDate(new Date(vtrxn && vtrxn.chqDate)));
      setChequeNoValue(vtrxn && vtrxn.chqNumber);
    }
  }

  const deleteVoucherTrxn=(vtId)=>{
    setIsEdit(null);
    alert('hello'+vtId);
    dispatch(deleteAccChequeSplitupEntry(vtId));
  }

  const saveVoucherTrns=(event)=>{
    alert('hello');
  }
  return (
    <div>
        <Card>
            <CardHeader>Payment Instrument</CardHeader>
            <CardBody style={{fontSize:'0.8rem'}}>
              <Row>
                <Col sm={2}>
                  <label>Company : </label>
                </Col>
                <Col sm={10}><b>{acfy && acfy.accCompany && acfy.accCompany.name} : {acfy && acfy.financialYear && acfy.financialYear.name}</b>
                </Col>                
                
              </Row>
              <Row>
                <Col sm={2} className='mt-3'>
                  <label>Payment Mode : </label>
                </Col>
                <Col sm={10} className='mt-3'>
                  <div>
                    <Radio {...controlProps('Cash')} checked={paymentMode==='Cash'? true:false}/><label style={{color:'blue'}}>CASH</label> 
                    <Radio {...controlProps('ChequeDD')} color="secondary" checked={paymentMode==='ChequeDD'? true:false} /><label style={{color:'purple'}}>Cheque/DD</label>
                    <Radio {...controlProps('IMAP')} color="success" checked={paymentMode==='IMAP'? true:false} /><label style={{color:'green'}}>IMAP</label>
                    <Radio {...controlProps('NEFT')} color="default" checked={paymentMode==='NEFT'? true:false} /><label style={{color:'grey'}}>NEFT</label>
                    <Radio {...controlProps('RTGS')} color="warning" checked={paymentMode==='RTGS'? true:false} /><label style={{color:'orange'}}>RTGS</label>
                  </div>
                </Col>
              </Row>              
            </CardBody>
            <CardBody style={{fontSize:'0.8rem'}}>
              <Row>
                <Stack spacing={1} sx={{ width: '100%',fontSize:'0.8rem' }}>
                <Row>
                  <Col sm={2}>
                    <TextField required id="payTo" label="Pay to / Received from" value={payReceivedValue} onChange={handlePayReceive} variant="standard"/>
                  </Col>
                  <Col sm={2}>
                    <Autocomplete {...accChartProps} id="accountChart.id" value={chartValue}
                      onChange={(event, newValue) => {handleBanks(newValue); }}
                      renderInput={(params) => (
                        <TextField {...params} label="Cash / Bank" variant="standard" />
                      )}
                    />
                  </Col>
                  <Col sm={2}>
                    <TextField required id="amount" label="Amount" type='number' value={chequeAmtValue} onChange={handleChequeAmount} variant="standard"/>
                  </Col>
                  <Col sm={2}>
                    <TextField required id="chequeDate" label="Cheque Date" type='date' value={chequeDateValue} onChange={handleChequeDate} variant="standard"/>
                  </Col>
                  <Col sm={2}>
                    <TextField required id="cheqNo" label="Cheque No./ Txn. No." value={chequeNoValue} onChange={handleChequeNo} variant="standard"/>
                  </Col>
                  <Col sm={1} className='p-2' style={{alignItems:'center', alignContent:'center'}}>
                    {
                      editButton?
                      <Button style={{backgroundColor :'rgb(32 158 181)'}} onClick={updateVoucherTrxn}> <FaEdit style={{width:'1.6rem',height:'1.6rem'}}/> </Button>
                      :
                      <Button style={{backgroundColor :'rgb(32 158 181)'}} onClick={handleAddTrans}> <FaPlus style={{width:'1.6rem',height:'1.6rem'}}/> </Button>
                    }                    
                  </Col>
                </Row>                 
                </Stack>                  
              </Row>             
            </CardBody>
            <CardFooter className='pt-0 pb-0'>
            </CardFooter>
        </Card>
        {
          chequeSplitups && chequeSplitups.length>0?
        
        <Card className='mt-2' style={{fontSize:'0.8rem'}}>
        <CardHeader></CardHeader>         
          <CardBody className='p-0'>
            <Table striped>
              <thead>
                <tr>
                  <th width="5">PayTo / Received From</th>
                  <th width="50">Bank Head</th>
                  <th width="30">Cheque Amount</th>
                  <th width="5">Cheque Date</th>
                  <th width="5">Cheque Number</th>
                  <th width="5"></th>
                </tr>
              </thead>                
              <tbody>
                {
                  chequeSplitups.map((vt)=>(                     
                    <tr key={vt.id}>
                      <td width="5">{vt.recPay}</td>
                      <td width="50">
                        [{vt && vt.accountChart && vt.accountChart.chartCode}] {vt && vt.accountChart && vt.accountChart.name}
                      </td>
                      <td width="30">{vt && vt.chqAmount}</td>
                      <td width="5">{getFormattedDate(new Date(vt && vt.chqDate))}</td>
                      <td width="5">{vt && vt.chqNumber}</td>
                      <td width="5"> 
                      { 
                      isEdit !==vt.id && (
                        <button key={vt.id} id={vt.id} name={vt.id} onClick={(e)=>{editVoucherTrxn(vt)}} style={{color:'green',width:'auto',border:'none'}}><Edit /></button>  
                      )                 
                      }
                      {" "}<button onClick={(e)=>{deleteVoucherTrxn(vt.id)}} style={{color:'red',border:'none'}}><DeleteForeverRounded /></button> </td>                        
                    </tr>
                  ))
                  }
              </tbody>
            </Table>
          </CardBody>
          
          <CardFooter className='pt-0 pb-0'>
              <Row>
                <Col sm={5}></Col>
                <Col sm={4}><Button className='button-color' style={{alignItems:'center',width:'10rem'}} onClick={saveVoucherTrns}>Save</Button></Col>
                <Col sm={3}></Col>
              </Row>
            </CardFooter>
        </Card>
        :
        <div></div>         
        }
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default Step3PaymentInstument;
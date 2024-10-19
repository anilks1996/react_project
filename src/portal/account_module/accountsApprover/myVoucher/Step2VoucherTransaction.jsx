import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table } from 'reactstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { FaEdit, FaPlus } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAccCompanyFinancialYear, populateAccCompanyFinancialYearList } from '../../accounts_redux/slices/accounts_slice/accCompanyFinancialSlice';
import { populateCostCenterList, populateTransTypes } from '../../accounts_redux/slices/accounts_slice/costCenterSlice';
import { populateAccountChartList } from '../../accounts_redux/slices/accounts_slice/accountsChartSlice';
import { populateVendorList } from '../../accounts_redux/slices/accounts_slice/vendorSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { createVoucherTransaction, deleteVoucherTransactionEntry, editVoucherEntry, editVoucherTransactionEntry, showVoucherEntryById, showVoucherTransactionByVoucherId } from '../../accounts_redux/slices/accounts_approver_slice/voucherEntrySlice';
import { showEmployeePopup } from '../../../establishment_module/establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { DeleteForeverRounded, Edit } from '@mui/icons-material';
import { tr } from 'date-fns/locale';
import BASE_URL from '../../../../serviceUrl/AxiosURL';


const Step2VoucherTransaction = () => {
  const {voucherid,username} = useParams();
  const dispatch=useDispatch();
  const {acfy,acfyList}=useSelector((state)=>state.allstorereducer.acfy);
  const {costCenter,costCenterList,transTypes}=useSelector((state)=>state.allstorereducer.costCenter);
  const {accountChart,accountChartList}=useSelector((state)=>state.allstorereducer.accChart);
  const {vendor,vendorList}=useSelector((state)=>state.allstorereducer.vendor);
  const {voucher,voucherTrxn,voucherTrxns}=useSelector((state)=>state.allstorereducer.voucherEntry);
  const [voucherTransaction,setVoucherTransaction] = useState(null);
  const {employeeSelection} = useSelector((state)=>state.allstorereducer.employeeData);
  const [other,setOther]=useState(null);
  const [narrValue,setNarrValue]=useState('');
  const [amtValue,setAmtValue]=useState(0);
  const [isEdit,setIsEdit]=useState(null);
  const [editButton,setEditButton]=useState(false);
  const [eOfficeFileValue,setEOfficeFileValue]=useState('');
  const [eOfficeNoteValue,setEOfficeNoteValue]=useState('');
  const [billNoValue,setBillNoValue]=useState('');
  const [voucherNarrValue,setVoucherNarrValue]=useState('');
  const [voucherObj,setVoucherObj]=useState(null);
  const navigatePage=useNavigate();
  const [totalDebit,setTotalDebit]=useState(0);
  const [totalCredit,setTotalCredit]=useState(0);

  useEffect(()=>{
    window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    setIsEdit(null);
    setEditButton(false);
    setTotalCredit(0);
    setTotalDebit(0);
    //dispatch(populateAccCompanyFinancialYearList());
    dispatch(getActiveAccCompanyFinancialYear());
    dispatch(populateCostCenterList());
    dispatch(populateTransTypes());
    dispatch(populateAccountChartList());
    if(voucher && voucher.advanceFor && voucher.advanceFor==='Employee'){
      dispatch(showEmployeePopup());
    }else if(voucher && voucher.advanceFor && voucher.advanceFor==='Party'){
      dispatch(populateVendorList());
    }else{
      setOther(voucher && voucher.payTo);
    }
    if(voucherid!=null){
      dispatch(showVoucherTransactionByVoucherId(voucherid));
      dispatch(showVoucherEntryById(voucherid));
    }
    if(voucher && voucher.id){
      setBillNoValue(voucher && voucher.billNo);
      setEOfficeFileValue(voucher && voucher.eOfficeFileNo);
      setEOfficeNoteValue(voucher && voucher.eOfficeNoteNo);
      setVoucherNarrValue(voucher && voucher.narration);
    }
    if(voucherTrxns && voucherTrxns.length>0){
      const crSum=voucherTrxns.filter(item => item.type === 'Cr' && item.amount > 0) // Filtering based on conditions
      .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
      setTotalCredit(crSum);

      const drSum=voucherTrxns.filter(item => item.type === 'Dr' && item.amount > 0) // Filtering based on conditions
      .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
      setTotalDebit(drSum);
    }
  },[]);

  const handleChange = (event) => {
    //alert('selected = '+event.target.value+" name="+event.target.checked);
  };
  const [typeValue, setTypeValue] = React.useState(null);
  const crDrTypes = {
    options: transTypes.map((option) => option.transType),
  };
  const handleTrxnType=(newValue)=>{
    setTypeValue(newValue);
    setVoucherTransaction({...voucherTransaction,["type"]:newValue});
    console.log(voucherTransaction);
  }

  const [costCentervalue, setCostCenterValue] = React.useState(null);
  const defaultProps = {
    options: costCenterList,
    getOptionLabel: (option) => ("["+option.code+"] "+option.name),
  };
  const handleCostCenter=(newValue)=>{
    setCostCenterValue(newValue);
    
    setVoucherTransaction({...voucherTransaction,["costCenter"]:newValue});
    console.log(voucherTransaction);
  }

  const [chartValue, setChartValue] = React.useState(null);
  const accChartProps = {
    options: accountChartList,
    getOptionLabel: (option) => ("["+option.chartCode+"] "+option.name),
  };
  const handleAccChart=(newValue)=>{
    setChartValue(newValue);
    setVoucherTransaction({...voucherTransaction,["accountChart"]:newValue});
    console.log(voucherTransaction);
  }

  const [employeeValue, setEmployeeValue] = React.useState(null);
  const employeeProps = {
    options: employeeSelection,
    getOptionLabel: (option) => ("["+option.code+"] "+option.fullName),
  };
  const handleEmployee=(newValue)=>{
    setEmployeeValue(newValue);
    setVoucherTransaction({...voucherTransaction,["employee"]:newValue});
   
    console.log(voucherTransaction);
  }

  const [vendorValue, setVendorValue] = React.useState(null);
  const vendorProps = {
    options: vendorList,
    getOptionLabel: (option) => ("["+option.code+"] "+option.name),
  };
  const handleVendor=(newValue)=>{
    setVendorValue(newValue);
    setVoucherTransaction({...voucherTransaction,["vendor"]:newValue});
   
    console.log(voucherTransaction);
  }
  
  const handleOther=(obj)=>{
    setVoucherTransaction({...voucherTransaction,["payTo"]:obj.target.value});
    console.log(voucherTransaction);
  }
  const handleNarration=(event)=>{
    setNarrValue(event.target.value);
    setVoucherTransaction({...voucherTransaction,["narration"]:event.target.value});
    setAmtValue(totalCredit);
    console.log(voucherTransaction);
  }
  const handleAmount=(event)=>{
    setAmtValue(event.target.value);
    setVoucherTransaction({...voucherTransaction,["amount"]:event.target.value});
    console.log(voucherTransaction);
  }
 //EOffice
const handleEOfficeFile=(event)=>{
  setEOfficeFileValue(event.target.value);
  setVoucherObj({...voucherObj,["eOfficeFileNo"]:event.target.value});
  console.log(voucherObj);
}
const handleEOfficeNote=(event)=>{
  setEOfficeNoteValue(event.target.value);
  setVoucherObj({...voucherObj,["eOfficeNoteNo"]:event.target.value});
  console.log(voucherObj);
}
const handleBillNo=(event)=>{
  setBillNoValue(event.target.value);
  setVoucherObj({...voucherObj,["billNo"]:event.target.value});
  console.log(voucherObj);
}
const handlevoucherNarr=(event)=>{
  setVoucherNarrValue(event.target.value);
  setVoucherObj({...voucherObj,["narration"]:event.target.value});
  console.log(voucherObj);
}

  const handleAddTrans=async(event)=>{
    setIsEdit(null);
    setEditButton(false);
    //setTotalDebit(0);
    //setTotalCredit(0);
    const addAcfy={...voucherTransaction,["voucher"]:{"id":voucherid,"status":username},
      ["accCompanyFinancialYear"]:{"id":acfy.id,"status":"Active",["accCompany"]:{"id":(acfy.accCompany && acfy.accCompany.id)},["financialYear"]:{"id":(acfy.financialYear && acfy.financialYear.id)}}};
    console.log(addAcfy);
    if(typeValue!=null || costCentervalue!=null || chartValue!=null || amtValue!=null){
      //dispatch(createVoucherTransaction(addAcfy));
      try {
        const currentUser=localStorage.getItem("current-jwtToken");
        const response = await fetch(BASE_URL+"api/vt/create", {
          method: 'POST',
          headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
          body: JSON.stringify(addAcfy), // Convert JavaScript object to JSON
        });
        if (!response.ok) {
          throw new Error('Failed to create record');
        }
        const result = await response.json();
        console.log('Record created successfully:', result);     
          if(result && result.length>0){
            //alert("Created list size="+result && result.length);
            dispatch(showVoucherTransactionByVoucherId(voucherid));
            dispatch(showVoucherEntryById(voucherid));
            const crSum=result.filter(item => item.type === 'Cr' && item.amount > 0) // Filtering based on conditions
            .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
            setTotalCredit(crSum);

            const drSum=result.filter(item => item.type === 'Dr' && item.amount > 0) // Filtering based on conditions
            .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
            setTotalDebit(drSum);
          }
      } catch (error) {
        console.error('Error:', error);
      }
      
    }else{
      toast.error("Please fill all fields", {
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
    //dispatch(showVoucherTransactionByVoucherId(voucherid));
    setTypeValue(null);
    //setCostCenterValue(null);
    setChartValue(null);
    setVendorValue(null);
    setEmployeeValue(null);
    setOther(null);
    setNarrValue('');
    setAmtValue(0);
    //dispatch(showVoucherEntryById(voucherid));
  }

  const updateVoucherTrxn= async()=>{
    alert('hello');
    const addAcfy={...voucherTransaction,["voucher"]:{"id":voucherid,"status":"Draft"},
      ["id"]:isEdit,
      ["type"]:typeValue,
      ["costCenter"]:costCentervalue,
      ["accountChart"]:chartValue,
      ["employee"]:employeeValue,
      ["vendor"]:vendorValue,
      ["narration"]:narrValue,
      ["amount"]:amtValue,
      ["accCompanyFinancialYear"]:{"id":acfy.id,"status":"Active",["accCompany"]:{"id":(acfy.accCompany && acfy.accCompany.id)},["financialYear"]:{"id":(acfy.financialYear && acfy.financialYear.id)}}
    };
    console.log(addAcfy);
  //dispatch(editVoucherTransactionEntry(addAcfy));
    try {
      const currentUser=localStorage.getItem("current-jwtToken");
      const response = await fetch(BASE_URL+`api/vt/edit/${addAcfy.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
        body: JSON.stringify(addAcfy), // Convert JavaScript object to JSON
      });
      if (!response.ok) {
        throw new Error('Failed to create record');
      }
      const result = await response.json();
      console.log('Record created successfully:', result);     
        if(result && result.length>0){
          //alert("updated list size="+result && result.length);
          dispatch(showVoucherTransactionByVoucherId(voucherid));
          dispatch(showVoucherEntryById(voucherid));
          const crSum=result.filter(item => item.type === 'Cr' && item.amount > 0) // Filtering based on conditions
          .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
          setTotalCredit(crSum);

          const drSum=result.filter(item => item.type === 'Dr' && item.amount > 0) // Filtering based on conditions
          .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
          setTotalDebit(drSum);
        }
    } catch (error) {
      console.error('Error:', error);
    }

    setIsEdit(null);
    setEditButton(false);
    setTypeValue(null);
    setCostCenterValue(null);
    setChartValue(null);
    setVendorValue(null);
    setEmployeeValue(null);
    setOther(null);
    setNarrValue('');
    setAmtValue(0);
    //total
  }

  const editVoucherTrxn=(vtrxn)=>{
    //alert(vtrxn.id);
    if(vtrxn && vtrxn.id!=null){
      setIsEdit(vtrxn.id);
      setEditButton(true);
      setTypeValue(vtrxn.type);
      setCostCenterValue(vtrxn && vtrxn.costCenter);
      setChartValue(vtrxn && vtrxn.accountChart);
      setVendorValue(vtrxn && vtrxn.vendor);
      setEmployeeValue(vtrxn && vtrxn.employee);
      setOther(voucher && voucher.payTo);
      setNarrValue(vtrxn && vtrxn.narration);
      setAmtValue(vtrxn && vtrxn.amount);

    //dispatch(editVoucherTransactionEntry(addAcfy));
    }
  }

  const deleteVoucherTrxn=async(vtId)=>{
    setIsEdit(null);
    if(window.confirm("Are you sure delete?")){
      //dispatch(deleteVoucherTransactionEntry(vtId));
      try {
        const currentUser=localStorage.getItem("current-jwtToken");
        const response = await fetch(BASE_URL+`api/vt/delete/${vtId}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
          body: JSON.stringify(), // Convert JavaScript object to JSON
        });
        if (!response.ok) {
          throw new Error('Failed to create record');
        }
        const result = await response.json();
        console.log('Record created successfully:', result);     
          if(result && result.length>0){
            //alert("updated list size="+result && result.length);
            dispatch(showVoucherTransactionByVoucherId(voucherid));
            dispatch(showVoucherEntryById(voucherid));
            const crSum=result.filter(item => item.type === 'Cr' && item.amount > 0) // Filtering based on conditions
            .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
            setTotalCredit(crSum);
  
            const drSum=result.filter(item => item.type === 'Dr' && item.amount > 0) // Filtering based on conditions
            .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
            setTotalDebit(drSum);
          }
      } catch (error) {
        console.error('Error:', error);
      }

    }else{
      return false;
    }
  }

  const saveVoucherTrns=(event)=>{
    if(totalCredit===totalDebit){
    if(billNoValue!='' && eOfficeNoteValue!='' && voucherNarrValue!='' && voucherObj!=null){
      const addVouId={...voucherObj,["id"]:voucherid,
        ["totalDebit"]:totalDebit,
        ["totalCredit"]:totalCredit,
        ["eOfficeFileNo"]:eOfficeFileValue,
        ["eOfficeNoteNo"]:eOfficeNoteValue,
      };
      console.log(addVouId);
      if(voucher && voucher.totalCredit===voucher.totalDebit){
        dispatch(editVoucherEntry(addVouId)); 
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
        navigatePage(`/createVoucherSteps/${voucherid}/${'Draft-'+totalCredit}`);
      }else{
        toast.error("Please make sure Cr & Dr amount should be match !!", {
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
      
    }else{
      toast.error("Please fill all fields", {
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
  }else{
    toast.error("Please make sure Dr & Cr amount must be match!!", {
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

  return (
    <div>
        <Card>
            <CardHeader> Transactions </CardHeader>
            <CardBody style={{fontSize:'0.8rem'}} className='p-0 mt-4 mb-4'>
              <Row>
                <Stack spacing={1} sx={{ width: '100%',fontSize:'0.8rem' }}>
                <Row>
                  <Col sm={1}>
                    <Autocomplete {...crDrTypes} id="type" value={typeValue}
                      onChange={(event, newValue) => { handleTrxnType(newValue);}}
                      renderInput={(params) => (
                        <TextField {...params} label="Cr / Dr" variant="standard" size='small'/>
                      )}
                    />
                  </Col>
                  <Col sm={2}>
                    <Autocomplete {...defaultProps} id="costCenter.id" value={costCentervalue}
                      onChange={(event, newValue) => {handleCostCenter(newValue); }} 
                      renderInput={(params) => (
                        <TextField {...params} label="Dept./ Budget" variant="standard" size='small'/>
                      )}
                    />
                  </Col>
                  <Col sm={2}>
                    <Autocomplete {...accChartProps} id="accountChart.id" value={chartValue}
                      onChange={(event, newValue) => {handleAccChart(newValue); }}
                      renderInput={(params) => (
                        <TextField {...params} label="Account Head" variant="standard" size='small'/>
                      )}
                    />
                  </Col>
                  <Col sm={2}>
                  {
                    (voucher && voucher.advanceFor && voucher.advanceFor==="Employee")?
                    <Autocomplete {...employeeProps} id="employee.id" value={employeeValue}
                      onChange={(event, newValue) => { handleEmployee(newValue);}}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Employee" variant="standard" size='small'/>
                      )}
                    />
                    :
                    (voucher && voucher.advanceFor && voucher.advanceFor==="Party")?
                      <Autocomplete {...vendorProps} id="vendor.id" value={vendorValue}
                        onChange={(event, newValue) => { handleVendor(newValue);}}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Party" variant="standard" size='small'/>
                        )}
                      />
                      :
                      <TextField required id="outlined-required" label="Other" defaultValue={voucher && voucher.payTo} onChange={handleOther} size='small' disabled/>
                  }                    
                  </Col>
                  <Col sm={2}>
                    <TextField label="Narration" variant="outlined" value={narrValue} onChange={handleNarration} size='small'/>
                  </Col>
                  <Col sm={2}>
                    <TextField label="Amount" type='number' variant="outlined" value={amtValue} onChange={handleAmount} size='small'/>  
                  </Col>
                  <Col sm={1} className='p-0' style={{alignItems:'center', alignContent:'center'}}>
                    {
                      editButton?
                      <Button style={{backgroundColor :'rgb(32 158 181)',width:'3rem',height:'3rem'}} onClick={updateVoucherTrxn}> <FaEdit style={{width:'1.5rem',height:'1.5rem'}}/> </Button>
                      :
                      <Button style={{backgroundColor :'rgb(32 158 181)',width:'3rem',height:'3rem'}} onClick={handleAddTrans}> <FaPlus style={{width:'1.5rem',height:'1.5rem'}}/> </Button>
                    }                    
                  </Col>
                </Row>                 
                </Stack>                  
              </Row>             
            </CardBody>           
            <CardFooter></CardFooter>            
        </Card>
        <Card className='mt-2' style={{fontSize:'0.8rem'}}>
        <CardHeader></CardHeader>
        
          <CardBody className='p-0'>
            <Table striped>
            {
              voucherTrxns && voucherTrxns.length>0?
              <thead>
                <tr>
                  <th width="5">Type</th>
                  <th width="50"><b>Budget</b> / Account Ledger</th>
                  <th width="30">Party / Narration</th>
                  <th width="5">Debit</th>
                  <th width="5">Credit</th>
                  <th width="5"></th>
                </tr>
              </thead>  
              :
              <div></div>
            }              
              <tbody>
                {
                  voucherTrxns.map((vt)=>(                     
                    <tr key={vt.id}>                 
                      <td width="5">{vt.type}</td>
                      <td width="50"><b> [{vt && vt.costCenter && vt.costCenter.code}] {vt && vt.costCenter && vt.costCenter.name}</b>
                      <p className='mb-0'>[{vt && vt.accountChart && vt.accountChart.chartCode}] {vt && vt.accountChart && vt.accountChart.name}</p>
                      </td>
                      <td width="30">                      
                      {
                        (vt && vt.employee && vt.employee.id!=null)?
                        ("["+vt.employee.code+"] "+vt.employee.fullName)
                        :
                        (vt && vt.vendor && vt.vendor.id!=null)?
                          ("["+vt.vendor.code+"] "+vt.vendor.name)
                          :
                          (voucher && voucher.payTo!=null? voucher.payTo:vt.voucher && vt.voucher.payTo)
                        
                      }
                      <p className='mb-0'> {vt && vt.narration}</p>
                      </td>
                      <td width="5" style={{color:'red'}}>{vt && vt.type==='Dr'? vt.amount:""}</td>
                      <td width="5" style={{color:'green'}}>{vt && vt.type==='Cr'? vt.amount:""}</td>
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
                  {
                  voucherTrxns && voucherTrxns.length>0?
                  <tr>
                    <td width="5"><b style={{color:'Blue'}}>Total</b></td>
                    <td width="50"></td>
                    <td width="30"></td>
                    <td width="5"><b style={{color:'red'}}>{totalDebit}</b></td>
                    <td width="5"><b style={{color:'green'}}>{totalCredit}</b></td>
                    <td width="5"></td>
                  </tr>
                  :
                  <div></div>
                  }
              </tbody>
            </Table>
          </CardBody>
          
          <CardBody>
            <Row className='mt-2'>
              <Col sm={4}>
                <TextField required label="Bill No/Ref No" variant="outlined" value={billNoValue} onChange={handleBillNo} size='small'/>
              </Col>
              <Col sm={4}>
                <TextField required label="E-Office File No" variant="outlined" value={eOfficeFileValue} onChange={handleEOfficeFile} size='small'/>
              </Col>
              <Col sm={4}>
                <TextField required label="E-Office Note No" variant="outlined" value={eOfficeNoteValue} onChange={handleEOfficeNote} size='small'/>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col sm={12}>
                <TextField required label="Narration" variant="outlined" value={voucherNarrValue} onChange={handlevoucherNarr} sx={{width:1060}} size='small'/>
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

export default Step2VoucherTransaction;
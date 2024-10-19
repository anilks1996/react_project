import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Spinner } from 'reactstrap';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAccCompanyFinancialYear, populateAccCompanyFinancialYearList } from '../../accounts_redux/slices/accounts_slice/accCompanyFinancialSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider } from '@mui/material';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { createVoucherEntry, showVoucherEntryById } from '../../accounts_redux/slices/accounts_approver_slice/voucherEntrySlice';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { showDepartment, showDepartmentById } from '../../../establishment_module/establishment_redux/slices/establishment_slice/departmentSlice';
import BASE_URL from '../../../../serviceUrl/AxiosURL';

const Step1InitiativeVoucher = () => {
  const {voucherid,username} = useParams();
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [voucherType,setVoucherType]=useState(null);
  const [partyType,setPartyType]=useState(null);
  const [payToValue,setPayToValue]=useState('');
  const [voucherDate,setVoucherDate]=React.useState(null);
  const dispatch=useDispatch();
  const [departmentValue,setDepartmentValue]=useState(null);
  const {acfy,acfyList}=useSelector((state)=>state.allstorereducer.acfy);
  const {voucher,vouchers,vloading}=useSelector((state)=>state.allstorereducer.voucherEntry);
  const {department,departments}=useSelector((state)=>state.allstorereducer.dept);
  const [voucherObj,setVoucherObj]=useState();
  const navigatePage= useNavigate();

  useEffect(()=>{
    window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    
    dispatch(populateAccCompanyFinancialYearList());
    dispatch(getActiveAccCompanyFinancialYear());
    dispatch(showDepartment());
    dispatch(createVoucherEntry(null));
    if(voucherid!=null && voucherid!=undefined && (voucher===undefined || voucher===null)){
      dispatch(showVoucherEntryById(voucherid));
    }
    const fetchVoucher=async()=>{
      try {
        const currentUser=localStorage.getItem("current-jwtToken");
          const response = await fetch(BASE_URL+`api/voucherEntry/${voucherid}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
            body: JSON.stringify(), // Convert JavaScript object to JSON
          });
          if (!response.ok) {
            throw new Error('Failed to load record');
          }
          const result = await response.json();
        console.log('Record loaded successfully:', result);

        if(result && result.id){
          dispatch(showDepartmentById(result && result.department && result.department.id));
          //alert('Fetched id : '+result.department.id);
          setVoucherDate(getFormattedDate(new Date(result && result.voucherDate)));
          setVoucherType(result && result.bookType && result.bookType.voucherType);
          setPartyType(result && result.advanceFor);
          setDepartmentValue(result.department);
          setPayToValue(voucher && voucher.payTo);
        }
      } catch (error) {
        
      }
    }

    fetchVoucher();
  },[]);

  function getFormattedDate(date) {
    if(date.getFullYear()!=1970){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
      const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
      return `${year}-${month}-${day}`;
    }
  }

  const handleChange = (event) => {
    if(event.target.name==='voucherDate'){
      setVoucherObj({...voucherObj,["voucherDate"]:event.target.value});
      setVoucherDate(event.target.value);
      console.log(voucherObj);
    }else{
      setSelectedValue(event.target.value);
      setVoucherType(event.target.value);
      
      setVoucherObj({...voucherObj,["bookType"]:{"id":"123456789","voucherType":event.target.value}});
      //alert('selected = '+event.target.value+" name="+event.target.checked);
      console.log(voucherObj);
    }
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-voucherType',
    inputProps: { 'aria-label': item },
  });

  const controlPropsParty = (item) => ({
    checked: selectedValue === item,
    onChange: handleParty,
    value: item,
    name: 'color-radio-button-party',
    inputProps: { 'aria-label': item },
  });

  const handleParty = (event) => {
    setSelectedValue(event.target.value);
    setPartyType(event.target.value);

    setVoucherObj({...voucherObj,["advanceFor"]:event.target.value});
    console.log(voucherObj);
  };

  const saveDraftVoucherEntry=async(event)=>{
    const addAcfy={...voucherObj,
      ["id"]:((voucherid!=null || voucherid!=undefined)? voucherid:null),
      ["bookType"]:{"id":"123456789","voucherType":voucherType},
      ["payTo"]:payToValue,
      ["voucherDate"]:voucherDate,
      ["department"]:departmentValue,
      ["advanceFor"]:partyType,
      ["accCompanyFinancialYear"]:{"id":acfy.id,"status":"Active",["accCompany"]:{"id":(acfy.accCompany && acfy.accCompany.id)},["financialYear"]:{"id":(acfy.financialYear && acfy.financialYear.id)}}
    };
    //const addAccCmp={...addAcfy,["accCompanyFinancialYear.accCompany"]:{"id":(acfy && acfy.accCompany && acfy.accCompany.id)}};
    //const addFY={...addAccCmp,["accCompanyFinancialYear.financialYear"]:{"id":(acfy && acfy.financialYear && acfy.financialYear.id)}};
    console.log(addAcfy);
    if(voucherDate!=null && voucherType!=null && partyType!=null){
      //dispatch(createVoucherEntry(addAcfy));
      try {
        const currentUser=localStorage.getItem("current-jwtToken");
        const response = await fetch(BASE_URL+"api/voucherEntry/create", {
          method: 'POST',
          headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
          body: JSON.stringify(addAcfy), // Convert JavaScript object to JSON
        });
        if (!response.ok) {
          throw new Error('Failed to create record');
        }
        const result = await response.json();
      console.log('Record created successfully:', result);

      //alert("Created id="+result && result.id);
      if(result && result.id){
        //alert("Created id="+result.id+", Status="+result.status);
        dispatch(showVoucherEntryById(result.id));

        navigatePage(`/createVoucherSteps/${result.id}/${result.status}`);
      }
      } catch (error) {
        console.error('Error:', error);
      }
      
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
    if(vloading==false){
      toast.success("Saved and click next !!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleOther=(value)=>{
    setPayToValue(value.target.value);
    setVoucherObj({...voucherObj,["payTo"]:value.target.value});
    console.log(voucherObj);
  }

  const options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];
  
  const deptProps = {
    options: departments,
    getOptionLabel: (option) => ("["+option.code+"] "+option.name),
  };
  const handleDept=(newValue)=>{
    setDepartmentValue(newValue);
    setVoucherObj({...voucherObj,["department"]:newValue});
    console.log(voucherObj);
  }


  return (
    <div>
        <Card>
            <CardHeader>Voucher Initiative </CardHeader>
            <CardBody style={{fontSize:'0.8rem'}}>
              <Row>
                
                <Col sm={7}>
                  <Stack sx={{ width: '100%',fontSize:'1rem',alignItems:'left' }} spacing={2}>
                    <Alert severity="success">Company : {acfy && acfy.accCompany && acfy.accCompany.name} : {acfy && acfy.financialYear && acfy.financialYear.name}</Alert>
                  </Stack>
                </Col>
                {/* 
                <Col sm={4}><label>
                    <select type='text' id='accCompanyFinancialYear.id' name='accCompanyFinancialYear.id' value={acfyear} className='form-select' onChange={(e)=>{saveDraftVoucherEntry(e)}}>
                    <option value={-1}>-- select --</option>
                    {
                        acfyList.map((com)=>(
                            <option value={com.id}>{com && com.companyName} - {com && com.fyName}</option>
                        ))
                    }
                    </select>
                    </label>  
                </Col>
                */}
                
              </Row>
              <Row className='mt-2'>
                {/*
                <Col sm={2}>
                  <label>Voucher Date : </label>
                </Col>
                */}
                <Col sm={3}>
                  <label>{/* <input type='date' id='voucherDate' name='voucherDate' className='form-control' onChange={handleChange}/> */}
                    <TextField required name="voucherDate" label="Voucher Date" type='date' className='form-control'
                     value={voucherDate} variant="outlined" onChange={handleChange} InputLabelProps={{shrink: true}} size='small' margin="normal"/> 
                  </label>
                </Col>
                <Col sm={3}>
                    <Autocomplete {...deptProps} id="department.id" value={departmentValue}
                      onChange={(event, newValue) => {handleDept(newValue); }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Department" variant="standard" />
                      )}
                    />
                </Col>
                <Col sm={6}>.
                  {
                    vloading==false?
                    <div></div>
                    :
                    <Spinner style={{color:'rgb(32 158 181)',width:'3rem',height:'3rem'}}></Spinner>                    
                  }
                </Col>
              </Row>
              <Row>
                <Col sm={12} className='mt-3'> {departmentValue && departmentValue.id}
                  <label>Select the type of voucher you wish to create : </label>
                  <div>
                    <Radio {...controlProps('Generic')} checked={voucherType==='Generic'? true:false}/><label style={{color:'blue'}}>PAYMENT</label> 
                    <Radio {...controlProps('Receipt')} color="secondary" checked={voucherType==='Receipt'? true:false} /><label style={{color:'purple'}}>RECEIPT</label>
                    <Radio {...controlProps('Journal')} color="success" checked={voucherType==='Journal'? true:false} /><label style={{color:'green'}}>JOURNAL</label>
                    <Radio {...controlProps('Contra')} color="default" checked={voucherType==='Contra'? true:false} /><label style={{color:'grey'}}>CONTRA</label>
                    <Radio {...controlProps('Purchase')} color="warning" checked={voucherType==='Purchase'? true:false} /><label style={{color:'orange'}}>PURCHASE</label>
                    <Radio {...controlProps('Sales')} sx={{ color: pink[800], '&.Mui-checked': {color: pink[600],}, }} checked={voucherType==='Sales'? true:false}/>
                    <label style={{color:'pink'}}>SALES</label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className='mt-3'>
                  <label>Select the party type for which this voucher is being entered : </label>
                  <div>
                    <Radio {...controlPropsParty('Employee')} checked={partyType==='Employee'? true:false}/><label style={{color:'blue'}}>EMPLOYEE</label> 
                    <Radio {...controlPropsParty('Party')} color="secondary" checked={partyType==='Party'? true:false} /><label style={{color:'purple'}}>VENDOR</label>
                    <Radio {...controlPropsParty('Other')} color="success" checked={partyType==='Other'? true:false} /><label style={{color:'green'}}>OTHERS</label>
                  </div>
                </Col>
              </Row>
              {
                partyType && partyType==="Other"?
                  <Row>
                    <Col sm={5} className='mt-2'>
                      <TextField required id="outlined-required" label="PayTo / Received from" value={payToValue} onChange={handleOther} sx={{width:320}}/>
                    </Col>
                    <Col sm={7}></Col>
                </Row>
                :
                <div></div>
              }              
            </CardBody>
            <Divider />             
 
            <CardFooter className='pt-0 pb-0'>
              <Row>
                <Col sm={5}></Col>
                <Col sm={4}><Button className='button-color' style={{alignItems:'center',width:'10rem'}} onClick={saveDraftVoucherEntry}>Save</Button></Col>
                <Col sm={3}></Col>
              </Row>
            </CardFooter>
        </Card>

        <ToastContainer></ToastContainer>
    </div>
  )
}

export default Step1InitiativeVoucher;
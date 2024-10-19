import React, { useState } from 'react'
import { Card,Button,CardHeader, CardFooter, CardBody, Spinner, Table } from 'reactstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAccCompanyFinancialYear, populateAccCompanyFinancialYearList } from '../../../../accounts_redux/slices/accounts_slice/accCompanyFinancialSlice';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { populateAccountChartList } from '../../../../accounts_redux/slices/accounts_slice/accountsChartSlice';
import { findGeneralLedgerReport } from '../../../../accounts_redux/slices/accounts_admin_slice/voucherTransactionSlice';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ShowTotalDebit from '../../../../../employeeusr_module/ShowTotalDebit';
import ShowTotalCredit from '../../../../../employeeusr_module/ShowTotalCredit';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';

const GeneralLedger = () => {
  
  const {acfy,acfyList,acfyLoading}=useSelector((state)=>state.allstorereducer.acfy);
  const {accountChart,accountChartList}=useSelector((state)=>state.allstorereducer.accChart);
  const {voucherTransaction,voucherTransactions,vtloading} = useSelector((state)=>state.allstorereducer.vTrxn);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [voucherTr,setVoucherTr]=useState();
  const [fromDate,setFromDate]=useState();
  const [toDate,setToDate]=useState();
  const [checkedValue,setCheckedValue] = useState();
  const navigatePage=useNavigate();
  const [isClick,setIsClick] = useState(false);

  var totalDr=0;
  React.useEffect(()=>{
      window.scrollTo({left:'0', top:'0', behavior:'smooth'});
      dispatch(populateAccCompanyFinancialYearList());
      dispatch(getActiveAccCompanyFinancialYear());
      dispatch(populateAccountChartList());
      if(acfy){
          setCheckedValue(acfy.id);
          setFromDate(getFormattedDate(new Date(acfy && acfy.financialYear && acfy.financialYear.startDate)));
          setToDate(getFormattedDate(new Date(acfy && acfy.financialYear && acfy.financialYear.endDate)));
          //alert('active'+fromDate)
      }
  },[]);
  const updateTotalDebit=(dtAmt)=>{
    totalDr=totalDr+dtAmt;
    
  }
  const [chartValue, setChartValue] = React.useState(null);
  const accChartProps = {
    options: accountChartList,
    getOptionLabel: (option) => ("["+option.chartCode+"] "+option.name),
  };
  const handleAccChart=(newValue)=>{
    setChartValue(newValue);
    setVoucherTr({...voucherTr,["accountChart"]:newValue});
    console.log(voucherTr);
  }

  const handleChange=(e)=>{
    if(e.target.name==='fromDate'){
      setFromDate(e.target.value);
    }
    if(e.target.name==='toDate'){
      setToDate(e.target.value);
    }
  }

  const getVoucherTransaction=()=>{
    if(fromDate!=undefined && toDate!=undefined && chartValue!=undefined){
    setIsClick(true);
    const addDates={...voucherTransaction,["fromDate"]:fromDate,["endDate"]:toDate,
      ["accountChart"]:chartValue,
      ["accCompanyFinancialYear"]:acfy}

      dispatch(findGeneralLedgerReport(addDates));
    }else{
      toast.error("Kindly select all field !!", {
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
//Data Grid
  // Map through the data to format it for the DataGrid
  const columns = [
    { field: 'voucherDate', headerName: 'Voucher Date', width: 120,
      renderCell: (params)=>(                                   
        <div>{getFormattedDate(new Date(params.row.voucherDate))}</div>    
      ),
    },
    {field: 'voucherNo',headerName: 'Voucher No',width: 120,
      renderCell: (params)=>(                                   
        <div><Button onClick={(e)=>{showVoucherDetail(params.row.objId,(params.row.bkType))}} color='info'>{params.row.voucherNo}</Button> </div>   
      ),
    },
    { field: 'ledger', headerName: 'Account Ledger', width: 250, },
    {field:'employeeName', headerName: 'Employee/Vendor', width: 200,
      renderCell: (params)=>(                                   
            (params.row && params.row.employeeName!=null && params.row.employeeName!="")?
            <div>{params.row.employeeName}</div>
            :
            <div>{params.row.vendorName}</div>      
      ),
    },
    {field:'narration',headerName: 'Narration', width: 200,},
    { field: 'debitAmount', headerName: 'Debit', width: 150, 
      renderCell: (params)=>(                                   
        (params.row && params.row.type!=null && params.row.type=="Dr")?
        <div style={{alignContent:'center', alignItems:'center'}}>{params.row.amount}{updateTotalDebit(params.row.amount)}</div>
        :
        <div></div>      
      ),
    },
    { field: 'creditAmount', headerName: 'Credit', width: 150, 
      renderCell: (params)=>(                                   
        (params.row && params.row.type!=null && params.row.type=="Cr")?
        <div style={{alignContent:'center', alignItems:'center'}}>{params.row.amount}</div>
        :
        <div></div>      
      ),
    },
    {field:'balance',headerName: 'Balance', width: 100,},
  ];
  
  const ParentChildDataGrid = ({ data, onRowClick}) => {
    // Map through the data to format it for the DataGrid
    const rows = data.map((item, index) => ({
      id: index + 1, // You can use a unique identifier if available
      objId: item.voucher.id,
      voucherDate:(item && item.voucher && item.voucher.voucherDate),
      voucherNo: (item && item.voucher && item.voucher.voucherNo),
      ledger: (item && item.accountChart && item.accountChart.name),
      narration: (item && item.voucher && item.voucher.narration),
      employeeName:(item && item.employee && item.employee.fullName),
      vendorName:(item && item.vendor && item.vendor.name),
      type:item.type,
      bkType:item.voucher.bkType,
      amount:item.amount,
      balance:item.amount,
      userData:item,
    }));

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={20} onRowClick={(row)=>onRowClick(row)} checkboxSelection 
         slots={{toolbar: GridToolbar}} />
      </div>
    );
  };

  // const ShowTotalDebit = ({data}) => {       
  //   const dtSum=data.filter(item => item.type === 'Dr' && item.amount > 0) // Filtering based on conditions
  //     .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
  //     setTotalDebit(dtSum);

  //   return (
  //     <div>
  //       {totalDebit}
  //     </div>
  //   );
  // };  

const handleRowClick=()=>{

}
const showVoucherDetail=(modelId,bkType)=>{
  
  if(bkType==='Journal' || bkType==='Voucher'){
    navigatePage(`/financialAccounting/voucherListing/journalVoucher/${modelId}`);
  }else if(bkType==='Generic' || bkType==='Payment'){
    navigatePage(`/financialAccounting/voucherListing/paymentVoucher/${modelId}`);
  }else if(bkType==='Receipt'){
    navigatePage(`/financialAccounting/voucherListing/receiptVoucher/${modelId}`);
  }else if(bkType==='Contra'){
    navigatePage(`/financialAccounting/voucherListing/contraVoucher/${modelId}`);
  }else if(bkType==='Purchase'){
    navigatePage("");
  }
}

function getFormattedDate(date) {
  if(date.getFullYear()!=1970){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
    return `${year}-${month}-${day}`;
  }
}

return (
  <div>
  <form style={{minWidth:'80rem', fontSize:'0.8rem'}}>
    <Card className='p-2'>home/ financial reports / General Ledger
    </Card>
    <Card className='form-shadow'>
      <CardHeader>
        <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
        <Button color="secondary">Download PDF</Button>{' '}
        <Button color="secondary">Download Excel</Button>{' '}
      </CardHeader>
      <CardBody>
        <Row className='mt-3'>
          <Col sm={6}>
            <label>Organization : <b>{acfy && acfy.accCompany && acfy.accCompany.name}</b></label>            
          </Col>
          <Col sm={6}>
            <label>Financial Year : <b>{acfy && acfy.financialYear && acfy.financialYear.name}</b></label>            
          </Col>
        </Row>
        <Row className='mt-1'>
          <Col sm={6}>
            {/*<label>From Date : </label> */} 
            <TextField required name="fromDate" label="From Date" type='date' className='form-control' 
                     value={fromDate} variant="outlined" onChange={handleChange} size='small'
                     InputLabelProps={{shrink: true}} fullWidth margin="normal" sx={{width:400}}/>             
          </Col>
          <Col sm={6}>
            {/*<label>To Date : </label> */}
            <TextField required name="toDate" label="To Date" type='date' className='form-control' 
                    value={toDate} variant="outlined" onChange={handleChange} size='small' 
                    InputLabelProps={{shrink: true}} fullWidth margin="normal" sx={{width:400}}/>           
          </Col>
        </Row>  
        <Row className='mt-2'>
          <Col sm={6}>
            {/*<label>Account Ledger : </label> */}
            <Autocomplete {...accChartProps} id="accountChart.id" value={chartValue}
                onChange={(event, newValue) => {handleAccChart(newValue); }}
                renderInput={(params) => (
                  <TextField {...params} label="Account Head" variant="outlined" size='small' sx={{width:400}}/>
                )}
              />  
          </Col>
          <Col sm={6}>           
            <Button onClick={getVoucherTransaction} style={{width:'25rem'}} className='button-color p-2'>Fetch Result</Button>         
          </Col>
        </Row>     
        <Row>
          <Col sm="12">.</Col>
        </Row>    
      </CardBody> 
      <CardFooter></CardFooter> 
    </Card>  

    <Card className='form-shadow'>
      <CardBody className='p-0'>
        {
          isClick && vtloading===false? 
          <div>
            <ParentChildDataGrid data={voucherTransactions} onRowClick={handleRowClick} />
            <Row className='p-3'>
              <Col sm={1}>Total</Col>
              <Col sm={2}></Col>
              <Col sm={2}></Col>
              <Col sm={2}></Col>
              <Col sm={2}></Col>
              <Col sm={1}><b style={{color:'red'}}>Total Debit : <ShowTotalDebit data={voucherTransactions} /></b></Col>
              <Col sm={1}><b style={{color:'green'}}>Total Credit : <ShowTotalCredit data={voucherTransactions} /></b></Col>
              <Col sm={1}><b style={{color:'blue'}}><ShowTotalCredit data={voucherTransactions} /></b></Col>
            </Row>
          </div>
          :
          isClick?
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
            :
            <div></div> 
        }       
      </CardBody>
        
        <CardFooter className='p-3'>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
    </Card>
  <ToastContainer></ToastContainer>
  </form>
</div>

);
}

export default GeneralLedger;
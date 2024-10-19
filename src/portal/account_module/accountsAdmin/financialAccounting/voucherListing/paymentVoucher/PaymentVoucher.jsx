import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, CardBody, Button, CardHeader, CardFooter, Spinner} from "reactstrap";
import { Table } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveAccCompanyFinancialYear } from "../../../../accounts_redux/slices/accounts_slice/accCompanyFinancialSlice";
import { populateVoucherNoColl, showVoucherEntryById, showVoucherTransactionByVoucherId } from "../../../../accounts_redux/slices/accounts_approver_slice/voucherEntrySlice";
import { Autocomplete, TextField } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import BASE_URL from "../../../../../../serviceUrl/AxiosURL";


const PaymentVoucher = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {acfy,acfyList,acfyLoading}=useSelector((state)=>state.allstorereducer.acfy);
  const {vouchers,vloading,voucher,voucherTrxns}=useSelector((state)=>state.allstorereducer.voucherEntry);
  const dispatch=useDispatch();
  const [voucherObj,setVoucherObj]=useState();
  const [totalDebit,setTotalDebit]=useState(0);
  const [totalCredit,setTotalCredit]=useState(0);
  const navigatePage=useNavigate();
  const [isClick,setIsClick] = useState(false);

  useEffect(()=>{
    window.scrollTo({left:'0',top:'0',behavior:'smooth'});
    dispatch(getActiveAccCompanyFinancialYear());
    dispatch(populateVoucherNoColl(1));

    if(id!=null){
      dispatch(showVoucherTransactionByVoucherId(id));
      dispatch(showVoucherEntryById(id));
      setIsClick(true);
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

  function getFormattedDate(date) {
    if(date.getFullYear()!=1970){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
      const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
      return `${year}-${month}-${day}`;
    }
  }

  const [chartValue, setChartValue] = useState(null);
  const accChartProps = {
    options: vouchers,
    getOptionLabel: (option) => (option.voucherNo),
  };
  const handleAccChart=(newValue)=>{
    setChartValue(newValue);
    setVoucherObj({...voucherObj,["voucherNo"]:newValue});
    console.log(voucherObj);
  }
  const fetchVoucherTransaction = async()=>{
    setIsClick(true);
    //alert("id="+id+", chartValue"+chartValue+", "+chartValue.id);
    if(id!=null && id!=undefined){
      dispatch(showVoucherTransactionByVoucherId(id));
    }else if(chartValue!=null){     
      try {
        const currentUser=localStorage.getItem("current-jwtToken");
        const response = await fetch(BASE_URL+`api/vt/voucher/${chartValue.id}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
          body: JSON.stringify(),
        });
        if (!response.ok) {
          throw new Error('Failed to create record');
        }
        const result = await response.json();
        console.log('Record created successfully:', result);     
          if(result && result.length>0){
            dispatch(showVoucherTransactionByVoucherId(chartValue.id));
            dispatch(showVoucherEntryById(chartValue.id));
            
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
    }
  }

  const editVoucher=(vouId)=>{
    navigatePage(`/createVoucherSteps/${voucher.id}/${'Draft'}`);
  }
  return (
    <div>
      <form style={{minWidth:"80rem", fontSize:'0.8rem'}}>
          <Card className="p-2">
            Home / voucher listing / journal voucher
          </Card>
        <Card className="form-shadow">
          <CardHeader>
            <Row>
              <Col sm={5}><Button onClick={() => navigate("/AccountsProfile")} color="danger"> Back </Button></Col>
              <Col sm={6}><strong style={{color:'rgb(38,160,181)'}}>Payment Voucher</strong> </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="p-2">
              <Col>
                  <label><strong>Company : </strong>
                  {acfy && acfy.accCompany && acfy.accCompany.name} 
                  </label>
              </Col>
              <Col>
                  <label><strong>Financial Year : </strong>
                  {acfy && acfy.financialYear && acfy.financialYear.name} [{getFormattedDate(new Date(acfy && acfy.financialYear && acfy.financialYear.startDate))}-{getFormattedDate(new Date(acfy && acfy.financialYear && acfy.financialYear.endDate))}]
                  </label>
              </Col>
            </Row>
            <Row className="p-2 mt-2">
              <Col>                  
                  <label>                                
                    <Autocomplete {...accChartProps} id="voucher.id" value={chartValue}
                        onChange={(event, newValue) => {handleAccChart(newValue); }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Voucher No" variant="outlined" size='small' sx={{width:400}}/>
                        )}
                      />
                    <i style={{color:'blue'}}>Type voucher no like :- JV00001</i>
                  </label>
              </Col>
              <Col>
                <label>
                  <Button color="primary" onClick={fetchVoucherTransaction} className="p-2" style={{width:'20rem'}}> Fetch </Button>
                </label>
              </Col>
            </Row>
          </CardBody>  
          <CardBody className="p-0">
          {
            isClick && vloading==false?
            <Card>
              <CardHeader>
                <Row>
                  <Col sm={10}><strong> Voucher Transaction</strong></Col>
                  <Col sm={2}><Button color="success" onClick={(e)=>{editVoucher(id)}}><FaEdit /> Edit </Button></Col>
                </Row>
              </CardHeader>
              <CardBody>          
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
            </Card>
            :
            isClick?
              <div>
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
            <CardFooter className="p-3">
            © 2023 GMDA All rights reserved. Version: 4...
            </CardFooter>
        </Card>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default PaymentVoucher;

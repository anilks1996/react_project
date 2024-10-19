import React, { useState } from 'react'
import { Card,CardBody,Button,CardHeader, CardFooter } from 'reactstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';


const DayBook = () => {
  const [financialYear, setFinancialYear]=useState();

  const navigate = useNavigate();


  return (

      <div>
      <form style={{minWidth:'70rem'}}>
     <span><Card style={{height:'3.5rem', background:'lightgrey'}}>home/ accounts master/ charts of accounts
      </Card></span><br/>
      <Card>
      <CardHeader>
      <CardBody>
      <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
      </CardBody> 
      </CardHeader> 
      <Container>
  <Row sm={12}>
  <Col sm={2}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td align="right" nowrap ><span class="required" style={{color:'red'}}>*</span>
  <label>Organization :</label>
  </td>
  <tr>
  <td nowrap align="left" width='29%'>GMDA
  <input type="hidden" name="company.id" id="company.id" value="373882880"/>
  </td>
  </tr>
  </tr>
  </table>
  </tr>
  </Col>

  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td align="right"><span class="required" style={{color:'red'}}>*</span>
  <label>Financial Year :</label>
  </td>
  <tr>
  <td nowrap align="left">01/04/2023 - 31/03/2024
  <input type="hidden" name="company.id" id="company.id" value="373882880"/>
  </td>
  </tr>
  </tr>
  </table>
  </tr>    
  </Col>

  <Col sm={3}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td  align="left" nowrap>
	<label>Voucher Type:</label></td>
	<td  align="left">
	<select id="voucherType" class="form-control" name="voucherType" align="left" style={{width:'150px'}}>
					<option value="" selected>--Select--</option>	  		
					<option  value="Receipt">Receipt</option>
					<option  value="Payment">Payment</option>
					<option  value="Journal">Journal</option>
					<option  value="Contra">Contra</option>
	</select>
	</td>
  </tr>
  </table>
  </tr>    
  </Col>
  <Col sm={3}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="right" style={{width:'250px'}}><label>Voucher Status:</label></td>
	<td  align="left" width="10%">
	<select id="voucherStatus" class="form-control" name="voucherStatus" align="left" style={{width:'150px'}}>
					<option value="" selected>--Select--</option>	  		
					<option  value="Pending">Pending</option>
					<option  value="Approve">Approve</option>
					<option  value="Cancelled">Cancelled</option>
					<option  value="Reject">Reject</option>
	</select>
	</td>	
  </tr>
  </table>
  </tr>    
  </Col>
  </Row>
  <span/><br/>
  <Row sm={12}>
  <Col sm={3}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required">*</span><label>Date From :&nbsp;</label></td>
	<td nowrap>
  </td>
  <tr>
  <td nowrap>
	<input type="date" id="startDate" name="startDate" class="form-control"/>
  </td>
  </tr>
  </tr>
  </table>
  </tr>
  </Col>

  <Col sm={3}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required">*</span><label>Date To :&nbsp;</label></td>
	<td nowrap>
  </td>
  <tr>
  <td nowrap>
	<input type="date" id="startDate" name="startDate" class="form-control"/>
  </td>
  </tr>
  </tr>
  </table>
  </tr>
  </Col>

  <Col sm={3}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required"></span><label>User :</label>
	</td>

	<td  align="left">
	<input type="hidden" name="receiptEmpId" id="receiptEmpId" value=""/>
	<input type="text" class="form-control" autocomplete="off" maxLength='256' name="receiptEmpId_chooser" id="receiptEmpId_chooser"/>
	</td>
  </tr>
  </table>
  </tr>    
  </Col>

  <Col sm={3}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required"></span><label>Ledger Account :</label>
	</td>
	<td  align="left">
	<input type="hidden" name="receiptEmpId" id="receiptEmpId" value=""/>
	<input type="text" class="form-control" autocomplete="off" maxLength='256' name="receiptEmpId_chooser" id="receiptEmpId_chooser"/>
	</td>
  </tr>
  </table>
  </tr>    
  </Col>
  </Row>
  <span/><br/>

  </Container>  
  <CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
  </Card>
      
  </form>
  </div>
 
  )
}

export default DayBook
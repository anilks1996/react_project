import React from 'react'
import { Card,Button,CardHeader, CardFooter } from 'reactstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

const LedgerBulkPrinting = () => {

const navigate = useNavigate();

return (
  <div>
  <form>
  <span><Card style={{height:'3rem', background:'lightgrey', width:'70rem'}}>home/ financial reports / ledger bulk printing
  </Card></span><br/>
  <Card>
  <CardHeader>
  <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
  </CardHeader>
  <Container>
  <Row sm={12}>
  <Col sm={6}>
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

  <Col sm={6}>
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


  </Row>
  <span/><br/>
  <Row sm={12}>
  <Col sm={6}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>Date From :&nbsp;</label></td>
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

  <Col sm={6}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>Date To :&nbsp;</label></td>
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
  </Row>
  <span/><br/>
  <Row>
  <Col sm={6}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>Start Code :</label>
	</td>
	<td  align="left">
	<input type="hidden" name="receiptEmpId" id="receiptEmpId" value=""/>
	<input type="text" class="form-control" autocomplete="off" maxLength='256' name="receiptEmpId_chooser" id="receiptEmpId_chooser"/>
	</td>
  </tr>
  </table>
  </tr>    
  </Col>


  <Col sm={6}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>End Code :</label>
	</td>
	<td  align="left">
	<input type="hidden" name="receiptEmpId" id="receiptEmpId" value=""/>
	<input type="text" class="form-control" id="receiptEmpId_chooser"/>
	</td>
  </tr>
  </table>
  </tr>    
  </Col>
  </Row>
  <snap/><br/>
  <Row>
  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><label>Accounts Narration Required In Report :</label>
	</td>
	<td align="left">
  	<label for="lakhCheck.true"></label>
  	<input id="lakhCheck.true" type="checkbox" name="lakhCheck" value="true"/>
  </td>
  </tr>
  </table>
  </tr>    
  </Col>

  <Col sm={1}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td>
	<a class="btn btn-primary" href="javaScript:getVoucherTransactions();" style={{color : 'white'}}>Fetch</a>	
	</td>
  </tr>
  </table>
  </tr>    
  </Col>

  </Row>
  <snap/><br/>
  

  </Container> 
  


<CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
</Card>
  
</form>
</div>

);
}

export default LedgerBulkPrinting
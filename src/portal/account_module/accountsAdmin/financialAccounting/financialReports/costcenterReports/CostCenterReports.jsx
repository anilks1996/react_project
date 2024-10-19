import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card,Button,CardHeader, CardFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const CostCenterReports = () => {

  const navigate = useNavigate();

  return (
    <div>
    <form>
    <span><Card style={{height:'3rem', width:'70rem', background:'lightgrey'}}>Home / financial reports / cost center report

    </Card></span><br/>
    <Card>
    <CardHeader>
    <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
    <Button color="dark">Download Pdf</Button>{' '}
    </CardHeader>
    
    <Container>
  <Row sm={12}>
  <Col sm={4}>
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
  <td align="right" nowrap ><span class="required" style={{color:'red'}}>*</span>
  <label>Financial Year :</label>
  </td>
  <tr>
  <td nowrap align="left" width='29%'>01/04/2023 - 31/03/2024
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
  <td nowrap align="left"><span class="required"style={{color:'red'}}>*</span><label>Ledger Account :</label>
									</td>
  <tr>
  <input type="hidden" name="accountChart.id" id="accountChart.id" value=""/>
	<input type="text" class="form-control" autocomplete="off" maxLength='256' name="accountChart.id_chooser" id="accountChart.id_chooser"/>

  </tr>
  </tr>
  </table>
  </tr>    
  </Col>
  </Row>
  <span/><br/>

  <Row sm={12}>
  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>Date From : </label>
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

  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>Date To : </label>
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

  <Col sm={4}>
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
  </Row>
  <snap/><br/>
  <Row sm={12}>
  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td align="left" width="200px" nowrap><label>Include Asset & Liability :</label>
									</td>
  <tr>
  <td align="left">
  	<label for="narrChk.True"></label>
  	<input id="narrChk.True" type="checkbox" name="narrChk"/>									
	<a class="btn btn-primary" href="javaScript:getVoucherTransactions();" style={{color : 'white'}}>Filter</a>	
	</td>
  </tr>
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
  

)
}

export default CostCenterReports
import { Card,Button,CardHeader, CardFooter } from 'reactstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


const ConsolidatedLedgerReport = () => {

  const navigate = useNavigate();
  return (
  <div>
  <form>
  <span><Card style={{height:'3rem', width:'75rem', background:'lightgrey'}}>Home / financial reports / consolidated ledger report

  </Card></span><br/>
  <Card>
  <CardHeader>
  <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
  <Button color="dark">Download Pdf</Button>{' '}
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
  </Row>
  <span/><br/>

  <Row sm={12}>
  <Col sm={6}>
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

  <Col sm={6}>
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
  </Row>
<span/><br/>
  <Row sm={12}>
  <Col sm={6}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="left"><label>Account Type :</label>
	</td>
  <tr>
  <td  align="left" style={{width:'200px'}}>
		<Form.Select class="form-control" tabindex="-1" id="accountType" name="accountType">
				<option value="" selected>--Select--</option>	  		
				<option  value="General" title="General">General</option>
				<option  value="Cash" title="Cash">Cash</option>
				<option  value="Bank" title="Bank">Bank</option>
	</Form.Select>
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
  <td nowrap align="left"><span class="required"style={{color:'red'}}>*</span><label>Ledger Account :&nbsp;</label>
	</td>
  <tr>
  <td nowrap>
	<input type="hidden" name="accountChart.id" id="accountChart.id" value=""/>
	<input type="text" class="form-control" autocomplete="off" name="accountChart.id_chooser" id="accountChart.id_chooser" size="40"/>

  </td>
  </tr>
  </tr>
  </table>
  </tr>
  </Col>
  </Row>
  </Container>








     
  <CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
  </Card>
  </form>
  </div>
  

)
}

export default ConsolidatedLedgerReport
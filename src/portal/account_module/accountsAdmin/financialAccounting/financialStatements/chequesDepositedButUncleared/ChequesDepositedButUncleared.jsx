import { Card, Button, CardHeader, CardFooter } from 'reactstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ChequesDepositedButUncleared = () => {

  const navigate = useNavigate();

  return (
    <div>
      <form>
        <span><Card style={{ height: '3rem', background: 'lightgrey', width: '70rem' }}>home/ financial statements /cheques deposited but uncleared
        </Card></span><br />
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
  <td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>Date To :</label></td>
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
<Row sm={12}>
<Col sm={5}>

</Col>
<Col sm={5}>

  </Col>

  <Col sm={2}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10"/>
  <tr>
  <td>
  <Button color="dark" align="left">Filter</Button>{' '}
  </td>
  </tr>
  </tr>
  </Col>
  </Row>
 
</Row>
<span/><br/>
  
</Container>
   

          <CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
        </Card>

      </form>
    </div>

  );
}

export default ChequesDepositedButUncleared
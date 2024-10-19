import React from 'react'
import { Card,Button,CardHeader, CardFooter } from 'reactstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';




const CostCenterWiseAccountHeadWiseReport = () => {

  const navigate = useNavigate();
  return (
    <div>
    <form>
   <span><Card style={{height:'3rem', background:'lightgrey', width:'70rem'}}>home/ financial reports / cost center wise account head wise report
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
  <td nowrap align="left"><span class="required"style={{color:'red'}}>*</span><label>Grant/Project : &nbsp;</label>
	</td>
  <tr>
  <td nowrap style={{width:'250px'}}>
	<input type="hidden" name="accountChart.id" id="accountChart.id" value=""/>
	<input type="text" class="form-control" autocomplete="off" name="accountChart.id_chooser" id="accountChart.id_chooser" size="40"/>

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
  <td nowrap align="left"><span class="required"style={{color:'red'}}>*</span><label>Ledger : &nbsp;</label>
	</td>
  <tr>
  <td nowrap style={{width:'250px'}}>
	<input type="hidden" name="accountChart.id" id="accountChart.id" value=""/>
	<input type="text" class="form-control" autocomplete="off" name="accountChart.id_chooser" id="accountChart.id_chooser" size="40"/>
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

);
}


export default CostCenterWiseAccountHeadWiseReport;
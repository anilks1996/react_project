import { Card, Button, CardHeader, CardFooter } from 'reactstrap';
import { Table } from 'reactstrap';
import Checkbox from '@mui/material/Checkbox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TrialBalanceWithoutGroup = () => {

const navigate = useNavigate();

  return (
    <div>
      <form>
        <span><Card style={{ height: '3rem', background: 'lightgrey', width: '70rem' }}>home/ financial statements / trial balance without group
        </Card></span><br />
        <Card>
          <CardHeader>
          <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
            <Button color="dark">Master Update</Button>{' '}
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
  </Row>
  <span/><br/>
</Container>
          
          <Table >
            <th>
              <div class="container text-center">
                <div class="row">
                  <div class="col-3">
                  Show Amount In Lakhs : 
                  </div>
                  <div class="col-1">
                  <Checkbox {...label} defaultChecked />
                  </div>
            
                  <div class="col-1">
                  <Button color="dark">Filter</Button>{' '}
                  </div>
              
                  
              
                </div>
              </div>
            </th>
          </Table>

          <CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
        </Card>

      </form>
    </div>

  );
}
export default TrialBalanceWithoutGroup
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card,Button,CardHeader, CardFooter } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const CodeList = () => {

  const navigate = useNavigate();

  return (
    <div>
    <form>
    <span><Card style={{height:'3rem', width:'75rem', background:'lightgrey'}}>Home / financial reports / code list

    </Card></span><br/>
    <Card>
    <CardHeader>
    <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
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
  <td  align="right"><label>Type :</label>
	</td>
  <tr>
  <td style={{width:'90%'}}>
  <Form.Select class="form-control" tabindex="-1" id="accountChartType">
				<option value="" selected>--Select--</option>	  		
				<option  value="Asset" title="356581376">Asset</option>
				<option  value="Expense" title="356581377">Expense</option>
				<option  value="Income" title="356581378">Income</option>
				<option  value="Liability" title="356581379">Liability</option>
  </Form.Select>
	</td>
  <td>
	<a class="btn btn-primary">Fetch</a>	
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


export default CodeList;
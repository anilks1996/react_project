import { Card, Button, CardHeader, CardFooter } from 'reactstrap';
import { Table } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const BalanceSheetWithSchedule = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      <form>
        <span><Card style={{ height: '3rem', background: 'lightgrey', width: '70rem' }}>home/ Ledger Scheduling
        </Card></span><br />
        <Card>
          <CardHeader>
            <Button color="danger">Schedules</Button>{' '}
            <Button color="dark">Schedule Mapping</Button>{' '}
          </CardHeader>
          </Card> <br/>

      <Row>
        <Col>
        <Card>
        <CardHeader>
        Schedules Mapping
          </CardHeader>
          <form>
      <Box sx={{ flexGrow: 1 }}>
     
          <Item>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column lg="4">
        Company
        </Form.Label>
        <Col lg="8">
        <Form.Select aria-label="Default select example">
      <option>--Select--</option>
      <option value="1">GMDA 2021-2022</option>
      <option value="2">GMDA 2022-2023</option>
      <option value="3">GMDA 2023-2024</option>
    </Form.Select>
        </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column lg="4">
        Schedule
        </Form.Label>
        <Col lg="8">
        <Form.Select aria-label="Default select example">
      <option>--Select--</option>
      <option value="1">Capital Account</option>
      <option value="2">Reserves</option>
      <option value="3">Grant</option>
    </Form.Select>
        </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
        Schedule Code
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text"  size="md" id="captionOrder" name="captionOrder" maxlength="64" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
        Schedule Caption
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text"  size="md" id="captionOrder" name="captionOrder" maxlength="64" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
        Ledger Sequence No
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text"  size="md" id="captionOrder" name="captionOrder" maxlength="64" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
        Main Ledger
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text"  size="md" id="captionOrder" name="captionOrder" maxlength="64" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
        Sub Ledger Code
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text"  size="md" id="captionOrder" name="captionOrder" maxlength="64" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
        SubLedger Name
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text"  size="md" id="captionOrder" name="captionOrder" maxlength="64" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column lg="4">
        Mapping Ledger
        </Form.Label>
        <Col lg="8">
        <Form.Select aria-label="Default select example">
      <option>Select Subledger--</option>
      <option value="1">Capital Account</option>
      <option value="2">Reserves</option>
      <option value="3">Grant</option>
    </Form.Select>
        </Col>
        </Form.Group>
        <Button color="success">Save</Button>{' '}
            <Button color="dark">Fetch Detail</Button>{' '}
            <Button color="danger">Download Report</Button>{' '}
        </Item>
    
    </Box>
    </form>
 

          

         
        </Card>
        </Col>

        <Col>
        <Card>
        <CardHeader>
        Schedule Format:GMDA - 2021-2022 - Inactive
          </CardHeader>
        <Table >
            <th>
              <div class="container text-center">
                <div class="row">
                  <div class="col-6">
           ORGANIZATION
                  </div>
                </div>
              </div>
            </th>
          </Table> 
        </Card>
        </Col>
      </Row>
   
  

          
          
          
          <Card>
          <CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
        </Card>

      </form>
    </div>

  );
}

export default BalanceSheetWithSchedule
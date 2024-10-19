import React from 'react'
import { BiTable } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';
import { DatePicker } from 'reactstrap-date-picker';


const EditPayrollTab = () => {
    const navigatePage=useNavigate();
    const goback=()=>{
        window.history.back();
    }
    const searchDesignation=()=>{
        //navigatePage("/serviceBookDetails/tourApplicationReport");
    }
  return (
    <div>
        <form style={{height:'40rem'}}>
            <Row className="mt-1">
            <Col sm="12">
            <Card>
                <CardHeader>
                    <BiTable />General Details
                </CardHeader>
                <CardBody>
                    {/*  hg */}
                    <Table >
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Department</label>
                                                           
                            </td>
                            <td>
                                <label>Designation</label>
                                
                            </td>
                            <td>
                                <label>Date of Joining</label>
                                
                            </td>
                        </tr>
                    </tbody>                   
                    <thead> <tr></tr>              
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Scale of Pay</label>
                                
                            </td>
                            <td>
                                <label>Bank Name</label>
                                
                            </td>
                            <td>
                                <label>Bank Account No</label>  
                               
                            </td>                            
                        </tr>
                    </tbody>                                       
                    <tbody>
                        <tr>
                            <td> 
                                <label>Payroll PBR</label>  
                                <input type='text' id="payrollEcr.id" name="payrollEcr.id" className='form-control'/>
                            </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>
                                <Button color='info'>Update</Button>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
            </CardBody>
                
            </Card>
            </Col>
        </Row>
        </form>
    </div>
  )
}

export default EditPayrollTab;

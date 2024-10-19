import React from 'react'
import { BiTable } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';
import { DatePicker } from 'reactstrap-date-picker';


const EditExperienceTab = () => {
    const navigatePage=useNavigate();
    const goback=()=>{
        window.history.back();
    }
    const searchDesignation=()=>{
        //navigatePage("/serviceBookDetails/tourApplicationReport");
    }
  return (
    <div>
        <form style={{height:'45rem'}}>
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
                                <label>From Date</label>
                                <DatePicker id="hiddenFrom" dateFormat="DD/MM/YYYY"/>
                            </td>
                            <td>
                                <label>To Date</label>
                                <DatePicker id="hiddenTo" dateFormat="DD/MM/YYYY"/>
                            </td>
                            <td>
                                <label>Last Employer</label>  
                                <input type='text' id="qualsId" name="qualsId" className='form-control'/>
                            </td>
                            <td>
                                <label>Designation</label>
                                <input type='text' id='hiddenDesignation' name="hiddenDesignation" className='form-control'/>
                            </td>                           
                            <td>
                                <label>Experience</label>
                                <input type='text' id='hiddenExpYear' name='hiddenExpYear' className='form-control'/>
                            </td>
                            <td>
                                <label>Last Pay Drawn Per Year</label>
                                <input type='text' id='hiddenSalary' name='hiddenSalary' className='form-control'/>
                            </td>                           
                        </tr>
                    </tbody>                    
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td> </td>
                            <td> </td>
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

export default EditExperienceTab;

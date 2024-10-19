import React from 'react'
import { BiTable } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';


const EditQualificationTab = () => {
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
                    <Table style={{fontSize:'0.8rem'}}>        
                    <thead>               
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Qualification Type</label>
                                <input type='text' id="qualTypes" name="qualTypes" className='form-control'/>
                            </td>
                            <td>
                                <label>Qualification Name</label>
                                <input type='text' id="reportingToEmployee.id" name="reportingToEmployee.id" className='form-control'/>
                            </td>
                            <td>
                                <label>Discipline Name</label>  
                                <input type='text' id="qualsId" name="qualsId" className='form-control'/>
                            </td>
                            <td>
                                <label>Any Other Qual</label>
                                <input type='text' id='otherQuals' name='otherQuals' className='form-control'/>
                            </td>                           
                            <td>
                                <label>Institution</label>
                                <input type='text' id='otherQuals' name='otherQuals' className='form-control'/>
                            </td>
                            <td>
                                <label>Board/University</label>
                                <input type='text' id='utys' name='utys' className='form-control'/>
                            </td>
                            <td>
                                <label>Year Of Passing</label>
                                <input type='text' id='passoutYear' name='passoutYear' className='form-control'/>
                            </td>
                            <td>
                                <label>% Of Marks</label>
                                <input type='text' id='marks' name='marks' className='form-control'/>
                            </td>
                            <td>
                                <label>Class/Grade</label>
                                <input type='text' id='gradeMark' name='gradeMark' className='form-control'/>
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

export default EditQualificationTab;

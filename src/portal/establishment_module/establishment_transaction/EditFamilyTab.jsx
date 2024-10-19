import React from 'react'
import { BiTable } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';
import { DatePicker } from 'reactstrap-date-picker';


const EditFamilyTab = () => {
    const navigatePage=useNavigate();
    const goback=()=>{
        window.history.back();
    }
    const searchDesignation=()=>{
        //navigatePage("/serviceBookDetails/tourApplicationReport");
    }
  return (
    <div>
        <form  style={{height:'40rem'}}>
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
                                <label>Name</label>
                                <input type='text' id="hiddenName" className='form-control'/>
                            </td>
                            <td>
                                <label>Relationship</label>
                                <input type='text' id="hiddenRelation" className='form-control'/>
                            </td>
                            <td>
                                <label>Date of Birth</label>  
                                <DatePicker id="hiddenBirthDate" dateFormat="DD/MM/YYYY"/>
                            </td>
                            <td>
                                <label>Occupation</label>
                                <input type='text' id='hiddenOccupation' name="hiddenOccupation" className='form-control'/>
                            </td>                           
                            <td>
                                <label>Dependent</label>
                                <input type='text' id='hiddenDependent' name='hiddenDependent' className='form-control'/>
                            </td>
                            <td>
                                <label>Nominee</label>
                                <input type='text' id='hiddenNominee' name='hiddenNominee' className='form-control'/>
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

export default EditFamilyTab;

import React from 'react'
import { BiTable } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';


const EditContactTab = () => {
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
                            <label>Permanent Address</label>
                                <textarea id="permanentAddress.address1" name="permanentAddress.address1" wrap='soft'/>                           
                            </td>
                            <td>
                                <label>Address For Correspondence</label>
                                <textarea id="corespondenceAddress.address1" name="corespondenceAddress.address1" />
                            </td>
                        </tr>
                    </tbody>                   
                    <thead>               
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Country</label>
                                <input type='text' id="country.id" name="country.id" className='form-control'/>
                            </td>
                            <td>
                                <label>State</label>
                                <input type='text' id="state.id" name="state.id" className='form-control'/>
                            </td>
                            <td>
                                <label>Country</label>  
                                <input type='text' id="country2.id" name="country2.id" className='form-control'/>
                            </td>
                            <td>
                                <label>State</label>
                                <input type='text' id='state2.id' name='state2.id' className='form-control'/>
                            </td>
                        </tr>
                    </tbody>                    
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>City</label>
                                <input type='text' id="permanentAddress.cityMaster.id" name="permanentAddress.cityMaster.id" className='form-control'/>
                            </td>
                            <td>
                                <label>Pin Code</label>
                                <input type='text' id='permanentAddress.zipCode' name='permanentAddress.zipCode' className='form-control'/>
                            </td>
                            <td>
                                <label>City</label>
                                <input type='text' id="corespondenceAddress.cityMaster.id" name="corespondenceAddress.cityMaster.id" className='form-control'/>
                            </td>
                            <td>
                                <label>Pin Code</label>
                                <input type='text' id="corespondenceAddress.zipCode" name="corespondenceAddress.zipCode" className='form-control'/>
                            </td>
                        </tr>
                    </tbody>                    
                    <thead>
                        <tr><th>Permanent Address Contact Details</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Phone No</label>
                                <input type='text' id="permanentAddress.phone" name="permanentAddress.phone" className='form-control'/>
                            </td>
                            <td>
                                <label>Mobile</label>
                                <input type='text' id="permanentAddress.mobile" name="permanentAddress.mobile" className='form-control'/>
                            </td>
                            <td>
                                <label>Budget Type</label>
                                <input type='text' id="permanentAddress.email" name="permanentAddress.email" className='form-control'/>
                            </td>
                            
                        </tr>
                    </tbody>
                    <thead>
                        <tr><th>Emergency Contact Details</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Phone No</label>
                                <input type='text' id="contactName" value=""/>
                            </td>
                            <td>
                                <label>Mobile</label>
                                <input type='text' id="contactPhoneNo" value=""/>
                            </td>
                            <td>
                                <label>Address</label>
                                <textarea id='empGrade' name='empGrade' className='form-control'/>
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

export default EditContactTab;

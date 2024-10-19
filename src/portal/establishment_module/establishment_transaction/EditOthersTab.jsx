import React from 'react'
import { BiTable } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';
import { DatePicker } from 'reactstrap-date-picker';
import { FaPlus } from 'react-icons/fa';


const EditOthersTab = () => {
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
                            <label>Passport No.</label>
                                <input type="text" id="employee.passportNo" value="" className='form-control'/>                            
                            </td>
                            <td>
                                <label>Issue Details</label>
                                <input type='text' id="employee.passportIssueDetail" value="" className='form-control'/>
                            </td>
                            <td>
                                <label>Passport Expiry Date</label>
                                <DatePicker dateFormat="DD/MM/YYYY" id="passportExpDate" value=""/>
                            </td>
                            <td>
                                <label>Visa Number</label>
                                <input type='text' id='employee.visaNo' name='maritalStatus' className='form-control'/>
                            </td>
                            <td>
                                <label>Visa Expiry Date</label>
                                <DatePicker dateFormat="DD/MM/YYYY" id="visaExpiryDate" value=""/>
                            </td>
                        </tr>
                    </tbody>                   
                    <thead> <tr><th>Reference</th></tr>              
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Name</label>
                                <input type='text' id='hiddenReferName0' name='hiddenReferName0' className='form-control'/>
                            </td>
                            <td>
                                <label>Designation</label>
                                <input type='text' id='hiddenReferDesig1' name='hiddenReferDesig1' className='form-control'/>
                            </td>
                            <td>
                                <label>Organization</label>  
                                <input type='text' id='hiddenReferOrg2' name='hiddenReferOrg2' className='form-control'/>
                            </td>
                            <td>
                                <label>Address</label>
                                <input type='text' id='hiddenReferAddr3' name='hiddenReferAddr3' className='form-control'/>
                            </td>
                            <td>
                                <label>Phone No</label>
                                <input type='text' id='hiddenReferPhone4' name='hiddenReferPhone4' className='form-control'/>
                            </td>
                            <td>
                                <Button><FaPlus/></Button>
                            </td>
                        </tr>
                    </tbody>                    
                    
                    <tbody>
                        <tr>
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

export default EditOthersTab;

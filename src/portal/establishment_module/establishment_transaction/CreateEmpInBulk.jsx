import React, { useState } from 'react'
import { FaArrowLeft, FaFileUpload } from 'react-icons/fa';
import { Card,CardHeader,CardBody,Row,Col, Table, Button } from "reactstrap";

const CrteateEmpInBulk = () => {
    const goback=()=>{
        window.history.back();
    }
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div>
    <form>
    <Row className="mt-1">
    
    <Col sm="12">
      <Card>
        <CardHeader>
            <label>Establishment / Bulk Employee Upload</label>
        </CardHeader>
        <CardHeader className='p-1'>
            <Button color='warning'><FaArrowLeft/></Button> <Button color='success'><FaFileUpload/> Upload & Save</Button>
        </CardHeader>
        <CardBody>
            {/*  hg */}
            <Table striped>
              <thead>
                <th>UPLOAD DATA FOR</th>
              </thead>
              <thead>
                <tr>
                  <th scope="row"><input type="radio" value="employeeData"/> Employee</th>
                  <th scope="row"><input type="radio" value="hrMasterData"/> HR Master</th>
                </tr>
                </thead>
              <thead>
              <tr>               
                <th scope='row' style={{ color: 'red' }}>PLEASE READ THE FOLLOWING INSTRUCTIONS BEFORE STARTING THE DATA UPLOAD PROCESS:</th>                                
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">                 
                    <ol>
                      <li>File to be uploaded must be in MSExcel 97-2003 format.   Download Sample Template: </li>
                      <li>If the sheet contains all the columns in exactly similar order as shown in the Sample Template
                        <ul>
                          <li>Browse the file and click on go button.</li>
                        </ul>
                        <ul>
                          <li>Browse the file and click on go button.</li>
                        </ul>
                        <ul>
                          <li>Once all the data gets loaded in the screen click on the save button.
                          else</li>
                        </ul>
                        <ul>
                          <li>Browse the file and click on go button.</li>
                        </ul>
                        <ul>
                          <li>Map the columns of sheet with the Columns Available in the ERP.</li>
                        </ul>
                        <ul>
                          <li>Click on the Save Button.</li>
                        </ul>                       
                      </li>
                      <li>All Fields shown in RED color in the template are mandatory .</li>
                    </ol>                    
                    <ul>
                      <li color='warning'>*Note :  If any employee data is not uploaded due to any wrong data, a sheet will be downloaded with those entries.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input id='efile' name='efile' type='file' className='form-control' placeholder='Please select file'/>
                  </td>
                  <td><Button color='info'>Upload Sheet</Button></td>
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

export default CrteateEmpInBulk;

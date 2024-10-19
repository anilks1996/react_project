import React, { useEffect, useState } from "react";
import { FaCut, FaEdit, FaPlus, FaSearch, FaSave } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import {Card,CardHeader, CardBody,CardTitle,Button,CardFooter,Row,Col,FormGroup,ButtonGroup,Table,Media,Input, Label,} from "reactstrap";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Select from "react-select";
import StaffTypeList from "../../establishment_module/establishment_setup/StaffTypeList";
import { ArrowBack } from "@mui/icons-material";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function LeaveAdjustment() {
const [startDate, setStartDate] = useState(new Date());
const [leaveAdjustmentForm, setleaveAdjustmentForm]=useState(new Date());
  


  const [value, setValue, onChange] = useState("10:00");
  const [leaveTypeCols, setLeaveTypeCols] = useState();
  const navigatepage = useNavigate();
  const staffTypeList = [
    { value: 585960, label: "--Select Staff Type--" },
    { value: 123456, label: "NA" },
    { value: 789123, label: "Deputation" },
    { value: 456789, label: "Regular" },
    { value: 101112, label: "Remuneration of experts" },
    { value: 131415, label: "Contractual" },
    { value: 161718, label: "Manpower Outsourced-Contractual" },
    { value: 192021, label: "Contractual-GIS" },
    { value: 222324, label: "HARTRON" },
    { value: 252627, label: "HKRNL" },
    { value: 282930, label: "Expert(Appointed by Govt. of Haryana)" },
  ];
  const EmployeeTypeList = [
    { value: 585960, label: "--Select Staff Type--" },
    { value: 123456, label: "NA" },
    { value: 789123, label: "Deputation" },
    { value: 456789, label: "Regular" },
    { value: 101112, label: "Remuneration of experts" },
    { value: 131415, label: "Contractual" },
    { value: 161718, label: "Manpower Outsourced-Contractual" },
    { value: 192021, label: "Contractual-GIS" },
    { value: 222324, label: "HARTRON" },
    { value: 252627, label: "HKRNL" },
    { value: 282930, label: "Expert(Appointed by Govt. of Haryana)" },
  ];
  const Designation = [
    { value: 585960, label: "Select Designation" },
    { value: 123456, label: "Accountant" },
    { value: 789123, label: "Account Officer" },
  ];
  const StaffGrade = [{ value: 585960, label: " NA " }];

  const EmployeeList = [{ value: 585960, label: " EmployeeList " }];

  const [staffType, setStaffType] = useState();
  function selectedLType(data) {
    setStaffType(data);
  }
  const [employeeType, setEmployeeType] = useState();
  function selectedRType(data) {
    setEmployeeType(data);
  }
  const [showTable, setShowTable] = useState(false);

  const showLeaveList = () => {
    //axios.get(BASE_URL+"leaveTypeList1").then((Response)=>{
    // const datalist=responsivePropType.data;
    //  setLeaveTypeCols(datalist);
    //alert(leaveTypeCols)
    //})

    setShowTable(true);
  };
  const [leaveStatus1, setleaveStatus1] = useState();
  function selectedSType(data) {
    setleaveStatus1(data);
  }

  const leaveApproval = (event, field) => {
    alert("event=" + field);
    navigatepage("/leaveMaster/leaveTransaction/LeaveAdjustment");
  };

  const handleChange = (event, field) => {
    let pass = event.target.value;
  };

  const filterOptionChange = (event, field) => {
    alert("event=" + field);
  };
  const createholiday = (event, field) => {
    alert("event=" + field);
    navigatepage("");
  };
  
  const Goback = () => {
    window.history.back();
  }
  return (
    <div>
    <form>
      <Card style={{minWidth:'70rem'}}>
      <CardHeader>
        <i><label>Leave Transaction / Leave adjustment </label></i>                                  
      </CardHeader>
        <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack/></Button></CardHeader>
          <CardBody>
              <Row>
                  <Col sm={12}>
                  <Box component="form"
     sx={{
      '& > :not(style)':{m:1, width:'90ch'},
     }}
     noValidate
     autoComplete="off"
     >
      <TextField id="filled-basic" label="* Employee Name or Code" variant='filled'/>
     </Box>

                        <Button
                        class="btn btn-primary pull-right"
                        id="radioA"
                        name="Button"
                        color="success"
                        onClick={showLeaveList}>
                        Go...
                      </Button>
                    </Col>
                    <Col sm={6}>
                  <label align='left'>Employee Code:</label>
                  <input type="text" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
          
                  </Col>
                  <Col sm={6}>
                 <label align='right'>Gender:</label>
                  <input type="text" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                   </Col>
                  <Col sm={6}>
                  <label>Employee Type:</label>
                    <Select
                      class="form-control"
                      options={EmployeeTypeList}
                      id="employeeTypeList.id"
                      name="employeeTypeList.id"
                      value={showLeaveList}
                      onChange={(e) => {
                        selectedSType(e);
                      }}
                    />
                    </Col>
                    <Col sm={6}>
                  <label> Staff Type:</label>
                    <Select
                      class="form-control"
                      options={staffTypeList}
                      id="staffType.id"
                      name="staffType.id"
                      value={showLeaveList}
                      onChange={(e) => {
                        selectedSType(e);
                      }}
                    />
                  </Col>
                  <Col sm={6}>
                  <label> Designation:</label>
                    <Select
                      class="form-control"
                      options={Designation}
                      id="staffType.id"
                      name="staffType.id"
                      value={showLeaveList}
                      onChange={(e) => {
                        selectedSType(e);
                      }}
                    />
                    </Col>
                    <Col sm={6}>
                  <label> Date of Join:</label>
                  <input type="Date" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                 
                    </Col>
                  <Col sm={6}>
                  <label> Staff Grade:</label>
                    <Select
                      class="form-control"
                      options={StaffGrade}
                      id="staffgrade.id"
                      name="staffgrade.id"
                      value={showLeaveList}
                      onChange={(e) => {
                        selectedSType(e);
                      }}
                    />
                    </Col>
              </Row>
          </CardBody>
      
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Row>
            <Col sm={11}>
            [1] Medical Leave:  Opening Leaves[OP]: No opening Leaves
            </Col>
            <Col sm={1}>
            <Button>Add</Button>
            </Col>
          </Row>
        </AccordionSummary>
          <AccordionDetails>
           <Table>
            <Row>
              <tr>
                <td>
                  <Label>Select</Label>
                <input type= 'checkbox' id="employeeLeaveId0.948114077" name="employeeLeaveIds0" 
                            value="948114077" onClick="disableRow('0','0')"></input>
 
                </td>
                <td>  
                  <Label>For Duration</Label>
                <input type="Date" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                 <Label>Credit Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Eligible Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Balance Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Leave Applied</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Remarks</Label>
                <input type="text" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                </tr>
                <tr>
                <td>
                  <font color="Green" size="2">Total available balance :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
                 <font color="red" size="2">0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>   
                <Button name="leaveAdjustment"><FaSave></FaSave></Button>
                </td>
              </tr>
            </Row>
           </Table>
          </AccordionDetails>
          </Accordion>


          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
>
          <Row>
          <Col sm={11}>
          [2] Restricted Holiday:        Opening Leaves[OP]: No opening Leaves
          </Col>
          <Col sm={1}>
          <Button>Add</Button>
          </Col>
        </Row>            
          </AccordionSummary>
          <AccordionDetails>
           <Table>
            <Row>
              <tr>
                <td>
                  <Label>Select</Label>
                <input type= 'checkbox' id="employeeLeaveId0.948114077" name="employeeLeaveIds0" 
                            value="948114077" onClick="disableRow('0','0')"></input>
 
                </td>
                <td>  
                  <Label>For Duration</Label>
                <input type="Date" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                 <Label>Credit Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Eligible Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Balance Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Leave Applied</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Remarks</Label>
                <input type="text" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                </tr>
                <tr>
                <td>
                  <font color="Green" size="2">Total available balance :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
                 <font color="red" size="2">0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>   
                <Button name="leaveAdjustment"><FaSave></FaSave></Button>
                </td>
              </tr>
            </Row>
           </Table>
          </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          [3] Casual Leave:        Opening Leaves[OP]: No opening Leaves <Button>Add</Button>
              
          </AccordionSummary>
          <AccordionDetails>
           <Table>
            <Row>
              <tr>
                <td>
                  <Label>Select</Label>
                <input type= 'checkbox' id="employeeLeaveId0.948114077" name="employeeLeaveIds0" 
                            value="948114077" onClick="disableRow('0','0')"></input>
 
                </td>
                <td>  
                  <Label>For Duration</Label>
                <input type="Date" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                 <Label>Credit Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Eligible Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Balance Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Leave Applied</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Remarks</Label>
                <input type="text" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                </tr>
                <tr>
                <td>
                  <font color="Green" size="2">Total available balance :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
                 <font color="red" size="2">0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>   
                <Button name="leaveAdjustment"><FaSave></FaSave></Button>
                </td>
              </tr>
            </Row>
           </Table>
          </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          [4] Meternity Leave:        Opening Leaves[OP]: No opening Leaves <Button>Add</Button>
              
          </AccordionSummary>
          <AccordionDetails>
           <Table>
            <Row>
              <tr>
                <td>
                  <Label>Select</Label>
                <input type= 'checkbox' id="employeeLeaveId0.948114077" name="employeeLeaveIds0" 
                            value="948114077" onClick="disableRow('0','0')"></input>
 
                </td>
                <td>  
                  <Label>For Duration</Label>
                <input type="Date" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                 <Label>Credit Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Eligible Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Balance Leaves</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Leave Applied</Label>
                <input type="Number" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                <td>
                <Label>Remarks</Label>
                <input type="text" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                </td>
                </tr>
                <tr>
                <td>
                  <font color="Green" size="2">Total available balance :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
                 <font color="red" size="2">0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>   
                <Button name="leaveAdjustment"><FaSave></FaSave></Button>
                </td>
              </tr>
            </Row>
           </Table>
          </AccordionDetails>
          </Accordion>
          
        <CardFooter>Footer</CardFooter>
      </Card>
    </form>
  </div>
  )
}
export default LeaveAdjustment
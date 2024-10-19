import React, { useEffect, useState } from "react";
import {FaCut, FaEdit, FaPlus, FaSearch, FaSave, FaBold,} from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import {Card, CardHeader,CardBody,CardTitle,Button,CardFooter,Row,Col,FormGroup,ButtonGroup,Table,Media,Input,Label,} from "reactstrap";
import { ArrowBack, Save } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

function ProcessedUnProcessed() {
  const [startDate, setStartDate] = useState(new Date());
  const [leaveAdjustmentForm, setleaveAdjustmentForm] = useState(new Date());
  const [count, setCount] = React.useState(1);

  const [value, setValue, onChange] = useState("10:00");
  const [leaveTypeCols, setLeaveTypeCols] = useState();
  const navigatepage = useNavigate();
  
  const Designation = [
    { value: 585960, label: "Select Designation" },
    { value: 123456, label: "Accountant" },
    { value: 789123, label: "Account Officer" },
  ];
  const StaffGrade = [{ value: 585960, label: " NA " }];

  const EmployeeList = [{ value: 585960, label: " EmployeeList " }];

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
    navigatepage("/leaveMaster/leaveTransaction/ProcessedUnProcessed");
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
  };
  return (
    <div>
      <form>
        <Card style={{ minWidth: "70rem" }}>
        <CardHeader>
        <i><label>Leave Transaction / Processed un-Processed Leaves </label></i>                                  
      </CardHeader>
          <CardHeader>
            <Button id="radioA" name="Button" color="warning" onClick={Goback}>
              <ArrowBack />
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button id="radioA" name="Button" color="info" onClick={Save}>
              <FaSave />
            </Button>
          </CardHeader>
          <CardBody>
            <div class="alert alert-danger" role="alert">
              <center>
                <strong>Leave Policies</strong>
              </center>
            </div>
          </CardBody>
          
          <Accordion class="alert alert-primary" role="alert">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              [1] Medical Leave:[(01/01/2024) TO (31/12/2024)] Casual
              Leave(Remuneration of experts-Remuneration of experts)
              </AccordionSummary>
              <AccordionDetails> 
              <Table>
                <Row>
                  <tr>
                    <td>
                    <Button
                      aria-label="increase"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      <AddIcon fontSize="small" /></Button>
                      [Split-1].((01/01/2024 TO (31/12/2024))) 
                      [Total Un-Propressed employee = '']
                      </td>
                  </tr>
                  <Button>Process Leaves</Button>
                
                </Row>
              </Table>
              </AccordionDetails>
            </Accordion>
            <Accordion class="alert alert-primary" role="alert">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              [2] Casual Leave:[(01/01/2024) TO (31/12/2024)] Casual
              Leave(Remuneration of experts-Remuneration of experts)
              </AccordionSummary>
              <AccordionDetails> 
              <Table>
                <Row>
                  <tr>
                    <td>
                    <Button
                      aria-label="increase"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      <AddIcon fontSize="small" /></Button>
                      [Split-1].((01/01/2024 TO (31/12/2024))) 
                      [Total Un-Propressed employee = '']
                      </td>
                  </tr>
                  <Button>Process Leaves</Button>
                
                </Row>
              </Table>
              </AccordionDetails>
            </Accordion>
    
            <Accordion class="alert alert-primary" role="alert">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              [3] Restricted Holiday:[(01/01/2024) TO (31/12/2024)] Casual
              Leave(Remuneration of experts-Remuneration of experts)
              </AccordionSummary>

              <AccordionDetails> 
              <Table>
                <Row>
                  <tr>
                    <td>
                    <Button
                      aria-label="increase"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      <AddIcon fontSize="small" /></Button>
                      [Split-1].((01/01/2024 TO (31/12/2024))) 
                      [Total Un-Propressed employee = '']
                      </td>
                  </tr>
                  <Button>Process Leaves</Button>
                
                </Row>
              </Table>
              </AccordionDetails>
            </Accordion>
    

        
          <CardFooter>Footer</CardFooter>
        </Card>
      </form>
    </div>
  );
}
export default ProcessedUnProcessed;

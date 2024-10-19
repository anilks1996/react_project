import React, {useState} from 'react'
import { FaBackward, FaCut, FaEdit, FaPlus, FaRemoveFormat, FaSearch } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card,CardHeader,CardBody,CardTitle,Button,CardFooter,Row,Col, FormGroup, ButtonGroup,Dropdown,DropdownToggle,DropdownMenu,DropdownItem,Table } from "reactstrap";
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import { ArrowBack } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";

const EmployeeleaveChart = ({direction, ...args}) => {
    const navigatepage =useNavigate();
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=> setDropdownOpen((prevState)=>!prevState);
    const [addleave, setLeave]=useState({
      leaveTypeCode:'',
      leaveTypeName:'',
      leaveDescription:''
     });
    const handleChange=(event, field)=>{
      let pass=event.target.value;
       setLeave({
        ...addleave,
        [field]:pass
      })
    }    

    const [showTable, setShowTable]=useState(false);
    const showPolicyList=()=>{
      setShowTable(true);
    }

    const filterOptionChange=(event, field)=>{
      alert('event='+field);
    }
    const createPolicy=(event,field)=>{
      alert('event='+field);
      navigatepage("/leaveMaster/leaveReports/LeaveStatus");
    };
    const staffGrade=[
      {"value":616263,"label":"--Select--"},
      {"value":495051,"label":"NA"}
    ]
    const [grade,setStaffGrade]=useState();
    function selectedEType(data){
      setStaffGrade(data);
    }
    const staffTypeList=[
      {"value":585960,"label":"--Select Staff Type--"},
      {"value":123456,"label":"NA"},
      {"value":789123,"label":"Deputation"},
      {"value":456789,"label":"Regular"},
      {"value":101112,"label":"Remuneration of experts"},
      {"value":131415,"label":"Contractual"},
      {"value":161718,"label":"Manpower Outsourced-Contractual"},
      {"value":192021,"label":"Contractual-GIS"},
      {"value":222324,"label":"HARTRON"},
      {"value":252627,"label":"HKRNL"},
      {"value":282930,"label":"Expert(Appointed by Govt. of Haryana)"},
    ]
    const LeaveStatus=[
        {"value":585960,"label":"--Select Staff Type--"},
        {"value":123456,"label":"Approved"},
        {"value":789123,"label":"Rejected"},
        {"value":456789,"label":"Pending"},
        {"value":101112,"label":"Cancelled"},
        {"value":131415,"label":"Forwarded"},
      ]
    const [staffType,setStaffType]=useState();
    function selectedLType(data){
         setStaffType(data);
    }
    const [employeeType,setEmployeeType]=useState();
    function selectedRType(data){
      setEmployeeType(data);
    }
    const leaveTypeList=[
        {"value":585960,"label":"--Select--"},
        {"value":789123,"label":"Casual Leave"},
        {"value":456789,"label":"Casual Leave Female"},

        {"value":101112,"label":"Casual Leave Male"},
        {"value":131415,"label":"Child Care Leave"},
        {"value":161718,"label":"Earned Leave"},

        {"value":192021,"label":"Leave Without Pay"},
        {"value":222324,"label":"Maternity Leave"},
        {"value":252627,"label":"Medical Leave"},

        {"value":282930,"label":"Optional Leave"},
        {"value":313233,"label":"Paternity Leave"},
        {"value":343536,"label":"Restricted Holiday"},
        
        {"value":373839,"label":"Sick Leave"},
        {"value":404142,"label":"Special Leave"},
        {"value":434445,"label":"Station Leave"}
      ]
      const [leaveType,setLeavaType]=useState();
      function selectedSType(data){
        setLeavaType(data);
      }
      const Goback = () => {
        window.history.back();
      }
    return (
      <div>
          <form>
             <Card style={{width:'80rem'}}>
             <CardHeader  className='p-0'>
                <i><label>Leave Reports / Employee Leave Chart </label></i></CardHeader>
              <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack/> </Button>
              <Button id='radioA' name='Button' onClick={0}>Download PDF</Button>
              <Button id='radioA' name='Button' onClick={1}>Download Excel </Button>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                
                      <th>Employee Name/Code</th>
                      <th>
                      <TextField id="filled-basic" label="* Employee Name or Code" variant='filled'/>
                      </th>
                      <th>Leave Applied From</th>
                      <input type="Date" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                      <th>Leave Applied To</th>
                      <input type="Date" placeholder=" " id="employee.id_choose" className='form-control'
                            value={''} onChange={(e)=>handleChange(e,'employeeCode')}/>
                    
                    <th>
                    <Button class="btn btn-primary pull-right" id='radioA' name='Button' color='success'  onClick={showPolicyList}>GO..</Button> 
                    </th>
                             
                    </thead>
                  </Table>
                  <CardBody>
                      <CardHeader>Table</CardHeader>
                {
                  showTable==false? 
                  <div></div>
                  :                 
                  <Table>
                    <thead> 
                    <tr> 
                        <th>Employee Code/Name</th> 
                        <th>Leave Type</th> 
                        <th>Opening Balance</th>
                        <th>Days Availed</th> 
                        <th>Closing Balance</th>
                        </tr> 
                       </thead> 
                <tbody> 
                    <tr> 
                        <td>50054-Mr.Pryag Chand Pandey</td> 
                        <td>Casual Leave</td> 
                        <td>15</td> 
                        <td>2</td>
                        <td>13</td> 
                     </tr> 
                     <tr> 
                     <td>50054-Mr.Pryag Chand Pandey</td> 
                        <td>Earned Leave</td> 
                        <td>15</td> 
                        <td>2</td>
                        <td>13</td>  
                     </tr> 
                     <tr> 
                     <td>50054-Mr.Pryag Chand Pandey</td> 
                        <td>Medical Leave</td> 
                        <td>15</td> 
                        <td>2</td>
                        <td>13</td>
                        </tr> 
                    </tbody>          
                    </Table>
                          }
                  </CardBody>
                  </CardBody>
             </Card>
                    <CardFooter>
                    Footer
                    </CardFooter>
          </form>
      </div>
    );
   }
  EmployeeleaveChart.propTypes={
    direction:PropTypes.string,
  };
  export default EmployeeleaveChart;

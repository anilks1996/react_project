import React, { useEffect, useState } from "react";
import { FaCut, FaEdit, FaPlus, FaSearch, FaSave } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import {Card,CardHeader, CardBody,CardTitle,Button,CardFooter,Row,Col,FormGroup,ButtonGroup,Table,Media,Input, Alert,} from "reactstrap";
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import StaffTypeList from "../../establishment_module/establishment_setup/StaffTypeList";
import { ArrowBack } from "@mui/icons-material";
import { showStaffType } from "../../establishment_module/establishment_redux/slices/establishment_slice/staffTypeSlice";
import { showEmployeeType } from "../../establishment_module/establishment_redux/slices/establishment_slice/employeeTypeSlice";
import { fetchAllEmployeesCols } from "../../establishment_module/establishment_redux/slices/establishment_slice/employeeSetupSlice";
import { createLeaveAllocation, deleteLeaveAllocation, editLeaveAllocation, showLeaveAllocation } from '../../leave_module/leave_redux/slices/leave_slice/leaveAllocationSlice';

const LeaveAllocation = () => {
  const [value, setValue, onChange] = useState("10:00");
  const [leaveTypeCols, setLeaveTypeCols] = useState();
  const dispatch = useDispatch();
  const navigatepage = useNavigate();
  const {staffTypes} = useSelector((state)=> state.allstorereducer.stafft);
  const {employeeTypes} = useSelector((state)=> state.allstorereducer.empt);
  const {allEmployees} = useSelector((state)=>state.allstorereducer.employeeData);
 
  useEffect(()=>{
      dispatch(showEmployeeType());
      dispatch(fetchAllEmployeesCols());
      dispatch(showStaffType());
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
    }, []);
  const StaffGrade = [{ value: 585960, label: " NA " }];
  const Goback = () => {
    window.history.back();
  }
  const EmployeeList = [{ value: 585960, label: " EmployeeList " }];
  const [staffType, setStaffType] = useState();
  function selectedLType(data) {
    setStaffType(data);
  }
  const [employeeType, setEmployeeType] = useState();
  function selectedRType(data) {
    setEmployeeType(data);
  }
  const [allEmployee, setallEmployee] = useState();
  function selectedLType(data) {
    setallEmployee(data);
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
    navigatepage("/leaveMaster/leaveTransaction/LeaveAllocation");
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

  return (
    <div>
      <form>
      <Card style={{width:'80rem'}} className='form-shadow'>
      <CardHeader>
        <i><label>Leave Transaction / Leave Allocation </label></i>                                  
      </CardHeader>
        <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack/></Button></CardHeader>
        
      </Card>
      <Card className='form-shadow'>
      <CardHeader>
      <i><label> Leave Allocation</label></i>
      </CardHeader>
            <CardBody>
            <Card className='p-4 ' >
                <Row>                
                 <Col sm={3}>
                  <th><label>Employee Type</label>
                   <select id='employeeType.id' name='employeeType.id' value={employeeType && employeeType.id} className='form-select'>
                    <option value={null}>-- select --</option>
                     {
                      employeeTypes.map((emp)=>(
                      <option value={emp.id}>{emp.name}</option>
                      ))
                      }
                   </select></th>
                </Col>
                <Col sm={3}>
                  <label> Staff Type</label>
                    <select id='staffType.id' name='staffType.id' value={staffType && staffType.id} className='form-select'>
                    <option value={null}>-- select --</option>
                     {
                      staffTypes.map((staff)=>(
                      <option value={staff.id}>{staff.name}</option>
                      ))
                     }
                    </select>
                </Col>
                <Col sm={2}>
                  <label> Staff Grade</label>
                    <Select class="form-control" options={StaffGrade} id="staffgrade.id" name="staffgrade.id" value={showLeaveList}
                        onChange={(e) => {
                          selectedSType(e);
                        }}
                      />
                    </Col>
                    <Col sm={3}>
                    <label> Employee</label>
                    <select id='employees.id' name='employees.id' value={allEmployee && allEmployee.id} className='form-select'>
                      <option value={null}>-- select --</option>
                        {
                          allEmployees.map((emp)=>(
                            <option value={emp.id}>{emp.fullName}</option>
                          ))
                        }
                      </select>
                    </Col>
                    {" "} {" "}
                    <Col sm={3}>
                    <th>
                      <Button
                        class="btn btn-primary pull-right"
                        id="radioA"
                        name="Button"
                        color="success"
                        onClick={showLeaveList}
                      >
                        Filter..
                      </Button>
                    </th>
                    </Col>
                </Row>
              </Card>
            </CardBody>
            </Card>
            <Card>
            <CardBody>
              <CardHeader></CardHeader>
              {showTable == false ? (
                <div></div>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Leave Type</th>
                     
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveTypeCols &&
                      leaveTypeCols.map((ele) => {
                        <tr>
                        
                          <td>{ele.leaveType}</td>
                          <td>
                            <FaEdit />
                          </td>
                        </tr>;
                      })}

                    <tr>
                      <td>Casual Leave</td>
                      <td className="flex justify-between">
                        <Button>
                        <Button class="btn btn-primary pull-right" id='radioA' name='Button' color='success'  onClick={ToggleEvent}>Allocate Casual Leave</Button>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Sick Leave</td>
                      <td className="flex justify-between">
                        <Button>
                        <Button class="btn btn-primary pull-right" id='radioA' name='Button' color='success'  onClick={ToggleEvent}>Allocate Casual Leave</Button>
                        </Button>
                      </td>
                    </tr>
                    
                  </tbody>
                </Table>
              )}
            </CardBody>
            </Card>
        
          <CardFooter>Footer</CardFooter>

      </form>
    </div>
  );
};

export default LeaveAllocation;

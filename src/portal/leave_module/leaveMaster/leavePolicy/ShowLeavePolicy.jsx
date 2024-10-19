import React, {useEffect, useState} from 'react'
import { FaCut, FaEdit, FaPlus, FaRemoveFormat,FaPencilAlt, FaSearch } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Card,CardHeader,CardBody,CardTitle,Button,CardFooter,Row,Col, FormGroup, ButtonGroup,Dropdown,DropdownToggle,DropdownMenu,DropdownItem,Table } from "reactstrap";
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBack } from "@mui/icons-material";
import {showStaffType} from '../../../establishment_module/establishment_redux/slices/establishment_slice/staffTypeSlice';
import { showEmployeeType } from '../../../establishment_module/establishment_redux/slices/establishment_slice/employeeTypeSlice';

const ShowLeavePolicy = ({direction, ...args}) => {
    const navigatepage =useNavigate();
    const dispatch = useDispatch();
    const {staffTypes} = useSelector((state)=> state.allstorereducer.stafft);
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=> setDropdownOpen((prevState)=>!prevState);

    useEffect(()=>{
      dispatch(showStaffType());
      
    }, []);
    
    const {employeeTypes} = useSelector((state)=> state.allstorereducer.empt);
    const {leaveTypes} = useSelector((state)=> state.allstorereducer.lvType);
    
    const [dropdownOpen1,setDropdownOpen1]=useState(false);
    

    useEffect(()=>{
      dispatch(showEmployeeType());
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      
    }, []);
    
    const [addleave, setLeave]=useState({
      leaveTypeCode:'',
      leaveTypeName:'',
      leaveDescription:'',
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
      navigatepage("/leaveMaster/leavePolicy/AddLeavePolicy");
    };
    const showEditPolicy=(event)=>{
      alert('event=');
      navigatepage("/leaveMaster/leavePolicy/AddLeavePolicy");
    };
    const staffGrade=[
      {"value":616263,"label":"--Select--"},
      {"value":495051,"label":"NA"}
    ]
    const [grade,setStaffGrade]=useState();
    function selectedEType(data){
      setStaffGrade(data);
    }
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
             <Card style={{width:'80rem'}} className='form-shadow'>
             <CardHeader>
             <i><label>Leave Setup/ Leave Policies</label></i></CardHeader>
             <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack></ArrowBack> </Button>{" "}
            
              <Button id='radioA' name='Button' color="danger" onClick={createPolicy}><FaPlus/>Create New Policy</Button>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th>Staff Type</th>
                      <th>
                      {/*   
                      <Select options={staffTypeList} id="staffType.id" name="staffType.id" value={staffType}
                        onChange={(e)=>{selectedLType(e)}}
                      />
                      */}
                      <select id='staffType.id' name='staffType.id' value={staffType && staffType.id} className='form-select'>
                      <option value={null}>-- select --</option>
                        {
                          staffTypes.map((staff)=>(
                            <option value={staff.id}>{staff.name}</option>
                          ))
                        }
                      </select>
                      </th>
                      <th>Employee Type</th>
                      <th>
                         {/*
                      <Select class= "form-control" options={EmployeeTypeList} id='employeeType.id' name='employeeType.id' value={employeeType}
                        onChange={(e)=>{selectedRType(e)}}
                      />
                      */}
                       <select id='employeeType.id' name='employeeType.id' value={employeeType && employeeType.id} className='form-select'>
                        <option value={null}>-- select --</option>
                        {
                          employeeTypes.map((emp)=>(
                            <option value={emp.id}>{emp.name}</option>
                          ))
                        }
                       </select>
                      </th>
                    </tr>
                    <tr>
                    <th>Staff Grade</th>
                    <th>
                    <Select class = "form-control" options={staffGrade} id="staffGrade.id" name="staffGrade.id" value={grade}
                        onChange={(e)=>{selectedEType(e)}}
                      />
                    </th>
                    <th>Leave Type</th>
                    <th>
                    <select id='leaveTypes.id' name='leaveTypes.id' value={leaveTypes && leaveTypes.id} className='form-select'>
                        <option value={null}>-- select --</option>
                        {
                          leaveTypes.map((lvT)=>(
                            <option value={lvT.id}>{lvT.name}</option>
                          ))
                        }
                       </select>
                      </th>
                    <th>
                    <Button class="btn btn-primary pull-right" id='radioA' name='Button' color='success'  onClick={showPolicyList}>GO..</Button> 
                    </th>
                    </tr>              
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
                        <th>S.No</th> 
                        <th>Start Date</th> 
                        <th>End Date</th>
                        <th>Leave Type</th> 
                        <th>Staff Type</th>
                        <th>Employee Type</th>
                        <th>Staff Grade</th>
                        <th>Actions</th>
                        </tr> 
                       </thead> 
                <tbody> 
                    <tr> 
                        <td>1</td> 
                        <td>01/01/2023</td> 
                        <td>31/12/2023</td> 
                        <td>Casual Leave</td>
                        <td>Deputation</td> 
                        <td>Deputation</td> 
                        <td>NA</td> 
                        <td> 
                          <Button onClick={createPolicy} ><FaPencilAlt/></Button>&nbsp;<Button><FaSearch/></Button>&nbsp;<Button><FaCut/></Button></td>
                     </tr> 
                     <tr> 
                        <td>2</td> 
                        <td>01/01/2023</td> 
                        <td>31/12/2023</td> 
                        <td>Casual Leave</td>
                        <td>Deputation</td> 
                        <td>Deputation</td> 
                        <td>NA</td>
                        <td><Button onClick={createPolicy} ><FaPencilAlt/></Button>&nbsp;<Button><FaSearch/></Button>&nbsp;<Button><FaCut/></Button></td>
                     </tr> 
                     <tr> 
                        <td>3</td> 
                        <td>01/01/2023</td> 
                        <td>31/12/2023</td> 
                        <td>Casual Leave</td>
                        <td>Deputation</td> 
                        <td>Deputation</td> 
                        <td>NA</td>
                        <td><Button onClick={createPolicy} ><FaPencilAlt/></Button>&nbsp;<Button><FaSearch/></Button>&nbsp;<Button><FaCut/></Button></td>
                    </tr> 
                    </tbody>          
                    </Table>
                          }
                  </CardBody>
                  </CardBody>
             </Card>
             <Card className='form-shadow'>
                    <CardFooter>
                    Footer
                    </CardFooter>
             </Card>
          </form>
      </div>
    );
   }
  ShowLeavePolicy.propTypes={
    direction:PropTypes.string,
  };
  export default ShowLeavePolicy;
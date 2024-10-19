import React, {useEffect, useState} from 'react'
import { FaCut, FaEdit, FaPlus, FaRemoveFormat, FaSearch } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Card,CardHeader,CardBody,CardTitle,Button,CardFooter,Row,Col, FormGroup, ButtonGroup,Dropdown,DropdownToggle,DropdownMenu,DropdownItem,Table } from "reactstrap";
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { showStaffType } from '../../establishment_module/establishment_redux/slices/establishment_slice/staffTypeSlice';
import { showEmployeeType } from '../../establishment_module/establishment_redux/slices/establishment_slice/employeeTypeSlice';

const LeaveChart = ({direction, ...args}) => {
    const navigatepage =useNavigate();
    const dispatch = useDispatch();
    const {staffTypes} = useSelector((state)=> state.allstorereducer.stafft);
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=> setDropdownOpen((prevState)=>!prevState);

    useEffect(()=>{
        dispatch(showStaffType());
        dispatch(showEmployeeType());
        window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      }, []);

    const {employeeTypes} = useSelector((state)=> state.allstorereducer.empt);
    const [dropdownOpen1,setDropdownOpen1]=useState(false);    
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
             <Card style={{width:'100rem'}}>
             <CardHeader>
        <i><label>Leave Reports / leave Status Chart </label></i>                                  
      </CardHeader>
             <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack/> </Button>
              <Button id='radioA' name='Button' onClick={0}>Download PDF</Button>
              <Button id='radioA' name='Button' onClick={1}>Download Excel </Button>
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
                    <th>Period From</th>
                    <th>
                    <input type="date" /></th>
                    <th>Period To</th>
                    <th>
                    <input type="date" /></th>
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
                        <th>Employee</th> 
                        <th>Casual Leave</th> 
                        <th>Casual Leave Female</th>
                        <th>Casual Leave Male</th> 
                        <th>Child care Leave</th>
                        <th>Earned Leave</th>
                        <th>Leave Without Pay</th>
                        <th>Maternity Leave</th>
                        <th>Medical Leave</th>
                        <th>Optional Leave</th>
                        <th>Paternity Leave</th>
                        <th>Restricted Holiday</th>
                        <th>Sick Leave</th>
                        <th>Special Leave</th>
                        <th>Station Leave</th>
                        </tr> 
                       </thead>
                    
                    <tr> 
                        <td>&nbsp;</td>
                        <td>
                            <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td><td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        <td>
                        <Table style={{fontSize:'small'}}>
                                <tbody>
                                <tr>
                                    <td>
                                       OP 
                                    </td>
                                    <td>
                                       AV
                                    </td>
                                    <td>
                                       CL
                                    </td>   
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                        </tr>
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
   LeaveChart.propTypes={
    direction:PropTypes.string,
  };
  export default LeaveChart;
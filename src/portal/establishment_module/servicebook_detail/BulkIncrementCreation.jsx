import { ArrowBack, Delete, Edit, Search } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployeesCols, showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { Button, Card, CardBody, CardFooter,Col, Row, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { showDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showStaffType } from '../establishment_redux/slices/establishment_slice/staffTypeSlice';
import { showOrganization } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import photo from '../../document_upload/background_photo/backg3.jpg';

const BulkIncrementCreation = () => {
    const dispatch = useDispatch();
    const [employeeName, setEmployeeName] = useState([]);
    const [employee,setEmployee]=useState();
    const [filteredList,setFilteredList] = useState([]);
    const {allEmployees,employeeSelection} = useSelector((state)=>state.allstorereducer.employeeData);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const [modal, setModal] = useState(false);
    const toggle = () =>{
      setModal(!modal);
      setEmployee(null)
    }
    
    const goback=()=>{
        window.history.back();
    }
    useEffect(()=>{
      dispatch(showEmployeePopup());
      dispatch(fetchAllEmployeesCols());
      dispatch(showDepartment());
      dispatch(showDesignation());
      dispatch(showStaffType());
      dispatch(showOrganization());
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);
    
    function handleEmpSelect(data,field) {
      setEmployee({...employee,[field]:data.value});         
      console.log(employee)
      setEmployeeName(data);
      const temp=allEmployees.filter((obj)=>obj.id===data.value);
      setEmployee(temp[0]);
  }

  return (
    <div>
      <form>
        <Card style={{minWidth:'70rem'}}>
            <CardHeader  className='p-1'>
                <label>Establishment / Bulk Increment</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button>
            </CardHeader>
            <CardBody className='form-shadow'>
                <Row>
                  <Col sm='4'>
                    Organization Name:
                    <select id='insituition.id' placeholder="- Search option -" 
                        onChange={(e)=>handleEmpSelect(e,'insituition.id')} className='form-select'>
                      <option value={null}>-- select --</option>
                      {
                        institutions.map((inst)=>(
                          <option value={inst.id}>{inst.code}</option>
                        ))
                      }                      
                    </select>                     
                  </Col>
                  <Col sm='4'>
                    Department Name:
                    <select id='department.id' placeholder="- Search option -" 
                        onChange={(e)=>handleEmpSelect(e,'department.id')} className='form-select'>
                      <option value={null}>-- select --</option>
                      {
                        departments.map((inst)=>(
                          <option value={inst.id}>{inst.name}</option>
                        ))
                      }                      
                    </select>                     
                  </Col>
                  <Col sm='4'>
                    Designation Name:
                    <select id='designation.id' placeholder="- Search option -" 
                        onChange={(e)=>handleEmpSelect(e,'designation.id')} className='form-select'>
                      <option value={null}>-- select --</option>
                      {
                        designations.map((inst)=>(
                          <option value={inst.id}>{inst.name}</option>
                        ))
                      }                      
                    </select>                     
                  </Col>                  
              </Row>
              <Row>
                <Col sm='4'>
                  Staff Type:
                  <select id='staffType.id' placeholder="- Search option -" 
                      onChange={(e)=>handleEmpSelect(e,'staffType.id')} className='form-select'>
                    <option value={null}>-- select --</option>
                    {
                      staffTypes.map((inst)=>(
                        <option value={inst.id}>{inst.name}</option>
                      ))
                    }                      
                  </select>                     
                </Col>  
                <Col sm='4'>
                    Status
                    <select id='staffType.id' name='staffType.id' className='form-select'>
                        <option value={null}>-- select --</option>
                        <option value="Requested">Requested</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Wrong Entry">Wrong Entry</option>
                      </select>
                </Col>
                <Col sm='4'>
                  Next Increment Date
                  <input type='date' id='nextIncrementDate' name='nextIncrementDate' className='form-control'/>
                </Col>
              </Row>
              <Row>
                <Col sm='6'>
                  Employee Increment Percentage
                  <input type='date' id='empIncrementPer' name='empIncrementPer' className='form-control'/>
                </Col>
                <Col sm='6'>
                  <Button color="danger" onClick={toggle}>
                    Filter
                  </Button>
                </Col>
              </Row>
              
            </CardBody>
            <CardBody className='form-shadow'>
              {
                filteredList && filteredList.length>0?
                <Table striped>
                  <thead>
                    <tr>
                      <th scope='row'>
                        Employee Code
                      </th>
                      <th scope='row'>
                        Employee Name
                      </th>
                      <th scope='row'>
                        Department
                      </th>
                      <th scope='row'>
                        Designation
                      </th>
                      <th scope='row'>
                        Effective Date
                      </th>
                      <th scope='row'>
                        Current Service Status
                      </th>
                      <th scope='row'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filteredList.map((emp)=>(
                        <tr key={emp.id}>
                          <td>{emp && emp.code}</td>
                          <td>{emp && emp.fullName}</td>
                          <td>{emp && emp.department && emp['department.name']}</td>
                          <td>{emp && emp.designation && emp['designation.name']}</td>
                          <td>{emp && emp.doj}</td>
                          <td>{emp && emp.status}</td>
                          <td><Edit/><Search/><Delete/></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
                :
                <p>No Data Available</p>
              }
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default BulkIncrementCreation;

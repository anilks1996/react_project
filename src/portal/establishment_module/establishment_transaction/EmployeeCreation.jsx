import React, { useEffect, useState } from 'react'
import { BiTable } from 'react-icons/bi';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { findAllInstitutions, showOrganization } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import { showDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { showStaffType } from '../establishment_redux/slices/establishment_slice/staffTypeSlice';
import { createEmployeeTab, employeeById, showEmployeeById } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import {showPastOrgDepartment} from '../establishment_redux/slices/establishment_slice/pastOrgDepartmentSlice';
import { showSubEmployeeType } from '../establishment_redux/slices/establishment_slice/subEmployeeTypeSlice';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';

const EmployeeCreation = () => {
    const navigatePage=useNavigate();
    const [employee,setEmployee] = useState();
    const dispatch = useDispatch();
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {jobLocationByEmpId} = useSelector((state)=>state.allstorereducer.jobLoc);
    const {pastOrgDepartments} = useSelector((state)=>state.allstorereducer.pastOrgDept);
    const {subEmployeeTypes} = useSelector((state)=>state.allstorereducer.subEmpT);
    const {employeeById} = useSelector((state)=>state.allstorereducer.employeeData);
    const [isAction,setIsAction] = useState(false);

    useEffect(()=>{
        dispatch(findAllInstitutions());
        dispatch(showDepartment());
        dispatch(showDesignation());
        dispatch(showEmployeeType());
        dispatch(showStaffType());
        dispatch(showPastOrgDepartment());
        dispatch(showSubEmployeeType());
        dispatch(showEmployeeById(null));
        //dispatch(showJobLocationByEmployeeId(id));
        setIsAction(false);
        window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      if(e.target.name==="joiningInstitutionDto.id"){
        setEmployee({...employee, ['joiningInstitutionDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="departmentDto.id"){
        setEmployee({...employee, ['departmentDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="designationDto.id"){
        setEmployee({...employee, ['designationDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="employeeTypeDto.id"){
        setEmployee({...employee, ['employeeTypeDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="joinDesignationDto.id"){
        setEmployee({...employee, ['joinDesignationDto']:{'id':e.target.value,'code':''}})
      }else if(e.target.name==="staffTypeDto.id"){
        setEmployee({...employee, ['staffTypeDto']:{'id':e.target.value,'code':''}})
      }else if(e.target.name==="staffGradeDto.id"){
        setEmployee({...employee, ['staffGradeDto']:{'id':e.target.value,'code':''}})
      }else if(e.target.name==="subEmployeeTypeDto.id"){
        setEmployee({...employee, ['subEmployeeTypeDto']:{'id':e.target.value,'code':''}})
      }else if(e.target.name==="pastOrgDepartmentDto.id"){
        setEmployee({...employee, ['pastOrgDepartmentDto']:{'id':e.target.value,'code':''}})
      }else{
        setEmployee({...employee,[e.target.name]:e.target.value}); 
      }
      console.log(employee);              
    }
    const createEmployee =(e)=>{
        e.preventDefault();
        const empObj = {...employee,["staffGradeDto"]:{"id":1,"code":"sbi"}};
        dispatch(createEmployeeTab(empObj));
        setIsAction(true);
        if(employeeById && employeeById.code){
          toast.success("Employee created successfully.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000,
          });
        }       
        //navigatePage("/establishmentTransactions/editGeneralEmployee");
    }
    const msgAlert=()=>{
        navigatePage("/establishmentTransactions/employeeRegister");
    }

  return (
    <div>
        <form style={{height:'45rem'}}>
            <Row className="mt-1">
            <Col sm="12">
            <Card className='form-shadow'>
                <CardHeader>
                    <Button onClick={(e)=>{window.history.back();}} className="p-0"><ArrowBack style={{color:'red'}}/> </Button> <BiTable />Employee Creation Details
                </CardHeader>
                {
                  employeeById && employeeById.code!=null && isAction?
                  <CardHeader>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">
                      <AlertTitle>Employee record created successfully.</AlertTitle>
                      Employee ID : <b style={{color:'blue'}}> {employeeById && employeeById.code}</b> with Name: <b style={{color:'blue'}}>&nbsp;{employeeById && employeeById.fullName}</b>                    
                    </Alert>
                    {/*
                    <Alert severity="info">This is an info Alert.</Alert>
                    <Alert severity="warning">This is a warning Alert.</Alert>
                    <Alert severity="error">This is an error Alert.</Alert>
                  */}
                  </Stack>
                </CardHeader>
                : 
                isAction?
                <CardHeader>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">
                        <AlertTitle>Employee record could not created successfully.</AlertTitle>
                        </Alert>
                        {/*
                        <Alert severity="info">This is an info Alert.</Alert>
                        <Alert severity="warning">This is a warning Alert.</Alert>
                        <Alert severity="error">This is an error Alert.</Alert>
                    */}
                    </Stack>
                </CardHeader>
                :
                <div></div>
                }                
                <CardBody>
                    {/*  hg */}
                    <Table>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                        <td scope="row">
                        <label>Salutation</label>                           
                            <select id='salutation' name='salutation' className='form-select' value={employee && employee.salutation} onChange={(e)=>{handleChange(e)}}>
                                <option value="-1">-- select --</option>
                                <option value="Prof.">Prof.</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Dr.">Dr.</option>
                                <option value="Ms.">Ms.</option>
                                <option value="Cdr.">Cdr.</option>
                                <option value="Sh.">Sh.</option>
                                <option value="Col.">Col.</option>
                                <option value="Major.">Major.</option>
                                <option value="Capt.">Capt.</option>
                            </select>
                        </td>
                        <td scope="row">
                            <label>First Name</label>
                            <input type='text' id='firstName' name='firstName' className='form-control' value={employee && employee.firstName} onChange={(e)=>{handleChange(e)}}/>
                        </td>
                        <td scope="row">
                            <label>Middle Name</label>
                            <input type='text' id='middleName' name='middleName' className='form-control' value={employee && employee.middleName} onChange={(e)=>{handleChange(e)}}/>
                        </td>
                        <td scope="row">
                            <label>Last Name</label>
                            <input type='text' id='surName' name='surName' className='form-control' value={employee && employee.surName} onChange={(e)=>{handleChange(e)}}/>
                        </td>
                        </tr>
                    </tbody>                   
                    <thead>               
                    </thead>
                    <tbody>
                        <tr>
                        <td scope="row">
                            <label>Gender</label>
                            <select id='sex' name='sex' className='form-select' value={employee && employee.sex} onChange={(e)=>{handleChange(e)}}>
                                <option value="-1">-- select --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </td>
                        <td scope="row">
                            <label>Aadhar Number</label>
                            <input type='text' id='uniqueIdNo' name='uniqueIdNo' className='form-control' value={employee && employee.uniqueIdNo} onChange={(e)=>{handleChange(e)}}/>
                        </td>
                        <td scope="row">
                            <label>Id Card No</label>  
                            <input type='text' id='idCode' name='idCode' className='form-control' value={employee && employee.idCode} onChange={(e)=>{handleChange(e)}}/>
                        </td>
                        <td scope="row">
                            <label>Official Email</label>
                            <input type='text' id='officialMail' name='officialMail' className='form-control' value={employee && employee.officialMail} onChange={(e)=>{handleChange(e)}}/>
                        </td>
                        </tr>
                    </tbody>                    
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                        <td scope="row">
                            <label>Company</label>
                            <select type='text' id='joiningInstitutionDto.id' name='joiningInstitutionDto.id' value={employee && employee.departmentDto && employee.departmentDto.institutionDto && employee.departmentDto.institutionDto.id} className='form-select' onChange={(e)=>{handleChange(e)}}>
                            <option value="-1">-- select --</option>
                            {
                                institutions.map((org)=>(
                                    <option value={org.id}>{org.code}</option>
                                ))
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Department</label>
                            <select id='departmentDto.id' name='departmentDto.id' className='form-select' value={employee && employee.departmentDto && employee.departmentDto.id} onChange={(e)=>{handleChange(e)}}>
                            <option value="-1">-- select --</option>
                            {                               
                                departments.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                ))                               
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Designation</label>
                            <select id='designationDto.id' name='designationDto.id' className='form-select' value={employee && employee.designationDto && employee.designationDto.id} onChange={(e)=>{handleChange(e)}}>
                            <option value="-1">-- select --</option>
                            {
                                designations.map((dsg)=>(
                                  <option value={dsg.id}>{dsg.name}</option>
                                ))
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Additional Responsibility</label>
                            <select id='joinDesignationDto.id' name='joinDesignationDto.id' className='form-select' value={employee && employee.joiningDesignationDto && employee.joiningDesignationDto.id} onChange={(e)=>{handleChange(e)}}>
                            <option value="-1">-- select --</option>
                            {                               
                                designations.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                ))                               
                            }
                            </select>
                        </td>
                        </tr>
                    </tbody>                    
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                        <td scope="row">
                            <label>Employee Type</label>
                            <select id='employeeTypeDto.id' name='employeeTypeDto.id' className='form-select' value={employee && employee.employeeTypeDto && employee.employeeTypeDto.id} onChange={(e)=>{handleChange(e)}}>
                            <option value="-1">-- select --</option>
                            {                                
                                employeeTypes.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                ))                                
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Staff Type</label>
                            <select id='staffTypeDto.id' name='staffTypeDto.id' className='form-select' value={employee && employee.staffTypeDto && employee.staffTypeDto.id} onChange={(e)=>{handleChange(e)}}>
                            <option value="-1">-- select --</option>
                            {                               
                                staffTypes.map((stf)=>(
                                    <option value={stf.id}>{stf.name}</option>
                                ))                                
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Staff Grade</label>
                            <select id='staffGradeDto.id' name='staffGradeDto.id' className='form-select' value={employee && employee.staffGradeDto && employee.staffGradeDto.id} onChange={(e)=>{handleChange(e)}}>
                                <option value={1}>NA</option>
                            </select>
                        </td>
                        <td scope="row">
                            <label>Office Phone No</label>
                            <input type='text' id='officeMobile' name='officeMobile' value={employee && employee.officeMobile} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                        </td>
                        </tr>
                    </tbody>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                        <td scope="row">
                            <label>Sub Employee Type</label>
                            <select id='subEmployeeTypeDto.id' name='subEmployeeTypeDto.id' className='form-select' value={employee && employee.subEmployeeTypeDto && employee.subEmployeeTypeDto.id} onChange={(e)=>{handleChange(e)}}>
                            <option value="-1">-- select --</option>
                            {                               
                                subEmployeeTypes.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                ))                                
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Past Organization Department</label>
                            <select id='pastOrgDepartmentDto.id' name='pastOrgDepartmentDto.id' className='form-select' value={employee && employee.pastOrgDepartmentDto && employee.pastOrgDepartmentDto.id} onChange={(e)=>{handleChange(e)}}>
                            <option value="-1">-- select --</option>
                            {                               
                                pastOrgDepartments.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                ))                               
                            }
                            </select>
                        </td>
                        <td>
                            <label>Job Located From Date</label>
                            <input type='date' formTarget='YYYY-MM-DD' id='jobLocationFromDate' name='jobLocationFromDate' value={jobLocationByEmpId && jobLocationByEmpId.fromDate} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                        </td>
                        <td>
                            <label>Job Location</label>
                            <input type='text' id='locationInCity.id' name='locationInCity.id' value={jobLocationByEmpId && jobLocationByEmpId.locationInCityDto && jobLocationByEmpId.locationInCityDto.name} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                        </td>
                        </tr>
                    </tbody>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            </td>
                            <td>  
                            </td>
                            <td scope="row">                   
                            </td>
                            <td scope="row">
                                <Button color='warning' onClick={msgAlert}>Cancel</Button>{" "}
                                <Button color='success' onClick={createEmployee}>Save</Button>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
            </CardBody>                
            </Card>
            </Col>
        </Row>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default EmployeeCreation;

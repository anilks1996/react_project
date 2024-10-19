import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { BiTable } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { findAllInstitutions } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import { showDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { showStaffType } from '../establishment_redux/slices/establishment_slice/staffTypeSlice';
import { editEmployee, showEmployeeById } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { showJobLocationByEmployeeId } from '../establishment_redux/slices/establishment_slice/jobLocationSlice';
import { showPastOrgDepartment } from '../establishment_redux/slices/establishment_slice/pastOrgDepartmentSlice';
import { showSubEmployeeType } from '../establishment_redux/slices/establishment_slice/subEmployeeTypeSlice';


const EditGeneralEmployeeTab = () => {
    const navigatePage=useNavigate();
    const {id} = useParams();
    const [employee,setEmployee] = useState();
    const dispatch = useDispatch();
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {employeeById, generalLoading} = useSelector((state)=>state.allstorereducer.employeeData);
    const {jobLocationByEmpId} = useSelector((state)=>state.allstorereducer.jobLoc);
    const {pastOrgDepartments} = useSelector((state)=>state.allstorereducer.pastOrgDept);
    const {subEmployeeTypes} = useSelector((state)=>state.allstorereducer.subEmpT);
    const [joiningInstitution,setJoiningInstitution] = useState();
    const [department,setDepartment] = useState();
    const [designation,setDesignation] = useState();
    const [joiningDesignation,setJoiningDesignation] = useState();
    const [employeeType,setEmployeeType] = useState();
    const [staffType,setStaffType] = useState();
    const [staffGrade,setStaffGrade] = useState();
    const [subEmployeeType,setSubEmployeeType] = useState();
    const [pastOrgDepartment,setPastOrgDepartment] = useState();
    const [jobLocatedDate,setJobLocatedDate] = useState();
    const [isAction,setIsAction] = useState(false);

    useEffect(()=>{
        dispatch(findAllInstitutions());
        dispatch(showDepartment());
        dispatch(showDesignation());
        dispatch(showEmployeeType());
        dispatch(showStaffType());
        dispatch(showPastOrgDepartment());
        dispatch(showSubEmployeeType());
        dispatch(showEmployeeById(id));
        dispatch(showJobLocationByEmployeeId(id));
        setEmployee(employeeById);
        //alert(""+employee.officeMobile)
        window.scrollTo({top:'0', left:'0', behavior:'smooth'});
        setJobLocatedDate(getFormattedDate(new Date(jobLocationByEmpId && jobLocationByEmpId.fromDate)))
        //alert(employeeById && employeeById.joiningInstitutionDto)
        if(employeeById && employeeById.joiningInstitutionDto && employeeById.joiningInstitutionDto.id){
            setJoiningInstitution(employeeById.joiningInstitutionDto.id);
        }if(employeeById && employeeById.joiningDesignationDto && employeeById.joiningDesignationDto.id){
            setDepartment(employeeById.joiningDesignationDto.id);
        }if(employeeById && employeeById.departmentDto && employeeById.departmentDto.id){
            setDepartment(employeeById.departmentDto.id);
        }if(employeeById && employeeById.designationDto && employeeById.designationDto.id){
            setDesignation(employeeById.designationDto.id);
        }if(employeeById && employeeById.employeeTypeDto && employeeById.employeeTypeDto.id){
            setEmployeeType(employeeById.employeeTypeDto.id);
        }if(employeeById && employeeById.staffTypeDto && employeeById.staffTypeDto.id){
            setStaffType(employeeById.staffTypeDto.id);
        }if(employeeById && employeeById.staffGradeDto && employeeById.staffGradeDto.id){
            setStaffGrade(employeeById.staffGradeDto.id);
        }if(employeeById && employeeById.subEmployeeTypeDto && employeeById.subEmployeeTypeDto.id){
            setSubEmployeeType(employeeById.subEmployeeTypeDto.id);
        }if(employeeById && employeeById.pastOrgDepartmentDto && employeeById.pastOrgDepartmentDto.id){
            setPastOrgDepartment(employeeById.pastOrgDepartmentDto.id);
        }
    }, []);
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
        return `${year}-${month}-${day}`;
    }
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
            if(e.target.name==="joiningInstitutionDto.id"){
                setJoiningInstitution(e.target.value);
                setEmployee({...employee,['joiningInstitutionDto']:{'id':e.target.value,'code':'code'}});
            }else if(e.target.name==="joiningDesignationDto.id"){
                setJoiningDesignation(e.target.value);
                setEmployee({...employee,['joiningDesignationDto']:{'id':e.target.value,'code':'code'}});
            }else if(e.target.name==="departmentDto.id"){
                setDepartment(e.target.value);
                alert('name='+e.target.name+',  value='+e.target.value)
                setEmployee({...employee,['departmentDto']:{'id':e.target.value,'code':'SBI'}});
            }else if(e.target.name==="designationDto.id"){
                setDesignation(e.target.value);
                setEmployee({...employee,['designationDto']:{'id':e.target.value,'code':'code'}});
            }else if(e.target.name==="employeeTypeDto.id"){
                setEmployeeType(e.target.value);
                setEmployee({...employee,['employeeTypeDto']:{'id':e.target.value,'code':'code'}});
            }else if(e.target.name==="staffTypeDto.id"){
                setStaffType(e.target.value);
                setEmployee({...employee,['staffTypeDto']:{'id':e.target.value,'code':'code'}});
            }else if(e.target.name==="staffGradeDto.id"){
                setStaffGrade(e.target.value);
                setEmployee({...employee,['staffGradeDto']:{'id':e.target.value,'code':'code'}});
            }else if(e.target.name==="subEmployeeTypeDto.id"){
                setSubEmployeeType(e.target.value);
                setEmployee({...employee,['subEmployeeTypeDto']:{'id':e.target.value,'code':'code'}});
            }else if(e.target.name==="pastOrgDepartmentDto.id"){
                setPastOrgDepartment(e.target.value);
                setEmployee({...employee,['pastOrgDepartmentDto']:{'id':e.target.value,'code':'SBI'}});
            }
            else{
                setEmployee({...employee,[e.target.name]:e.target.value});
            }           
            console.log(employee);            
        
    }
    const updateEmployee =(e)=>{
        e.preventDefault();
        if(id!=null && employee!=null){
            setIsAction(true);
            const employeeObj={...employee,["id"]:id};
            dispatch(editEmployee(employeeObj));
            toast.success("Employee updated successfully.", {
                // Set to 2 sec
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        navigatePage(`/establishmentTransactions/editGeneralEmployeeTab/${id}`);
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
                    <BiTable />General Details
                </CardHeader>
                {
                    isAction && generalLoading?
                    <CardBody>
                        <Table>
                            <tr></tr>
                            <tr></tr>
                            <tr>Updating ...<Spinner style={{color:'green'}}/> </tr>
                        </Table>
                    </CardBody>
                    :
                
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
                            <select type='text' id='joiningInstitutionDto.id' name='joiningInstitutionDto.id' value={joiningInstitution} className='form-select' onChange={(e)=>{handleChange(e)}}>
                            <option value={-1}>-- select --</option>
                            {
                                institutions.map((org)=>(
                                    <option value={org.id}>{org && org.code}</option>
                                ))
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Department</label>
                            <select id='departmentDto.id' name='departmentDto.id' className='form-select' value={department} onChange={(e)=>{handleChange(e)}}>
                            <option value={-1}>-- select --</option>
                            {                               
                                departments.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                ))                               
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Designation</label>
                            <select id='designationDto.id' name='designationDto.id' className='form-select' value={designation} onChange={(e)=>{handleChange(e)}}>
                            <option value={-1}>-- select --</option>
                            {
                                designations.map((dsg)=>(
                                  <option value={dsg.id}>{dsg.name}</option>
                                ))
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Additional Responsibility</label>
                            <select id='joiningDesignationDto.id' name='joiningDesignationDto.id' className='form-select' value={joiningDesignation} onChange={(e)=>{handleChange(e)}}>
                            <option value={-1}>-- select --</option>
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
                            <select id='employeeTypeDto.id' name='employeeTypeDto.id' className='form-select' value={employeeType} onChange={(e)=>{handleChange(e)}}>
                            <option value={-1}>-- select --</option>
                            {                                
                                employeeTypes.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                ))                               
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Staff Type</label>
                            <select id='staffTypeDto.id' name='staffTypeDto.id' className='form-select' value={staffType} onChange={(e)=>{handleChange(e)}}>
                            <option value={-1}>-- select --</option>
                            {                                
                                staffTypes.map((stf)=>(
                                    <option value={stf.id}>{stf.name}</option>
                                ))                               
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Staff Grade</label>
                            <select id='staffGradeDto.id' name='staffGradeDto.id' className='form-select' value={staffGrade} onChange={(e)=>{handleChange(e)}}>
                                <option value={-1}>-- select --</option>
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
                            <select id='subEmployeeTypeDto.id' name='subEmployeeTypeDto.id' className='form-select' value={subEmployeeType} onChange={(e)=>{handleChange(e)}}>
                            <option value={-1}>-- select --</option>
                            {                               
                                subEmployeeTypes.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                ))                              
                            }
                            </select>
                        </td>
                        <td scope="row">
                            <label>Past Organization Department</label>
                            <select id='pastOrgDepartmentDto.id' name='pastOrgDepartmentDto.id' className='form-select' value={pastOrgDepartment} onChange={(e)=>{handleChange(e)}}>
                            <option value={-1}>-- select --</option>
                            {                              
                                pastOrgDepartments.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                ))                              
                            }
                            </select>
                        </td>
                        <td>
                            <label>Job Located From Date</label>
                            <input type='date' id='jobLocationFromDate' name='jobLocationFromDate' value={jobLocatedDate} className='form-control' onChange={(e)=>{handleChange(e)}}/>
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
                            <label>HKRNL Serial No</label>
                                <input type='text' id='hkrnlSlNo' name='hkrnlSlNo' value={employee && employee.hkrnlSlNo} className='form-control' onChange={(e)=>{handleChange(e)}}/>                   
                            </td>
                            <td>  
                            <label>HKRNL Employee ID</label>
                                <input type='text' id='hkrnlEmployeeId' name='hkrnlEmployeeId' value={employee && employee.hkrnlEmployeeId} className='form-control' onChange={(e)=>{handleChange(e)}}/>             
                            </td>
                            <td scope="row">                   
                            </td>
                            <td scope="row">
                                <Button color='warning' onClick={msgAlert}>Cancel</Button>{" "}
                                <Button color='success' onClick={updateEmployee}>Update</Button>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
                </CardBody>
                }
            </Card>
            </Col>
        </Row>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default EditGeneralEmployeeTab;

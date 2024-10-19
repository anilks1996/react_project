import React, { useEffect, useState } from 'react'
import { BiTable } from 'react-icons/bi';
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editPersonalEmployeeTab, showPersonalEmployeeById } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { Person } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';

const EditPersonalTab = () => {
    const {id}=useParams();
    const navigatePage=useNavigate();
    const {personalEmployee,personalLoading} = useSelector((state)=>state.allstorereducer.employeeData);
    const dispatch=useDispatch();
    const [dateofBirth,setDateofBirth]=useState();
    const [dlExpDate,setDlExpDate]=useState();
    const [personalEmployeeObj,setPersonalEmployeeObj] = useState();
    const [isAction,setIsAction] = useState(false);

    useEffect(()=>{
        dispatch(showPersonalEmployeeById(id));
        if(personalEmployee && personalEmployee.dob){
            setDateofBirth(getFormattedDate(new Date(personalEmployee.dob)));
        }if(personalEmployee && personalEmployee.dateLeft){
            setDlExpDate(getFormattedDate(new Date(personalEmployee.dateLeft)));
        }
        console.log(personalEmployee);
        setPersonalEmployeeObj(personalEmployee);
    },[]);
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
        if(e.target.name==="dob"){
            setDateofBirth(e.target.value);
            setPersonalEmployeeObj({...personalEmployeeObj,["dob"]:e.target.value});
        }else if(e.target.name==="dateLeft"){
            setDlExpDate(e.target.value);
            setPersonalEmployeeObj({...personalEmployeeObj,["dateLeft"]:e.target.value});
        }else{
            setPersonalEmployeeObj({...personalEmployeeObj,[e.target.name]:e.target.value});
        }
        //navigatePage("/serviceBookDetails/tourApplicationReport");
    }
    const handleSubmit=()=>{
        if(id!=null && personalEmployeeObj!=null){
            setIsAction(true);
            const employeeObj = {...personalEmployeeObj,["id"]:id};
            dispatch(editPersonalEmployeeTab(employeeObj));
            toast.success("Employee updated successfully.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        //navigatePage(`/establishmentTransactions/editGeneralEmployeeTab/${id}`);
        navigatePage(`/establishmentTransactions/editGeneralEmployee/${id}`);
    }
  return (
    <div>
        <form >
            <Row className="mt-1">
            <Col sm="12">
            <Card className='form-shadow'>
                {/*
                <CardHeader>
                    <Person />Personal Details
                </CardHeader>
                */}
                {
                    isAction && personalLoading?
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
                    <Table >
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            <label>Nationality</label>
                                <input type="text" id="nationality" name="nationality" className='form-control' value={personalEmployee && personalEmployee.nationality} onChange={handleChange}/>                            
                            </td>
                            <td>
                                <label>Birth Place</label>
                                <input type='text' id="birthPlace" name='birthPlace' className='form-control' value={personalEmployee && personalEmployee.birthPlace} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Date of Birth</label>
                                <input type='date' id='dob' name='dob' className='form-control' value={dateofBirth} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Marital Status</label>
                                <input type='text' id='maritalStatus' name='maritalStatus' className='form-control' value={personalEmployee && personalEmployee.maritalStatus} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Mother Tongue</label>
                                <input type='text' id='motherTongue' name='motherTongue' className='form-control' value={personalEmployee && personalEmployee.motherTongue} onChange={handleChange}/>
                            </td>
                        </tr>
                    </tbody>                   
                    <thead> <tr></tr>              
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Father's Name</label>
                                <input type='text' id='nameOfFather' name='nameOfFather' className='form-control' value={personalEmployee && personalEmployee.nameOfFather} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Mother's Name</label>
                                <input type='text' id='grandFathersName' name='grandFathersName' className='form-control' value={personalEmployee && personalEmployee.grandFathersName} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Name Of Spouse</label>  
                                <input type='text' id=' nameOfHusband' name='nameOfHusband' className='form-control' value={personalEmployee && personalEmployee.nameOfHusband} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Contact No</label>
                                <input type='text' id='phoneNo' name='phoneNo' className='form-control' value={personalEmployee && personalEmployee.phoneNo} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Driving License No</label>
                                <input type='text' id='drivingLicenseNo' name='drivingLicenseNo' className='form-control' value={personalEmployee && personalEmployee.drivingLicenseNo} onChange={handleChange}/>
                            </td>
                        </tr>
                    </tbody>                    
                    <thead><tr></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Dl Expiry Date</label>
                                <input type='date' id='dateLeft' name='dateLeft' className='form-control' onChange={handleChange} value={dlExpDate}/>
                            </td>
                            <td>
                                <label>Personal Email Id</label>
                                <input type='text' id='emailId' name='emailId' className='form-control' value={personalEmployee && personalEmployee.emailId} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Blood Group</label>
                                <input type='text' id='bloodGroup' name='bloodGroup' className='form-control' value={personalEmployee && personalEmployee.bloodGroup} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Height In Cm</label>
                                <input type='number' id='height' name='height' className='form-control' value={personalEmployee && personalEmployee.height} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Weight In Kg</label>
                                <input type='number' id='weight' name='weight' className='form-control' value={personalEmployee && personalEmployee.weight} onChange={handleChange}/>
                            </td>
                        </tr>
                    </tbody>                    
                    <thead><tr></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Medical Fitness</label>
                                <input type='text' id='needMedicalFitness' name='needMedicalFitness' className='form-control' value={personalEmployee && personalEmployee.needMedicalFitness} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Religion</label>
                                <input type='text' id="religionMasterDto.id" name="religionMasterDto.id" className='form-control' value={personalEmployee && personalEmployee.religionMasterDto && personalEmployee.religionMasterDto.id} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Category</label>
                                <input type='text' id="categoryDto.id" name="categoryDto.id" className='form-control' value={personalEmployee && personalEmployee.categoryDto && personalEmployee.categoryDto.id} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Verification Done</label>
                                <input type='text' id='needVerification' name='needVerification' className='form-control' value={personalEmployee && personalEmployee.needVerification} onChange={handleChange}/>
                            </td>
                            <td>
                                <label>Identification Mark</label>
                                <textarea type='text' cols={50} rows={2} name='identificationMark' className='form-control' onChange={handleChange} value={personalEmployee && personalEmployee.identificationMark} />
                            </td>
                        </tr>
                    </tbody>
                    
                    <tbody>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> 
                                <Button color='danger'>Cancel</Button>
                            </td>
                            <td>
                                <Button color='info' onClick={handleSubmit}>Update</Button>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
                </CardBody>
                }
            </Card>
            </Col>
        </Row>
        <ToastContainer></ToastContainer>
        </form>
    </div>
  )
}

export default EditPersonalTab;

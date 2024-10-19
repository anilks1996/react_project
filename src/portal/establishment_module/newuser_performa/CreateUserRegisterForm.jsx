import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate} from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table} from 'reactstrap';
import { showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { showBanks } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { showDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from 'react-select';
import { createUserRegister, showUserRegisterById } from '../establishment_redux/slices/user_performa/UserRegisterSlice';


const CreateUserRegisterForm = () => {
    const {id} = useParams();
    const dispatch=useDispatch();
    const [updateUserRegister,setUpdateUserRegister]=useState();
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {employeeSelection} = useSelector((state)=>state.allstorereducer.employeeData);
    const {banks} = useSelector((state)=>state.allstorereducer.org);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {userRegister} = useSelector((state)=>state.allstorereducer.userRegister);
    const [dateofBirth,setDateofBirth] = useState();
    const [joinDate,setJoinDate] = useState();
    const [contactTenureExpiryDate,setContactTenureExpiryDate] = useState();
    const [rejoiningDate,setRejoiningDate] = useState();
    const navigatePage = useNavigate();
    const [superVisorName,setSuperVisorName] = useState();
    const [bank,setBank] = useState(null);
    const [supervisorOtions,setSupervisorOptions] = useState(null);
    const [department,setDepartment] = useState(null);
    const [designation,setDesignation] = useState(null);
    const [employeeType,setEmployeeType] = useState(null);
    const [genderValue,setGenderValue] = useState(null);

    useEffect(()=>{
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});     
      dispatch(showUserRegisterById(id));
      console.log("userregister "+id);
      dispatch(showBanks());
      dispatch(showDesignation());
      dispatch(showEmployeePopup());
      dispatch(showEmployeeType());
      dispatch(showDepartment());
      setUpdateUserRegister(null);
      //setDateofBirth();
       
    //   if(userRegister && userRegister.dob){
    //     setDateofBirth(getFormattedDate(new Date(userRegister.dob)));
    //   }if(userRegister && userRegister.rejoiningDate){
    //     setRejoiningDate(getFormattedDate(new Date(userRegister.rejoiningDate)));
    //   }if(userRegister && userRegister.joinDate){
    //     setJoinDate(getFormattedDate(new Date(userRegister.joinDate)));
    //   }if(userRegister && userRegister.contactTenureExpiryDate){
    //     setContactTenureExpiryDate(getFormattedDate(new Date(userRegister.contactTenureExpiryDate)));
    //   }if(userRegister && userRegister.bankDto && userRegister.bankDto.id){
    //     setBank(userRegister.bankDto.id);
    //   }if(userRegister && userRegister.superVisorNameDto && userRegister.superVisorNameDto.id){
    //     setSuperVisorName(userRegister.superVisorNameDto.id);
    //   }if(userRegister && userRegister.departmentDto && userRegister.departmentDto.id){
    //     setDepartment(userRegister.departmentDto.id);
    //   }if(userRegister && userRegister.designationDto && userRegister.designationDto.id){
    //     setDesignation(userRegister.designationDto.id);
    //   }if(userRegister && userRegister.employeeTypeDto && userRegister.employeeTypeDto.id){
    //     setEmployeeType(userRegister.employeeTypeDto.id);
    //   }   
    }, []);
    function getFormattedDate(date) {
        //const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
        return `${year}-${month}-${day}`;
    }
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      if(e.target.name==='dob'){
        setDateofBirth(e.target.value);
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }else if(e.target.name==='contactTenureExpiryDate'){
        setContactTenureExpiryDate(e.target.value);
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }else if(e.target.name==='joinDate'){
        setJoinDate(e.target.value);
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }else if(e.target.name==='rejoiningDate'){
        setRejoiningDate(e.target.value);
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }else if(e.target.name==="bankDto.id"){
        setBank(e.target.value);
        alert(e+", e.target="+e.target+", e.target.value"+e.target.value)
        setUpdateUserRegister({...updateUserRegister, ['bankDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="superVisorNameDto.id"){
        setSuperVisorName(e.target.value);
      }else if(e.target.name==="departmentDto.id"){
        setDepartment(e.target.value);
        setUpdateUserRegister({...updateUserRegister, ['departmentDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="designationDto.id"){
        setDesignation(e.target.value);
        setUpdateUserRegister({...updateUserRegister, ['designationDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="employeeTypeDto.id"){
        setEmployeeType(e.target.value);
        setUpdateUserRegister({...updateUserRegister, ['employeeTypeDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==='gender'){
        setGenderValue(e.target.value);
      }else{
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }
        //setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
        console.log(updateUserRegister);
    }
    const handleSupervisor=(data,field)=>{
      setSupervisorOptions(data);
      setUpdateUserRegister({...updateUserRegister, ['superVisorNameDto']:data});
      console.log(updateUserRegister);
    }

    const handleSubmit=(actionN)=>{     
        alert('Hello '+updateUserRegister);
        if(employeeType!=null && department!=undefined && designation!=null && updateUserRegister!=null){
          const userObj = {...updateUserRegister,
                          ["gender"]:genderValue!=undefined? genderValue:"Male",
                          ['employeeTypeDto']:{'id':employeeType,'code':'SBI'},
                          ['departmentDto']:{'id':department,'code':'SBI'},
                          ['designationDto']:{'id':designation,'code':'SBI'}
                        };
          dispatch(createUserRegister(userObj));
          if(userRegister){
              alert('User created successfully');
          //navigatePage("/newUserPerforma/newEmployeeList")
          }
        }else{
          alert("Please fill all filed!!");
        }
    }

  return (
    <div>
      <form style={{height:'45rem', fontSize:'0.9rem'}}>
        <Card style={{minWidth:'70rem', backgroundImage:'linear-gradient(1deg, rgb(255, 255, 255) 0%, rgb(238 247 251) 61%, rgb(255, 255, 255) 100%)'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>Establishment / User Approval Form</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> 
            </CardHeader>
            {userRegister? 
              <div>
                  <CardHeader>                    
                    <Button color="success" onClick="#" style={{width:'100%'}}>
                      Approval User Form 
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <Table >
                      <tbody id='userformId'>               
                        <tr>
                          <td>
                            <label>Employee Name:</label>
                            <input type='text' name='name' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.name} />
                          </td>
                          <td>
                            <label>Father Name:</label>
                            <input type='text' name='nameOfFather' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.nameOfFather} />
                          </td>
                          <td>
                            <label>Mother Name:</label>
                            <input type='text' name='nameOfMother' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.nameOfMother} />
                          </td>
                          <td>
                            <label>Spouse Name:</label>
                            <input type='text' name='nameOfSpouse' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.nameOfSpouse} />
                          </td>
                        </tr>
                        <tr>                          
                          <td><label>Email Id:</label>
                            <input type='text' name='emailId' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.emailId} />
                          </td>
                          <td><label>Date of Birth:</label>
                            <input type='date' name='dob' className='form-control' onChange={handleChange} value={dateofBirth} />
                          </td>
                          <td><label>Contach No:</label>
                            <input type='text' name='contactNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.contactNo} />
                          </td>
                          <td><label>Pan No:</label>
                            <input type='text' name='panNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.panNo} />
                          </td>
                        </tr>
                        <tr>
                          <td><label>Aadhar No:</label>
                            <input type='text' name='aadharNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.aadharNo} />
                          </td>
                          <td><label>Contract Tenure Expiry Date:</label>
                            <input type='date' name='contactTenureExpiryDate' className='form-control' onChange={handleChange} value={contactTenureExpiryDate} />
                          </td>
                          <td><label>Join Date:</label>
                            <input type='date' name='joinDate' className='form-control' onChange={handleChange} value={joinDate} />
                          </td>
                          <td><label>Rejoin Date:</label>
                            <input type='date' name='rejoiningDate' className='form-control' onChange={handleChange} value={rejoiningDate} />
                          </td>
                        </tr>
                        <tr>
                          <td><label>Bank Name:</label>
                          <select id='bankDto.id' name='bankDto.id' className='form-select' value={bank} onChange={handleChange}>
                          <option value="-1">-- select --</option>
                          {
                            banks && banks.map((dsg)=>(
                              <option value={dsg.id}>{dsg.name}</option>
                              ))
                          }
                          </select>
                          </td>
                          <td><label>Bank Acc/No:</label>
                            <input type='text' name='bankAccountNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.bankAccountNo} />
                          </td>
                          <td><label>IFSC Code:</label>
                            <input type='text' name='ifscCode' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.ifscCode} />
                          </td>
                          <td><label>Exprience:</label>
                            <input type='text' name='experience' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.experience} />
                          </td>
                        </tr>
                        <tr>
                          <td><label>Employee Type:</label>
                          <select id='employeeTypeDto.id' name='employeeTypeDto.id' className='form-select' value={employeeType} onChange={handleChange}>
                          <option value="-1">-- select --</option>
                          {
                            employeeTypes && employeeTypes.map((dsg)=>(
                              <option value={dsg.id}>{dsg.name}</option>
                              ))
                          }
                          </select>
                          </td>
                          <td><label>Supervisor Name:</label>
                          {
                            employeeSelection && employeeSelection.length>0?
                              <Select options={employeeSelection} id='superVisorNameDto.id' name='superVisorNameDto.id' onChange={(e)=>{handleSupervisor(e,"superVisorNameDto.id")}} placeholder="- Search option -" 
                                value={supervisorOtions} isSearchable={true}>
    
                              </Select>
                           :
                           <div></div>
                          }
                          
                          {/*
                          <select id='superVisorNameDto.id' name='superVisorNameDto.id' className='form-select' value={superVisorName} onChange={handleChange}>
                          <option value="-1">-- select --</option>
                          {
                              employeeSelection.map((dsg)=>(
                              <option value={dsg.id}>{dsg.fullName}</option>
                              ))
                          }
                          </select>
                        */}
                          </td>
                          <td><label>Department:</label>
                          <select id='departmentDto.id' name='departmentDto.id' className='form-select' value={department} onChange={handleChange}>
                          <option value="-1">-- select --</option>
                          {
                            departments && departments.map((dsg)=>(
                              <option value={dsg.id}>{dsg.name}</option>
                              ))
                          }
                          </select>
                          </td>
                          <td><label>Designation:</label>
                          <select id='designationDto.id' name='designationDto.id' className='form-select' value={designation} onChange={handleChange}>
                          <option value="-1">-- select --</option>
                          {
                            designations && designations.map((dsg)=>(
                              <option value={dsg.id}>{dsg.name}</option>
                              ))
                          }
                          </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Gender:</label>
                            <select id='gender' name='gender' className='form-select' onChange={handleChange} value={genderValue}>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Others">Others</option>
                            </select>
                          </td> 
                          <td><label>Marital Status:</label>
                            <select id='maritalStatus' name='maritalStatus' className='form-select' onChange={handleChange} value={updateUserRegister && updateUserRegister.maritalStatus}>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Widow">Widow</option>
                              <option value="Widower">Widower</option>
                              <option value="Divorcee">Divorcee</option>
                              <option value="Other">Other</option>
                            </select>
                          </td>
                          <td><label>Qualification:</label>
                            <input type='text' name='qualification' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.qualification} />
                          </td>
                          <td><label>Address:</label>
                            <textarea type='text' cols={50} rows={2} name='address' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.address} />
                          </td>
                          {/*
                          <td><label>Remarks:</label>
                            <textarea type='text' cols={30} rows={2} name='remarks' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.remarks} />
                          </td>
                        */}
                                              
                        </tr>                    
                      </tbody>
                    </Table>    
                  </CardBody>
                  <CardBody>                  
                  
                  <Row>
                    <Col sm={12}>
                      <Button color="primary" className='mt-1' onClick={(e)=>{handleSubmit("create")}} style={{width:'100%'}} title='Click here to update user detail before approve'>Create New User</Button>
                    </Col>
                  </Row>                 
                  </CardBody>                  
              </div>
              : 
              <div></div>
            }
            <CardFooter>
              <p>footer</p>
            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default CreateUserRegisterForm;

import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table} from 'reactstrap';
import { showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { findAllInstitutions, showBanks } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { showDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from 'react-select';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import { createEmployeeByUserRegister, showUserRegisterById, updateUserDetailRegister } from '../establishment_redux/slices/user_performa/UserRegisterSlice';
import BASE_URL from '../../../serviceUrl/AxiosURL';
import { showStaffType } from '../establishment_redux/slices/establishment_slice/staffTypeSlice';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';


const UserApprovalForm = () => {
    const {id} = useParams();
    const dispatch=useDispatch();
    const [updateUserRegister,setUpdateUserRegister]=useState();
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {employeeSelection,employeeById} = useSelector((state)=>state.allstorereducer.employeeData);
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const {banks} = useSelector((state)=>state.allstorereducer.org);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);
    const {updatedUser,createEmployee,userRegister,createLoading} = useSelector((state)=>state.allstorereducer.userRegister);
    const [dateofBirth,setDateofBirth] = useState();
    const [joinDate,setJoinDate] = useState();
    const [contactTenureExpiryDate,setContactTenureExpiryDate] = useState();
    const [rejoiningDate,setRejoiningDate] = useState();
    const navigatePage = useNavigate();
    const [bank,setBank] = useState(null);
    const [superVisorName,setSuperVisorName] = useState(null);
    const [supervisorOtions,setSupervisorOptions] = useState(null);
    const [department,setDepartment] = useState(null);
    const [designation,setDesignation] = useState(null);
    const [employeeType,setEmployeeType] = useState(null);
    const [staffType,setStaffType] = useState(null);
    const [isAction,setIsAction] = useState(false);
    const [genderValue,setGenderValue] = useState();

    const [nameEmpty,setNameEmpty] = useState(false);
    const [salEmpty,setSalEmpty] = useState(false);
    const [companyEmpty,setCompanyEmpty] = useState(false);
    const [genderEmpty,setGenderEmpty] = useState(false);
    const [adharEmpty,setAdharEmpty] = useState(false);
    const [deptEmpty,setDeptEmpty] = useState(false);
    const [desgEmpty,setDesgEmpty] = useState(false);
    const [empTypeEmpty,setEmpTypeEmpty] = useState(false);
    const [staffEmpty,setStaffEmpty] = useState(false);
    const [emailEmpty,setEmailEmpty] = useState(false);
    const [phoneEmpty,setPhoneEmpty] = useState(false);
    const [flag,setFlag]=useState(false);
    const [dobEmpty,setDobEmpty] = useState(false);
    const [remarkEmpty,setRemarkEmpty] = useState(false);

    useEffect(()=>{
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});     
      dispatch(showUserRegisterById(id));
      console.log("userregister "+id);
      dispatch(showBanks());
      dispatch(showDesignation());
      dispatch(showEmployeePopup());
      dispatch(showEmployeeType());
      dispatch(showDepartment());
      dispatch(findAllInstitutions());
      dispatch(showStaffType());
      //setUpdateUserRegister(userRegister);
      //setDateofBirth();

      const fetchUserRegisterdata = async()=>{
        try{
          const currentUser=localStorage.getItem("current-jwtToken");
            const response2 = await fetch(BASE_URL+"api/employees/employeeSelection",{
              method: 'GET',
              headers: {"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
              body:JSON.stringify(),
            })
            const result2 = await response2.json();
           
            const response = await fetch(BASE_URL+`api/userRegister/${id}`,{
              method: 'GET',
              headers: {"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
              body:JSON.stringify(),
            })

            if (!response.ok) {
              throw new Error('Failed to load record');
            }
            const result = await response.json();
            console.log('Record loaded successfully:', result);
            if(result && result.id){
              //alert(result.superVisorNameDto.id);
              dispatch(showUserRegisterById(result && result.id));
              setUpdateUserRegister(result);
              if(employeeSelection.length>0){
                const tempEmp=result2.filter((emp)=>emp.id==(result && result.superVisorNameDto && result.superVisorNameDto.id));      
                if(tempEmp[0]){
                  //setSuperVisorName(tempEmp[0]);
                  setSupervisorOptions({
                    value:tempEmp[0].value,
                    label:tempEmp[0].label
                  })
                }
              }

      //       }					
      //       console.log('Arrays : '+result);
      //   }catch(error){
      //     console.log(error);
      //   }
      // }
                
        if(result && result.dob){
          setDateofBirth(getFormattedDate(new Date(result.dob)));
        }if(result && result.rejoiningDate){
          setRejoiningDate(getFormattedDate(new Date(result.rejoiningDate)));
        }if(result && result.joinDate){
          setJoinDate(getFormattedDate(new Date(result.joinDate)));
        }if(result && result.contactTenureExpiryDate){
          setContactTenureExpiryDate(getFormattedDate(new Date(result.contactTenureExpiryDate)));
        }if(result && result.bankDto && result.bankDto.id){
          setBank(result.bankDto.id);
        }if(result && result.superVisorNameDto && result.superVisorNameDto.id){
          setSuperVisorName(result.superVisorNameDto.id);
        }if(result && result.departmentDto && result.departmentDto.id){
          setDepartment(result.departmentDto.id);
        }if(result && result.designationDto && result.designationDto.id){
          setDesignation(result.designationDto.id);
        }if(result && result.employeeTypeDto && result.employeeTypeDto.id){
          setEmployeeType(result.employeeTypeDto.id);
        }if(result && result.gender){
          setGenderValue(result.gender);
        }     
      }					
      console.log('Arrays : '+result);
    }catch(error){
      console.log(error);
    }
    }
      //calling refresh
      //fetchUserData
      fetchUserRegisterdata();
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
      if(e.target.name==='dob'){
        setDobEmpty(false);
        setDateofBirth(e.target.value);
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }else if(e.target.name==='name'){
        setNameEmpty(false);
        setUpdateUserRegister({...updateUserRegister, ["name"]:e.target.value})
      }else if(e.target.name==='aadharNo'){
        setAdharEmpty(false);
        setUpdateUserRegister({...updateUserRegister, ["aadharNo"]:e.target.value})
      }else if(e.target.name==='emailId'){
        setEmailEmpty(false);
        setUpdateUserRegister({...updateUserRegister, ["emailId"]:e.target.value})
      }else if(e.target.name==='contactNo'){
        setPhoneEmpty(false);
        setUpdateUserRegister({...updateUserRegister, ["contactNo"]:e.target.value})
      }else if(e.target.name==='contactTenureExpiryDate'){
        setContactTenureExpiryDate(e.target.value);
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }else if(e.target.name==='joinDate'){
        setJoinDate(e.target.value);
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }else if(e.target.name==='rejoiningDate'){
        setRejoiningDate(e.target.value);
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }
      else if(e.target.name==="bankDto.id"){
        setBank(e.target.value);
        //alert(e+", e.target="+e.target+", e.target.value"+e.target.value)
        setUpdateUserRegister({...updateUserRegister, ['bankDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="superVisorNameDto.id"){
        setSuperVisorName(e.target.value);
      }else if(e.target.name==="departmentDto.id"){
        setDeptEmpty(false);
        setDepartment(e.target.value);
        setUpdateUserRegister({...updateUserRegister, ['departmentDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="designationDto.id"){
        setDesgEmpty(false);
        setDesignation(e.target.value);
        setUpdateUserRegister({...updateUserRegister, ['designationDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="employeeTypeDto.id"){
        setEmpTypeEmpty(false);
        setEmployeeType(e.target.value);
        setUpdateUserRegister({...updateUserRegister, ['employeeTypeDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="staffTypeDto.id"){
        setStaffEmpty(false);
        setStaffType(e.target.value);
        setUpdateUserRegister({...updateUserRegister, ['staffTypeDto']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==='gender'){
        setGenderEmpty(false);
        setGenderValue(e.target.value);
        setUpdateUserRegister({...updateUserRegister, ['gender']:e.target.value})
      }else if(e.target.name==='joiningInstitutionDto.id'){
        setCompanyEmpty(false);
        setUpdateUserRegister({...updateUserRegister, ['joiningInstitutionDto']:{"id":e.target.value,"code":"sbi"}})
      }else if(e.target.name==='remarks'){
        setRemarkEmpty(false);
        setUpdateUserRegister({...updateUserRegister, ['remarks']:e.target.value})
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
      if(actionN==='approve'){
        if(validateFormData(updateUserRegister)){
          //go ahead
        }else{
            return false;
        }
        if(id!=undefined && employeeType!=null && genderValue!=null){
          alert(updateUserRegister);
          setIsAction(true);
          const userObj = {...updateUserRegister,
                          ["ifscCode"]:"ABCD00001",
                        };
          dispatch(createEmployeeByUserRegister(userObj));
        }else{
          alert("Kindly select all fields !!");
        }
      }
      if(actionN==='reject'){
        //alert('Hello '+actionN)
        if(updateUserRegister.remarks===undefined || updateUserRegister.remarks===''){
          setRemarkEmpty(true); setFlag(false);
        }
      }
      if(actionN==='update'){
        //alert('Hello '+actionN)
        if(validateFormData(updateUserRegister)){
          //go ahead
        }else{
            return false;
        }
        dispatch(updateUserDetailRegister(updateUserRegister));
        if(updatedUser){
          navigatePage("/newUserPerforma/newEmployeeList")
        }
      }
    }

    const validateFormData=(employeeObj)=>{
      if(updateUserRegister!=undefined){
          setFlag(true);
          if(updateUserRegister.name===undefined || updateUserRegister.name===''){
              setNameEmpty(true); setFlag(false);
          // }if(updateUserRegister.firstName===undefined || updateUserRegister.firstName===''){
          //     setNameEmpty(true); setFlag(false);
          }if(updateUserRegister.aadharNo===undefined || updateUserRegister.aadharNo===''){
              setAdharEmpty(true); setFlag(false);
          }if(updateUserRegister.gender==-1 || employeeObj.gender===undefined){
              setGenderEmpty(true); setFlag(false);
          }if(updateUserRegister.contactNo==='' || updateUserRegister.contactNo===undefined){
              setPhoneEmpty(true); setFlag(false);
          }if(updateUserRegister.emailId==='' || updateUserRegister.emailId===undefined){
              setEmailEmpty(true); setFlag(false);
          }if(updateUserRegister.joiningInstitutionDto==null || updateUserRegister.joiningInstitutionDto===undefined || updateUserRegister.joiningInstitutionDto.id===undefined || updateUserRegister.joiningInstitutionDto.id==-1){
                setCompanyEmpty(true); setFlag(false);
          }if(updateUserRegister.departmentDto===undefined || updateUserRegister.departmentDto.id==-1 || updateUserRegister.departmentDto.id===undefined){
              setDeptEmpty(true); setFlag(false);
          }if(updateUserRegister.designationDto===undefined || updateUserRegister.designationDto.id===undefined || updateUserRegister.designationDto.id==-1){
              setDesgEmpty(true); setFlag(false);
          }if(updateUserRegister.employeeTypeDto===undefined || updateUserRegister.employeeTypeDto.id==-1 || updateUserRegister.employeeTypeDto.id===undefined){
              setEmpTypeEmpty(true); setFlag(false);
          }if(updateUserRegister.staffTypeDto==null || updateUserRegister.staffTypeDto===undefined || updateUserRegister.staffTypeDto.id==-1 || updateUserRegister.staffTypeDto.id===undefined){
              setStaffEmpty(true); setFlag(false);
          }if(updateUserRegister.remarks==null || updateUserRegister.remarks===undefined || updateUserRegister.remarks===''){
              setRemarkEmpty(true); setFlag(false);
          }
          return flag;
      }else{
          toast.error("Kindly fill form correctly !!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
          });
          return false;
      }        
    }

  return (
    <div>
      <form style={{minHeight:'45rem', fontWeight:'0.8rem'}}>
        <Card style={{minWidth:'70rem', backgroundImage:'linear-gradient(1deg, rgb(255, 255, 255) 0%, rgb(238 247 251) 61%, rgb(255, 255, 255) 100%)'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>Establishment / User Approval Form</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> 
            </CardHeader>
            {updateUserRegister? 
              <div>
                  <CardHeader>                    
                    <Button color="success" style={{width:'100%'}}>
                      Approval User Form {updateUserRegister && updateUserRegister.name} {" "}( {updateUserRegister && updateUserRegister.departmentDto && updateUserRegister.departmentDto.name} )[Status : 
                        {createEmployee && createEmployee.status==='In Service'? "Approved":updateUserRegister && updateUserRegister.status}]
                    </Button>
                  </CardHeader>
                  {
                    createEmployee && createEmployee.code!=null && isAction?
                    <CardHeader>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="success">
                        <AlertTitle>Employee record created successfully.</AlertTitle>
                        Employee ID : <b style={{color:'blue'}}> {createEmployee && createEmployee.code}</b> with Name: <b style={{color:'blue'}}>&nbsp;{createEmployee && createEmployee.fullName}</b>                    
                      </Alert>
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
                    <Table >
                      <tbody id='userformId'>               
                        <tr>
                          <td>
                            <label>Employee Name <b style={{color:'red'}}>*</b>:</label>
                            <input type='text' name='name' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.name} />
                            {
                              nameEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Employee Name can't be empty!</i>
                              :
                              <></>
                            }
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
                          <td><label>Email Id <b style={{color:'red'}}>*</b>:</label>
                            <input type='text' name='emailId' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.emailId} />
                            {
                              emailEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Please enter proper Email Id !</i>
                              :
                              <></>
                            }
                          </td>
                          <td><label>Date of Birth <b style={{color:'red'}}>*</b>:</label>
                            <input type='date' name='dob' className='form-control' onChange={handleChange} value={dateofBirth} />
                            {
                              dobEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Date of birth can't be empty!</i>
                              :
                              <></>
                            }
                          </td>
                          <td><label>Contach No <b style={{color:'red'}}>*</b>:</label>
                            <input type='text' name='contactNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.contactNo} />
                            {
                              phoneEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Contact No can't be empty!</i>
                              :
                              <></>
                            }
                          </td>
                          <td><label>Pan No:</label>
                            <input type='text' name='panNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.panNo} />
                          </td>
                        </tr>
                        <tr>
                          <td><label>Aadhar No <b style={{color:'red'}}>*</b>:</label>
                            <input type='text' name='aadharNo' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.aadharNo} />
                            {
                              adharEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Aadhar No can't be empty!</i>
                              :
                              <></>
                            }
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
                              banks.map((dsg)=>(
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
                          <td><label>Employee Type <b style={{color:'red'}}>*</b>:</label>
                          <select id='employeeTypeDto.id' name='employeeTypeDto.id' className='form-select' value={employeeType} onChange={handleChange}>
                          <option value="-1">-- select --</option>
                          {
                              employeeTypes.map((dsg)=>(
                              <option value={dsg.id}>{dsg.name}</option>
                              ))
                          }
                          </select>
                          {
                            empTypeEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Employee type can't be empty!</i>
                            :
                            <></>
                          }
                          </td>
                          <td><label>Supervisor Name:</label>
                          <Select options={employeeSelection} id='superVisorNameDto.id' name='superVisorNameDto.id' onChange={(e)=>{handleSupervisor(e,"superVisorNameDto.id")}} placeholder="- Search option -" 
                           value={supervisorOtions} isSearchable={true}>
                          </Select>
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
                          <td><label>Department <b style={{color:'red'}}>*</b>:</label>
                          <select id='departmentDto.id' name='departmentDto.id' className='form-select' value={department} onChange={handleChange}>
                          <option value="-1">-- select --</option>
                          {
                              departments.map((dsg)=>(
                              <option value={dsg.id}>{dsg.name}</option>
                              ))
                          }
                          </select>
                          {
                            deptEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Department can't be empty!</i>
                            :
                            <></>
                          }
                          </td>
                          <td><label>Designation <b style={{color:'red'}}>*</b>:</label>
                          <select id='designationDto.id' name='designationDto.id' className='form-select' value={designation} onChange={handleChange}>
                          <option value="-1">-- select --</option>
                          {
                              designations.map((dsg)=>(
                              <option value={dsg.id}>{dsg.name}</option>
                              ))
                          }
                          </select>
                          {
                            desgEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Designation can't be empty!</i>
                            :
                            <></>
                          }
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label> Company <b style={{color:'red'}}>*</b>:</label>
                            <select type='text' id='joiningInstitutionDto.id' name='joiningInstitutionDto.id' value={updateUserRegister && updateUserRegister.joiningInstitutionDto && updateUserRegister.joiningInstitutionDto.id} className='form-select' onChange={(e)=>{handleChange(e)}}>
                              <option value="-1">-- select --</option>
                              {
                                  institutions.map((org)=>(
                                      <option value={org.id}>{org.code}</option>
                                  ))
                              }
                              </select>
                              {
                                  companyEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Company field can't be empty!</i>
                                  :
                                  <></>
                              }
                          </td>
                          <td>
                            <label style={{color:'red'}}> Staff Type :</label>
                            <select id='staffTypeDto.id' name='staffTypeDto.id' className='form-select' value={staffType} onChange={(e)=>{handleChange(e)}}>
                              <option value="-1">-- select --</option>
                              {                               
                                  staffTypes.map((stf)=>(
                                      <option value={stf.id}>{stf.name}</option>
                                  ))                                
                              }
                              </select>
                              {
                                  staffEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Staff type can't be empty!</i>
                                  :
                                  <></>
                              }
                          </td>
                          <td><label>Marital Status:</label>
                          {/* 
                          <input type='text' name='maritalStatus' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.maritalStatus} />
                          */}
                            <select id='maritalStatus' name='maritalStatus' className='form-select' onChange={handleChange} value={updateUserRegister && updateUserRegister.maritalStatus}>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Widow">Widow</option>
                              <option value="Widower">Widower</option>
                              <option value="Divorcee">Divorcee</option>
                              <option value="Other">Other</option>
                            </select>
                          </td>
                          <td>
                            <label>Gender <b style={{color:'red'}}>*</b>:</label>
                            <select id='gender' name='gender' className='form-select' onChange={handleChange} value={genderValue}>
                              <option value="-1">-- Select --</option> 
                              <option value="Male">Male</option>  
                              <option value="Female">Female</option>
                              <option value="Others">Others</option>
                            </select>
                            {
                              genderEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Gender field can't be empty!</i>
                              :
                              <></>
                            }
                          </td>                   
                        </tr> 
                        <tr>
                          <td><label>Qualification:</label>
                            <textarea type='text' name='qualification' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.qualification} />
                          </td>
                          <td><label>Address:</label>
                            <textarea type='text' cols={50} rows={2} name='address' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.address} />
                          </td>
                          <td><label>Remarks <b style={{color:'red'}}>*</b>:</label>
                            <textarea type='text' cols={30} rows={2} id="remarks" name='remarks' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.remarks} />
                            {
                              remarkEmpty?<i style={{color:'red',fontSize:'0.8rem'}}>Please enter proper remarks!</i>
                              :
                              <></>
                            }
                          </td> 
                        </tr>                   
                      </tbody>
                    </Table>    
                  </CardBody>
                  <CardBody>                  
                  <Row>
                    <Col sm={6}>
                      <Button color="danger" onClick={(e)=>{handleSubmit("reject")}} style={{width:'100%'}} title='Click here to reject with remarks'>Reject</Button>
                    </Col>
                    <Col sm={6}>
                      <Button color="success" onClick={(e)=>{handleSubmit("approve")}} style={{width:'100%'}} title='Click here to approve and generate employee Id'>Approve </Button>
                    </Col>
                  </Row>  
                  <Row>
                    <Col sm={12}>
                      <Button color="primary" className='mt-1' onClick={(e)=>{handleSubmit("update")}} style={{width:'100%'}} title='Click here to update user detail before approve'>Update User Detail</Button>
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
        <ToastContainer></ToastContainer>
      </form>
    </div>
  )
}

export default UserApprovalForm;

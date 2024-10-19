import React, { useEffect, useState } from 'react'
import { FaSearch, FaUser } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import './ModalViews.css';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createUserGroup, findAllUserGroups } from '../admin_setup_redux/userGroupSlice';
import BASE_URL from '../../../serviceUrl/AxiosURL';
import {ToastContainer, toast } from 'react-toastify';
import { findAllInstitutions } from '../../establishment_module/establishment_redux/slices/establishment_slice/institutionSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { showEmployeePopup } from '../../establishment_module/establishment_redux/slices/establishment_slice/employeeSetupSlice';
import Select from 'react-select';
import { createAppUser, findAppUserById, resetPasswordOfUser, updateAppUserById } from '../../../auth/auth_slice/loginUserSlice';
import { Switch } from '@mui/material';
import Alert from '@mui/material/Alert';

const AddUsers = () => {
    const {id} = useParams();
    const [modal, setModal] = useState(false);
    const dispatch=useDispatch();
    const navigatePage=useNavigate();
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const {userLoading,appUser,resetUser,createLoading,updateLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const {employeeSelection,employmentEmployee} = useSelector((state)=>state.allstorereducer.employeeData);
    const [selectedSupervisorOtion,setSelectedSupervisorOtion] = useState();
    const [userTypeValue,setUserTypeValue] = useState();
    const [companyValue,setCompanyValue] = useState();
    const [userIdValue,setUserIdValue] = useState();
    const [emailValue,setEmailValue] = useState();
    const [adminUserFlag,setAdminUserFlag] = useState(false);
    const [isAction,setIsAction] = useState(false);
    useEffect(()=>{
        window.scrollTo({left:'0',top:'0',behavior:'smooth'});
        dispatch(findAllUserGroups());
        dispatch(showEmployeePopup());
        dispatch(findAppUserById(id));
        dispatch(findAllInstitutions());
        const fetchAppUser = async(usrid)=>{
            try {
                const currentUser=localStorage.getItem("current-jwtToken");
                const response = await fetch(BASE_URL+`api/user/${usrid}`,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
                    body: JSON.stringify(),
                })
                if (!response.ok) {
                    throw new Error('Failed to load record');
                }
                const result = await response.json();
                console.log('Record loaded successfully:', result);
                if(result && result.id){
                    if(result && result.userType==='Employee' && employeeSelection && employeeSelection.length>0 && result.employeeDto){
                        employeeSelection.map((obj)=>{
                            if(obj.id===result.employeeDto.id){                                
                                setSelectedSupervisorOtion(obj);
                                console.log(selectedSupervisorOtion)
                            }
                        })  
                        console.log(result.employeeDto.id);                        
                        setUserObj(appUser) ; 
                        setCompanyValue(result.institutionDto && result.institutionDto.id);
                        setUserTypeValue(result.userType);    
                        setUserIdValue(result.userId);
                        setEmailValue(result.email);  
                        if(result && result.adminUserFlag==='Yes'){
                            setAdminUserFlag(true);
                        }             
                    }else if(result && result.userType==='Others'){
                        setUserObj(appUser) ; 
                        setCompanyValue(result.institutionDto && result.institutionDto.id);
                        setUserTypeValue(result.userType);    
                        setUserIdValue(result.userId);
                        setEmailValue(result.email);  
                        if(result && result.adminUserFlag==='Yes'){
                            setAdminUserFlag(true);
                        }
                    }
                }
            } catch (error) {
            }
        };

        fetchAppUser(id);
    },[]);

    const toggle=()=>{ setModal(!modal); }
    const [selectedNode, setSelectedNode] = useState(null);
    const [userObj,setUserObj] = useState();
    const [groupNameValue,setGroupNameValue] = useState(null);
    const [descValue,setDescValue] = useState(null);
    const [parentGroupValue,setParentGroupValue] = useState(null);
    const [parentGroupId,setParentGroupId] = useState(null);
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    function getFormattedDate(date) {
        if(date.getFullYear()!=1970){
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
          const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
          return `${day}-${month}-${year}`;
        }
    }
    const handleChange=(e)=>{
      if(e.target.name==='userType'){
        setUserTypeValue(e.target.value);
        setUserObj({...userObj,["userType"]:e.target.value});
      }else if(e.target.name==='institution.id'){
        setCompanyValue(e.target.value);
        setUserObj({...userObj,["institutionDto"]:{"id":e.target.value,"code":"sbi"}});
      }else if(e.target.name==='userId'){
        setUserIdValue(e.target.value);
        setUserObj({...userObj,["userId"]:e.target.value});
      }else if(e.target.name==='email'){
        setEmailValue(e.target.value);
        setUserObj({...userObj,["email"]:e.target.value});
      }
      console.log(userObj);
    }

    const handleSuperAdmin=(e)=>{
        setAdminUserFlag(e.target.checked);        
        //setUserObj({...userObj,["adminUserFlag"]:e.target.checked});
        console.log(userObj);
    }

    const saveAppUsers=async()=>{
      if(userObj!=null){
        setIsAction(true);
        const userObject={...userObj,["firstName"]:"abcde",["cprNumber"]:" ",["adminUserFlag"]:adminUserFlag? "Yes":"No"};       
        try {
            const currentUser=localStorage.getItem("current-jwtToken");
                const response = await fetch(BASE_URL+"api/user/create",{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
                    body: JSON.stringify(userObject),
                })
                if (!response.ok) {
                    throw new Error('Failed to load record');
                }
                const result = await response.json();
                console.log('Record created successfully:', result);
                if(result && result.id){
                    dispatch(resetPasswordOfUser(result.id)); 
                }
        } catch (error) {
            
        }        
        // dispatch(createAppUser(userObject));      
        // if(!createLoading && appUser && appUser.id!=null){    
        //     dispatch(resetPasswordOfUser(appUser && appUser.id));    
        //     toast.success("Data created successfully. id="+appUser.id, {
        //         position: "top-center",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        //     //navigatePage("/users");
        // }
      }
      
    }
    const updateAppUsers=()=>{
        if(userObj!=null){
            setIsAction(true);
            const userObject={...userObj,
                ["cprNumber"]:" ",
                ["userType"]:userTypeValue,
                ["employeeDto"]:selectedSupervisorOtion,
                ["institutionDto"]:{"id":companyValue,"code":"sbi"},
                ["userId"]:userIdValue,
                ["email"]:emailValue,
                ["adminUserFlag"]:adminUserFlag? "Yes":"No"};
          dispatch(updateAppUserById(userObject));    
          if(!updateLoading){           
            toast.success("Data updated successfully.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            //navigatePage("/users");
        }else{
            <Spinner />
        }
        }        
    }
    const updateSuperAdmin=()=>{
        const usrGrp={...userObj,["id"]:selectedNode.id,
            ["groupName"]:groupNameValue,
            ["description"]:descValue,
            ["parentGroup"]:{"id":parentGroupId,"groupName":parentGroupValue}
        }
        toast.success("Data updated successfully.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const handleAddUser=()=>{
        navigatePage("/users");
    }
    const handleSupervisor=(data,field)=>{
        setSelectedSupervisorOtion(data);
        setUserObj({...userObj,["employeeDto"]:data});
        console.log(userObj);
    }

  return (
    <div className='form-container App'>
        <Card className='p-1 mb-1'>Home / Admin Setup / AddUser</Card>
        <Card>
            <CardHeader>
                <Button onClick={handleAddUser} className='button-color' title='Click here to search new user'> <FaSearch />&nbsp;Search </Button> &nbsp;
                {
                    id!=null || id!=undefined?
                    <Button onClick={updateAppUsers} color='success' title='Click here to edit user'> Update </Button>
                    :
                    <Button onClick={saveAppUsers} color='success' title='Click here to save new user'> <FaPlus /> Save </Button>
                }                
                &nbsp;<Button onClick={updateSuperAdmin} color='info' title='Click here to super user'> <FaUser />&nbsp; Client Super User </Button>
            </CardHeader>
            {
                isAction && updateLoading || createLoading?
            
            <CardBody> 
                <Row>
                    <Col sm={6}></Col>
                    <Col sm={6}>
                        Loading... <Spinner style={{color:'brown'}}/>
                    </Col>
                </Row>                
            </CardBody>
            :
            <CardBody>
                <Row>
                    <Col sm={2}> </Col>
                    <Col sm={8}> 
                    {
                        resetUser && resetUser.passwd!=null && isAction?
                        <div>
                            <Alert severity="success"><b style={{color:'blue'}}>{resetUser && resetUser.userId}</b> User created successfully. Default password is : <b style={{color:'blue'}}> {resetUser && resetUser.passwd}</b></Alert>
                            <hr />
                       </div>
                        :
                        !resetUser && isAction?
                            <div>
                                <Alert severity="error">User could not created !!</Alert>
                                <hr />
                            </div>
                            :
                            <div></div>
                    }
                    </Col>
                    <Col sm={2}></Col>
                </Row>                
                <Row>
                    <Col sm={4}></Col>
                    <Col sm={2}><label><b>User Type : </b></label></Col>
                    <Col sm={6}>
                        <select id='userType' name='userType' className='form-select' onChange={handleChange} value={userTypeValue}>
                            <option value={-1}>-- select type --</option>
                            <option value="Employee">Employee</option>
                            <option value="Others">Others</option>
                        </select>
                    </Col>
                </Row>
                <Row className='mt-2'>
                  <Col sm={4}></Col>
                  <Col sm={2}><label><b> Employee : </b></label></Col>
                  <Col sm={6}>
                        <Select options={employeeSelection} id='employee.id' name='employee.id' onChange={(e)=>{handleSupervisor(e,"employee.id")}} placeholder="- Search employees -" 
                            value={selectedSupervisorOtion} isSearchable={true}>
                        </Select>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col sm={4}></Col>
                  <Col sm={2}><label><b> Company Name : </b></label></Col>
                  <Col sm={6}>
                      <select id='institution.id' name='institution.id' onChange={handleChange} className='form-control' value={companyValue}>
                        <option value={-1}>-- select company --</option>
                        {
                            institutions && institutions.map((insta)=>(
                                <option value={insta.id}>{insta && insta.name}</option>
                            ))
                        }
                      </select>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col sm={4}></Col>
                  <Col sm={2}><label><b> User Id : </b></label></Col>
                  <Col sm={6}>                      
                      <input id='userId' name='userId' type='text' value={userIdValue} onChange={handleChange} className='form-control' />
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col sm={4}></Col>
                  <Col sm={2}><label><b> Email Id : </b></label></Col>
                  <Col sm={6}>                      
                      <input id='email' name='email' type='text' value={emailValue} onChange={handleChange} className='form-control' />
                  </Col>
                </Row>
                <Row className='mt-1'>
                  <Col sm={6}></Col>
                  <Col sm={6}>
                    <Switch {...label} checked={adminUserFlag} name='adminUserFlag' color="success" onChange={handleSuperAdmin}/>
                    <label>Is Super Admin</label>
                  </Col>
                </Row>
            </CardBody>
            }
            <CardFooter className='p-0 mt-2'>  
            </CardFooter>
        </Card>

        {/* Modal */}
        <Modal isOpen={modal} toggle={toggle} className="custom-modal" size='sm'>
            <ModalHeader toggle={toggle} style={{color:'blue'}}> Modal Title</ModalHeader>
            <ModalBody>
              
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
        {/* Modal  */}
        
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default AddUsers;
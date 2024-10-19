import React, { useEffect, useState } from 'react'
import { FaCriticalRole, FaEdit, FaList, FaPlusCircle, FaRegEdit, FaSearch } from 'react-icons/fa';
import { FaPlus, FaUserGroup } from 'react-icons/fa6';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLockReset } from "react-icons/md";
import { deleteAppUserById, findAllAppUsers, findAppUsersByUserType, findUserByStartWithUserId, resetPasswordOfUser } from '../../../auth/auth_slice/loginUserSlice';
import { Delete, Edit } from '@mui/icons-material';
import { TiTick } from "react-icons/ti";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import {ToastContainer, toast } from 'react-toastify';
import { BsPersonWorkspace } from "react-icons/bs";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { findAllRoleModules } from '../admin_setup_redux/roleModuleSlice';
import { findAllModules } from '../admin_setup_redux/modulesSlice';

const UserModules = () => {
    const [modal, setModal] = useState(false);
    const [userName,setUserName] = useState(null);
    const [user,setUser] = useState(null);
    const [roleAssign,setRoleAssign] = useState(null);
    const dispatch=useDispatch();
    const navigatePage = useNavigate();
    const {userLoading,appUser,appUsers,resetUser} = useSelector((state)=>state.allstorereducer.user_token);
    const {mloading,modules} = useSelector((state)=>state.allstorereducer.modules);
    const [isAction,setIsAction] = useState(false);
    
    useEffect(()=>{
        window.scrollTo({left:'0',top:'0',behavior:'smooth'});
        setIsAction(false);
        dispatch(findAllModules());

    },[]);
    const toggle=()=>{
        setModal(!modal);
        setUserSetup(null);
    }
    const [userSetup,setUserSetup] = useState(null);
    
    function getFormattedDate(date) {
        if(date.getFullYear()!=1970){
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
          const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
          return `${day}-${month}-${year}`;
        }
    }
    const userNameChange=(e)=>{
        setIsAction(false);
        setUserName(e.target.value);
    }
    const searchUser=()=>{
        setIsAction(false);
        dispatch(findUserByStartWithUserId(userName));
    }
    const handleChange=(key)=>{
        dispatch(findUserByStartWithUserId(key));
    }
    const changeUserType=(e)=>{
        //alert(e.target.value);
        setIsAction(false);
        dispatch(findAppUsersByUserType(e.target.value));
    }
    const addUserRole=(e,userObj)=>{
        setIsAction(false);
        navigatePage(`/adminSetup/addRoles/${userObj.id}`);
    }
    const editUserRole=(e,userId)=>{
        //alert(userId);
        navigatePage(`/adminSetup/addUsers/${userId}`);
    }
    const addAppUser=(addString)=>{
        navigatePage("/adminSetup/addUsers/");
    }
    const restUserPassword=(e,userId)=>{
        if(window.confirm("Are you sure to reset?")){
            setIsAction(true);
            dispatch(resetPasswordOfUser(userId));
        }else{
            //Nothing
        }
    }
    const deleteUser=(e,userId)=>{
        alert(userId);
        if(window.confirm("Are you sure to delete?")){
            setIsAction(true);
            dispatch(deleteAppUserById(userId));
        }else{
            //Nothing
        }
        dispatch(findUserByStartWithUserId(userId));
    }
    const handleCheck=(e)=>{       
        //setRoleAssign(e.target.name);
        setRoleAssign(e.target.checked ? e.target.name : null);
        //setRoleNotAssign(!roleNotAssign);
        alert(roleAssign+", "+e.target.name+", "+e.target.value+", "+e.target.checked);
    }

  return (
    <div className='form-container'>
        <Card className='p-1 mb-1'>Home / Admin Setup</Card>
        <Card className='form-shadow'>
            <CardHeader><Button onClick={(e)=>{addAppUser("add")}} className='button-color' title='Click here to add new user'> <FaPlus /> &nbsp; Add</Button>{" "} <FaList onClick={toggle}/> List of User List </CardHeader>
            <CardBody>
                <Row>
                    
                </Row>
                <br />                
                <Row>
                    <Col sm={2}> </Col>
                    <Col sm={8}> 
                    {
                        isAction && userLoading?
                        <Spinner style={{color:'green'}}/>
                        :
                        resetUser && resetUser.passwd!=null && isAction?
                        <div><hr />
                            <Alert severity="success">Password reset successfully. Default password is : {resetUser && resetUser.passwd}</Alert>
                        </div>
                        :
                        <div></div>
                    }
                    </Col>
                    <Col sm={2}></Col>
                </Row>                               
            </CardBody>
            <CardFooter >  
            </CardFooter>
        </Card>
        <Card className='form-shadow'>
            <CardBody>
            {
                mloading===false && modules && modules.length>0?
                <Row>
                    <Col sm={12}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Name</th>
                                    <th>Display Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    modules && modules.length>0 && modules.map((user,index)=>(
                                    <tr key={user.id}>
                                            <td style={{width:'10%'}}>{index+1}</td>
                                            <td style={{width:'20%'}}>{user && user.name}</td>
                                            <td style={{width:'30%'}}>{user && user.displayName}</td>
                                            <td style={{width:'25%'}}>{user && user.description}</td>
                                            <td style={{width:'34%'}}>
                                                    <button style={{color:'blue',border:'none'}} onClick={(e)=>{addUserRole(e,user)}} title='Click here to add more roles'><FaPlusCircle style={{width:'1.3rem', height:'1.3rem'}}/> </button>
                                              {"  "}&nbsp; <button style={{color:'green',border:'none'}} onClick={(e)=>{editUserRole(e,user.id)}} title='Click here to update roles'> <Edit style={{width:'1.3rem', height:'1.3rem'}}/> </button>
                                              {"  "}&nbsp; <button style={{color:'brown',border:'none'}} onClick={(e)=>{restUserPassword(e,user.id)}} title='Click here to reset password'> <MdOutlineLockReset style={{width:'1.4rem', height:'1.4rem'}}/></button>
                                              {"  "}&nbsp; <button style={{color:'red',border:'none'}} onClick={(e)=>{deleteUser(e,user.id)}}  title='Click here to delete user'> <Delete style={{width:'1.3rem', height:'1.3rem'}}/> </button>
                                            </td>
                                    </tr> 
                                    ))
                                }
                                <tr></tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                :
                <Row><br />
                    <Col sm={5}></Col>
                    <Col sm={5}>
                        Loading... <Spinner style={{color:'green'}}/>
                    </Col>
                    <Col sm={2}></Col>
                </Row>
                }
            </CardBody>
        </Card>
        {/* Modal */}
        <Modal isOpen={modal} toggle={toggle} size='xl'>
        {
          (userSetup && userSetup.id!==undefined)?
            <ModalHeader toggle={toggle} >
                
                <Row>
                    <Col sm={6} style={{color:'brown'}}>
                        [{userSetup && userSetup.userId}] : {userSetup && userSetup.firstName}
                    </Col>
                    <Col sm={6}><FaCriticalRole style={{marginRight:'2px', width:'2rem', height:'2rem'}}/>{" "}                    
                        <Fab variant="extended" color='success' size='medium'>
                            <TiTick style={{marginRight:'2px', width:'2rem', height:'2rem'}}/>
                            Add Role
                        </Fab>               
                    </Col>
                    
                </Row>               
            </ModalHeader>
          :
          <ModalHeader toggle={toggle}><FaCriticalRole /> Add Roles Form
            <Fab variant="extended" color='success' size='medium'>
                <TiTick style={{marginRight:'2px', width:'2rem', height:'2rem'}}/>
                Add Role
            </Fab> 
          </ModalHeader>
        }
          <ModalBody className='p-0'>  
            <Row>
                <Col sm="11">
                    
                    <table>
                                           
                    </table>   
                </Col>
                <Col sm="1">                  
                </Col>
            </Row>
          </ModalBody>
          <ModalFooter >
          <p>User</p>
          </ModalFooter>
        </Modal>
      {/* Modal  */}
    </div>
  )
}

export default UserModules;
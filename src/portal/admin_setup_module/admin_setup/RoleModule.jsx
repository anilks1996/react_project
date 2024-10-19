import React, { useEffect, useState } from 'react'
import { FaCriticalRole, FaEdit, FaList, FaPlusCircle, FaRegEdit, FaSearch } from 'react-icons/fa';
import { FaPlus, FaUserGroup } from 'react-icons/fa6';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { findAppUsersByUserType, findUserByStartWithUserId, resetPasswordOfUser } from '../../../auth/auth_slice/loginUserSlice';
import { Delete, Edit } from '@mui/icons-material';
import {ToastContainer, toast } from 'react-toastify';
import { TiTick } from "react-icons/ti";
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { findAllRoleModules, findDistinctRoleModules } from '../admin_setup_redux/roleModuleSlice';
import { deleteRole } from '../admin_setup_redux/roleSlice';
import { findUserRoleByRoleId } from '../admin_setup_redux/userRoleSlice';

const RoleModule = () => {
    const [modal, setModal] = useState(false);
    const [userWithRoleModal,setUserWithRoleModal] = useState(false);
    const [privilegeModal,setPrivilegeModal] = useState(false);
    const [userEditModal,setUserEditModal] = useState(false);
    const [userName,setUserName] = useState(null);
    const dispatch=useDispatch();
    const navigatePage = useNavigate();
    const {userLoading,appUser,appUsers,resetUser} = useSelector((state)=>state.allstorereducer.user_token);
    const {urLoading,userRolesByRole} = useSelector((state)=>state.allstorereducer.userRole);
    const {rmLoading,roleModule,roleModules} = useSelector((state)=>state.allstorereducer.roleModule);
    const [isAction,setIsAction] = useState(false);
    const [roleModuleObj,setRoleModuleObj] = useState(null);
    useEffect(()=>{
        window.scrollTo({left:'0',top:'0',behavior:'smooth'});
        setIsAction(false);
        dispatch(findDistinctRoleModules());

    },[]);
    const toggle=()=>{
        setModal(!modal);
    }
    const toggleUserWithRole=()=>{
        setUserWithRoleModal(!userWithRoleModal);
    } 
    const togglePrivilege=()=>{
        setPrivilegeModal(!privilegeModal);
    }  
    const toggleUserEdit=()=>{
        setUserEditModal(!userEditModal);
    }    
    const showUserWithRole=(e,roleObj)=>{
        setRoleModuleObj(roleObj);
        dispatch(findUserRoleByRoleId(roleObj && roleObj.role && roleObj.role.id));
        toggleUserWithRole();
    }
    const setPrivilege=(e,roleObj)=>{
        setRoleModuleObj(roleObj);
        //dispatch()
        togglePrivilege();
    }
    const addAppUser=(addString)=>{
        navigatePage("/adminSetup/addUsers/");
    }
    const editRoles=(e,roleObj)=>{
            setIsAction(true);
            setRoleModuleObj(roleObj);
            toggleUserEdit();
    }
    const deleteRoles=(e,roleId)=>{
        alert(roleId);
        if(window.confirm("Are you sure to delete?")){
            setIsAction(true);
            //dispatch(deleteRole(roleId));
        }else{
            //Nothing
        }
        //dispatch(findUserByStartWithUserId(userId));
    }
    const addUserRole=(e,userId)=>{
        navigatePage(`/adminSetup/addRoles/${userId}`);
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
                rmLoading && roleModules && roleModules.length>0?
                <Row>
                    <Col sm={12}>
                        <Table striped>
                           <thead>
                                <tr>
                                    <th style={{width:'10%'}}>Index</th>
                                    <th style={{width:'20%'}}>Role Name</th>
                                    <th style={{width:'55%'}}>Module(s)</th>
                                    <th style={{width:'25%'}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roleModules && roleModules.length>0 && roleModules.map((rMod,index)=>(
                                    <tr key={rMod.id}>
                                            <td style={{width:'10%'}}>{index+1}</td>
                                            <td style={{width:'20%'}}>{rMod && rMod.role && rMod.role.name}</td>
                                            <td style={{width:'55%'}}>{rMod && rMod.module && rMod.module.name}</td>
                                            <td style={{width:'25%'}}>
                                                    <button style={{color:'blue',border:'none'}} onClick={(e)=>{showUserWithRole(e,rMod)}} title='Show User with this role'><FaUserGroup style={{width:'1.3rem', height:'1.3rem'}}/> </button>
                                              {"  "}&nbsp; <button style={{color:'brown',border:'none'}} onClick={(e)=>{setPrivilege(e,rMod)}} title='Set Privileges'> <TiTick  style={{width:'1.3rem', height:'1.3rem'}}/> </button>
                                              {"  "}&nbsp; <button style={{color:'green',border:'none'}} onClick={(e)=>{editRoles(e,rMod)}} title='Edit role'> <Edit style={{width:'1.4rem', height:'1.4rem'}}/></button>
                                              {"  "}&nbsp; <button style={{color:'red',border:'none'}} onClick={(e)=>{deleteRoles(e,rMod)}}  title='Click here to delete role'> <Delete style={{width:'1.3rem', height:'1.3rem'}}/> </button>
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
        <Modal isOpen={userWithRoleModal} toggle={toggleUserWithRole} size='lg'>
            <ModalHeader toggle={toggleUserWithRole} >               
                <FaUserGroup/> <label style={{color:'blue'}}>Users with Role  &nbsp;&nbsp;&nbsp;  Role name : [ {roleModuleObj && roleModuleObj.role && roleModuleObj.role.name} ] </label>            
            </ModalHeader>
          <ModalBody>  
            <Row>
            <Col sm={12}>
            {
                userRolesByRole && userRolesByRole.length>0?
                <Table striped>
                    <thead>
                        <tr>
                            <th style={{width:'10%'}}>Index</th>
                            <th style={{width:'20%'}}>User Id</th>
                            <th style={{width:'25%'}}>Name</th>
                            <th style={{width:'15%'}}>Type</th>
                            <th style={{width:'25%'}}>Department/Designation</th>
                            <th style={{width:'15%'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userRolesByRole.map((urr,index)=>(
                                <tr key={urr.id}>
                                    <td>{index+1}</td>
                                    <td>{urr && urr.appUser && urr.appUser.userId}</td>
                                    <td>{urr && urr.appUser && urr.appUser.firstName}</td>
                                    <td>{urr && urr.appUser && urr.appUser.userType}</td>
                                    <td>{urr && urr.appUser && urr.appUser.institution && urr.appUser.institution.name}</td>
                                    <td> 
                                        <button style={{color:'blue',border:'none'}} onClick={(e)=>{addUserRole(e,urr.appUser.id)}} title='Click here to add more roles'><FaPlusCircle style={{width:'1.3rem', height:'1.3rem'}}/> </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>             
                </Table> 
                :
                <div></div>
            }   
            </Col>
            </Row>
          </ModalBody>
          <ModalFooter >
          <p>User</p>
          </ModalFooter>
        </Modal>
        {/*  end UserWithRole  */}

        <Modal isOpen={privilegeModal} toggle={togglePrivilege} size='xl'>
          <ModalHeader toggle={togglePrivilege}><FaCriticalRole />
                <TiTick style={{marginRight:'2px', width:'2rem', height:'2rem'}}/>
                Set Privileges
           
          </ModalHeader>
          <ModalBody className='p-0'>  
            <Row> <Col sm={12}> 
            {
                roleModuleObj?
                <Table striped>
                    <thead>
                        <tr>
                            <th style={{width:'10%'}}>Index</th>
                            <th style={{width:'20%'}}>Role Name</th>
                            <th style={{width:'25%'}}>Module Name</th>
                            <th style={{width:'15%'}}>User Group</th>
                            <th style={{width:'15%'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>                       
                        <tr key={roleModuleObj.id}>
                            <td>{1}</td>
                            <td>{roleModuleObj && roleModuleObj.role && roleModuleObj.role.name}</td>
                            <td>{roleModuleObj && roleModuleObj.module && roleModuleObj.module.name}</td>
                            <td>{roleModuleObj && roleModuleObj.userGroup && roleModuleObj.userGroup.groupName}</td>
                            <td> 
                                <button style={{color:'blue',border:'none'}} onClick={(e)=>{addUserRole(e,roleModuleObj.appUser.id)}} title='Click here to add more roles'><FaPlusCircle style={{width:'1.3rem', height:'1.3rem'}}/> </button>
                            </td>
                        </tr>                           
                    </tbody>             
                </Table> 
                :
                <div></div>
            }  
            </Col> </Row>
          </ModalBody>
          <ModalFooter >
          <p>User</p>
          </ModalFooter>
        </Modal>

        <Modal isOpen={userEditModal} toggle={toggleUserEdit} size='xl'>
          <ModalHeader toggle={toggleUserEdit}><FaCriticalRole /> Add Roles Form
                <FaEdit style={{marginRight:'2px', width:'2rem', height:'2rem'}}/>
                Edit 
          </ModalHeader>
          <ModalBody className='p-0'>  
          <Row> <Col sm={12}> 
          {
              roleModuleObj?
              <Table striped>
                  <thead>
                      <tr>
                          <th style={{width:'10%'}}>Index</th>
                          <th style={{width:'20%'}}>Role Name</th>
                          <th style={{width:'25%'}}>Module Name</th>
                          <th style={{width:'15%'}}>User Group</th>
                          <th style={{width:'15%'}}>Action</th>
                      </tr>
                  </thead>
                  <tbody>                       
                      <tr key={roleModuleObj.id}>
                          <td>{1}</td>
                          <td>{roleModuleObj && roleModuleObj.role && roleModuleObj.role.name}</td>
                          <td>{roleModuleObj && roleModuleObj.module && roleModuleObj.module.name}</td>
                          <td>{roleModuleObj && roleModuleObj.userGroup && roleModuleObj.userGroup.groupName}</td>
                          <td> 
                              <button style={{color:'blue',border:'none'}} onClick={(e)=>{addUserRole(e,roleModuleObj.appUser.id)}} title='Click here to add more roles'><FaPlusCircle style={{width:'1.3rem', height:'1.3rem'}}/> </button>
                          </td>
                      </tr>                           
                  </tbody>             
              </Table> 
              :
              <div></div>
          }  
          </Col> </Row>
          </ModalBody>
          <ModalFooter >
          <p>User</p>
          </ModalFooter>
        </Modal>
      {/* Modal  */}
    </div>
  )
}

export default RoleModule;
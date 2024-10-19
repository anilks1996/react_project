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
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const UserSetup = () => {
    const [modal, setModal] = useState(false);
    const [userName,setUserName] = useState(null);
    const [user,setUser] = useState(null);
    const [roleAssign,setRoleAssign] = useState(null);
    const dispatch=useDispatch();
    const navigatePage = useNavigate();
    const {userLoading,appUser,appUsers,resetUser} = useSelector((state)=>state.allstorereducer.user_token);
    const {loading,roles} = useSelector((state)=>state.allstorereducer.roles);
    const [isAction,setIsAction] = useState(false);
    
    useEffect(()=>{
        window.scrollTo({left:'0',top:'0',behavior:'smooth'});
        setIsAction(false);
        dispatch(findUserByStartWithUserId('abcde'));

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
        //dispatch(findAllRolesByUserId(userObj && userObj.id));
        //toggle();
        //setUserSetup(userObj); 
        //dispatch(findUserRoleByAppUserId(userObj && userObj.id));
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
    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        alignItems:'right',
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: '#65C466',
              opacity: 1,
              border: 0,
              ...theme.applyStyles('dark', {
                backgroundColor: '#2ECA45',
              }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
              color: theme.palette.grey[600],
            }),
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
              opacity: 0.3,
            }),
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: '#E9E9EA',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
          ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
          }),
        },
      }));

  return (
    <div className='form-container'>
        <Card className='p-1 mb-1'>Home / Admin Setup</Card>
        <Card className='form-shadow'>
            <CardHeader><Button onClick={(e)=>{addAppUser("add")}} className='button-color' title='Click here to add new user'> <FaPlus /> &nbsp; Add</Button>{" "} <FaList onClick={toggle}/> List of User List </CardHeader>
            <CardBody>
                <Row>
                    <Col sm={3}>
                        <label>Select User Type : </label>
                        <select id='userType' name='userType' className='form-select' onChange={changeUserType}>
                            <option value="Any">Any</option>
                            <option value="Employee">Employee</option>
                            <option value="Others">Others</option>
                        </select>
                    </Col>
                    <Col sm={5}>
                        <label>Search with : 
                            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                <Fab size="small" color="primary" aria-label="add" onClick={(e)=>{handleChange('1')}}>1</Fab>
                                <Fab size="small" color="secondary" aria-label="add" onClick={(e)=>{handleChange('2')}}>2</Fab>
                                <Fab size='small' color="warning" aria-label="add" onClick={(e)=>{handleChange('3')}}>3</Fab>
                                <Fab size="small" color="primary" aria-label="add" onClick={(e)=>{handleChange('4')}}>4</Fab>
                                <Fab size="small" color="warning" aria-label="add" onClick={(e)=>{handleChange('5')}}>5</Fab>
                                <Fab size='small' color="secondary" aria-label="add" onClick={(e)=>{handleChange('6')}}>6</Fab>
                                <Fab size="small" color="info" aria-label="add" onClick={(e)=>{handleChange('7')}}>7</Fab>
                                <Fab size="small" color="secondary" aria-label="add" onClick={(e)=>{handleChange('8')}}>8</Fab>
                                <Fab size='small' color="success" aria-label="add" onClick={(e)=>{handleChange('9')}}>9</Fab>
                            </Box>
                        </label>
                    </Col>
                    <Col sm={3}>
                        <label>User Id : </label>
                        <input id='userIdName' name='userIdName' onChange={(e)=>{userNameChange(e)}} className='form-control' />
                    </Col>
                    <Col sm={1} className='mt-4'>
                        <Button onClick={searchUser} color='success'> <FaSearch /> </Button>
                    </Col>
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
                userLoading===false && appUsers && appUsers.length>0?
                <Row>
                    <Col sm={12}>
                        <Table striped>
                        {
                            appUsers && appUsers.length>0?
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>User Id</th>
                                    <th>Name</th>
                                    <th>User Types</th>
                                    <th>Roles</th>
                                    <th>Groups</th>
                                    <th>Company</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            :
                            <div></div>
                        }
                            <tbody>
                                {
                                    appUsers && appUsers.length>0 && appUsers.map((user,index)=>(
                                    <tr key={user.id}>
                                            <td style={{width:'2%'}}>{index+1}</td>
                                            <td style={{width:'5%'}}>{user && user.userId}</td>
                                            <td style={{width:'10%'}}>{user && user.firstName} {" "} {user && user.lastName}</td>
                                            <td style={{width:'10%'}}>{user && user.userType}</td>
                                            <td style={{width:'26%'}}>{user && user.email}</td>
                                            <td style={{width:'28%'}}>{user && user.modifiedGroup}</td>
                                            <td style={{width:'5%'}}>{user && user.institution && user.institution.name}</td>
                                            <td style={{width:'14%'}}>
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
                    <List sx={{
                        minWidth: 240,
                        '--List-gap': '0.1rem',
                        '--ListItem-paddingY': '0.9rem',
                        '--ListItem-radius': '8px',
                        '--ListItemDecorator-size': '32px',
                        }}
                    >
                    <table>
                        {
                        roles && roles.map((item, index) => (                            
                           <tr>
                                <td style={{width:'10%'}}> 
                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                    <Fab size="small" color="primary" aria-label="add">{index+1}.</Fab>
                                    </Box>
                                </td>
                                <td className='p-0' style={{width:'40%'}}>
                                <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm', color:'rgb(32,160,181)'}}>                               
                                    <b><BsPersonWorkspace style={{color:'red'}} /></b>
                                    <label>  {item && item.name} </label>
                                </ListItem>
                                </td>
                                <td className='p-2' style={{width:'10%'}}>
                                    <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm', color:'rgb(32,160,181)'}}>                                                                   
                                    
                                    <label style={{height:'1.2rem', marginBottom:'1rem', marginLeft :'1rem'}}>
                                        <FormControlLabel control={<IOSSwitch sx={{ m: 1}} checked={roleAssign==item.id} onChange={handleCheck}/>} label="" name={item.id}/>
                                    </label>
                                    {/*
                                    {    
                                        item && item.assigned===true? 
                                            <label style={{height:'1.2rem', marginBottom:'1rem', marginLeft :'1rem'}}>
                                                <FormControlLabel control={<IOSSwitch sx={{ m: 1}} checked={roleAssign===item.id} onChange={handleCheck}/>} label="" name={item.id}/>
                                            </label>
                                        :
                                            <label style={{height:'1.2rem', marginBottom:'1rem', marginLeft :'1rem'}}>
                                                <FormControlLabel control={<IOSSwitch sx={{ m: 1}} checked={roleNotAssign} onChange={handleCheck}/>} label="" name={item.id}/>
                                            </label>
                                    }   
                                    */}                                                                         
                                    </ListItem>
                                </td>                                
                                <td className='p-1' style={{width:'40%'}}>
                                    <input style={{borderRadius:'.6rem', height:'3.4rem'}} className='form-control'
                                        value={item && item.description}
                                    />                        
                                </td>
                            </tr>                                                       
                        ))
                        }                       
                    </table>   
                    </List>
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

export default UserSetup;
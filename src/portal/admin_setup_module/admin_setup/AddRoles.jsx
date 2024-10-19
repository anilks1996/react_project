import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TiTick } from "react-icons/ti";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import { GiTreeDoor } from "react-icons/gi";
import {ToastContainer, toast } from 'react-toastify';
import { BsPersonWorkspace } from "react-icons/bs";
import { findAllRoles, findAllRolesByUserId } from '../admin_setup_redux/roleSlice';
import Fab from '@mui/material/Fab';
import { findAllUserGroups } from '../admin_setup_redux/userGroupSlice';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useNavigate, useParams } from 'react-router-dom';
import RadioGroup from '@mui/joy/RadioGroup';
import TreeViews from './TreeViews';
import { FaUserGroup } from 'react-icons/fa6';
import { Delete, Edit } from '@mui/icons-material';
import { findAppUserById } from '../../../auth/auth_slice/loginUserSlice';
import { createUserRole, deleteUserRole, updateUserRole } from '../admin_setup_redux/userRoleSlice';
import './ModalViews.css';
import { FaSearch } from 'react-icons/fa';


const AddRoles = () => {
    const {id} = useParams();
    const [modal, setModal] = useState(false);
    const [userRoleObj,setUserRoleObj] = useState(null);
    const dispatch=useDispatch();
    const {userLoading,appUser,appUsers} = useSelector((state)=>state.allstorereducer.user_token);
    const {userRole,userRoles,userRolesByUser} = useSelector((state)=>state.allstorereducer.userRole);
    const {userGroup,userGroups} = useSelector((state)=>state.allstorereducer.userGroup);
    const {loading,roles} = useSelector((state)=>state.allstorereducer.roles);
    const [checkedValue,setCheckedValue]=React.useState();
    const [treeData,setTreeData]= useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const navigatePage=useNavigate();
    useEffect(()=>{
        window.scrollTo({left:'0',top:'0',behavior:'smooth'});
        dispatch(findAppUserById(id));
        dispatch(findAllRolesByUserId(id));
        dispatch(findAllUserGroups());
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
  
    const handleChange=(e)=>{
      if(e.target.value!=undefined){
        setCheckedValue(e.target.value); 
        //alert(e.target.name+", "+e.target.value+", "+userGroupId);
          // if(window.confirm("Are you sure to change f.y.?")){   
          //     setCheckedValue(e.target.value);         
          //     toast.success("Financial year changed.", {
          //         position: "top-center",
          //         autoClose: 2000,
          //         hideProgressBar: false,
          //         closeOnClick: true,
          //         pauseOnHover: true,
          //         draggable: true,
          //         progress: undefined,
          //         theme: "light",
          //     });
          // }
      }       
    }
    const addUserRole=(e,userObj)=>{
      const groupInput= document.getElementById(checkedValue);
      if(groupInput){
        //groupInput.value='Test Group';
        groupInput.value=selectedNode.label;
      }
      //dispatch(findAllRolesByUserId(userObj && userObj.id));
      //toggle();
      //setUserSetup(userObj);
      //dispatch(findUserRoleByAppUserId(userObj && userObj.id));
    }
    
    const handleCheck=(chid,e)=>{       
      //setRoleAssign(e.target.checked ? e.target.name : null);
      //setRoleNotAssign(!roleNotAssign);
      //alert(roleAssign+", "+e.target.name+", "+e.target.value+", "+e.target.checked);
      //const checkvar=document.getElementById(chid);
      //checkvar.checked = true;
      //alert(checkvar.checked+", "+e.target.name);
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

    const buildTree = (list, parentId = null) => {
    return list
        .filter(item => item.parentId === parentId)
        .map(item => ({
            ...item,
            children: buildTree(list, item.id),
        }));
    };  

    const handleNodeSelect=(node)=>{
      setSelectedNode(node);
    }
    
    const selectUserGroup=(e)=>{
        setTreeData(buildTree(userGroups));
        
        toggle();
    }
    const handleInputGroup=(grpId,grpName)=>{
      const groupInput= document.getElementById(checkedValue);
      //alert(groupInput+", "+grpName);
      if(groupInput){
        groupInput.value=grpName;
      }
      groupInput.value=selectedNode.label;
      toggle();
    }

    const updateUserRoles=(userRoleId, roleId, groupId)=>{
      if(checkedValue!=undefined && selectedNode!=undefined){
        if(checkedValue==roleId){
          //Do Nothing let it go
        }else{
          toast.error("Make sure corrosponding role is selected !!", {
            position: "top-center",autoClose: 2000, hideProgressBar: false,
            closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
          });
          return false;
        }
        const groupInput= document.getElementById(checkedValue);
        if(groupInput){
          groupInput.value=selectedNode.label;
        }

        const usrRole={...setUserRoleObj,["id"]:userRoleId,
          ["appUser"]:{"id":id,"userId":appUser && appUser.userId},
          ["role"]:{"id":roleId,"name":"sbi"},
          ["userGroup"]:{"id":groupId,"groupName":"sbi"}
        }
        dispatch(updateUserRole(usrRole));
        dispatch(findAllRolesByUserId(id));
          toast.success("Updated successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
        });
        groupInput.value=selectedNode.label;
        setSelectedNode(null);
        dispatch(findAllRolesByUserId(id));
      }else{
        toast.error("Please select Role & Group !!", {
          position: "top-center",autoClose: 2000, hideProgressBar: false,
          closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
        });
      }
    }

    const addUserRoles=(roleId, groupId)=>{
      if(checkedValue!=undefined && selectedNode!=undefined){
        if(checkedValue==roleId){
          //Do Nothing let it go
        }else{
          toast.error("Make sure corrosponding role is selected !!", {
            position: "top-center",autoClose: 2000, hideProgressBar: false,
            closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
          });
          return false;
        }
        const usrRole={...setUserRoleObj,["appUser"]:{"id":id,"userId":appUser && appUser.userId},
          ["role"]:{"id":roleId,"name":"sbi"},
          ["userGroup"]:{"id":groupId,"groupName":"sbi"}
        }
        dispatch(createUserRole(usrRole));
        dispatch(findAllRolesByUserId(id)); 
        toast.success("Saved successfully"+roles.length, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }); 
      setSelectedNode(null); 
      dispatch(findAllRolesByUserId(id));

      }else{
        toast.error("Please select Role & Group !!", {
          position: "top-center",autoClose: 2000, hideProgressBar: false,
          closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
        });
      } 
    }

    const deleteUserRoles=(userRoleId, roleId)=>{
      if(checkedValue!=undefined){
      if(checkedValue==roleId){
          //Do Nothing let it go
      }else{
        toast.error("Make sure corrosponding role is selected !!", {
          position: "top-center",autoClose: 2000, hideProgressBar: false,
          closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
        });
        return false;
      }
      if(window.confirm("Are you sure to delete?")){  
        dispatch(deleteUserRole(userRoleId)); 
        dispatch(findAllRolesByUserId(id));
        dispatch(deleteUserRole(userRoleId)); 
          toast.success("Deleted successfully", {
              position: "top-center",autoClose: 2000, hideProgressBar: false,
              closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
          });
        }

        console.log(userRoles);
        //alert(roles.length);
        dispatch(findAllRolesByUserId(id));
      }else{
        toast.error("Please select Role !!", {
          position: "top-center",autoClose: 2000, hideProgressBar: false,
          closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
        });
      }
    }
    const handleAddUser=()=>{
      navigatePage("/users");
    }

  return (
    <div className='form-container App'>
        <Card className='p-1 mb-1'>Home / Admin Setup / Add Role</Card>
        <Card className='form-shadow'>
            <CardHeader> 
                <Row>
                    <Col sm={5}>
                      <Button onClick={handleAddUser} className='button-color' title='Click here to search new user'> <FaSearch />&nbsp;Search </Button> &nbsp;
                        <Fab variant="extended" color='success' size='small' onClick={addUserRole}>
                        <TiTick style={{marginRight:'2px', width:'1.4rem', height:'1.4rem'}}/>
                            Save
                        </Fab> 
                    </Col>                
                    <Col sm={5}>
                      <b style={{color:'blue'}}>Name :[{appUser && appUser.userId}] - {appUser && appUser.firstName}</b>
                    </Col>
                    <Col sm={1}></Col>
                    <Col sm={1}>
                        <Button color='danger' onClick={selectUserGroup}> &nbsp;...<FaUserGroup />&nbsp; </Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody className='p-0'>
                <Row>
                <Col sm="11">
                    <RadioGroup aria-label="Your plan" name="userRole" defaultValue="Individual">
                        <List
                            sx={{
                                minWidth: 240,
                                '--List-gap': '0.1rem',
                                '--ListItem-paddingY': '0.6rem',
                                '--ListItem-radius': '8px',
                                '--ListItemDecorator-size': '32px',
                            }}
                        >
                        <table>
                        <thead>
                            <tr>
                                <th style={{width:'5%', marginLeft:'0.3rem'}}>{" "}&nbsp;Index</th>
                                <th style={{width:'35%'}}>Your Role (Or Select Role)</th>
                                <th style={{width:'2%'}}>Status</th>
                                <th style={{width:'4%'}}>User Group</th>
                                <th style={{width:'40%', marginLeft:'0.5rem'}}>{" "}&nbsp; User Group</th>
                                <th style={{width:'8%', marginLeft:'0.1rem'}}>&nbsp; Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        roles && roles.map((item, index) => (
                            <tr key={item.id}>
                            <td style={{width:'5%'}}>
                                <button style={{backgroundColor:'white',border:'none', marginLeft:'0.3rem'}}>&nbsp;{index+1}. </button>                               
                            </td>
                            <td style={{width:'35%'}}>                                                       
                                <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm', color:'rgb(32,160,181)'}}>
                                    <BsPersonWorkspace />
                                    <Radio
                                        overlay
                                        value={item.id}
                                        label={item && item.name}
                                        onChange={handleChange} checked={checkedValue==item.id? true:false}
                                        sx={{ flexGrow: 1, flexDirection: 'row-reverse'}}
                                        slotProps={{
                                        action: ({ checked }) => ({sx: (theme) => ({...(checked && {
                                                inset: -1,
                                                border: '2px solid',
                                                borderColor: theme.vars.palette.primary[500],
                                            }),
                                            }),
                                        }),
                                        }}
                                    />
                                </ListItem>
                            </td>
                            <td style={{width:'2%'}} className='ml-3'>
                                <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm', color:'rgb(32,160,181)'}}>
                                {
                                item && item.assigned===true? 
                                    <FormControlLabel style={{height:'1.4rem', marginLeft:'0.5rem'}} control={<IOSSwitch sx={{ m: 1}} checked={true} onChange={(e)=>{handleCheck(item.id,e)}}/>} label=""/>
                                :
                                    <FormControlLabel style={{height:'1.4rem', marginLeft:'0.5rem'}} control={<IOSSwitch sx={{ m: 1}} checked={false} onChange={(e)=>{handleCheck(item.id,e)}}/>} label=""/>
                                }    
                                </ListItem>
                            </td>
                            <td style={{width:'4%'}}>
                              &nbsp;<Button color='warning' onClick={selectUserGroup} className='p-1 mb-1 form-shadow' title='Select user group'> &nbsp;..<FaUserGroup />&nbsp; </Button>
                            </td>
                            <td className='p-1' style={{width:'40%'}}>  
                              <input style={{borderRadius:'.6rem', height:'2.5rem'}} className='form-control' value={item && item.description} id={item.id}/>                               
                            </td>
                            <td style={{width:'8%'}}>
                            {
                              item && item.assigned===true? 
                              <div>
                              <Fab color='info' size='small' onClick={(e)=>{updateUserRoles((item && item.userRoleId),(item && item.id),(selectedNode && selectedNode.id))}} title='Click here to update'>
                                <Edit style={{marginRight:'2px', width:'1.2rem', height:'1.2rem'}}/></Fab>
                              &nbsp;
                              <Fab style={{backgroundColor:'red',color:'white'}} size='small' onClick={(e)=>{deleteUserRoles((item && item.userRoleId),(item && item.id))}} title='Click here to delete'>
                                <Delete style={{marginRight:'2px', width:'1.2rem', height:'1.2rem'}}/></Fab>
                              </div>  
                              :
                              <Fab color='success' size='small' onClick={(e)=>{addUserRoles((item && item.id),(selectedNode && selectedNode.id))}} title='Click here to add'>
                                <TiTick style={{marginRight:'2px', width:'1.2rem', height:'1.2rem'}}/></Fab>
                            }                               
                            </td>
                            </tr>
                        ))
                        }
                        </tbody>
                        </table>
                        </List>
                        <ToastContainer></ToastContainer>
                    </RadioGroup>
                </Col>
                </Row>

            </CardBody>
            <CardFooter >  
            </CardFooter>
        </Card>
        
        {/* Modal */}
        <Modal isOpen={modal} toggle={toggle} className="custom-modal" size='sm'>
            <ModalHeader toggle={toggle} style={{color:'blue'}}><GiTreeDoor /> User Group</ModalHeader>        
            <ModalBody>  
                <TreeViews data={treeData} onSelect={handleNodeSelect} selectedNodeId={selectedNode ? selectedNode.id : null}/>
                
                {selectedNode && (
                <div className="selected-node-info">
                  <br />
                  <h6>Selected Node : <input id='selectedNodeIds' value={selectedNode.label} className='form-control'/></h6>
                  {/* <p>ID: {selectedNode.id}</p>
                    <p>Label: {selectedNode.label}</p>
                  */}  
                </div>
                )}
            </ModalBody>
            <ModalFooter >
                <Button color='warning' onClick={toggle}>Cancel</Button><Button color='success' onClick={(e)=>{handleInputGroup(selectedNode.id, selectedNode.label)}}>Select</Button>
            </ModalFooter>
        </Modal>
      {/* Modal  */}
    </div>
  )
}

export default AddRoles;
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaList, FaSearch } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import './ModalViews.css';
import Fab from '@mui/material/Fab';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import TreeViews from './TreeViews';
import { useDispatch, useSelector } from 'react-redux';
import { createUserGroup, deleteUserGroup, findAllUserGroups, findUserGroupById, updateUserGroup } from '../admin_setup_redux/userGroupSlice';
import BASE_URL from '../../../serviceUrl/AxiosURL';
import {ToastContainer, toast } from 'react-toastify';

const UserGroups = () => {
    const [modal, setModal] = useState(false);
    const dispatch=useDispatch();
    const [treeData,setTreeData]= useState(null);
    const {userGroup,userGroups} = useSelector((state)=>state.allstorereducer.userGroup);
    useEffect(()=>{
        window.scrollTo({left:'0',top:'0',behavior:'smooth'});
        dispatch(findAllUserGroups());
    },[]);
    const toggle=()=>{
        setModal(!modal);
    }
    const [selectedNode, setSelectedNode] = useState(null);
    const [userGroupObj,setUserGroupObj] = useState();
    const [groupNameValue,setGroupNameValue] = useState(null);
    const [descValue,setDescValue] = useState(null);
    const [parentGroupValue,setParentGroupValue] = useState(null);
    const [parentGroupId,setParentGroupId] = useState(null);
    const [isAdd,setIsAdd] = useState(false);

    function getFormattedDate(date) {
        if(date.getFullYear()!=1970){
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
          const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
          return `${day}-${month}-${year}`;
        }
    }
    const handleChange=(e)=>{
      setUserGroupObj({...userGroupObj,[e.target.name]:e.target.value});
      if(e.target.name==='groupName'){
        setGroupNameValue(e.target.value);
      }else if(e.target.name==='description'){
        setDescValue(e.target.value);
      }
      console.log(userGroupObj);
    }
    const buildTree = (list, parentId = null) => {
      return list
          .filter(item => item.parentId === parentId)
          .map(item => ({
              ...item,
              children: buildTree(list, item.id),
          }));
    };

    const selectUserGroup=()=>{
      dispatch(findAllUserGroups());
      setTreeData(buildTree(userGroups));
      toggle();
    }
    const handleNodeSelect=(node)=>{
      setSelectedNode(node);
    }
    const handleInputGroup= async(grpId,grpName)=>{    
      try {
        const currentUser=localStorage.getItem("current-jwtToken");
        const response = await fetch(BASE_URL+`api/userGroup/byId/${grpId}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
          body: JSON.stringify(),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch record');
        }
        const result = await response.json();
        console.log('Record fetch successfully:', result);
        //alert("Created id="+result && result.id);
        if(result && result.id){
          //alert(result.parentGroup && result.parentGroup.groupName);
          setUserGroupObj(result);
          setParentGroupValue(result.parentGroup && result.parentGroup.groupName);
          setParentGroupId(result.parentGroup && result.parentGroup.id);
          setGroupNameValue(result.groupName);
          setDescValue(result.description);
          setIsAdd(false);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      //dispatch(findUserGroupById(grpId)); 
      setGroupNameValue(selectedNode.label);
      toggle();
    }

    const addUserGroup=(act)=>{
      setIsAdd(true);
      if(act==='addDiv'){
        setGroupNameValue('');
        setDescValue('');
        setParentGroupId(selectedNode.id);
        setParentGroupValue(selectedNode.label);
        //alert(groupNameValue+", "+descValue);
      }else if(act==='saveDiv'){
        const usrGrp={...userGroupObj,["id"]:null,
          ["groupName"]:groupNameValue,
          ["description"]:descValue,
          ["parentGroup"]:{"id":parentGroupId,"groupName":parentGroupValue}
        }
        dispatch(createUserGroup(usrGrp));
                 
        toast.success("Data saved successfully.", {
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
      dispatch(findAllUserGroups());
    }
    const updateUsrGroup=()=>{
      const usrGrp={...userGroupObj,["id"]:selectedNode.id,
        ["groupName"]:groupNameValue,
        ["description"]:descValue,
        ["parentGroup"]:{"id":parentGroupId,"groupName":parentGroupValue}
      }
      dispatch(updateUserGroup(usrGrp));
      dispatch(findAllUserGroups());

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

    const deleteUsrGroup=()=>{
      if(window.confirm("Are you sure to delete?")){         
        dispatch(deleteUserGroup(selectedNode.id));
        setGroupNameValue(null);
        setDescValue(null);
        setParentGroupValue(null);
        setParentGroupId(null);
      }else{
        return false;
      }
      dispatch(findAllUserGroups());
      dispatch(findAllUserGroups());
      toast.success("Data deleted successfully.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    dispatch(findAllUserGroups());
    }

  return (
    <div className='form-container App'>
        <Card className='p-1 mb-1'>Home / Admin Setup / UserGroups</Card>
        <Card>
            <CardHeader><Button onClick={selectUserGroup} className='button-color' title='Click here to add new user'> <FaPlus /> </Button>{" "} <FaList/> List of User Groups </CardHeader>
            <CardBody>
              <Row>
                <Col sm={6}></Col>
                <Col sm={6}>
                  <Fab variant="extended" color='success' size='small' onClick={(e)=>{addUserGroup('addDiv')}}>&nbsp; Add New &nbsp;</Fab> &nbsp;&nbsp;
                  {/*<Fab variant="extended" color='info' size='small' onClick={updateUsrGroup}>&nbsp; Update &nbsp;</Fab> &nbsp;&nbsp; */}
                  <Fab variant="extended" color='warning' size='small' onClick={deleteUsrGroup}>&nbsp; Delete &nbsp;</Fab> 
                </Col>
                <hr />
              </Row>
                <Row>
                  <Col sm={6}></Col>
                  <Col sm={6}>
                      <label><b>Group Name : </b></label>
                      <input id='groupName' name='groupName' type='text' value={groupNameValue} onChange={handleChange} className='form-control'/>
                  </Col>
                </Row>
                <Row className='mt-1'>
                  <Col sm={6}></Col>
                  <Col sm={6}>
                      <label><b> Group Description : </b></label>
                      <textarea id='description' name='description' value={descValue} className='form-control' rows={3} cols={100} onChange={handleChange}/>
                  </Col>
                </Row>
                <Row className='mt-1'>
                  <Col sm={6}></Col>
                  <Col sm={6}>
                      <label><b> Parent Group Name: </b></label>
                      <input id='parentGroup.id' name='parentGroup.id' type='text' value={parentGroupValue} onClick={selectUserGroup} className='form-control' placeholder='--- Select User Group ---'/>
                  </Col>
                </Row>
                <Row> 
                  <Col sm={6}></Col>   
                    <Col sm={6} className='mt-2'>
                    {
                      isAdd===false ?
                      <Button onClick={updateUsrGroup} color='success'>&nbsp; Update &nbsp;</Button>
                      :
                      <Button onClick={(e)=>{addUserGroup('saveDiv')}} color='success'>&nbsp; Save &nbsp;</Button>
                    }
                        
                    </Col>
                </Row>
            </CardBody>
            <CardFooter className='p-0 mt-2'>  
                
            </CardFooter>
        </Card>

        {/* Modal */}
        <Modal isOpen={modal} toggle={toggle} className="custom-modal" size='sm'>
            <ModalHeader toggle={toggle} style={{color:'blue'}}> Modal Title</ModalHeader>
            <ModalBody>
              <TreeViews data={treeData} onSelect={handleNodeSelect} selectedNodeId={selectedNode ? selectedNode.id : null}/>
              {selectedNode && (
                <div className="selected-node-info">
                  <br />
                  <h6>Selected Node : <input id='selectedNodeIds' value={selectedNode.label} className='form-control'/></h6>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
                <Button color="primary" onClick={(e)=>{handleInputGroup(selectedNode.id, selectedNode.label)}}>Select</Button>
            </ModalFooter>
        </Modal>
        {/* Modal  */}
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default UserGroups;
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GrStatusGoodSmall } from "react-icons/gr";
import {ToastContainer, toast } from 'react-toastify';
import { BsPersonWorkspace } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import { RxCrossCircled } from "react-icons/rx";
import './ModalViews.css';
import { FaBackward, FaCross, FaSearch } from 'react-icons/fa';
import { Switch } from '@mui/material';
import { findAllDashboardWidgets } from '../admin_setup_redux/dashboardWidgetsSlice';
import { createRoleDashboard, deleteRoleDashboard, findRoleDashboardByRoleId } from '../admin_setup_redux/roleDashboardsSlice';
import { getActiveUserId } from '../../../auth/auth_slice/loginUserSlice';
import { findAllRolesByUserId } from '../admin_setup_redux/roleSlice';


const DashboardSetting = () => {
    const {id} = useParams();
    const dispatch=useDispatch();
    const {dwLoading,dashboardWidget,dashboardWidgets} = useSelector((state)=>state.allstorereducer.dashboardWidget);
    const {rLoading,roleDashboard,roleDashboards} = useSelector((state)=>state.allstorereducer.roleDashboard);
    const {loading,roles} = useSelector((state)=>state.allstorereducer.roles);
    const {activeUserId,loggedInUser} = useSelector((state)=>state.allstorereducer.user_token);
    const [checkedValue,setCheckedValue]=React.useState();
    const navigatePage=useNavigate();
    const [roleValue,setRoleValue] = useState(null);
    const [roleDashboardObj,setRoleDashboardObj] = useState();
    useEffect(()=>{
        dispatch(getActiveUserId());
        window.scrollTo({left:'0',top:'0',behavior:'smooth'});

        dispatch(findAllDashboardWidgets());
        if(activeUserId!=null && activeUserId!=""){
          dispatch(findAllRolesByUserId(activeUserId));
        }else if(loggedInUser && loggedInUser.id){
          dispatch(findAllRolesByUserId(loggedInUser.id));
        }
        
    },[]);
    
    const goBack=()=>{
      window.history.back();
    }
    
    const handleAddCheck=(wgtId,e)=>{       
      if(e.target.checked){
        const roleDashObj={...roleDashboardObj,["widgets"]:{"id":wgtId,"title":"sbi"},
        ["role"]:{"id":roleValue, "name":"sbi"}
        };
        dispatch(createRoleDashboard(roleDashObj));
        toast.success("Addedd successfully", {
          position: "top-center",autoClose: 1000, hideProgressBar: false,
          closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
        });
      }
    }
    
    const handleRole=(e)=>{
      if(e.target.value !=-1){
        setRoleValue(e.target.value);
        dispatch(findRoleDashboardByRoleId(e.target.value)); 
      }
    }
    
    const deleteRoleWidget=(e,roleDashboardId)=>{
      if(roleDashboardId!=undefined){
      if(window.confirm("Are you sure to delete?")){  
        dispatch(deleteRoleDashboard(roleDashboardId));
          toast.info("Deleted successfully", {
              position: "top-center",autoClose: 1000, hideProgressBar: false,
              closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
          });
        }
      }
    }

  return (
    <div className='form-container App'>
        <Card className='p-1 mb-1'>Home / Admin Setup / Add Role</Card>
        <Card className='form-shadow'>
            <CardHeader> 
                <Row>
                    <Col sm={5}>
                      <Button onClick={goBack} className='button-color' title='Click here to go back'> <FaBackward />&nbsp; </Button> &nbsp;
                    </Col>                
                    <Col sm={5}>
                    </Col>
                    <Col sm={1}></Col>                   
                </Row>
            </CardHeader>
            <CardBody className='p-2'>
              <Row>
                <Col sm="6">
                <Card>                  
                  <table style={{width:'90%'}}>
                    <thead>
                        <tr>
                            <th style={{ marginLeft:'0.3rem'}}>{" "}&nbsp;Index</th>
                            <th>Select Widgets</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      dashboardWidgets && dashboardWidgets.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                            <button style={{backgroundColor:'white',border:'none', marginLeft:'0.3rem'}}>&nbsp;{index+1}. </button>                               
                        </td>
                        <td >                                                       
                          <Card className='form-shadow'>
                            <CardBody className='p-2'>
                              <table>
                                <tbody>
                                  <tr>
                                    <td style={{width:'10%'}}><BsPersonWorkspace style={{color:'rgb(32,160,181)', height:'1.2rem', width:'1.2rem'}} /></td>
                                    <td style={{width:'75%'}}><label style={{color:'rgb(32,160,181)', fontWeight:'bold'}}>{item.title}</label></td>
                                    {
                                      roleDashboards && roleDashboards.length>0 && roleDashboards.map((rol,index)=>(
                                        item.id===rol.dashboardWidgets.id?
                                        <td style={{width:'5%'}}><GrStatusGoodSmall style={{color:'red'}}/> </td>
                                        :
                                        item.id!=rol.dashboardWidgets.id?
                                          <></>
                                          :
                                          <></>
                                      ))
                                    }
                                    <td style={{width:'10%'}}><Switch checked={checkedValue} name={item.id} color="success" onChange={(e)=>{handleAddCheck(item.id,e)}}/></td>                         
                                  </tr>
                                </tbody>
                              </table>
                            </CardBody>
                          </Card>
                        </td>
                      </tr>                            
                      ))
                    }
                    </tbody>
                  </table> 
                  </Card>                   
                </Col>

                <Col sm={6}>
                <Row>
                  <Card>
                    <Row className='p-1 mb-1'>
                      <Col sm={3}><label><b>Select Role : </b></label></Col>
                      <Col sm={9}>
                        <select id='role.id' name='role.id' className='form-control' onChange={(e)=>{handleRole(e)}} value={roleValue}>
                          <option value={-1}>-- Select role --</option>
                          {
                            roles && roles.length>0 && roles.map((rol)=>(
                              <option value={rol.id}> {rol.name} </option>
                            ))
                          }
                        </select>
                      </Col>
                    </Row>
                  </Card>
                </Row>
                <Row>
                  <Card>
                    <table style={{width:'90%'}}>
                    <thead>
                        <tr>
                            <th style={{ marginLeft:'0.3rem'}}>{" "}&nbsp;Index</th>
                            <th>Selected Widgets</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      roleDashboards && roleDashboards.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                            <button style={{backgroundColor:'white',border:'none', marginLeft:'0.3rem'}}>&nbsp;{index+1}. </button>                               
                        </td>
                        <td >                                                       
                          <Card className='mb-1 form-shadow' style={{backgroundColor:'#e5f7e5'}}>
                            <CardBody className='p-3'>
                              <table>
                                <tbody>
                                  <tr>
                                    <td style={{width:'20%', height:'5%'}}><BsPersonWorkspace style={{color:'green', height:'1.2rem', width:'1.2rem'}} /></td>
                                    <td style={{width:'78%'}}><label style={{color:'green', fontWeight:'bold'}}>{item && item.dashboardWidgets && item.dashboardWidgets.title}</label></td>
                                    <td style={{width:'2%'}}> <button style={{color:'blue',border:'none'}} onClick={(e)=>{deleteRoleWidget(e,item.id)}} title='Click here to remove'> <RxCrossCircled style={{color:'red', height:'1.4rem', width:'1.4rem'}}/> </button> </td>
                                  </tr>
                                </tbody>
                              </table>
                            </CardBody>
                          </Card>
                        </td>
                      </tr>                            
                      ))
                    }
                    </tbody>
                  </table>
                  </Card>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter >  
            </CardFooter>
        </Card>
        <ToastContainer></ToastContainer>
        {/* Modal */}
        
      {/* Modal  */}
    </div>
  )
}

export default DashboardSetting;
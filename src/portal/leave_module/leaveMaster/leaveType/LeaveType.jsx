import React, {useEffect, useState} from 'react';
import { FaPencilAlt, FaPlus, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Card,CardHeader,CardBody,CardTitle,Button,CardFooter,Row,Col, FormGroup, ButtonGroup,Table,Media } from "reactstrap";
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ArrowBack } from "@mui/icons-material";
import { DeleteOutline } from '@mui/icons-material';
import { createLeaveType, deleteLeaveType, editLeaveType, showLeaveType } from '../../leave_redux/slices/leave_slice/leaveTypeSlice';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const LeaveType = ({direction, ...args}) => {
    const [modal, setModal] = useState(false);
    const dispatch=useDispatch();
    const navigatepage =useNavigate();
    const [updateLeave, setUpdateLeave]=useState();
    const [filteredList,setFilteredList]=useState([]);
    const toggle1 = () =>{
      setModal(!modal);
      setUpdateLeave(null);
    }
    const {leaveTypes,loading} = useSelector((state)=>state.allstorereducer.lvType);
    const handleChange=(e)=>{
      setUpdateLeave({...updateLeave, [e.target.name]:e.target.value})
      console.log(updateLeave);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createLeaveType(updateLeave));
      setModal(false);
      toast.success("Data saved successfully.");
      dispatch(showLeaveType());
      setUpdateLeave(null);
      dispatch(showLeaveType());
    }
    useEffect(()=>{
      dispatch(showLeaveType());
      setFilteredList(leaveTypes);
    },[]);

    const showEditLvType=(lvObj)=>{
      setModal(true);
      setUpdateLeave(lvObj);
    }
    const updateLeaveTypeList=(empObj)=>{
      dispatch(editLeaveType(empObj));
      setModal(false);
      toast.success("Data updated successfully.");
      dispatch(showLeaveType());
    }
     const [addleave, setLeave]=useState({
      leaveTypeCode:'',
      leaveTypeName:'',
      leaveDescription:'',
    });
     const [leave,setEmployee]=useState({
      code:'',
      leavetype:'',
      leaveName:'',
    });
    const [showTable, setShowTable]=useState(false);

    const filterByName=(e)=>{
      const filterEmp=leaveTypes.filter((emp)=>emp.name.includes(e.target.value));
      setFilteredList(filterEmp);
    }
    const showLeaveList=(e)=>{
      const filterEmp=leaveTypes.filter((emp)=>emp.name.includes(e.target.value));
      setFilteredList(filterEmp);
      alert(leaveTypes);
      setShowTable(true);
    }
    const filterOptionChange=(event, field)=>{
      alert('event='+field);
    }

    const [leaveType,setLeavaType]=useState();
    function selectedSType(data){
      setLeavaType(data);
     }

     const deleteLvType=(lvId)=>{
      dispatch(deleteLeaveType(lvId));
      toast.success("Data deleted successfully.");
      dispatch(showLeaveType());
      
     }
     const Goback = () => {
      window.history.back();
    }

    return (
    <div>
        <form>
        <Card style={{width:'80rem'}} className='form-shadow'>
        <CardHeader>
        <i><label>Leave Management / Leave Masters / Leave Type </label></i>                                          
      </CardHeader>
        <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack></ArrowBack> </Button>
        { " "}
              <Button id='radioA' name='Button' color="danger" onClick={toggle1}><FaPlus/>Create New Leave Type</Button>
       </CardHeader>
        </Card>
              <Modal isOpen={modal} toggle={toggle1} {...args}>
                {
                  updateLeave && updateLeave.id!=undefined?
                  <ModalHeader toggle={toggle1}>Update Leave Type</ModalHeader>
                  :
                  <ModalHeader toggle={toggle1}>Add New Leave Type</ModalHeader>
                }
                <ModalBody>
                <Card className='form-shadow'>
                <CardHeader  className='p-0'>
                      <i> <label>Leave Masters / Leave Type / Add New Leave Type</label></i>
                    </CardHeader>
                <CardBody>
                  <ButtonGroup vertical>
                      <Card className='p-4'>
                            <Row>
                                  <Col sm='10'>
                                  <span className='text-danger'>*</span>
                                    <label>Leave Type Code</label>
                                    <input type='text' id="code" name='code' className='form-control' onChange={handleChange} value={updateLeave && updateLeave.code}/>
                                </Col>
                            </Row>
                              <Row>
                                  <Col sm='10'>
                                  <span className='text-danger'>*</span>
                                    <label>Leave Type Name</label>
                                    <input type='text' id="name" name='name' className='form-control' onChange={handleChange} value={updateLeave && updateLeave.name}/>
                                  </Col>
                              </Row>
                                  <Row>
                                  <Col sm='10'>
                                    <label>Description</label>
                                    <input type='text' id="description" name='description' className='form-control' onChange={handleChange} value={updateLeave && updateLeave.description}/>
                                
                                  </Col>
                                </Row>
                            </Card>
                                </ButtonGroup>
                                </CardBody>
                                </Card>
                                </ModalBody>
                                <ModalFooter>
                       
                        {
                          updateLeave && updateLeave.id!=undefined?
                          <Button color='success' onClick={(e)=>{updateLeaveTypeList(updateLeave)}}>Update</Button>
                          :
                          <Button color='success' onClick={handleSubmit}>Save</Button>
                        }

                        {' '}
                        <Button color="secondary" onClick={toggle1}>
                          Cancel
                        </Button>
                  </ModalFooter>
              </Modal>
        {/* Modal  */}
                <Card className='form-shadow'>
                    <CardBody>
                    <ButtonGroup vertical>
                    <Card className='p-4'>
                        <Row>
                          <Col sm='1'>
                            <Button color="danger" id='radioA' name='filter-option' onClick={(e)=>filterOptionChange(e, 'radioA')}>
                            A </Button>
                          </Col>
                          <Col sm='3'>
                            
                            <label>Leave Type Code</label>
                            <input type="text" placeholder="" id="name" name='name'  className='form-control'
                            onChange={filterByName} value={updateLeave && updateLeave.name}/>
                          </Col>
                          <Col sm='3'>
                            <label>Leave Type Name</label>
                            <input type="text" placeholder="" id="name" name='name' className='form-control'
                             onChange={filterByName} value={updateLeave && updateLeave.name}/>
                          </Col>
                          <Col sm='3'>
                            <label>Name Contain</label>
                            <input type='text' id="name" name='name' className='form-control' onChange={filterByName} value={updateLeave && updateLeave.name}/>
                          </Col>
                          <Col sm='2'>                         
                          <Button class="btn btn-primary pull-right" id='radioA' name='Button' color='success'  onClick={showLeaveList}>Filter..</Button> 
                          </Col>
                        </Row>
                    </Card>                            
                    </ButtonGroup>                   
                    </CardBody>
                    
                    <CardBody>
                      <CardHeader>Table</CardHeader>
                      {
                                
                      <Table> 
                        <thead> 
                            <tr> 
                                <th>S.No</th> 
                                <th>Leave Code</th> 
                                <th>Leave Name</th> 
                                <th>Description</th>
                                <th>Actions</th>
                            </tr> 
                          </thead> 
                          <tbody> 
                              {
                                filteredList && filteredList.map((lvTyp,index)=>(
                                  <tr>
                                    <td key={lvTyp.id}>{index+1}</td>
                                    <td>{lvTyp.code}</td>
                                    <td>{lvTyp.name}</td>
                                    <td>{lvTyp.description}</td>
                                    <td><Link onClick={(e)=>{showEditLvType(lvTyp)}}><FaPencilAlt style={{color:'green'}}/></Link>
                                    <Link onClick={(e)=>{deleteLvType(lvTyp.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                                    <Link to="#"><FaSearch/></Link>
                                    </td>
                                  </tr>
                                ))
                              }
                          
                              {/* <tr> 
                                  <td>1</td> 
                                  <td>STL</td> 
                                  <td>Station Leave</td> 
                                  <td>Station Leave</td>
                                  <td className='flex justify-between'>
                                  <Link onClick={toggle1}><FaPencilAlt style={{color:'Green'}}/></Link> &nbsp;<FaSearch style={{color:'Blue'}}/>&nbsp;<Link to={toggle1}><DeleteOutline style={{color:'Red'}}/></Link></td>
                            
                              </tr> 
                              <tr> 
                                  <td>2</td> 
                                  <td>SL</td> 
                                  <td>Sick Leave</td> 
                                  <td>Sick Leave</td>
                                  <td className='flex justify-between'>
                                  <Link onClick={toggle1}><FaPencilAlt style={{color:'Green'}}/></Link> &nbsp;<FaSearch style={{color:'Blue'}}/>&nbsp;<Link to={toggle1}><DeleteOutline style={{color:'Red'}}/></Link></td>
                          
                              </tr> 
                              <tr> 
                                  <td>3</td> 
                                  <td>CL</td> 
                                  <td>Casual Leave</td> 
                                  <td>Casual Leave</td>
                                  <td className='flex justify-between'>
                                  <Link onClick={toggle1}><FaPencilAlt style={{color:'Green'}}/></Link> &nbsp;<FaSearch style={{color:'Blue'}}/>&nbsp;<Link to={toggle1}><DeleteOutline style={{color:'Red'}}/></Link></td>
                              </tr>  */}
                          </tbody> 
                      </Table> 
}
                </CardBody>
                <CardFooter>
                       Footer
                    </CardFooter>
                
                    
                </Card>
                <ToastContainer />
        </form>
       </div>
  )
}

LeaveType.prototype={
  direction:PropTypes.string,
}
export default LeaveType;
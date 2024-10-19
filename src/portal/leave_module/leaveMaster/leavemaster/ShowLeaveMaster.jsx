import React, {useEffect,useState} from 'react'
import { FaPlus,FaPencilAlt, FaSearch } from 'react-icons/fa';
import { Link,Navigate, useNavigate } from 'react-router-dom';
import { Card,CardHeader,CardBody,CardTitle,Button,Row,Col, ButtonGroup, CardFooter,Table } from "reactstrap";
import { PropTypes } from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DeleteOutline } from '@mui/icons-material';
import Switch from '@mui/material/Switch';
import { ArrowBack } from "@mui/icons-material";
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { showLeaveType } from '../../leave_redux/slices/leave_slice/leaveTypeSlice';
import { createLeaveMaster, deleteLeaveMaster, editLeaveMaster, showLeaveMasters } from '../../leave_redux/slices/leave_slice/leaveMasterSlice';


const ShowLeaveMaster= ({direction, ...args}) => {
    const [modal, setModal] = useState(false);
    const dispatch=useDispatch();
    const navigatepage =useNavigate();
    const [updateLeaveMaster, setUpdateLeaveMaster]=useState();
    const [filteredList,setFilteredList]=useState([]);
    const toggle1 = () => {
      setUpdateLeaveMaster(null);
      setModal(!modal);
    }
    const label = { inputProps: {'aria-label': 'Switch' } };
    const {leaveTypes,loading} = useSelector((state)=>state.allstorereducer.lvType);
    const {leaveMasters} = useSelector((state)=>state.allstorereducer.lvMaster);
    const handleChange=(e)=>{
      setUpdateLeaveMaster({...updateLeaveMaster, [e.target.name]:e.target.value})
      console.log(updateLeaveMaster);
    } 
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createLeaveMaster(updateLeaveMaster));
      setModal(false);
      toast.success("Data saved successfully.");
      dispatch (showLeaveMasters());
      setUpdateLeaveMaster(null);
      dispatch(showLeaveMasters());
    }
    useEffect(()=>{
      dispatch(showLeaveType());
      dispatch(showLeaveMasters());
      setFilteredList(leaveMasters);
    },[]);
    const showUpdatelvMaster=(lvObj)=>{
      setModal(true);
      setUpdateLeaveMaster(lvObj);
    }   
    const updateLeaveMasterList=(empObj)=>{
      dispatch(editLeaveMaster(empObj));
      setModal(false);
      toast.success("Data updated successfully.");
    }
    const [showTable, setShowTable]=useState(false);

    const filterByName=(e)=>{
      const filterEmp=leaveMasters.filter((emp)=>emp.name.includes(e.target.value));
      setFilteredList(filterEmp);
    }
    

    const showLeaveList=(e)=>{
      const filterEmp=leaveMasters.filter((emp)=>emp.name.includes(e.target.value));
      setFilteredList(filterEmp);
      alert(leaveMasters);
      setShowTable(true);
    }
    const filterOptionChange=(event, field)=>{
      alert('event='+field);
    }
    const saveLeaveMaster=(event,field)=>{
      alert('event='+field);
      navigatepage("/leaveMaster/leavemaster/AddLeaveMaster");
    };
    const [leaveType, setLeaveType]=useState();
    function selectedSType(data){
      setLeaveType(data);
    }
    const deleteLvMaster=(lvId)=>{
      dispatch(deleteLeaveMaster(lvId));
      toast.success("Data deleted successfully.");
      dispatch(showLeaveMasters());
    }
     const Goback = () => {
      window.history.back();
    }
    return (
      <div>
        <form>
          <Card style={{width:'80rem'}} className='form-shadow'>
          <CardHeader>
              <i><label>Leave Management / Leave Master / Leave Master </label></i>                                          
             </CardHeader>
            <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack></ArrowBack> </Button>
            {" "}
              <Button id='radioA' name='Button' color="danger" onClick={toggle1}><FaPlus/>Add Leave Master</Button>
             </CardHeader>
             <Modal isOpen={modal} toggle={toggle1} {...args}>
                {
                  updateLeaveMaster && updateLeaveMaster.id!=undefined?
                  <ModalHeader toggle={toggle1}>Update Leave Master</ModalHeader>
                  :
                  <ModalHeader toggle={toggle1}>Add New Leave Master</ModalHeader>
                }
            <ModalBody>
              <Card className='form-shadow'>
               <CardHeader  className='p-0'>
               <i> <label>Leave Master / Add New Leave Master</label></i>
               </CardHeader>
               <CardBody>
                <Table>
                  <thead>
                    <th> 
                    <span className='text-danger'>*</span>             
                    <label>Leave Type</label>
                    <select placeholder="select-name" className='form-select' id="leaveType.id" onChange={(e)=>handleChange(e,'leaveType.name')}
                    value={updateLeaveMaster && updateLeaveMaster.leaveType && updateLeaveMaster.leaveType.id}>
                    <option value={-1}>-- select --</option> 
                    {
                      leaveTypes.map((leaveT)=>(
                      <option value={leaveT.id}>{leaveT.code} - {leaveT.name}</option>
                      ))
                    }
                    </select>  
                               
                    </th> 
                    </thead>
                    <thead>
                    <th>
                    <span className='text-danger'>*</span>  
                    <label>Leave Code</label>
                    <input type='text' id="code" name='code' className='form-control' onChange={handleChange} value={updateLeaveMaster && updateLeaveMaster.code}/>
                    </th>
                    </thead>
                    <thead>
                    <th>
                    <span className='text-danger'>*</span>
                    <label>Leave Name</label>
                    <input type='text' id="name" name='name' className='form-control' onChange={handleChange} value={updateLeaveMaster && updateLeaveMaster.name}/>
                    </th>
                    </thead>
                    <thead>
                    <th>   
                    <span className='text-danger'>*</span>               
                      Exclude Holidays
                    <Switch id='exclude' name='exclude' className='form-control' onChange={handleChange} value={updateLeaveMaster && updateLeaveMaster.name} {...label}/>
                        {/* <Select options={excludeHoliday} id='id' value={exclude} */}
                       {/* // onChange={(e)=>{selectedEType(e)}} */}
                      {/* />                       */}
                    </th>
                    </thead>
                    <thead>
                    <th>
                    <span className='text-danger'>*</span>             
                      Allow Prefix Suffix 
                      <Switch id='exclude' name='exclude' className='form-control' onChange={handleChange} value={updateLeaveMaster && updateLeaveMaster.suffix} {...label} defaultChecked/>
                      {/* <Select options={SuffixHoliday} id='id' value={suffix} */}
                        {/* //onChange={(e)=>{selectedSType(e)}} */}
                      {/* />                       */}
                    </th> 
                    </thead>
                    <thead>
                    <th>
                    <label>Description 
                    <textarea name="postContent" rows={4} cols={50} value={updateLeaveMaster && updateLeaveMaster.description} onChange={handleChange}/></label>
                    </th>
                    </thead>
                </Table>
              </CardBody>
             </Card>
                 </ModalBody>
                  <ModalFooter>
        {
                          updateLeaveMaster && updateLeaveMaster.id!=undefined?
                          <Button color='success' onClick={(e)=>{updateLeaveMasterList(updateLeaveMaster)}}>Update</Button>
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
             <CardBody>
             <ButtonGroup vertical>
             <Card className='p-4'>
              <Row>
              <Col sm='5'>
                    <label>Leave Type</label>
                    <select id='leaveType.id' name='leaveType.id' value={leaveType && leaveType.id} className='form-select'>
                       <option value={-1}>-- select --</option> 
                          {
                            leaveTypes.map((leaveT)=>(
                            <option value={leaveT.id}>{leaveT.code} - {leaveT.name}</option>
                            ))
                          }
                    </select>      
                    </Col>
                    <Col sm='4'>
                    <label>Leave Master Name</label>
                        <input type='text' id="name" name='name' className='form-control' onChange={filterByName} value={updateLeaveMaster && updateLeaveMaster.name}/>      
                    </Col>
                    <Col sm='3'>
                    <Button class="btn btn-primary pull-right" id='radioA' name='Button' color='success'  onClick={showLeaveList}>Filter..</Button> 
                    </Col>
                </Row>
                </Card>
                </ButtonGroup>
              </CardBody>
             <CardBody>
              <CardHeader>Table</CardHeader>
                     
                      <Table> 
                      <thead> 
                      <tr>
                        <th>Sl. No.</th>
                        <th>Leave Type</th> 
                        <th>Leave Code Master</th> 
                        <th>Leave Name Master</th> 
                        <th>Exclude Holidays</th>
                        <th>Allow Prefix Suffix</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr> 
                      </thead> 
                      <tbody> 
                        {
                          filteredList && filteredList.map((ele,index)=>(
                            <tr>
                              <td key={ele.id}>{index+1}</td>
                              <td>{ele.leaveType && ele.leaveType.name}</td>
                              <td>{ele.code}</td>
                              <td>{ele.name}</td>
                              <td>{ele.excludeHoliday}</td>
                              <td>{ele.prefixSuffix}</td>
                              <td>{ele.description}</td>
                              <td><Link onClick={(e)=>{showUpdatelvMaster(ele)}}><FaPencilAlt style={{color:'Green'}}/></Link>
                              &nbsp;<Link onClick={(e)=>{deleteLvMaster(ele.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                              <Link to=""><FaSearch/></Link>
                              </td>                         
                            </tr>
                          ))
                        }
                      {/* <tr> 

                        <td>1</td> 
                        <td>CCL</td> 
                        <td>Child Care Leave</td> 
                        <td>Child Care Leave</td>
                        <td><Link onClick={toggle1}><FaPencilAlt style={{color:'Green'}}/></Link> &nbsp;<FaSearch style={{color:'Blue'}}/>&nbsp;<Link to={toggle1}><DeleteOutline style={{color:'Red'}}/></Link></td>
                            
                      </tr> 
                      <tr> 
                        <td>2</td> 
                        <td>SL</td> 
                        <td>Sick Leave</td> 
                        <td>Sick Leave</td>
                        <td><Link onClick={toggle1}><FaPencilAlt style={{color:'Green'}}/></Link> &nbsp;<FaSearch style={{color:'Blue'}}/>&nbsp;<Link to={toggle1}><DeleteOutline style={{color:'Red'}}/></Link></td>
                            
                      </tr> 
                      <tr> 
                        <td>3</td> 
                        <td>CL</td> 
                        <td>Casual Leave</td> 
                        <td>Casual Leave</td>
                        <td><Link onClick={toggle1}><FaPencilAlt style={{color:'Green'}}/></Link> &nbsp;<FaSearch style={{color:'Blue'}}/>&nbsp;<Link to={toggle1}><DeleteOutline style={{color:'Red'}}/></Link></td>
                        </tr> 
                   */}
                </tbody> 
            </Table> 
                    </CardBody>
                    <CardFooter>
                       Footer
                    </CardFooter>
                    <ToastContainer />
                   </Card>
          </form>
      </div>
    )
  }
  
  ShowLeaveMaster.prototype={
    direction:PropTypes.string,
  }
  
  export default ShowLeaveMaster;
 
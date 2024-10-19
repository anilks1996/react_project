import { ArrowBack, Delete, DeleteOutline} from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { fetchAllEmployeesCols, showEmployeeById, showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { Button, Card, CardBody, CardFooter,Col, Row, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showStaffType } from '../establishment_redux/slices/establishment_slice/staffTypeSlice';
import { showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { showDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';
import { createTerminationService, editTerminationSR, showServiceRegisterById, showServiceRegistersByTypesStatus } from '../establishment_redux/slices/establishment_slice/serviceRegisterSlice';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { FaPencilAlt, FaSearch } from 'react-icons/fa';


const ServiceStatusUpdateList = () => {
    const dispatch = useDispatch();
    const [employeeName, setEmployeeName] = useState([]);
    const [employee,setEmployee]=useState();
    const {employeeSelection,employeeById} = useSelector((state)=>state.allstorereducer.employeeData);
    const {serviceRegisters,serviceRegister,srloading} = useSelector((state)=>state.allstorereducer.srRegister);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const [modal, setModal] = useState(false);
    const [isEmpDetail,setIsEmpDetail] = useState(false);
    const [staffType,setStaffType]=useState();
    const [employeeType,setEmployeeType]=useState();
    const [fromDate,setFromDate]=useState();
    const [srStatus,setSrStatus]=useState();
    const [saveRegister,setSaveRegister] = useState(null);
    const [sRegister,setSRegister] = useState();
    const [srdata,setSrdata] = useState([]);

    const toggle = () =>{
      setModal(!modal);
      setEmployee(null);
      setIsEmpDetail(false);
      //alert(modal)
      if(modal){setSaveRegister(null);}
    }    
    const goback=()=>{
        window.history.back();
    }
    const addNew=()=>{
      dispatch(showServiceRegisterById(0)); 
      setEmployeeName(null);       
      setFromDate(getFormattedDate(new Date()));   
      setEmployeeType(null);    
      setStaffType(null);   
      setSrStatus(null); 
      toggle();
    }
    useEffect(()=>{
      dispatch(showEmployeePopup());
      dispatch(fetchAllEmployeesCols());
      dispatch(showDesignation());
      dispatch(showStaffType());
      dispatch(showEmployeeType());
      dispatch(showDepartment());
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);
    
    function handleEmpSelect(data,field) {
      console.log(employee);
      setEmployeeName(data);
      dispatch(showEmployeeById(data.value));
      //alert('id: '+employeeById+", "+isEmpDetail)
      setIsEmpDetail(true);
      setSaveRegister({...saveRegister,['employee']:{'id':data.value,'code':'SBI'}});
      //dispatch(showServiceRegisterById(data.value));
  }
  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
    return `${year}-${month}-${day}`;
  }
  const handleChange=(e)=>{
    if(e.target.name==='dept.id'){
      setSRegister({...sRegister,['dept']:{'id':e.target.value,'code':'SBI'}});
    }else if(e.target.name==='desig.id'){
      setSRegister({...sRegister,['desig']:{'id':e.target.value,'code':'SBI'}});
    }
    console.log(sRegister);
  }
  const handleSaveChange=(e)=>{
    //alert(e.target.name)
    if(e.target.name==='type'){
      setSrStatus(e.target.value);
      setSaveRegister({...saveRegister,['type']:e.target.value});
    }else if(e.target.name==='empType.id'){
      setEmployeeType(e.target.value);
      setSaveRegister({...saveRegister,['empType']:{'id':e.target.value,'code':'SBI'}});
    }else if(e.target.name==='stfType.id'){
      setStaffType(e.target.value);
      setSaveRegister({...saveRegister,['stfType']:{'id':e.target.value,'code':'SBI'}});
    }else if(e.target.name==='dateOfAction'){
      setFromDate(e.target.value);
      setSaveRegister({...saveRegister,['fromDate']:e.target.value});
    }else{
      setSaveRegister({...saveRegister,[e.target.name]:e.target.value});
    }
    console.log(saveRegister);
  }
  
  const handleSubmit=()=>{
    if(saveRegister && saveRegister.employee){
      dispatch(createTerminationService(saveRegister));
      if(serviceRegister && serviceRegister.id){
        toast.success("Employee saved successfully.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        toggle();
      }
      toggle();
      }else{
        toast.error("Please select employee!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        return false;
      }
  }

  const handleFilter=()=>{
    if((document.getElementById("dept.id").value>-1) || (document.getElementById("desig.id").value>-1)){
      dispatch(showServiceRegistersByTypesStatus(sRegister));
      //alert(serviceRegisters)
    }else{
      toast.error("Please select department / designation!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      return false;
    } 
  }
  const openUpdateSR=(srObj)=>{
    setSaveRegister(srObj);
    //dispatch(showServiceRegisterById(srId));  
    if(srObj && srObj.employee && srObj.employee.id){
      dispatch(showEmployeeById(srObj.employee.id));
      if(srObj && srObj.employee && srObj.employee.id){
        setEmployeeName({
          value:srObj.employee.id,
          label:"["+srObj.employee.code+"] : "+srObj.employee.fullName
        })
        //setSaveRegister({...saveRegister,['employee']:{'id':serviceRegister.employee.id,'code':'SBI'}});
      }if(srObj && srObj.fromDate){
        setFromDate(getFormattedDate(new Date(srObj.fromDate)));
        //setSaveRegister({...saveRegister,['fromDate']:serviceRegister.fromDate});
      }
      if(srObj && srObj.empType && srObj.empType.id){
        setEmployeeType(srObj.empType.id);
        //setSaveRegister({...saveRegister,['empType']:{'id':serviceRegister.empType.id,'code':'SBI'}});
      }
      if(srObj && srObj.stfType && srObj.stfType.id){
        setStaffType(srObj.stfType.id);
        //setSaveRegister({...saveRegister,['stfType']:{'id':serviceRegister.stfType.id,'code':'SBI'}});
      }if(srObj && srObj.type){
        setSrStatus(srObj.type);
        //setSaveRegister({...saveRegister,['stfType']:{'id':serviceRegister.stfType.id,'code':'SBI'}});
      }
      toggle();
      setIsEmpDetail(true);
    }    
    //console.log("saveRegister="+srObj.employee.id+", type="+saveRegister.type+", remark="+saveRegister.remark)
  }

  const saveEditTerminationEmployee=()=>{
    if(saveRegister && saveRegister.id){
      dispatch(editTerminationSR(saveRegister));
      if(serviceRegister && serviceRegister.id){
        toast.success("Updated successfully.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        toggle();
      }
      toggle();
    }
  }

  const viewDept=(srId)=>{
    dispatch(showServiceRegisterById(srId));
  }
  const deleteDept=(srId)=>{
    if(window.confirm("Are you sure to delete?")){
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  }
  return (
    <div>
      <form>
        <Card style={{minWidth:'77rem'}}>
            <CardHeader  className='p-1'>
                <label>Establishment / Service Status Update</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='danger' onClick={addNew}>Add New</Button>
            </CardHeader>
            <CardBody className='form-shadow'>
                <Row>
                  <Col sm='6'>
                      Department
                      <select id='dept.id' name='dept.id' placeholder="- Search option -" className='form-select'
                          onChange={handleChange} >     
                          <option value="-1">-- select --</option>
                          {
                            departments.map((dept)=>(
                              <option value={dept.id}>{dept.name}</option>
                            ))
                          }                        
                      </select> 
                  </Col>
                  <Col sm='6'>
                      Designation
                      <select id='desig.id' name='desig.id' placeholder="- Search option -" 
                          onChange={handleChange} className='form-select'>
                          <option value="-1">-- select --</option>
                          {
                            designations.map((dept)=>(
                              <option value={dept.id}>{dept.name}</option>
                            ))
                          }                             
                      </select> 
                  </Col>
              </Row>
              <Row className='mt-3'>
                <Col sm='12'>
                  <Button color="danger" onClick={handleFilter}>
                    Filter
                  </Button>
                </Col>
              </Row>
            </CardBody>
            <CardBody className='form-shadow'>
              {
                serviceRegisters && serviceRegisters.length>0?
                <Table striped>
                  <thead>
                    <tr>
                      <th scope='row'>
                        Employee Code
                      </th>
                      <th scope='row'>
                        Employee Name
                      </th>
                      <th scope='row'>
                        Department
                      </th>
                      <th scope='row'>
                        Designation
                      </th>
                      <th scope='row'>
                        Effective Date
                      </th>
                      <th scope='row'>
                        Current Service Status
                      </th>
                      <th scope='row'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      serviceRegisters.map((emp)=>(
                        <tr key={emp.id}>
                          <td>{emp && emp.employee && emp && emp.employee.code}</td>
                          <td>{emp && emp.employee && emp.employee.fullName}</td>
                          <td>{emp && emp.employee && emp.employee.department && emp.employee.department.name}</td>
                          <td>{emp && emp.employee && emp.employee.designation && emp.employee.designation.name}</td>
                          <td>{getFormattedDate(new Date(emp && emp.fromDate))}</td>
                          <td>{emp && emp.status} {" "}[{emp && emp.approvalStatus}]</td>                         
                          <td><Link onClick={(e)=>{openUpdateSR(emp)}}><FaPencilAlt color='green'/></Link> 
                          <Link  onClick={(e)=>{deleteDept(emp.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                          <Link onClick={(e)=>{viewDept(e, emp.id)}}><FaSearch/> </Link>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
                :
                <p>No Data Available</p>
              }
            </CardBody>            
            {/* Modal */}
            <Modal isOpen={modal} toggle={toggle} fullscreen='sm' size='xl'>
              <ModalHeader toggle={toggle} style={{color:'blue'}}>Employee Service Status</ModalHeader>
              <ModalBody>
              <Card>
              <Row>
                <Col sm={8}>
                  <Table striped>
                    <tbody>                  
                      <tr>
                        <td>Select Employee</td>
                        <td>
                        {
                          saveRegister && saveRegister.id?
                          <Select options={employeeSelection} id='showEmp' placeholder="- Search option -" value={employeeName}
                              onChange={(e)=>handleEmpSelect(e,'id')}
                              isSearchable={true} isDisabled='true'>                             
                          </Select>
                          :
                          <Select options={employeeSelection} id='id' placeholder="- Search option -" value={employeeName}
                              onChange={(e)=>handleEmpSelect(e,'id')}
                              isSearchable={true}>                             
                          </Select>
                        }                           
                        </td>
                      </tr>
                      <tr>
                        <td>Service Status : </td>
                        <td>
                          <select id='type' name='type' className='form-select' onChange={handleSaveChange} value={srStatus}>
                            <option value="-1" selected="">--Select--</option>	  		
                            <option value="In Service" title="In Service">In Service</option>
                            <option value="Terminated" title="Terminated">Terminated</option>
                            <option value="Resigned" title="Resigned">Resigned</option>
                            <option value="Relieved" title="Relieved">Relieved</option>
                            <option value="Superannuated" title="Superannuated">Superannuated</option>
                            <option value="Transferred to Other Campus" title="Transferred to Other Campus">Transferred to Other Campus</option>
                            <option value="Demise" title="Demise">Demise</option>
                            <option value="Voluntary Retirement" title="Voluntary Retirement">Voluntary Retirement</option>
                            <option value="Retired" title="Retired">Retired</option>
                            <option value="Left on Deputation" title="Left on Deputation">Left on Deputation</option>
                            <option value="De activated" title="De activated">De activated</option>
                            <option value="Left on lien" title="Left on lien">Left on lien</option>
                            <option value="Tenure expired" title="Tenure expired">Tenure expired</option>
                            <option value="Dispensed" title="Dispensed">Dispensed</option>
                            <option value="Transfer" title='Transfer'>Transfer</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Employee Type : </td>
                        <td>
                        {
                          saveRegister && saveRegister.id?
                          <select id='emType.id' name='emType.id' className='form-select' onChange={handleSaveChange} value={employeeType} disabled>
                            {
                              employeeTypes.map((staff)=>(
                                <option value={staff.id}>{staff.name}</option>
                              ))
                            }
                          </select>
                            :
                          <select id='empType.id' name='empType.id' className='form-select' onChange={handleSaveChange} value={employeeType}>
                            <option value="-1">-- select --</option>
                            {
                              employeeTypes.map((staff)=>(
                                <option value={staff.id}>{staff.name}</option>
                              ))
                            }
                          </select>
                        }
                        </td>
                      </tr>
                      <tr>
                        <td>Staff Type : </td>
                        <td>
                        {
                          saveRegister && saveRegister.id?
                          <select id='stype.id' name='stype.id' className='form-select' onChange={handleSaveChange} value={staffType} disabled>
                            {
                              staffTypes.map((staff)=>(
                                <option value={staff.id}>{staff.name}</option>
                              ))
                            }
                          </select>
                            :
                          <select id='stfType.id' name='stfType.id' className='form-select' onChange={handleSaveChange} value={staffType}>
                            <option value="-1">-- select --</option>
                            {
                              staffTypes.map((staff)=>(
                                <option value={staff.id}>{staff.name}</option>
                              ))
                            }
                          </select>
                        }
                        </td>
                      </tr>
                      <tr>
                        <td>Date of Action : </td>
                        <td> 
                          <input type='date' id='dateOfAction' name='dateOfAction' className='form-control' onChange={handleSaveChange} value={fromDate}/>
                        </td>
                      </tr>
                      <tr>
                        <td>Remarks : </td>
                        <td> 
                          <textarea id='remark' name='remark' className='form-control' onChange={handleSaveChange} value={saveRegister && saveRegister.remark}/>
                        </td>
                      </tr>
                    </tbody>
                  </Table> 
                </Col>
                <Col sm={4}>
                {
                  isEmpDetail && employeeById && employeeById.id!=null?     
                  <Card>       
                  <CardHeader>Employee Detail</CardHeader>   
                  <Table striped>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{employeeById && employeeById.fullName}</td>
                      </tr>
                      <tr>
                        <th>Employee Type</th>
                        <td>{employeeById && employeeById.employeeTypeDto && employeeById.employeeTypeDto.name}</td>
                      </tr>
                      <tr>
                        <th>Staff Type</th>
                        <td>{employeeById && employeeById.staffTypeDto && employeeById.staffTypeDto.name}</td>
                      </tr>
                      <tr>
                        <th>Department</th>
                        <td>{employeeById && employeeById.departmentDto && employeeById.departmentDto.name}</td>
                      </tr>
                      <tr>
                        <th>Designation</th>
                        <td>{employeeById && employeeById.designationDto && employeeById.designationDto.name}</td>
                      </tr>
                      <tr>
                        <th>Pay Scale</th>
                        <td>{employeeById && employeeById.swiftCode}</td>
                      </tr>
                      <tr>
                        <th>Basic</th>
                        <td>{employeeById && employeeById.currentBasic}</td>
                      </tr>
                    </tbody>
                  </Table>
                  </Card>
                :
                <div>
                
                </div>
                }
                </Col>
              </Row>
                
              </Card>        
            </ModalBody>
          <ModalFooter>
              {
                saveRegister && saveRegister.id?
                <Button color="success" onClick={saveEditTerminationEmployee}>
                  Update
                </Button>
                :
                <Button color="success" onClick={handleSubmit}>
                  Save
                </Button>
              }
              <Button color="danger" onClick={toggle}>
                Cancel
              </Button>
              </ModalFooter>
            </Modal>
        {/* Modal  */}
            <ToastContainer />
            <CardFooter>
            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default ServiceStatusUpdateList;

import { Approval, ArrowBack} from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchAllEmployeesCols, showEmployeeById, showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { Button, Card, CardBody, CardFooter,Col, Row, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { showPromotionApprovalList } from '../establishment_redux/slices/establishment_slice/serviceRegisterSlice';
import { Link } from 'react-router-dom';
import { FcApprove } from "react-icons/fc";
import { PiCheckFatDuotone } from "react-icons/pi";

const RequestApprovalList = () => {
    const dispatch = useDispatch();
    const [employeeName, setEmployeeName] = useState([]);
    const {employeeSelection,employeeById} = useSelector((state)=>state.allstorereducer.employeeData);
    const {serviceRegisters,serviceRegister,srloading} = useSelector((state)=>state.allstorereducer.srRegister);
    const [sRegister,setSRegister]=useState();
    const [modal, setModal] = useState(false);
    const [saveRegister,setSaveRegister] =useState();
    const [isEmpDetail,setIsEmpDetail] = useState(false);
    const [approvedDate,setApprovedDate]=useState();

    const toggle = () =>{
      setModal(!modal);
    }
    
    const goback=()=>{
        window.history.back();
    }
    useEffect(()=>{
      dispatch(showEmployeePopup());
      dispatch(fetchAllEmployeesCols());
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);
    
    function handleEmpSelect(data,field) {
      setSRegister({...sRegister,['employee']:{'id':data.value,'code':'SBI'}});         
      console.log(sRegister)
      setEmployeeName(data);
  }
  
  const handleChange=(e)=>{
    setSRegister({...sRegister,[e.target.name]:e.target.value});
    console.log(sRegister)
  }
  const filterResult=()=>{
    if(sRegister){
      dispatch(showPromotionApprovalList(sRegister));
    }else{
      setSRegister({...sRegister,['status']:'Requested'});
      dispatch(showPromotionApprovalList(sRegister));
    }   
  }
  const approvalRequestButton=(srObj)=>{
    if(srObj && srObj.employee && srObj.employee.id){
      setSaveRegister(srObj);
      dispatch(showEmployeeById(srObj.employee.id));
      setIsEmpDetail(true);
      toggle();
    }   
  }

  const handleApprove=(e)=>{
    setSaveRegister({...saveRegister,[e.target.name]:e.target.value});
    console.log(saveRegister)
  }

  const saveApprovePromotion=()=>{
    alert('save')
  }

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <form>
        <Card style={{minWidth:'78rem'}}>
            <CardHeader  className='p-1'>
                <label>Establishment / Service Status Update</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button>
            </CardHeader>
            <CardBody className='form-shadow'>
                <Row>
                  <Col sm='6'>
                    Employee Code / Name
                    <Select options={employeeSelection} id='empId' placeholder="- Search option -" value={employeeName}
                        onChange={(e)=>handleEmpSelect(e,'empId')}
                        isSearchable={true}>                             
                    </Select>                     
                  </Col>
                  <Col sm='6'>
                      Approval Status
                      <select id='status' name='status' className='form-select' onChange={handleChange}>
                          <option value="Requested">Requested</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Wrong Entry">Wrong Entry</option>
                      </select>
                  </Col>
              </Row>
              <Row className='mt-3'>
                <Col sm='13'>
                  <Button color="danger" onClick={filterResult}>
                    Filter
                  </Button>
                </Col>
              </Row>
            </CardBody>
            <CardBody className='form-shadow'>
              {
                srloading==true?
                <div>
                  Loading...
                </div>
                :
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
                        Date of Action
                      </th>
                      <th scope='row'>
                        Type of Action
                      </th>
                      <th scope='row'>
                        Status
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
                          <td>{getFormattedDate(new Date(emp && emp.fromDate))}</td>
                          <td>{emp && emp.type}</td>   
                          <td>{emp && emp.status} {" "}[{emp && emp.approvalStatus}]</td>                         
                          <td><Link onClick={(e)=>{approvalRequestButton(emp)}}><PiCheckFatDuotone color='green' title='Click here to Approve Request.'/></Link> 
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
            <CardFooter>
            </CardFooter>
            {/* Modal */}
            <Modal isOpen={modal} toggle={toggle} fullscreen='sm' size='xl'>
              <ModalHeader toggle={toggle} style={{color:'blue'}}>Employee Service Status</ModalHeader>
              <ModalBody>
              
              <Row>
                <Col sm={6}>
                <Card>
                <CardHeader>New Request for approval</CardHeader>
                <Table striped>
                  <tbody>                                                                                
                      <tr>
                        <td>Due Date : </td>
                        <td> {getFormattedDate(new Date(saveRegister && saveRegister.fromDate))} </td>
                      </tr>
                      <tr>
                        <td>New Pay Scale :</td>
                        <td>{saveRegister && saveRegister.salarySlab && saveRegister.salarySlab.displayName} </td>
                      </tr>
                      <tr>
                        <td>Payband : </td>
                        <td> {saveRegister && saveRegister.newBasicPay}</td>
                      </tr>
                      <tr>
                        <td>No of Increment : </td>
                        <td> {saveRegister && saveRegister.noOfIncrement}</td>
                      </tr>
                    </tbody>
                  </Table> 
                </Card> 
                </Col>
                <Col sm={6}>
                {
                  isEmpDetail && employeeById && employeeById.id!=null?     
                  <Card>       
                  <CardHeader>Employee Detail :</CardHeader>   
                  <Table striped>
                    <tbody>
                      <tr>
                        <th>Name :</th>
                        <td>{employeeById && employeeById.fullName}</td>
                      </tr>
                      <tr>
                        <th>Employee Type :</th>
                        <td>{employeeById && employeeById.employeeTypeDto && employeeById.employeeTypeDto.name}</td>
                      </tr>
                      <tr>
                        <th>Staff Type :</th>
                        <td>{employeeById && employeeById.staffTypeDto && employeeById.staffTypeDto.name}</td>
                      </tr>
                      <tr>
                        <th>Department :</th>
                        <td>{employeeById && employeeById.departmentDto && employeeById.departmentDto.name}</td>
                      </tr>
                      <tr>
                        <th>Designation :</th>
                        <td>{employeeById && employeeById.designationDto && employeeById.designationDto.name}</td>
                      </tr>
                      <tr>
                        <th>Pay Scale :</th>
                        <td>{employeeById && employeeById.swiftCode}</td>
                      </tr>
                      <tr>
                        <th>Basic :</th>
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
              <Row>
              <Col>            
                <Card>
                <Table striped>
                    <tbody>                                                           
                      <tr>
                        <td>Approved Date : </td>
                        <td> 
                          <input type='date' id='approvedDate' name='approvedDate' className='form-control' onChange={handleApprove} value={approvedDate} placeholder='DD-MM-YYYY'/>
                        </td>
                      </tr>
                      <tr>
                        <td>Status : </td>
                        <td> 
                          <select id='approvalStatus' name='approvalStatus' className='form-select' onChange={handleApprove}>
                            <option value="Requested">Requested</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Wrong Entry">Wrong Entry</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </Table> 
                  </Card>
                </Col>                
              </Row>               
                      
            </ModalBody>
          <ModalFooter>             
              <Button color="success" onClick={saveApprovePromotion}>
                Approve
              </Button>
              <Button color="danger" onClick={toggle}>
                Cancel
              </Button>
              </ModalFooter>
            </Modal>
        {/* Modal  */}
        </Card>
      </form>
    </div>
  )
}

export default RequestApprovalList;

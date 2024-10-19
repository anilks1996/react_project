import { ArrowBack, Edit, Search } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Switch from '@mui/material/Switch';
import { showEmployeeById, showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { Button, Card, CardBody, CardFooter,Col, Row, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showStaffType } from '../establishment_redux/slices/establishment_slice/staffTypeSlice';
import { showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { showSalarySlab } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import { createPromotionWithIncrement, showServiceRegistersByEmployeeId } from '../establishment_redux/slices/establishment_slice/serviceRegisterSlice';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';


const PromotionOrIncrementList = () => {
    const navigatePage=useNavigate();
    const dispatch = useDispatch();
    const [empName, setEmpName] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);
    const [filteredList,setFilteredList] = useState([]);
    const {employeeSelection,employeeById} = useSelector((state)=>state.allstorereducer.employeeData);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {serviceRegisters,serviceRegister,srloading} = useSelector((state)=>state.allstorereducer.srRegister);
    const [modal, setModal] = useState(false);
    const {salarySlabs} = useSelector((state)=>state.allstorereducer.org);
    const [employee,setEmployee] = useState();
    const [isInCremt, setIsInCremt] = useState(false);
    const [isPromt, setIsPromt] = useState(false);
    const [sRegister,setSRegister] = useState();
    const [salarySlab,setSalarySlab]=useState();

    
    useEffect(()=>{
      dispatch(showEmployeePopup());
      dispatch(showDesignation());
      dispatch(showStaffType());
      dispatch(showEmployeeType());
      dispatch(showSalarySlab());
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);

    function getFormattedDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
      const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
      return `${year}-${month}-${day}`;
    }
    const toggle = () =>{
      setModal(!modal);
      setEmployee(null)
    }
    const handleChange=(e)=>{
      if(e.target.name==="salarySlab.id"){
        setEmployee({...employee,['salarySlab']:{'id':e.target.value,'code':'SBI'}});
      }else if(e.target.name==="stfType.id"){
        setSRegister({...sRegister,['stfType']:{'id':e.target.value,'code':'SBI'}});
      }else if(e.target.name==="stfType.id"){
        setSRegister({...sRegister,['stfType']:{'id':e.target.value,'code':'SBI'}});
      }else if(e.target.name==="empType.id"){
        setSRegister({...sRegister,['empType']:{'id':e.target.value,'code':'SBI'}});
      }else if(e.target.name==="dept.id"){
        setSRegister({...sRegister,['dept']:e.target.value});
      }else{
        setSRegister({...sRegister,[e.target.name]:e.target.value});
      }                  
      console.log(sRegister);
    }
    const handlePromotion=(e)=>{
      if(sRegister && sRegister.employee){
        if(isPromt){
          setIsPromt(false);
          setSRegister({...sRegister,['type']:null});
        }else{
          setIsPromt(true);
          setSRegister({...sRegister,['type']:'promotion'});
        }
      }else{
        toast.warning("Select employee first!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      }
    }
    const handleIncrement=()=>{
     if(sRegister && sRegister.employee){
      if(isInCremt){
        setIsInCremt(false);
        setSRegister({...sRegister,['remark']:null});        
      }else{
        setIsInCremt(true);
        setSRegister({...sRegister,['remark']:'increment'});
      }
     }else{
      toast.warning("Select employee first!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }      
    }
    const goback=()=>{
        window.history.back();
    }
    
    function handleSelect(data) {
        dispatch(showServiceRegistersByEmployeeId(data.value));
        setEmpName(data);
    }
    
    function handlePopupEmpSelect(data) {
      setEmployeeName(data);
      dispatch(showEmployeeById(data.value));
      // if(employeeById && employeeById.salarySlabDto && employeeById.salarySlabDto.id){
      //   setSalarySlab(employeeById.salarySlabDto.id);
      // }
      setSRegister({...sRegister, ['employee']:{'id':data.value,'code':'SBI'}})
      console.log(sRegister);
    }
    const handleSave=()=>{
      if(sRegister && sRegister.employee){
        dispatch(createPromotionWithIncrement(sRegister));
        if(serviceRegister && serviceRegister.remark && serviceRegister.remark==="success"){
          toast.info("Employee transfer requested successfully.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setModal(!modal);
        }else if(serviceRegister && serviceRegister.remark && serviceRegister.remark==="error"){
          toast.error("Employee couldn't request successfully.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setModal(!modal);
        }else{
          toast.error("Something went wrong. Please try after some time.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setModal(!modal);
        }
      }else {
        toast.error("Please select proper employee field!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
    const addNewEmpType=()=>{
        navigatePage("/serviceBookDetails/transferEmployeeCreation");
    }
    const filteredAll=()=>{
      dispatch(showServiceRegistersByEmployeeId(-1));
      alert(serviceRegisters);
    }
    const handleView=()=>{
      alert('hi')
    }
  return (
    <div>
      <form>
        <Card style={{minWidth:'78rem'}}>
            <CardHeader  className='p-0'>
                <label>Establishment / TransforEmployeeList</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='danger' onClick={toggle}>Add New</Button>
            </CardHeader>
            <CardBody className='form-shadow'>
                <Row>
                  <Col>
                      Employee Code / Name
                      <Select options={employeeSelection} id='empId' placeholder="- Search option -" value={empName}
                          onChange={(e)=>handleSelect(e,'empId')}
                          isSearchable={true}>                             
                      </Select> 
                  </Col>
                  <Col>
                    <Button color='primary' onClick={filteredAll} className='mt-4'>{" "} Filter {" "}</Button>
                  </Col>
              </Row>
            </CardBody>
            <CardBody className='form-shadow'>
              {
                serviceRegisters && serviceRegisters!=null?
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
                        Due Date
                      </th>
                      <th scope='row'>
                        Department
                      </th>
                      <th scope='row'>
                        Designation
                      </th>
                      <th scope='row'>
                        Type
                      </th>
                      <th scope='row'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      serviceRegisters.length>0 && serviceRegisters.map((sr)=>(
                        <tr key={sr.id}>
                          <td>{sr && sr.employee && sr.employee.code}</td>
                          <td>{sr && sr.employee && sr.employee.fullName}</td>
                          {
                            sr && sr.date!=null? 
                            <td>{getFormattedDate(new Date(sr && sr.date))}</td>
                            :
                            <td>{getFormattedDate(new Date(sr && sr.fromDate))}</td>
                          }
                          <td>{sr && sr.department}</td>
                          <td>{sr && sr.designation}</td>                                                   
                          <td>{sr && sr.type}</td>
                          <td>{sr && sr.status}{" "}
                          {
                            sr && sr.approvalStatus==="Approved"?
                            <b>
                              [{sr && sr.approvalStatus}]
                            </b>
                            :
                            <b>
                              [Pending]
                            </b>
                          } 
                          </td>
                          <td><button className='btn btn-info'><Search onClick={handleView}/></button></td>
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
              <ModalHeader toggle={toggle} style={{color:'blue'}}>New Employee Promotion/Increment</ModalHeader>
              <ModalBody>
              <Card>
                <Table striped>
                  <tbody>                  
                    <tr>
                      <td>Select Employee</td>
                      <td>
                        <Select options={employeeSelection} id='employee.id' name='employee.id' placeholder="- Search option -" value={employeeName}
                            onChange={handlePopupEmpSelect}
                            isSearchable={true}>                             
                        </Select> 
                      </td>
                    </tr>
                    <tr>
                      <td>Employee Name</td>
                      <td>[{employeeById && employeeById.code}] : {employeeById && employeeById.fullName}</td>
                    </tr>
                    <tr>
                      <td>Employee Type</td>
                      <td> {employeeById && employeeById.employeeTypeDto && employeeById.employeeTypeDto.name}</td>
                    </tr>
                    <tr>
                      <td>Staff Type</td>
                      <td> {employeeById && employeeById.staffTypeDto && employeeById.staffTypeDto.name}</td>
                    </tr>
                    <tr>
                      <td>Designation</td>
                      <td> {employeeById && employeeById.designationDto && employeeById.designationDto.name}</td>
                    </tr>
                    <tr>
                      <td>Department</td>
                      <td> {employeeById && employeeById.departmentDto && employeeById.departmentDto.name}</td>
                    </tr>
                    <tr>
                      <td>Scale of Pay</td>
                      <td> {employeeById && employeeById.swiftCode}</td> 
                    </tr>
                    <tr>
                      <td>Basic Pay</td>
                      <td> {employeeById && employeeById.currentBasic}</td>
                    </tr>
                  </tbody>
                </Table> 
              </Card>
              <Card>
              <CardHeader>
                <Row>
                  <Col sm="6">
                    Promotion <Switch name='isPromotion' onChange={handlePromotion}/>
                  </Col>
                  <Col sm="6">
                    Increment <Switch name='isIncrement' onChange={handleIncrement}/>
                  </Col>
                </Row>
              </CardHeader>
              {
                isPromt?
              
              <CardBody>
              <label style={{color:'red'}}>Promotion Details : </label>
                <Card>
                <Table striped>
                  <tbody>
                  <tr>
                    <td>Staff Type</td>
                    <td> 
                      <select placeholder="select-name" className='form-select' id="stfType.id" name="stfType.id" onChange={handleChange}>
                      <option value={-1}>-- select --</option>  
                      {
                          staffTypes.map((dpt)=>(
                          <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                          ))
                      }
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Employee Type</td>
                    <td> 
                      <select placeholder="select-name" className='form-select' id="empType.id" name='empType.id' onChange={handleChange}>
                      <option value={-1}>-- select --</option>  
                      {
                          employeeTypes.map((dpt)=>(
                            <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                          ))
                      }
                      </select>
                    </td>
                  </tr>
                    <tr>
                      <td>Designation</td>
                      <td> 
                        <select placeholder="select-name" className='form-select' id="desig.id" name='desig.id' onChange={handleChange}>
                        <option value={-1}>-- select --</option>  
                        {
                            designations.map((dpt)=>(
                            <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                            ))
                        }
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Promotion Date</td>
                      <td> 
                        <input type='date' id='fromDate' name='fromDate' className='form-control' onChange={handleChange}/>
                      </td>
                    </tr>
                    <tr>
                      <td>Next Promotion Due Date</td>
                      <td>
                        <input type='date' id='nextPromotionDate' name='nextPromotionDate' className='form-control' onChange={handleChange}/>
                      </td>
                    </tr>                   
                  </tbody>
                </Table>
                </Card>
              </CardBody>
              :
              <p>...</p>
              }
              {
                isInCremt?

              <CardBody>
              <label style={{color:'red'}}>Increment Details : </label>
              <Card>
              <Table striped>
              <tbody>
              
                <tr>
                  <td>Increment Date</td>
                  <td> 
                    <input type='date' id='incrementDate' name='incrementDate' className='form-control' onChange={handleChange}/>
                  </td>
                </tr>
                <tr>
                  <td>Next Increment Due Date</td>
                  <td>
                    <input type='date' id='nextIncrementDate' name='nextIncrementDate' className='form-control' onChange={handleChange}/>
                  </td>
                </tr>
                <tr>
                  <td>No of Increment</td>
                  <td>
                    <input type='number' id='noOfIncrement' name='noOfIncrement' className='form-control' onChange={handleChange}/>
                  </td>
                </tr>
                <tr>
                  <td>Increment Amount</td>
                  <td>
                    <input type='text' id='incrementAmount' name='incrementAmount' className='form-control' onChange={handleChange}/>
                  </td>
                </tr>
                <tr>
                  <td>New Salary Slab</td>
                  <td>
                    <select id='salarySlab.id' name='salarySlab.id' className='form-select' value={salarySlab} onChange={handleChange}>
                    {
                        salarySlabs.map((dsg)=>(
                        <option value={dsg.id}>{dsg.displayName}</option>
                        ))
                    }
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Pay Amount</td>
                  <td>
                    <input type='text' id='newBasicPay' name='newBasicPay' className='form-control' onChange={handleChange}/>
                  </td>
                </tr>
              </tbody>
            </Table>
            </Card>
            </CardBody>
            :
            <p>...</p>
            }
            </Card>  
            </ModalBody>
          <ModalFooter>
              <Button color="success" onClick={handleSave}>
                Save
              </Button>
                <Button color="secondary" onClick={toggle}>
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

export default PromotionOrIncrementList;

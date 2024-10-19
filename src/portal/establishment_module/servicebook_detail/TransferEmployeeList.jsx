import { ArrowBack, Edit, Search } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { showEmployeeById, showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { Button, Card, CardBody, CardFooter,Col, Row, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';
import { createServiceRegister, showServiceRegistersByEmployeeId, showServiceRegistersByStatus } from '../establishment_redux/slices/establishment_slice/serviceRegisterSlice';
import { ImSpinner6 } from "react-icons/im";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { showSalarySlab } from '../establishment_redux/slices/establishment_slice/institutionSlice';


const TransferEmployeeList = () => {
    const dispatch = useDispatch();
    const [empName, setEmpName] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);
    const {employeeSelection,employeeById} = useSelector((state)=>state.allstorereducer.employeeData);
    const {serviceRegisters,serviceRegister,srloading} = useSelector((state)=>state.allstorereducer.srRegister);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const [modal, setModal] = useState(false);
    const [dueDate,setDueDate] = useState();
    const [sRegister,setSRegister] = useState();
    const [designation,setDesignation]=useState();
    const [department,setDepartment]=useState();
    const [salarySlab,setSalarySlab]=useState();
    const toggle = () =>{
      setModal(!modal);
    }
    
    const goback=()=>{
        window.history.back();
    }
    useEffect(()=>{
      dispatch(showEmployeePopup());
      dispatch(showDesignation());
      dispatch(showDepartment());
      dispatch(showSalarySlab());
      setDueDate(getFormattedDate(new Date()));
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);

    const handleChange=(e)=>{
      if(e.target.name==='fromDate'){
        setDueDate(e.target.value);
        setSRegister({...sRegister, [e.target.name]:e.target.value})
      }else if(e.target.name==="dept.id"){
        setDepartment(e.target.value);
        setSRegister({...sRegister, ['dept']:{'id':e.target.value,'code':'SBI'}})
      }else if(e.target.name==="desig.id"){
        setDesignation(e.target.value);
        setSRegister({...sRegister, ['desig']:{'id':e.target.value,'code':'SBI'}})
      }else{
        setSRegister({...sRegister, [e.target.name]:e.target.value});
      }
      console.log(sRegister);
    }
    function getFormattedDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
      const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
      return `${year}-${month}-${day}`;
    }
    function handleSelect(data) {
        setEmpName(data);
        dispatch(showServiceRegistersByEmployeeId(data.value));
    }
    const filterSRegister=()=>{
      dispatch(showServiceRegistersByStatus("status"));
    }
    function handlePopupEmpSelect(data) {
      setEmployeeName(data);
      dispatch(showEmployeeById(data.value));
      if(employeeById && employeeById.salarySlabDto && employeeById.salarySlabDto.id){
        setSalarySlab(employeeById.salarySlabDto.id);
      }
      setSRegister({...sRegister, ['employee']:{'id':data.value,'code':'SBI'}})
      console.log(sRegister);
    }
    const handleSave=()=>{
      alert("verified");
      dispatch(createServiceRegister(sRegister));
      if(serviceRegister && serviceRegister.id){
        toast.info("Employee transfer requested successfully.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        toggle();
      }
    }

    if(srloading){
      <ImSpinner6 />
    }

  return (
    <div>
      <form>
        <Card style={{minWidth:'75rem'}}>
            <CardHeader  className='p-0'>
                <label>Establishment / TransferEmployeeList</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='danger' onClick={toggle}>Add New</Button>
            </CardHeader>
            <CardBody className='form-shadow'>
                <Row>
                  <Col sm={10}>
                      Employee Code / Name
                      <Select options={employeeSelection} id='empId' placeholder="- Search option -" value={empName}
                          onChange={handleSelect}
                          isSearchable={true}>                             
                      </Select> 
                  </Col>
                  <Col sm={2} className='mt-4'>
                      <Button onClick={filterSRegister} color='primary'>Filter</Button>
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
                        Status [Approval Status]
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
                          <td>{emp && emp.employee && emp.employee.code}</td>
                          <td>{emp && emp.employee && emp.employee.fullName}</td>
                          <td>{getFormattedDate(new Date(emp && emp.fromDate))}</td>
                          <td>{emp && emp.department}</td>
                          <td>{emp && emp.designation}</td>
                          <td>{emp && emp.type}</td>
                          <td>{emp && emp.status} {" "}
                          {
                            emp && emp.approvalStatus==="Approved"?
                            <b>
                              [{emp && emp.approvalStatus}]
                            </b>
                            :
                            <b>
                              [Pending]
                            </b>
                          }                          
                          </td>
                          <td><Edit/><Search/></td>
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
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>New Employee Transfer</ModalHeader>
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
                <Table striped>
                  <tbody>
                    <tr>
                      <td>Transfer Date</td>
                      <td>
                        <input type='date' id='fromDate' name='fromDate' className='form-control' value={dueDate} onChange={handleChange}/>
                      </td>
                    </tr>
                    <tr>
                      <td>Department</td>
                      <td> 
                        <select placeholder="select-name" className='form-select' id="dept.id" name='dept.id' onChange={handleChange} value={department}>
                        <option value={-1}>-- select --</option>  
                        {
                            departments.map((dpt)=>(
                            <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                            ))
                        }
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Designation</td>
                      <td> 
                        <select placeholder="select-name" className='form-select' id="desig.id" name='desig.id' onChange={handleChange} value={designation}>
                        <option value={-1}>-- select --</option> 
                            {
                            designations.map((dsg)=>(
                                <option value={dsg.id}>{dsg.code} - {dsg.name}</option>
                            ))
                            }
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Pay</td>
                      <td><input type='text' id='newBasicPay' name='newBasicPay' className='form-control' onChange={handleChange}/></td>
                    </tr>
                    <tr>
                      <td>Remarks</td>
                      <td><textarea type='text' id='remarks' className='form-control' name='remarks' onChange={handleChange}/></td>
                    </tr>
                  </tbody>
                </Table>
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
          <ToastContainer/>
            <CardFooter>
            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default TransferEmployeeList;

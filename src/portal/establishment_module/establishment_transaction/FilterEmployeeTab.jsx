import React, {useEffect, useState } from 'react'
import { FaFileSignature, FaIdCard, FaPlus, FaSignature, FaUpload, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../../serviceUrl/AxiosURL';
import { Card,CardHeader,CardBody,Button,CardFooter,Row,Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';
import { ArrowBack, DocumentScannerTwoTone, Edit, Email, Image, Menu, Phone, Photo } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { showOrganization } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import { showDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { showStaffType } from '../establishment_redux/slices/establishment_slice/staffTypeSlice';
import Select from 'react-select';import { BsCartCheckFill } from "react-icons/bs";
import { findAllCategories, showEmployeeById, showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import boss_photo from '../document/rkgupta.png';
import { ModalTitle } from 'react-bootstrap';


const CreateEmployeeTab = () => {
    const navigatePage=useNavigate();
    const [employee, setEmployee]=useState({
      id:0,code:'',fullName:'',firstName:'',organization:'',
      "department.id":null,'designation.id':null,'staffType.id':null,'employeeType.id':null,
      status:'','category.id':null,gender:'', 'employeeSupervisor.id':null,
      idCardNo:'',contactNumber:'',aadharNumber:'','subEmployeeType.id':null,
      'pastOrgDepartment.id':null,tenureExpiryDateFrom:'',tenureExpiryDateTo:'',
      joiningDateFrom:'',joiningDateTo:'',retirementDateFrom:'',
      retirementDateTo:'',hkrnlSrNo:'',hkrnlEmployeeId:''
    });
    const [allEmployeesCols, setAllEmployeesCols]=useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [category,setCategory] = useState([]);
    const [showEmpName,setShowEmpName] = useState();
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {employeeSelection, employeeById, categories, loading} = useSelector((state)=>state.allstorereducer.employeeData);
    const [modal,setModal] = useState(false);
    const [modalPhoto, setModalPhoto] = useState(false);
    const [modalStore, setModalStore] = useState(false);
    const [modalAadhar, setModalAadhar] = useState(false);
    const [modalDoc, setModalDoc] = useState(false);
    const [modalSig, setModalSig] = useState(false);
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    
    useEffect(()=>{
      console.log(employeeById);
      dispatch(showOrganization());
      dispatch(showDepartment());
      dispatch(showDesignation());
      dispatch(showEmployeeType());
      dispatch(showStaffType());
      dispatch(showEmployeePopup());
      dispatch(findAllCategories());
      //dispatch(fetchAllEmployeesCols());
      // axios.get(BASE_URL+"allEmployeesCols").then((response)=>{
      //   const empCol=response.data;
      //   setAllEmployeesCols(empCol);
      //   setFilteredList(empCol);
      // })
      //alert(allEmployees)
      //setAllEmployeesCols(allEmployees);
      //setFilteredList(allEmployees);
      
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);

    const toggle = (empObj,field) =>{
      //const temp=allEmployeesCols.filter((emp)=>emp.id===eId);
      setUser(empObj);
      setModal(!modal);
    }
    const togglePhoto = (empObj) =>{
      //const temp=allEmployeesCols.filter((emp)=>emp.id===eId);
      setUser(empObj);
      setModalPhoto(!modalPhoto);
    }
    const toggleDoc = (empObj) =>{
      //const temp=allEmployeesCols.filter((emp)=>emp.id===eId);
      setUser(empObj);
      setModalDoc(!modalDoc);
    }
    const toggleStore = (empObj) =>{
      //const temp=allEmployeesCols.filter((emp)=>emp.id===eId);
      setUser(empObj);
      setModalStore(!modalStore);
    }
    const toggleAadhar = (empObj) =>{
      //const temp=allEmployeesCols.filter((emp)=>emp.id===eId);
      setUser(empObj);
      setModalAadhar(!modalAadhar);
    }
    const toggleSig = (empObj) =>{
      //const temp=allEmployeesCols.filter((emp)=>emp.id===eId);
      setUser(empObj);
      setModalSig(!modalSig);
    }
    function handleSelect(data,field) {          
      //alert(data.value+", "+employeeById);
      dispatch(showEmployeeById(data.value));
      //const temp=allEmployeesCols.filter((emp)=>emp.id==data.value);
      //setFilteredList(employeeById);
      window.scrollTo(0, document.body.scrollHeight);
      setShowEmpName(data);
      setEmployee({...employee,[field]:data.value});
    }
    const filterByEmpCode=(e)=>{
      if(allEmployeesCols){
        const filterEmp=allEmployeesCols.filter((emp)=>emp.code.includes(e.target.value));
        setFilteredList(filterEmp);
        if(filterEmp.length<2){
          window.scrollTo(0, document.body.scrollHeight);
        }else if(filterEmp.length>2){
          window.scrollTo({top:'0', left:'0', behavior:'smooth'});
        }
      }
    }
    const filterByEmpName=(e)=>{
      if(allEmployeesCols){
        const filterEmp=allEmployeesCols.filter((emp)=>emp.fullName.includes(e.target.value));
        setFilteredList(filterEmp);
        if(filterEmp.length<10){
          window.scrollTo(0, document.body.scrollHeight);
        }
      }
    }
    const handleChange=(event, field)=>{
      let pass=event.target.value;
      setEmployee({...employee,[field]:pass});
      console.log(employee);    
      if(event.target.value!=undefined && event.target.value!=-1){
        try{
          const filterd=allEmployeesCols.filter((obj)=>obj[field]==(event.target.value));
          setFilteredList(filterd);
          window.scrollTo(0, document.body.scrollHeight);
        }catch(error){
          alert('Please select another!!');
        } 
      }else if(event.target.value!=undefined && event.target.value==-1){
        setFilteredList(allEmployeesCols);
      }
    }
    const filterEmployeeByDeptStaffType=()=>{
      const desg=document.getElementById("designation.id");
      if(document.getElementById("department.id") !==null && document.getElementById("department.id").value!=-1){
        alert("department=="+document.getElementById("department.id").value);
        const filters=allEmployeesCols.filter((obj)=>obj['department.id']==document.getElementById("department.id").value);
        setFilteredList(filters);
      }
      if(document.getElementById("designation.id") !==null && document.getElementById("designation.id").value!=-1){
        alert("designation=="+document.getElementById("designation.id").value);
        const filters=allEmployeesCols.filter((obj)=>obj['designation.id']==document.getElementById("designation.id").value);
        setFilteredList(filters);
      }
      console.log(employee);
    }    
    const createNewEmployee=()=>{
      navigatePage("/establishmentTransaction/employeeCreationForm");
    }
    const filterOptionChange=(event, field)=>{
      alert('event='+field);
    }
    const findEmployees=()=>{
      alert('Employee Id='+employee.id);
      axios.get(BASE_URL+"allEmployeesCols").then((response)=>{
        const empColl=response.data;
        setAllEmployeesCols(empColl);
      })
      alert(allEmployeesCols);
    }
    const goback=()=>{
      window.history.back();
    }
   
    const editEmployeeById=(empId)=>{
      alert('Id='+empId);
    }
  return (
    <div>
        <form>
            <Row>
            <Col sm="12">
                <Card className='mt-1 form-shadow' style={{width:'80rem'}}>
                <CardHeader  className='p-0'>Establishment Transactions / Employee Register</CardHeader>
                <Row>
                  <Col sm="1">
                    <Button color="warning" onClick={goback}><ArrowBack/></Button>
                  </Col>
                  <Col sm="11" lg="11">
                    <UncontrolledDropdown>
                      <Button color="primary" onClick={createNewEmployee}>
                        <FaPlus /> Create New Employee
                      </Button>
                      <DropdownToggle
                        caret
                        color="primary"
                      />
                      <DropdownMenu>                     
                          <Button color="primary">
                            <FaUpload /> Create Employee in Bulk
                          </Button>                     
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>                  
                </Card>
                <Card>
                    {/*<CardHeader>
                        <i>Select Criteria to filter</i>                                          
                    </CardHeader>
                    */}
                    <CardBody className='form-shadow' style={{minWidth:'75rem'}}>
                        <Row>
                        <Col sm='1' className='mt-3'>
                          <Button color="danger" id='radioA' name='filter-option' onClick={(e)=>filterOptionChange(e, 'radioA')}>
                          A </Button>
                        </Col>                        
                        <Col sm='3'>
                          <label>Employee Name</label>                                                                         
                          <Select options={employeeSelection} id='id' placeholder="- Search option -" 
                            value={showEmpName} 
                            onChange={(e)=>handleSelect(e,'id')}
                            isSearchable={true}>                             
                          </Select>                                                    
                        </Col>                       
                        <Col sm='3'>
                          <label>Employee Code</label>
                          <input type="text" placeholder="- Search -" id="code" className='form-control'
                          onChange={(e)=>filterByEmpCode(e)}/>                            
                        </Col>
                        <Col sm='3'>
                          <label>Name Contain</label>
                          <input type="text" placeholder="- Search -" id="firstName" className='form-control'
                          onChange={(e)=>filterByEmpName(e)}/>
                        </Col>                       
                        <Col sm='2' className='mt-3 ml-3'>                         
                          <Button className='form-control btn btn-success' onClick={findEmployees}>
                              &nbsp; Filter &nbsp;
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>

                    <CardBody className='form-shadow' style={{minWidth:'75rem'}}>                   
                        <Row>
                          <Col sm='1' className='mt-3'>
                            <Button color="warning" id='radioB' name='filter-option' onClick={(e)=>filterOptionChange(e,'radioB')}>
                            B </Button>
                          </Col>
                          <Col sm='3'>
                            <label>Organization</label>
                            <select placeholder="select-name" className='form-select' id="institution.id" onChange={(e)=>handleChange(e,'institution.id')}>
                              {
                                institutions.map((org)=>(
                                  <option value={org.id}>{org && org.code}</option>
                                ))
                              }
                            </select>
                          </Col>
                          <Col sm='3'>
                            <label>Department</label>
                             <select placeholder="select-name" className='form-select' id="department.id" onChange={(e)=>handleChange(e,'department.id')}>
                             <option value={-1}>-- select --</option>  
                             {
                                departments.map((dpt)=>(
                                  <option value={dpt.id}>{dpt && dpt.code} - {dpt.name}</option>
                                ))
                              }
                            </select>
                          </Col>
                          <Col sm='3'>
                            <label>Designation</label>
                             <select placeholder="select-name" className='form-select' id="designation.id" onChange={(e)=>handleChange(e,'designation.id')}>
                             <option value={-1}>-- select --</option> 
                                {
                                  designations.map((dsg)=>(
                                    <option value={dsg.id}>{dsg && dsg.code} - {dsg.name}</option>
                                  ))
                                }
                              </select>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                          <Col sm='1'> </Col>
                          <Col sm='3'>
                            <label>Staff Type</label>                            
                             <select placeholder="select-name" className='form-select' id="staffType.id" onChange={(e)=>handleChange(e,'staffType.id')}>
                             <option value={-1}>-- select --</option> 
                                {
                                  staffTypes.map((stf)=>(
                                    <option value={stf.id}>{stf && stf.code}</option>
                                  ))
                                }
                              </select>
                          </Col>
                          <Col sm='3'>
                            <label>Employee Type</label>                          
                             <select placeholder="select-name" className='form-select' id="vemployeeType.id" onChange={(e)=>handleChange(e,'employeeType.id')}>
                             <option value={-1}>-- select --</option> 
                                {
                                  employeeTypes.map((emt)=>(
                                    <option value={emt.id}>{emt && emt.code} - {emt.name}</option>
                                  ))
                                }
                              </select>
                          </Col>
                          <Col sm='3'>
                            <label>Status</label>                           
                             <select placeholder="- select-name -" className='form-select' id="status" onChange={(e)=>handleChange(e,'status')}>                         
                                  <option value="select">-- select --</option>
                                  <option value="In Service">In Service</option>
                                  <option value="Retired">Retired</option>
                                  <option value="Terminated">Terminated</option>
                                  <option value="Transfer">Transfer</option>
                                  <option value="Resigned">Resigned</option>                                                                  
                              </select>
                          </Col>
                        </Row>
                        <Row className='mt-3'>
                          <Col sm='1'> </Col>
                          <Col sm='3'>
                            <label>Category</label>                    
                            <select placeholder="select-name" className='form-select' id="category" onChange={(e)=>handleChange(e,'category')}>
                            <option value={-1}>-- select --</option> 
                                {
                                  categories && categories.map((org)=>(
                                    <option value={org.id}>{org.name}</option>
                                  ))
                                }
                              </select>
                          </Col>
                          <Col sm='3'>
                            <label>Gender</label>
                            <select placeholder="select-name" className='form-select' id="gender" onChange={(e)=>handleChange(e,'gender')}>
                              <option value={-1}>-- select --</option>
                              <option value="Male">Male</option> 
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </Col>
                          <Col sm='3'>
                            <label>Employee Supervisor</label>
                            <select placeholder="select-name" className='form-select' id="employeeSupervisor.id" onChange={(e)=>handleChange(e,'employeeSupervisor.id')}>
                            <option value={-1}>-- select --</option>   
                                {
                                  allEmployeesCols.map((eml)=>(
                                    <option value={eml.id}>{eml && eml.code} - {eml && eml.fullName}</option>
                                  ))
                                }
                              </select>
                          </Col>
                        </Row>
                        <Row className='mt-3'>
                          <Col sm='1'> </Col>
                          <Col sm='3'>
                            <label>Id card</label>
                            <input type="text" placeholder="" id="idCardNo" className='form-control'
                            value={employee.idCardNo} onChange={(e)=>handleChange(e,'idCardNo')}/>
                          </Col>
                          <Col sm='3'>
                            <label>Contact Number</label>
                            <input type="text" placeholder="" id="department" className='form-control'
                            value={employee.contactNumber} onChange={(e)=>handleChange(e,'contactNumber')}/>
                          </Col>
                          <Col sm='3'>
                            <label>Aadhar Number</label>
                            <input type="text" placeholder="" id="designation" className='form-control'
                            value={employee.aadharNumber} onChange={(e)=>handleChange(e,'aadharNumber')}/>
                          </Col>
                        </Row>
                        <Row className='mt-3'>
                          <Col sm='1'> </Col>
                          <Col sm='3'>
                            <label>Sub Employee Type</label>
                            <select placeholder="select-name" className='form-select' id="subEmployeeType.id" onChange={(e)=>handleChange(e,'subEmployeeType.id')}>
                              <option value={-1}>-- select --</option>   
                                
                            </select>
                          </Col>
                          <Col sm='3'>
                            <label>Past Organization</label>
                            <select placeholder="select-name" className='form-select' id="pastOrgDepartment.id" onChange={(e)=>handleChange(e,'pastOrgDepartment.id')}>
                              <option value={-1}>-- select --</option>   
                                
                            </select>
                          </Col>
                          <Col sm='3'>
                            <label>Tenure ExpiryDate From</label>
                            <input type="date" placeholder="" id="tenureExpiryDateFrom" className='form-control'
                             onChange={(e)=>handleChange(e,'tenureExpiryDateFrom')}/>
                          </Col>
                        </Row>
                        <Row className='mt-3'>
                          <Col sm='1'> </Col>
                          <Col sm='3'>
                            <label>Joining Date From</label>
                            <input type="date" placeholder="" id="joiningDateFrom" className='form-control'
                             onChange={(e)=>handleChange(e,'joiningDateFrom')}/>
                          </Col>
                          <Col sm='3'>
                            <label>Joining Date To</label>
                            <input type="date" placeholder="" id="joiningDateTo" className='form-control'
                             onChange={(e)=>handleChange(e,'joiningDateTo')}/>
                          </Col>
                          <Col sm='3'>
                            <label>Tenure ExpiryDate To</label>
                            <input type="date" placeholder="" id="tenureExpiryDateTo" className='form-control'
                             onChange={(e)=>handleChange(e,'tenureExpiryDateTo')}/>
                          </Col>
                        </Row>
                        <Row className='mt-3'>
                          <Col sm='1'> </Col>
                          <Col sm='3'>
                            <label>Retirement Date From</label>
                            <input type="date" placeholder="" id="retirementDateFrom" className='form-control'
                             onChange={(e)=>handleChange(e,'retirementDateFrom')}/>
                          </Col>
                          <Col sm='3'>
                            <label>Retirement Date To</label>
                            <input type="date" placeholder="" id="retirementDateTo" className='form-control'
                             onChange={(e)=>handleChange(e,'retirementDateTo')}/>
                          </Col>
                          <Col sm='3'>
                            <label>HKRNL Serial No</label>
                            <input type="text" placeholder="" id="hkrnlSlNo" className='form-control'
                             onChange={(e)=>handleChange(e,'hkrnlSlNo')}/>
                          </Col>
                        </Row>
                        <Row className='mt-3'>
                          <Col sm='1'> </Col>
                          <Col sm='3'>
                            <label>HKRNL Employee Id</label>
                            <input type="text" placeholder="" id="hkrnlEmployeeId" className='form-control'
                             onChange={(e)=>handleChange(e,'hkrnlEmployeeId')}/>
                          </Col>
                          <Col sm='3'></Col>
                          <Col sm='3'></Col>
                          <Col sm='2'>                         
                            <Button className='form-control mt-4 btn btn-success' onClick={filterEmployeeByDeptStaffType}>
                                Filter Employee
                            </Button>
                          </Col>
                        </Row>                                     
                    </CardBody>
                    <Card>
                    
                    {employeeById?                       
                      <CardBody className='form-shadow' style={{minWidth:'75rem'}}>
                          <Table striped>
                              <thead>
                                <tr>
                                  <th scope='row'>Employee</th>
                                  <th scope='row'>Details</th>                      
                                  <th scope='row'>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                                              
                                  <tr key={employeeById.id}>                                    
                                    <td style={{width:'60%'}}>[{employeeById && employeeById.code}] : {employeeById && employeeById.fullName} {"    "} ({employeeById && employeeById.designationDto && employeeById.designationDto.name})
                                      <table style={{fontSize:'0.8rem'}}>
                                      <tr>
                                        <label>Dept : {employeeById.departmentDto && employeeById.departmentDto.name}</label>
                                      </tr>
                                      <tr>
                                        <label><Email/><i> : {employeeById.officialMail}</i></label>
                                      </tr>
                                      <tr>
                                        <label><Phone/><i> : {employeeById.phoneNo}</i></label>
                                      </tr>  
                                      </table>                                    
                                    </td>
                                    <td style={{width:'25%'}}>
                                      <table style={{fontSize:'0.8rem'}}>
                                        <tr>
                                          <label>Aadhar No : {employeeById.uniqueIdNo}</label>
                                        </tr>
                                        <tr>
                                          <label>PAN No<i> : {employeeById && employeeById.panNumber}</i></label>
                                        </tr>
                                        <tr>
                                          <label>Joining Date<i> : {employeeById.joinDate}</i></label>
                                        </tr>  
                                      </table>
                                    </td>
                                    <td style={{width:'25%'}}>
                                      
                                        <table style={{fontSize:'0.8rem'}}>
                                          <tr>
                                            <td style={{width:'2rem'}}>
                                              <label><Link onClick={()=>toggle(employeeById,'photo')} title='Click here to view photo'><Photo/>{"  "}</Link></label>
                                            </td>
                                            <td>
                                              <label><Link onClick={()=>toggleSig(employeeById)} title='Click here to view signature'><FaFileSignature color='blue' size='1.4rem'/>{"  "}</Link></label>
                                            </td>
                                            <td style={{width:'2rem'}}>
                                              <label><Link to={`/establishmentTransactions/editGeneralEmployeeTab/${employeeById.id}`} title='Click here to Edit Profile'><Edit color='green'/></Link></label>
                                            </td>                                            
                                          </tr>
                                          <tr>.</tr>
                                          <tr>
                                            <td style={{width:'2rem'}}>
                                              <label><Link onClick={()=>toggleStore(employeeById)} title='Click here to view store issue'><BsCartCheckFill color='tomato' size='1.4rem'/></Link></label>
                                            </td>
                                            <td>
                                              <label><Link onClick={()=>toggleAadhar(employeeById)} title='Click here to view Aadhar number'><FaIdCard color='green' size='1.4rem'/></Link></label>
                                            </td>
                                            <td style={{width:'2rem'}}>
                                              <label><Link onClick={()=>toggleDoc(employeeById)} title='Click here to view uploaded docs.'><DocumentScannerTwoTone color='green'/></Link></label>
                                            </td> 
                                          </tr>
                                           
                                        </table>
                                    </td>
                                  </tr>
                                                                   
                              </tbody>
                          </Table>
                      </CardBody>
                    :
                      <p>No data available</p>
                    }
                  {/*
                    {filteredList.length>0?                       
                      <CardBody className='form-shadow' style={{minWidth:'75rem'}}>
                          <Table striped>
                              <thead>
                                <tr>
                                  <th scope='row'>Employee</th>
                                  <th scope='row'>Details</th>                      
                                  <th scope='row'>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                filteredList && filteredList.map((ele)=>(
                                  <tr key={ele.id}>                                    
                                    <td style={{width:'60%'}}>[{ele.code}] : {ele.fullName} {"    "} ({ele && ele.designation && ele.designation.name})
                                      <table style={{fontSize:'0.8rem'}}>
                                      <tr>
                                        <label>Dept : {ele.department && ele.department.name}</label>
                                      </tr>
                                      <tr>
                                        <label><Email/><i> : {ele.officialMail}</i></label>
                                      </tr>
                                      <tr>
                                        <label><Phone/><i> : {ele.phoneNo}</i></label>
                                      </tr>  
                                      </table>                                    
                                    </td>
                                    <td style={{width:'25%'}}>
                                      <table style={{fontSize:'0.8rem'}}>
                                        <tr>
                                          <label>Aadhar No : {ele.uniqueIdNo}</label>
                                        </tr>
                                        <tr>
                                          <label>PAN No<i> : {ele && ele.panNumber}</i></label>
                                        </tr>
                                        <tr>
                                          <label>Joining Date<i> : {ele.joinDate}</i></label>
                                        </tr>  
                                      </table>
                                    </td>
                                    <td style={{width:'25%'}}>
                                      
                                        <table style={{fontSize:'0.8rem'}}>
                                          <tr>
                                            <td style={{width:'2rem'}}>
                                              <label><Link onClick={()=>toggle(ele.id,'photo')} title='Click here to view photo'><Photo/>{"  "}</Link></label>
                                            </td>
                                            <td>
                                              <label><Link onClick={()=>toggleSig(ele.id)} title='Click here to view signature'><FaFileSignature color='blue' size='1.4rem'/>{"  "}</Link></label>
                                            </td>
                                            <td style={{width:'2rem'}}>
                                              <label><Link to={`/establishmentTransactions/editGeneralEmployeeTab/${ele.id}`} title='Click here to Edit Profile'><Edit color='green'/></Link></label>
                                            </td>                                            
                                          </tr>
                                          <tr>.</tr>
                                          <tr>
                                            <td style={{width:'2rem'}}>
                                              <label><Link onClick={()=>toggleStore(ele.id)} title='Click here to view store issue'><BsCartCheckFill color='tomato' size='1.4rem'/></Link></label>
                                            </td>
                                            <td>
                                              <label><Link onClick={()=>toggleAadhar(ele.id)} title='Click here to view Aadhar number'><FaIdCard color='green' size='1.4rem'/></Link></label>
                                            </td>
                                            <td style={{width:'2rem'}}>
                                              <label><Link onClick={()=>toggleDoc(ele.id)} title='Click here to view uploaded docs.'><DocumentScannerTwoTone color='green'/></Link></label>
                                            </td> 
                                          </tr>
                                           
                                        </table>
                                    </td>
                                  </tr>
                                ))
                              }                      
                              </tbody>
                          </Table>
                      </CardBody>
                    :
                      <p>No data available</p>
                    }

                  */}
                    </Card>
                    {/* Sig Modal*/}
                    <Modal isOpen={modalSig} toggle={toggleSig}>
                      <ModalHeader toggle={toggleSig} style={{backgroundColor:'#b9d9fa'}}><FaFileSignature color='#ffff' size='1.4rem'/> Employee Signature</ModalHeader>
                      <ModalBody>
                        <Table>
                          <thead>
                            <th>Employee Full Name</th>
                            <th>Signature</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{user && user.fullName}</td>
                              <td><FaSignature/></td>
                            </tr>
                          </tbody>
                        </Table>
                      </ModalBody>
                      <ModalFooter style={{backgroundColor:'#b9d9fa'}}>
                        <Button color="secondary" onClick={toggleSig}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>

                    {/* Store Modal*/}
                    <Modal isOpen={modalStore} toggle={toggleStore}>
                      <ModalHeader toggle={toggleStore} style={{backgroundColor:'#fadac8'}}><BsCartCheckFill color='tomato'/> Employee Store</ModalHeader>
                      <ModalBody>
                        <p>
                          Name: {user && user.fullName}
                        </p>
                        <Table striped>
                          <thead>
                            <th scope="row">Issued Item</th>
                            <th scope="row">Issued Qty</th>
                            <th scope="row">Issued Date</th>
                          </thead>
                          <tbody>
                            <tr>                              
                              <td scope="row">HP Laptop</td>
                              <td scope="row">1</td>
                              <td scope="row">15-04-2023</td>
                            </tr>
                          </tbody>
                        </Table>
                      </ModalBody>
                      <ModalFooter style={{backgroundColor:'#fadac8'}}>
                        <Button color="secondary" onClick={toggleStore}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                    {/* Aadhar Modal*/}
                    <Modal isOpen={modalAadhar} toggle={toggleAadhar}>
                      <ModalHeader toggle={toggleAadhar} style={{backgroundColor:'#cffcec'}}><FaIdCard color='green'/> Employee Aadhar Number</ModalHeader>
                      <ModalBody>
                        <Table>
                          <thead>
                            <th>Employee Full Name</th>
                            <th>Aadhar Number</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{user && user.fullName}</td>
                              <td>{user && user.uniqueIdNo}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </ModalBody>
                      <ModalFooter style={{backgroundColor:'#cffcec'}}>
                        <Button color="secondary" onClick={toggleAadhar}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                    {/* Doc Modal*/}
                    <Modal isOpen={modalDoc} toggle={toggleDoc}>
                      <ModalHeader toggle={toggleDoc} style={{backgroundColor:'#94daf7'}}><DocumentScannerTwoTone color='blue'/> Employee Documents</ModalHeader>
                      <ModalBody>
                        <Table>
                          <thead>
                            <th>Documents</th>
                            <th>Submitted by</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Aadhar Card</td>
                              <td>12-02-2023</td>
                            </tr>
                          </tbody>
                        </Table>
                      </ModalBody>
                      <ModalFooter style={{backgroundColor:'#94daf7'}}>
                        <Button color="secondary" onClick={toggleDoc}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                    {/* Photo Modal*/}
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle} style={{backgroundColor:'#94daf7'}}><Photo style={{color:'#1d404f'}}/> Employee Photo</ModalHeader>
                        <ModalBody className='p-0'>
                          <Table>
                            <tbody>            
                              <tr>
                                <td>
                                {                             
                                  employeeById && employeeById.code=='20003' && boss_photo?
                                    <img src={boss_photo} width="90rem" height="110rem" text-align="center" />
                                    :
                                    <img src={<Image/>} width="90rem" height="110rem" text-align="center" />
                                }
                                </td>
                              </tr>
                              <tr>
                                <td>Name</td>
                                <td>
                                  [{user && user.code} ] - {user && user.fullName}
                                </td>
                              </tr>
                              <tr>
                                <td>Department Name</td>
                                <td>
                                  {user && user.departmentDto && user.departmentDto.name}
                                </td>
                              </tr>   
                            </tbody>
                          </Table>    
                        </ModalBody>

                        <ModalFooter style={{backgroundColor:'#94daf7'}}>
                          <Button color="secondary" onClick={toggle}>
                            Cancel
                          </Button>
                        </ModalFooter>
                    </Modal>
                    {/* End Photo Modal*/}
                    
                    {/*
                    <Card className='form-shadow'>
                    <CardHeader>Filtered Employees</CardHeader>                    
                    <CardBody>                      
                      {allEmployeesCols.length>0?
                        <DataGrid rows={filteredList} columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: { page: 0, pageSize: 20 },
                            },
                          }}
                          pageSizeOptions={[5, 10]}
                          checkboxSelection
                        />
                        :<p>No Data Available</p> 
                      }                    
                    </CardBody>
                    </Card>
                    */}
                    <CardFooter>
                    Footer
                    </CardFooter>
                </Card>
            </Col>
            </Row>
        </form>
    </div>
  )
}

export default CreateEmployeeTab;

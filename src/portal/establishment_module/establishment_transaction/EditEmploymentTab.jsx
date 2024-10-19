import React, { useEffect, useState } from 'react'
import { BiTable } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';
import { DatePicker } from 'reactstrap-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { showDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { editEmploymentEmployeeTab, showEmployeeById, showEmployeePopup, showEmploymentEmployeeById } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import "react-toastify/dist/ReactToastify.css";
import MyComponent from './MyComponent';
import { ToastContainer, toast } from 'react-toastify';
import { showBanks, showSalarySlab } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import Select from 'react-select';

const EditEmploymentTab = () => {
    const navigatePage=useNavigate();
    const {id} = useParams();
    const [employee,setEmployee] = useState();
    const dispatch = useDispatch();
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {employeeSelection,employmentEmployee,employmentLoading} = useSelector((state)=>state.allstorereducer.employeeData);
    const {banks,salarySlabs} = useSelector((state)=>state.allstorereducer.org);
    const [joinDate,setJoinDate] = useState();
    const [confirmationDate,setConfirmationDate] = useState();
    const [retirementDate,setRetirementDate] = useState();
    const [contractExpiryDate,setContractExpiryDate] = useState();
    const [contractRejoinDate,setContractRejoinDate] = useState();
    const [reportingDesignationDto,setReportingDesignationDto]=useState();
    const [reportingToEmployeeDto,setReportingToEmployeeDto]=useState();
    const [salarySlabDto,setSalarySlabDto]=useState();
    const [bankDto,setBankDto]=useState();
    const [selectedSupervisorOtion,setSelectedSupervisorOtion] = useState(null);
    const [isAction,setIsAction] = useState(false);

    const goback=()=>{
        window.history.back();
    }
    useEffect(()=>{
        dispatch(showDesignation());
        dispatch(showEmploymentEmployeeById(id));
        dispatch(showEmployeePopup());
        dispatch(showBanks());
        dispatch(showSalarySlab());
        setEmployee(employmentEmployee);
        if(employeeSelection.length>0){
            const tempEmp=employeeSelection.filter((emp)=>emp.id===(employmentEmployee && employmentEmployee.reportingToEmployeeDto && employmentEmployee.reportingToEmployeeDto.id));      
            if(tempEmp[0]){
              setSelectedSupervisorOtion({
                value:tempEmp[0].value,
                label:tempEmp[0].label
              })
            }
          }
        
        if(employmentEmployee && employmentEmployee.joinDate){
            //alert('joinDate='+employmentEmployee.joinDate instanceof Date)
            setJoinDate(getFormattedDate(new Date(employmentEmployee.joinDate)));
        }if(employmentEmployee && employmentEmployee.confirmationDate){
            //alert('confirmationDate='+employmentEmployee.confirmationDate)
            setConfirmationDate(getFormattedDate(new Date(employmentEmployee.confirmationDate)));
        }if(employmentEmployee && employmentEmployee.retirementDate){
            //alert('retirementDate='+employmentEmployee.retirementDate)
            setRetirementDate(getFormattedDate(new Date(employmentEmployee.retirementDate)));
        }if(employmentEmployee && employmentEmployee.contractExpiryDate){
            //alert('contractExpiryDate='+employmentEmployee.contractExpiryDate)
            setContractExpiryDate(getFormattedDate(new Date(employmentEmployee.contractExpiryDate)));
        }if(employmentEmployee && employmentEmployee.contractRejoinDate){
            //alert('contractRejoinDate='+employmentEmployee.contractRejoinDate)
            setContractRejoinDate(getFormattedDate(new Date(employmentEmployee.contractRejoinDate)));
        }
        if(employmentEmployee && employmentEmployee.reportingDesignationDto && employmentEmployee.reportingDesignationDto.id){
            setReportingDesignationDto(employmentEmployee.reportingDesignationDto.id);
        }if(employmentEmployee && employmentEmployee.reportingToEmployeeDto && employmentEmployee.reportingToEmployeeDto.id){
            setReportingToEmployeeDto(employmentEmployee.reportingToEmployeeDto.id);
        }if(employmentEmployee && employmentEmployee.salarySlabDto && employmentEmployee.salarySlabDto.id){
            setSalarySlabDto(employmentEmployee.salarySlabDto.id);
        }if(employmentEmployee && employmentEmployee.bankDto && employmentEmployee.bankDto.id){
            setBankDto(employmentEmployee.bankDto.id);
        }

    }, []);
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
        return `${year}-${month}-${day}`;
    }
    const handleChange=(e)=>{
        if(e.target.name==="reportingDesignationDto.id"){
            setReportingDesignationDto(e.target.value);
            setEmployee({...employee,['reportingDesignationDto']:{'id':e.target.value,'code':'SBI'}});
        }else if(e.target.name==="reportingToEmployeeDto.id"){
            setReportingToEmployeeDto(e.target.value);
            setEmployee({...employee,['reportingToEmployeeDto']:{'id':e.target.value,'code':'SBI'}});
        }else if(e.target.name==="salarySlabDto.id"){
            setSalarySlabDto(e.target.value);
            setEmployee({...employee,['salarySlabDto']:{'id':e.target.value,'code':'SBI'}});
        }else if(e.target.name==="bankDto.id"){
            setBankDto(e.target.value);
            setEmployee({...employee,['bankDto']:{'id':e.target.value,'code':'SBI'}});
        }else {
            setEmployee({...employee,[e.target.name]:e.target.value});
        }       
        console.log(employee);       
    }
    const handleSupervisor=(data,field)=>{
        setSelectedSupervisorOtion(data);
        setEmployee({...employee, ['reportingToEmployeeDto']:data});
        console.log(employee);
      }
    function handleSubmit(e){
        if(id!=null && employee!=null){
            setIsAction(true);
            const employeeObj = {...employee,["id"]:id};
            dispatch(editEmploymentEmployeeTab(employeeObj));
            toast.success("Employee updated successfully.", {
                // Set to 5sec
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        navigatePage(`/establishmentTransactions/editGeneralEmployeeTab/${id}`);
    }
    const msgAlert=()=>{
        navigatePage("/establishmentTransactions/employeeRegister");
    }  

  return (
    <div>
        <form style={{height:'45rem'}}>
            <Row className="mt-1">
            <Col sm="12">
            <Card className='form-shadow'>
                <CardHeader>
                    <BiTable />Employeement Details
                </CardHeader>
                {
                    isAction && employmentLoading?
                    <CardBody>
                        <Table>
                            <tr></tr>
                            <tr></tr>
                            <tr>Updating ...<Spinner style={{color:'green'}}/> </tr>
                        </Table>
                    </CardBody>
                    :
                
                <CardBody>
                    {/*  hg */}
                    <Table >
                    <thead>
                        <MyComponent/>
                    </thead>
                    <tbody>
                        <tr>
                            <td><label>Date Of Joining</label>
                            <tr><td>
                                <input type='date' id="joinDate" name="joinDate" value={joinDate} onChange={(e)=>{handleChange(e)}} className='form-control'/>                            
                            </td>
                            <td>
                                <select id='sessionOfJoining' name='sessionOfJoining' onChange={(e)=>{handleChange(e)}}  className='form-select'>
                                    <option value="Fore Noon">Fore Noon</option>
                                    <option value="After Noon">After Noon</option>
                                </select>    
                            </td>
                            </tr>
                            </td>
                            <td>
                                <label>From Date</label>
                                <input type='date' id="confirmationDate" name="confirmationDate" value={confirmationDate} className='form-control' onChange={(e)=>{handleChange(e)}}/> 
                            </td>
                            <td>
                                <label>To Date</label>
                                <input type='date' id="retirementDate" name="retirementDate" value={retirementDate} className='form-control' onChange={(e)=>{handleChange(e)}}/> 
                            </td>
                            <td>
                                <label>Current Basic Pay</label>
                                <input type='text' id="currentBasic" name="currentBasic" value={employee && employee.currentBasic} className='form-control' onChange={(e)=>{handleChange(e)}}/> 
                            </td>
                        </tr>
                    </tbody>                   
                    <thead>               
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Supervisor Designation</label>
                                <select id='reportingDesignationDto.id' name='reportingDesignationDto.id' className='form-select' value={reportingDesignationDto} onChange={(e)=>{handleChange(e)}}>
                                {
                                    designations.map((dsg)=>(
                                    <option value={dsg.id}>{dsg.name}</option>
                                    ))
                                }
                                </select>
                            </td>
                            <td>
                                <label>Supervisor Employee</label>
                            {/*
                                <select id='reportingToEmployeeDto.id' name='reportingToEmployeeDto.id' className='form-select' value={employee && employee.reportingToEmployeeDto && employee.reportingToEmployeeDto.id} onChange={(e)=>{handleChange(e)}}>
                                {
                                    employeeSelection.map((dsg)=>(
                                    <option value={dsg.id}>{dsg.fullName}</option>
                                    ))
                                }
                                </select>
                            */}
                                <Select options={employeeSelection} id='reportingToEmployeeDto.id' name='reportingToEmployeeDto.id' onChange={(e)=>{handleSupervisor(e,"reportingToEmployeeDto.id")}} placeholder="- Search option -" 
                                    value={selectedSupervisorOtion} isSearchable={true}>

                                </Select>
                            {/*
                                <Select options={employeeSelection} id='id' placeholder="- Search option -" 
                                    value={showEmpName} 
                                    onChange={(e)=>handleSelect(e,'id')}
                                    isSearchable={true}>                             
                                </Select>
                            */}
                            </td>
                            <td>
                                <label>Pay Scale</label>  
                            {/*
                                <input type='text' id="salarySlab.id" name="salarySlab.id" value={employee && employee.salarySlabDto && employee.salarySlabDto.id} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            */}
                                <select id='salarySlabDto.id' name='salarySlabDto.id' className='form-select' value={salarySlabDto} onChange={(e)=>{handleChange(e)}}>
                                {
                                    salarySlabs.map((dsg)=>(
                                    <option value={dsg.id}>{dsg.name}</option>
                                    ))
                                }
                                </select>
                            </td>
                            <td>
                                <label>Current Basic</label>
                                <input type='text' id='currentBasic2' name='currentBasic2' value={employee && employee.currentBasic} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                        </tr>
                    </tbody>                    
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Bank Name</label>
                                {/*
                                <input type='text' id="bank.id" name="bank.id" value={employee && employee.bankDto && employee.bankDto.id} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                                */}
                                <select id='bankDto.id' name='bankDto.id' className='form-select' value={bankDto} onChange={(e)=>{handleChange(e)}}>
                                {
                                    banks.map((dsg)=>(
                                    <option value={dsg.id}>{dsg.name}</option>
                                    ))
                                }
                                </select>
                            </td>
                            <td>
                                <label>Bank Account No</label>
                                <input type='text' id='bankAcc' name='bankAcc' value={employee && employee.bankAcc} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                            <td>
                                <label>IFSC Code</label>
                                <input type='text' id='ifscCode' name='ifscCode' value={employee && employee.ifscCode} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                            <td>
                                <label>PAN</label>
                                <input type='text' id='panNumber' name='panNumber' value={employee && employee.panNumber} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                        </tr>
                    </tbody>                    
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Subscription Type</label>
                                <input type='text' id='pensionPlan' name='pensionPlan' value={employee && employee.pensionPlan} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                            <td>
                                <label>Pran</label>
                                <input type='text' id='cprNo' name='cprNo' value={employee && employee.cprNo} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                            <td>
                                <label>Budget Type</label>
                                <input type='text' id="budgetType.id" name="budgetType.id" value={employee && employee.budgetType && employee.budgetType.id} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                            <td>
                                <label>Parivar Pehchan Patra(PPP)</label>
                                <input type='text' id='familyIdentificationId' name='familyIdentificationId' value={employee && employee.familyIdentificationId} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label>Contract Tenure Rejoin Date</label>
                                <input type='date' id="contractRejoinDate" name="contractRejoinDate" value={contractRejoinDate} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                            <td>
                                <label>Contract Tenure Expiry Date</label>
                                <input type='date' id="contractExpiryDate" name="contractExpiryDate" value={contractExpiryDate} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                            <td>
                                <label>Employee Grade</label>
                                <input type='text' id='empGrade' name='empGrade' value={employee && employee.empGrade} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                            <td>
                                <label>Pay Level</label>
                                <input type='text' id='payLevel' name='payLevel' value={employee && employee.payLevel} className='form-control' onChange={(e)=>{handleChange(e)}}/>
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>                                              
                            </td>
                            <td>                                      
                            </td>
                            <td>                   
                            </td>
                            <td>
                                <Button color='info' onClick={(e)=>{handleSubmit(e)}}>Update</Button>
                                <Button color='warning' onClick={msgAlert}>Cancel</Button>{" "}
                            </td>
                        </tr>
                    </tbody>
                    </Table>
                </CardBody>
                }  
            </Card>
            </Col>
            <ToastContainer>
            </ToastContainer>
        </Row>
        </form>
    </div>
  )
}

export default EditEmploymentTab;

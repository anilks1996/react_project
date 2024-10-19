import { ArrowBack} from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { showEmployeeById, showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { Button, Card, CardBody, CardFooter,Col, Row, CardHeader, Table} from 'reactstrap';
import { getDeputationListSR, getIncrementCollSR, getJobLocationListSR, getJoiningCollSR, getPromotionCollSR, getTansferCollSR, getTerminationCollSR} from '../establishment_redux/slices/establishment_slice/serviceRegisterSlice';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';


const ServiceRegisterList = () => {
    const dispatch = useDispatch();
    const [employeeName, setEmployeeName] = useState([]);
    const [employee,setEmployee]=useState();
    const [filteredList,setFilteredList] = useState([]);
    const {employeeSelection,employeeById} = useSelector((state)=>state.allstorereducer.employeeData);
    const {serviceRegisters}=useSelector((state)=>state.allstorereducer.srRegister);
    const {srjoinings,srpromotions,srtransfers,srincrements,srterminations,srdeputations,srjoblocations}=useSelector((state)=>state.allstorereducer.srRegister);
    const [saveRegister,setSaveRegister]=useState();
    const [isEmpDetail,setIsEmpDetail] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () =>{
      setModal(!modal);
      setEmployee(null)
    }
    
    const goback=()=>{
        window.history.back();
    }

    useEffect(()=>{
      dispatch(showEmployeePopup());
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);
    
    function handleEmpSelect(data,field) {
      setIsEmpDetail(true);
      setEmployee({...employee,[field]:data.value});         
      console.log(employee);
      setEmployeeName(data);
      dispatch(showEmployeeById(data.value));
      dispatch(getJoiningCollSR(data.value));
      dispatch(getPromotionCollSR(data.value));
      dispatch(getTansferCollSR(data.value));
      dispatch(getIncrementCollSR(data.value));
      dispatch(getTerminationCollSR(data.value));
      dispatch(getDeputationListSR(data.value));
      dispatch(getJobLocationListSR(data.value));
    }
   
    const fetchDetailSR=(e)=>{
      //setEmployee({...employee,[field]:data.value});         
      console.log(employee);
      if(employee && employee.empId){
        dispatch(showEmployeeById(employee.empId));
        dispatch(getJoiningCollSR(employee.empId));
        dispatch(getPromotionCollSR(employee.empId));
        dispatch(getTansferCollSR(employee.empId));
        dispatch(getIncrementCollSR(employee.empId));
        dispatch(getTerminationCollSR(employee.empId));
        dispatch(getDeputationListSR(employee.empId));
        dispatch(getJobLocationListSR(employee.empId));
      }else{
        toast.info("Please select employee!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      }
    }

    function getFormattedDate(date) {
      if(date.getFullYear()!=1970){
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
        return `${day}-${month}-${year}`;
      }
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
            <CardBody className='form-shadow p-1'>
                <Row>
                  <Col sm='10'>
                    Employee Code / Name
                    <Select options={employeeSelection} id='empId' placeholder="- Search option -" value={employeeName}
                        onChange={(e)=>handleEmpSelect(e,'empId')}
                        isSearchable={true} className='mb-2'>                             
                    </Select>                     
                  </Col>
                  <Col sm='2' className='mt-4'>
                  <Button color="danger" onClick={fetchDetailSR}>
                    Filter
                  </Button>
                </Col>
              </Row>             
            </CardBody>
            <CardBody className='form-shadow p-0' style={{textAlignLast:'center'}}>
            {
              isEmpDetail && employeeById && employeeById.id!=null?     
              <div>
              <b>Employee Details</b>
              <Table striped>
                <tbody>
                  <tr >
                    <th style={{textAlignLast:'right'}}>Name </th>
                    <th style={{textAlignLast:'center'}}>:</th>
                    <td style={{textAlignLast:'left'}}>[{employeeById && employeeById.code}] {employeeById && employeeById.fullName}</td>
                  </tr>
                  <tr>
                    <th style={{textAlignLast:'right'}}>Employee Type </th>
                    <th>:</th>
                    <td style={{textAlignLast:'left'}}>{employeeById && employeeById.employeeTypeDto && employeeById.employeeTypeDto.name}</td>
                  </tr>
                  <tr>
                    <th style={{textAlignLast:'right'}}>Staff Type </th>
                    <th>:</th>
                    <td style={{textAlignLast:'left'}}>{employeeById && employeeById.staffTypeDto && employeeById.staffTypeDto.name}</td>
                  </tr>
                  <tr>
                    <th style={{textAlignLast:'right'}}>Department </th>
                    <th>:</th>
                    <td style={{textAlignLast:'left'}}>{employeeById && employeeById.departmentDto && employeeById.departmentDto.name}</td>
                  </tr>
                  <tr>
                    <th style={{textAlignLast:'right'}}>Designation </th>
                    <th>:</th>
                    <td style={{textAlignLast:'left'}}>{employeeById && employeeById.designationDto && employeeById.designationDto.name}</td>
                  </tr>
                  <tr>
                    <th style={{textAlignLast:'right'}}>Pay Scale </th>
                    <th>:</th>
                    <td style={{textAlignLast:'left'}}>{employeeById && employeeById.swiftCode}</td>
                  </tr>
                  <tr>
                    <th style={{textAlignLast:'right'}}>Basic </th>
                    <th>:</th>
                    <td style={{textAlignLast:'left'}}>{employeeById && employeeById.currentBasic}</td>
                  </tr>
                </tbody>
              </Table>
              </div>
            :
            <div>                
            </div>
            }
            </CardBody>
            {/* Joining Details*/}
            {
            srjoinings && srjoinings.length>0?            
            
            <CardBody className='form-shadow p-0'>
              <Accordion defaultExpanded  className='form-shadow p-1'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header" style={{textAlignLast:'center'}}
                >
                <Typography sx={{ width: '95%', flexShrink: 0 }}><b> Joining Details</b></Typography>                  
                </AccordionSummary>
                <AccordionDetails>
                  <Table striped>
                    <thead>
                      <th>Date of Joining</th>
                      <th>Employee Type</th>
                      <th>Staff Type</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Type</th>
                    </thead>
                    <tbody>
                    {
                      srjoinings.map((join)=>(
                        <tr key={join.id}>
                          <th>{getFormattedDate(new Date(join && join.fromDate))}</th>
                          <th>{join && join.employee && join.employee.employeeType && join.employee.employeeType.name}</th>
                          <td>{join && join.employee && join.employee.employeeType && join.employee.employeeType.name}</td>
                          <td>{join && join.employee && join.employee.department && join.employee.department.name}</td>
                          <td>{join && join.employee && join.employee.designation && join.employee.designation.name}</td>  
                          <th>{join && join.type}</th>                    
                        </tr> 
                      ))
                    }                                          
                    </tbody>
                  </Table>
                </AccordionDetails>               
              </Accordion>             
            </CardBody>
            :
            <div></div>
          }
          {/* End Joining Details */}
          {/* Promotion Details*/}
          {
            srpromotions && srpromotions.length>0?            
            
            <CardBody className='form-shadow p-0'>
              <Accordion defaultExpanded  className='form-shadow p-1'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header" style={{textAlignLast:'center'}}
                >
                <Typography sx={{ width: '95%', flexShrink: 0 }}><b> Promotion Details</b></Typography>                  
                </AccordionSummary>
                <AccordionDetails>
                  <Table striped>
                    <thead>
                      <th>From Designation</th>
                      <th>From Employee Type</th>
                      <th>From StaffType</th>
                      <th>Date of Promotion</th>
                      <th>To Designation</th>
                      <th>To EmployeeType</th>
                      <th>To Staff Type</th>
                      <th>Date of Approval</th>
                    </thead>
                    <tbody>
                    {
                      srpromotions.map((join)=>(
                        <tr key={join.id}>
                          <td>{join && join.originDesignation && join.originDesignation.name}</td>
                          <td>{join && join.empType && join.empType.name}</td>
                          <td>{join && join.originStaffType && join.originStaffType.name}</td>
                          <td>{getFormattedDate(new Date(join && join.fromDate))}</td>  
                          <td>{join && join.desig && join.desig.name}</td> 
                          <td>{join && join.empType && join.empType.name}</td> 
                          <td>{join && join.stfType && join.stfType.name}</td>   
                          <td>{getFormattedDate(new Date(join && join.approvedDate))}</td>      
                        </tr> 
                      ))
                    }                                          
                    </tbody>
                  </Table>
                </AccordionDetails>               
              </Accordion>             
            </CardBody>
            :
            <div></div>
          }
          {/* End Promotion Details */}
          {/* Transfer Details*/}
          {
            srtransfers && srtransfers.length>0?            
            
            <CardBody className='form-shadow p-0'>
              <Accordion defaultExpanded  className='form-shadow p-1'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header" style={{textAlignLast:'center'}}
                >
                <Typography sx={{ width: '95%', flexShrink: 0 }}><b>Transfer Details</b></Typography>                  
                </AccordionSummary>
                <AccordionDetails>
                  <Table striped>
                    <thead>
                      <th>From Department</th>
                      <th>From Designation</th>
                      <th>Type</th>
                      <th>Date of Transfer</th>
                      <th>To Department</th>
                      <th>To Designation</th>
                      <th>Payband</th>
                      <th>Remarks</th>
                      <th>Date of Approval</th>
                    </thead>
                    <tbody>
                    {
                      srtransfers.map((join)=>(
                        <tr key={join.id}>
                          <td>{join && join.originDepartment && join.originDepartment.name}</td>
                          <td>{join && join.originDesignation && join.originDesignation.name}</td>
                          <td>{join && join.type}</td> 
                          <td>{getFormattedDate(new Date(join && join.fromDate))}</td>  
                          <td>{join && join.dept && join.dept.name}</td> 
                          <td>{join && join.desig && join.desig.name}</td> 
                          <td>{join && join.salarySlab && join.salarySlab.name} N/A</td> 
                          <td>{join && join.remark}</td>   
                          <td>{getFormattedDate(new Date(join && join.approvedDate))}</td>      
                        </tr> 
                      ))
                    }                                          
                    </tbody>
                  </Table>
                </AccordionDetails>               
              </Accordion>             
            </CardBody>
            :
            <div></div>
          }
          {/* End Transfer Details */}
          {/* Increment Details*/}
          {
            srincrements && srincrements.length>0?            
            
            <CardBody className='form-shadow p-0'>
              <Accordion defaultExpanded  className='form-shadow p-1'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header" style={{textAlignLast:'center'}}
                >
                <Typography sx={{ width: '95%', flexShrink: 0 }}><b>Transfer Details</b></Typography>                  
                </AccordionSummary>
                <AccordionDetails>
                  <Table striped>
                    <thead>
                      <th>From salarySlab</th>
                      <th>From Payband</th>
                      <th>Date of Increment</th>
                      <th>To salarySlab</th>
                      <th>To Payband</th>
                      <th>No of Increment</th>
                      <th>Date of Approval</th>
                    </thead>
                    <tbody>
                    {
                      srincrements.map((join)=>(
                        <tr key={join.id}>
                          <td>{join && join.originSalarySlab && join.originSalarySlab.displayName}</td>
                          <td>{join && join.originBasic}</td>
                          <td>{getFormattedDate(new Date(join && join.fromDate))}</td>  
                          <td>{join && join.salarySlab && join.salarySlab.displayName}</td> 
                          <td>{join && join.newBasicPay}</td> 
                          <td>{join && join.noOfIncrement}</td> 
                          <td>{getFormattedDate(new Date(join && join.approvedDate))}</td>      
                        </tr> 
                      ))
                    }                                          
                    </tbody>
                  </Table>
                </AccordionDetails>               
              </Accordion>             
            </CardBody>
            :
            <div></div>
          }
          {/* End Increment Details */}
          {/* Termination Details*/}
          {
            srterminations && srterminations.length>0?            
            
            <CardBody className='form-shadow p-0'>
              <Accordion defaultExpanded  className='form-shadow p-1'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header" style={{textAlignLast:'center'}}
                >
                <Typography sx={{ width: '95%', flexShrink: 0 }}><b>Transfer Details</b></Typography>                  
                </AccordionSummary>
                <AccordionDetails>
                  <Table striped>
                    <thead>
                      <th>Fom Date</th>
                      <th>Type of Action</th>
                      <th>Remarks</th>
                      <th>Approval Date</th>
                    </thead>
                    <tbody>
                    {
                      srterminations.map((join)=>(
                        <tr key={join.id}>
                          <td>{getFormattedDate(new Date(join && join.fromDate))}</td>  
                          <td>{join && join.type}</td> 
                          <td>{join && join.remark}</td> 
                          <td>{getFormattedDate(new Date(join && join.approvedDate))}</td>      
                        </tr> 
                      ))
                    }                                          
                    </tbody>
                  </Table>
                </AccordionDetails>               
              </Accordion>             
            </CardBody>
            :
            <div></div>
          }
          {/* End Termination Details */}

          {/* Deputation Details*/}
          {
            srdeputations && srdeputations.length>0?            
            
            <CardBody className='form-shadow p-0'>
              <Accordion defaultExpanded  className='form-shadow p-1'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header" style={{textAlignLast:'center'}}
                >
                <Typography sx={{ width: '95%', flexShrink: 0 }}><b>EmployeeType Transfer Details</b></Typography>                  
                </AccordionSummary>
                <AccordionDetails>
                  <Table striped>
                    <thead>
                      <th>Fom Date</th>
                      <th>Type of Action</th>
                      <th>from StaffType</th>
                      <th>To StaffType</th>
                      <th>Remarks</th>
                    </thead>
                    <tbody>
                    {
                      srdeputations.map((join)=>(
                        <tr key={join.id}>
                          <td>{getFormattedDate(new Date(join && join.fromDate))}</td>  
                          <td>{join && join.type}</td> 
                          <td>{join && join.originStaffType && join.originStaffType.name}</td>
                          <td>{join && join.stfType && join.stfType.name}</td>
                          <td>{join && join.remark}</td> 
                        </tr> 
                      ))
                    }                                          
                    </tbody>
                  </Table>
                </AccordionDetails>               
              </Accordion>             
            </CardBody>
            :
            <div></div>
          }
          {/* End Deputation Details */}
          {/* JobLocation Details*/}
          {
            srjoblocations && srjoblocations.length>0?            
            
            <CardBody className='form-shadow p-0'>
              <Accordion defaultExpanded  className='form-shadow p-1'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header" style={{textAlignLast:'center'}}
                >
                <Typography sx={{ width: '95%', flexShrink: 0 }}><b>JobLocation Details</b></Typography>                  
                </AccordionSummary>
                <AccordionDetails>
                  <Table striped>
                    <thead>
                      <th>Fom Date</th>
                      <th>To Date</th>
                      <th>Location</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Country</th>
                    </thead>
                    <tbody>
                    {
                      srjoblocations.map((join)=>(
                        <tr key={join.id}>
                          <td>{getFormattedDate(new Date(join && join.fromDate))}</td>  
                          <td>{getFormattedDate(new Date(join && join.toDate))}</td>
                          <td>{join && join.location}</td>
                          <td>{join && join.city && join.city.name}</td>
                          <td>{join && join.city && join.city.state && join.city.state.name}</td>
                          <td>{join && join.city && join.city.state && join.city.state.country && join.city.state.country.name}</td>
                        </tr> 
                      ))
                    }                                          
                    </tbody>
                  </Table>
                </AccordionDetails>               
              </Accordion>             
            </CardBody>
            :
            <div></div>
          }
          {/* End Job Location Details */}
          <ToastContainer />
          <CardFooter>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default ServiceRegisterList;

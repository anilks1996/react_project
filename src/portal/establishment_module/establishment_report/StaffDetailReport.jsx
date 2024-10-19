import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table } from 'reactstrap';
import BASE_URL from '../../../serviceUrl/AxiosURL';
import Select from 'react-select';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployeesCols } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import axios from 'axios';


const StaffDetailReport = () => {
    const navigatePage=useNavigate();
    const [allEmployeesCols, setAllEmployeesCols]=useState([]);
    const [employeeList, setEmployeeList]=useState([]);
    const [empName, setEmpName] = useState();
    const [employee,setEmployee]=useState();
    const [category,setCategory] = useState([]);
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);
    const {allEmployees} = useSelector((state)=>state.allstorereducer.employeeData);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchAllEmployeesCols());   
        setAllEmployeesCols(allEmployees);
        //alert(allEmployeesCols)
        axios.get(BASE_URL+"employeeList").then((response)=>{
            setEmployeeList(response.data);
        });
        window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);
    const goback=()=>{
        window.history.back();
    }
    const searchDesignation=()=>{
        navigatePage("/establishmentTransactions/employeeRegister");
    }
    function handleSelect(data,field) {
        alert(data.label+", "+data.value+", "+field)  
        setEmployee({...employee,[field]:data.value});         
        console.log(employee)
        const empData=allEmployees.filter((emp)=>emp.id==data.value);
        setAllEmployeesCols(empData);
        setEmpName(data);
    }
    const handleChange=(event, field)=>{
        let pass=event.target.value;
        setEmployee({...employee,[field]:pass});
        console.log(employee);    
        if(event.target.value!=undefined && event.target.value!=-1){
          try{
            const filterd=allEmployeesCols.filter((obj)=>obj[field]==(event.target.value));
            setAllEmployeesCols(filterd);
            window.scrollTo(0, document.body.scrollHeight);
          }catch(error){
            alert('Please select another!!');
          } 
        }
      }
    const columns = [
        { field: 'code', headerName: 'Id', width: 90 },
        { field: 'fullName', headerName: 'Employee Name', width: 140 },
        { field: 'designation.name', headerName: 'Designation', width: 100 },
        { field: 'department.name', headerName: 'Department',width: 100, },
        { field: 'staffType.name', headerName: 'Staff Type',width: 100},
        { field: 'doj', headerName: 'Date of Joining', width: 90 },
        { field: 'emailId', headerName: 'Email Id', width: 110 },
        { field: 'phoneNo', headerName: 'Phone No', width: 90 },
        { field: 'reportingEmployee.fullName', headerName: 'Supervisor Name', width: 140 }
    ];

  return (
    <div>
      <form>
        <Card>
            <CardHeader  className='p-0'>
                <label>Establishment / AddLocationCreation</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={searchDesignation}>Excel</Button>
            </CardHeader>
            <CardBody className='form-shadow'>
                <Card>
                <Row>
                    <Col>
                        Employee Code / Name
                        <Select options={employeeList} id='id' placeholder="- Search option -" value={empName}
                                    onChange={(e)=>handleSelect(e,'id')}
                                    isSearchable={true}>                             
                                </Select> 
                    </Col>
                </Row>
                </Card>
            </CardBody>
            <CardBody className='form-shadow'>
                <Card>
                    <CardBody>                   
                        <Row>
                            <Col sm="3">
                                <label>Organization</label>  
                                <select placeholder="select-name" className='form-select' id="institution.id" onChange={(e)=>handleChange(e,'institution.id')}>
                                {
                                    institutions.map((org)=>(
                                    <option value={org.id}>{org.code}</option>
                                    ))
                                }
                                </select> 
                            </Col>
                            <Col sm="3">
                                <label>Department</label>
                                <select placeholder="select-name" className='form-select' id="department.id" onChange={(e)=>handleChange(e,'department.id')}>
                                <option value={-1}>-- select --</option>  
                                {
                                    departments.map((dpt)=>(
                                    <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                                    ))
                                }
                                </select>
                            </Col>
                            <Col sm="3">
                                <label>Gender</label>
                                        <select placeholder="select-name" className='form-select' id="gender" onChange={(e)=>handleChange(e,'gender')}>
                                            <option value={-1}>-- select --</option>
                                            <option value="Male">Male</option> 
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                </Col>
                            <Col sm="3">
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
                        <Row>
                            <Col sm="3">
                                <label>Category</label>  
                                <select placeholder="select-name" className='form-select' id="category" onChange={(e)=>handleChange(e,'category')}>
                                <option value={-1}>-- select --</option> 
                                    {
                                    category.map((org)=>(
                                        <option value={org.id}>{org.name}</option>
                                    ))
                                    }
                                </select>   
                            </Col>
                            <Col sm="3">
                                <label>staffType</label>
                                    <select placeholder="select-name" className='form-select' id="staffType.id" onChange={(e)=>handleChange(e,'staffType.id')}>
                                    <option value={-1}>-- select --</option> 
                                        {
                                        staffTypes.map((stf)=>(
                                            <option value={stf.id}>{stf.code}</option>
                                        ))
                                        }
                                    </select>
                            </Col>
                            <Col sm="3">
                                <label>Designation</label>
                                    <select placeholder="select-name" className='form-select' id="designation.id" onChange={(e)=>handleChange(e,'designation.id')}>
                                    <option value={-1}>-- select --</option> 
                                        {
                                        designations.map((dsg)=>(
                                            <option value={dsg.id}>{dsg.code} - {dsg.name}</option>
                                        ))
                                        }
                                    </select>
                            </Col>
                            <Col sm="3">
                                <label>Sub EmployeeType</label>
                                <select placeholder="select-name" className='form-select' id="subEmployeeType.id" onChange={(e)=>handleChange(e,'subEmployeeType.id')}>
                                <option value={-1}>-- select --</option>   
                                    
                                </select>
                            </Col>
                        </Row>    
                        <Row>
                            <Col sm="3">
                                <label>Past Organization Department</label>  
                                    <select placeholder="select-name" className='form-select' id="pastOrgDepartment.id" onChange={(e)=>handleChange(e,'pastOrgDepartment.id')}>
                                    <option value={-1}>-- select --</option>   
                                        
                                    </select>  
                            </Col>
                            <Col sm="3">
                                <label>Tenure Expiry Date From</label>
                                    <input type="date" placeholder="" id="tenureExpiryDateFrom" className='form-control'
                                    onChange={(e)=>handleChange(e,'tenureExpiryDateFrom')}/>
                            </Col>
                            <Col sm="3">
                                <label>Tenure Expiry Date To</label>
                                    <input type="date" placeholder="" id="tenureExpiryDateTo" className='form-control'
                                    onChange={(e)=>handleChange(e,'tenureExpiryDateTo')}/>
                            </Col>
                            <Col sm="3">
                            
                            </Col>
                        </Row>                               
                    </CardBody>
                </Card>
            </CardBody>
            <CardBody className='form-shadow'>
                <Card>
                    <Row>
                        <Col sm="3">
                            <label>Qualification Type</label> 
                                <select placeholder="select-name" className='form-select' id="qualificationType.id" onChange={(e)=>handleChange(e,'qualificationType.id')}>
                                <option value={-1}>-- select --</option>   
                                    
                                </select>  
                        </Col>
                        <Col sm="3">
                            <label>Course</label>
                                <select placeholder="select-name" className='form-select' id="course.id" onChange={(e)=>handleChange(e,'course.id')}>
                                <option value={-1}>-- select --</option>   
                                    
                                </select> 
                        </Col>
                        <Col sm="3">
                            <label>Descipline</label>
                                <select placeholder="select-name" className='form-select' id="descipline.id" onChange={(e)=>handleChange(e,'descipline.id')}>
                                <option value={-1}>-- select --</option>   
                                    
                                </select>   
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button color='success'>Find Employee</Button>
                        </Col>
                    </Row>                  
                </Card>
            </CardBody>
            <CardBody className='form-shadow'>
                <Card>
                    {allEmployeesCols.length>0?
                        <DataGrid rows={allEmployeesCols} columns={columns}
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
                </Card>
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default StaffDetailReport;

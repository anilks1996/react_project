import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { getLoggedInEmployee } from '../../../auth/auth_slice/loginUserSlice';
import { GoWorkflow } from 'react-icons/go';
import { showCityByStateId, showCountry, showLocationInCityByCityId, showStateByCountryId } from '../establishment_redux/slices/establishment_slice/countryStateCityLocationSlice';
import BASE_URL from '../../../serviceUrl/AxiosURL';
import { Switch } from '@mui/material';
import { findNextEmployeeByCode } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { getTotalNoOfDays } from './tour_redux/tourSlices';


const TourApplicationForm = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigatePage = useNavigate();
    const back=()=>{window.history.back(); }
    const {loggedInEmployee} = useSelector((state)=>state.allstorereducer.user_token);
    const {nextEmployee} = useSelector((state)=>state.allstorereducer.employeeData);
    const {countries,states,cities,locationInCities,loading} = useSelector((state)=> state.allstorereducer.cscLocation);
    const [other,setOther] = useState(false);
    const [countryValue,setCountryValue] = useState(null);
    const [stateValue,setStateValue] = useState(null);
    const [cityValue,setCityValue] = useState(null);
    const [locationInCityValue,setLocationInCityValue] = useState(null);
    const [tourObj,setTourObj] = useState(null);
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [sDateValue,setSDateValue] = useState();
    const [eDateValue,setEDateValue] = useState();
    const [sTimeValue,setSTimeValue] = useState(null);
    const [eTimeValue,setETimeValue] = useState(null);
    

    useEffect(()=>{
        dispatch(getLoggedInEmployee());
        dispatch(showCountry());
        //dispatch(showStateByCountryId())
        window.scrollTo({top:'0',left:'0',behavior:'smooth'});
        dispatch(findNextEmployeeByCode(id));
        const fetchCountry=async()=>{
            try {
                const currentUser=localStorage.getItem("current-jwtToken");
                const response = await fetch(BASE_URL+"api/country/", {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
                    body: JSON.stringify(), // Convert JavaScript object to JSON
                });
                if (!response.ok) {
                    throw new Error('Failed to create record');
                }
                const result = await response.json();
                if(result && result.length>0){
                    const ctObj=result.filter(item => item.code==='India')
                    setCountryValue(ctObj[0].id);
                    //fetching state id 
                }
                if(countryValue!=undefined){
                    const response2 = await fetch(BASE_URL+`api/state/byCountryId/${countryValue}`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
                        body: JSON.stringify(), // Convert JavaScript object to JSON
                    });
                    const result2 = await response2.json();
                    if(result2 && result2.length>0){
                        const stObj=result2.filter(item2 => item2.code==='Haryana')
                        setStateValue(stObj[0].id);
                        //alert(stObj+", state")
                        dispatch(showCityByStateId(stObj[0].id));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchCountry();
    },[]);

    const handleChange=(e)=>{
        if(e.target.name==='locationInCity'){
            setLocationInCityValue(e.target.value);
            setTourObj({...tourObj,["locationInCity"]:{"id":e.target.value,"code":"sbi"}});
        }else{
            setTourObj({...tourObj,[e.target.name]:e.target.value});
        }
    }
    const validateDateForm=(e)=>{
        //if(startDate)
    }
    const validateTimeForm=(e)=>{
        
    }
    const handleFile=(e)=>{
        
    }
    const handleState=(e)=>{
        setCountryValue(e.target.value);
        setTourObj({...tourObj,["country"]:{"id":e.target.value,"code":"sbi"}});
        dispatch(showStateByCountryId(e.target.value));
    }
    const handleCity=(e)=>{
        setStateValue(e.target.value);
        setTourObj({...tourObj,["state"]:{"id":e.target.value,"code":"sbi"}});
        dispatch(showCityByStateId(e.target.value));
    }
    const handleLocationInCity=(e)=>{
        setCityValue(e.target.value);
        setTourObj({...tourObj,["city"]:{"id":e.target.value,"code":"sbi"}});
        dispatch(showLocationInCityByCityId(e.target.value));
    }
    const handleOtherLocation=(event)=>{
        event.preventDefault();
        setOther(!other);
    }
    const handleSubmit=(e)=>{

    }

    return (
        <form style={{minWidth:'80rem', fontSize:'0.9rem'}}>
            <Card className='form-shadow'>
                <CardHeader className='p-0'> 
                    <Row>
                        <Col sm={5}> <button className='btn btn-danger' onClick={back}> back </button> </Col>
                        <Col sm={6}><b style={{color:'purple'}}> Tour Application Form (Personal Detail) </b></Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col sm={4}>
                            <label> Name : {loggedInEmployee && loggedInEmployee.fullName}</label>
                        </Col>
                        <Col sm={4}>
                            <label> Department : {loggedInEmployee && loggedInEmployee.department && loggedInEmployee.department.name}</label>
                        </Col>
                        <Col sm={4}>
                            <label> Designation : {loggedInEmployee && loggedInEmployee.designation && loggedInEmployee && loggedInEmployee.designation.name}</label>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={4}>
                            <label> Staff Type : {loggedInEmployee && loggedInEmployee.staffType && loggedInEmployee.staffType.name}</label>
                        </Col>
                        <Col sm={4}>
                            <label> Email : {loggedInEmployee && loggedInEmployee.email}</label>
                        </Col>
                        <Col sm={4}>
                            <label> Phone No : {loggedInEmployee && loggedInEmployee.phoneNo}</label>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card className='form-shadow'>
                <CardHeader className='p-1'> 
                    <Row>
                        <Col sm={5}>  </Col>
                        <Col sm={6}><b style={{color:'darkgreen'}}> Tour Application Form </b></Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col sm={2}>
                            <label> Country : </label>
                        </Col>
                        <Col sm={3}>
                            
                                <select id='country.id' name='country.id' className='form-select' value={countryValue} onChange={handleState}>
                                {
                                    countries && countries.map((ctry)=>(
                                        <option value={ctry.id}> {ctry && ctry.name} </option>
                                    ))
                                }
                                </select>
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <label> State : </label>
                        </Col>
                        <Col sm={3}>
                            
                                <select id='state.id' name='state.id' className='form-select' value={stateValue} onChange={handleCity}>
                                <option value={null}>-- Select --</option>
                                {
                                    states && states.map((ctry)=>(
                                        <option value={ctry.id}> {ctry && ctry.name} </option>
                                    ))
                                }
                                </select>                           
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label> District : </label>
                        </Col>
                        <Col sm={3}>                            
                            <select id='city.id' name='city.id' className='form-select' value={cityValue} onChange={handleLocationInCity}>
                                <option value={null}>-- Select --</option>
                                {
                                    cities && cities.map((ctry)=>(
                                        <option value={ctry.id}> {ctry && ctry.name} </option>
                                    ))
                                }
                            </select>                           
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <label> Location in District : </label>
                        </Col>
                        <Col sm={3}>                           
                            {
                                other?
                                <textarea id='tourLocation' name='tourLocation' onChange={handleChange} type='text' className='form-control' placeholder='Enter location manually'/>
                                :
                                <select id='locationInCity.id' name='locationInCity.id' className='form-select' value={locationInCityValue} onChange={handleChange}>
                                <option value={null}>-- Select --</option>
                                {
                                    locationInCities && locationInCities.map((ctry)=>(
                                        <option value={ctry.id}> {ctry && ctry.name} </option>
                                    ))
                                }
                                </select>
                            } 
                        </Col>
                        <Col sm={1} className='mt-1'>
                            <button className='btn btn-success' onClick={handleOtherLocation}> Other </button>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label> From Date : </label>
                        </Col>
                        <Col sm={3}>                           
                            <input type='date' id='startDate' name='startDate' onChange={handleChange} className='form-control'/>
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <label> To Date : </label>
                        </Col>
                        <Col sm={3}>    
                            <input type='date' id='endDate' name='endDate' onChange={validateDateForm} className='form-control'/>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label> From Time : </label>
                        </Col>
                        <Col sm={3}>                           
                            <input type='time' id='startTime' name='startTime' onChange={handleChange} className='form-control'/>
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <label> To Time : </label>
                        </Col>
                        <Col sm={3}>                            
                            <input type='time' id='endTime' name='endTime' onChange={handleChange} className='form-control'/>
                        </Col>
                    </Row>                   
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label> Transportation Mode : </label>
                        </Col>
                        <Col sm={3}>                                                      
                            <select data-placeholder="Select Mode..." class="form-select" id="transportationMedium" name="transportationMedium" onChange={handleChange}>
                                <option label="BY CAR" value="BY CAR">BY CAR</option>
                                <option label="BY BIKE / SCOOTER" value="BY BIKE / SCOOTER">BY BIKE / SCOOTER</option>
                                <option label="BY OFFICE VEHICLE" value="BY OFFICE VEHICLE">BY OFFICE VEHICLE</option>
                                <option label="BY HIRED VEHICLE" value="BY HIRED VEHICLE">BY HIRED VEHICLE</option>
                                <option label="BY AUTO" value="BY AUTO">BY AUTO</option>
                                <option label="BY ERICKSHAW / RICKSHAW" value="BY ERICKSHAW / RICKSHAW">BY ERICKSHAW / RICKSHAW</option>
                                <option label="BY TRAIN" value="BY TRAIN">BY TRAIN</option>
                                <option label="BY BUS" value="BY BUS">BY BUS</option>
                                <option label="BY AIR" value="BY AIR">BY AIR</option>
                                <option label="BY OTHERS" value="BY OTHERS">BY OTHERS</option>
                            </select>                                                            
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <label> No Of Days : </label>
                        </Col>
                        <Col sm={3}>                            
                            <input type='number' id='noOfDays' name='noOfDays' onChange={handleChange} className='form-control'/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}></Col>
                        <Col sm={6}></Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label> Total Distance [in km] [if Round Trip Please Click checkBox]: </label>
                        </Col>
                        <Col sm={3}>                            
                            <Switch {...label} name='isReturnTrip' color="success" onChange={handleChange} />
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <label> If any ( Invetation, Tour, Conference, Offiicial Work, Email Attachment Letter)[in PDF file] : </label>
                        </Col>
                        <Col sm={3}>                           
                            <input id='nfile' name='nfile' type='file' className='form-control' onChange={handleFile}/>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label> Tour Against PROJECT : </label>
                        </Col>
                        <Col sm={3}>                           
                            <select data-placeholder="Select Mode..." class="form-select" id="isProject" name="isProject" onChange={handleChange}>
                                <option value={null}>-- Select --</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select> 
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <label> PROJECT : </label>
                        </Col>
                        <Col sm={3}>                           
                            <select data-placeholder="Select Mode..." class="form-select" id="projectProposal.id" name="projectProposal.id" onChange={handleChange}>
                                <option value={null}>-- Select --</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select> 
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label>Estimated trip expenses(INR) :</label>
                        </Col>
                        <Col sm={3}>                            
                            <input type='number' id='estimatedTripExpenses' name='estimatedTripExpenses' onChange={handleChange} className='form-control'/>
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <label>Advance Required if any :</label>
                        </Col>
                        <Col sm={3}>                            
                            <select data-placeholder="Select Mode..." class="form-select" id="advanceRequired" name="advanceRequired" onChange={handleChange}>
                                <option value={null}>-- Select --</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select> 
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label>Advance Amount (INR):</label>
                        </Col>
                        <Col sm={3}>                            
                            <input type='number' id='advanceAmount' name='advanceAmount' onChange={handleChange} className='form-control'/>
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <label>Purpose of Travelling :</label>
                        </Col>
                        <Col sm={3}>                           
                            <textarea id='travellingPurpose' name='travellingPurpose' onChange={handleChange} type='text' className='form-control' placeholder='Enter purpose'/>
                        </Col>
                    </Row>                   
                </CardBody>
            </Card>
            <Card className='form-shadow'>
                <CardHeader className='p-1'> 
                    <Row>
                        <Col sm={5}> <GoWorkflow/> </Col>
                        <Col sm={6}><b style={{color:'darkred'}}> Workflow </b></Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col sm={4}>
                            <label> FORWORDING TO CONSIDERATION :</label>
                        </Col>
                        <Col sm={4}>
                            <select id="campusWorkflowModel.nextEmployee.id" name="campusWorkflowModel.nextEmployee.id" onChange={handleChange} className='form-select'>                        
                                <option value={nextEmployee && nextEmployee.id}> {nextEmployee && nextEmployee.code} - {nextEmployee && nextEmployee.fullName} </option>
                            </select>
                        </Col>                        
                    </Row>
                    <Row className='mt-1'>
                        <Col sm={4}>
                            <label> PLEASE ENTER YOUR REMARKS FOR THE APPROVER :</label>
                        </Col>
                        <Col sm={4}>
                            <textarea id='campusWorkflowModel.remarks' name='campusWorkflowModel.remarks' onChange={handleChange} className='form-control' placeholder='Enter remarks'/>
                        </Col>                       
                    </Row>
                    <Row className='mt-3'>
                        <Col sm={4}>
                            <Button className='btn btn-danger' onClick={handleSubmit}> Submit </Button>
                        </Col>                      
                    </Row>
                </CardBody>
            </Card>
        </form>
    )
}

export default TourApplicationForm;
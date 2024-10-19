import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody, Table, CardFooter} from 'reactstrap';
import { ArrowBack, Block} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import Alert from '@mui/material/Alert';
import { createLeaveApplication, getListOfEligibleLeaves } from '../leave_module/leave_redux/slices/leave_slice/leaveMasterSlice';
import { Divider } from '@mui/material';
import { differenceInDays } from 'date-fns';
import { findNextEmployeeByCode } from '../establishment_module/establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { getActiveUserId } from '../../auth/auth_slice/loginUserSlice';


const ShowLeaveUserForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigatePage=useNavigate();
  const dispatch=useDispatch();
  const [userToken, setUserToken] = React.useState(false);
  const {activeUserId,loggedInUser,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
  const {leavePolicies,leaveApplications} = useSelector((state)=>state.allstorereducer.lvMaster);
  const {nextEmployee} = useSelector((state)=>state.allstorereducer.employeeData);
  const [leaveApp,setLeaveApp]=useState();

  const [policyIds,setPolicyIds]=useState([]);
  const [leaveFromDates,setLeaveFromDates]=useState('');
  const [leaveToDates,setLeaveToDates]=useState('');
  const [noOfDays,setNoOfDays]=useState();
  const [leaveFromTimes,setLeaveFromTimes]=useState([]); 
  const [leaveToTimes,setLeaveToTimes]=useState([]);
  const [leaveFromDateMap,setLeaveFromDateMap]=useState(new Map());
  const [leaveFromTimeMap,setLeaveFromTimeMap]=useState(new Map());
  const [leaveToDateMap,setLeaveToDateMap]=useState(new Map());
  const [leaveToTimeMap,setLeaveToTimeMap]=useState(new Map());
  const [policyIdMap,setPolicyIdMap]=useState(new Map());
  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(()=>{
    window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    dispatch(getActiveUserId());
    const uToken = localStorage.getItem('user-token');
    if(activeUserId!=null && activeUserId!=""){
        setUserToken(uToken);
        dispatch(getListOfEligibleLeaves(activeUserId));
        dispatch(findNextEmployeeByCode(uToken));
    }
    //Disable

  },[]);

  const goback=()=>{
    window.history.back();
  }
  
  const handleChange = (e,policId,lvMtrId) => {
    let checkbox=document.getElementById(e.target.name);   
    if(checkbox!==null && e.target.name.includes('lpId')){
        if(checkbox.checked && e.target.name.includes('lpId')){  
            policyIdMap.set(policId,lvMtrId);
            // console.log("checkbox.checked= "+checkbox.checked);   
            // const polId=[...policyIds,e.target.value];
            // setPolicyIds(polId);
            // console.log("polId= "+polId+", target "+e.target.value); 
            setLeaveApp({...leaveApp,['policyIds']:Object.fromEntries(policyIdMap)}); 
            document.getElementById("leaveFromDate"+policId).disabled=false;
            document.getElementById("leaveFromTime"+policId).disabled=false;
            document.getElementById("leaveToDate"+policId).disabled=false;
            document.getElementById("leaveToTime"+policId).disabled=false;
        }else if(checkbox.checked===false && e.target.name.includes('lpId')){
            policyIdMap.delete(policId);
            
            // console.log("removeItem invoked here");
            // const removeItem=policyIds.filter((item=> item!==e.target.value));
            // setPolicyIds(removeItem);
            setLeaveApp({...leaveApp,['policyIds']:policyIdMap}); 
            document.getElementById("leaveFromDate"+policId).disabled=true;
            document.getElementById("leaveFromTime"+policId).disabled=true;
            document.getElementById("leaveToDate"+policId).disabled=true;
            document.getElementById("leaveToTime"+policId).disabled=true;
            document.getElementById("leaveFromDate"+policId).value=null;
            document.getElementById("leaveFromTime"+policId).value=-1;
            document.getElementById("leaveToDate"+policId).value=null;
            document.getElementById("leaveToTime"+policId).value=-1;
            //unselect or delete
            if(leaveFromDateMap.has(policId+"#leaveFromDates")){
                leaveFromDateMap.delete(policId+"#leaveFromDates");
            }if(leaveFromTimeMap.has(policId+"#leaveFromTimes")){
                leaveFromTimeMap.delete(policId+"#leaveFromTimes");
            }if(leaveToDateMap.has(policId+"#leaveToDates")){
                leaveToDateMap.delete(policId+"#leaveToDates");
            }if(leaveToTimeMap.has(policId+"#leaveToTimes")){
                leaveToTimeMap.delete(policId+"#leaveToTimes");
            }
            if(policyIdMap.size === 0){
                console.log('policyids size = '+policyIdMap.size);
                setLeaveApp(null);
            }
        }   
        console.log(leaveApp);            
    }
    else if(e.target.name.includes('leaveFromDate')){
        setLeaveFromDates(e.target.value);
        leaveFromDateMap.set((policId+"#leaveFromDates"),e.target.value);
        setLeaveApp({...leaveApp,['leaveFromDates']:Object.fromEntries(leaveFromDateMap)}); 
        // if(leaveFromDates && leaveFromDates.includes(policId)){
        //     const removedItem=leaveFromDates.filter((item=> !item.includes(policId)));
        //     setLeaveFromDates(removedItem);
        //     const fdates=[...leaveFromDates,(policId+"#"+e.target.value)];
        //     setLeaveFromDates(fdates);
        //     setLeaveApp({...leaveApp,['leaveFromDates']:leaveFromDates}); 
        // }else{
        //     const fdates=[...leaveFromDates,(policId+"#"+e.target.value)];
        //     setLeaveFromDates(fdates);
        //     setLeaveApp({...leaveApp,['leaveFromDates']:leaveFromDates}); 
        // }  
        //console.log(leaveFromDateMap);        
    }
    else if(e.target.name.includes('leaveFromTime')){
        leaveFromTimeMap.set((policId+"#leaveFromTimes"),e.target.value); 
        setLeaveApp({...leaveApp,['leaveFromTimes']:Object.fromEntries(leaveFromTimeMap)});     
    }
    else if(e.target.name.includes('leaveToDate')){
        setLeaveToDates(e.target.value);
        calculateNoOfDays();
        leaveToDateMap.set((policId+"#leaveToDates"),e.target.value); 
        setLeaveApp({...leaveApp,['leaveToDates']:Object.fromEntries(leaveToDateMap)});     
    }
    else if(e.target.name.includes('leaveToTime')){
        leaveToTimeMap.set((policId+"#leaveToTimes"),e.target.value); 
        setLeaveApp({...leaveApp,['leaveToTimes']:Object.fromEntries(leaveToTimeMap)});      
    }else{
        setLeaveApp({...leaveApp,[e.target.name]:e.target.value});
    }
    console.log(leaveApp);
  };

  const calculateNoOfDays=()=>{
   
    const start = new Date(leaveFromDates);
    const end = new Date(leaveToDates);
    //alert("leaveFromDates="+leaveFromDates+",  leaveToDates="+end.getTime()+',  '+end)
    const differenceInTime = end.getTime() - start.getTime();  
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    setNoOfDays(differenceInDays);
    //alert("days="+differenceInTime+', '+(differenceInTime/(1000 * 3600 * 24)))
  }
  const checkCurrentRowDataFilled=(selectedPolicyId)=>{
    alert(document.getElementsByName("leaveFromDate"+selectedPolicyId).value===undefined);

  }

  const handleSubmitLeave=(e)=>{
   // addExtraProp(e);
    console.log(leaveApp);
    const updatedLeaveApp={...leaveApp,
        ['enteredByDto']:{'id':12345,'code':activeUserId},
        ['employeeDto']:{'id':12345,'code':activeUserId},
        'cwmNextEmployeeId':nextEmployee.id
    };
    dispatch(createLeaveApplication(updatedLeaveApp));
    alert('submit '+userToken);
    if(leaveApplications){
        toast.success('Leave applied successfully.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigatePage("/employeeUserInbox");
    }else{
        toast.error('Something went wrong!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    console.log(leaveApp);
  }

  function addExtraProp(e){
    setLeaveApp({...leaveApp, ['enteredByDto']:{'id':12345,'code':userToken,'remarks':e.target.value}})
    console.log(leaveApp);
  }

  return (
    <div style={{minWidth:'78rem',fontSize:'0.9rem'}} className='form-shadow'>
            <Card>
                <CardHeader className='p-0'> <Button color='warning' onClick={goback}><ArrowBack/></Button> {" "} 
                    <Alert severity="info">Select Leave(s) you want to apply, add the Leave details and click on Submit button. Your leave will be forwarded for approval. </Alert>
                </CardHeader>
                <CardBody>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Leave</th>
                                <th>balance Leave(s)</th>
                                <th>From Date</th>
                                <th>Period</th>
                                <th>To Date</th>
                                <th>Period</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leavePolicies && leavePolicies.length>0 && leavePolicies.map((lvpcy)=>(
                                    <tr key={lvpcy.id} id={lvpcy.id}>
                                    {
                                        lvpcy && lvpcy.leaveDays>0?
                                        <td>                                     
                                            <input type='checkbox' onChange={(e)=>{handleChange(e,lvpcy.id,lvpcy.leaveMaster.id)}} id={'lpId'+lvpcy.id} name={'lpId'+lvpcy.id} className='p-2' value={lvpcy.id}/>
                                        </td>
                                        :
                                        <td>                                     
                                            <input type='checkbox' onChange={(e)=>{handleChange(e,lvpcy.id,lvpcy.leaveMaster.id)}} id={'lpId'+lvpcy.id} name={'lpId'+lvpcy.id} className='p-2' value={lvpcy.id} disabled={true}/>
                                        </td>
                                    }                                        
                                        <td>{lvpcy && lvpcy.leaveMaster && lvpcy.leaveMaster.name}</td>
                                        <td>{lvpcy && lvpcy.leaveDays} (BL)</td>
                                        <td><input type='date' id={'leaveFromDate'+lvpcy.id} name={'leaveFromDate'+lvpcy.id} className='form-control' placeholder='DD-MM-YYYY' onChange={(e)=>{handleChange(e,lvpcy.id,lvpcy.leaveMaster.id)}} disabled='true'/> </td>
                                        <td>
                                            <select id={'leaveFromTime'+lvpcy.id} name={'leaveFromTime'+lvpcy.id} className='form-select' onChange={(e)=>{handleChange(e,lvpcy.id)}}  disabled='true'>
                                                <option value={-1}>-- Select --</option>   
                                                <option value="Full Day">Full Day</option>
                                                <option value="Fore Noon">Fore Noon</option>
                                                <option value="After Noon">After Noon</option>
                                            </select>
                                        </td>
                                        <td><input type='date' id={'leaveToDate'+lvpcy.id} name={'leaveToDate'+lvpcy.id} className='form-control' placeholder='DD-MM-YYYY' onChange={(e)=>{handleChange(e,lvpcy.id,lvpcy.leaveMaster.id)}}  disabled='true'/> </td>
                                        <td>
                                            <select id={'leaveToTime'+lvpcy.id} name={'leaveToTime'+lvpcy.id} className='form-select' onChange={(e)=>{handleChange(e,lvpcy.id,lvpcy.leaveMaster.id)}}  disabled='true'>
                                                <option value={-1}>-- Select --</option> 
                                                <option value="Full Day">Full Day</option>
                                                <option value="Fore Noon">Fore Noon</option>
                                                <option value="After Noon">After Noon</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            }                       
                        </tbody>
                    </Table>                
                </CardBody>
                <CardFooter>Total Days: No of Leaves: {noOfDays}</CardFooter>
            </Card>
            <Divider/>
            <Card className='mt-2'>
                <CardHeader>Leave Details :- </CardHeader>
                <CardBody>
                    <Table striped>
                        <tbody>
                            <tr>
                                <td style={{color:'red'}}>* Supervisor Employee : [{nextEmployee && nextEmployee.code}]-{nextEmployee && nextEmployee.fullName}</td>
                            </tr>
                            <tr>
                                <td>
                                Reason For Leave(* Special characters are not allowed) : 
                                    <textarea id='reason' name='reason' className='form-control' rows={3} cols={100} onChange={handleChange}/>
                                </td>
                                <td>
                                Leave Notes : 
                                    <textarea id='teachingNote' name='teachingNote' className='form-control' rows={3} cols={100} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                medical Records Provided : 
                                    <select id='medicalReason' name='medicalReason' className='form-select' onChange={handleChange}>
                                        <option value={-1}>-- Select --</option> 
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </td>
                                <td>
                                Attach File : 
                                    <input type='file' id='leaveFile' name='leaveFile' className='form-control' onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                Address During Absence : 
                                    <textarea id='absentAddress' name='absentAddress' className='form-control' rows={3} cols={100} onChange={handleChange}/>                                    
                                </td>
                                <td>
                                Contact Phone : 
                                    <input type='text' id='contactPhone' name='contactPhone' className='form-control' onChange={handleChange}/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>    
                </CardBody>
                <CardFooter style={{textAlign:'center'}}>
                    <button className='btn btn-success' onClick={handleSubmitLeave} style={{textAlign:'center', width:'10rem'}}>Submit</button> 
                </CardFooter>
            </Card>
            
         <ToastContainer />
          
    </div>
  );
};

export default ShowLeaveUserForm;

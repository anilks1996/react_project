import React, {useEffect, useState} from 'react'
import { FaPlus, FaSave} from 'react-icons/fa'; 
import { Navigate, useNavigate } from 'react-router-dom';
import { Card,CardHeader,CardBody,Button,CardFooter,Table,Input, Label, NavItem } from "reactstrap";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {showStaffType} from '../../../establishment_module/establishment_redux/slices/establishment_slice/staffTypeSlice';
import {showEmployeeType} from '../../../establishment_module/establishment_redux/slices/establishment_slice/employeeTypeSlice';
import { ArrowBack, Margin } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer,toast } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';
import { showLeaveType } from '../../leave_redux/slices/leave_slice/leaveTypeSlice';
import { createLeavePolicy, editLeavePolicy, showLeavePolicy} from '../../leave_redux/slices/leave_slice/leavePolicySlice';

const AddLeavePolicy = ({direction,...args}) => {
    const dispatch = useDispatch();
    const navigatepage =useNavigate();
    const [updateLeavePolicy, setUpdateLeavePolicy]=useState();
  
    const [filteredList,setFilteredList]=useState([]);
    const toggle1 = () => {
      setUpdateLeavePolicy(null);

    }
    const {staffTypes} = useSelector((state)=> state.allstorereducer.stafft);
    const {leaveTypes} = useSelector((state)=> state.allstorereducer.lvType);
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=> setDropdownOpen((prevState)=>!prevState);

    useEffect(()=>{
      dispatch(showStaffType());
      dispatch(showEmployeeType());
      dispatch(showLeaveType());
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
    }, []);

    const updateLeavePolicyList=(empObj)=>{
      dispatch(editLeavePolicy(empObj));
      toast.success("Data updated successfully.");
    }

  const {employeeTypes} = useSelector((state)=> state.allstorereducer.empt);
  const leavePolicyDuration=[
    {"value":616263,"label":"--Select--"},
    {"value":495051,"label":"A Year"},
    {"value":495052,"label":"In Between Dates"},
    {"value":495053,"label":"Entire Service"}
  ]
  const [duration,setLeaveduration]=useState();
  function selectedEType(data){
    setLeaveduration(data);
  }
  const staffGrade=[
    {"value":616263,"label":"--Select--"},
    {"value":495051,"label":"NA"}
  ]
  const [grade,setStaffGrade]=useState();
  function selectedEType(data){
    setStaffGrade(data);
  }
  const noOfSplit=[
    {"value":616263,"label":"--Select--"},
    {"value":495051,"label":"1"},
    {"value":495051,"label":"2"},
    {"value":495051,"label":"3"},
    {"value":495051,"label":"4"},
    {"value":495051,"label":"5"},
    {"value":495051,"label":"6"},
    {"value":495051,"label":"7"},
    {"value":495051,"label":"8"},
    {"value":495051,"label":"9"},
    {"value":495051,"label":"10"},
    {"value":495051,"label":"11"},
    {"value":495051,"label":"12"}
  ]
  const [split,setSplit]=useState();
  function selectedEType(data){
    setSplit(data);
  }
  const [startDate, setStartDate] = useState(new Date());
  const leaveCreditedAt=[
    {"value":616263,"label":"Start"},
    {"value":495051,"label":"End"}
  ]
  const [leaveCreditAt, setleaveCreditedAt]=useState();
  function selectedEType(data){
    setleaveCreditedAt(data);
  }
  const Commuted=[
    {"value":616263,"label":"No"},
    {"value":495051,"label":"Yes"}
  ]
  const [isCommuted, setIsCommuted]=useState();
  function selectedEType(data){
    setIsCommuted(data);
  }
  const applicable=[
    {"value":616263,"label":"Female"},
    {"value":495051,"label":"Male"},
    {"value":495051,"label":"Both"}
  ]
  const [applicableGender, setapplicableGender]=useState();
  function selectedFType(data){
    setapplicableGender(data);
  }
  const [updateLeaveMaster, setUpdateLeaveMaster]=useState();
  const [staffType,setStaffType]=useState();
  function selectedLType(data){
       setStaffType(data);
  }
  const[selectedIds,setSelectedIds]=useState([]);
  const handleCheckboxChange=(event)=>{
    const checkedId = event.target.value;
    if(event.target.checked){
      setSelectedIds([...selectedIds,checkedId])
      }else{
        setSelectedIds(selectedIds.filter(id=>id !==checkedId))
      }
  }
  const [employeeType,setEmployeeType]=useState();
  function selectedRType(data){
    setEmployeeType(data);
  }
  const minServiceRequired=[
    {"value":585960,"label":"Year"},
    {"value":123456,"label":"Monthly"},
    {"value":789123,"label":"Days"},
  ]   
  const [minService, setMinService]=useState();
  function selectedRType(data){
    setMinService(data);
  }

  const [addleavename, setleavename]=useState({
  leavename:'',
  });

  const [maxLeaveStretch, setmaxLeaveStretch]=useState({
    maxLeaveStretch:'',
    });

  const [RestrictedCountForMaximumDays, setRestrictedCountForMaximumDays]=useState({
    RestrictedCountForMaximumDays:'',
      });


  const handleChange=(event, field)=>{
    let pass=event.target.value;
    setleavename(event.target.value);
    setmaxLeaveStretch(event.target.value);
    setRestrictedCountForMaximumDays(event.target.value);
    
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    alert('fill all data');
    dispatch(createLeavePolicy(updateLeavePolicy));
  
    toast.success("Data saved successfully.");
    dispatch (showLeavePolicy());
    setUpdateLeavePolicy(null);
    dispatch(showLeavePolicy());
  }
  const [institutionList, setInstitutionList]=useState([]);

  const filterOptionChange=(event, field)=>{
    alert('event='+field);
  }
  const createholiday=(event,field)=>{
    alert('event='+field);
    navigatepage("");
  };
  const Goback = () => {
    window.history.back();
  }
  return (
    <div>
    <form>
             <Card style={{width:'100%'}} className='form-shadow'>
             <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack></ArrowBack> </Button>&nbsp;
             <Button id='radioA' name='Button' onClick={createholiday}><FaSave/> SAVE </Button></CardHeader>
             <CardHeader>
                    <i><label>Leave Setup / Create New Policy </label></i>                                          
             </CardHeader>
              <CardBody>
                <CardHeader>
                 Leave Policy Rules
                </CardHeader>
                <CardBody>
                  <Table>
                   <thead>
                    <tr>
                    <th>
                    <span>*</span>Leave Policy Duration</th>
                     <th>
                      <Select options={leavePolicyDuration} id='id' value={duration}
                       onChange={(e)=>handleChange(e, selectedEType)}
                      />     
                      </th>
                      <th>Start Date</th>
                       <th>
                       <input type='date' onChange={(date) =>handleChange (date, setStartDate)}/>
                        </th>
                        <th>End Date</th>
                        <th>
                        <input type='date' onChange={(date) =>handleChange (date, setStartDate)}/>                       
                      </th>
                      </tr>
                      </thead>
                      <tr></tr>
                      <thead>
                      <tr></tr>
                      <tr>
                      <th>
                      <span>*</span> 
                      <label className="Margin-top"> Leave Type  </label>
                    </th>
                    <th>
                    <select placeholder="select-name" className="form-select"
                    align="left" size={"4"}multiple
                    id="leaveType.id" onChange={(e)=>handleChange(e,'leaveType.name')}
                    value={updateLeaveMaster && updateLeaveMaster.leaveType && updateLeaveMaster.leaveType.id}>
                    <option value={-1}>-- select --</option> 
                    {
                      leaveTypes.map((leaveT)=>(
                      <option value={leaveT.id}>{leaveT.code} - {leaveT.name}</option>
                      ))
                    }
                    </select>
                      </th>            
                      <th><label for ="staffType" sm={1}>
                        <span>*</span>Staff Type</label></th>
                      <select id='staffType.id' name='staffType.id' onChange={(e)=>handleChange(staffType)}
                       value={staffType && staffType.id} className="form-select" align="left" size={"4"}multiple>
                      <option value={null}>-- select --</option>
                        {
                          staffTypes.map((staff)=>(
                            <option value={staff.id}>{staff.name}</option>
                          ))
                        }
                      </select> 
                      <th><span>*</span>Employee Type</th>
                      <th>
                      <select id='employeeType.id' name='employeeType.id'onChange={(e)=>handleChange(employeeType)} value={employeeType && employeeType.id} className="form-select" align="left" size={"4"}multiple>
                        <option value={null}>-- select --</option>
                        {
                          employeeTypes.map((emp)=>(
                            <option value={emp.id}>{emp.name}</option>
                          ))
                        }
                       </select>
                         </th>
                      </tr>
                      <tr>
                      <th>Staff Grade</th>
                      <th>
                      <Select className = "form-control" options={staffGrade} id="staffGrade.id" name="staffGrade.id" onChange={(e)=>handleChange(staffGrade)}
                      align="left" 
                      size="4" value={staffGrade}
                      />
                     </th>
                        <th>
                           <span>*</span>Applicable To</th>
                            <th>
                             <Select class = "form-control" options={applicable} id="leavePolicy.applicableTo" name="leavePolicy.applicableTo" value={applicableGender}
                              onChange={(e)=>{selectedFType(e)}}
                              />
                              </th>
                                <th>
                                <span>*</span>Leave Name</th>
                                <th>
                                <input type='text' placeholder="" id="leavePolicy.name" name="leavePolicy.name" className='form-control'
                                value={addleavename.addleavename} onChange={(e)=>handleChange(e,'addleavename')} addleavename="addleavename"/>
                                </th>
                              </tr>
                             </thead>
                           </Table>
                           <CardHeader>
                            
                           </CardHeader>
                           <tr></tr>
                           <tr></tr>
                           <th><span>*</span>No Of Leaves</th>
                           <th>
                                <input type="text" placeholder="" id="leavePolicy.name" name="leavePolicy.name" className='form-control'
                                value={addleavename.leavename} onChange={(e)=>handleChange(e,'leavename')}/>
                                 </th>
                              <th><span>*</span>No Of Splits</th>
                              <th>
                              <Select class = "form-control" options={noOfSplit} id="noOfSplits" name="noOfSplits" value={applicableGender}
                              onChange={(e)=>{selectedFType(e)}}
                              />
                              </th>
                              <th><span>*</span>Leave Credited At</th> 
                               <th>
                               <Select class = "form-control" options={leaveCreditedAt} id="leavePolicy.leaveCreditPeriodType" name="leavePolicy.leaveCreditPeriodType" value={leaveCreditAt}
                              onChange={(e)=>{selectedFType(e)}}
                              />
                              </th>
                                  <th>
                                  <span>*</span>Max Days At A Stretch
                                  </th>
                                  <th>
                                    <input id="leavePolicy.maxContinuesLeave" type="number" name="leavePolicy.maxContinuesLeave"
                                     value= {maxLeaveStretch.maxLeaveStretch} size="10" onkeypress ="return numbersonly(this,event);" maxlength={4}class="form-control"
                                     onChange={(e)=>handleChange(e,'maxLeaveStretch')}/>
                                  </th>
                                
                                    <tr>
                                    <th>
                                       Restricted Count For Maximum Days
                                    </th>
                                  
                                    <th>
                            <input id="leavePolicy.maxDaysRestrictCount" type="number" name="leavePolicy.maxDaysRestrictCount"
                             value= {RestrictedCountForMaximumDays.RestrictedCountForMaximumDays} size="10" onkeypress ="return numbersonly(this,event);" maxlength={8}class="form-control"
                              onChange={(e)=>handleChange(e,'RestrictedCountForMaximumDays')}/>                            
                                    </th>
                                   <th>
                                   Min Service Required
                                    </th>
                                    <th>
                                    <th>
                             <input type='text' placeholder="" id="leavePolicy.minServiceRequired" name="leavePolicy.minServiceRequired" size={10} maxLength={3} className='form-control'
                            value={addleavename.addleavename} onChange={(e)=>handleChange(e,'addleavename')} addleavename="addleavename"/>
                             </th>
                              </th>
                                    <th>
                              <Select class = "form-control" options={minServiceRequired} id="leavePolicy.minServiceUnit" name="leavePolicy.minServiceUnit" value={minService}
                                styles={"margin-top:0px"} onChange={(e)=>{selectedFType(e)}} />
                              </th>            
                              <th>Is Commuted</th>
                             <Select class = "form-control" options={Commuted} id="leavePolicy.isCommuted" name="leavePolicy.isCommuted" value={Commuted}
                              styles={"margin-top:0px"} onChange={(e)=>{selectedFType(e)}}
                              />
                              </tr>
                              <th>
                              Restrict No Of Times To
                              </th>
                              <th>
                         <input id="leavePolicy.restrictCountYear" type="number" name="leavePolicy.restrictCountYear"
                         value= {maxLeaveStretch.maxLeaveStretch} size="10" onkeypress ="return numbersonly(this,event);" maxlength={4}class="form-control"
                         onChange={(e)=>handleChange(e,'maxLeaveStretch')}/><tr>(For a Year) &&</tr>
                              </th>
                             <th>
                            &nbsp;
                             </th>
                             <th>
                     <input id="leavePolicy.restrictCountEntireService" type="number" name="leavePolicy.restrictCountEntireService"
                      value= {0} size="10" onkeypress ="return numbersonly(this,event);" maxlength={2} disabled class="form-control"
                      onChange={(e)=>handleChange(e)}/><tr>(For Entire Service)</tr>
                     </th>
                      <Card>
                       <CardHeader>
                        Combinable Leave Types
                        </CardHeader>
                        {/* <select placeholder="select-name" className='form-select' id="leaveType.id" onChange={(e)=>handleChange(e,'leaveType.name')}
                        value={updateLeaveMaster && updateLeaveMaster.leaveType && updateLeaveMaster.leaveType.id}>
                       <option value={-1}>-- select --</option> 
                       {
                        leaveTypes.map((leaveT)=>(
                       <option value={leaveT.id}>{leaveT.code} - {leaveT.name}</option>
                       ))
                        }
                       </select>  */}        
                        {
                         leaveTypes && leaveTypes.length > 0?
                         <div>
                         <Table>
                          {
                          leaveTypes.map((leaveT)=>(
                         <Card className='p-3'>
                         <CardHeader key={leaveT.id} style={{alignItems:'center'}}>
                         <FormControlLabel control={<Checkbox />} label={leaveT.name} style={{backgroundColor:'pink'}} />
                         </CardHeader>
                         </Card>
                          ))
                           }
                        </Table>
                        </div>
                        :
                       <div>Not Found</div>
                         }
                      </Card>
                      <tr></tr>
                      <tr></tr>
                      <tr>
                      <th>
                      <Input type="checkbox" name="chkboxEncash" onChange={(e)=>handleChange(e)} value="enableCheckBoxEncash();" />
                      {' '}
                       If The Leave Is Encashable
                      </th>
                     </tr>
                     <Card>
                     <Table>
                     <tbody></tbody>
                    <CardHeader>
                    Leave Encashment Details
                    </CardHeader>
                    <tbody>
                    <thead>
                   <tr>
                  <th>
                  <label>* Of Accumulated Leaves That Can Be Encashed At One Time</label>
                  <input type="text" placeholder="" id="leavePolicy.name" name="leavePolicy.name" className='form-control'
                  value={addleavename.leavename} onChange={(e)=>handleChange(e,'leavename')}/>
                        </th>
                        </tr>  
                        <th>
          <label>*Min. No. Of Leaves Required For Encashment</label>              
          <input type="text" placeholder="" id="leavePolicy.name" name="leavePolicy.name" className='form-control'
           value={addleavename.leavename} onChange={(e)=>handleChange(e,'leavename')}/> 
           % =<input type="text" placeholder="" id="nonEncashMinPerc" className='form-control' value="0" maxLength="3"/>
           </th>
            <tr>
            <th>
             <label>*Min. Service Required For Encashment </label>
             <td>
            <input type="text" placeholder="" id="leavePolicy.name" name="leavePolicy.name" className='form-control'
             value={addleavename.leavename} onChange={(e)=>handleChange(e,'leavename')}/>                        
            <Select className = "form-control" options={minServiceRequired} id="staffGrade.id" name="staffGrade.id" align="left" 
            size="4" value={grade}
           onChange={(e)=>{selectedEType(e)}}
            />
               </td>
                </th>
                </tr>
                <tr>
                <th>
                <label>*Min. Period(In Months) Required Between Encashments</label>
                <td>
            <input type="text" placeholder="" id="leavePolicy.name" name="leavePolicy.name" className='form-control'
            value={addleavename.leavename} onChange={(e)=>handleChange(e,'leavename')}/>
                </td>
                 </th>
                  </tr>
                  </thead>                  
                  </tbody>      
                  </Table>
                  </Card>            
                  <Card>
                  <Table>
                   <tbody>
                   <CardHeader>
                    Leave Carry Forwardable Details
                   </CardHeader>
                   <tbody>
                   <thead>
                      <tr>
                         <input type="radio" placeholder="" id="carryForwardAll" name='carryForwardAll' onChange={(e)=>handleChange(e)}  value="Yes"/>                             
                          All Balance Leaves Carry Forwarded
                          {" "}
                          <input type="radio" placeholder="" id="carryForwardAll" name='carryForwardAll' onChange={(e)=>handleChange(e)} value="No" />
                          Set Maximum Leaves Carry Fowarded
                          <input type="number" placeholder="" id="carryForwardAll" name='carryForwardMaxDays' onChange={(e)=>handleChange(e)} value=" "
                          />
                         <tr>
                         <th>
                        <label>Max Leave Accumulation Limit</label>
                        <td>
                            <input type="text" placeholder="" id="nonEncashMinPerc" className='form-control' value="0" onChange={(e)=>handleChange(e)}
                          disabled size="5" maxLength="3" ></input>
                          </td>
                          <tr>
                          <th>
                        
                         {
                          updateLeavePolicy && updateLeavePolicy.id!=undefined?
                          <Button color='success' onClick={(e)=>{updateLeavePolicyList(updateLeavePolicy)}}>Update</Button>
                          :
                          <Button color='success' onClick={handleSubmit}>Save</Button>
                        }
                        {' '}
                        <Button color="secondary" onClick={toggle1}>
                          Cancel
                        </Button>
                          </th>
                          </tr>
                          </th>
                          </tr>
                          </tr>
                  </thead>
                  </tbody>
                  </tbody>
                  </Table>
                  </Card>

                                    <tr></tr>
                                    <CardHeader></CardHeader>

                                        </CardBody>
                                        </CardBody>
                                        </Card>
                                        <CardFooter>
                                         Footer
                                       </CardFooter>
                                      </form>
                                      </div>

  );
}

export default AddLeavePolicy;
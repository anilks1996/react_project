import React, {useEffect, useState} from 'react'
import { FaSearch, FaPencilAlt, FaPlus} from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Card,CardHeader,CardBody,CardTitle,Button,CardFooter,Row,Col, FormGroup, ButtonGroup,Dropdown,DropdownToggle,DropdownMenu,DropdownItem,Table } from "reactstrap";
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import { Radio,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@mui/material';
import { DeleteOutline} from '@mui/icons-material';
import { ArrowBack } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import BASE_URL from '../../../../serviceUrl/AxiosURL';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Global from '@mui/styled-engine-sc/GlobalStyles/GlobalStyles';
import { createHolidayCalender, deleteHolidayCalender, editHolidayCalender, showHolidayCalender } from '../../leave_redux/slices/leave_slice/holidayCalenderSlice';

const HolidayCalender= ({direction, ...args}) => {
    const [modal, setModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue, onChange]=useState('10:00');
    const [holidayCols, setholidayCols]=useState();
    const [subTypeList, setSubTypeList] = useState([
      {"value":585960,"label":"--Select--"},
      {"value":789123,"label":"Holiday"},
      {"value":456789,"label":"Event"},
      {"value":456789,"label":"RH"}
    ]);
    
    const navigatepage =useNavigate();
    const dispatch = useDispatch();
    const [updateHolidayCalender, setUpdateHolidayCalender]=useState();
    const [filteredList,setFilteredList]=useState([]);
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=> setDropdownOpen((prevState)=>!prevState);
    const [newholiday,setHoliday]=useState({
      holidayName:'',
      fromDate:'',
      fromTime:'',
      Description:'',
      toDate:'',
      toTime:'',

    });
    const toggle1 = () => {
      setUpdateHolidayCalender(null);
      setModal(!modal);

    }
    const {holidayCalender} = useSelector((state)=>state.allstorereducer.holidayMaster);
    const [addleave, setLeave]=useState({
      leaveTypeCode:'',
      leaveTypeName:'',
      leaveDescription:'',
    });
    const [institutionList, setInstitutionList]=useState([]);
   
    const [showTable, setShowTable]=useState(false);

    // useEffect(()=>{
    //   axios.get(BASE_URL+"subTypeList").then((response)=>{
    //     setSubTypeList(response.data);
    //   })
    // },[]);


    const Showholiday=()=>{
        axios.get(BASE_URL+"subTypeList").then((response)=>{
        setSubTypeList(response.data);
       
        //setholidayCols(datalist);
        //alert(holidayCols)
      })
      setShowTable(true);
    }
    const handleChange=(e)=>{
      setUpdateHolidayCalender({...updateHolidayCalender, [e.target.name]:e.target.value})
      console.log(updateHolidayCalender);
    }
    const [date, setDateState] = useState('');
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createHolidayCalender(updateHolidayCalender));
      setModal(false);
      toast.success("Data saved successfully.");
      dispatch (showHolidayCalender());
      setUpdateHolidayCalender(null);
      dispatch(showHolidayCalender());
    }
    useEffect(()=>{
      dispatch(showHolidayCalender());
      dispatch(showHolidayCalender());
      setFilteredList(holidayCalender);
      alert(holidayCalender)
    },[]);
    const showUpdatehcMaster=(hcObj)=>{
      setModal(true);
      setUpdateHolidayCalender(hcObj);
    }
    const updateholidayCalenderList=(holObj)=>{
      dispatch(editHolidayCalender(holObj));
      setModal(false);
      toast.success("Data updated successfully.");
    }
    const filterByName=(e)=>{
      const filterhol=holidayCalender.filter((emp)=>emp.holidayName.includes(e.target.value));
      setFilteredList(filterhol);
    }
    const filterByHolidayType=(e)=>{
      const filterhol=holidayCalender.filter((emp)=>emp.holidayType.includes(e.target.value));
      setFilteredList(filterhol);
    }
    const showHolidayList=(e)=>{
      const filterhol=holidayCalender.filter((emp)=>emp.holidayName.includes(e.target.value));
      setFilteredList(filterhol);
      alert(holidayCalender+",  "+filteredList+",  boolean="+showTable);
      //setShowTable(true);
    }
    const [subType, setSubType]=useState();
    function selectedSType(data){
      setSubType(data);
    }
    const filterOptionChange=(event, field)=>{
      alert('event='+field);
    }
    const newHoliday=(event,field)=>{
      alert('event='+field);
      navigatepage("/leaveMaster/holidayCalender/NewHoliday");
    };
    const deletehcMaster=(hcId)=>{
      dispatch(deleteHolidayCalender(hcId));
      toast.success("Data deleted successfully.");
      dispatch(showHolidayCalender());
    }
    const [leavaType,setLeavaType]=useState();
    function selectedLType(data){
      setLeavaType(data);
    }
    const Goback = () => {
      window.history.back();
    }
    return (
      <div>
          <form>
             <Card style={{width:'80rem'}} className='form-shadow'>
             <CardHeader>
                    <i><label>Leave Management / Leave Master / Holiday Calender </label></i>                                          
              </CardHeader>
             <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack></ArrowBack> </Button>
             {" "}
                <Button id='radioA' color="danger" name='Button' onClick={toggle1}><FaPlus/> CREATE NEW HOLIDAY </Button>
              </CardHeader>
              </Card>

              <Modal isOpen={modal} toggle={toggle1} {...args}>
                {
                  updateHolidayCalender && updateHolidayCalender.id!=undefined?
                  <ModalHeader toggle={toggle1}>Update Holiday Calender</ModalHeader>
                  :
                  <ModalHeader toggle={toggle1}>Add New Holiday Calender</ModalHeader>
                }
        <ModalBody>
        <Card>
        <CardHeader>
                    <i><label>Leave Master / Add New Holiday </label></i>                                          
              </CardHeader>
              <CardBody>
                <CardHeader>
                 <i>Create Holiday as Yearly Calender</i>
                </CardHeader>
                <Table>   
                  <thead>
                    <tr>
                      <FormControl>
                        <FormLabel id='demo-radio-buttons-group-label'></FormLabel>
                        <RadioGroup 
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={Global}
                        name='radio-buttons-group'
                        >
                        <FormControlLabel name="group" value={"Global"} control={<Radio/>} label = "Global" onChange={handleChange}/>
                        <FormControlLabel name="group" value={"Personal"} control={<Radio/>} label = "Personal" onChange={handleChange} />
                        </RadioGroup>
                      </FormControl>
                    </tr>
                  </thead>
                  <thead>
                      <tr>
                        <label>Events/Holiday Name</label>
                            <input type="text" placeholder="" id="holidayName" name='holidayName' className='form-control'
                             onChange={(e)=>handleChange(e,'holidayName')}/>
                      </tr>
                    </thead>
                    <thead>
                    <td>                  
                      Type
                      {/* <Select options={subTypeList} id='id' value={leavaType}
                        onChange={(e)=>handleChange(e,'holidayType')}
                      />    */}
                      <select id='holidayType' name='holidayType' className='form-select'>
                        <option value={-1}>-- select --</option>
                        {
                          subTypeList.map((subtp)=>(
                            <option value={subtp.value}>{subtp.label}</option>
                          ))
                        }
                      </select>       
                    </td> 
                    </thead>
                    <thead>
                        <tr>
                        <td>
                          <label className='text-danger' >From Date &nbsp;&nbsp;
                          <input type="date" name='fromDate' onChange={(e)=>handleChange(e,'fromDate')} /></label>
                          &nbsp;&nbsp;   
                        </td>
                        <td>
                        <label className='text-danger' >   To Date &nbsp;&nbsp;   
                          <input type='date' name="toDate" onChange={handleChange}/></label>
                          &nbsp;&nbsp;   
                          </td>
                          </tr>
                          <tr>
                          <td>
                        <label className='text-danger'>From Time &nbsp;&nbsp;   
                        <input type='time' name="fromTime" onChange={handleChange}/></label>
                          &nbsp;&nbsp;   
                          </td>
                          <td>
                        <label className='text-danger'>To Time &nbsp;&nbsp;   
                        <input type='Time' name="toTime" onChange={handleChange}/></label>
                          &nbsp;&nbsp;   
                          </td>
                         </tr>
                        </thead>
                      <th>
                      </th>
                  <thead>
                    <tr>
                        <label>Description</label>
                            <textarea wrap ="soft" placeholder="" id="description" name='description' className='form-control'
                             onChange={(e)=>handleChange(e,'description')}/>
                      </tr>
                  </thead>
                  
                </Table>
              </CardBody>
            </Card>
        </ModalBody>
        <ModalFooter>
        {
               updateHolidayCalender && updateHolidayCalender.id!=undefined?
              <Button color='success' onClick={(e)=>{updateholidayCalenderList(updateHolidayCalender)}}>Update</Button>
               :
              <Button color='success' onClick={handleSubmit}>Save</Button>
        }
              {' '}
             <Button color="secondary" onClick={toggle1}> Cancel</Button>
        </ModalFooter>
        </Modal>
        {/* Modal  */}
        <Card className='form-shadow'>
              <CardBody> 
              <ButtonGroup vertical>
                
                <Table>
                  <thead>
                    <th>                  
                      Sub Type
                      <select id='holidayType2' name='holidayType2' className='form-select' onChange={(e)=>{filterByHolidayType(e)}}>
                          {
                            subTypeList.map((subT)=>(
                            <option value={subT.label}>{subT.label}</option>
                            ))
                          }
                     </select>
                      </th>
                      {"  "}
                    <th>
                    <label>Events/Holidays Name</label>
                    <input type='text' id="holidayName2" name='holidayName2' className='form-control' onChange={(e)=>{filterByName(e)}}/>
                    {/* <input type='text' placeholder=" " id="leaveTypeCode" className='form-control' */}
                    {/* value={addleave.leaveTypeCode} onChange={(e)=>handleChange(e,'leaveTypeCode')}/> */}
                    </th>
                    <th>
                    <th>
                    <Button class="btn btn-primary pull-right" id='radioA' name='Button' color='success'  onClick={showHolidayList}>Filter..</Button> 
                    </th>
                    </th>
                    </thead>
                    
                </Table>
               </ButtonGroup>
              </CardBody>
                    <CardBody>
                      <CardHeader>Table</CardHeader>
                      
                      {
                        showTable==false? 
                        <div></div>
                        :
                      <Table> 
                      <thead> 
                      <tr> 
                        <th>Index</th>
                        <th>Type</th> 
                        <th>Date</th> 
                        <th>Events / Holidays Name</th> 
                        <th>Description</th>
                        <th>Actions</th>
                      </tr> 
                      </thead> 
                      <tbody> 
                        {/* {
                          holidayCols && holidayCols.map((ele)=>{
                            <tr>
                              <td key={ele.type}>{ele.id}</td>
                              <td>{ele.Date}</td>
                              <td>{ele.Events}</td>
                              <td>{ele.Description}</td>
                              <td><Link onClick={showUpdatehcMaster}><FaPencilAlt style={{color:'Green'}}/></Link> &nbsp;<FaSearch style={{color:'Blue'}}/>&nbsp;<Link to={toggle1}><DeleteOutline style={{color:'Red'}}/></Link></td>
                            
                            </tr>
                          })
                        } */}
                      Total={filteredList.length}
                      {
                        filteredList && filteredList.length>0?
                                                  
                          filteredList.map((holi, index)=>(
                            <tr key={holi.id}>
                              <td>{index+1}</td>
                              <td>{holi.holidayType}</td>
                              <td>{holi.fromDate}</td>
                              <td>{holi.holidayName}</td>
                              <td>{holi.description}</td>
                              <td>{holi.holidayType}</td>
                              <td><Link onClick={showUpdatehcMaster}><FaPencilAlt style={{color:'Green'}}/></Link> &nbsp;<FaSearch style={{color:'Blue'}}/>&nbsp;<Link to={toggle1}><DeleteOutline style={{color:'Red'}}/></Link></td>
                            
                            </tr>
                          ))
                        
                        :
                        <div></div>
                      }
                      </tbody> 
                    </Table> 
}
                    </CardBody>
                    <CardFooter>
                    Footer
                    </CardFooter>
                    </Card>
                
          </form>
      </div>
    );
  }
  HolidayCalender.propTypes={
    direction:PropTypes.string,
  };
  export default HolidayCalender;
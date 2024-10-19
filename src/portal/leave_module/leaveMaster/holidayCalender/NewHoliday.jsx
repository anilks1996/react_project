import React, {useEffect, useState} from 'react'
import { FaSave} from 'react-icons/fa'; 
import { Navigate, useNavigate } from 'react-router-dom';
import { Card,CardHeader,CardBody,CardTitle,Button,CardFooter,Table } from "reactstrap";

import Select from 'react-select';
import axios from 'axios';
import BASE_URL from '../../../../serviceUrl/AxiosURL';

const NewHoliday = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue, onChange]=useState('10:00');
    const navigatepage =useNavigate();
    const [newholiday,setHoliday]=useState({
      holidayName:'',
      fromDate:'',
      fromTime:'',
      Description:'',
      toDate:'',
      toTime:'',

    });
    
    const handleChange=(event, field)=>{
      let pass=event.target.value;
      

    }     
    const [institutionList, setInstitutionList]=useState([]);
    useEffect(()=>{
      axios.get(BASE_URL+"institutionDropdownList").then((response)=>{
        setInstitutionList(response.data);
        window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      })
    },[]);
    const filterOptionChange=(event, field)=>{
      alert('event='+field);
    }
    const createholiday=(event,field)=>{
      alert('event='+field);
      navigatepage("");
    };

  return (
    <div>
          <form>
             <Card style={{width:'60rem'}}>
             <CardHeader>
                    <i><label>Leave Management / Leave Master / Holiday Calender </label></i>                                          
      </CardHeader>
              <CardHeader><Button id='radioA' name='Button' onClick={createholiday}><FaSave/> SAVE </Button></CardHeader>
              <CardBody>
                <CardHeader>
                 Leave Management / Leave Master / Holiday Calender/ New Holiday
                  <button type='button' className='close' data-dismiss="alert"></button>
               <h5>Instructions!</h5>
                 <p>Create Holiday Instruction Msg</p>
                </CardHeader>
                <Table>
                  <thead >
                    <tr>
                      <th>

                      </th>
                    </tr>
                  </thead>
                  <div>
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type="radio" value="Global" checked={true}/> 
                          Global
                     </label>
                     
                     <label>
                          <input type="radio" value="Personal"/> 
                          Personal
                     </label>
                      
                      </th>
                    </tr>
                  </thead>
                  </div>
                  <thead>
                    <tr>
                      <th>
                        <label>Events/Holiday Name</label>
                            <input type="text" placeholder="" id="holidayName" className='form-control'
                            value={newholiday.holidayName} onChange={(e)=>handleChange(e,'holidayName')}/>
                      </th>
                      <th>
                        <label>From Date</label>
                          <input type='date' onChange={(date) => setStartDate(date)}/>
                          </th>
                      <thead>
                      <th>
                        <th></th><br></br><br></br>
                        <label>To Time</label>
                        <input type='date' onChange={(date) => setStartDate(date)}/>
          
                      </th>
                      <th>
                        
                      </th>
                      </thead>
                    </tr>
                    <tr>
                      <Select options={institutionList}>

                      </Select>

                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th>
                        <label>Description</label>
                            <input type="TextArea" placeholder="" id="holidayName" className='form-control'
                            value={newholiday.holidayName} onChange={(e)=>handleChange(e,'holidayName')}/>
                      </th>
                      <th>
                        <label>To Date</label>
                          <input type='date' onChange={(date) => setStartDate(date)}/>
                      </th>
                      <th>
                        <label>From Time</label>
                          <input type='date' onChange={(date) => setStartDate(date)}/>
                      </th>
                      <th>
                        <label>To Time</label>
                          <input type='date' onChange={(date) => setStartDate(date)}/>
                      </th>
                    </tr>
                  </thead>
                    
                </Table>

              </CardBody>
             </Card>
             <CardFooter>
                    Footer
                    </CardFooter>
          </form>
      </div>
    );
  }
      

export default NewHoliday;
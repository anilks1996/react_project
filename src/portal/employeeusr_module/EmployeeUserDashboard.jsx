import React, { useEffect, useState} from 'react'
import {Card, CardBody, CardHeader } from 'reactstrap';
import WishingScreen from './wishing_module/WishingScreen';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveUserId } from '../../auth/auth_slice/loginUserSlice';

const EmployeeUserDashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [messageTime,setMessageTime]=useState("");
    const [showDate,setShowDate]=useState();
    const {activeUserId,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const dispatch=useDispatch();

    useEffect(()=>{
        window.scrollTo({top:'0',left:'0',behavior:'smooth'});
        getClockTime();
        dispatch(getActiveUserId());
        
    },[]);
    
    const getClockTime=() => {
        const currentDate=new Date();
        const time=currentDate.toLocaleTimeString();
        const currentHour = currentDate.getHours();
        
        let timeOfDay;
        if (currentHour >= 0 && currentHour < 12) {
            timeOfDay = 'morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            timeOfDay = 'afternoon';
        } else {
            timeOfDay = 'evening';
        }
        setMessageTime("Good "+timeOfDay+" ("+time+")");
        return messageTime;
      }

  return (
    <div>
      <form>
        <Card>
            <CardBody className='form-shadow'>
                <CardHeader><WishingScreen rolename="Employee User"/>
                <p></p>
                </CardHeader>
                <CardBody>
                    <Alert severity="success">{messageTime} : {activeUserId}, ! Welcome to GMDA System . You have logged in as Employee User role. Your last login was on 26 Apr 24, 03:44 PM (from IP Address: 152.58.64.22).</Alert>
                </CardBody>
                <CardBody>
                    <p>
                    cy array  react-hooks/exhaustive-deps
                    Line 53:13:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images                           
                              jsx-a11y/alt-text
                    Line 55:13:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  
                    </p>
                </CardBody>
            </CardBody>
        </Card>
      </form>
    </div>
  )
}

export default EmployeeUserDashboard;

import React, { useEffect, useState} from 'react'
import {Card, CardBody, CardHeader } from 'reactstrap';
import Alert from '@mui/material/Alert';
import { IoMdSettings } from "react-icons/io";


const SetupDashboard = () => {
    const [messageTime,setMessageTime]=useState("");
    useEffect(()=>{
        window.scrollTo({top:'0',left:'0',behavior:'smooth'});
        getClockTime();
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
                <CardHeader><h3 style={{alignContent:'center'}}><IoMdSettings /> Setup Dashboard</h3>               
                </CardHeader>
                <CardBody>
                    <Alert severity="success">{messageTime}, ! Welcome to GMDA System . You have logged in as Setup role. Your last login was on 26 Apr 24, 03:44 PM (from IP Address: 152.58.64.22).</Alert>
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

export default SetupDashboard;


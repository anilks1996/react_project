import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardBody, CardHeader } from 'reactstrap';
import { getLoggedInEmployee } from '../../../auth/auth_slice/loginUserSlice';
import { CalendarIcon } from '@mui/x-date-pickers';
import { Event, FileCopySharp } from '@mui/icons-material';


const MyEvents = () => {
    const dispatch = useDispatch();
    const navigatePage = useNavigate();
    const [profile,setProfile] = useState();
    const {loggedInEmployee} = useSelector((state)=>state.allstorereducer.user_token);
    const date = new Date();
    const showTime = date.getHours()
        + ':' + date.getMinutes()
        + ":" + date.getSeconds();
    useEffect(()=>{
        dispatch(getLoggedInEmployee());

    },[]);

    const showLeaveForm=()=>{
        navigatePage("/employeeUserInbox/showLeaveUserForm");
    }
    const showVoucherForm=()=>{
        navigatePage("/createVoucherSteps");
    }

  return (
    <div>
        <Card>
            <CardHeader style={{color:'rgb(67, 190, 247)'}}><Event/>  : My Event</CardHeader>
            <CardBody>
                <table>
                    <tbody>
                        <tr>
                            <td>Today : {showTime}</td>
                        </tr><hr />
                        <tr>
                            <td>Designation : {loggedInEmployee && loggedInEmployee.designation && loggedInEmployee.designation.name}</td>
                        </tr>
                        
                    </tbody><hr />
                    
                </table>                  
            </CardBody>
        </Card>
    </div>
  )
}

export default MyEvents;
import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardBody, CardHeader } from 'reactstrap';
import { getLoggedInEmployee } from '../../../auth/auth_slice/loginUserSlice';
import { CalendarIcon } from '@mui/x-date-pickers';


const MyCalendar = () => {
    const dispatch = useDispatch();
    const navigatePage = useNavigate();
    const [profile,setProfile] = useState();
    const {loggedInEmployee} = useSelector((state)=>state.allstorereducer.user_token);
    const date = new Date();
    const [value,setValue] = useState();
    const showTime = date.getHours()
        + ':' + date.getMinutes()
        + ":" + date.getSeconds();

    useEffect(()=>{
        dispatch(getLoggedInEmployee());

        const interval = setInterval(() => setValue(new Date()), 1000);
        return ()=>{
            clearInterval(interval);
        };

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
            <CardHeader style={{color:'rgb(67, 190, 247)'}}><CalendarIcon />  : My Calendar</CardHeader>
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

export default MyCalendar;
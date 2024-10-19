import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardBody, CardHeader } from 'reactstrap';
import { getLoggedInEmployee } from '../../../auth/auth_slice/loginUserSlice';
import { BsCreditCard2Front } from "react-icons/bs";
import { RequestQuoteSharp } from '@mui/icons-material';
import { FaArrowRight } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


const MyProfiles = () => {
    const dispatch = useDispatch();
    const navigatePage = useNavigate();
    const [profile,setProfile] = useState();
    const {loggedInEmployee} = useSelector((state)=>state.allstorereducer.user_token);

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
            <CardHeader style={{color:'rgb(67, 190, 247)',textAlign:'center'}}><FaUser /> : My Profile</CardHeader>
            <CardBody style={{backgroundColor:'linear-gradient(267deg, #000b0b 0%, #15d7f485 100%)'}}>
                <table>
                    <tbody>
                        <tr>
                            <td>Welcome to {loggedInEmployee && loggedInEmployee.fullName} [{loggedInEmployee && loggedInEmployee.code}]</td>
                        </tr><hr />
                        <tr>
                            <td>Designation : {loggedInEmployee && loggedInEmployee.designation && loggedInEmployee.designation.name}</td>
                        </tr>
                        <tr>
                            <td>Department : {loggedInEmployee && loggedInEmployee.department && loggedInEmployee.department.name}</td>
                        </tr>
                        <tr>
                            <td>Staff Type : {loggedInEmployee && loggedInEmployee.employeeType && loggedInEmployee.employeeType.name}</td>
                        </tr>
                    </tbody><hr />
                    <tbody>
                        <tr>
                            <td>&nbsp;Leave Request &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={showLeaveForm} style={{color:'blue',border:'none'}} title='Click here to create leave request'>&nbsp; <FaArrowRight />&nbsp; </button> </td>
                        </tr>
                        <tr>
                            <td>Voucher Request : <button onClick={showVoucherForm} style={{color:'blue',border:'none'}}  title='Click here to create voucher'> <BsCreditCard2Front /> <MdKeyboardDoubleArrowRight/> </button> </td>
                        </tr>
                        
                    </tbody>
                </table>
                  
            </CardBody>
        </Card>
    </div>
  )
}

export default MyProfiles;
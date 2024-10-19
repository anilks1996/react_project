import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changePasswordOfUser, findUserByStartWithUserId, getLoggedInUser, resetPasswordOfUser, validateLogoutUser } from '../auth_slice/loginUserSlice';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { CardBody, CardFooter, CardHeader } from 'reactstrap';
import Alert from '@mui/material/Alert';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from "react-icons/rx";
import BASE_URL from '../../serviceUrl/AxiosURL';


const PasswordResetPage = () => {
    const {id,username} = useParams();
    const dispatch = useDispatch();
    const navigatePage = useNavigate();
    const {appUser, appUsers,loggedInUser} = useSelector((state)=>state.allstorereducer.user_token);
    const [passwordObj, setPasswordObj] = useState(null);
    const [existPawd,setExistPawd] = useState(null);
    const [newPawd,setNewPawd] = useState(null);
    const [cnfmPawd,setCnfmPawd] = useState(null);
    const [isExistPMatch,setIsExistPMatch] = useState(false);
    const [isNewPMatch,setIsNewPMatch] = useState(false);
    const [newPwdMatch,setNewPwdMatch] = useState(false);
    
    React.useEffect(()=>{
        window.scrollTo({left:'0', top:'0', behavior:'smooth'});
        if(id!=null){
            dispatch(getLoggedInUser());
            dispatch(findUserByStartWithUserId(id));
            setPasswordObj(null);
        }
    },[]);

    const passwordMatch=async(e)=>{
        setPasswordObj(loggedInUser);
        if(existPawd!=undefined && existPawd!=''){
            const userObj = {...passwordObj,["userId"]:id,["passwd"]:existPawd,["status"]:0};
            try {
                const response = await fetch(BASE_URL+"auth/firstTimeSetPassword/validate", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userObj),
                });      
                if (!response.ok) {               
                    throw new Error(`Error: ${response.status}`);
                }     
                const result = await response.json();
                console.log("validate "+result.userId);
                //alert(result.status);
                if(result && result.status===2){
                    setIsExistPMatch(true);
                }else{
                    setIsExistPMatch(false);
                }
                //console.log("logged In."+result);
            } catch (error) {
                    console.log(error);
            } 
        }
    }
    const cnfmPasswordMatch=(e)=>{
        setNewPwdMatch(true);
        if(newPawd===cnfmPawd){
            setIsNewPMatch(true);
        }else{
            setIsNewPMatch(false);
        }
    }
    const handleChange=(e)=>{
        if(e.target.name==='existingPassword'){
            setExistPawd(e.target.value);
        }else if(e.target.name==='newPassword'){
            setNewPawd(e.target.value);
        }else if(e.target.name==='confirmNewPassword'){
            setCnfmPawd(e.target.value);
        }
    }

    const handleClose=()=>{
        if(window.confirm('Do you wanna logout?')){
            localStorage.clear();
            dispatch(validateLogoutUser());
            navigatePage('/auth/login');
        }  
    }

    const handleUpdate=()=>{
        if(newPwdMatch && isNewPMatch && isExistPMatch){
            setPasswordObj(loggedInUser);
            const userObj = {...passwordObj,["userId"]:id,["passwd"]:cnfmPawd,["status"]:0};
            if(window.confirm('Do you wanna logout?')){
                dispatch(changePasswordOfUser(userObj));
            
                localStorage.clear();
                dispatch(validateLogoutUser());
                navigatePage('/auth/login'); 
            }
        }
    }

  return (
    <div>
        <Container>
            <Card className='mt-3'>
                <CardHeader>Change Password (Reset)</CardHeader>
                <CardBody>
                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={8}>
                            <Alert severity="info">Welcome to {loggedInUser && loggedInUser.firstName}</Alert>
                            <hr />
                        </Col>
                        <Col sm={2}></Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label>Email Id : </label>
                        </Col>
                        <Col sm={8}>
                            <label>{loggedInUser && loggedInUser.email}</label>
                        </Col>
                        <Col sm={2}></Col>
                        <br />
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label>User Id : </label>
                        </Col>
                        <Col sm={8}>
                            <label>{loggedInUser && loggedInUser.userId}</label>
                        </Col>
                        <Col sm={2}></Col>
                        <br />
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label style={{color:'red'}}>Existing Password : </label>
                        </Col>
                        <Col sm={4}>
                            <input type='password' id='existingPassword' name='existingPassword' className='form-control' placeholder='Password'  onBlur={passwordMatch} onChange={handleChange}/>
                        </Col>
                        <Col sm={6}>
                        {
                            passwordObj && isExistPMatch?
                            <div>
                                <button className='btn btn-success'> <TiTick style={{color:'white', width:'1.9rem', height:'1.9rem'}}/> <i>Matched</i> </button>
                            </div>
                            :
                                passwordObj?
                                <div>
                                    <button className='btn btn-danger'> <RxCross2 style={{color:'white', width:'1.8rem', height:'1.8rem'}}/> <i>Mismatch</i> </button>
                                </div>
                                :
                                <div></div>
                        }
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label style={{color:'red'}}>New Password : </label>
                        </Col>
                        <Col sm={4}>
                            <input type='password' id='newPassword' name='newPassword' className='form-control' placeholder='Password' onKeyUp={handleChange} />
                        </Col>
                        <Col sm={6}></Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}>
                            <label style={{color:'red'}}>Confirm New Password : </label>
                        </Col>
                        <Col sm={4}>
                            <input type='password' id='confirmNewPassword' name='confirmNewPassword' className='form-control' placeholder='Password' onBlur={cnfmPasswordMatch} onChange={handleChange}/>
                        </Col>
                        <Col sm={6}>
                        {
                            newPwdMatch && isNewPMatch?
                            <div>
                                <button className='btn btn-success'> <TiTick style={{color:'white', width:'1.9rem', height:'1.9rem'}}/> <i>Matched</i> </button>
                            </div>
                            :
                                newPwdMatch?
                                <div>
                                    <button className='btn btn-danger'> <RxCross2 style={{color:'white', width:'1.9rem', height:'1.9rem'}}/> <i>Mismatch</i> </button>
                                </div>
                                :
                                <div></div>
                        }
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col sm={2}></Col>
                        <Col sm={4}>
                            <Button color='primary' className='form-control' onClick={handleUpdate} > Update </Button> 
                        </Col>
                        <Col sm={4}>
                            <Button color='warning' className='form-control btn btn-danger' onClick={handleClose}> Cancel </Button> 
                        </Col>
                        <Col sm={2}></Col>
                    </Row>
                    <br />
                </CardBody>
                <CardFooter></CardFooter>
            </Card>
        </Container>        
    </div>
  )
}

export default PasswordResetPage;
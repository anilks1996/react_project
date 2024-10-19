import React from "react";
import { Button,Nav} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import BASE_URL from "../../serviceUrl/AxiosURL";
import client_logo from '../../auth/client/images/gmdalogo.jpg';
import client_logo3 from '../../auth/client/images/logo3.png';
import { FaBell, FaUser} from "react-icons/fa";
import { Modal, ModalBody, ModalFooter, ModalHeader, Row,Col, UncontrolledButtonDropdown } from "reactstrap";
import { AccountBoxOutlined, Logout} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import boss_photo from '../../../src/portal/establishment_module/document/rkgupta.png';
import MenuProfile from "../employeeusr_module/MenuProfile";
import { getActiveUserId, getLoggedInUser, validateLogoutUser } from "../../auth/auth_slice/loginUserSlice";
import ChangeUserFinancialYear from "./ChangeUserFinancialYear";


const PortalNavbar = (args) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {activeUserId,loggedInUser,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const [userToken, setUserToken]=useState();
    const dispatch = useDispatch();
    const loggedUsers = useSelector((state)=> state.allstorereducer.user_token);
    //const {acfyList,acfyLoading} = useSelector((state)=>state.allstorereducer.acfy);
    const changeUserRole=()=>{
        navigate('/auth/userrole');
    }
    const [modal, setModal] = useState(false);
    const toggle = () =>{
        setModal(!modal);
    }
    const logout = () => {
        if(window.confirm('Do you wanna logout?')){
            localStorage.clear();
            dispatch(validateLogoutUser());
        navigate('/auth/login');
        }       
    }
    const bsURL=BASE_URL+"getClientCode";
    const [clientCode, setClientCode]=useState('');
    const [myImage, setMyImage] = useState(false);
    let tempV=[];
    useEffect(()=>{
        dispatch(getActiveUserId());
        dispatch(getLoggedInUser());
        //dispatch(populateAccCompanyFinancialYearList());
        //dispatch(fetchAllEmployeesCols());
        //alert(loggedEmployee);
        // axios.get(bsURL).then((response)=>{
        //     tempV=response.data;
        //     tempV.map(cCode=>{
        //         setClientCode(cCode.code);
        //     })
        // });  
        let ustoken = localStorage.getItem('user-token');       
        if (ustoken || ustoken != 'undefined') {
            setUserToken(ustoken);
            setIsLoggedIn(true);
        }     
        // const empData=allEmployees.filter((emp)=>emp.code===ustoken);
        // setEmployee(empData[0]);
        //alert(employee)
    },[])

    const profile=()=>{
        navigate("/fileManager");
    }

    return (
        <React.Fragment>
        {
            (activeUserId)?
            <>
            <Navbar  expand="lg" className="fixed-top p-0" style={{background: 'linear-gradient(269deg, rgb(38 61 61) 0%, rgb(71 216 243 / 97%) 100%)'}}>
                <Container style={{maxWidth:'1900px'}}>                    
                <Navbar.Brand><img src={client_logo3} style={{height:'54px', width:'80px'}}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color:'white'}}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                        <Nav.Link>   
                            <UncontrolledButtonDropdown>
                                {/*
                                <DropdownToggle  caret color="danger" title="Change User Role" className="p-2">
                                    <FaUserFriends />
                                </DropdownToggle>
                                
                                <DropdownMenu success style={{backgroundColor:'#2eb6f2'}} className="p-1">                                    
                                    <Card style={{width:'17rem', wordWrap:'word-break' }}>
                                        <CardHeader className="mt-1" style={{backgroundImage:'linear-gradient(90deg, #e6867b 50%, #5cd0e8 50%)'}}>
                                        <Row>
                                            <Col sm={6}>Roles Assigned</Col>
                                            <Col sm={6}><Link to={"/"}> <Dashboard /> Dashboard</Link></Col>
                                        </Row>               
                                        </CardHeader>
                                        
                                        <CardBody className="p-0">                                           
                                        <Table style={{fontSize:'small'}}>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {
                                                            myImage?
                                                            <img src={boss_photo} width="90rem" height="110rem" text-align="center" />
                                                            :
                                                            <img src={boss_photo} width="90rem" height="110rem" text-align="center" />
                                                        }
                                                        
                                                    </td>
                                                    <td>
                                                        <tr>
                                                            <th>ID : {userToken}</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Department : {employee && employee['department.name']}</th>
                                                        </tr>
                                                        <tr><th>.</th></tr>
                                                        <tr>
                                                            <th className="btn btn-success">Establishment Admin</th>
                                                        </tr>                                    
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>                           
                                        </CardBody> 
                                        <CardFooter className="" style={{backgroundImage:'linear-gradient(90deg, #e6867b 50%, #5cd0e8 50%)'}}>
                                        <Row>

                                            <Col sm={6}><Link to={"/auth/userrole"}>Switch Your Role</Link></Col>
                                            <Col sm={6}><Link to={"/fileManager"}> <FaUserAlt/>Profile</Link></Col>
                                        
                                        </Row>               
                                        </CardFooter>
                                                                                                                               
                                    </Card>
                                </DropdownMenu>
                                */}
                            </UncontrolledButtonDropdown>
                            </Nav.Link> 
                            <Nav.Link style={{color:'white'}}>
                                <FaBell style={{width:'20px',height:'25px',color:'white'}}/>
                            </Nav.Link>
                            <Nav.Link style={{color:'white'}}>
                                <FaUser style={{width:'20px',height:'25px',color:'white'}}/> : {loggedInUser && loggedInUser.firstName}
                            </Nav.Link>
                            <Nav.Link> 
                            {
                                loggedInUser && loggedInUser.status===0?
                                <div> </div>
                                :
                                <Button className="btn btn-light" title="Change Financial Year" onClick={toggle}><AccountBoxOutlined style={{backgroundColor:'white',color:'#57afd3',width:'1.4rem',height:'1.4rem'}}/></Button>
                            }    
                            </Nav.Link> 
                            {/*
                            <Nav.Link> 
                                <Button style={{backgroundColor:'red'}} onClick={logout} title="Sign Out"><AiOutlineLogout/></Button>
                            </Nav.Link>
                            */} 
                            <Nav.Link>
                            {
                                (loggedInUser && loggedInUser.status===0 || loggedInUser.userId==='setup')?
                                <div> <button className="btn btn-light"> <Logout style={{backgroundColor:'white',color:'#57afd3',width:'1.5rem',height:'1.6rem'}} onClick={logout}/> </button> </div>
                                :
                                <MenuProfile /> 
                            }                                      
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>                
            </Navbar>
            <div>
                <p>.</p>
            </div>
            </>
        :
        <div></div> 
        }
            //Modal
            <Modal isOpen={modal} toggle={toggle} {...args} size="xl" className="p-2">
                <ModalHeader toggle={toggle}>My Preferences Financial Year</ModalHeader>
                <ModalBody className="p-2">
                    <Row>
                        <Col sm="1"></Col>
                        <Col sm="3"></Col>
                        <Col sm="6">
                            Select Your Preference F. Year
                        </Col>
                        <Col sm="2">
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="1"></Col>
                        <Col sm="3">
                            <img src={client_logo} style={{height:'10rem', width:'10rem',opacity:'2rem'}} className="form-shadow"/>
                        </Col>
                        <Col sm="6">
                            <ChangeUserFinancialYear />
                        </Col>
                        <Col sm="2"></Col>
                    </Row>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Save
                    </Button>{' '}
                    <Button color="danger" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            //modal

        </React.Fragment>
    );
}

export default PortalNavbar;
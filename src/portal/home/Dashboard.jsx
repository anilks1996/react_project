import React from 'react'
//import '../Establishment-Admin/styles/Dashboard.css'
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import SideNavbar from '../../components/SideNavbar';
//import RightFooter from '../../components/RightFooter';
import './Dashboard.css';
//import { FaUser,faHouse ,faPenToSquare , faCakeCandles}  from '@fortawesome/free-solid-svg-icons';

import { Link,useParams } from 'react-router-dom';
import { FaUser,FaPencilAlt, FaHouseUser } from 'react-icons/fa';
import { Cake } from '@mui/icons-material';


function Dashboard() {
    const { AccountName } = useParams()
    const SwitchAccountParams = AccountName
    
    console.log(SwitchAccountParams)
    return (
        <div>
            <div className='main-container-dash d-flex'>

                {/*<SideNavbar name={SwitchAccountParams}/> */}
                
                <div className='RightContainer d-flex flex-column'>
                   
                    <div className='dash align-self-center'>
                    <div className="toast show align-items-center text-bg-primary m-auto my-3 border-0 toastStyle " role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex ">
                            <div className="toast-body ">
                                Good Evening, ! Welcome to FMDA System . You have logged in as Establishment Admin role. Your last login was on 17 Aug 23, 11:31 PM (from IP Address: 122.180.183.173).
                            </div>

                            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" ></button>
                        </div>
                    </div>
                        {/* <h6> Good Evening, ! Welcome to FMDA System . You have logged in as Establishment Admin role. Your last login was on 17 Aug 23, 11:31 PM (from IP Address: 122.180.183.173).</h6> */}
                        
                        <div className="card-container container ">
                            <div className="row">
                                <div className="col">
                                    <div className="card" >
                                        <div className="card-body">
                                            <h5 className="card-title"></h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Account Type
                                                <div className='card-icon'>
                                                <span icon={FaHouseUser} />
                                                </div>
                                            </h6>
                                            <p className='para-icon' >Establishment Admin <br></br>GMDA</p>
                                            <span className='span-icon'>This account is managed by GMDA.</span>
                                            <br></br>
                                            
                                            <Link to="/accountchange" className="card-link">Switch Your Account</Link>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card" >
                                        <div className="card-body">
                                            <h5 className="card-title"></h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Profile
                                                <div className='card-icon'>
                                               
                                                <span icon={FaUser} />
                                                </div>
                                            </h6>
                                            <p className='para-icon' >ABC </p>
                                            <span className='span-icon'>Role<br></br></span>
                                            <br></br>
                                            
                                            <Link href="#" class="card-link">Manage Your Account</Link>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card" >
                                        <div className="card-body">
                                            <h5 className="card-title"></h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Preferences
                                                <div className='card-icon'>
                                                <span icon={FaPencilAlt} />
                                                
                                                </div>
                                            </h6>
                                            <p className='para-icon' >Account Company <br></br></p>
                                            <span className='span-icon'>GMDA 2023-2024<br></br></span>
                                            <br></br>
                                            
                                            <Link href="#" class="card-link">Manage Your Preferences</Link>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card" >
                                        <div className="card-body">
                                            <h5 className="card-title"></h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Birthday
                                                <div className='card-icon'>
                                                <span icon={Cake} />
                                                </div>
                                            </h6>
                                            <p className='para-icon' >Happy Birthday </p>
                                            <span className='span-icon'>ABC<br></br></span>
                                            <br></br>
                                            
                                            <Link href="#" class="card-link">List of upcoming Birthdays</Link>
                                            
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    {/*
                    <div className='RightfooterContainer'>
                        <RightFooter />
                    </div>
                    */}v
                </div>
            </div>
        </div>
    )
}

export default Dashboard

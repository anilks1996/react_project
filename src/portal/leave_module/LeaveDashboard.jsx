import React from 'react'
import Dashboard from '../home/Dashboard';
import { Link,useParams } from 'react-router-dom';
import { FaUser,FaPencilAlt, FaHouseUser } from 'react-icons/fa';
import { Cake } from '@mui/icons-material';
import { useEffect, useState } from 'react';


const LeaveDashboard = () => {
  const date = new Date();
  const [ value, setValue]=useState(new Date());
  const showTime = date.getHours()
        + ':' + date.getMinutes()
        + ":" + date.getSeconds();
    useEffect(()=>{
     const interval = setInterval(() => setValue(new Date()), 1000);

     return ()=>{
        clearInterval(interval);
     };
    },[]);

  return (
    <div><right><h1 color="primary"></h1></right>
    <div>
    <h2 align="center">{showTime}</h2>
        {/* Add your header content here */}
        {/* For example: */}
       
     
    <div className='navbar navbar-inverse' role='navigation'>
    <div className='navbar navbar-header'> 
                                <h1><center>Leave Management</center></h1>
                            </div>
                            </div>
    <div className='main-container-dash d-flex'></div>
    <div className='dash align-self-center'>
                    <div className="toast show align-items-center text-bg-primary m-auto my-3 border-0 toastStyle " role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex ">
                            <div className="toast-body ">
                            Good Evening, ! Welcome to GMDA System . You have logged in as  Admin role.
                            </div>
                            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" ></button>
                        </div>
                    </div>
                    { ' '}
                            { ' '}
                            { ' '}
                     <div className="card-container container ">
                     <div className="row">
                         <div className="col">
                             <div className="card" >
                                 <div className="card-body">
                                     <h5 className="card-title"></h5>
                                     <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Administration
                                         <div className='card-icon'>
                                         <span icon={FaHouseUser} />
                                         </div>
                                     </h6>
                                     <Link to="/accountchange" className="card-link">Total Leave Request:6</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Total Leave Approval:3</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Pending Leaves:3</Link><br></br>
                                     <span className='span-icon'></span>
                                     <br></br>   
                                 </div>
                             </div>
                         </div>
                         <div className="col">
                             <div className="card" >
                                 <div className="card-body">
                                     <h5 className="card-title"></h5>
                                     <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Infrastructure-I
                                         <div className='card-icon'>
                                        
                                         <span icon={FaUser} />
                                         </div>
                                     </h6>
                                     <Link to="/accountchange" className="card-link">Total Leave Request:6</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Total Leave Approval:3</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Pending Leaves:3</Link><br></br>                                   
                                 </div>
                             </div>
                         </div>
                         <div className="col">
                             <div className="card" >
                                 <div className="card-body">
                                     <h5 className="card-title"></h5>
                                     <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Infrastructure-II
                                         <div className='card-icon'>
                                         <span icon={FaPencilAlt} />
                                         
                                         </div>
                                     </h6>
                                     <Link to="/accountchange" className="card-link">Total Leave Request:6</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Total Leave Approval:3</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Pending Leaves:3</Link><br></br>                                    
                                 </div>
                             </div>
                         </div>
                         <div className="col">
                             <div className="card" >
                                 <div className="card-body">
                                     <h5 className="card-title"></h5>
                                     <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Mobility
                                         <div className='card-icon'>
                                         <span icon={Cake} />
                                         </div>
                                     </h6>
                                     <Link to="/accountchange" className="card-link">Total Leave Request:6</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Total Leave Approval:3</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Pending Leaves:3</Link><br></br>
                                     
                                 </div>
                             </div>
                         </div>
                         <div className="col">
                             <div className="card" >
                                 <div className="card-body">
                                     <h5 className="card-title"></h5>
                                     <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Urban Planning
                                         <div className='card-icon'>
                                         <span icon={Cake} />
                                         </div>
                                     </h6>
                                     <Link to="/accountchange" className="card-link">Total Leave Request:6</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Total Leave Approval:3</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Pending Leaves:3</Link><br></br>
                                     
                                 </div>
                             </div>
                         </div>
                         <div className="col">
                             <div className="card" >
                                 <div className="card-body">
                                     <h5 className="card-title"></h5>
                                     <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >Urban Development
                                         <div className='card-icon'>
                                         <span icon={Cake} />
                                         </div>
                                     </h6>
                                     <Link to="/accountchange" className="card-link">Total Leave Request:6</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Total Leave Approval:3</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Pending Leaves:3</Link><br></br>     
                                 </div>
                             </div>
                         </div>
                         <div className="col">
                             <div className="card" >
                                 <div className="card-body">
                                     <h5 className="card-title"></h5>
                                     <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-row justify-content-between" >IT
                                         <div className='card-icon'>
                                         <span icon={Cake} />
                                         </div>
                                     </h6>
                                     <Link to="/accountchange" className="card-link">Total Leave Request:6</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Total Leave Approval:3</Link><br></br>
                                     <Link to="/accountchange" className="card-link">Pending Leaves:3</Link><br></br>
                                     
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
  
  
)
}

export default LeaveDashboard;
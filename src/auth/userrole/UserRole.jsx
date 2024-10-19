import React, { useEffect } from 'react'
import './Cards.css';
import { useState } from 'react';
import accountsimg from './images/Accounts Admin.jpeg';
import accountappovber from './images/AccountsApprover.jpeg';
import accountrole from './images/AccountsRole.jpeg';
import accountuser from './images/AccountsUser.jpeg';
import empuser from './images/Employeeuser.jpeg';
import establishment from './images/establishment.jpeg';
import leaverole from './images/leave.jpeg';
import payrole from './images/payrole.jpeg';
import performance from './images/performance.jpeg';
import setup from './images/setup.png';
import setup2 from './images/setup2.png';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner } from 'reactstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveUserId, getLoggedInUser } from '../auth_slice/loginUserSlice';
import { findUserRoleByAppUserId } from '../../portal/admin_setup_module/admin_setup_redux/userRoleSlice';
import BASE_URL from '../../serviceUrl/AxiosURL';


const UserRole = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigatePage=useNavigate();
  const {activeUserId,loggedInUser} = useSelector((state)=>state.allstorereducer.user_token);
  const {userRolesByUser} = useSelector((state)=>state.allstorereducer.userRole);
  const [roleArray,setRoleArray] = useState([]);
  const [eleobj,setEleobj] = useState();


  useEffect(()=>{
    dispatch(getActiveUserId());
    dispatch(getLoggedInUser());
    window.scrollTo({left:0, top:0, behavior:'smooth'});
    //alert(loggedInUser);
    
    //findUserRoleByAppUserId(loggedInUser && loggedInUser.id);
    const fetchRolesByUserId = async()=>{
      try {
        const currentUser=localStorage.getItem("current-jwtToken");
            //Fetch ActiveUser
            const response2 = await fetch(BASE_URL+"api/user/activeUser",{
              method: 'GET',
              headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
              body: JSON.stringify(),
            })
            if (!response2.ok) {
                throw new Error('Failed to load record');
            }
            const result2 = await response2.json();
            if(result2 && result2.id!=null){
            //  alert("activeid="+result2.id);
            const response = await fetch(BASE_URL+`api/userRole/byUserId/${result2.id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${currentUser}`},
                body: JSON.stringify(),
            })
            if (!response.ok) {
                throw new Error('Failed to load record');
            }
            const result = await response.json();
            console.log('Record loaded successfully:', result);
            if(result && result.length>0){
              setEleobj('<b>Welcome</b>')
              result.map((urol,index)=>(
                addPerson(urol,index)))  
            }
            }
            console.log('Arrays : ', roleArray);
      } catch (error) {
          
      }  
    }

    fetchRolesByUserId();

    const addPerson = (urol,index) => {
      const newPerson = {id:urol && urol.role && urol.role.id,
                    title:urol && urol.role && urol.role.name,
                    image:<img src={empuser} width="100%" height="60%" text-align="center" />,
                    button:urol && urol.role && urol.role.name,
      };
      roleArray[index]=(newPerson);
      //setRoleArray([...roleArray, newPerson]);
      console.log("after push "+roleArray)
    };


  },[]);

 //357564416	"Accounts User"
  const selectUserRole=(event, roleId)=>{
    if(roleId===46825472){
      //46825472	"Employee User"
      navigatePage("/employeeUserDashboard");
    }else if(roleId==49446914){
      //49446914	"Establishment Admin"
      navigatePage("/establishmentDashboard");
    }else if(roleId===41582594){
      //41582594	"Accounts Admin"
      navigatePage("/accountsProfile");
    }else if(roleId===357564416){
      //357564416	"Accounts User"
      navigatePage("/accountsUserDashboard");
    }else if(roleId==357564418){
      //357564418	"Store User"
      navigatePage("/storeUserDashboard");
    }else if(roleId==359268352){
      //359268352	"Accounts Approver"
      navigatePage("/accountApproverDashboard");
    }else if(roleId==357564417){
      //357564417	"Purchase User"
      navigatePage("/purchaseUserDashboard");
    }else if(roleId==355663872){
      //355663872	"Leave Admin"
      navigatePage("/leaveDashboard");
    }else if(roleId==353927168){
      //353927168	"Stores and Purchase Admin"
      navigatePage("/storesAndPurchaseAdminDashboard");
    }else if(roleId==355303424){
      //355303424	"Setup"
      navigatePage("/setupDashboard");
    }else if(roleId==97222656){
      //97222656	"Finance Admin"
      navigatePage("/financeAdminDashboard");
    }else if(roleId==425656320){
      //425656320	"Performance Assessment Admin"
      navigatePage("/performanceAssessmentAdminDashboard");
    }else if(roleId==417300480){
      //417300480	"Performance Assessment"
      navigatePage("/performanceAssessmentDashboard");
    }else if(roleId==55377920){
      //55377920	"Store and Purchase User"
      navigatePage("/storeAndPurchaseUserDashboard");
    }else if(roleId==14614528){
      //14614528	"Stores and Purchase Approver"
      navigatePage("/storesAndPurchaseApproverDashboard");
    }else if(roleId==355663873){
      //355663873	"Store Purchase Admin"
      navigatePage("/storePurchaseAdminDashboard");
    }else if(roleId==357564419){
      //357564419	"Purchase Approver"
      navigatePage("/purchaseApproverDashboard");
    }else if(roleId==49446913){
      //49446913	"Salary Processing"
      navigatePage("/salaryProcessingDashboard");
    }else if(roleId==50495488){
      //50495488	"Payroll Admin"
      navigatePage("/payrollAdminDashboard");
    }else if(roleId==222855168){
      //222855168	"Projects Admin"
      navigatePage("/projectsAdminDashboard");
    }else if(roleId==350126082){
      //350126082	"Leave Management"
      navigatePage("/leaveManagementDashboard");
    }else if(roleId==343605248){
      //343605248	"Leave Reports"
      navigatePage("/leaveReportsDashboard");
    }else if(roleId==65175552){
      //65175552	"Store Keeper"
      navigatePage("/storeKeeperDashboard");
    }else if(roleId==1198915584){
      //1198915584	"Finance and Accounts Approver"
      navigatePage("/financeandAccountsApproverDash");
    }else if(roleId==54919168){
      //54919168	"Finance and Accounts User"
      navigatePage("/financeandAccountsUserDash");
    }else if(roleId==325517312){
      //325517312	"Audit Trail Admin"
      navigatePage("/auditTrailAdminDash");
    }else if(roleId==39813120){
      //39813120	"Accounts Role"
      navigatePage("/accountsRoleDashboard");
    }else if(roleId==55377923){
      //55377923	"Financial Accounting Staff"
      navigatePage("/financialAccountingStaffDash");
    }else if(roleId==176947200){
      //176947200	"Voucher Entry"
      navigatePage("/voucherEntryDashboard");
    }else if(roleId==156784657){
      //156784657	"Super Admin"
      navigatePage("/adminSetupDashboard");
    }else if(roleId==129302528){
      //129302528	"Year End Role"
      navigatePage("/yearEndRoleDash");
    }else if(roleId==94306304){
      //94306304	"WorkFlow Management"
      navigatePage("/workFlowManagementDash");
    }else if(roleId==11){
      navigatePage("/adminSetupDashboard");
    }else{
      alert('Role not assigned !');
    }
  }

  const [cards] = useState([
    {
      id:'1',
      title: 'Card-1',
      image: <img src={empuser} width="100%" height="110px" text-align="center" />,
      button: 'Employee User'
    },
    { 
      id:'2',
      title: 'Card-1',
      image: <img src={accountappovber} width="100%" height="110px" text-align="center" />,
      button: 'Accounts Approver'
    },
    {
      id:'3',
      title: 'Card-1',
      image: <img src={accountrole} width="100%" height="110px" text-align="center" />,
      button: 'Accounts Role'
    },
    {
      id:'4',
      title: 'Card-1',
      image: <img src={accountuser} width="100%" height="110px" text-align="center" />,
      button: 'Accounts User'
    },
    {
      id:'5',
      title: 'Card-1',
      image: <img src={accountsimg} width="100%" height="110px" text-align="center" object-fit="cover" cover />,
      button: 'Accounts Admin'
    },
    {
      id:'6',
      title: 'Card-1',
      image: <img src={establishment} width="100%" height="110px" text-align="center" />,
      button: 'Establishment Admin'
    },
    {
      id:'7',
      title: 'Card-1',
      image: <img src={leaverole} width="100%" height="110px" text-align="center" />,
      button: 'Leave Admin'
    },
    {
      id:'8',
      title: 'Card-1',
      image: <img src={payrole} width="100%" height="110px" text-align="center" />,
      button: 'Payrole Admin'
    },
    {
      id:'9',
      title: 'Card-1',
      image: <img src={performance} width="100%" height="110px" text-align="center" />,
      button: 'Performance Assesment'
    },
    {
      id:'10',
      title: 'Card-1',
      image: <img src={setup2} width="100%" height="110px" text-align="center" />,
      button: 'Setup'
    },
    {
      id:'11',
      title: 'Card-1',
      image: <img src={setup} width="100%" height="110px" text-align="center" />,
      button: 'Admin Setup'
    },
    ])
    return (


    <div>
      <section className='section-userrole'>
      <div className="container-fluid-userrole">
      <Card className='mt-2'>
      
      <CardHeader><FaUserCircle/> Select your role to start : {roleArray && roleArray.length} {eleobj} </CardHeader>
        {
          roleArray && roleArray.length>0?
          <div></div>
          :
          <div> Loading ...<Spinner /> </div>
        }
        <div className="cards-userrole p-1">    
          {
            roleArray && roleArray.map((card, i) => (
              
              <div key={i} className="card-userrole">
                {card.image}
                
                <button className="btn-userrole" onClick={(e)=>{selectUserRole(e,card.id)}}>{card.button}</button>
              
                {/*
                <Button onClick={(e)=>{selectUserRole(e,card.id)}} className="btn-userrole" style={{textDecorationLine:'none'}}>
                  {card.title}
                </Button>
                */}
              </div>
              
            ))
          }
          
        </div>     
      </Card>
      </div>
      </section>
      
    </div>
    );
   }

export default UserRole;

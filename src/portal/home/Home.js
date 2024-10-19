import React from 'react';
import BASE_URL from '../../serviceUrl/AxiosURL';
import { Card,CardHeader,CardBody,CardTitle,CardText,Button,CardFooter,Row,Col,NavLink,CardSubtitle,Container} from "reactstrap";
import { useEffect,useState } from 'react';
import { FaRProject, FaUser } from 'react-icons/fa';
import EmployeeBarCharts from './EmployeeBarCharts';
import EmployeeLineChart from './EmployeeLineChart';
import DashboardUpdatedCards from './DashboardUpdatedCards';
import { ArrowRightAltSharp } from '@mui/icons-material';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../../auth/auth_slice/loginUserSlice';
import './HomeGrid.css';
import MyProfiles from './dashboard_home/MyProfiles';
import MyCalendar from './dashboard_home/MyCalendar';
import MyAttendance from './dashboard_home/MyAttendance';
import MyEvents from './dashboard_home/MyEvents';
import MyNotifications from './dashboard_home/MyNotifications';
import MyVoucher from '../account_module/accountsApprover/myVoucher/MyVoucher';
import MyPurchases from './dashboard_home/MyPurchases';
import MyLeave from './dashboard_home/MyLeave';

const Home = () => {
	const bsURL=BASE_URL+"roles";
	const dispatch=useDispatch();
	const {loggedInEmployee} = useSelector((state)=> state.allstorereducer.user_token);
	const {rLoading,roleDashboard,roleDashboards} = useSelector((state)=>state.allstorereducer.roleDashboard);
    const [gridArray,setGridArray] = useState([]);
	useEffect(()=>{
		window.scrollTo({left:"0",top:"0",behavior:"smooth"});
		dispatch(getLoggedInUser());
		//window.location.reload();
        // toast.success("Logged in successfully.", {
        //     position: "top-center",autoClose: 5000, hideProgressBar: false,
        //     closeOnClick: true,pauseOnHover: true,draggable: true, progress: undefined,theme: "light",
        // });
		//const roleId=46825472;
		const fetchDashboardWidgetByRoleId = async()=>{
			try {
				const currentUser=localStorage.getItem("current-jwtToken");
					const response = await fetch(BASE_URL+`api/roleDashboard/byRoleId/${46825472}`,{
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
						result.map((urol,index)=>{
							addPerson(urol,index);
						})  
					}					
					console.log('Arrays : ', gridArray);
			} catch (error) {				
			}  
		}
	

	fetchDashboardWidgetByRoleId();

    const addPerson = (urol,index) => {
		//8  "My Profile"
		if(urol && urol.widgets && urol.widgets.id===8){
			const newPerson = {id:urol && urol.id,
				title:urol && urol.widgets && urol.widgets.title,
				image:<MyProfiles />
			};
			gridArray[index]=newPerson;
		}else if(urol && urol.widgets && urol.widgets.id===1){
				const newPerson = {id:urol && urol.id,
					title:urol && urol.widgets && urol.widgets.title,
					image:<MyCalendar />
				};
				gridArray[index]=newPerson;
		}else if(urol && urol.widgets && urol.widgets.id===2){
				const newPerson = {id:urol && urol.id,
					title:urol && urol.widgets && urol.widgets.title,
					image:<MyAttendance />
				};
				gridArray[index]=newPerson;
		}else if(urol && urol.widgets && urol.widgets.id===3){
				const newPerson = {id:urol && urol.id,
					title:urol && urol.widgets && urol.widgets.title,
					image:<MyEvents />
				};
				gridArray[index]=newPerson;
		}else if(urol && urol.widgets && urol.widgets.id===4){
				const newPerson = {id:urol && urol.id,
					title:urol && urol.widgets && urol.widgets.title,
					image:<MyNotifications />
				};
				gridArray[index]=newPerson;
		}else if(urol && urol.widgets && urol.widgets.id===5){
				const newPerson = {id:urol && urol.id,
					title:urol && urol.widgets && urol.widgets.title,
					image:<MyVoucher />
				};
				gridArray[index]=newPerson;
		}else if(urol && urol.widgets && urol.widgets.id===6){
				const newPerson = {id:urol && urol.id,
					title:urol && urol.widgets && urol.widgets.title,
					image:<MyPurchases />
				};
				gridArray[index]=newPerson;
		}else if(urol && urol.widgets && urol.widgets.id===7){
				const newPerson = {id:urol && urol.id,
					title:urol && urol.widgets && urol.widgets.title,
					image:<MyLeave />
				};
				gridArray[index]=newPerson;
		}else{
			const newPerson = {id:urol && urol.id,
				title:urol && urol.widgets && urol.widgets.title,
				image:urol && urol.widgets && urol.widgets.title
			};
			gridArray[index]=newPerson;
		}
      				
	  //alert(newPerson);
      //setGridArray([...gridArray, newPerson]);
	  
	  console.log("gridArray "+gridArray);
    };

	
    },[]);



	return (
		<React.Fragment>
		<form className='mt-0 p-1' style={{backgroundColor:'white', borderBlock:1}}>
		
		{/*<Dashboard/>
		<DashboardUpdated />
		*/}
		
		<div className="cards-grid p-1">    
          {
            gridArray && gridArray.map((card, i) => (
              
              <div key={i} className="card-grid">
                {card.image}                
              </div>              
            ))
          }         
        </div>  
		
		{/*
		<Row className="mt-2">
			<Col sm="4">
				<Card style={{boxShadow:'0px 0px 0px rgb(246 242 242), 0 0 10px rgb(10 10 10), 0 0 10px rgb(10 10 10)'}}>
				<CardHeader>
					<FaUser/> Financial Graph of GMDA
				</CardHeader>
				<CardBody>
					<EmployeeBarCharts />
				</CardBody>
				<CardFooter>
					<i><NavLink href='/userrole'> </NavLink></i>
				</CardFooter>
				</Card>
			</Col>
			<Col sm="4">
				<Card style={{boxShadow:'0px 0px 0px rgb(246 242 242), 0 0 10px rgb(10 10 10), 0 0 10px rgb(10 10 10)'}}>
					<CardHeader>
						<FaRProject /> My Profile
					</CardHeader>
					<CardBody style={{background:"linear-gradient(80deg, #40F8FF 0%, #279EFF,#0adbb89d 100%)"}}>
						<CardTitle tag="h5">
							Hello : Mr. Rakesh Kumar Gupta
						</CardTitle>
							<CardSubtitle>
								Designation: Head IT Governance
							</CardSubtitle>
							<CardSubtitle>
								Department: IT
							</CardSubtitle>
							<CardText>
								Employee Type : Remuneration of export
						</CardText>
						<CardText>
								Staff Type : Remuneration of export
						</CardText>
						
						<CardText>
								Store Issued Item <ArrowRightAltSharp/>
						</CardText>
						<CardText>
								Salary Slip <ArrowRightAltSharp/>
						</CardText>
					</CardBody>
					<CardFooter>
						<i><NavLink href='/userrole'> </NavLink></i>
					</CardFooter>
				</Card>
			</Col>
			<Col sm="4">
				<Card style={{boxShadow:'0px 0px 0px rgb(246 242 242), 0 0 10px rgb(10 10 10), 0 0 10px rgb(10 10 10)'}}>
					<CardHeader>
						<FaRProject /> Reports
					</CardHeader>
					<CardBody>
						<EmployeeLineChart />
						
					</CardBody>
					<CardFooter>
						<i><NavLink href='/userrole'> Department Wise Details</NavLink></i>
					</CardFooter>
				</Card>
			</Col>
		</Row>
		*/}
		{/*<Row className="mt-3">
			<DashboardUpdatedCards />
		</Row>
		*/}

		<ToastContainer />
		</form>
		</React.Fragment>
	)
}

export default Home;
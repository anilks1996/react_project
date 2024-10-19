import { NavLink } from "react-router-dom";
import { FaBars, FaCarAlt, FaHome, FaList, FaListAlt, FaTractor, FaUser, FaUserCircle, FaUserClock, FaUserCog, FaUserEdit } from "react-icons/fa";
import { MdAppRegistration, MdOutlineSettings } from "react-icons/md";
import { BiSearch, BiTransfer } from "react-icons/bi";
import { AiOutlineTransaction} from "react-icons/ai";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "../../App.css";
import { AccountBoxOutlined, BookOnlineOutlined, CastForEducation, Dashboard, DockRounded, HighQuality, HighQualityOutlined, LocationCityOutlined, LocationCityRounded, NewReleases, PeopleAltTwoTone, Report, ReportOffOutlined, RequestPage, TourOutlined, UploadFileTwoTone } from "@mui/icons-material";
import { CgProfile } from "react-icons/cg";

const routes = [
  {
    path: "/establishmentDashboard",
    name: "Dashboard",
    icon: <Dashboard />,
  },
  // {
  //   path: "/fileManager",
  //   name: "My Profile",
  //   icon: <CgProfile />,
  // },
  {
    path: "/establishmentTransactions",
    name: "Establishment Transactions",
    icon: <AiOutlineTransaction />,
    subRoutes:[
      {
        path: "/establishmentTransactions/employeeRegister",
        name: "Employee Register",
        icon: <MdAppRegistration />,
      },
      {
        path: "/establishmentTransactions/uploadEmployeeDocuments",
        name: "Scan-Upload Documents",
        icon: <UploadFileTwoTone />,
      },
      {
        path: "/establishmentTransactions/bulkEmployeeUpload",
        name: "Bulk Employee Upload",
        icon: <PeopleAltTwoTone />,
      }
    ]
  },
  {
    path: "/establishmentSetup",
    name: "Establishment Setup",
    icon: <MdOutlineSettings />,
    subRoutes:[
      {
        path: "/establishmentSetup/employeeType",
        name: "Employee Type ",
        icon: <FaUserCog />,
      },
      {
        path: "/establishmentSetup/staffTypeList",
        name: "Staff Type",
        icon: <FaUserCog />,
      },
      {
        path: "/establishmentSetup/departmentList",
        name: "Department",
        icon: <FaUserCog />,
      },
      {
        path: "/establishmentSetup/designationList",
        name: "Designation",
        icon: <FaUserCog />,
      },
      {
        path: "/establishmentSetup/qualificationTypeList",
        name: "Qualification Type",
        icon: <CastForEducation />,
      },
      {
        path: "/establishmentSetup/employeeDocumentList",
        name: "Documents List",
        icon: <DockRounded />,
      },
      {
        path: "/establishmentSetup/subEmployeeTypeList",
        name: "Sub Employee Type",
        icon: <FaUserCog />,
      },
      {
        path: "/establishmentSetup/pastOrganizationList",
        name: "Past Organization Department",
        icon: <FaUserCog />,
      },
      {
        path: "/establishmentSetup/jobLocationList",
        name: "Job Location",
        icon: <LocationCityOutlined />,
      },
      {
        path: "/establishmentSetup/editLocationTab",
        name: "Add Location",
        icon: <LocationCityRounded />,
      },
    ]
  },
  {
    path: "/establishmentReport",
    name: "Establishment Report",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/establishmentReport/establishmentReport",
        name: "Establishment Report",
        icon: <FaUser />,
        nestedRoutes:[
          {
            path: "/establishmentReport/establishmentReport/employeeProfile",
            name: "Employee Profile",
            icon: <FaUserEdit />,
          },
          {
            path: "/establishmentReport/establishmentReport/staffDetailReport",
            name: "Staff Detail Report",
            icon: <FaUserCircle />,
          },
          {
            path: "/establishmentReport/establishmentReport/misReport",
            name: "MIS Report",
            icon: <FaUserClock />,
          }
        ]
      },
      {
        path: "/establishmentReport/transportation",
        name: "Transportation Detail",
        icon: <FaTractor />,
        nestedRoutes:[
          {
            path: "/establishmentReport/transportation/vehicle",
            name: "Vehicle",
            icon: <FaCarAlt />,
          },
          {
            path: "/establishmentReport/transportation/vehicleRequisition",
            name: "Vehicle Requisition",
            icon: <FaCarAlt />,
          }
        ]
      },
    ],
  },
  {
    path: "/serviceBookDetails",
    name: "Service Book Details",
    icon: <BookOnlineOutlined />,
    subRoutes:[
      {
        path: "/serviceBookDetails/transferEmployeeList",
        name: "Transfer",
        icon: <BiTransfer />,
      },
      {
        path: "/serviceBookDetails/promotionOrIncrementList",
        name: "Promotion/Increment",
        icon: <HighQualityOutlined />,
      },
      {
        path: "/serviceBookDetails/serviceStatusUpdateList",
        name: "Service Status Update",
        icon: <HighQualityOutlined />,
      },
      {
        path: "/serviceBookDetails/requestApprovalList",
        name: "Request Approvals",
        icon: <RequestPage />,
      },
      {
        path: "/serviceBookDetails/serviceRegisterList",
        name: "Service Register",
        icon: <FaUserCircle />,
      },
      {
        path: "/serviceBookDetails/bulkIncrementCreation",
        name: "Bulk Increment",
        icon: <HighQuality />,
      },
    ]
  },
  {
    path: "/newUserPerforma",
    name: "New User Performa",
    icon: <NewReleases />,
    exact: true,
    subRoutes: [
      {
        path: "/newUserPerforma/sendRegistrationLink",
        name: "Send Registration Link ",
        icon: <FaUser />,
      },
      {
        path: "/newUserPerforma/newEmployeeList",
        name: "New Employee List",
        icon: <FaList />,
      },
      {
        path: "/newUserPerforma/allRegisteredEmployees",
        name: "All Registered Employees",
        icon: <FaListAlt />,
      },
    ],
  },
  {
    path: "/tourApplication",
    name: "Tour Application",
    icon: <TourOutlined />,
    subRoutes:[
      {
        path: "/tourApplication/tourApplicationReports",
        name: "Tour Report",
        icon: <Report />,
      },
      {
        path: "/tourApplication/tourClaimReports",
        name: "Tour Claim Report",
        icon: <ReportOffOutlined />,
      },
      {
        path: "/tourApplication/claimRateSetup",
        name: "Claim Rate Setup",
        icon: <MdOutlineSettings />,
      },
      {
        path: "/tourApplication/tourAccountMapping",
        name: "Tour Account Mapping",
        icon: <AccountBoxOutlined />,
      },
    ]
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filtered,setFiltered] = useState([]);
  const [frstLevel, setFrstLevel] = useState([]);
  const [secLevel, setSecLevel] = useState([]);
  const toggle = () =>
  { 
    setFiltered(routes);
    setIsOpen(!isOpen);
  };
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(()=>{
    setFiltered(routes);
  }, []);
  
  const handleChange=(e)=>{
    const frstArray=[];const secArray=[];const thrdArray=[];
    const finalArray=[];
      routes.map((rout)=>{
        console.log('1st Level : '+rout.name);
        //const filterInput1=routes.filter((rout)=>rout.name.includes(e.target.value));
        //setFiltered(filterInput1);
        frstArray.push(rout);
        if(rout.subRoutes){
          rout.subRoutes.map((subRout)=>{
            console.log('    2nd Level : '+subRout.name); 
            secArray.push(subRout);         
            if(subRout.nestedRoutes){
              subRout.nestedRoutes.map((nestedRout)=>{
                console.log('           3rd Level : '+nestedRout.name);
                thrdArray.push(nestedRout);
              });
            }
          });         
        }
      });  
      console.log('First level = '+frstArray);
      console.log('Second level = '+secArray);
      console.log('Third level = '+thrdArray);
      //finalArray.push(frstArray);
      //console.log('Final level = '+finalArray);
      if(secArray){ 
         const var22=secArray.filter((subRout2)=>subRout2.name.toLowerCase().includes(e.target.value.toLowerCase()));
         setFiltered(var22);       
      }
      if(filtered.length<1){
        console.log("filtered======= "+filtered);
        if(thrdArray){ 
          const var33=thrdArray.filter((subRout2)=>subRout2.name.toLowerCase().includes(e.target.value.toLowerCase()));
          setFiltered(var33);       
        }
      }     
  }

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",            
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar`}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >                
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search" onChange={handleChange}
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {filtered.map((route, index) => {
              if (route.subRoutes) {
                      
                return (
                  <SidebarMenu key={index} setIsOpen={setIsOpen} route={route} showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink to={route.path} key={index} className="link" activeclassname="active">
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
import { NavLink } from "react-router-dom";
import { FaBars} from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../../App.css";
import { Dashboard, DocumentScannerRounded, Inbox,Store, StoreSharp } from "@mui/icons-material";
import { MdPayment } from "react-icons/md";
import { BiRegistered } from "react-icons/bi";
import { RiPagesLine } from "react-icons/ri";
import EmployeeSidebar2 from "./EmployeeSidebar2";
import { CgProfile } from "react-icons/cg";

const routes = [
  {
    path: "/employeeUserDashboard",
    name: "Dashboard",
    icon: <Dashboard />,
  },
  {
    path: "/employeeUserInbox",
    name: "Inbox",
    icon: <Inbox />,
  },
  {
    path: "/fileManager",
    name: " My Profile",
    icon: <CgProfile />,
  },
  {
    path: "/myDeclaration",
    name: "My Declaration",
    icon: <DocumentScannerRounded />,
  },
  {
    path: "/hardwareItemIssued",
    name: "Hardware Item Issued",
    icon: <StoreSharp />,
  },
  {
    path: "/storeItemIssued",
    name: "Store Item Issued",
    icon: <Store />,
  },
  {
    path: "/salaryDetails",
    name: "Salary Details",
    icon: <MdPayment />,
    subRoutes:[
      {
        path: "/salaryDetails/salaryRegister",
        name: "Salary Register",
        icon: <BiRegistered />,
      },
      {
        path: "/salaryDetails/paySlip",
        name: "Payslip",
        icon: <RiPagesLine />,
      },
    ]
  },
];

const EmployeeSidebar1 = ({ children }) => {
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
                  <EmployeeSidebar2 key={index} setIsOpen={setIsOpen} route={route} showAnimation={showAnimation}
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

export default EmployeeSidebar1;
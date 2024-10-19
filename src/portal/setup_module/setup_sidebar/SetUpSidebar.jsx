import { NavLink } from "react-router-dom";
import { FaBars, FaCalendar, FaUserCircle,FaUserSecret,FaUserEdit } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { FcWorkflow } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { GoWorkflow } from "react-icons/go";
import { RiDashboardFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import "../../../App.css";
import SetUpSidebarMenu from "./SetUpSidebarMenu";


const routes = [
  {
    path: "/setupDashboard",
    name: "Dashboard",
    icon: <RiDashboardFill />,
  },
  {
  path: "/setup",
  name: "Setup",
  icon: <IoMdSettings />,
  subRoutes:[
    {
      path: "/setup/company",
      name: "Company",
      icon: <FaUserEdit />,
    },
    {
        path: "/setup/masterCodes",
        name: "Master Codes",
        icon: <FaUserEdit />,
      },
      {
        path: "/setup/banks",
        name: "Banks",
        icon: <FaUserEdit />,
      },
      {
        path: "/setup/geographicalLocations",
        name: "Geographical Locations",
        icon: <FaUserCircle />,
      },
      {
        path: "/setup/bankBranches",
        name: "Bank Branches",
        icon: <FaUserSecret />,
      },
      {
        path: "/setup/govtOrder",
        name: "Govt Order",
        icon: <FaCalendar/>,
      },
      {
        path: "/setup/configurationMaster",
        name: "Configuration Master",
        icon: <FaUserEdit />,
      },
    ]
},
{
  path: "/setupWorkFlow",
  name: "Work Flow",
  icon: <GoWorkflow />,
  subRoutes:[
          {
            path: "/setup/workFlowType",
            name: "Work Flow Type",
            icon: <FcWorkflow />,
          },
          {
            path: "/setup/workFlow",
            name: "Work Flow",
            icon: <FcWorkflow />,
          },
          {
            path: "/setup/workFlowPrivilege",
            name: "Work Flow Privilege",
            icon: <FcWorkflow />,
          },            
        ],
},
]   
const SetUpSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                      
                return (
                  <SetUpSidebarMenu key={index} setIsOpen={setIsOpen} route={route} showAnimation={showAnimation}
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

export default SetUpSidebar;
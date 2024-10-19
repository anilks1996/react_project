import { NavLink } from "react-router-dom";
import { FaBars, FaCalendar, FaUserCircle,FaUserSecret,FaMarsDouble, FaMarsStroke } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import "../../../App.css";
import { FaSourcetree, FaUpload, FaUser, FaUserGroup } from "react-icons/fa6";
import { Settings } from "@mui/icons-material";


const routes = [
    {
        path: "/adminSetupDashboard",
        name: "Dashboard",
        icon: <RiDashboardFill />,
    },
    {
        path: "/users",
        name: "User",
        icon: <FaUser />,
    },
    {
        path: "/userGroups",
        name: "User Groups",
        icon: <FaUserGroup />,
    },
    {
        path: "/usersRoles",
        name: "User Roles",
        icon: <FaUserCircle />,
    },
    {
        path: "/modules",
        name: "Module",
        icon: <FaMarsDouble />,
    },
    {
        path: "/resources",
        name: "Resources",
        icon: <FaSourcetree />,
    },
    {
        path: "/uploadResources",
        name: "Upload Resources",
        icon: <FaUpload/>,
    },
    {
        path: "/userRoleSetting",
        name: "Dashboard Setting",
        icon: <Settings />,
    },
]   

const AdminSetupSidebar1 = ({ children }) => {
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

export default AdminSetupSidebar1;
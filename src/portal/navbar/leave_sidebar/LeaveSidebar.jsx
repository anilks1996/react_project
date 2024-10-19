import { NavLink } from "react-router-dom";
import { FaBars, FaCalendar, FaCarAlt, FaHome, FaList, FaListAlt, FaTractor, FaUser, FaUserCircle,FaUserSecret, FaUserClock, FaUserCog, FaUserEdit, FaSearch } from "react-icons/fa";
import { MdAppRegistration, MdOutlineSettings, MdTimeToLeave } from "react-icons/md";
import { BiSearch, BiTransfer } from "react-icons/bi";
import { AiOutlineTransaction} from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../../App.css";
import { AccountBoxOutlined, BookOnlineOutlined, CastForEducation, DockRounded, EmojiPeople, HighQuality, HighQualityOutlined, LocationCityOutlined, LocationCityRounded, NewReleases, PeopleAltTwoTone, Report, ReportOffOutlined, RequestPage, TourOutlined, UploadFileTwoTone } from "@mui/icons-material";
import LeaveSidebarMenu from "./LeaveSidebarMenu";

const routes = [
  {
    path: "/leaveDashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/fileManager",
    name: "My Profile",
    icon: <EmojiPeople />,
  },
{
  path: "/leave_module",
  name: "Leave Management",
  icon: <FaUser />,
  subRoutes:[
    {
      path: "/leave_module/leaveMaster",
      name: "Leave Master",
      icon: <FaUserEdit />,
      nestedRoutes:[
        {
          path: "/leaveMaster/leavemaster/",
          name: "Leave Master",
          icon: <FaUserCircle />,
        },
        {
          path: "/leaveMaster/leaveType/LeaveType",
          name: "Leave Type",
          icon: <FaUserSecret />,
        },
        {
          path: "/leaveMaster/holidayCalender",
          name: "Holiday Calendar",
          icon: <FaCalendar/>,
        },
        {
          path: "/leaveMaster/leavePolicy",
          name: "Show LeavePolicy",
          icon: <FaCalendar />,
        },
      ]
    },
      {
        path: "/leaveMaster/leaveTransaction/LeaveApproval",
        name: "Leave Transactions",
        icon: <FaUserEdit/>,
        nestedRoutes:[
            {
              path: "/leaveMaster/leaveTransaction/LeaveApproval",
              name: "Leave Approval",
              icon: <FaCalendar />,
            },
            {
              path: "/leaveMaster/leaveTransaction/LeaveAllocation",
              name: "Leave Allocation",
              icon: <FaCalendar />,
            },
            {
              path: "/leaveMaster/leaveTransaction/LeaveAdjustment",
              name: "Leave Adjustment",
              icon: <FaCalendar/>,
            },
            {
              path: "/leaveMaster/leaveTransaction/ProcessedUnProcessed",
              name: "Processed Un-processed",
              icon: <FaSearch/>,
            },
            {
              path: "/leaveMaster/LeaveTransactions/NewLeaveProcessed",
              name: "New Employee Leave Processing",
              icon: <FaCalendar/>,
            },
          ]
        },

        {
          path: "/leaveMaster/leaveReports/LeaveStatus",
          name: "Leave Reports",
          icon: <FaUserEdit/>,
          nestedRoutes:[
              {
                path: "/leaveMaster/leaveReports/LeaveStatus",
                name: "Leave Status",
                icon: <FaCalendar />,
              },
              {
                path: "/leaveManagement/LeaveReports/LeaveStatusChart",
                name: "Leave Status Chart",
                icon: <FaCalendar />,
              },
              {
                path: "/leaveManagement/LeaveReports/EmployeeLeaveChart",
                name: "Employee Leave Chart",
                icon: <FaCalendar/>,
              },
              {
                path: "/leaveManagement/LeaveReports/LeaveCard",
                name: "LeaveCard",
                icon: <FaCalendar/>,
              },
            ]
          },
        ]
      }
    ];
    
const LeaveSidebar = ({ children }) => {
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
                  <LeaveSidebarMenu key={index} setIsOpen={setIsOpen} route={route} showAnimation={showAnimation}
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

export default LeaveSidebar;
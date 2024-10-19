import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaAccusoft } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AccountsApproverSidebarMenu from "./AccountsApproverSidebarMenu";
import ArticleIcon from "@mui/icons-material/Article";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BiSearch } from "react-icons/bi";
import "../../../App.css";

const routes = [
  {
    path: "/accountApproverDashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },

  {
    path: "/myVoucherInbox",
    name: "My Voucher",
    icon: <ArticleIcon />,
  },

  {
    path: "/accountsVouchers",
    name: "Accounts Vouchers",
    icon: <AutoStoriesIcon />,
    subRoutes: [
      {
        path: "/accountsVouchers",
        name: "Accounts Vouchers",
        icon: <FaAccusoft />,
      },
      {
        path: "/bulkPayments",
        name: "Bulk Payments",
        icon: <FaAccusoft />,
      },
    ],
  },
  {
    path: "/rtgsPaymentReport",
    name: "Rtgs Payment Report",
    icon: <AccountBalanceWalletIcon />,
  },
];

const AccountsApproverSideBar = ({ children }) => {
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
                ></motion.h1>
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
                  <AccountsApproverSidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
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

export default AccountsApproverSideBar;

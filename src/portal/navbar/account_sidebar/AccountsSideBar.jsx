import { NavLink } from "react-router-dom";
import { FaAccusoft, FaBars, FaHome} from "react-icons/fa";
import PaymentIcon from '@mui/icons-material/Payment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MoneyIcon from '@mui/icons-material/Money';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AccountsSidebarMenu from "./AccountsSidebarMenu";
import LinkIcon from '@mui/icons-material/Link';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BiSearch } from "react-icons/bi";
import "../../../App.css";


const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },

   {
    path: "/financialAccounting",
    name: "Financial Accounting",
    icon: <PaymentIcon />,
    subRoutes:[
      {
        path: "/financialAccounting/accountMaster",
        name: "Account Master",
        icon: <ManageAccountsIcon />,
        nestedRoutes:[
          {
            path: "/financialAccounting/accountMaster/organization",
            name: "Organization",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/accountMaster/chartsofAccounts",
            name: "Charts of Accounts",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/accountMaster/openingBalances",
            name: "Opening Balances",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/accountMaster/costCenters",
            name: "Cost Centers",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/accountMaster/costcenterMapping",
            name: "Cost Center Mapping",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/accountMaster/bookType",
            name: "Book Type",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/accountMaster/accountsBudget",
            name: "Accounts Budget",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/accountMaster/allocatedBudgetReport",
            name: "Allocated Budget Report",
            icon: <FaAccusoft />,
          },
        ]
      },
      {
        path: "/financialAccounting/accountsTransactions",
        name: "Accounts Transactions",
        icon: <AccountBalanceWalletIcon />,
        nestedRoutes:[
          {
            path: "/financialAccounting/accountsTransactions/bankReconciliation",
            name: "Bank Reconciliation",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/accountsTransactions/autoBrs",
            name: "Auto BRS",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/accountsTransactions/yearEndProcess",
            name: "Year End Process",
            icon: <FaAccusoft />,
          },
        ]
        
      },
      {
        path: "/financialAccounting/voucherListing",
        name: "Voucher Listing",
        icon: <ReceiptLongIcon />,
        nestedRoutes:[
          {
            path: "/financialAccounting/voucherListing/contraVoucher",
            name: "Contra Voucher",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/voucherListing/journalVoucher",
            name: "Journal Voucher",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/voucherListing/paymentVoucher",
            name: "Payment Voucher",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/voucherListing/receiptVoucher",
            name: "Receipt Voucher",
            icon: <FaAccusoft />,
          },
        ]
        
      },
      {
        path: "/financialAccounting/financialReports",
        name: "Financial Reports",
        icon: <ReceiptIcon />,
        nestedRoutes:[
          {
            path: "/financialAccounting/financialReports/bankBook",
            name: "Bank Book",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/generalLedger",
            name: "General Ledger",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/bankReconciliationStatements",
            name: "Bank Reconciliation Statements",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/billDateWiseLedgerReport",
            name: "Bill Date Wise Ledger Reports",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/cashBook",
            name: "Cash Book",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/chequeRegister",
            name: "Cheque Register",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/codeList",
            name: "Code List",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/consolidatedLedgerReport",
            name: "Consolidated Ledger Report",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/costcenterReports",
            name: "Cost Center Reports",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/costCenterWiseAccountHeadWiseReport",
            name: "Cost Center Wise Account Head Wise Report",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/costCenterWiseLedgerReport",
            name: "Cost Center Wise Ledger Report",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/dayBook",
            name: "Day Book",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/employeeVendorLedgerReport",
            name: "Employee Vendor Ledger Report",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/employeeVendorTrialBalanceReport",
            name: "Employee Vendor Trial Balance Report",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/gstComputation",
            name: "Gst Computation",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/ledgerBulkPrinting",
            name: "Ledger Bulk Printing",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/netPosition",
            name: "Net Position",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/tdsReturn",
            name: "Tds Return",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialReports/utilizationReport",
            name: "Utilization Report",
            icon: <FaAccusoft />,
          },
          
        ]
        
      },
      {
        path: "/financialAccounting/financialStatements",
        name: "Financial Statements",
        icon: <MoneyIcon />,
        nestedRoutes:[
          {
            path: "/financialAccounting/financialStatements/trialBalanceWithGroup",
            name: "Trial Balance With Group",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialStatements/balanceSheet",
            name: "Balance Sheet",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialStatements/balanceSheetWithSchedule",
            name: "Balance Sheet With Schedule",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialStatements/trialBalanceWithoutGroup",
            name: "Trial Balance Without Group",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialStatements/incomeExpenditureAccount",
            name: "Income Expenditure Account",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialStatements/receiptsPaymentsAccounts",
            name: "Receipts Payments Accounts",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialStatements/chequesDepositedButUncleared",
            name: "Cheques Deposited But Uncleared",
            icon: <FaAccusoft />,
          },
          {
            path: "/financialAccounting/financialStatements/chequesIssuedButNotPresentedforPayment",
            name: "Cheques Issued But Not Presented for Payment",
            icon: <FaAccusoft />,
          },
        ]
        
      }
      
    ]
 
  },
  {
    path: "/importantLinks",
    name: "Important Links",
    icon: <LinkIcon />,
  },
  {
    path: "/costCenterBudgets",
    name: "Cost Center Budget",
    icon: <CurrencyRupeeIcon />,
  },

  {
    path: "/accountsVendors",
    name: "Accounts Vendors",
    icon: <AccountCircleIcon />,
  },

];

const AccountsSideBar = ({ children }) => {
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
                  <AccountsSidebarMenu key={index}
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

export default AccountsSideBar;
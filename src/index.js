import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/login/Login';
import Auth from './auth/Auth';
import App from './App';
import ProtectedRoute from './util/ProtectedRoute';
import Home from './portal/home/Home';
import 'react-toastify/dist/ReactToastify.min.css';
import UserRole from './auth/userrole/UserRole';
import FileManager from './portal/navbar_components/pages/FileManager';
import PageNotFound from './errorPage/PageNotFound';
import FilterEmployeeTab from './portal/establishment_module/establishment_transaction/FilterEmployeeTab';
import EmployeeCreation from './portal/establishment_module/establishment_transaction/EmployeeCreation';
import ScanUploadDocumentEmp from './portal/establishment_module/establishment_transaction/ScanUploadDocumentEmp';
import CrteateEmpInBulk from './portal/establishment_module/establishment_transaction/CreateEmpInBulk';
import EmployeeTypeCreation from './portal/establishment_module/establishment_setup/EmployeeTypeCreation';
import EmployeeTypeList from './portal/establishment_module/establishment_setup/EmployeeTypeList';
import SideBar from './portal/navbar/SideBar';
import StaffTypeCreation from './portal/establishment_module/establishment_setup/StaffTypeCreation';
import StaffTypeList from './portal/establishment_module/establishment_setup/StaffTypeList';
import DepartmentList from './portal/establishment_module/establishment_setup/DepartmentList';
import DepartmentCreation from './portal/establishment_module/establishment_setup/DepartmentCreation';
import DesignationList from './portal/establishment_module/establishment_setup/DesignationList';
import DesignationCreation from './portal/establishment_module/establishment_setup/DesignationCreation';
import QualificationTypeList from './portal/establishment_module/establishment_setup/QualificationTypeList';
import QualificationTypeCreation from './portal/establishment_module/establishment_setup/QualificationTypeCreation';
import EmployeeDocumentList from './portal/establishment_module/establishment_setup/EmployeeDocumentList';
import EmployeeDocumentCreation from './portal/establishment_module/establishment_setup/EmployeeDocumentCreation';
import SubEmployeeTypeList from './portal/establishment_module/establishment_setup/SubEmployeeTypeList';
import SubEmployeeTypeCreation from './portal/establishment_module/establishment_setup/SubEmployeeTypeCreation';
import PastOrganizationList from './portal/establishment_module/establishment_setup/PastOrganizationList';
import PastOrganizationCreation from './portal/establishment_module/establishment_setup/PastOrganizationCreation';
import JobLocationList from './portal/establishment_module/establishment_setup/JobLocationList';
import JobLocationCreation from './portal/establishment_module/establishment_setup/JobLocationCreation';
import AddLocationList from './portal/establishment_module/establishment_setup/AddLocationList';
import AddLocationCreation from './portal/establishment_module/establishment_setup/AddLocationCreation';
import StaffDetailReport from './portal/establishment_module/establishment_report/StaffDetailReport';
import EstMISReport from './portal/establishment_module/establishment_report/EstMISReport';
import TransferEmployeeList from './portal/establishment_module/servicebook_detail/TransferEmployeeList';
import TransferEmployeeCreation from './portal/establishment_module/servicebook_detail/TransferEmployeeCreation';
import PromotionOrIncrementList from './portal/establishment_module/servicebook_detail/PromotionOrIncrementList';
import PromotionOrIncrementCreation from './portal/establishment_module/servicebook_detail/PromotionOrIncrementCreation';
import ServiceStatusUpdateCreation from './portal/establishment_module/servicebook_detail/ServiceStatusUpdateCreation';
import ServiceStatusUpdateList from './portal/establishment_module/servicebook_detail/ServiceStatusUpdateList';
import RequestApprovalList from './portal/establishment_module/servicebook_detail/RequestApprovalList';
import RequestApprovalCreation from './portal/establishment_module/servicebook_detail/RequestApprovalCreation';
import ServiceRegisterList from './portal/establishment_module/servicebook_detail/ServiceRegisterList';
import BulkIncrementCreation from './portal/establishment_module/servicebook_detail/BulkIncrementCreation';
import SendRegistrationLink from './portal/establishment_module/newuser_performa/SendRegistrationLink';
import AllRegisteredEmployee from './portal/establishment_module/newuser_performa/AllRegisteredEmployee';
import TourAccountMapping from './portal/establishment_module/tour_application/TourAccountMapping';
import TourClaimReport from './portal/establishment_module/tour_application/TourClaimReport';
import TourClaimSetup from './portal/establishment_module/tour_application/TourClaimSetup';
import TourApplicationReport from './portal/establishment_module/tour_application/TourApplicationReport';
import TabPanel from './portal/establishment_module/establishment_transaction/TabPanel';
import LocationPanel from './portal/establishment_module/establishment_setup/LocationPanel';
import RegistrationTabPanel from './portal/establishment_module/newuser_performa/RegistrationTabPanel';
import CreateCountryModel from './portal/establishment_module/establishment_setup/CreateCountryModel';
import CreateStateModel from './portal/establishment_module/establishment_setup/CreateStateModel';
import CreateCityModel from './portal/establishment_module/establishment_setup/CreateCityModel';
import CreateLocationInCityModel from './portal/establishment_module/establishment_setup/CreateLocationInCityModel';
import LeaveDashboard from './portal/leave_module/LeaveDashboard';
import LeaveType from './portal/leave_module/leaveMaster/leaveType/LeaveType';
import AddLeaveTypes from './portal/leave_module/leaveMaster/leaveType/AddLeaveTypes';
import HolidayCalender from './portal/leave_module/leaveMaster/holidayCalender/HolidayCalender';
import NewHoliday from './portal/leave_module/leaveMaster/holidayCalender/NewHoliday';
import ShowLeavePolicy from './portal/leave_module/leaveMaster/leavePolicy/ShowLeavePolicy';
import AddLeavePolicy from './portal/leave_module/leaveMaster/leavePolicy/AddLeavePolicy';
import LeaveApproval from './portal/leave_module/leaveTransaction/LeaveApproval';
import LeaveAllocation from './portal/leave_module/leaveTransaction/LeaveAllocation';
import LeaveAdjustment from './portal/leave_module/leaveTransaction/LeaveAdjustment';
import ProcessedUnProcessed from './portal/leave_module/leaveTransaction/ProcessedUnProcessed';
import LeaveStatus from './portal/leave_module/leaveReports/LeaveStatus';
import LeaveSidebar from './portal/navbar/leave_sidebar/LeaveSidebar';
import AddLeaveMaster from './portal/leave_module/leaveMaster/leavemaster/AddLeaveMaster';
import ShowLeaveMaster from './portal/leave_module/leaveMaster/leavemaster/ShowLeaveMaster';
import LeaveChart from './portal/leave_module/leaveReports/LeaveChart';
import EmployeeleaveChart from './portal/leave_module/leaveReports/EmployeeleaveChart';

import AccountsProfile from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/accountsBudget/AccountsProfile';
import AccountsSideBar from './portal/navbar/account_sidebar/AccountsSideBar';
import Organization from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/organization/Organization';
import ChartsofAccounts from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/chartsofAccounts/ChartsofAccounts';
import OpeningBalances from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/openingBalances/OpeningBalances';
import CostCenters from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/costCenters/CostCenters';
import CostCenterMapping from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/costcenterMapping/CostCenterMapping';
import BookType from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/bookType/BookType';
import AccountsBudget from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/accountsBudget/AccountsBudget';
import AllocatedBudgetReport from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/allocatedBudgetReport/AllocatedBudgetReport';
import BankReconciliation from './portal/account_module/accountsAdmin/financialAccounting/accountsTransactions/bankReconciliation/BankReconciliation';
import AutoBrs from './portal/account_module/accountsAdmin/financialAccounting/accountsTransactions/autoBrs/AutoBrs';
import YearEndProcess from './portal/account_module/accountsAdmin/financialAccounting/accountsTransactions/yearEndProcess/YearEndProcess';
import ContraVoucher from './portal/account_module/accountsAdmin/financialAccounting/voucherListing/contraVoucher/ContraVoucher';
import JournalVoucher from './portal/account_module/accountsAdmin/financialAccounting/voucherListing/journalVoucher/JournalVoucher';
import PaymentVoucher from './portal/account_module/accountsAdmin/financialAccounting/voucherListing/paymentVoucher/PaymentVoucher';
import ReceiptVoucher from './portal/account_module/accountsAdmin/financialAccounting/voucherListing/receiptVoucher/ReceiptVoucher';
import BankBook from './portal/account_module/accountsAdmin/financialAccounting/financialReports/bankBook/BankBook';
import BillDateWiseLedgerReport from './portal/account_module/accountsAdmin/financialAccounting/financialReports/billDateWiseLedgerReport/BillDateWiseLedgerReport';
import CashBook from './portal/account_module/accountsAdmin/financialAccounting/financialReports/cashBook/CashBook';
import CodeList from './portal/account_module/accountsAdmin/financialAccounting/financialReports/codeList/CodeList';
import ChequeRegister from './portal/account_module/accountsAdmin/financialAccounting/financialReports/chequeRegister/ChequeRegister';
import ConsolidatedLedgerReport from './portal/account_module/accountsAdmin/financialAccounting/financialReports/consolidatedLedgerReport/ConsolidatedLedgerReport';
import CostCenterReports from './portal/account_module/accountsAdmin/financialAccounting/financialReports/costcenterReports/CostCenterReports';
import CostCenterWiseAccountHeadWiseReport from './portal/account_module/accountsAdmin/financialAccounting/financialReports/costCenterWiseAccountHeadWiseReport/CostCenterWiseAccountHeadWiseReport';
import CostCenterWiseLedgerReport from './portal/account_module/accountsAdmin/financialAccounting/financialReports/costCenterWiseLedgerReport/CostCenterWiseLedgerReport';
import DayBook from './portal/account_module/accountsAdmin/financialAccounting/financialReports/dayBook/DayBook';
import EmployeeVendorLedgerReport from './portal/account_module/accountsAdmin/financialAccounting/financialReports/employeeVendorLedgerReport/EmployeeVendorLedgerReport';
import EmployeeVendorTrialBalanceReport from './portal/account_module/accountsAdmin/financialAccounting/financialReports/employeeVendorTrialBalanceReport/EmployeeVendorTrialBalanceReport';
import GeneralLedger from './portal/account_module/accountsAdmin/financialAccounting/financialReports/generalLedger/GeneralLedger';
import GstComputation from './portal/account_module/accountsAdmin/financialAccounting/financialReports/gstComputation/GstComputation';
import LedgerBulkPrinting from './portal/account_module/accountsAdmin/financialAccounting/financialReports/ledgerBulkPrinting/LedgerBulkPrinting';
import NetPosition from './portal/account_module/accountsAdmin/financialAccounting/financialReports/netPosition/NetPosition';
import TdsReturn from './portal/account_module/accountsAdmin/financialAccounting/financialReports/tdsReturn/TdsReturn';
import UtilizationReport from './portal/account_module/accountsAdmin/financialAccounting/financialReports/utilizationReport/UtilizationReport';
import BalanceSheet from './portal/account_module/accountsAdmin/financialAccounting/financialStatements/balanceSheet/BalanceSheet';
import BalanceSheetWithSchedule from './portal/account_module/accountsAdmin/financialAccounting/financialStatements/balanceSheetWithSchedule/BalanceSheetWithSchedule';
import ChequesIssuedButNotPresentedforPayment from './portal/account_module/accountsAdmin/financialAccounting/financialStatements/chequesIssuedButNotPresentedforPayment/ChequesIssuedButNotPresentedforPayment';
import IncomeExpenditureAccount from './portal/account_module/accountsAdmin/financialAccounting/financialStatements/incomeExpenditureAccount/IncomeExpenditureAccount';
import ReceiptsPaymentsAccounts from './portal/account_module/accountsAdmin/financialAccounting/financialStatements/receiptsPaymentsAccounts/ReceiptsPaymentsAccounts';
import TrialBalanceWithGroup from './portal/account_module/accountsAdmin/financialAccounting/financialStatements/trialBalanceWithGroup/TrialBalanceWithGroup';
import TrialBalanceWithoutGroup from './portal/account_module/accountsAdmin/financialAccounting/financialStatements/trialBalanceWithoutGroup/TrialBalanceWithoutGroup';
import ImportantLinks from './portal/account_module/accountsAdmin/importantLinks/ImportantLinks';
import CostCenterBudgets from './portal/account_module/accountsAdmin/costCenterBudgets/CostCenterBudgets';
import AccountsVendors from './portal/account_module/accountsAdmin/accountsVendors/AccountsVendors';
import ChequesDepositedButUncleared from './portal/account_module/accountsAdmin/financialAccounting/financialStatements/chequesDepositedButUncleared/ChequesDepositedButUncleared';
import BankReconciliationStatements from './portal/account_module/accountsAdmin/financialAccounting/financialReports/bankReconciliationStatements/BankReconciliationStatements';
import CostCenterAdd from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/costCenters/CostCenterAdd';
import AddPage from './portal/account_module/accountsAdmin/financialAccounting/accountsMaster/bookType/AddPage';
import AccountsApproverSideBar from './portal/navbar/accountsApprover_sidebar/AccountsApproverSideBar';
import MyVoucher from './portal/account_module/accountsApprover/myVoucher/MyVoucher';
import AccountsVouchers from './portal/account_module/accountsApprover/accountsVouchers/AccountsVouchers';
import BulkPayments from './portal/account_module/accountsApprover/bulkPayments/BulkPayments';
import RtgsPaymentReport from './portal/account_module/accountsApprover/rtgsPaymentReport/RtgsPaymentReport';
import UserApprovalForm from './portal/establishment_module/newuser_performa/UserApprovalForm';
import CreateUserRegisterForm from './portal/establishment_module/newuser_performa/CreateUserRegisterForm';
import EmployeeUserDashboard from './portal/employeeusr_module/EmployeeUserDashboard';
import EmployeeUsrTabPanel from './portal/employeeusr_module/EmployeeUsrTabPanel';
import EmployeeSidebar1 from './portal/navbar/employeeusr_sidebar/EmployeeSidebar1';
import EstablishmentDashboard from './portal/establishment_module/EstablishmentDashboard';
import ShowLeaveAppApprovalForm from './portal/employeeusr_module/ShowLeaveAppApprovalForm';
import ShowBillSubmissionForm from './portal/employeeusr_module/ShowBillSubmissionForm';
import ShowUserRequisitionForm from './portal/employeeusr_module/ShowUserRequisitionForm';
import ShowPurchaseOrderApprovalForm from './portal/employeeusr_module/ShowPurchaseOrderApprovalForm';
import ShowStoreRequestApprovalForm from './portal/employeeusr_module/ShowStoreRequestApprovalForm';
import ShowStoreIssueApprovalForm from './portal/employeeusr_module/ShowStoresIssueApprovalForm';
import ShowEngineeringEstimateForm from './portal/employeeusr_module/ShowEngineeringEstimateForm';
import ShowOnlinePaymentApprovalForm from './portal/employeeusr_module/ShowOnlinePaymentApprovalForm';
import ShowTourApplicationApprovalForm from './portal/employeeusr_module/ShowTourApplicationApprovalForm';
import ShowTourClaimExpenseApprovalForm from './portal/employeeusr_module/ShowTourClaimExpenseApprovalForm';
import ShowLeaveUserForm from './portal/employeeusr_module/ShowLeaveUserForm';
import SetUpSidebar from './portal/setup_module/setup_sidebar/SetUpSidebar';
import SetupDashboard from './portal/setup_module/SetupDashboard';
import WorkFlowType from './portal/setup_module/work_flow/WorkFlowType';
import WorkFlow from './portal/setup_module/work_flow/WorkFlow';
import WorkFlowPrivilege from './portal/setup_module/work_flow/WorkFlowPrivilege';
import MasterCodes from './portal/setup_module/setup/MasterCodes';
import Banks from './portal/setup_module/setup/Banks';
import BankBranches from './portal/setup_module/setup/BankBranches';
import GeographicalLocations from './portal/setup_module/setup/GeographicalLocations';
import GovtOrder from './portal/setup_module/setup/GovtOrder';
import ConfigurationMaster from './portal/setup_module/setup/ConfigurationMaster';
import InstitutionCompanySetup from './portal/setup_module/setup/InstitutionCompanySetup';
import AccountApproverDashboard from './portal/account_module/accountsApprover/AccountApproverDashboard';
import MyVoucherTabPanel from './portal/account_module/accountsApprover/myVoucher/MyVoucherTabPanel';
import CreateVoucherStepper from './portal/account_module/accountsApprover/myVoucher/CreateVoucherStepper';
import ShowVoucherApprovalForms from './portal/account_module/accountsApprover/myVoucher/ShowVoucherApprovalForms';
import AdminSetupSidebar1 from './portal/admin_setup_module/admin_setup_sidebar/AdminSetupSidebar1';
import AdminSetupDashboard from './portal/admin_setup_module/admin_setup/AdminSetupDashboard';
import UserSetup from './portal/admin_setup_module/admin_setup/UserSetup';
import UserGroups from './portal/admin_setup_module/admin_setup/UserGroups';
import UserModules from './portal/admin_setup_module/admin_setup/UserModules';
import UserResources from './portal/admin_setup_module/admin_setup/UserResources';
import UploadResources from './portal/admin_setup_module/admin_setup/UploadResources';
import AddRoles from './portal/admin_setup_module/admin_setup/AddRoles';
import AddUsers from './portal/admin_setup_module/admin_setup/AddUsers';
import RoleModule from './portal/admin_setup_module/admin_setup/RoleModule';
import DashboardSetting from './portal/admin_setup_module/admin_setup/DashboardSetting';
import PasswordResetPage from './auth/login/PasswordResetPage';
import TourApplicationForm from './portal/establishment_module/tour_application/TourApplicationForm';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
	
		<BrowserRouter basename={'/'}>
			<Routes>
													
				<Route path='/auth' element={<Auth />}>
					<Route path='login' element={<Login />} />
				</Route>
									
				<Route path="/" element={<App />}>
					<Route path='' element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					} />
				</Route>
				
				<Route path="/auth/userrole" exact element={<App />}> <Route path='' element={<ProtectedRoute><UserRole/> </ProtectedRoute>} />
				</Route>
				{/*
				<Route path="/fileManager" exact element={<App />}><Route path='' element={<ProtectedRoute> <SideBar> <FileManager />												
					</SideBar></ProtectedRoute>} /> </Route>
				*/}
			{/*Employee User */}
				<Route path="/establishmentDashboard" exact element={<App />}><Route path='' element={<ProtectedRoute> <SideBar> <EstablishmentDashboard />												
					</SideBar></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserDashboard" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> <EmployeeUserDashboard />												
					</EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/fileManager" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> <FileManager />												
					</EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<EmployeeUsrTabPanel /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showLeaveAppApprovalForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowLeaveAppApprovalForm /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showBillSubmissionForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowBillSubmissionForm /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showUserRequisitionForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowUserRequisitionForm /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showPurchaseOrderApprovalForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowPurchaseOrderApprovalForm />  </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showStoreRequestApprovalForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowStoreRequestApprovalForm /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showStoresIssueApprovalForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowStoreIssueApprovalForm /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showEngineeringEstimateForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowEngineeringEstimateForm /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showOnlinePaymentApprovalForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowOnlinePaymentApprovalForm /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showTourApplicationApprovalForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowTourApplicationApprovalForm /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
				<Route path="/employeeUserInbox/showTourClaimExpenseApprovalForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowTourClaimExpenseApprovalForm /> </EmployeeSidebar1></ProtectedRoute>} /> </Route>
			{/*Create Request For Leave Application */}	
				<Route path="/employeeUserInbox/showLeaveUserForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<ShowLeaveUserForm />  </EmployeeSidebar1></ProtectedRoute>} /> </Route>
			{/*Create Request For Tour Application */}		
				<Route path="/employeeUserInbox/showTourApplicationForm/:id" exact element={<App />}><Route path='' element={<ProtectedRoute> <EmployeeSidebar1> 												
					<TourApplicationForm />  </EmployeeSidebar1></ProtectedRoute>} /> </Route>

			{/*End Employee User */}
			{/* Start Establishment */}	
				<Route path="/establishmentTransactions/employeeRegister" exact element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><FilterEmployeeTab /></SideBar> </ProtectedRoute> } /> </Route>
				<Route path="/establishmentTransaction/employeeCreationForm" exact element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><EmployeeCreation /> </SideBar> </ProtectedRoute> } /></Route>
				<Route path="/establishmentTransactions/uploadEmployeeDocuments" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><ScanUploadDocumentEmp /></SideBar> </ProtectedRoute> } /> </Route>
				<Route path="/establishmentTransactions/bulkEmployeeUpload" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><CrteateEmpInBulk /></SideBar> </ProtectedRoute> } />	</Route>				
				<Route path="/establishmentTransactions/editGeneralEmployeeTab/:id" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar> <TabPanel/> </SideBar> </ProtectedRoute> } />	</Route>				
				<Route path="/establishmentTransactions/editGeneralEmployee" element={<App />}><Route path='' element={<ProtectedRoute>
						<SideBar> <TabPanel/> </SideBar> </ProtectedRoute> } />	</Route>
					
				<Route path="/establishmentSetup/employeeType" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><EmployeeTypeList /> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/employeeTypeCreation" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><EmployeeTypeCreation /> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/editEmployeeType/:id" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><EmployeeTypeCreation /> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/staffType" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><StaffTypeCreation /> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/editStaffType/:id" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><StaffTypeCreation /> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/staffTypeList" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><StaffTypeList/> </SideBar> </ProtectedRoute> } />	</Route>				
				<Route path="/establishmentSetup/department" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><DepartmentCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/editDepartment/:id" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><DepartmentCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/departmentList" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><DepartmentList/> </SideBar> </ProtectedRoute> } />	</Route>							
				<Route path="/establishmentSetup/designationList" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><DesignationList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/designationCreation" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><DesignationCreation/> </SideBar> </ProtectedRoute> } /></Route>
				<Route path="/establishmentSetup/editDesignation/:id" element={<App />}><Route path='' element={<ProtectedRoute>
						<SideBar><DesignationCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/qualificationTypeList" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><QualificationTypeList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/qualificationTypeCreation" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><QualificationTypeCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/editQualificationType/:id" element={<App />}><Route path='' element={<ProtectedRoute>
						<SideBar><QualificationTypeCreation/> </SideBar> </ProtectedRoute> } />	</Route>				
				<Route path="/establishmentSetup/employeeDocumentList" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><EmployeeDocumentList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/employeeDocumentCreation" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><EmployeeDocumentCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/editEmpDocument/:id" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><EmployeeDocumentCreation/> </SideBar> </ProtectedRoute> } />	</Route>		
				<Route path="/establishmentSetup/SubEmployeeTypeList" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><SubEmployeeTypeList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/SubEmployeeTypeCreation" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><SubEmployeeTypeCreation/> </SideBar> </ProtectedRoute> } />	</Route>			
				<Route path="/establishmentSetup/editSubEmpType/:id" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><SubEmployeeTypeCreation/> </SideBar> </ProtectedRoute> } />	</Route>			
				<Route path="/establishmentSetup/pastOrganizationList" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><PastOrganizationList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/pastOrganizationCreation" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><PastOrganizationCreation/> </SideBar> </ProtectedRoute> } />	</Route>	
				<Route path="/establishmentSetup/editPastOrganizationDept/:id" element={<App />}><Route path='' element={<ProtectedRoute>
						<SideBar><PastOrganizationCreation/> </SideBar> </ProtectedRoute> } />	</Route>	
				<Route path="/establishmentSetup/editLocationTab" element={<App />}><Route path='' element={<ProtectedRoute>
						<SideBar><LocationPanel/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/editCountry/:id" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><CreateCountryModel/> </SideBar> </ProtectedRoute> } /> </Route>
				<Route path="/establishmentSetup/editState/:id" element={<App />}><Route path='' element={<ProtectedRoute>
						<SideBar><CreateStateModel/> </SideBar> </ProtectedRoute> } /> </Route>
				<Route path="/establishmentSetup/editCity/:id" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><CreateCityModel/> </SideBar> </ProtectedRoute> } /> </Route>
				<Route path="/establishmentSetup/editLocationInCity/:id" element={<App />}><Route path='' element={<ProtectedRoute>
						<SideBar> <CreateLocationInCityModel/> </SideBar> </ProtectedRoute> } /> </Route>

				<Route path="/establishmentSetup/jobLocationList" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><JobLocationList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/jobLocationCreation" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><JobLocationCreation/> </SideBar> </ProtectedRoute> } />	</Route>				
				<Route path="/establishmentSetup/addLocationList" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><AddLocationList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentSetup/addLocationCreation" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><AddLocationCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentReport/establishmentReport" element={<App />}><Route path='/establishmentReport/establishmentReport/employeeProfile' element={<ProtectedRoute>
					<SideBar><FileManager/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/establishmentReport/establishmentReport" element={<App />}><Route path='/establishmentReport/establishmentReport/staffDetailReport' element={<ProtectedRoute>
					<SideBar><StaffDetailReport/> </SideBar> </ProtectedRoute> } />	</Route>		
				<Route path="/establishmentReport/establishmentReport" element={<App />}><Route path='/establishmentReport/establishmentReport/misReport' element={<ProtectedRoute>
					<SideBar><EstMISReport/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/transferEmployeeList' element={<ProtectedRoute>
					<SideBar><TransferEmployeeList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/transferEmployeeCreation' element={<ProtectedRoute>
					<SideBar><TransferEmployeeCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/promotionOrIncrementList' element={<ProtectedRoute>
					<SideBar><PromotionOrIncrementList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/promotionOrIncrementCreation' element={<ProtectedRoute>
					<SideBar><PromotionOrIncrementCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/serviceStatusUpdateList' element={<ProtectedRoute>
					<SideBar><ServiceStatusUpdateList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/serviceStatusUpdateCreation' element={<ProtectedRoute>
					<SideBar><ServiceStatusUpdateCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/requestApprovalList' element={<ProtectedRoute>
					<SideBar><RequestApprovalList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/requestApprovalCreation' element={<ProtectedRoute>
					<SideBar><RequestApprovalCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/serviceRegisterList' element={<ProtectedRoute>
					<SideBar><ServiceRegisterList/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/serviceBookDetails" element={<App />}><Route path='/serviceBookDetails/bulkIncrementCreation' element={<ProtectedRoute>
					<SideBar><BulkIncrementCreation/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/newUserPerforma" element={<App />}><Route path='/newUserPerforma/sendRegistrationLink' element={<ProtectedRoute>
					<SideBar><SendRegistrationLink/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/newUserPerforma" element={<App />}><Route path='/newUserPerforma/newEmployeeList' element={<ProtectedRoute>
					<SideBar><RegistrationTabPanel/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/newUserPerforma" element={<App />}><Route path='/newUserPerforma/allRegisteredEmployees' element={<ProtectedRoute>
					<SideBar><AllRegisteredEmployee/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/newUserPerforma/userApprovalForm/:id" element={<App />}><Route path='' element={<ProtectedRoute>
					<SideBar><UserApprovalForm /> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/newUserPerforma/createUserRegisterForm" element={<App />}><Route path='' element={<ProtectedRoute>
							<SideBar><CreateUserRegisterForm /> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/tourApplication" element={<App />}><Route path='/tourApplication/tourApplicationReports' element={<ProtectedRoute>
					<SideBar><TourApplicationReport/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/tourApplication" element={<App />}><Route path='/tourApplication/tourClaimReports' element={<ProtectedRoute>
					<SideBar><TourClaimReport/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/tourApplication" element={<App />}><Route path='/tourApplication/claimRateSetup' element={<ProtectedRoute>
					<SideBar><TourClaimSetup/> </SideBar> </ProtectedRoute> } />	</Route>
				<Route path="/tourApplication" element={<App />}><Route path='/tourApplication/tourAccountMapping' element={<ProtectedRoute>
					<SideBar><TourAccountMapping/> </SideBar> </ProtectedRoute> } />	</Route>			
					
			{/* End Establishment */}
			
			{/* Start Accounts Module*/}

			{/* Start Accounts Module*/}

			{/* Start Accounts Admin Module*/}

			<Route path="/accountsProfile" element={<App />}><Route path='' element={<ProtectedRoute>
				<AccountsSideBar> <AccountsProfile/> </AccountsSideBar> </ProtectedRoute>} />	</Route>

			<Route path="/costCenterAdd" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar><CostCenterAdd/></AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/addPage" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <AddPage/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountMaster/organization" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <Organization/> </AccountsSideBar> </ProtectedRoute>} />	</Route>				
			<Route path="/financialAccounting/accountMaster/chartsofAccounts" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ChartsofAccounts/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountMaster/openingBalances" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <OpeningBalances/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountMaster/costCenters" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <CostCenters/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountMaster/costcenterMapping" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <CostCenterMapping/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountMaster/bookType" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <BookType/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountMaster/accountsBudget" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <AccountsBudget/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountMaster/allocatedBudgetReport" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <AllocatedBudgetReport/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountsTransactions/bankReconciliation" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <BankReconciliation/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountsTransactions/autoBrs" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <AutoBrs/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/accountsTransactions/yearEndProcess" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <YearEndProcess/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/voucherListing/contraVoucher" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ContraVoucher/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/voucherListing/contraVoucher/:id" element={<App />}><Route path='' element={<ProtectedRoute><AccountsSideBar> <ContraVoucher/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/voucherListing/journalVoucher" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsSideBar> <JournalVoucher/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/voucherListing/journalVoucher/:id" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <JournalVoucher/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/voucherListing/paymentVoucher" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <PaymentVoucher/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/voucherListing/paymentVoucher/:id" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <PaymentVoucher/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/voucherListing/receiptVoucher" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ReceiptVoucher/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/voucherListing/receiptVoucher/:id" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ReceiptVoucher/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/bankBook" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <BankBook/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/bankReconciliationStatements" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <BankReconciliationStatements/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/billDateWiseLedgerReport" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <BillDateWiseLedgerReport/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/cashBook" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <CashBook/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/chequeRegister" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ChequeRegister/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/codeList" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <CodeList/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/consolidatedLedgerReport" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ConsolidatedLedgerReport/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/costcenterReports" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <CostCenterReports/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/costCenterWiseAccountHeadWiseReport" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <CostCenterWiseAccountHeadWiseReport/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/costCenterWiseLedgerReport" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <CostCenterWiseLedgerReport/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/dayBook" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <DayBook/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/employeeVendorLedgerReport" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <EmployeeVendorLedgerReport/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/employeeVendorTrialBalanceReport" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <EmployeeVendorTrialBalanceReport/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/generalLedger" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <GeneralLedger/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialReports/gstComputation" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <GstComputation/> </AccountsSideBar> </ProtectedRoute>} />	</Route>				
			<Route path="/financialAccounting/financialReports/ledgerBulkPrinting" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <LedgerBulkPrinting/> </AccountsSideBar> </ProtectedRoute>} />	</Route>	
			<Route path="/financialAccounting/financialReports/netPosition" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <NetPosition/> </AccountsSideBar> </ProtectedRoute>} />	</Route>	
			<Route path="/financialAccounting/financialReports/tdsReturn" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <TdsReturn/> </AccountsSideBar> </ProtectedRoute>} />	</Route>	
			<Route path="/financialAccounting/financialReports/utilizationReport" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <UtilizationReport/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialStatements/balanceSheet" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <BalanceSheet/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialStatements/balanceSheetWithSchedule" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <BalanceSheetWithSchedule/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialStatements/chequesDepositedButUncleared" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ChequesDepositedButUncleared/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialStatements/chequesIssuedButNotPresentedforPayment" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ChequesIssuedButNotPresentedforPayment/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialStatements/incomeExpenditureAccount" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <IncomeExpenditureAccount/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialStatements/receiptsPaymentsAccounts" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ReceiptsPaymentsAccounts/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialStatements/trialBalanceWithGroup" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <TrialBalanceWithGroup/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/financialAccounting/financialStatements/trialBalanceWithoutGroup" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <TrialBalanceWithoutGroup/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/importantLinks" element={<App />}><Route path='' element={<ProtectedRoute>	<AccountsSideBar> <ImportantLinks/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/costCenterBudgets" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsSideBar>	 <CostCenterBudgets/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/accountsVendors" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsSideBar>	 <AccountsVendors/> </AccountsSideBar> </ProtectedRoute>} />	</Route>
			{/* End Accounts Admin Module*/}

			{/* Start Accounts Approver Module*/}
			<Route path="/accountApproverDashboard" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar><AccountApproverDashboard /> </AccountsApproverSideBar> </ProtectedRoute>} /></Route>
			<Route path="/myVoucherInbox" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar><MyVoucherTabPanel /> </AccountsApproverSideBar> </ProtectedRoute>} /></Route>
			<Route path="/myVoucher" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar>
			<MyVoucher/> </AccountsApproverSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/accountsVouchers" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar> <AccountsVouchers/> </AccountsApproverSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/bulkPayments" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar> <BulkPayments/> </AccountsApproverSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/rtgsPaymentReport" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar> <RtgsPaymentReport/> </AccountsApproverSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/createVoucherSteps" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar> <CreateVoucherStepper /> </AccountsApproverSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/createVoucherSteps/:voucherid/:username" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar> <CreateVoucherStepper /> </AccountsApproverSideBar> </ProtectedRoute>} /></Route>
			<Route path="/myVoucherInbox" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar> <MyVoucherTabPanel /> </AccountsApproverSideBar> </ProtectedRoute>} />	</Route>
			<Route path="/showVoucherApprovalForm/:id" element={<App />}><Route path='' element={<ProtectedRoute> <AccountsApproverSideBar> <ShowVoucherApprovalForms /> </AccountsApproverSideBar> </ProtectedRoute>} />	</Route>
			


			{/* End Accounts Approver Module*/}
			

			{/* Start Accounts Module*/}
			
			{/* Start Leave Module */}
			<Route path="/leaveDashboard" element={<App />}><Route path='/leaveDashboard' element={<ProtectedRoute>
				<LeaveSidebar> <LeaveDashboard/> </LeaveSidebar></ProtectedRoute> } />	</Route>					
			<Route path="/leaveMaster/leaveType/LeaveType" element={<App />}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <LeaveType /> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/addLeaveTypes" element={<App />}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <AddLeaveTypes/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leavemaster" element={<App />}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <ShowLeaveMaster/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leavemaster/AddLeaveMaster" element={<App />}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar><AddLeaveMaster/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/holidayCalender" element={<App />}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <HolidayCalender/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="leaveMaster/holidayCalender/newholiday" element={<App />}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <NewHoliday/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leavePolicy" element={<App />}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <ShowLeavePolicy/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leavePolicy/AddLeavePolicy" element={<App />}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <AddLeavePolicy/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leaveTransaction/LeaveApproval" element={<App/>}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <LeaveApproval/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leaveTransaction/LeaveAllocation" element={<App/>}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <LeaveAllocation/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leaveTransaction/LeaveAdjustment" element={<App/>}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <LeaveAdjustment/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leaveTransaction/ProcessedUnProcessed" element={<App/>}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <ProcessedUnProcessed/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leaveReports/LeaveStatus" element={<App/>}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <LeaveStatus/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leaveReports/LeaveChart" element={<App/>}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <LeaveChart/> </LeaveSidebar></ProtectedRoute> } /></Route>
			<Route path="/leaveMaster/leaveReports/EmployeeleaveChart" element={<App/>}><Route path='' element={<ProtectedRoute>
					<LeaveSidebar> <EmployeeleaveChart/> </LeaveSidebar></ProtectedRoute> } /></Route>
			{/* End Leave Module */}
		 
		{/* Start Setup Module */}
			<Route path="/setupDashboard" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <SetupDashboard /> </SetUpSidebar> </ProtectedRoute> } /></Route>	
			<Route path="/setup/workFlow" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <WorkFlow /> </SetUpSidebar> </ProtectedRoute> } /></Route>
			<Route path="/setup/workFlowType" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <WorkFlowType /> </SetUpSidebar> </ProtectedRoute> } /></Route>
			<Route path="/setup/workFlowPrivilege" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <WorkFlowPrivilege /> </SetUpSidebar> </ProtectedRoute> } /></Route>
			<Route path="/setup/company" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <InstitutionCompanySetup /> </SetUpSidebar> </ProtectedRoute> } /></Route>
			<Route path="/setup/masterCodes" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <MasterCodes /> </SetUpSidebar> </ProtectedRoute> } /></Route>
			<Route path="/setup/banks" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <Banks /> </SetUpSidebar> </ProtectedRoute> } /></Route>
			<Route path="/setup/geographicalLocations" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <GeographicalLocations /> </SetUpSidebar> </ProtectedRoute> } /></Route>
			<Route path="/setup/bankBranches" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <BankBranches /> </SetUpSidebar> </ProtectedRoute> } /></Route>
			<Route path="/setup/govtOrder" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <GovtOrder /> </SetUpSidebar> </ProtectedRoute> } /></Route>
			<Route path="/setup/configurationMaster" element={<App/>}><Route path='' element={<ProtectedRoute><SetUpSidebar> <ConfigurationMaster /> </SetUpSidebar> </ProtectedRoute> } /></Route>

		{/* End Setup module */}
		{/* Start AdminSetup module */}
			<Route path="/adminSetupDashboard" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <AdminSetupDashboard /> </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>	
			<Route path="/users" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <UserSetup />  </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>	
			<Route path="/userGroups" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <UserGroups />  </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>	
			<Route path="/usersRoles" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <RoleModule />  </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>	
			<Route path="/modules" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <UserModules />  </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>	
			<Route path="/resources" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <UserResources />   </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>	
			<Route path="/uploadResources" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <UploadResources />  </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>	
			<Route path="/userRoleSetting" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <DashboardSetting />  </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>				
			<Route path="/adminSetup/addRoles/:id" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <AddRoles />  </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>				
			<Route path="/adminSetup/addUsers/" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <AddUsers />  </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>				
			<Route path="/adminSetup/addUsers/:id" element={<App/>}><Route path='' element={<ProtectedRoute><AdminSetupSidebar1> <AddUsers />  </AdminSetupSidebar1>  </ProtectedRoute> } /></Route>				
			<Route path="/passwordResetPage/:id" element={<App/>}><Route path='' element={<ProtectedRoute> <PasswordResetPage />   </ProtectedRoute> } /></Route>				
		
		{/* End AdminSetup module */}
			<Route path="/*" element={<App />}><Route path='' element={<ProtectedRoute>
					<PageNotFound />	</ProtectedRoute> } />	</Route>
				

			</Routes>
		</BrowserRouter>
		
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

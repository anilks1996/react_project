import { combineReducers } from "@reduxjs/toolkit";
import departmentSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/departmentSlice";
import institutionSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/institutionSlice";
import employeeTypeSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/employeeTypeSlice";
import staffTypeSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/staffTypeSlice";
import designationSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/designationSlice";
import loginUserSlice from "../auth/auth_slice/loginUserSlice";
import qualificationSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/qualificationSlice";
import documentSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/documentSlice";
import subEmployeeTypeSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/subEmployeeTypeSlice";
import pastOrgDepartmentSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/pastOrgDepartmentSlice";
import countryStateCityLocationSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/countryStateCityLocationSlice";
import employeeSetupSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/employeeSetupSlice";
import jobLocationSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/jobLocationSlice";
import organizationTypeSlice from "../portal/account_module/accounts_redux/slices/accounts_slice/organizationTypeSlice";
import accountsChartSlice from "../portal/account_module/accounts_redux/slices/accounts_slice/accountsChartSlice";
import leaveTypeSlice from "../portal/leave_module/leave_redux/slices/leave_slice/leaveTypeSlice";
import leaveMasterSlice from "../portal/leave_module/leave_redux/slices/leave_slice/leaveMasterSlice";
import holidayCalenderSlice from "../portal/leave_module/leave_redux/slices/leave_slice/holidayCalenderSlice";
import leavePolicySlice from "../portal/leave_module/leave_redux/slices/leave_slice/leavePolicySlice";
import leaveAllocationSlice from "../portal/leave_module/leave_redux/slices/leave_slice/leaveAllocationSlice";
import userRegisterSlice from "../portal/establishment_module/establishment_redux/slices/user_performa/UserRegisterSlice";
import serviceRegisterSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/serviceRegisterSlice";
import inboxEmployeeSlice from "../portal/employeeusr_module/inboxEmployeeSlice";
import workFlowAlertSlice from "../portal/setup_module/setup_redux/workflow_slices/workFlowAlertSlice";
import codeMasterSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/codeMasterSlice";
import banksSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/banksSlice";
import bankBranchesSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/bankBranchesSlice";
import configurationMasterSlice from "../portal/establishment_module/establishment_redux/slices/establishment_slice/configurationMasterSlice";
import accCompanyFinancialSlice from "../portal/account_module/accounts_redux/slices/accounts_slice/accCompanyFinancialSlice";
import costCenterSlice from "../portal/account_module/accounts_redux/slices/accounts_slice/costCenterSlice";
import vendorSlice from "../portal/account_module/accounts_redux/slices/accounts_slice/vendorSlice";
import voucherEntrySlice from "../portal/account_module/accounts_redux/slices/accounts_approver_slice/voucherEntrySlice";
import voucherTransactionSlice from "../portal/account_module/accounts_redux/slices/accounts_admin_slice/voucherTransactionSlice";
import userGroupSlice from "../portal/admin_setup_module/admin_setup_redux/userGroupSlice";
import userResourceSlice from "../portal/admin_setup_module/admin_setup_redux/userResourceSlice";
import userRoleSlice from "../portal/admin_setup_module/admin_setup_redux/userRoleSlice";
import roleSlice from "../portal/admin_setup_module/admin_setup_redux/roleSlice";
import roleModuleSlice from "../portal/admin_setup_module/admin_setup_redux/roleModuleSlice";
import modulesSlice from "../portal/admin_setup_module/admin_setup_redux/modulesSlice";
import roleDashboardsSlice from "../portal/admin_setup_module/admin_setup_redux/roleDashboardsSlice";
import dashboardWidgetsSlice from "../portal/admin_setup_module/admin_setup_redux/dashboardWidgetsSlice";
import documentVerificationSlice from "../portal/establishment_module/establishment_transaction/document_slice/documentVerificationSlice";
import tourSlices from "../portal/establishment_module/tour_application/tour_redux/tourSlices";


export default combineReducers({
//Establishment HR module
    user_token:loginUserSlice,
    dept:departmentSlice,
    org:institutionSlice,
    empt:employeeTypeSlice,
    stafft:staffTypeSlice,
    desgn:designationSlice,
    qualType:qualificationSlice,
    empDoc:documentSlice,
    subEmpT:subEmployeeTypeSlice,
    pastOrgDept:pastOrgDepartmentSlice,
    cscLocation:countryStateCityLocationSlice,
    employeeData:employeeSetupSlice,
    jobLoc:jobLocationSlice,
    srRegister:serviceRegisterSlice,
    workflow:workFlowAlertSlice,
    codeMaster:codeMasterSlice,
    bank:banksSlice,
    bankBranch:bankBranchesSlice,
    configMaster:configurationMasterSlice,
    tours:tourSlices,
//Admin Setup
    userGroup:userGroupSlice,
    roleModule:roleModuleSlice,
    userResource:userResourceSlice,
    userRole:userRoleSlice,
    roles:roleSlice,
    modules:modulesSlice,
    roleDashboard:roleDashboardsSlice,
    dashboardWidget:dashboardWidgetsSlice,
    documentVerification:documentVerificationSlice,
//Accounts module
    orgType:organizationTypeSlice,
    accChart:accountsChartSlice,
    acfy:accCompanyFinancialSlice,
    costCenter:costCenterSlice,
    vendor:vendorSlice,
    voucherEntry:voucherEntrySlice,
    vTrxn:voucherTransactionSlice,

//Leave module    
    lvType:leaveTypeSlice,
    lvMaster:leaveMasterSlice,
    holidayMaster:holidayCalenderSlice,
    leavePolicy:leavePolicySlice,
    lvAllocation:leaveAllocationSlice,
    userRegister:userRegisterSlice,
    inboxEmployee:inboxEmployeeSlice,
})
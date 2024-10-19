import { DeleteOutline } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  Table,
} from "reactstrap";
import {
  deleteVoucherEntryType,
  showVoucherEntryType,
  showVouchers,
} from "../../accounts_redux/slices/accounts_slice/voucherEntryPageSlice";
import { FaRegFilePdf } from "react-icons/fa";
const AccountsVouchers = () => {
  const navigate = useNavigate();
  const [updateOrg, setUpdateOrg] = useState();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { vouchers } = useSelector((state) => state.allstorereducer.vouType);
  const updateOrgzn = (empObj) => {
    // setModal(true);
    setUpdateOrg(empObj);
  };
  useEffect(() => {
    dispatch(showVouchers());
  }, []);
  const deleteOrg = (id) => {
    if (window.confirm("Are you sure? to delete record")) {
      dispatch(deleteVoucherEntryType(id));
      dispatch(showVoucherEntryType());
      setModal(false);
    }
  };

  const { voucherEntryTypes } = useSelector(
    (state) => state.allstorereducer.vouType
  );

  const { organizationTypes } = useSelector(
    (state) => state.allstorereducer.orgType
  );

  const handleChange = (e) => {
    setUpdateAccVoucher({
      ...updateAccVoucher,
      [e.target.name]: e.target.value,
    });
    console.log(updateAccVoucher);
  };
  const [updateAccVoucher, setUpdateAccVoucher] = useState();

  return (
    <div>
      <form>
        <Container>
          <Card
            className="p-3 mt-3"
            style={{
              width: "70rem",
              height: "4rem",
              background: "silver",
            }}
          >
            <div class="breadcrumb-line">
              <ul class="breadcrumb">
                <li>
                  <a href="campusmenu.action">Home</a>
                </li>
                <li>Accounts vouchers List</li>
              </ul>
            </div>
          </Card>
          <br />

          <Card
            className="p-3 mt-3 form-shadow"
            style={{
              width: "100%",
            }}
          >
            <div class="form-group">
              <div class="row" style={{ paddingTop: "10px", fontSize: "15px" }}>
                <div class="col-sm-1">
                  <label class="text-danger"> Organization </label>
                </div>
                <div class="col-sm-3">
                  <select
                    placeholder="select-name"
                    className="form-select"
                    name="institution.id"
                    id="institution.id"
                    value={
                      updateAccVoucher &&
                      updateAccVoucher.accCompany &&
                      updateAccVoucher.accCompany.id
                    }
                    onChange={(e) => handleChange(e)}
                  >
                    <option value={-1}>--- select ---</option>
                    {organizationTypes.map((orgname) => (
                      <option value={orgname.id}>
                        {orgname.code} - {orgname.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <label>Accounts Ledger </label>
                </div>
                <div class="col-sm-3">
                  <select
                    data-placeholder="Select Ledger..."
                    class="select-search"
                    name="accountChart.id"
                    id="accountChart.id"
                    ng-options="accountChart.text for accountChart in ledgerColl track by accountChart.value"
                    ng-model="accountChart.id"
                    ng-click=""
                    style={{ width: "70%", height: "2rem" }}
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <label>Prepared By</label>
                </div>
                <div class="col-sm-3" style={{ fontSize: "15px" }}>
                  <select
                    data-placeholder="Select Employee..."
                    class="select-search"
                    name="preparedEmployee.id"
                    id="preparedEmployee.id"
                    ng-options="employee.text for employee in empColl track by employee.value"
                    ng-model="employee.id"
                    ng-click=""
                    style={{ width: "70%", height: "2rem" }}
                  >
                    <option value=""></option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <label class="text-danger">Voucher From Date</label>
                </div>
                <div class="col-sm-3">
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    class="datepicker"
                    style={{
                      width: "70%",
                      height: "2rem",
                      placeholder: "dd/mm/yyyy",
                    }}
                  />
                </div>
                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <label class="text-danger">Voucher To Date</label>
                </div>
                <div class="col-sm-3">
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    class="datepicker"
                    style={{
                      width: "70%",
                      height: "2rem",
                      placeholder: "dd/mm/yyyy",
                    }}
                  />
                </div>
                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <label> Voucher Type</label>
                </div>
                <div class="col-sm-3">
                  <select
                    tabindex="-1"
                    id="voucherType"
                    name="voucherType"
                    style={{
                      width: "70%",
                      height: "2rem",
                      placeholder: "dd/mm/yyyy",
                    }}
                  >
                    <option value="" selected>
                      Payment/Receipt/Journal...
                    </option>
                    <option value="Receipt" title="Receipt">
                      Receipt
                    </option>
                    <option value="Payment" title="Payment">
                      Payment
                    </option>
                    <option value="Journal" title="Journal">
                      Journal
                    </option>
                    <option value="Contra" title="Contra">
                      Contra
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group" style={{ fontSize: "15px" }}>
              <div class="row">
                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <label>
                    Employee/
                    <br />
                    Party Type
                  </label>
                </div>
                <div class="col-sm-3" style={{ fontSize: "15px" }}>
                  <select
                    data-placeholder="Select Employee/Party..."
                    class="select"
                    name="empPartyType"
                    id="empPartyType"
                    ng-options="type.text for type in typeColls track by type.value"
                    ng-model="empPartyType"
                    ng-click="loadEmployeesParties(empPartyType)"
                    style={{
                      width: "70%",
                      height: "2rem",
                      placeholder: "dd/mm/yyyy",
                    }}
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <label>
                    Employee/
                    <br />
                    Party Name{" "}
                  </label>
                </div>
                <div class="col-sm-3" style={{ fontSize: "15px" }}>
                  <select
                    data-placeholder="Select Name..."
                    class="select-search"
                    name="employeeVendorId"
                    id="employeeVendorId"
                    ng-options="empParty.text for empParty in empPartyColls track by empParty.value"
                    ng-model="employeeVendorId"
                    style={{
                      width: "70%",
                      height: "2rem",
                      placeholder: "dd/mm/yyyy",
                    }}
                  >
                    <option value=""></option>
                  </select>
                </div>
                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <label> Voucher Type</label>
                </div>
                <div class="col-sm-3">
                  <select
                    tabindex="-1"
                    id="voucherType"
                    name="voucherType"
                    style={{
                      width: "70%",
                      height: "2rem",
                      placeholder: "dd/mm/yyyy",
                    }}
                  >
                    <option value="" selected>
                      Pending/Approve/Cancelled...
                    </option>
                    <option value="Pending" title="Pending">
                      Pending
                    </option>
                    <option value="Approve" title="Approve">
                      Approve
                    </option>
                    <option value="Cancelled" title="Cancelled">
                      Cancelled
                    </option>
                    <option value="Reject" title="Reject">
                      Reject
                    </option>
                  </select>
                </div>
                <div class="col-sm-1" style={{ fontSize: "15px" }}></div>
              </div>
            </div>
            <div class="form-group">
              <div class="row" style={{ fontSize: "15px" }}>
                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <label> RTGS Ref. No. </label>
                </div>
                <div class="col-sm-3" style={{ fontSize: "15px" }}>
                  <input type="text" name="refno" value="" />
                </div>
                <div class="col-sm-1" style={{ fontSize: "15px" }}>
                  <a
                    ng-click="listVouchers()"
                    class="btn btn-primary pull-center"
                  >
                    {" "}
                    Search{" "}
                  </a>
                </div>
                <div class="col-sm-3" style={{ fontSize: "15px" }}></div>
              </div>
            </div>
          </Card>

          <Card
            className="p-3 mt-3 form-shadow"
            style={{
              width: "100%",
            }}
          >
            <CardHeader align="right">
              <Button color="danger" style={{ marginRight: "20px" }}>
                RTGS/NEFT Payment Excel
              </Button>
              <Button color="danger" style={{ marginRight: "20px" }}>
                RTGS/NEFT Report(pdf)
              </Button>
              <Button color="danger" style={{ marginRight: "20px" }}>
                RTGS/NEFT Statement
              </Button>
              <Button color="primary" style={{ marginRight: "20px" }}>
                Excel
              </Button>
            </CardHeader>
            <Table bordered>
              <thead>
                <tr align="center" style={{ fontSize: "15px" }}>
                  <th scope="row">#</th>
                  <th scope="row">Particulars</th>
                  <th scope="row">Voucher Date</th>
                  <th scope="row">Prepared/Requested By</th>
                  <th scope="row">Current Location</th>
                  <th scope="row">Payment Status</th>
                  <th scope="row">Voucher Status</th>
                  <th scope="row">Amount(INR)</th>
                  <th scope="row">Download PDF</th>
                </tr>
              </thead>
              <tbody>
                {vouchers &&
                  vouchers.map((ele, index) => (
                    <tr key={ele.id}>
                      <td>{index + 1}</td>
                      <td align="center">{ele.accountChartname}</td>
                      <td align="left">{ele.voucherDate}</td>
                      <td align="center">{ele.reqEmployeeName}</td>
                      <td align="center">{ele.location}</td>
                      <td align="center">{ele.status}</td>
                      <td align="center">{ele.status}</td>
                      <td align="center">{ele.amount}</td>
                      <td align="center">
                        <Link
                          onClick={(e) => {
                            deleteOrg(ele.id);
                          }}
                        >
                          <FaRegFilePdf />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div>Total:</div>
            <br />

            <CardFooter>
              © 2023 GMDA All rights reserved. Version: 4...
            </CardFooter>
          </Card>
        </Container>
      </form>
    </div>
  );
};

export default AccountsVouchers;

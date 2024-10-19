import { ArrowBack, DeleteOutline } from "@mui/icons-material";
import React, { useState } from "react";
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Table,
  Container,
} from "reactstrap";
import { useEffect } from "react";
import {
  createVoucherTransactions,
  deleteVoucherEntryType,
  showVoucherEntryType,
  showVoucherTrnsEntryTypeById,
} from "../../accounts_redux/slices/accounts_slice/voucherEntryPageSlice";
import { RiAddBoxFill } from "react-icons/ri";

const VoucherEntryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { voucherObj, voucherEntryTypes, voucherTransactions } = useSelector(
    (state) => state.allstorereducer.vouType
  );
  const toggle = () => {
    setModal(!modal);
    setUpdateOrg(null);
  };
  const dispatch = useDispatch();
  useNavigate();

  const [updateOrg, setUpdateOrg] = useState();

  const { countries, states, cities, locationInCities } = useSelector(
    (state) => state.allstorereducer.cscLocation
  );
  const goback = () => {
    window.history.back();
  };
  const handleChange = (e) => {
    setUpdateOrg({ ...updateOrg, [e.target.name]: e.target.value });
    console.log(updateOrg);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("fill all data " + updateOrg);
    //dispatch(createVoucherEntryType(updateOrg));
    setModal(false);
    dispatch(createVoucherTransactions(updateOrg));
    dispatch(showVoucherTrnsEntryTypeById());
    setUpdateOrg(null);
    navigate("/paymentInstruments");
  };

  useEffect(() => {
    alert("Id=" + id + ",  voucherObj=" + voucherObj.id);
    setUpdateOrg({
      ...updateOrg,
      ["voucher.id"]: voucherObj.id,
    });
    window.scrollTo({ top: "0", left: "0", behavior: "smooth" });
    dispatch(showVoucherEntryType());
    console.log("Id updated " + updateOrg);
    console.log(updateOrg);
    dispatch(showVoucherTrnsEntryTypeById());
  }, []);

  const updateOrgzn = (empObj) => {
    // setModal(true);
    setUpdateOrg(empObj);
  };

  const updateOrganization = (empObj) => {
    dispatch(deleteVoucherEntryType(id));
    setModal(false);
    dispatch(showVoucherTrnsEntryTypeById());
  };

  const deleteOrg = (id) => {
    if (window.confirm("Are you sure? to delete record")) {
      dispatch(deleteVoucherEntryType(id));
      //dispatch(showVoucherEntryType());
      dispatch(showVoucherTrnsEntryTypeById());
      setModal(false);
    }
  };

  const saveVoucherTransaction = () => {
    alert("voucher data " + updateOrg);
    console.log(updateOrg);
    dispatch(createVoucherTransactions(updateOrg));
    alert("created");
    dispatch(showVoucherTrnsEntryTypeById());
    dispatch(showVoucherEntryType());
  };

  return (
    <div>
      <form>
        <CardHeader className="p-3 mt-3">
          <center>
            <Button
              color="primary"
              style={{ marginRight: "20px", width: "90px" }}
              onClick={() => navigate("/ShowVoucherDate")}
            >
              Initiate
            </Button>

            <Button
              color="success"
              style={{ marginRight: "20px", width: "110px" }}
              onClick={() => navigate("/VoucherEntryPage")}
            >
              Transactions
            </Button>
          </center>
        </CardHeader>

        <Card>
          <CardHeader style={{ color: "red" }}>
            As you select options and fill values, form will automatically guide
            you for next steps.
          </CardHeader>
          <CardHeader>
            <Button color="secondary">Quick Create Ledger</Button>{" "}
            <Button color="primary">Add Taxes</Button>{" "}
          </CardHeader>

          <Container>
            <Table>
              <div className="VoucherEntryInput">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                    marginBottom: "10px",
                    width: "100%",
                  }}
                >
                  <div class="row">
                    <div class="col-md-2">
                      <input
                        type="text"
                        class="form-control clBox"
                        autocomplete="off"
                        placeholder="Dr/Cr"
                        id="type"
                        name="type"
                        uib-typeahead="type as type for type in typeColl | filter:$viewValue | limitTo:10"
                        onChange={handleChange}
                        value={updateOrg && updateOrg.type}
                      />
                    </div>

                    <div class="col-md-3">
                      <input
                        type="text"
                        class="form-control clBox"
                        autocomplete="off"
                        placeholder="Dept./project"
                        name="costCentername"
                        id="costCenter.id"
                        uib-typeahead="cost as cost.text for cost in costCenterColl | filter:$viewValue | limitTo:10"
                        onChange={handleChange}
                        value={updateOrg && updateOrg.grantProj}
                      />
                    </div>
                    <div class="col-md-4">
                      <input
                        type="text"
                        class="form-control clBox"
                        autocomplete="off"
                        placeholder="account head"
                        id="accountChart.id"
                        name="accountChartname"
                        uib-typeahead="chart as chart.text for chart in ledgerColl | filter:$viewValue | limitTo:10"
                        onChange={handleChange}
                        value={updateOrg && updateOrg.anualHead}
                      />
                    </div>

                    <div
                      class="col-md-3"
                      ng-show="prData.advanceFor.length && prData.advanceFor!='Other'"
                    >
                      <input
                        type="text"
                        class="form-control clBox"
                        autocomplete="off"
                        placeholder="Employee/Party"
                        id="employeeParty.id"
                        name="employeeParty.name"
                        uib-typeahead="payRecv as payRecv.text for payRecv in payRecvColl | filter:$viewValue | limitTo:10"
                        onChange={handleChange}
                        value={updateOrg && updateOrg.employeeParty}
                      />
                    </div>
                  </div>
                  <div class="col-md-2">
                    <textarea
                      class="form-control clBox"
                      rows="5"
                      cols="8"
                      id="trNarration"
                      name="narration"
                      placeholder="Narr./Inv. No./other..."
                      style={{ width: "100%", height: "100%" }}
                      onChange={handleChange}
                      value={updateOrg && updateOrg.narration}
                    ></textarea>
                  </div>
                  <div class="col-md-1">
                    <input
                      type="number"
                      placeholder="INR"
                      min="0"
                      class="form-control clBox"
                      id="trAmount"
                      name="amount"
                      onChange={handleChange}
                      value={updateOrg && updateOrg.amount}
                    />
                  </div>
                  <div class="col-md-1">
                    <a ng-click="addTransaction();" id="addItemsBtn">
                      {updateOrg && updateOrg.id !== undefined ? (
                        <Button
                          color="success"
                          onClick={(e) => {
                            updateOrganization(updateOrg);
                          }}
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          style={{ width: "25px", height: "25px" }}
                          onClick={saveVoucherTransaction}
                        >
                          <RiAddBoxFill />
                        </Button>
                      )}{" "}
                    </a>
                  </div>
                </div>
              </div>
            </Table>
          </Container>
        </Card>

        <Card
          className="p-3 mt-3 form-shadow"
          style={{
            width: "100%",
          }}
        >
          <CardHeader>
            <td align="right">Transaction :</td>
          </CardHeader>
          <Table bordered>
            <thead>
              <tr align="center">
                <th scope="row">Dr/Cr</th>
                <th scope="row">Particulars</th>
                <th scope="row">Amount (Dr/Cr)</th>
                <th scope="row">Actions</th>
              </tr>
            </thead>
            <tbody>
              {voucherEntryTypes &&
                voucherEntryTypes.map((ele) => (
                  <tr key={ele.id}>
                    <td align="center">{ele.type}</td>
                    <td align="left">{ele.accountChartname}</td>
                    <td align="center">{ele.amount}</td>

                    <td align="center">
                      <Link
                        onClick={(e) => {
                          updateOrgzn(ele);
                        }}
                      >
                        <FaPencilAlt color="green" />
                      </Link>
                      <Link
                        onClick={(e) => {
                          deleteOrg(ele.id);
                        }}
                      >
                        <DeleteOutline style={{ color: "red" }} />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <br />
          <tbody>
            <div class="row" align="left">
              <label class="col-lg-3 control-label">
                <span class="required" style={{ color: "red" }}>
                  *
                </span>
                &nbsp;Bill No/Ref No
              </label>
              <div class="col-lg-3" align="left" style={{ width: "55%" }}>
                <input
                  type="text"
                  name="billNo"
                  id="billNo"
                  placeholder="Bill no/Ref no..."
                  onChange={handleChange}
                  value={updateOrg && updateOrg.billNo}
                />
              </div>
            </div>

            <div class="row" align="left">
              <label class="col-lg-3 control-label">
                <span class="required" style={{ color: "red" }}>
                  *
                </span>
                Eoffice Note No.
              </label>
              <div class="col-lg-3" align="left" style={{ width: "55%" }}>
                <input
                  type="text"
                  name="eofficeNote"
                  id="eofficeNote"
                  placeholder="Eoffice Note No."
                  onChange={handleChange}
                  value={updateOrg && updateOrg.eofficeNote}
                />
              </div>
            </div>

            <div class="row" align="left">
              <label class="col-lg-3 control-label">
                <span class="required" style={{ color: "red" }}>
                  *
                </span>
                Eoffice File No.
              </label>
              <div class="col-lg-3" align="left" style={{ width: "55%" }}>
                <input
                  type="text"
                  name="fileNo"
                  id="fileNo"
                  placeholder="Eoffice File No."
                  onChange={handleChange}
                  value={updateOrg && updateOrg.fileNo}
                />
              </div>
            </div>
            <div class="row" align="left">
              <label class="col-lg-3 control-label">
                <span class="required" style={{ color: "red" }}>
                  *
                </span>
                Narration
              </label>
              <div class="col-lg-3" align="left" style={{ width: "55%" }}>
                <input
                  type="text"
                  id="narration"
                  name="narration"
                  placeholder="Description about the voucher..."
                  style={{ width: "50%", height: "80%" }}
                  onChange={handleChange}
                  value={updateOrg && updateOrg.narration}
                />
              </div>
            </div>

            <br />
            <center>
              <div>
                <Button
                  color="danger"
                  style={{ marginRight: "20px", width: "90px" }}
                >
                  Close
                </Button>

                <Button
                  style={{
                    background: "black",
                    width: "90px",
                  }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Next
                </Button>
              </div>
            </center>
          </tbody>

          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default VoucherEntryPage;

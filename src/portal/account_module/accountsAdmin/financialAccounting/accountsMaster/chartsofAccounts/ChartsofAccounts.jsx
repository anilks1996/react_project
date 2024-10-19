import React, { useEffect, useState } from "react";
import {Card,CardBody,Button, CardHeader,CardFooter,Modal,ModalHeader, ModalBody,ModalFooter} from "reactstrap";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import {createAccountChart,showAccountChart} from "../../../../accounts_redux/slices/accounts_slice/accountsChartSlice";
import CustomizedTreeView from "./tree/CustomizedTreeView";
import {showAccCompanyFinancialYears,showOrganizationType} from "../../../../accounts_redux/slices/accounts_slice/organizationTypeSlice";
import axios from "axios";
import { AccountBalanceOutlined } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ChartsofAccounts = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [accountsChartList, setAccountsChartList] = useState([]);
  const { accountsCharts, loading } = useSelector(
    (state) => state.allstorereducer.accChart
  );
  const { organizationTypes, accCompanyfinancialYears } = useSelector(
    (state) => state.allstorereducer.orgType
  );
  const toggle = () => {
    setModal(!modal);
  };

  const [popupModal, setPopupModal] = useState(false);
  const popupToggle = () => {
    setPopupModal(!popupModal);
  };

  const [updateAccChart, setUpdateAccChart] = useState();

  const goback = () => {
    window.history.back();
  };
  // const handleChange = (e) => {
  //   if (e.target.name == "chartCode") {
  //     setChartsCode(e.target.value);
  //     //alert("" + parentCategoryId);
  //     setUpdateAccChart({ ...updateAccChart, [e.target.name]: e.target.value });
  //     console.log(updateAccChart);
  //   } else {
  //     setUpdateAccChart({ ...updateAccChart, [e.target.name]: e.target.value });
  //     console.log(updateAccChart);
  //   }
  // };
  const handleChange = (e) => {
    if (e.target.name == "chartCode") {
      //alert("" + e.target.name);
      console.log("handleChange : ======== "+e.target.name+" ========");
      setUpdateAccChart({ ...updateAccChart, ["chartCode"]: e.target.value });
      console.log(updateAccChart);
      setChartsCode(e.target.value);
    } else {
      setUpdateAccChart({ ...updateAccChart, [e.target.name]: e.target.value });
      console.log(updateAccChart);
    }
  };
  const selectParentAccChart = (e) => {
    console.log("selectParentAccChart : ======== "+e.target.name+" ========parentCategoryId = "+parentCategoryId);
    setUpdateAccChart({...updateAccChart,["parent_chart_id"]: parentCategoryId});
    handleChange(e);
  };
  const [showTreeChart, setShowTreeChart] = useState();
  const handleTreeChart = (e) => {
    setShowTreeChart(e.target.value);
  };
  const selectedAccChart = (e) => {
    setShowTreeChart(showTreeChart);
    setPopupModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("fill all data");
    dispatch(createAccountChart(updateAccChart));
    setModal(false);
    setUpdateAccChart(null);
  };
  useEffect(() => {
    dispatch(showAccCompanyFinancialYears());
    dispatch(showAccountChart());
    dispatch(showOrganizationType());
    axios.get("http://localhost:3030/accountsChartList").then((response) => {
      const accChList = response.data;
      setAccountsChartList(accChList);
    });
    //alert(accountsChartList);
  }, []);

  const updateDept = (empObj) => {
    setModal(true);
    setUpdateAccChart(empObj);
    //navigatePage(`/establishmentSetup/editEmployeeType/${id}`);
  };
  const updateEmployeeType = (empObj) => {
    // dispatch(editEmployeeType(empObj));
    setModal(false);
    // dispatch(showEmployeeType());
  };
  const viewDept = (e, id) => {
    alert(id);
  };
  const deleteDept = (id) => {
    if (window.confirm("Are you sure? to delete record")) {
      // dispatch(deleteEmployeeType(id));
      // dispatch(showEmployeeType());
      setModal(false);
    }
  };
  const [parentCategoryId, setParentCategoryId] = useState();
  const pulldata = (data) => {
    //alert("ChartofAccounts id=" + data.id + ", Name=" + data.name);
    setShowTreeChart(data.name);
    setParentCategoryId(data.id);
    setUpdateAccChart({...updateAccChart,["parent_chart_id"]: parentCategoryId});
  };
  const [chartsCode, setChartsCode] = useState();
  const handleAccCode = (e, field) => {
    alert(e.target.name + ",  " + e.target.value);
    setChartsCode(e.target.value);
  };
  const [isAvailable, setIsAvailable] = useState(false);

  const checkDuplicateCode = (e, field) => {
    //alert(field + ", " + chartsCode);
    accountsChartList.map((acChart) => {
      if (acChart.chartCode.includes(chartsCode)) {
        setIsAvailable(false);
        //toast.error("Chart Code:" + e.target.value + " is not available!");
      } else {
        setIsAvailable(true);
      }
    });
    if (isAvailable) {
      toast.info("Chart Code:" + e.target.value + " is available!");
    } else {
      toast.error("Chart Code:" + e.target.value + " is not available!");
    }
  };

  const filterAccountChart = (e) => {
    window.location.reload();
  };

  return (
    <div>
      <form style={{ minWidth: "70rem" }}>
        <span>
          <Card
            className="p-3 mt-3"
            style={{ height: "3.5rem", background: "lightgrey" }}
          >
            home/ accounts master/ charts of accounts
          </Card>
        </span>
        <br />

        <Card className="form-shadow">
          <CardHeader>
            <CardBody>
              <Button
                onClick={() => navigate("/AccountsProfile")}
                color="danger"
              >
                Back
              </Button>{" "}
              {/* <Button onClick={()=>navigate("/ChartsofActpage")}color="dark">Add</Button>{' '} */}
              <Button onClick={toggle}>Add</Button>{" "}
              <Button color="secondary">Print</Button>{" "}
            </CardBody>
          </CardHeader>

          <table width="100%" border="0" cellspacing="10" cellpadding="0">
            <tbody>
              <tr>
                <td>
                  <table
                    class="forumline"
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="10"
                  >
                    <tbody>
                      <tr>
                        <th align="right" width="18%" nowrap>
                          <span class="required" color="red">
                            *
                          </span>
                          <label>Organization</label>
                        </th>
                        <td align="left" width="10%" nowrap>
                          GMDA
                        </td>
                        <th align="right" width="22%" nowrap>
                          <span class="required" color="red">
                            *
                          </span>
                          <label>Financial Year :</label>
                        </th>
                        <td align="left" width="18%" nowrap>
                          01/04/2023 - 31/03/2024
                          <input
                            type="hidden"
                            name="accountChart.accCompanyFinancialYear.id"
                            id="accountChart.accCompanyFinancialYear.id"
                            value="906002432"
                          ></input>
                        </td>
                        <td width="60%">
                          <Button
                            onClick={(e) => filterAccountChart(e)}
                            color="danger"
                          >
                            Filter
                          </Button>{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <AccountBalanceOutlined />
                    </thead>
                    <tbody>
                       <CustomizedTreeView idName={pulldata} /> 
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Add Account chart modal */}

          <Modal isOpen={modal} toggle={toggle} fullscreen="sm" size="xl">
            <ModalHeader toggle={toggle}>Charts of Accounts</ModalHeader>
            <ModalBody>
              <div>
                <form style={{ minWidth: "70rem" }}>
                  <span>
                    <Card style={{ height: "3.5rem", background: "lightgrey" }}>
                      home/ accounts master/ charts of account
                    </Card>
                    <Card style={{ height: "50rem" }}>
                      <CardHeader>
                        <Button color="secondary">Search</Button>{" "}
                        <Button color="primary" onClick={handleSubmit}>
                          Save
                        </Button>{" "}
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col sm={3}></Col>
                          <Col md={9}>
                            <tr>
                              <td>
                                <table
                                  class="tableline"
                                  width="80%"
                                  height="80%"
                                  border="-1"
                                  cellpadding="5"
                                  align="left"
                                >
                                  <table
                                    class="tableline"
                                    width="100%"
                                    cellpadding="5"
                                    height="80%"
                                    align="center"
                                  >
                                    <tr>
                                      <td valign="middle">
                                        <span class="required">*</span>{" "}
                                        <label>Organization :</label>
                                      </td>
                                      <td nowrap align="left">
                                        {/* <input
                                          type="hidden"
                                          name="accountChart.accCompany.id"
                                          id="accountChart.accCompany.id"
                                        /> */}
                                        <select
                                          placeholder="select-name"
                                          className="form-select"
                                          name="accCompany.id"
                                          id="accCompany.id"
                                          value={
                                            updateAccChart &&
                                            updateAccChart.accCompany &&
                                            updateAccChart.accCompany.id
                                          }
                                          onChange={(e) => handleChange(e)}
                                        >
                                          <option value={-1}>
                                            -- select --
                                          </option>
                                          {organizationTypes.map((empName) => (
                                            <option value={empName.id}>
                                              {empName.code} - {empName.name}
                                            </option>
                                          ))}
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="middle">
                                        <span class="required">*</span>{" "}
                                        <label>Financial Year :</label>
                                      </td>
                                      <td nowrap align="left">
                                        {/* <input
                                          type="hidden"
                                          name="accountChart.accCompanyFinancialYear.id"
                                          id="accountChart.accCompanyFinancialYear.id"
                                          value="906002432"
                                        /> */}

                                        <select
                                          placeholder="select-name"
                                          className="form-select"
                                          name="accCompanyFinancialYear.id"
                                          id="accCompanyFinancialYear.id"
                                          value={
                                            updateAccChart &&
                                            updateAccChart.accCompanyfinancialYear &&
                                            updateAccChart
                                              .accCompanyfinancialYear.id
                                          }
                                          onChange={(e) => handleChange(e)}
                                        >
                                          <option value={-1}>
                                            -- select --
                                          </option>
                                          {accCompanyfinancialYears.map(
                                            (empName) => (
                                              <option value={empName.id}>
                                                {empName.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </td>
                                    </tr>

                                    {/* <input
                                      type="hidden"
                                      name="parentCompId"
                                      id="parentCompId"
                                      value=""
                                      onChange={(e) => handleChange(e)}
                                    /> */}
                                    <tr>
                                      <td valign="middle">
                                        <span class="required">*</span>{" "}
                                        <label>Parent Account :</label>
                                      </td>
                                      <td>
                                        <label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            size={40}
                                            value={showTreeChart}
                                          />
                                          <Button
                                            name="grpBtn"
                                            className="ml-3"
                                            value="---"
                                            alt="--Select Account--"
                                            title="--Select Account--"
                                            onClick={popupToggle}
                                          >
                                            ---
                                          </Button>
                                        </label>
                                        <input
                                          type="hidden"
                                          size="2"
                                          name="parent_chart_id"
                                          id="parent_chart_id"
                                          value={parentCategoryId}
                                          onChange={(e) => handleChange(e)}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="middle">
                                        <span class="required">*</span>
                                        <label>Account Code :</label>
                                      </td>
                                      <td>
                                        <input
                                          id="chartCode"
                                          name="chartCode"
                                          type="text"
                                          class="form-control"
                                          onChange={(e) => {
                                            handleChange(e);
                                            selectParentAccChart(e);
                                          }}
                                        />
                                        <input
                                          type="button"
                                          name="accountChartCode"
                                          id="accountChartCode"
                                          onClick={(e) => {
                                            checkDuplicateCode(
                                              e,
                                              "accountChartCode"
                                            );
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="middle">
                                        <span class="required">*</span>
                                        <label>Transaction Ledger :</label>
                                      </td>
                                      <td>
                                        <input
                                          id="name"
                                          name="name"
                                          type="text"
                                          class="form-control"
                                          value={
                                            updateAccChart &&
                                            updateAccChart.name
                                          }
                                          onChange={(e) => handleChange(e)}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="right">
                                        <label>Is Schedule :</label>
                                      </td>

                                      <td>
                                        <table>
                                          <tr>
                                            <td>
                                              <input
                                                type="checkbox"
                                                id="isSchedule"
                                                name="isSchedule"
                                                value={
                                                  updateAccChart &&
                                                  updateAccChart.isSchedule
                                                }
                                                onChange={(e) =>
                                                  handleChange(e)
                                                }
                                              />
                                            </td>
                                            {/* <td valign="middle">
                                              <div
                                                id="scheduleNoDiv"
                                                style={{ visibility: "hidden" }}
                                              >
                                                Schedule No:{" "}
                                                <input
                                                  id="accountChart.isSchedule"
                                                  type="text"
                                                  name="accountChart.isSchedule"
                                                  value=""
                                                  size="10"
                                                  maxlength="10"
                                                  class="form-control"
                                                  onChange={(e) =>
                                                    handleChange(e)
                                                  }
                                                />
                                              </div>
                                            </td> */}
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="middle">
                                        <span class="required">*</span>
                                        <label>Account Type :</label>
                                      </td>
                                      <td>
                                        <label class="radio-inline radio-success">
                                          <input
                                            type="radio"
                                            id="accountType.cash"
                                            name="accountType"
                                            class="styled tip"
                                            value="Cash"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <span class="text-dark"></span>
                                        </label>
                                        <label>Cash&nbsp;</label>
                                        <label class="radio-inline radio-success">
                                          <input
                                            type="radio"
                                            id="accountType.bank"
                                            name="accountType"
                                            class="styled tip"
                                            value="Bank"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <span class="text-dark"></span>
                                        </label>
                                        <label>Bank&nbsp;</label>
                                        <label class="radio-inline radio-success">
                                          <input
                                            type="radio"
                                            id="accountType.general"
                                            name="accountType"
                                            class="styled tip"
                                            value="General"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <span class="text-dark"></span>
                                        </label>
                                        <label>General&nbsp;</label>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td colspan="6" align="center">
                                        <div id="childAssetDiv">
                                          <table border="0">
                                            <tr>
                                              <td valign="middle">
                                                <label>Account No. :</label>
                                              </td>
                                              <td>
                                                <input
                                                  id="bankAccNo"
                                                  name="bankAccNo"
                                                  type="text"
                                                  class="form-control"
                                                  value={
                                                    updateAccChart &&
                                                    updateAccChart.bankAccNo
                                                  }
                                                  onChange={(e) =>
                                                    handleChange(e)
                                                  }
                                                />
                                              </td>
                                              <td align="left">
                                                <label>Bank Branch :</label>
                                              </td>
                                              <td>
                                                <div class="controls">
                                                  <input
                                                    type="text"
                                                    class="form-control"
                                                    autocomplete="off"
                                                    maxLength="256"
                                                    name="bankBranch.id"
                                                    id="bankBranch.id"
                                                    value={
                                                      updateAccChart &&
                                                      updateAccChart.bank &&
                                                      updateAccChart.bank.id
                                                    }
                                                    onChange={(e) =>
                                                      handleChange(e)
                                                    }
                                                  />
                                                </div>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="middle">
                                        <label>Taxable / Advance Head :</label>
                                      </td>
                                      <td>
                                        <label class="radio-inline radio-success">
                                          <input
                                            type="radio"
                                            id="chartType.TDS"
                                            name="chartType"
                                            class="styled tip"
                                            value="TDS"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <span class="text-dark"></span>
                                        </label>
                                        <label>Tds Head&nbsp;</label>
                                        <label class="radio-inline radio-success">
                                          <input
                                            type="radio"
                                            id="chartType.ADVANCE"
                                            name="chartType"
                                            class="styled tip"
                                            value="ADVANCE"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <span class="text-dark"></span>
                                        </label>
                                        <label>Advance Head&nbsp;</label>

                                        <label class="radio-inline radio-success">
                                          <input
                                            type="radio"
                                            id="chartType.GENERAL"
                                            name="chartType"
                                            class="styled tip"
                                            value="GENERAL"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <span class="text-dark"></span>
                                        </label>
                                        <label>General&nbsp;</label>
                                        <label class="radio-inline radio-success">
                                          <input
                                            type="radio"
                                            id="chartType.IGST"
                                            name="chartType"
                                            class="styled tip"
                                            value="IGST"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <span class="text-dark"></span>
                                        </label>
                                        <label>IGST&nbsp;</label>
                                        <label class="radio-inline radio-success">
                                          <input
                                            type="radio"
                                            id="chartType.CGST"
                                            name="chartType"
                                            class="styled tip"
                                            value="CGST"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <span class="text-dark"></span>
                                        </label>
                                        <label>CGST&nbsp;</label>
                                        <label class="radio-inline radio-success">
                                          <input
                                            type="radio"
                                            id="chartType.SGST"
                                            name="chartType"
                                            class="styled tip"
                                            value="SGST"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <span class="text-dark"></span>
                                        </label>
                                        <label>SGST&nbsp;</label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colspan="2" align="center">
                                        <div id="gstPercDiv">
                                          <table border="0">
                                            <tr>
                                              <td align="left">
                                                <label>section:</label>
                                              </td>
                                              <td>
                                                <input
                                                  id="section"
                                                  name="section"
                                                  type="text"
                                                  class="form-control"
                                                  value={
                                                    updateAccChart &&
                                                    updateAccChart.section
                                                  }
                                                  onChange={(e) =>
                                                    handleChange(e)
                                                  }
                                                />
                                              </td>
                                              <td align="left">
                                                <label>section code :</label>
                                              </td>
                                              <td>
                                                <input
                                                  id="sectionCode"
                                                  name="sectionCode"
                                                  type="text"
                                                  class="form-control"
                                                  value={
                                                    updateAccChart &&
                                                    updateAccChart.sectionCode
                                                  }
                                                  onChange={(e) =>
                                                    handleChange(e)
                                                  }
                                                />
                                              </td>
                                              <td align="left">
                                                <label>
                                                  Accounts Tds Perc :
                                                </label>
                                              </td>
                                              <td>
                                                <input
                                                  id="tdsPercentage"
                                                  name="tdsPercentage"
                                                  type="text"
                                                  class="form-control"
                                                  value={
                                                    updateAccChart &&
                                                    updateAccChart.tdsPercentage
                                                  }
                                                  onChange={(e) =>
                                                    handleChange(e)
                                                  }
                                                />
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="middle">
                                        <label>Upload csv file :</label>
                                        <td align="left">
                                          <td>
                                            {" "}
                                            <input
                                              id="fileName1"
                                              type="file"
                                              name="fileName1"
                                              value=""
                                              size="25"
                                              class="styled form-control"
                                              onChange={(e) => handleChange(e)}
                                            />
                                          </td>
                                        </td>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="right" colspan="2">
                                        <table
                                          class="tableline"
                                          width="100%"
                                          border="0"
                                          cellspacing="0"
                                          cellpadding="10"
                                        >
                                          <tr>
                                            <td valign="middle">
                                              <label>
                                                REQUIRED COLUMNS IN CSV FILE :
                                                <font size="1px" color="red">
                                                  ACC_CODE, ACC_NAME,
                                                  PARENT_ACC_CODE,
                                                  ACC_HEAD_TYPE(Asset/Expense/Liability/Income),
                                                  IS_SCHEDULE (Yes/No),
                                                  TDS_OR_ADV_HEAD (TDS/ADVANCE),
                                                  ACC_TYPE (Cash/Bank/General)
                                                </font>
                                              </label>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td valign="middle">
                                              <label>
                                                <b>
                                                  To upload Account Chart from
                                                  *.csv file only
                                                  Company,Financial Year & CSV
                                                  file are mendatory..!{" "}
                                                </b>
                                              </label>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </table>
                              </td>
                            </tr>
                          </Col>
                          <Col sm={0}></Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </span>
                </form>
              </div>
            </ModalBody>
          </Modal>

          {/* End Account chart modal */}

          {/* Start popup acc chart*/}
          <Modal isOpen={popupModal} toggle={popupToggle} size="xl">
            <ModalHeader toggle={popupToggle} style={{ color: "blueviolet" }}>
              Chart of Accounts
            </ModalHeader>
            <ModalBody>
              <Table>
                <div>
                  <CustomizedTreeView idName={pulldata} />
                </div>
              </Table>
            </ModalBody>

            <ModalFooter>
              <table width="100%" border="0" cellspacing="1">
                <tr>
                  <td nowrap align="right">
                    <label>Book Type Name :</label>
                  </td>
                  <td>
                    <input
                      id="bookTypeName"
                      type="text"
                      name="bookTypeName"
                      value={showTreeChart}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                </tr>
                <input type="hidden" name="page.orderBy" value="id" />
                <input type="hidden" name="page.pageSize" value="10" />
              </table>
              {updateAccChart && updateAccChart.id !== undefined ? (
                <Button
                  color="success"
                  onClick={(e) => {
                    updateEmployeeType(updateAccChart);
                  }}
                >
                  Update
                </Button>
              ) : (
                <Button color="success" onClick={selectedAccChart}>
                  Done
                </Button>
              )}{" "}
              <Button color="secondary" onClick={popupToggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
          <ToastContainer></ToastContainer>
        </Card>
      </form>
    </div>
  );
};

export default ChartsofAccounts;

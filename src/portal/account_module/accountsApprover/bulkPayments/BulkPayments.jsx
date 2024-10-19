import React, { useEffect, useState } from "react";
import { Button, Card, CardFooter, CardHeader, Container } from "reactstrap";
import {
  showAccCompanyFinancialYears,
  showOrganizationType,
} from "../../accounts_redux/slices/accounts_slice/organizationTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BulkPayments = () => {
  const navigate = useNavigate();
  const [updateAccChart, setUpdateAccChart] = useState();

  const handleChange = (e) => {
    if (e.target.name == "chartCode") {
      //alert("" + e.target.name);
      console.log("handleChange : ======== " + e.target.name + " ========");
      setUpdateAccChart({ ...updateAccChart, ["chartCode"]: e.target.value });
      console.log(updateAccChart);
    } else {
      setUpdateAccChart({ ...updateAccChart, [e.target.name]: e.target.value });
      console.log(updateAccChart);
    }
  };

  const { organizationTypes, accCompanyfinancialYears } = useSelector(
    (state) => state.allstorereducer.orgType
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAccCompanyFinancialYears());
    dispatch(showOrganizationType());
    //alert(accountsCharts);
  }, []);

  return (
    <div>
      <form name="openingBalanceFrm" method="post" class="ng-pristine ng-valid">
        <span>
          <Card
            className="p-3 mt-3"
            style={{
              height: "3.5rem",
              width: "70rem",
              background: "lightgrey",
            }}
          >
            home/ accounts master/ bulk payment
          </Card>
        </span>
        <br />

        <Card className="form-shadow">
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">
              Back
            </Button>{" "}
          </CardHeader>

          <table width="100%" border="0" cellspacing="1" />
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <tr>
                  <table
                    class="forumline"
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="10"
                  >
                    <tr>
                      <td align="right" nowrap>
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Organization :</label>
                      </td>
                      <td nowrap align="left" width="50%">
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
                          <option value={-1}>-- select --</option>
                          {organizationTypes.map((empName) => (
                            <option value={empName.id}>
                              {empName.code} - {empName.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </table>
                </tr>
              </div>

              <div class="col">
                <tr>
                  <table
                    class="forumline"
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="10"
                  >
                    <tr>
                      <td align="right" nowrap>
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Financial Year :</label>
                      </td>
                      <td nowrap align="left" width="65%">
                        <select
                          placeholder="select-name"
                          className="form-select"
                          name="accCompanyFinancialYear.id"
                          id="accCompanyFinancialYear.id"
                          value={
                            updateAccChart &&
                            updateAccChart.accCompanyfinancialYear &&
                            updateAccChart.accCompanyfinancialYear.id
                          }
                          onChange={(e) => handleChange(e)}
                          style={{ width: "70%" }}
                        >
                          <option value={-1}>-- select --</option>
                          {accCompanyfinancialYears.map((empName) => (
                            <option value={empName.id}>{empName.name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </table>
                </tr>
              </div>

              <div class="col">
                <tr>
                  <table
                    class="forumline"
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="10"
                  >
                    <tr>
                      <td align="left" width="30%">
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Payment for :</label>
                      </td>
                      <td nowrap align="left">
                        <select
                          class="form-control"
                          tabindex="-1"
                          id="empPartyType"
                          name="empPartyType"
                        >
                          <option value="" selected>
                            -- select type--
                          </option>
                          <option value="Employee" title="Employee">
                            Employee
                          </option>
                          <option value="Party" title="Party">
                            Party
                          </option>
                          <option value="Salary" title="Salary">
                            Salary
                          </option>
                          <option value="Salary Arrear" title="Salary Arrear">
                            Salary Arrear
                          </option>
                          <option
                            value="Children Education Allowance"
                            title="Children Education Allowance"
                          >
                            Children Education Allowance
                          </option>
                          <option
                            value="Leave Encashment"
                            title="Leave Encashment"
                          >
                            Leave Encashment
                          </option>
                          <option
                            value="Other Allowance"
                            title="Other Allowance"
                          >
                            Other Allowance
                          </option>
                        </select>
                      </td>
                      <td align="center">
                        <a class="btn btn-dark" style={{ color: "white" }}>
                          Fetch
                        </a>
                      </td>
                    </tr>
                  </table>
                </tr>
              </div>
            </div>
          </div>
          <CardFooter>
            © 2024 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default BulkPayments;

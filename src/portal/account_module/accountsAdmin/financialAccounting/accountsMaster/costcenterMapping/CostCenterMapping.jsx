import React from "react";
import { Card, CardBody, Button, CardHeader, CardFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const CostCenterMapping = () => {
  const navigate = useNavigate();

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
            home/ accounts master/ cost center mapping
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
                      <td align="left" nowrap>
                        GMDA
                        <input
                          type="hidden"
                          name="company.id"
                          id="company.id"
                          value="373882880"
                        />
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
                      <td nowrap align="right">
                        01/04/2023-31/03/2024
                        <input
                          type="hidden"
                          name="companyFinancialYear.id"
                          id="companyFinancialYear.id"
                          value="906002432"
                        />
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
                      <td align="left" width="25%">
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Type :</label>
                      </td>
                      <td nowrap align="left">
                        <select
                          class="form-control"
                          tabindex="-1"
                          id="type"
                          name="type"
                        >
                          <option value="" selected>
                            --Select--
                          </option>
                          <option value="Department" title="Department">
                            Department
                          </option>
                          <option value="Project" title="Project">
                            Project
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

export default CostCenterMapping;

import React from "react";
import { Card, CardBody, Button, CardHeader, CardFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const AllocatedBudgetReport = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form>
        <span>
          <Card
            className="p-3 mt-3"
            style={{
              height: "3.5rem",
              width: "100%",
              background: "lightgrey",
            }}
          >
            Home / accounts master / allocated budget report
          </Card>
        </span>
        <br />
        <Card className="form-shadow">
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">
              Back
            </Button>{" "}
            <Button color="secondary">Monthly Budget Report</Button>{" "}
          </CardHeader>

          <table
            width="100%"
            border="0"
            cellspacing="10"
            cellpadding="0"
            paddingTop="0px"
          >
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
                    border="0"
                    cellspacing="0"
                    cellpadding="10"
                  >
                    <tr>
                      <td align="right" nowrap>
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Financial Year:</label>
                      </td>
                      <td nowrap align="left">
                        2023-2024
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
                      <td nowrap align="right" width="45%">
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Grant/Project :</label>
                      </td>
                      <td>
                        <input
                          type="hidden"
                          name="costCenter.id"
                          id="costCenter.id"
                          value=""
                        />
                        <input
                          type="text"
                          class="form-control"
                          autocomplete="off"
                          maxLength="256"
                          name="costCenter.id_chooser"
                          id="costCenter.id_chooser"
                          size="40"
                          title="Please enter the pattern to search"
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
                      <td align="right" nowrap width="48%">
                        <label>Ledger Type :</label>
                      </td>
                      <td width="54%" align="right">
                        <Form.Select aria-label="Default select example">
                          <option>--Select--</option>
                          <option value="1">Income</option>
                          <option value="2">Expense</option>
                        </Form.Select>
                      </td>
                      <td>
                        <a
                          class="btn btn-secondary"
                          href="javaScript:getLedgers();"
                          style={{ color: "white" }}
                        >
                          Filter
                        </a>
                      </td>
                    </tr>
                  </table>
                </tr>
              </div>
            </div>
          </table>

          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AllocatedBudgetReport;

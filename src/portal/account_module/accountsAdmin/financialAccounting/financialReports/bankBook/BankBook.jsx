import { Card, Button, CardHeader, CardFooter } from "reactstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const BankBook = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form>
        <span>
          <Card
            className="p-3 mt-3"
            style={{ height: "3rem", width: "100%", background: "lightgrey" }}
          >
            Home / financial reports / bank book
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
                      <td nowrap align="left" width="40%">
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Financial Year : </label>
                      </td>
                      <td nowrap align="left" width="10%">
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
              <span>
                <br></br>
              </span>

              <div class="row">
                <div class="col">
                  <tr>
                    <table
                      class="forumline"
                      border="0"
                      cellspacing="0"
                      cellpadding="10"
                    >
                      <tr>
                        <td nowrap align="left">
                          <span class="required" style={{ color: "red" }}>
                            *
                          </span>
                          <label>Date From : </label>
                        </td>
                        <td nowrap>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            size=""
                          />
                        </td>
                        <td nowrap align="left">
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
                      border="0"
                      cellspacing="0"
                      cellpadding="10"
                    >
                      <tr>
                        <td nowrap align="left">
                          <span class="required" style={{ color: "red" }}>
                            *
                          </span>
                          <label>Date To:</label>
                        </td>
                        <td nowrap>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            size=""
                          />
                        </td>
                        <td nowrap align="left">
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
                <span>
                  <br></br>
                </span>

                <div class="row">
                  <div class="col">
                    <tr>
                      <table
                        class="forumline"
                        border="0"
                        cellspacing="0"
                        cellpadding="10"
                      >
                        <tr>
                          <td nowrap align="left">
                            <span class="required" style={{ color: "red" }}>
                              *
                            </span>
                            <label>Bank Book:</label>
                          </td>
                          <td>
                            <input
                              type="hidden"
                              name="accountChart.id"
                              id="accountChart.id"
                              value=""
                            />
                            <input
                              type="text"
                              class="form-control"
                              autocomplete="off"
                              maxLength="256"
                              name="accountChart.id_chooser"
                              id="accountChart.id_chooser"
                              size="40"
                              value="--Select--"
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
                        border="0"
                        cellspacing="0"
                        cellpadding="10"
                      >
                        <tr>
                          <td nowrap align="left" width="50%">
                            <span class="required" style={{ color: "red" }}>
                              *
                            </span>
                            <label>Balancing Method : </label>
                          </td>
                          <td>
                            <Form.Select aria-label="Default select example">
                              <option>--Select--</option>
                              <option value="1">Daily</option>
                              <option value="2">Monthly</option>
                              <option value="3">Yearly</option>
                            </Form.Select>
                          </td>
                          <td nowrap align="left">
                            {" "}
                            <a
                              class="btn btn-primary"
                              href="javaScript:getVoucherTransactions();"
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
              </div>
            </div>
          </div>

          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default BankBook;

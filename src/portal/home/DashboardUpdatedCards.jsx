import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { CardBody, Button, CardHeader, CardFooter } from "reactstrap";
import Form from "react-bootstrap/Form";
import { HiArrowDown } from "react-icons/hi2";
import { HiMiniArrowLongRight } from "react-icons/hi2";

const myList = [
  "Information Technology",
  "Finance & Accounts",
  "Infra-I",
  "Mobility",
];
const listItems = myList.map((myList) => {
  return <li>{myList}</li>;
});

const DashboardUpdatedCards = () => {
  return (
    <div>
      <form>
        <div>
          <Row>
            <Col sm={4}>
              <Card
                className="form-shadow"
                style={{
                  width: "24rem",
                  height: "500px",
                  background:
                    "linear-gradient(80deg, #40F8FF 0%, #279EFF,#0adbb89d 100%)",

                  // borderRadius: "5px",
                }}
              >
                <CardHeader
                  className="headerDashboard"
                  style={{
                    color: "white",
                    fontSize: "25px",
                    background: "rgb(57, 67, 158)",
                  }}
                >
                  <b>Financial Report of GMDA</b>
                </CardHeader>
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
                        <td
                          align="left"
                          width="60%"
                          style={{ color: "white", fontSize: "30px" }}
                        >
                          <label>
                            <b>Balance Sheet</b>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td align="left">
                          <label>Select Financial Year :</label>
                        </td>
                        <td align="right" style={{ width: "80rem" }}>
                          <Form.Select aria-label="Default select example">
                            <option value="1" title="2021-22">
                              2021-22
                            </option>
                            <option value="2" title="2022-23">
                              2022-23
                            </option>
                            <option value="3" title="2023-24">
                              2023-24
                            </option>
                          </Form.Select>
                        </td>
                      </tr>
                      <tr>
                        <button>
                          <HiArrowDown />
                          Balance Sheet
                        </button>
                        <hr></hr>
                        <button>Between Period</button>
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
                        <td
                          align="left"
                          width="60%"
                          style={{ color: "white", fontSize: "30px" }}
                        >
                          <label>
                            <b>Income & Expenditure</b>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td align="left">
                          <label>Select Financial Year :</label>
                        </td>
                        <td align="right" style={{ width: "80rem" }}>
                          <Form.Select aria-label="Default select example">
                            <option value="1" title="2021-22">
                              2021-22
                            </option>
                            <option value="2" title="2022-23">
                              2022-23
                            </option>
                            <option value="3" title="2023-24">
                              2023-24
                            </option>
                          </Form.Select>
                        </td>
                      </tr>
                      <tr>
                        <button>
                          <HiArrowDown />
                          Income
                        </button>
                        <button>
                          <HiArrowDown />
                          Expenses
                        </button>
                        <hr></hr>
                        <button>Between Period</button>
                      </tr>
                    </table>
                  </tr>
                </div>

                <CardFooter style={{ color: "black", background: "silver" }}>
                  © 2023 GMDA All rights reserved. Version: 4...
                </CardFooter>
              </Card>
            </Col>

            {/* Card 2 */}

            <Col sm={4}>
              <Card
                className="form-shadow"
                style={{
                  width: "24rem",
                  height: "500px",
                  background:
                    "linear-gradient(80deg, #40F8FF 0%, #279EFF,#0adbb89d 100%)",

                  // borderRadius: "4px",
                }}
              >
                <CardHeader
                  className="headerDashboard"
                  style={{
                    color: "white",
                    fontSize: "25px",
                    background: "rgb(57, 67, 158)",
                  }}
                >
                  <b>Mobility</b>
                </CardHeader>
                <div class="col">
                  <div style={{ color: "white", fontSize: "25px" }}>
                    <b>Department : Mobility</b>
                  </div>
                  <tr>
                  {/*
                    <table
                      class="forumline"
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="10"
                    >
                      <tr align="left">
                        <HiMiniArrowLongRight />
                        Salary Slip
                      </tr>
                      <tr align="left">
                        <HiMiniArrowLongRight />
                        Form - 16
                      </tr>
                      <tr align="left">
                        <HiMiniArrowLongRight />
                        Store Issued Items
                      </tr>
                      <tr align="left">
                        <HiMiniArrowLongRight />
                        Apply Leave
                      </tr>
                      <tr align="left">
                        <HiMiniArrowLongRight />
                        Store request
                      </tr>
                      <tr align="left">
                        <HiMiniArrowLongRight />
                        Apply For Tour
                      </tr>
                      <tr align="left">
                        <HiMiniArrowLongRight />
                        Approved Tours
                      </tr>

                      <tr
                        align="center"
                        style={{ color: "white", fontSize: "20px" }}
                      >
                        * Designation : Senior Developer (ERP Specialist)
                      </tr>
                      <tr
                        align="center"
                        style={{ color: "white", fontSize: "20px" }}
                      >
                        * Department : IT
                      </tr>

                      <tr
                        align="center"
                        style={{ color: "white", fontSize: "20px" }}
                      >
                        * Staff Type : Remuneration
                      </tr>
                    </table>
                */}
                  </tr>
                </div>

                <CardFooter style={{ color: "black", background: "silver" }}>
                  © 2023 GMDA All rights reserved. Version: 4...
                </CardFooter>
              </Card>
            </Col>
            <Col sm={4}>
              <Card
                className="form-shadow"
                style={{
                  width: "24rem",
                  height: "500px",
                  background:
                    "linear-gradient(80deg, #40F8FF 0%, #279EFF,#0adbb89d 100%)",

                  // borderRadius: "5px",
                }}
              >
                <CardHeader
                  className="headerDashboard"
                  style={{
                    color: "white",
                    fontSize: "25px",
                    background: "rgb(57, 67, 158)",
                  }}
                >
                  <b>Infrastructure - I</b>
                </CardHeader>
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
                        <td
                          align="left"
                          width="60%"
                          style={{ color: "white", fontSize: "30px" }}
                        >
                          <label>
                            <b> Project as on 31/04/2024</b>
                          </label>
                        </td>
                      </tr>
                      <tr>List of ongoing projects</tr>
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
                    ></table>
                  </tr>
                </div>

                <CardFooter style={{ color: "black", background: "silver" }}>
                  © 2023 GMDA All rights reserved. Version: 4...
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
};

export default DashboardUpdatedCards;

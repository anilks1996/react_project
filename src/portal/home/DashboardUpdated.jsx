import React from "react";
import DigitalWatch from "./DigitalWatch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeIcon from "@mui/icons-material/Home";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { PieChart } from "@mui/x-charts/PieChart";
import Charts from "./Charts";
import { CardBody, CardFooter, CardHeader } from "reactstrap";
import { Table } from "reactstrap";
import Box from "@mui/material/Box";

const myList = [
  "Information Technology",
  "Finance & Accounts",
  "Infra-I",
  "Mobility",
];
const listItems = myList.map((myList) => {
  return <li>{myList}</li>;
});

const DashboardUpdated = () => {
  return (
    <div>
      <form>
        <div>
          <Row>
            <Col sm={12}>
              <h4 style={{ color: "red", alignItems: "center" }}>
                <HomeIcon />
                ERP Dashboard
              </h4>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Card
                className="form-shadow"
                style={{
                  width: "15.5rem",
                  height: "140px",
                  background: "#eeaeca",
                  borderRadius: "15px",
                }}
              >
                <CardBody>
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                      width: "100%",
                      height: "26px",
                      marginTop: "0px",
                      paddingTop: "0px",
                      textAlign: "left",
                    }}
                  >
                    Total Employees= 250
                  </Button>
                  <br />
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                      width: "100%",
                      height: "26px",
                      marginTop: "0px",
                      paddingTop: "0px",
                      textAlign: "left",
                    }}
                  >
                    Total Remunerations= 100
                  </Button>
                  <br />
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                      width: "100%",
                      height: "26px",
                      marginTop: "0px",
                      paddingTop: "0px",
                      textAlign: "left",
                    }}
                  >
                    Total Contractual= 50
                  </Button>
                  <br />
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                      width: "100%",
                      height: "26px",
                      marginTop: "0px",
                      paddingTop: "0px",
                      textAlign: "left",
                    }}
                  >
                    Total Outsourced= 100
                  </Button>
                  <br />
                </CardBody>
              </Card>
            </Col>

            <Col sm={3}>
              <Card
                className="form-shadow"
                style={{
                  width: "15.5rem",
                  height: "140px",
                  background: "#eeaeca",
                  borderRadius: "15px",
                }}
              >
                <Card.Body>
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                      width: "100%",
                      height: "26px",
                      marginTop: "0px",
                      paddingTop: "0px",
                      textAlign: "center",
                    }}
                  >
                    Total Divisions = 9
                  </Button>
                  <ul> {listItems} </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={3}>
              <Card
                className="form-shadow"
                style={{
                  width: "15.5rem",
                  height: "140px",
                  background: "#eeaeca",
                  borderRadius: "15px",
                }}
              >
                <div
                  className="heading"
                  style={{ width: "100%", color: "red" }}
                >
                  Total Budget for the f.y 23-24= 500000000
                </div>
                <Charts />
              </Card>
            </Col>
            <Col sm={3}>
              <h4>Development Activities</h4>
              <PieChart
                series={[
                  {
                    data:[
                      { id: 0, value: 10, label: "Good" },
                      { id: 1, value: 15, label: "Average" },
                      { id: 2, value: 20, label: "Poor" },
                    ],
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  },
                ]}
                height={150}
              />

              
            </Col>
          </Row>

          <Row></Row>
        </div>
      </form>
      <br />

      {/* <Card className="form-shadow">
          <CardHeader>
            <CardBody>
              <DigitalWatch />
            </CardBody>
          </CardHeader>

          <Container>
            <form
              name="ledgerScheduling"
              method="post"
              enctype="multipart/form-data"
              ng-controller="balSheetCtrl"
              ng-cloak
            >
              <div
                class="panel panel-default panel-shadow"
                style={{ background: "#1d5f86" }}
              >
                <div class="panel-body" id="infraIid">
                  <h2 align="center" style={{ color: "White" }}>
                    Financial Report of GMDA
                  </h2>

                  <div class="form-group">
                    <table class="table table-bordered table-condensed table-striped">
                      <tr>
                        <th width="50%" style={{ background: "#0691AB" }}>
                          <h4 align="center" style={{ color: "White" }}>
                            Balance Sheet
                          </h4>
                          <a href="#">
                            <div class="panel-boby">
                              <h5 style={{ color: "White" }}>
                                <b>Select Financial Year</b>
                              </h5>
                              <select
                                data-placeholder="Select Financial Year"
                                class="form-control"
                                name="ledgerScheduleDetail.accCompanyFinancialYear.id"
                                id="ledgerScheduleDetail.accCompanyFinancialYear.id"
                                ng-options="company.text for company in companyColls track by company.value"
                                ng-model="ledgerScheduleDetail.accCompanyFinancialYear.id"
                                ng-change="downloadBalanceSheetReport(ledgerScheduleDetail.accCompanyFinancialYear.id)"
                              >
                                <option value="">
                                  {" "}
                                  --- Select Financial Year ---{" "}
                                </option>
                              </select>
                            </div>
                          </a>
                          <br />
                          <a
                            href="#"
                            class="btn btn-info"
                            ng-click="downloadBalanceSheetReport(ledgerScheduleDetail.accCompanyFinancialYear.id)"
                            title="Click here to download reports"
                          >
                            <h7>
                              <i style={{ color: "white" }}>
                                <i class="icon-file-download"></i>Balance Sheet
                              </i>
                            </h7>
                          </a>
                          <br />
                          <a
                            href="#"
                            class="btn btn-info"
                            ng-click="viewBalanceSheet(ledgerScheduleDetail.accCompanyFinancialYear.id)"
                            title="Click here to change date"
                          >
                            <h7 style={{ color: "white" }}>Between Period</h7>
                          </a>
                        </th>
                        <th
                          width="50%"
                          style={{ background: "rgba(20,210,210,0.2)" }}
                        >
                          <h4 align="center" style={{ color: "White" }}>
                            Income & Expenditure
                          </h4>
                          <a href="#">
                            <div class="panel-boby">
                              <h5 style={{ color: "White" }}>
                                <b>Select Financial Year</b>
                              </h5>
                              <select
                                data-placeholder="Select Financial Year"
                                class="form-control"
                                name="accCompanyFinancialYear.id"
                                id="accCompanyFinancialYear.id"
                                ng-options="company.text for company in companyColls track by company.value"
                                ng-model="accCompanyFinancialYear.id"
                                ng-change="getIncomeExpenseAmt(accCompanyFinancialYear.id)"
                              >
                                <option value="">
                                  {" "}
                                  --- Select Financial Year ---{" "}
                                </option>
                              </select>
                            </div>
                          </a>
                          <br />
                          <a
                            href="#"
                            class="btn btn-success"
                            ng-click="downloadIncomeReport(accCompanyFinancialYear.id)"
                            title="Click here to download reports"
                          >
                            <h7>
                              <i class="icon-file-download"></i>Income
                            </h7>
                          </a>
                          <a
                            href="#"
                            class="btn btn-success"
                            ng-click="downloadExpenseReport(accCompanyFinancialYear.id)"
                            title="Click here to download reports"
                          >
                            <h7>
                              <i class="icon-file-download"></i>Expense
                            </h7>
                          </a>
                          <br></br>
                          <a
                            href="#"
                            class="btn btn-success"
                            ng-click="sendIncomeExpReportPage(accCompanyFinancialYear.id)"
                            title="Click here to change date"
                          >
                            <h7 style={{ color: "white" }}>Between Period</h7>
                          </a>
                        </th>
                      </tr>
                    </table>
                    <table>
                      <tr>
                        <h4 align="center" style={{ color: "White" }}>
                          Total Budget : <b>25744000000</b>
                        </h4>
                        <h4 align="center" style={{ color: "#f87c7c" }}>
                          Total Expense : <b>5322812000</b>
                        </h4>
                        <h4 align="center" style={{ color: "#7cf87c" }}>
                          Total Available : <b>20421188000</b>
                        </h4>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </Container>
          <CardFooter>ERP</CardFooter>
        </Card> */}
      <form>
        <div>
          <div className="container">
            <div className="row-xs-12">
              <div className="col-xs-4">
                
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardUpdated;

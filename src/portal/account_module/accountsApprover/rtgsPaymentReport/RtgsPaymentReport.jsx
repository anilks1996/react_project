import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardFooter, CardHeader, Container } from "reactstrap";

const RtgsPaymentReport = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form
        name="OnlinePayDetFrm"
        method="get"
        id="OnlinePayDetFrm"
        ng-controller="OPRCtrl"
        ng-init="init()"
        ng-cloak
      >
        <Card
          className="p-3 mt-3"
          style={{
            height: "3.5rem",
            background: "lightgrey",
            width: "70rem",
          }}
        >
          Home/Online Payment Reports
        </Card>
        <br />

        <Card className="form-shadow">
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">
              Back
            </Button>{" "}
            <Button color="dark">Add</Button>
          </CardHeader>
          <CardHeader style={{ color: "black", background: "darkgray" }}>
            <h5>Payment(s) Report Detail</h5>
          </CardHeader>
          <Container>
            <div class="panel panel-default panel-shadow">
              <div class="panel-body">
                <br />
                <div class="form-group">
                  <div class="row">
                    <label class="col-lg-3 control-label">From Date:</label>
                    <div class="col-lg-3">
                      <input
                        type="date"
                        class="form-control datepicker"
                        id="startDate"
                        name="startDate"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <label class="col-lg-3 control-label">To Date:</label>
                    <div class="col-lg-3">
                      <input
                        type="date"
                        class="form-control datepicker"
                        id="endDate"
                        name="endDate"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <label class="col-lg-3 control-label">
                    Unique Transaction Code:
                  </label>
                  <div class="col-lg-5">
                    <select
                      data-placeholder="Select Payment Transaction Code.."
                      class="select-search form-control"
                      id="onlinePayment.id"
                      name="onlinePayment.id"
                      ng-options="payment.text for payment in fileNoColl track by payment.value"
                      ng-model="onlinePayment.id"
                      style={{
                        cursor: "pointer",
                        width: "60%",
                        height: "50%",
                      }}
                    >
                      <option value=""></option>
                    </select>
                  </div>
                  <div class="col-lg-1">&nbsp;</div>
                  <div class="col-lg-3">
                    <a
                      class="btn btn-primary"
                      href="JavaScript:fetchOnlinePayDetReports();"
                    >
                      Filter
                    </a>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </Container>
          <CardFooter></CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default RtgsPaymentReport;

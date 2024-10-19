import React, { useState } from "react";
import { Button, Card, CardFooter, CardHeader, Table } from "reactstrap";
import { RiAddBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const PaymentInstruments = () => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdateOrg({ ...updateOrg, [e.target.name]: e.target.value });
    console.log(updateOrg);
  };

  const [updateOrg, setUpdateOrg] = useState();
  return (
    <div>
      <form
        name="voucherEntryAddFrm"
        id="voucherEntryAddFrm"
        method="post"
        ng-controller="voucherAddCtrl"
        ng-init="addNewVoucher()"
        ng-cloak
      >
        <div class="panel-body text-center">
          <Button
            color="secondary"
            style={{ marginRight: "20px", width: "90px" }}
            onClick={() => navigate("/ShowVoucherDate")}
          >
            Initiate
          </Button>
          <Button
            color="danger"
            style={{ marginRight: "20px", width: "120px" }}
            onClick={() => navigate("/VoucherEntryPage")}
          >
            Transactions
          </Button>
          <Button
            color="success"
            style={{ marginRight: "20px", width: "180px" }}
          >
            Payment Instruments
          </Button>

          <Card
            className="p-3 mt-3"
            style={{
              width: "70rem",
            }}
          >
            <CardHeader style={{ color: "red" }}>
              <span class="text-danger" id="initialAlert">
                As you select options and fill values, form will automatically
                guide you for next steps.
              </span>
            </CardHeader>

            <CardHeader>
              <h6 class="panel-title">Payment Instrument</h6>
            </CardHeader>
            <Table bordered>
              <div class="form-group">
                <div class="row">
                  <div class="col-md-2">
                    <label class="control-label">Payment Mode :</label>
                  </div>

                  <div class="col-md-1">
                    <label>Cash</label>
                    <input
                      type="radio"
                      name="paymentInstrument"
                      id="paymentInstrument{{payIns.value}}"
                      onChange={handleChange}
                      value={updateOrg && updateOrg.paymentMode}
                    />
                  </div>
                  <div class="col-md-2">
                    <label>Cheque/DD</label>
                    <input
                      type="radio"
                      name="paymentInstrument"
                      id="paymentInstrument{{payIns.value}}"
                    />
                  </div>
                  <div class="col-md-1">
                    <label>IMAP</label>
                    <input
                      type="radio"
                      name="paymentInstrument"
                      id="paymentInstrument{{payIns.value}}"
                    />
                  </div>
                  <div class="col-md-1">
                    <label>NEFT</label>
                    <input
                      type="radio"
                      name="paymentInstrument"
                      id="paymentInstrument{{payIns.value}}"
                    />
                  </div>
                  <div class="col-md-1">
                    <label>RTGS</label>
                    <input
                      type="radio"
                      name="paymentInstrument"
                      id="paymentInstrument{{payIns.value}}"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-md-3">
                    <input
                      type="text"
                      class="form-control clBox"
                      placeholder="Pay to / Received from"
                      id="chqPayee"
                      ng-model="chqPayee"
                      ng-blur=""
                    />
                  </div>
                  <div class="col-md-2">
                    <input
                      type="text"
                      class="form-control clBox"
                      autocomplete="off"
                      placeholder="Cash/Bank"
                      id="bankId"
                      ng-model="bankId"
                      uib-typeahead="bank as bank.text for bank in bankColl | filter:$viewValue | limitTo:10"
                      ng-blur="calculateChequeAmount();"
                    />
                  </div>
                  <div class="col-md-2">
                    <input
                      type="text"
                      class="form-control clBox"
                      autocomplete="off"
                      placeholder="Amount"
                      id="chqAmount"
                      ng-model="chqAmount"
                    />
                  </div>
                  <div class="col-md-2">
                    <input
                      type="text"
                      class="form-control clBox datepicker"
                      placeholder="Cheque/Txn.Date "
                      id="chqDate"
                      ng-model="chqDate"
                      readonly
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div class="col-md-2">
                    <input
                      type="text"
                      placeholder="Cheque No./Txn. No."
                      min="0"
                      class="form-control clBox"
                      id="chqNumber"
                      ng-model="chqNumber"
                    />
                  </div>
                  <div class="col-md-1">
                    <Button
                      color="success"
                      style={{ width: "25px", height: "25px" }}
                    >
                      <RiAddBoxFill />
                    </Button>
                  </div>
                </div>
              </div>

              {/* <div class="row" ng-repeat="cheque in chqItems">
                <div class="col-md-3"></div>
                <div class="col-md-2"></div>
                <div class="col-md-2"></div>
                <div class="col-md-2"></div>
                <div class="col-md-2"></div>
                <div class="col-md-1">
                  <Button
                    color="success"
                    style={{ width: "25px", height: "25px" }}
                  >
                    <RiAddBoxFill />
                  </Button>
                </div>
              </div> */}
            </Table>
            <CardFooter>
              <Button color="danger">Close</Button>{" "}
              <Button
                style={{
                  background: "black",
                  width: "90px",
                }}
                onClick={() => navigate("/WorkFlow")}
              >
                Next
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default PaymentInstruments;

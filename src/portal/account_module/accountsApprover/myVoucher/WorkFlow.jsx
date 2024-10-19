import React, { useState } from "react";
import { Button, Card, CardFooter, CardHeader, Table } from "reactstrap";
import { RiAddBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  createVouchers,
  showVoucherEntryType,
} from "../../accounts_redux/slices/accounts_slice/voucherEntryPageSlice";
import { useDispatch } from "react-redux";

const WorkFlow = () => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdateOrg({ ...updateOrg, [e.target.name]: e.target.value });
    console.log(updateOrg);
  };

  const [updateOrg, setUpdateOrg] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("fill all data " + updateOrg);
    //dispatch(createVoucherEntryType(updateOrg));
    // setModal(false);
    dispatch(showVoucherEntryType());
    setUpdateOrg(null);
  };

  const [updateAccVoucher, setUpdateAccVoucher] = useState();

  const saveVoucherInitiate = (e) => {
    dispatch(createVouchers(updateAccVoucher));

    navigate("/myVoucher");
  };

  const dispatch = useDispatch();

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
            style={{ marginRight: "20px", width: "100px" }}
            onClick={() => navigate("/VoucherEntryPage")}
          >
            Transactions
          </Button>
          <Button
            color="success"
            style={{ marginRight: "20px", width: "180px" }}
            onClick={() => navigate("/PaymentInstruments")}
          >
            Payment Instruments
          </Button>
          <Button
            color="success"
            style={{ marginRight: "20px", width: "180px" }}
            onClick={() => navigate("/ShowVoucherDate")}
          >
            Work Flow
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
              <h6 class="panel-title">Workflow</h6>
            </CardHeader>
            <Table bordered>
              <div class="panel-body">
                <div class="row">
                  <label class="col-lg-6">
                    CHOOSE A STATUS OF THE VOUCHER:
                  </label>
                  <div class="col-lg-6">
                    <select
                      data-placeholder="Select status..."
                      class="form-control"
                      name="status"
                      id="status"
                      style={{ width: "35%" }}
                    >
                      <option value="">---Select---</option>
                      <option value="">Request</option>
                      <option value="">Forward</option>
                      <option value="">Approve</option>
                      <option value="">Reject</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <label class="col-lg-6 control-label">
                    CHOOSE TO WHOM THIS VOUCHER SHALL BE FORWARDED:
                  </label>
                  <div class="col-lg-6">
                    <select
                      data-placeholder="Select approver..."
                      class="form-control"
                      name="voucher.campusWorkflowModel.nextEmployee.id"
                      id="voucher.campusWorkflowModel.nextEmployee.id"
                      ng-options="employee.text for employee in appoverColl track by employee.value"
                      ng-model="employee.selected"
                      ng-click="showWorkFlowBtn('Next Step','finalizePanel','finalizeBtn');"
                      style={{ width: "35%" }}
                      onChange={handleChange}
                      value={updateOrg && updateOrg.requestingEmployee}
                    >
                      <option value="">---Select---</option>
                      <option value="">Account Officer</option>
                      <option value="">Chief Account Officer</option>
                      <option value="">Accountant</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <label class="col-lg-6 control-label">
                    PLEASE ENTER YOUR REMARKS FOR THE APPROVER:
                  </label>
                  <div class="col-lg-6">
                    <textarea
                      rows="5"
                      cols="5"
                      id="voucher.campusWorkflowModel.remarks"
                      name="voucher.campusWorkflowModel.remarks"
                      class="limited form-control"
                      placeholder="Remarks to next employee..."
                      style={{ width: "65%", height: "45%" }}
                    ></textarea>
                    <span class="help-block" id="limit-text">
                      Field limited to 500 characters.
                    </span>
                  </div>
                </div>
                <br />
              </div>
            </Table>
            <CardFooter>
              <Button
                color="danger"
                style={{ marginRight: "20px", width: "90px" }}
              >
                Close
              </Button>
              <Button
                color="success"
                style={{ marginRight: "20px", width: "120px" }}
                onClick={saveVoucherInitiate}
              >
                Save & Send
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default WorkFlow;

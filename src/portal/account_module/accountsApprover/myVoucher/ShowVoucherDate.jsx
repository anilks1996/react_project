import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Table,
} from "reactstrap";
import { showOrganizationType } from "../../accounts_redux/slices/accounts_slice/organizationTypeSlice";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  createVouchers,
  showVoucherEntryType,
  showVoucherEntryTypeById,
} from "../../accounts_redux/slices/accounts_slice/voucherEntryPageSlice";

const ShowVoucherDate = () => {
  const [updateAccVoucher, setUpdateAccVoucher] = useState();
  const { voucherObj, voucherEntryTypes } = useSelector(
    (state) => state.allstorereducer.vouType
  );
  const updateDept = (empObj) => {
    setUpdateAccVoucher(empObj);
    //navigatePage(`/establishmentSetup/editEmployeeType/${id}`);
  };

  const { organizationTypes } = useSelector(
    (state) => state.allstorereducer.orgType
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: "0", left: "0", behavior: "smooth" });
    dispatch(showOrganizationType());
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("fill all data " + updateVou);
  //   // dispatch(createOrganizationType(updateOrg));
  //   // setModal(false);
  //   dispatch(showOrganizationType());
  //   setUpdateVou(null);
  // };

  const handleChange = (e) => {
    setUpdateAccVoucher({
      ...updateAccVoucher,
      [e.target.name]: e.target.value,
    });
    console.log(updateAccVoucher);
  };
  const saveVoucherInitiate = (e) => {
    generateVoucherNo();
    dispatch(createVouchers(updateAccVoucher));
    console.log(voucherObj);
    if (voucherObj && voucherObj.id) {
      alert("voucherObj=" + voucherObj + ", id=" + voucherObj.id);
    }
    navigate("/voucherEntryPage");
  };
  const [voucherNo, setVoucherNo] = useState();

  const generateVoucherNo = (e) => {
    let x = Math.floor(Math.random() * 1000);
    console.log("x=" + x);
    if (updateAccVoucher && updateAccVoucher.voucherType === "Payment") {
      setVoucherNo("PV0" + x);
      console.log("x=" + voucherNo);
      setUpdateAccVoucher({ ...updateAccVoucher, ["voucherNo"]: voucherNo });
    }
    if (updateAccVoucher && updateAccVoucher.voucherType === "Journal") {
      setVoucherNo("JV0" + x);
      console.log("x=" + voucherNo);
      setUpdateAccVoucher({ ...updateAccVoucher, ["voucherNo"]: voucherNo });
    }
    if (updateAccVoucher && updateAccVoucher.voucherType === "Receipt") {
      setVoucherNo("RC0" + x);
      console.log("x=" + voucherNo);
      setUpdateAccVoucher({ ...updateAccVoucher, ["voucherNo"]: voucherNo });
    }
    if (updateAccVoucher && updateAccVoucher.voucherType === "Contra") {
      setVoucherNo("CV0" + x);
      console.log("x=" + voucherNo);
      setUpdateAccVoucher({ ...updateAccVoucher, ["voucherNo"]: voucherNo });
    }
    console.log("voucherNo= " + voucherNo);
  };
  const [updateVou, setUpdateVou] = useState();
  return (
    <div>
      <form>
        <Card
          className="p-3 mt-3"
          style={{
            width: "70rem",
          }}
        >
          <Card>
            <input
              type="hidden"
              name="voucherId"
              id="voucherId"
              value="{{prData.id}}"
            />
            <input type="hidden" name="resultType" id="resultType" value="" />
            <input type="hidden" id="voucher.id" name="voucher.id" value="" />
            <input
              type="hidden"
              id="defaultBank"
              name="defaultBank"
              value="No"
            />
            <input
              type="hidden"
              id="voucherReplicateId"
              name="voucherReplicateId"
              value=""
            />
            <div class="panel-body text-center">
              <Button
                color="primary"
                style={{ marginRight: "20px", width: "120px" }}
                onClick={() => navigate("/VoucherEntryPage")}
              >
                Initiate
              </Button>
              <Button
                color="success"
                style={{ marginRight: "20px", width: "130px" }}
                onClick={() => navigate("/VoucherEntryPage")}
              >
                Transactions
              </Button>
            </div>
          </Card>
          <CardHeader>
            <div class="well">
              <span class="text-danger" id="initialAlert">
                As you select options and fill values, form will automatically
                guide you for next steps.
              </span>
            </div>
          </CardHeader>
          <CardHeader>
            {" "}
            <td>
              <div class="panel-body">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h6 class="panel-title">Initiate</h6>
                  </div>
                </div>
              </div>
            </td>
          </CardHeader>
          <Card>
            <Row>
              <Col xs={2}></Col>
              <Col xs={1}></Col>
              <Col xs={2}>
                <label>Organization :</label>
              </Col>
              <Col xs={7}>
                <td nowrap align="left" width="220px">
                  <select
                    placeholder="select-name"
                    className="form-select"
                    name="institution.id"
                    id="institution.id"
                    value={
                      updateAccVoucher &&
                      updateAccVoucher.accCompany &&
                      updateAccVoucher.accCompany.id
                    }
                    onChange={(e) => handleChange(e)}
                  >
                    <option value={-1}>--- select ---</option>
                    {organizationTypes.map((orgname) => (
                      <option value={orgname.id}>
                        {orgname.code} - {orgname.name}
                      </option>
                    ))}
                  </select>
                </td>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={1}></Col>
              <Col xs={2}>
                <label class="control-label">Date: </label>
              </Col>
              <Col xs={7}>
                <td width="220px">
                  <input
                    type="date"
                    class="form-control"
                    name="voucherDate"
                    id="voucherDate"
                    onChange={handleChange}
                  />
                  &nbsp;
                </td>
              </Col>
            </Row>
            <Row xs={12}>
              <Col xs={12}>
                <label class="control-label">
                  SELECT THE TYPE OF VOUCHER YOU WISH TO CREATE:{" "}
                </label>
                <div>
                  <span id="paymentType">
                    <label class="radio-inline radio-success">
                      <input
                        onChange={handleChange}
                        type="radio"
                        name="voucherType"
                        id="type1"
                        value="Payment"
                        ng-click="showPartyType()"
                        ng-model="prData.bookType.voucherType"
                      />
                      PAYMENT
                    </label>
                  </span>
                  <span id="receiptType">
                    <label class="radio-inline radio-success">
                      <input
                        onChange={handleChange}
                        type="radio"
                        name="voucherType"
                        id="type2"
                        value="Receipt"
                        ng-click="showPartyType()"
                        ng-model="prData.bookType.voucherType"
                      />
                      RECEIPT
                    </label>
                  </span>
                  <span id="journalType">
                    <label class="radio-inline radio-success">
                      <input
                        onChange={handleChange}
                        type="radio"
                        name="voucherType"
                        id="type3"
                        value="Journal"
                        ng-click="showPartyType()"
                        ng-model="prData.bookType.voucherType"
                      />
                      JOURNAL
                    </label>
                  </span>
                  <span id="contraType">
                    <label class="radio-inline radio-success">
                      <input
                        onChange={handleChange}
                        type="radio"
                        name="voucherType"
                        id="type4"
                        value="Contra"
                        ng-click="showPartyType()"
                        ng-model="prData.bookType.voucherType"
                      />
                      CONTRA
                    </label>
                  </span>
                  <span id="purchaseType">
                    <label class="radio-inline radio-success">
                      <input
                        onChange={handleChange}
                        type="radio"
                        name="voucherType"
                        id="type5"
                        value="Purchase"
                        ng-click="showPartyType()"
                        ng-model="prData.bookType.voucherType"
                      />
                      PURCHASE
                    </label>
                  </span>
                  <span id="salesType">
                    <label class="radio-inline radio-success">
                      <input
                        onChange={handleChange}
                        type="radio"
                        name="voucherType"
                        id="type6"
                        value="Sales"
                        ng-click="showPartyType()"
                        ng-model="prData.bookType.voucherType"
                      />
                      SALES
                    </label>
                  </span>
                </div>
              </Col>
            </Row>
            <Row xs={12}>
              <Col xs={12}>
                <label class="control-label">
                  SELECT THE PARTY TYPE FOR WHICH THIS VOUCHER IS BEING ENTERED:{" "}
                </label>
                <div>
                  <label class="radio-inline radio-success">
                    <input
                      type="radio"
                      name="advanceFor"
                      id="payee1"
                      value="Employee"
                      onChange={handleChange}
                    />
                    EMPLOYEE
                  </label>
                  <label class="radio-inline radio-success">
                    <input
                      type="radio"
                      name="advanceFor"
                      id="payee2"
                      value="Party"
                      onChange={handleChange}
                    />
                    VENDOR
                  </label>
                  <label class="radio-inline radio-success">
                    <input
                      type="radio"
                      name="advanceFor"
                      id="payee4"
                      value="Other"
                      onChange={handleChange}
                    />
                    OTHER
                  </label>
                </div>
              </Col>
            </Row>

            <center>
              <Button color="danger">Close</Button>{" "}
              <Button onClick={(e) => saveVoucherInitiate(e)} color="primary">
                Next Step
              </Button>
            </center>
          </Card>
        </Card>
        <CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
      </form>
    </div>
  );
};

export default ShowVoucherDate;

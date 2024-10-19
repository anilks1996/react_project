import React from "react";
import { Card, Button, CardHeader, CardFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const AccountsBudget = () => {
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
            home/ accounts master/ accounts budget
          </Card>
        </span>
        <br />
        <Card className="form-shadow">
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">
              Back
            </Button>{" "}
            <Button color="secondary">Download Excel</Button>{" "}
            <Button color="primary">Upload and Save</Button>{" "}
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
                        <span class="required">*</span>
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
                        <span class="required">*</span>
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
                      <td align="right"> Budget Type </td>

                      <td align="left">
                        {/* <select class="form-control" tabindex="-1" id="budgetType" name="budgetType" onChange="">
<option  value="Yearly" title="Yearly">Yearly</option>
<option  value="Monthly" title="Monthly">Monthly</option>
<option  value="Quarterly" title="Quarterly">Quarterly</option>
</select> */}
                        <Form.Select aria-label="Default select example">
                          <option>--Select--</option>
                          <option value="1">Receipt</option>
                          <option value="2">Payment</option>
                          <option value="3">Contra</option>
                          <option value="3">Journal</option>
                        </Form.Select>
                      </td>
                    </tr>
                  </table>
                </tr>
              </div>
            </div>
          </div>

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
                      <td align="left">
                        <label for="assetInclude.true"></label>
                        <input
                          id="assetInclude.true"
                          type="checkbox"
                          name="assetInclude"
                          value="true"
                          onClick="javaScript:doAssetCheck();"
                        />
                      </td>
                      <td nowrap align="right">
                        <label>Include Asset heads also?:</label>
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
                      <td nowrap align="right" width="35%">
                        <span class="required">*</span>
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
                      <td align="right">Upload File :</td>
                      <td align="right">
                        {" "}
                        <input
                          id="computerForm"
                          type="file"
                          name="computerForm"
                          value=""
                          class="styled form-control"
                          width="20%"
                        />
                      </td>
                    </tr>
                  </table>
                </tr>
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

export default AccountsBudget;

{
  /* <td nowrap align="right" width="30%"><label>Include Asset heads also?:</label>
										</td>
										<td align="left">
  	<label for="assetInclude.true"></label>
  	<input id="assetInclude.true" type="checkbox" name="assetInclude" value="true" onClick="javaScript:doAssetCheck();"/>
   					 				    </td> 	
										
										<td nowrap align="right"><span class="required">*</span><label>Grant/Project :</label>
										</td> */
}

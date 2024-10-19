import React from "react";
import { Card, CardBody, Button, CardHeader, CardFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";

const CostCenters = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form name="openingBalanceFrm" method="post" class="ng-pristine ng-valid">
        <span>
          {" "}
          <Card
            className="p-3 mt-3"
            style={{
              height: "3.5rem",
              width: "70rem",
              background: "lightgrey",
            }}
          >
            home/ accounts master/ cost center
          </Card>
        </span>
        <br />

        <Card className="form-shadow" style={{ width: "70rem" }}>
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">
              Back
            </Button>{" "}
            <Button onClick={() => navigate("/CostCenterAdd")} color="dark">
              Add
            </Button>{" "}
          </CardHeader>

          <table width="100%" border="0" cellspacing="10" cellpadding="0">
            <tr>
              <td>
                <table
                  class="forumline"
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="10"
                >
                  <tbody>
                    <tr>
                      <th align="right" width="25%" nowrap>
                        <span class="required">*</span>
                        <label>Accounts Organization</label>
                      </th>
                      <td align="left" nowrap>
                        GMDA
                      </td>
                      <td width="60%">
                        <input
                          type="hidden"
                          name="company.id"
                          id="company.id"
                          value="373882880"
                        />
                        <a
                          class="btn btn-secondary"
                          href="javaScript:getCostCenters();"
                          style={{ color: "white", width: "5rem" }}
                        >
                          Filter
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table>
          <CardFooter>
            © 2024 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CostCenters;

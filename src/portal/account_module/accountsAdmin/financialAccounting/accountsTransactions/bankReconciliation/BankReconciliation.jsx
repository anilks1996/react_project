import React from "react";
import { Card, CardBody, Button, CardHeader, CardFooter } from "reactstrap";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { CenterFocusStrong } from "@mui/icons-material";

const BankReconciliation = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const navigate = useNavigate();
  return (
    <div>
      <form>
        <span>
          <Card
            className="p-3 mt-3"
            style={{
              height: "3.5rem",
              width: "70rem",
              background: "lightgrey",
            }}
          >
            Home / accounts master / bank reconciliation
          </Card>
        </span>{" "}
        <br />
        <Card className="form-shadow">
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">
              Back
            </Button>{" "}
          </CardHeader>
          <Box align="center">
            <Container>
              <tr>
                <td>
                  <table
                    width="100%"
                    border=".2"
                    cellspacing="10"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Financial Year :</label>
                        <select>
                          <option value="" selected>
                            --Select--
                          </option>
                          <option value="902823936" title="GMDA">
                            GMDA 2023-2024
                          </option>
                          <option value="851247106" title="GMDA">
                            GMDA 2022-2023
                          </option>
                          <option value="851247108" title="GMDA">
                            GMDA 2021-2022
                          </option>
                        </select>
                      </td>

                      <td>
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Bank Book</label>
                        <input type="text" name="password" />
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td>
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>
                          Date From :
                          <input type="date" name="password" />
                        </label>
                      </td>
                      <td>
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>
                          Date To :
                          <input type="date" name="password" />
                        </label>
                      </td>
                    </tr>

                    <br />
                    <tr>
                      <label>
                        Voucher Type :
                        <select>
                          <option value="" selected>
                            --Select--
                          </option>
                          <option value="receipt" title="GMDA">
                            Receipt
                          </option>
                          <option value="payment" title="GMDA">
                            Payment
                          </option>
                          <option value="journal" title="GMDA">
                            Journal
                          </option>
                          <option value="contra" title="GMDA">
                            Contra
                          </option>
                        </select>
                      </label>
                      <td>
                        <label>
                          Voucher No.
                          <input type="text" />
                        </label>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <label>
                        Reconcile Status :
                        <select>
                          <option value="" selected>
                            --Select--
                          </option>
                          <option value="No" title="No">
                            No
                          </option>
                          <option value="Yes" title="Yes">
                            Yes
                          </option>
                        </select>
                      </label>
                      <td>
                        <label>
                          Cheque No :
                          <input type="text" name="password" />
                        </label>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td>
                        <label>
                          Amount :
                          <input type="text" />
                        </label>
                      </td>
                      <td>
                        <label>
                          Enter Reconcile Date :
                          <input type="text" name="password" />
                        </label>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td>
                        <label>
                          Bank Balance
                          <input type="text" name="username" />
                        </label>
                      </td>

                      <td>
                        <label>
                          Bank Statement
                          <input type="text" name="password" />
                        </label>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td align="center">
                        <a class="btn btn-dark" style={{ color: "white" }}>
                          Filter
                        </a>
                      </td>
                    </tr>

                    <br />
                  </table>
                </td>
              </tr>
            </Container>
          </Box>
          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default BankReconciliation;

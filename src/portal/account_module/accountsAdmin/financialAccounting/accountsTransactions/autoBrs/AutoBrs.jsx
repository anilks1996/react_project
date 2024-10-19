import React from "react";
import {
  Card,
  CardBody,
  Button,
  CardHeader,
  CardFooter,
  Container,
} from "reactstrap";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AutoBrs = () => {
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
            Home / accounts master / Auto BRS
          </Card>
        </span>
        <br />

        <Card className="form-shadow">
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">
              Back
            </Button>{" "}
          </CardHeader>
          <Container fluid>
            <form>
              <tr>
                <td>
                  <table
                    width="100%"
                    border="0"
                    cellspacing="1"
                    cellpadding="3"
                  >
                    <tr>
                      <td align="left">
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Company :</label>
                      </td>
                      <td nowrap align="left">
                        DRIISHYA
                      </td>

                      <td nowrap align="left">
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Financial Year : </label>
                      </td>
                      <td nowrap align="left">
                        01/04/2023 - 31/03/2024
                        <input
                          type="hidden"
                          name="companyFinancialYear.id"
                          id="companyFinancialYear.id"
                          value="902823936"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td nowrap align="left">
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Date From :&nbsp;</label>
                      </td>
                      <td nowrap>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          size=""
                          class="form-control"
                        />
                      </td>

                      <td nowrap align="left">
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Date To :</label>
                      </td>
                      <td nowrap>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          size=""
                          class="form-control"
                        />
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td nowrap align="left">
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Ledger Account :&nbsp;</label>
                      </td>

                      <div class="controls">
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
                          value=" "
                          title="Please enter the pattern to search"
                        />
                      </div>
                      <td>
                        <span class="required" style={{ color: "red" }}>
                          *
                        </span>
                        <label>Upload File (.xls):&nbsp;</label>
                      </td>
                      <td>
                        <input
                          id="computerForm"
                          type="file"
                          name="computerForm"
                          value=""
                          size="25"
                          class="styled form-control"
                        />
                        <b>
                          <font color="blue">Download Sample File</font>
                        </b>
                        <IoMdDownload />
                      </td>

                      <td>
                        <a
                          class="btn btn-primary"
                          href="javaScript:readForm();"
                          style={{ color: "white" }}
                        >
                          Filter
                        </a>
                      </td>
                    </tr>
                    <br />
                  </table>
                </td>
              </tr>
            </form>
          </Container>
          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AutoBrs;

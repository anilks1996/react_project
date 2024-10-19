import React from "react";
import { Card, CardBody, Button, CardHeader, CardFooter } from "reactstrap";
import { Input } from "reactstrap";
import { Table } from "reactstrap";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { FaUnlockAlt } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import { BsCpu } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const YearEndProcess = () => {
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
            home/ accounts master/ year end process
          </Card>
        </span>
        <br />
        <Card className="form-shadow">
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">
              Back
            </Button>{" "}
            <Button color="secondary">Search</Button>{" "}
          </CardHeader>

          <Table>
            <thead>
              <th>Organization Name</th>
              <th style={{ height: "3rem", width: "20rem" }}>
                <Input type="name" id="name" />
              </th>
              <th style={{ height: "2rem", width: "40rem" }}>
                <Button color="primary">Go</Button>
              </th>
            </thead>
          </Table>
          <CardHeader>Total:</CardHeader>
          <Table bordered>
            <thead>
              <tr>
                <th>Sl No..</th>
                <th>Company Code</th>
                <th>Financial Year Code</th>
                <th>Financial Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>GMDA</td>
                <td>21-22</td>
                <td>01/04/2021-31/03/2022</td>
                <td>Inactive</td>
                <td>
                  <Stack direction="row" spacing={1}>
                    <IconButton aria-label="delete" size="small">
                      <BsCheckLg fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="small">
                      <BsCpu fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="small">
                      <BsCpu fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="small">
                      <BsCpu fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="small">
                      <BsCpu fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="small">
                      <FaUnlockAlt fontSize="inherit" />
                    </IconButton>
                  </Stack>
                </td>
              </tr>
            </tbody>
          </Table>
          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default YearEndProcess;

import React from "react";
import { Card, CardBody, Button, CardHeader, CardFooter } from "reactstrap";
import { Table } from "reactstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Input } from "reactstrap";

const CostCenterBudgets = () => {
  return (
    <div>
      <form>
        <span>
          <Card
            className="p-3 mt-3"
            style={{
              height: "3.5rem",
              background: "lightgrey",
              width: "70rem",
            }}
          >
            home/ cost center budgets
          </Card>
        </span>
        <br />
        <Card className="form-shadow">
          <CardHeader>
            <Button color="danger">Back</Button>{" "}
          </CardHeader>
          <div>
            <Button color="dark">Budget Updation</Button>{" "}
            <Button color="dark">Budget Report</Button>{" "}
          </div>

          <Table>
            <thead>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </thead>
          </Table>

          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CostCenterBudgets;

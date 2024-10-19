import Form from "react-bootstrap/Form";
import * as React from "react";
import Card from "@mui/material/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import birthday from "../../../../documents/birthday.jpg";

function AccountsProfile() {
  return (
    <div>
      <span>
        <Card
          style={{
            height: "6rem",
            background: "skyblue",
            width: "70rem",
            marginTop: "20px",
          }}
        >
          Good Evening, Ms. Pooja Tomar! Welcome to GMDA System . You have
          logged in as Accounts Admin role. Your last login was on 19 Jan 24,
          03:08 PM (from IP Address: 182.76.178.242).
        </Card>
      </span>
      <br />
      <Card style={{ height: "25rem", width: "70rem", marginTop: "20px" }}>
        <Row>
          <Col>
            <img src={birthday} width="100%" height="80%" />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default AccountsProfile;

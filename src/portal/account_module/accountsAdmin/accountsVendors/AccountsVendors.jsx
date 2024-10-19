import { Card, Button, CardHeader, CardFooter } from "reactstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const AccountsVendors = () => {
  return (
    <div>
      <form style={{ minWidth: "70rem" }}>
        <span>
          <Card
            className="p-3 mt-3"
            style={{
              height: "3.5rem",
              background: "lightgrey",
            }}
          >
            Home /List of vendors
          </Card>
        </span>
        <br />
        <div>
          <Button color="dark">+ Create New Vendor</Button>{" "}
          <Button color="dark">Print List</Button>{" "}
        </div>{" "}
        <br />
        <Card className="form-shadow">
          <CardHeader>
            <h5>Filter criteria (optional)</h5>
          </CardHeader>

          <Container>
            <Row>
              <Col>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="3">
                      Vendor Name
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        id="vendorName"
                        type="text"
                        placeholder=""
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column lg="3">
                      Status
                    </Form.Label>
                    <Col lg="9">
                      <Form.Select aria-label="Default select example">
                        <option value="1">Pending</option>
                        <option value="2">Active</option>
                        <option value="3">Inactive</option>
                        <option value="4">Blacklisted</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <div>
                <Button
                  style={{
                    height: "2.5rem",
                    background: "grey",
                    width: "7rem",
                  }}
                >
                  SEARCH
                </Button>{" "}
              </div>
            </Row>
            <br />
          </Container>

          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AccountsVendors;

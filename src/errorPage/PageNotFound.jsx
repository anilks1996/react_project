import React from 'react'
import { Card,CardLink,CardBody,CardTitle,Row,Col,Button, CardHeader} from "reactstrap";

const PageNotFound = () => {
  return (
    <div>
    <form>
    <Row className="mt-1">
    <Col sm="12">
      <Card>
      <CardHeader>
        Invalid Page
      </CardHeader>
      <CardBody>
        <CardTitle tag="h5">
          500 Page Not Found 
        </CardTitle>
        <CardLink href="/">
            Go to Home
        </CardLink>
        <Button>
          Go somewhere
        </Button>
        </CardBody>
      </Card>
    </Col>
    </Row>
    </form>
    </div>
  )
}

export default PageNotFound;

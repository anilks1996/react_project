import React, { useEffect } from "react";
import { Card, Button, CardHeader, CardFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";

const BookType = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: "0", left: "0", behavior: "smooth" });
  }, []);
  const handleOnChange = (event) => {
    console.log(event.target.value);
  };
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
            home/ accounts master/ book type
          </Card>
        </span>
        <br />
        <Card className="form-shadow">
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">
              Back
            </Button>{" "}
            <Button onClick={() => navigate("/AddPage")} color="secondary">
              Add
            </Button>{" "}
          </CardHeader>

          <table width="100%" border="0" cellspacing="1">
            <tr>
              <td nowrap align="right">
                <label>Book Type Name&nbsp;</label>
              </td>
              <td>
                <input
                  id="bookTypeName"
                  type="text"
                  name="bookTypeName"
                  onChange={handleOnChange}
                />
              </td>
              <td width="60%">
                <a
                  class="btn btn-secondary"
                  href="javaScript:getBookTypes();"
                  style={{ color: "white" }}
                >
                  Filter
                </a>
              </td>
            </tr>
            <input type="hidden" name="page.orderBy" value="id" />
            <input type="hidden" name="page.pageSize" value="10" />
          </table>

          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default BookType;

import React, { useEffect, useState } from "react";
import { BiTable } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Card,CardText,CardBody,CardTitle,CardSubtitle,Row,Col,Button, CardHeader, Table, Modal, ModalBody, ModalFooter} from "reactstrap";
import anil_photo from '../../document_upload/anil.jpeg';
import boss_photo from '../../establishment_module/document/rkgupta.png'
import { useDispatch, useSelector } from "react-redux";
import { ArrowRightAlt } from "@mui/icons-material";
import BorderedTreeView from "../../account_module/accountsAdmin/account_tree/BorderedTreeView";
import { getLoggedInEmployee } from "../../../auth/auth_slice/loginUserSlice";


const FileManager = () => {
  const id=useParams();
  const [employee, setEmployee] = useState();
  const {loggedInEmployee} = useSelector((state)=> state.allstorereducer.user_token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken]=useState();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getLoggedInEmployee());
    window.scrollTo({top:0, left:0, behavior:'smooth'});
    //alert(id.value);
  }, []);

  const [modal, setModal] = useState(false);
  const toggle = () =>{
    setModal(!modal);
  }

    return <div>
    <form style={{minWidth:'76rem;'}}>
    <Row className="mt-3">
    <Col sm="4">
      <Card>
      <CardHeader>
        <FaUser /> My Profile
      </CardHeader>
      <CardBody>
        <CardTitle tag="h5">
          {
            loggedInEmployee && loggedInEmployee.code==='20003'?
            <img src={boss_photo} width="110rem" height="110rem" text-align="center" />  
            :
            <img src="" width="110rem" height="110rem" text-align="center" />  
          }                 
        </CardTitle>
        <CardTitle>
          <b>Name : [{loggedInEmployee && loggedInEmployee.code}] </b>{loggedInEmployee && loggedInEmployee.fullName}
        </CardTitle>
        <CardSubtitle>
          <b>Department: </b>{loggedInEmployee && loggedInEmployee.department && loggedInEmployee.department.name}
        </CardSubtitle>
        </CardBody>
      </Card>
    </Col>
    <Col sm="4">
      <Card>
        <CardHeader>
          Table view <BiTable></BiTable>
        </CardHeader>
        <CardBody>
            {/*  hg */}
            <Table>
              <tbody>
                <tr>
                  <td>
                    <b>Employee Type : </b>{loggedInEmployee && loggedInEmployee.employeeType && loggedInEmployee.employeeType.name}
                  </td>
                </tr>
                <tr>
                  <td>
                  <b>Staff Type : </b>{loggedInEmployee && loggedInEmployee.staffType && loggedInEmployee.staffType.name}
                  </td>
                </tr>
                <tr>
                  <td>
                  <b>Designation : </b>{loggedInEmployee && loggedInEmployee.designation && loggedInEmployee.designation.name}
                  </td>
                </tr>
                <tr>
                  <td>
                  <b>Department : </b>{loggedInEmployee && loggedInEmployee.department && loggedInEmployee.department.name}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Staff Grade : </b>{loggedInEmployee && loggedInEmployee.staffGrade && loggedInEmployee.staffGrade.name}
                  </td>
                </tr> 
              </tbody>
            </Table>
      </CardBody>
      </Card>
    </Col>
    <Col sm="4">
      <Card>
        <CardHeader>
          Table view <BiTable></BiTable> <ArrowRightAlt/>
        </CardHeader>
        <CardBody>
            {/*  hg */}
            <Table>
              <thead>
                <tr>               
                  <th>Action</th>
                  <th>Roles</th>              
                </tr>
              </thead>
            </Table>
            <Table>  
                                  
                <tr>
                  <td rowSpan={6}>Role_Assigned</td>
                  <td>Employee User</td>
                </tr>
                <tr>
                  <td>Establishment Admin</td>
                </tr>
                <tr>
                  <td>Account User</td>
                </tr>
                <tr>
                  <td>Account Approver</td>
                </tr>
                <tr>
                  <td>Project Admin</td>
                </tr>
                <tr>
                  <td>Leave Management</td>
                </tr>
                                                       
            </Table>
      </CardBody>
      </Card>
    </Col>
  </Row>
  
  </form>
    </div>;
  };
  
  export default FileManager;
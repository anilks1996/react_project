import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaList, FaSearch } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

const UploadResources = () => {
    const [modal, setModal] = useState(false);
    const [popupHeader,setPopupHeader] = useState('');
    useEffect(()=>{
        window.scrollTo({left:'0',top:'0',behavior:'smooth'});

    },[]);
    const toggle=()=>{
        setModal(!modal);
    }
    const [userSetup,setUsersetup] = useState();

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
    ];
    
    function getFormattedDate(date) {
        if(date.getFullYear()!=1970){
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
          const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
          return `${day}-${month}-${year}`;
        }
    }
    const searchUser=()=>{
        alert("hello");
    }

  return (
    <div className='form-container'>
        <Card className='p-1 mb-1'>Home / Admin Setup</Card>
        <Card>
            <CardHeader><Button onClick={toggle} className='button-color' title='Click here to add new user'> <FaPlus /> </Button>{" "} <FaList/> List of User List </CardHeader>
            <CardBody>
                <Row>
                    <Col sm={3}>
                        <label>Select User Type : </label>
                        <select id='userType' name='userType' className='form-select'>
                            <option value="Any">Any</option>
                            <option value="Employee">Employee</option>
                            <option value="Others">Others</option>
                        </select>
                    </Col>
                    <Col sm={5}>
                        <label>Search with : </label>
                    </Col>
                    <Col sm={3}>
                        <label>User Id : </label>
                        <input id='userIdName' name='userIdName' className='form-control' />
                    </Col>
                    <Col sm={1} className='mt-4'>
                        <Button onClick={searchUser} color='success'> <FaSearch /> </Button>
                    </Col>
                </Row>
            </CardBody>
            <CardFooter className='p-0 mt-2'>  
                <Row>
                    <Col sm={12}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>User Id</th>
                                    <th>Name</th>
                                    <th>User Types</th>
                                    <th>Roles</th>
                                    <th>Groups</th>
                                    <th>Company</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr></tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </CardFooter>
        </Card>

        {/* Modal */}
        <Modal isOpen={modal} toggle={toggle} size='xl'>
        {
          (userSetup && userSetup.id!==undefined)?
          <ModalHeader toggle={toggle} ><b style={{color:'brown'}}>{userSetup.modelCode} </b>: {popupHeader}</ModalHeader>
          :
          <ModalHeader toggle={toggle}>Description Form</ModalHeader>
        }
          <ModalBody>
            <Row>
              <Col sm="12">
                  <Table>
                    <tbody>
                        <tr>
                            <td>Leave Application Date : </td>
                            <td>{getFormattedDate(new Date(userSetup && userSetup.actionDate))}</td>
                        </tr>
                        <tr>
                            <td>Employee Name : </td>
                            <td>{userSetup && userSetup.modelCode}</td>
                        </tr>
                        <tr>
                            <td>Entered By : </td>
                            <td>{userSetup && userSetup.modelCode}</td>
                        </tr>
                        
                    </tbody>
                </Table>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter >
          <p>User</p>
          </ModalFooter>
        </Modal>
      {/* Modal  */}
    </div>
  )
}

export default UploadResources;
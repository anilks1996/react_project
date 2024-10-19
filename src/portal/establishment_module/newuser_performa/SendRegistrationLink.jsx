import { ArrowBack, Email, Phone } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaWpforms } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

const SendRegistrationLink = () => {
    const navigatePage=useNavigate();
    const [modalForm, setModalForm] = useState(false);
    const [modalLink, setModalLink] = useState(false);

    const goback=()=>{
        window.history.back();
    }
    useEffect(()=>{
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);
    const searchDesignation=()=>{
        navigatePage("/serviceBookDetails/sendRegistrationLink");
    }
    const toggleLink =()=>{
      setModalLink(!modalLink);
    }
    const toggleForm =()=>{
      setModalForm(!modalForm);
    }
    const sendRegistrationLink=()=>{
      toast.success("Email has sent to registered mail Id.",{
        position:toast.POSITION.TOP_CENTER
      });
    }
  return (
    <div>
      <form>
        <Card style={{minWidth:'78rem'}}>
            <CardHeader  className='p-0'>
                <label>Establishment / SendRegistrationLink</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={searchDesignation}>Search</Button>
            </CardHeader>
            <CardBody className='form-shadow'>
                <Row>
                  <Col sm='8'>
                    <label><Email/> Email Id:</label>
                    <input type='email' id='email' name='email' className='form-control' placeholder='enter your mailid'/>
                  </Col>
                  <Col sm='2' style={{alignItems:'center'}}>
                    
                  </Col>
                  <Col sm='2' style={{alignItems:'center'}}>
                    <label>`</label>
                    <Button onClick={toggleForm}><FaWpforms style={{alignItems:'center', fontSize:'60px'}}/>
                      <label>Form Preview</label>
                    </Button>
                    <Link to="/newUserPerforma/createUserRegisterForm">Create User</Link>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col sm='8'>
                    <label><Phone/> Or Mobile No:</label>
                    <input type='text' id='mobileNo' name='mobileNo' className='form-control' placeholder='enter your mobile no'/>
                  </Col>
                  <Col sm='4'>
                  </Col>
                </Row>
                <Row className='mt-4'>
                  <Col sm='6'>
                    <Button className='btn btn-info' onClick={sendRegistrationLink}>Click to send</Button>
                  </Col>
                  <Col sm='6'>
                    <Button className='btn btn-info' onClick={toggleLink}>Sent already link</Button>
                  </Col>
                </Row>
            </CardBody>
            {/* Sig Modal*/}
              <Modal isOpen={modalForm} toggle={toggleForm} fullscreen='sm' size='xl'>
                <ModalHeader toggle={toggleForm} style={{backgroundColor:'#b9d9fa'}}><FaWpforms/> Registration Form</ModalHeader>
                <ModalBody>
                  <Table>
                    <thead>
                      <th>Employee Full Name</th>
                      <th>Signature</th>
                    </thead>
                    
                  </Table>
                </ModalBody>
                <ModalFooter style={{backgroundColor:'#b9d9fa'}}>
                  <Button color="secondary" onClick={toggleForm}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            {/* End Modal */}
            {/* Sig Modal*/}
              <Modal isOpen={modalLink} toggle={toggleLink}>
                <ModalHeader toggle={toggleLink} style={{backgroundColor:'#b9d9fa'}}><FaWpforms/> Registration Link</ModalHeader>
                <ModalBody>
                  <Table>
                    <thead>
                      <th>Employee EmailId</th>
                      <th>Signature</th>
                    </thead>
                    
                  </Table>
                </ModalBody>
                <ModalFooter style={{backgroundColor:'#b9d9fa'}}>
                  <Button color="secondary" onClick={toggleLink}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            {/* End Modal */}

            <CardFooter>

            </CardFooter>
            <ToastContainer>
            </ToastContainer>
        </Card>
      </form>
    </div>
  )
}

export default SendRegistrationLink;

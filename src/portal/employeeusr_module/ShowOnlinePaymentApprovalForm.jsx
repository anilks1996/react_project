import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table} from 'reactstrap';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from 'react-select';


const ShowOnlinePaymentApprovalForm = () => {
    const {id} = useParams();
    const dispatch=useDispatch();
    const [updateUserRegister,setUpdateUserRegister]=useState();
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);
    const {employeeSelection} = useSelector((state)=>state.allstorereducer.employeeData);
    const {banks} = useSelector((state)=>state.allstorereducer.org);
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {updatedUser} = useSelector((state)=>state.allstorereducer.userRegister);
    const {userRegister} = useSelector((state)=>state.allstorereducer.userRegister);
    const [dateofBirth,setDateofBirth] = useState();
    const navigatePage = useNavigate();
    const [supervisorOptions,setSupervisorOptions] = useState();

    useEffect(()=>{
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});     
      //dispatch(showUserRegisterById(id));
      console.log("userregister "+id);
      
      setUpdateUserRegister(userRegister);
      //setDateofBirth();
      if(employeeSelection.length>0){
        const tempEmp=employeeSelection.filter((emp)=>emp.id===(userRegister && userRegister.superVisorNameDto && userRegister.superVisorNameDto.id));      
        if(tempEmp[0]){
          setSupervisorOptions({
            value:tempEmp[0].value,
            label:tempEmp[0].label
          })
        }
      }     
      //alert(fetchedOptions)
      
    }, []);
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
        return `${year}-${month}-${day}`;
    }
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      if(e.target.name==='dob'){
        setDateofBirth(e.target.value);
        setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
      }
        //setUpdateUserRegister({...updateUserRegister, [e.target.name]:e.target.value})
        console.log(updateUserRegister);
    }
    const handleSupervisor=(data,field)=>{
      setSupervisorOptions(data);
      setUpdateUserRegister({...updateUserRegister, ['superVisorNameDto']:data});
      console.log(updateUserRegister);
    }

    const handleSubmit=(actionN)=>{
      if(actionN==='approve'){
        alert('Hello '+actionN)
      }
      if(actionN==='reject'){
        alert('Hello '+actionN)
      }
      if(actionN==='update'){
        alert('Hello '+actionN)
        if(updatedUser){
          navigatePage("/newUserPerforma/newEmployeeList")
        }
      }
    }

  return (
    <div>
      <form style={{height:'45rem'}}>
        <Card style={{minWidth:'78rem', backgroundImage:'linear-gradient(1deg, rgb(255, 255, 255) 0%, rgb(238 247 251) 61%, rgb(255, 255, 255) 100%)'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>Establishment / User Approval Form</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> 
            </CardHeader>
            {userRegister? 
              <div>
                  <CardHeader>                    
                    <Button color="success" style={{width:'100%'}}>
                      Approval User Form {updateUserRegister && updateUserRegister.name} {" "}( {updateUserRegister && updateUserRegister.departmentDto && updateUserRegister.departmentDto.name} )[Status : {updateUserRegister && updateUserRegister.status}]
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <Table >
                      <tbody id='userformId'>               
                        <tr>
                          <td>
                            <label>Employee Name:</label>
                            <input type='text' name='name' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.name} />
                          </td>
                          <td>
                            <label>Father Name:</label>
                            <input type='text' name='nameOfFather' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.nameOfFather} />
                          </td>
                          <td>
                            <label>Mother Name:</label>
                            <input type='text' name='nameOfMother' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.nameOfMother} />
                          </td>
                          <td>
                            <label>Spouse Name:</label>
                            <input type='text' name='nameOfSpouse' className='form-control' onChange={handleChange} value={updateUserRegister && updateUserRegister.nameOfSpouse} />
                          </td>
                        </tr>
                        
                        
                                               
                      </tbody>
                    </Table>    
                  </CardBody>
                  <CardBody>                  
                  <Row>
                    <Col sm={6}>
                      <Button color="danger" onClick={(e)=>{handleSubmit("reject")}} style={{width:'100%'}} title='Click here to reject with remarks'>Reject</Button>
                    </Col>
                    <Col sm={6}>
                      <Button color="success" onClick={(e)=>{handleSubmit("approve")}} style={{width:'100%'}} title='Click here to approve and generate employee Id'>Approve </Button>
                    </Col>
                  </Row>  
                  <Row>
                    <Col sm={12}>
                      <Button color="primary" className='mt-1' onClick={(e)=>{handleSubmit("update")}} style={{width:'100%'}} title='Click here to update user detail before approve'>Update User Detail</Button>
                    </Col>
                  </Row>                 
                  </CardBody>                  
              </div>
              : 
              <div></div>
            }
            <CardFooter>
              <p>footer</p>
            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default ShowOnlinePaymentApprovalForm;


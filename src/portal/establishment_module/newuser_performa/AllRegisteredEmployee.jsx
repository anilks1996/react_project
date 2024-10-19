import { ArrowBack } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { showUserRegistersByAllStatus } from '../establishment_redux/slices/user_performa/UserRegisterSlice';

const AllRegisteredEmployee = () => {
    const navigatePage=useNavigate();
    const dispatch = useDispatch();
    const {updatedUser,userRegisters} = useSelector((state)=>state.allstorereducer.userRegister);
    const goback=()=>{
        window.history.back();
    }
    useEffect(()=>{
      dispatch(showUserRegistersByAllStatus("All"));
    },[]);

    const searchDesignation=()=>{
        navigatePage("/serviceBookDetails/allRegisteredEmployees");
    }
  return (
    <div>
      <form>
        <Card style={{minWidth:'79rem'}}>
            <CardHeader  className='p-0'>
                <label>Establishment / AllRegisteredEmployee</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={searchDesignation}>Search</Button>
            </CardHeader>
            <CardBody>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Employee Name</th>
                      <th>Employee Department</th>
                      <th>Employee Designation</th>
                      <th>Employee Contact No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userRegisters && userRegisters.map((reg,index)=>(
                        <tr key={reg.id}>
                          <td>{index+1}</td>
                          <td>{reg && reg.name}</td>
                          <td>{reg && reg.department && reg.department.name}</td>
                          <td>{reg && reg.designation && reg.designation.name}</td>
                          <td>{reg && reg.contactNo }</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default AllRegisteredEmployee;

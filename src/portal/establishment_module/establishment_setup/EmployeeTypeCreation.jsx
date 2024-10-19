import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { createEmployeeType, editEmployeeType, showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';

const EmployeeTypeCreation = () => {
    const navigatePage=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
    const [updateEmpType, setUpdateEmpType]=useState();
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);

    useEffect(()=>{
      dispatch(showEmployeeType());
      if(id){
        const emptObj = employeeTypes.filter((ele)=>ele.id == id);
        setUpdateEmpType(emptObj[0]);
      }
    }, []);
    console.log(updateEmpType);

    const handleChange=(e)=>{
      if(id){
        setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
        console.log(updateEmpType);
      }else{
        setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value});
        console.log(updateEmpType);
      }     
    }
    const goback=()=>{
        window.history.back();
    }
    const searchEmployeeType=()=>{
        navigatePage("/establishmentSetup/employeeType");
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createEmployeeType(updateEmpType));
      navigatePage("/establishmentSetup/employeeType");
    }
    const handleUpdate=(e)=>{
      e.preventDefault();
      dispatch(editEmployeeType(updateEmpType));
      navigatePage("/establishmentSetup/employeeType");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{minWidth:'70rem'}}>
            <CardHeader  className='p-0'>
              {
                id!==undefined? 
                <label>Establishment / Edit Employee Type</label>
                :
                <label>Establishment / Employee Type Creation</label>
              }                
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={searchEmployeeType}>Search</Button>
                {
                  id!==undefined? 
                  <Button color='success' onClick={handleUpdate}>Update</Button>
                  :
                  <Button color='success' onClick={handleSubmit}>Save</Button>
                }
            </CardHeader>
            <CardBody className='form-shadow'>            
                <Table>
                  <tbody>
                    <tr>
                      <th>EmployeeType Code</th>
                      <td>
                        <input type='text' name='code' className='form-control' onChange={handleChange} value={updateEmpType && updateEmpType.code}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Department Name</th>
                      <td>
                        <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateEmpType && updateEmpType.name}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>
                        <textarea id='description' name='description' className='form-control' onChange={handleChange} value={updateEmpType && updateEmpType.description}/>
                      </td>
                    </tr>
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

export default EmployeeTypeCreation;

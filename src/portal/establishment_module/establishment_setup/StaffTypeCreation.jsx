import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import  {showOrganization}  from '../establishment_redux/slices/establishment_slice/institutionSlice';
import { createStaffType, editStaffType } from '../establishment_redux/slices/establishment_slice/staffTypeSlice';

const StaffTypeCreation = () => {
    const navigatePage=useNavigate();
    const [staffType, setStaffType]=useState();
    const dispatch=useDispatch();
    const {id}=useParams();
    const [updateStaffT, setupdateStaffT]=useState();
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);

    useEffect(()=>{
      dispatch(showOrganization());
      if(id){
        const staffTypeObj = staffTypes.filter((ele)=>ele.id == id);
        setupdateStaffT(staffTypeObj[0]);
      }
    }, []);
    console.log(updateStaffT);

    const handleChange=(e)=>{
      if(id){
        setupdateStaffT({...updateStaffT, [e.target.name]:e.target.value})
        console.log(updateStaffT);
      }else{
        setStaffType({...staffType, [e.target.name]:e.target.value});
        console.log(staffType);
      }     
    }
    const goback=()=>{
        window.history.back();
    }
    const searchDepartment=()=>{
        navigatePage("/establishmentSetup/staffTypeList");
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createStaffType(staffType));
      navigatePage("/establishmentSetup/staffTypeList");
    }
    const handleUpdate=(e)=>{
      e.preventDefault();
      dispatch(editStaffType(updateStaffT));
      navigatePage("/establishmentSetup/staffTypeList");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{minWidth:'70rem'}}>
            <CardHeader  className='p-0'>
              {
                id!==undefined? 
                <label>Establishment / Edit StaffType</label>
                :
                <label>Establishment / StaffType Creation</label>
              }                
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={searchDepartment}>Search</Button>
                {
                  id!==undefined? 
                  <Button color='success' onClick={handleUpdate}>Update</Button>
                  :
                  <Button color='success' onClick={handleSubmit}>Save</Button>
                }
            </CardHeader>
            <CardBody>            
                <Table>
                  <tbody>
                    <tr>
                      <th>StaffType Code</th>
                      <td>
                        <input type='text' name='code' className='form-control' onChange={handleChange} value={updateStaffT && updateStaffT.code}/>
                      </td>
                    </tr>
                    <tr>
                      <th>StaffType Name</th>
                      <td>
                        <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateStaffT && updateStaffT.name}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Retirement Age</th>
                      <td>
                        <input type='text' id='retirementAge' name='retirementAge' className='form-control' onChange={handleChange} value={updateStaffT && updateStaffT.retirementAge}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>
                        <textarea id='description' name='description' className='form-control' onChange={handleChange} value={updateStaffT && updateStaffT.description}/>
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

export default StaffTypeCreation;

import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { createDesignation, editDesignation } from '../establishment_redux/slices/establishment_slice/designationSlice';
import { showStaffType } from '../establishment_redux/slices/establishment_slice/staffTypeSlice';

    const DesignationCreation = () => {
    const navigatePage=useNavigate();
    const [designation, setDesignation]=useState();
    const dispatch=useDispatch();
    const {id}=useParams();
    const [updateDesg, setUpdateDesg]=useState();
    const {staffTypes} = useSelector((state)=>state.allstorereducer.stafft);
    const {designations} = useSelector((state)=>state.allstorereducer.desgn);  

    useEffect(()=>{
      dispatch(showStaffType());
      if(id){
        const desgObj = designations.filter((ele)=> ele.id == id);
        setUpdateDesg(desgObj[0]);
      }
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    const handleChange=(e)=>{
      if(id){
        setUpdateDesg({...updateDesg, [e.target.name]:e.target.value})
        console.log(updateDesg);
      }else{
        setDesignation({...designation, [e.target.name]:e.target.value});
        console.log(designation);
      }     
    }

    const goback=()=>{
        window.history.back();
    }
    const searchDepartment=()=>{
        navigatePage("/establishmentSetup/designationList");
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(createDesignation(designation));
      navigatePage("/establishmentSetup/designationList");
    }
    const handleUpdate=(e)=>{
      e.preventDefault();
      dispatch(editDesignation(updateDesg));
      navigatePage("/establishmentSetup/designationList");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{minWidth:'70rem'}}>
            <CardHeader  className='p-0'>
              {
                id!==undefined? 
                <label>Establishment / Edit Designation</label>
                :
                <label>Establishment / Designation Creation</label>
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
            <CardBody className='form-shadow'>            
                <Table>
                  <tbody>
                    <tr>
                      <th>Department Code</th>
                      <td>
                        <input type='text' name='code' className='form-control' onChange={handleChange} value={updateDesg && updateDesg.code}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Department Name</th>
                      <td>
                        <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateDesg && updateDesg.name}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Priority Level</th>
                      <td>
                        <input type='text' id='level' name='level' className='form-control' onChange={handleChange} value={updateDesg && updateDesg.level}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Staff Type</th>
                      <td key={12}>
                        <select value={updateDesg && updateDesg.staffType && updateDesg.staffType.id} placeholder="select-option" className='form-select' id="staffType.id" name="staffType.id"
                         onChange={(e)=>handleChange(e,'staffType.id')}>
                          {
                            staffTypes.map((staff)=>(
                              <option value={staff.id}>{staff.name}</option>
                            ))
                          }
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>
                        <textarea id='description' name='description' className='form-control' onChange={handleChange} value={updateDesg && updateDesg.description}/>
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

export default DesignationCreation;

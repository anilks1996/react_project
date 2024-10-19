import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { createDepartment, editDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';
import  {showOrganization}  from '../establishment_redux/slices/establishment_slice/institutionSlice';

const DepartmentCreation = () => {
    const navigatePage=useNavigate();
    const [department, setDepartment]=useState();
    const dispatch=useDispatch();
    const {id}=useParams();
    const [updateDept, setUpdateDept]=useState();
    const {departments} = useSelector((state)=>state.allstorereducer.dept);
    const {institutions} = useSelector((state)=>state.allstorereducer.org);

    useEffect(()=>{
      dispatch(showOrganization());
      if(id){
        const departmenObj = departments.filter((ele)=>ele.id == id);
        setUpdateDept(departmenObj[0]);
      }
    }, []);
    console.log(updateDept);

    const handleChange=(e)=>{
      if(id){
        setUpdateDept({...updateDept, [e.target.name]:e.target.value})
        console.log(updateDept);
      }else{
        setDepartment({...department, [e.target.name]:e.target.value});
        console.log(department);
      }     
    }
    const handleOrg=(e)=>{
      alert(e);
      //department.institution.id=data.value;
      //setDepartment({...department.institution.id,[department.institution.id]:data.value});
    }
    const goback=()=>{
        window.history.back();
    }
    const searchDepartment=()=>{
        navigatePage("/establishmentSetup/departmentList");
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createDepartment(department));
      navigatePage("/establishmentSetup/departmentList");
    }
    const handleUpdate=(e)=>{
      e.preventDefault();
      dispatch(editDepartment(updateDept));
      navigatePage("/establishmentSetup/departmentList");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{minWidth:'70rem'}}>
            <CardHeader  className='p-0'>
              {
                id!==undefined? 
                <label>Establishment / Edit Department</label>
                :
                <label>Establishment / Department Creation</label>
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
                      <th>Organization</th>
                      <td>                      
                      {/* 
                      <input type='text' id="institution.id" name="institution.id" className='form-control'
                        onChange={handleChange} value={updateDept && updateDept.institution && updateDept.institution.id}/>                        
                      */}
                        <select value={updateDept && updateDept.institution && updateDept.institution.id} placeholder="select-option" className='form-select' id="institution.id" name="institution.id"
                         onChange={(e)=>handleChange(e,'institution.id')}>
                          {
                            institutions.map((inst)=>(
                              <option value={inst.id}>{inst.name}</option>
                            ))
                          }
                        </select>
                      </td>                     
                    </tr>
                    <tr>
                      <th>Department Code</th>
                      <td>
                        <input type='text' name='code' className='form-control' onChange={handleChange} value={updateDept && updateDept.code}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Department Name</th>
                      <td>
                        <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateDept && updateDept.name}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>
                        <input type='text' id='email' name='email' className='form-control' onChange={handleChange} value={updateDept && updateDept.email}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>
                        <textarea id='description' name='description' className='form-control' onChange={handleChange} value={updateDept && updateDept.description}/>
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

export default DepartmentCreation;

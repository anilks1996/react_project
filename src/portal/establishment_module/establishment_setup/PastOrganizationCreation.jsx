import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { showOrganization } from '../establishment_redux/slices/establishment_slice/institutionSlice';
import { createPastOrgDepartment, editPastOrgDepartment } from '../establishment_redux/slices/establishment_slice/pastOrgDepartmentSlice';


const PastOrganizationCreation = () => {
    const navigatePage=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
    const [updatePastDept, setUpdatePastDept]=useState();
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const {pastOrgDepartments} = useSelector((state)=> state.allstorereducer.pastOrgDept);

    useEffect(()=>{
      dispatch(showOrganization());
      if(id){
        const emptObj = pastOrgDepartments.filter((ele)=>ele.id == id);
        setUpdatePastDept(emptObj[0]);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }
    }, []);
    console.log(updatePastDept);

    const handleChange=(e)=>{
      if(id){
        setUpdatePastDept({...updatePastDept, [e.target.name]:e.target.value})
        console.log(updatePastDept);
      }else{
        setUpdatePastDept({...updatePastDept, [e.target.name]:e.target.value});
        console.log(updatePastDept);
      }     
    }
    const goback=()=>{
        window.history.back();
    }
    const searchEmployeeType=()=>{
        navigatePage("/establishmentSetup/pastOrganizationList");
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createPastOrgDepartment(updatePastDept));
      navigatePage("/establishmentSetup/pastOrganizationList");
    }
    const handleUpdate=(e)=>{
      e.preventDefault();
      dispatch(editPastOrgDepartment(updatePastDept));
      navigatePage("/establishmentSetup/pastOrganizationList");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>      
        <Card style={{minWidth:'65rem'}} >
            <CardHeader  className='p-1'>
              {
                id!==undefined? 
                <label>Establishment / Edit PastOrganization Department</label>
                :
                <label>Establishment / PastOrganization Department Creation</label>
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
            <Card > 
                     
                <Table>
                  <tbody>
                    <tr>
                      <th>Institution Name</th>
                        <td>
                        <select className='form-select' id='institution.id' name='institution.id' placeholder='-- Select type --' value={updatePastDept && updatePastDept.institution && updatePastDept.institution.id}
                        onChange={(e)=>handleChange(e,'institution.id')}>
                        <option value="-1">-- Select Institution --</option>
                        {
                          institutions.map((inst)=>(
                            <option value={inst.id}>{inst.name}</option>
                          ))
                        }
                        </select>
                        </td>
                    </tr>
                    <tr>
                      <th>Code</th>
                      <td>
                        <input type='text' name='code' className='form-control' onChange={handleChange} value={updatePastDept && updatePastDept.code}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Past Department Type Name</th>
                      <td>
                        <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updatePastDept && updatePastDept.name}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>
                        <input type='text' id='email' name='email' className='form-control' onChange={handleChange} value={updatePastDept && updatePastDept.email}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>
                        <textarea id='description' name='description' className='form-control' onChange={handleChange} value={updatePastDept && updatePastDept.description}/>
                      </td>
                    </tr>
                  </tbody>
                </Table>               
            </Card>          
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default PastOrganizationCreation;

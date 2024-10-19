import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { createSubEmployeeType, editSubEmployeeType, showSubEmployeeType } from '../establishment_redux/slices/establishment_slice/subEmployeeTypeSlice';
import { showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';


const SubEmployeeTypeCreation = () => {
    const navigatePage=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
    const [updateSubEmpType, setUpdateSubEmpType]=useState();
    const {subEmployeeTypes} = useSelector((state)=>state.allstorereducer.subEmpT);
    const {employeeTypes} = useSelector((state)=>state.allstorereducer.empt);

    useEffect(()=>{
      dispatch(showEmployeeType());
      if(id){
        const emptObj = subEmployeeTypes.filter((ele)=>ele.id == id);
        setUpdateSubEmpType(emptObj[0]);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }
    }, []);
    console.log(updateSubEmpType);

    const handleChange=(e)=>{
      if(id){
        setUpdateSubEmpType({...updateSubEmpType, [e.target.name]:e.target.value})
        console.log(updateSubEmpType);
      }else{
        setUpdateSubEmpType({...updateSubEmpType, [e.target.name]:e.target.value});
        console.log(updateSubEmpType);
      }     
    }
    const goback=()=>{
        window.history.back();
    }
    const searchEmployeeType=()=>{
        navigatePage("/establishmentSetup/SubEmployeeTypeList");
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createSubEmployeeType(updateSubEmpType));
      navigatePage("/establishmentSetup/SubEmployeeTypeList");
    }
    const handleUpdate=(e)=>{
      e.preventDefault();
      dispatch(editSubEmployeeType(updateSubEmpType));
      navigatePage("/establishmentSetup/SubEmployeeTypeList");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{minWidth:'70rem'}}>
            <CardHeader  className='p-1'>
              {
                id!==undefined? 
                <label>Establishment / Edit SubEmployee Type</label>
                :
                <label>Establishment / SubEmployee Type Creation</label>
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
            <CardBody>            
                <Table>
                  <tbody>
                    <tr>
                      <th>SubEmployeeType Code</th>
                      <td>
                        <input type='text' name='code' className='form-control' onChange={handleChange} value={updateSubEmpType && updateSubEmpType.code}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Employee Type</th>
                      <td>
                        <select className='form-select' id='employeeType.id' name='employeeType.id' placeholder='-- Select type --' value={updateSubEmpType && updateSubEmpType.employeeType && updateSubEmpType.employeeType.id}
                        onChange={(e)=>handleChange(e,'employeeType.id')}>
                        <option value="-1">-- Select Employee Type --</option>
                        {
                          employeeTypes.map((empt)=>(
                            <option value={empt.id}>{empt.code} - {empt.name}</option>
                          ))
                        }
                        </select>
                        </td>
                    </tr>
                    <tr>
                      <th>SubEmployee Type Name</th>
                      <td>
                        <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateSubEmpType && updateSubEmpType.name}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>
                        <textarea id='description' name='description' className='form-control' onChange={handleChange} value={updateSubEmpType && updateSubEmpType.description}/>
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

export default SubEmployeeTypeCreation;

import { ArrowBack, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { deleteDepartment, searchByInputData, showDepartment } from '../establishment_redux/slices/establishment_slice/departmentSlice';

const DepartmentList = () => {
    const navigatePage=useNavigate();
    const dispatch=useDispatch();
    const [searchData, setSearchData] = useState("");
    const {departments,loading, error} = useSelector((state)=>state.allstorereducer.dept);

    const goback=()=>{
        window.history.back();
    }
    const addNewDepartment=()=>{
        navigatePage("/establishmentSetup/department");
    }
    useEffect(()=>{
      dispatch(showDepartment());
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    },[]);

    useEffect(()=>{
      //dispatch(searchByInputData(searchData))
    }, [searchData])

    const updateDept=(e, id)=>{
      alert(id);
      navigatePage(`/establishmentSetup/editDepartment/${id}`);
    }
    
    const viewDept=(e, id)=>{
      alert(id);
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteDepartment(id));
        dispatch(showDepartment());
      } 
    }

  return (
    <div>
      <form style={{height:'45rem'}}>
        <Card style={{minWidth:'70rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>Establishment / DepartmentList</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={addNewDepartment}>Add New</Button>
            </CardHeader>
            {loading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody>
              <input type='search' aria-label='search' placeholder='Search department' className='form-control'
              onChange={(e)=>setSearchData(e.target.value)}/>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Code</th>
                        <th scope='row'>Name</th>
                        <th scope='row'>Email</th>
                        <th scope='row'>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      departments && departments.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.code}</td>
                          <td>{ele.name}</td>
                          <td>{ele.email}</td>
                          <td>{ele.description}</td>
                          <td>
                          <Link to={`/establishmentSetup/editDepartment/${ele.id}`}><FaPencilAlt color='green'/></Link> 
                          {" "}<Link onClick={(e)=>{deleteDept(ele.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                          {" "}<Link onClick={(e)=>{viewDept(e, ele.id)}}><FaSearch/> </Link>
                          </td>
                        </tr>
                      ))
                    }                      
                    </tbody>
                </Table>
            </CardBody>
            }
            <CardFooter>
              <p>footer</p>
            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default DepartmentList;

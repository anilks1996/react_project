import { ArrowBack, DeleteOutline } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { deleteQualification, showQualification } from '../establishment_redux/slices/establishment_slice/qualificationSlice';

const QualificationTypeList = () => {
    const navigatePage=useNavigate();
    const dispatch=useDispatch();

    const {qualificationsTypes,loading, error} = useSelector((state)=>state.allstorereducer.qualType);

    const goback=()=>{
        window.history.back();
    }
    const addNewEmpType=()=>{
        navigatePage("/establishmentSetup/qualificationTypeCreation");
    }
    useEffect(()=>{
      dispatch(showQualification());
    },[]);

    const viewDept=(e, id)=>{
      alert(id);
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteQualification(id));
        dispatch(showQualification());
      } 
    }

  return (
    <div>
      <form style={{height:'45rem'}}>
        <Card style={{minWidth:'70rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>Establishment / Qualification Type List</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={addNewEmpType}>Add New</Button>
            </CardHeader>
            {loading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Code</th>
                        <th scope='row'>Name</th>
                        <th scope='row'>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      qualificationsTypes && qualificationsTypes.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.code}</td>
                          <td>{ele.name}</td>
                          <td>{ele.type}</td>
                          <td><Link to={`/establishmentSetup/editQualificationType/${ele.id}`}><FaPencilAlt color='green'/></Link> 
                          <Link  onClick={(e)=>{deleteDept(ele.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                          <Link onClick={(e)=>{viewDept(e, ele.id)}}><FaSearch/> </Link>
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

export default QualificationTypeList;

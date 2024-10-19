import { ArrowBack, DeleteOutline } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Popover, PopoverBody, PopoverHeader, Table, UncontrolledPopover } from 'reactstrap';
import { deleteSubEmployeeType, showSubEmployeeType } from '../establishment_redux/slices/establishment_slice/subEmployeeTypeSlice';


const SubEmployeeTypeList = () => {
    const navigatePage=useNavigate();
    const dispatch=useDispatch();

    const {subEmployeeTypes,loading, error} = useSelector((state)=>state.allstorereducer.subEmpT);

    const goback=()=>{
        window.history.back();
    }
    const addNewEmpType=()=>{
        navigatePage("/establishmentSetup/subEmployeeTypeCreation");
    }
    useEffect(()=>{
      dispatch(showSubEmployeeType());
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    },[]);

    const viewDept=(e, id)=>{
      alert(id);
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteSubEmployeeType(id));
        dispatch(showSubEmployeeType());
      } 
    }

  return (
    <div>
      <form style={{height:'45rem'}}>
        <Card style={{minWidth:'70rem'}} className='form-shadow'>
            <CardHeader  className='p-1'>
                <label>Establishment / SubEmployeeType List</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={addNewEmpType}>Add New</Button>
            </CardHeader>
            
            <div>            
            <Button id="PopoverClick" type="button">
              Launch Popover (Click)
            </Button>
              <UncontrolledPopover placement="bottom" target="PopoverClick" trigger="click" >
              <PopoverHeader>
                Click Trigger
              </PopoverHeader>
              <PopoverBody>
                Clicking on the triggering element makes this popover appear. Clicking on it again will make it disappear. You can select this text, but clicking.
              </PopoverBody>
              </UncontrolledPopover>
            </div>

            {loading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody className='box-shadow'>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Code</th>
                        <th scope='row'>Employee Type</th>
                        <th scope='row'>Sub Employee Type</th>
                        <th scope='row'>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      subEmployeeTypes && subEmployeeTypes.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.code}</td>
                          <td>{ele.employeeType && ele.employeeType.id}</td>
                          <td>{ele.name}</td>
                          <td>{ele.description}</td>
                          <td><Link to={`/establishmentSetup/editSubEmpType/${ele.id}`}><FaPencilAlt color='green'/></Link> 
                          <Link  onClick={(e)=>{deleteDept(ele.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                          <Link onClick={(e)=>{viewDept(e, ele.id)}}>
                          <FaSearch/> 
                          </Link>
                                            
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

export default SubEmployeeTypeList;

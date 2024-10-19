import { ArrowBack, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { createEmployeeType, deleteEmployeeType, editEmployeeType, showEmployeeType } from '../establishment_redux/slices/establishment_slice/employeeTypeSlice';


const EmployeeTypeList = () => {
    const dispatch=useDispatch();
    const [updateEmpType, setUpdateEmpType]=useState();
    const [modal, setModal] = useState(false);
    const toggle = () =>{
      setModal(!modal);
      //dispatch(showEmployeeType());
      setUpdateEmpType(null);
    }
    const {employeeTypes,loading} = useSelector((state)=>state.allstorereducer.empt);
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
      console.log(updateEmpType);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createEmployeeType(updateEmpType));
      setModal(false);
      dispatch(showEmployeeType());
      setUpdateEmpType(null);
    }
    useEffect(()=>{
      dispatch(showEmployeeType());
    },[]);

    const updateDept=(empObj)=>{
      setModal(true);
      setUpdateEmpType(empObj);
      //navigatePage(`/establishmentSetup/editEmployeeType/${id}`);
    }
    const updateEmployeeType=(empObj)=>{
      dispatch(editEmployeeType(empObj));
      setModal(false);
      dispatch(showEmployeeType());
    }
    const viewDept=(e, id)=>{
      alert(id);
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteEmployeeType(id));
        dispatch(showEmployeeType());
        setModal(false);
      } 
    }

  return (
    <div>
      <form style={{height:'45rem'}}>
        <Card style={{minWidth:'70rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>Establishment / EmployeeType List</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='danger' onClick={toggle}>Add New</Button>
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
                        <th scope='row'>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      employeeTypes && employeeTypes.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.code}</td>
                          <td>{ele.name}</td>
                          <td>{ele.description}</td>
                          <td><Link onClick={(e)=>{updateDept(ele)}}><FaPencilAlt color='green'/></Link> 
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
            {/* Modal */}
            <Button color="danger" onClick={toggle}>
              Add New
            </Button>
            <Modal isOpen={modal} toggle={toggle} >
            {
              updateEmpType && updateEmpType.id!==undefined?
              <ModalHeader>Update Employee Type</ModalHeader>
              :
              <ModalHeader>New Employee Type</ModalHeader>
            }
              <ModalBody>
                <Table>
                  <tbody>
                 
                    <tr>
                      <td>EmployeeType Code</td>
                      <td>
                        <input type='text' name='code' className='form-control' onChange={handleChange} value={updateEmpType && updateEmpType.code}/>
                      </td>
                    </tr>
                    <tr>
                      <td>Department Name</td>
                      <td>
                        <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateEmpType && updateEmpType.name}/>
                      </td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>
                        <textarea id='description' name='description' className='form-control' onChange={handleChange} value={updateEmpType && updateEmpType.description}/>
                      </td>
                    </tr>
                  </tbody>
                </Table>    
              </ModalBody>
              <ModalFooter>
                {
                  updateEmpType && updateEmpType.id!==undefined?
                  <Button color='success' onClick={(e)=>{updateEmployeeType(updateEmpType)}}>Update</Button>
                  :
                  <Button color='success' onClick={handleSubmit}>Save</Button>
                }

                {' '}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
        {/* Modal  */}
            <CardFooter>
              <p>footer</p>
            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default EmployeeTypeList;

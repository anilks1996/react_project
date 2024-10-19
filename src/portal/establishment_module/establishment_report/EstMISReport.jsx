import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table } from 'reactstrap';
import { showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import Select from "react-select";

const EstMISReport = () => {
    const navigatePage=useNavigate();
    const [allEmployeesCols, setAllEmployeesCols]=useState([]);
    const [empName, setEmpName] = useState([]);
    const [employee,setEmployee]=useState();
    const {institutions} = useSelector((state)=>state.allstorereducer.org);
    const {allEmployees,employeeSelection} = useSelector((state)=>state.allstorereducer.employeeData);
    const dispatch = useDispatch();
    const goback=()=>{
        window.history.back();
    }
    useEffect(()=>{
      dispatch(showEmployeePopup());
      alert(employeeSelection)
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
    }, []);
    function handleSelect(data,field) {
        //alert(data.label+", "+data.value+", "+field)  
        setEmployee({...employee,[field]:data.value});         
        console.log(employee)
        setEmpName(data);
    }
    const addNewEmpType=()=>{
        navigatePage("/establishmentSetup/addLocationCreation");
    }
  return (
    <div>
      <form>
        <Card style={{minWidth:'70rem'}}>
            <CardHeader  className='p-0'>
                <label>Establishment / AddLocationList</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={addNewEmpType}>Add New</Button>
            </CardHeader>
            <CardBody className='form-shadow'>
                <Card>
                  <Row>
                      <Col>
                          Employee Code / Name
                          <Select options={employeeSelection} id='id' placeholder="- Search option -" value={empName}
                                      onChange={(e)=>handleSelect(e,'id')}
                                      isSearchable={true}>                             
                                  </Select> 
                      </Col>
                  </Row>
                </Card>
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default EstMISReport;

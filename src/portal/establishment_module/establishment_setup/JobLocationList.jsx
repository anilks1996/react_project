import { ArrowBack, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner, Table } from 'reactstrap';
import { fetchAllEmployeesCols } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import Select from 'react-select';
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { showJobLocation } from '../establishment_redux/slices/establishment_slice/jobLocationSlice';

const JobLocationList = () => {
    const navigatePage=useNavigate();
    const {allEmployees, employeeSelection} = useSelector((state)=>state.allstorereducer.employeeData);
    const {jobLocations,loading} = useSelector((state)=>state.allstorereducer.jobLoc);
    const dispatch=useDispatch();
    const [showEmpName,setShowEmpName] = useState();
    const goback=()=>{
        window.history.back();
    }
    const addNewEmpType=()=>{
        navigatePage("/establishmentSetup/jobLocationCreation");
    }
    const handleSelect=(data, eid)=>{
      alert(data.value+",  "+eid)
      setShowEmpName(data);
    }
    const viewJobLoc=()=>{

    }
    const deleteJobLoc=()=>{

    }
    useEffect(()=>{
      dispatch(fetchAllEmployeesCols());
      dispatch(showJobLocation());
      //alert(jobLocations+",   "+employeeSelection)
      window.scrollTo({top:0,left:0,behavior:'smooth'});
    }, []);

    if(loading){
      <Spinner/>
    }
  return (
    <div>
      <form>
        <Card style={{minWidth:'70rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>Establishment / JobLocationList</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={addNewEmpType}>Add New</Button>
            </CardHeader>
            <CardBody>
                <Table>
                  <tr>
                    <td>Employee Name</td>
                    <td>
                      <Select options={employeeSelection} id='id' placeholder="- Search option -" 
                        value={showEmpName}
                        onChange={(e)=>handleSelect(e,'id')}
                        isSearchable={true}>                             
                      </Select> 
                    </td>
                  </tr>
                </Table>
                <Table>
                  <tr>
                    <Table>
                      <thead>
                        <th>Index</th>
                        <th>Employee Name</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Status</th>
                        <th>Action</th>
                      </thead>
                    
                      {
                        jobLocations && jobLocations.length > 0 ?
                        <tbody>
                          {
                            jobLocations.map((job,index)=>(
                              <tr key={job.id}>
                                <td>{index+1}</td>
                                <td>{job && job.employee && job.employee.fullName}</td>
                                <td>{job.fromDate}</td>
                                <td>{job.toDate}</td>
                                <td>{job && job.city && job.city.name}</td>
                                <td>{job && job.city && job.city.state && job.city.state.name}</td>
                                <td>{job && job.city && job.city.state && job.city.state.country && job.city.state.country.name}</td>
                                <td>{job && job.city && job.status}</td>
                                <td>
                                  <Link to={`/establishmentSetup/editPastOrganizationDept/${job.id}`}><FaPencilAlt color='green'/></Link> 
                                  <Link  onClick={(e)=>{deleteJobLoc(job.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                                  <Link onClick={(e)=>{viewJobLoc(e, job.id)}}>
                                  <FaSearch/> 
                                  </Link>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                        :
                        <div></div>
                      }
                      
                    </Table>
                  </tr>
                </Table>
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default JobLocationList;

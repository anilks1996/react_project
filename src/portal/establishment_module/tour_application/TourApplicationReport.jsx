import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Spinner, Table } from 'reactstrap';
import { populateAccCompanyFinancialYearList } from '../../account_module/accounts_redux/slices/accounts_slice/accCompanyFinancialSlice';
import { findTourByStatus, findTourByStatusOrFinancialYear } from './tour_redux/tourSlices';

const TourApplicationReport = () => {
    const navigatePage=useNavigate();
    const dispatch = useDispatch();
    const [fyearValue,setFYearValue] = useState(null);
    const [statusValue,setStatusValue] = useState(null);
    const [tourObj,setTourObj] = useState(null);
    const {acfy,acfyList,acfyLoading}=useSelector((state)=>state.allstorereducer.acfy);
    const {tour,tours,tourUodateLoading}=useSelector((state)=>state.allstorereducer.tours);
    
    const goback=()=>{
        window.history.back();
    }
    useEffect(()=>{
      dispatch(populateAccCompanyFinancialYearList());

    },[]);
    const searchDesignation=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      if(e.target.name==='accCompanyFinancialYear.id'){
        setFYearValue(e.target.value);
      }else if(e.target.name==='status'){
        setStatusValue(e.target.value);
      }
    }
    const getTourReport=()=>{
      const tourO={...tourObj,["accCompanyFinancialYear"]:fyearValue,"code":"sbi",
        ["status"]:statusValue,
      }
      dispatch(findTourByStatusOrFinancialYear({param1:statusValue, param2:fyearValue}));
    }

  return (
    <div>
      <form>
        <Card style={{minWidth:'80rem', fontSize:'0.9rem'}}>
            <CardHeader  className='p-0'>
                <label>Establishment / TourApplicationReport</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={searchDesignation}>Search</Button>
            </CardHeader>
            <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <td style={{width:'50%'}}>
                        <label>Financial Year : </label>
                        <select id='accCompanyFinancialYear.id' name='accCompanyFinancialYear.id' className='form-select' value={fyearValue} onChange={handleChange}>
                        <option value={-1}>-- Select --</option>
                          {
                            acfyList && acfyList.map((acfy)=>(
                              <option value={acfy.id}>{acfy && acfy.companyName}-{acfy && acfy.fyName}</option>
                            ))
                          }
                        </select>
                      </td>
                      <td style={{width:'50%'}}>
                        <label>Status : </label>
                        <select id='status' name='status' className='form-select' value={statusValue} onChange={handleChange}>
                          <option value={-1}>-- Select --</option>
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Cancel">Cancel</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Dispatched To Account">Dispatched To Account</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button className='btn btn-warning' onClick={getTourReport}>Get Result</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
            </CardBody>
            <CardBody>
            {
              tours && tours.length>0 && !tourUodateLoading?
            <Table striped>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Employee</th>
                  <th>Tour Date</th>
                  <th>Status</th>
                  <th>Tour No</th>
                </tr>
              </thead>
              <tbody>
              {
                tours && tours.map((tour,index)=>(
                  <tr key={tour.id}>
                    <td>{index+1}</td>
                    <td>{tour && tour.employee && tour.employee.fullName}</td>
                    <td>{tour && tour.approvalDate}</td>
                    <td>{tour && tour.status}</td>
                    <td>{tour && tour.fileNo}</td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
            :
            <div style={{alignContent :'center'}}>
              <Row>
                <Col sm={6}></Col>
                <Col sm={6}> Loading ...<Spinner style={{color:'green'}}/> </Col>
              </Row>
            </div>
            }  
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default TourApplicationReport;

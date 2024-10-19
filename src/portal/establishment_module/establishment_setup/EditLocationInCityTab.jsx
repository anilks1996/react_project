import React, { useEffect, useState } from 'react'
import { BiTable } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Spinner, Table } from 'reactstrap';
import { Col, Row} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCity, deleteLocationInCity, deleteState, showCity, showLocationInCity, showState } from '../establishment_redux/slices/establishment_slice/countryStateCityLocationSlice';
import { FaPencilAlt, FaPlus, FaSearch } from 'react-icons/fa';
import { DeleteOutline } from '@mui/icons-material';
import CreateLocationInCityModel from './CreateLocationInCityModel';


const EditLocationInCityTab = () => {
    const navigatePage=useNavigate();
    const dispatch = useDispatch();
    const {countries,states,cities,locationInCities,loading} = useSelector((state)=> state.allstorereducer.cscLocation);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const goback=()=>{
        window.history.back();
    }
    useEffect(()=>{
        dispatch(showLocationInCity());
    //    setFilteredCountries(countries);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }, []);
    // const handleFilter=(e)=>{
    //     if(countries.length>1){
    //         const filtered=countries.filter((ele)=>ele.code.toLowerCase().includes(e.target.value.toLowerCase()) || ele.name.toLowerCase().includes(e.target.value.toLowerCase()));
    //         setFilteredCountries(filtered);
    //     }
    // }
    
    if(loading){
        return <Spinner/>
    }
    const closeModel=()=>{
        dispatch(showLocationInCity());
    //    setFilteredCountries(countries); 
    //    alert('Closed'+countries.length);  
        setShowModel(false);
    }
    const viewDept=(e, id)=>{
        alert(id);
      }
      const deleteDept=(id)=>{
        if(window.confirm("Are you sure? to delete record")){
          dispatch(deleteLocationInCity(id));
          dispatch(showLocationInCity());          
    //      setFilteredCountries(countries);
          setShowModel(false);
        } 
      }
  return (
    <div>
        <form style={{minHeight:'40rem', minWidth:'75rem'}} className='form-shadow'>
            <Row>
            <Col sm="12">
            <Card>
                <CardHeader>
                    Search Criteria {'  '}
                    <Button onClick={()=> setShowModel(true)} title='Click here to add new country' color='primary'><FaPlus/></Button>
                </CardHeader>
                
                <CardBody>
                <div>             
                    {
                        showModel && <CreateLocationInCityModel closeModel={closeModel}/>
                    }
                </div>
                    <Table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                            <td scope="row">
                            <label>Search Country Code</label>
                                <input type='text' id='code' name='code' className='form-control' /*onChange={handleFilter}*//>
                            </td>
                            <td scope="row">
                                <label>Search Country Name </label>
                                <input type='text' id='name' name='name' className='form-control' /*onChange={handleFilter}*//>
                            </td>                               
                            </tr>
                        </tbody>                   
                    </Table>
                    
                    <span><BiTable/> Country Details</span><hr/>
                    {
                        locationInCities && locationInCities.length>0?                       
                        <Table striped>
                            <thead>
                                <tr>
                                    <th scope='row'>#</th>
                                    <th scope='row'>Country</th>
                                    <th scope='row'>State</th>
                                    <th scope='row'>City</th>
                                    <th scope='row'>Code</th>
                                    <th scope='row'>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                locationInCities && locationInCities.map((ele,index)=>(
                                    <tr key={ele.id}>
                                        <td>{index+1}</td>
                                        <td>{ele.city && ele.city.state && ele.city.state.country && ele.city.state.country.id}</td>
                                        <td>{ele.city && ele.city.state && ele.city.state.id}</td>
                                        <td>{ele.city && ele.city.id}</td>
                                        <td>{ele.code}</td>
                                        <td>{ele.name}</td>
                                        <td>
                                            <Link to={`/establishmentSetup/editLocationInCity/${ele.id}`}><FaPencilAlt color='green'/></Link> 
                                            {" "}<Link onClick={(e)=>{deleteDept(ele.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                                            {" "}<Link onClick={(e)=>{viewDept(e, ele.id)}}><FaSearch/> </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    :
                        <div>Data not found!</div>
                    }
                </CardBody>             
            </Card>
            </Col>
        </Row>
        </form>
    </div>
  )
}

export default EditLocationInCityTab;

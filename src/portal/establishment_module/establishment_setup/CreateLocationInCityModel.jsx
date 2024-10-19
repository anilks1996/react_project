import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Table } from 'reactstrap';
import { createCity, createLocationInCity, createState, editCity, editLocationInCity, editState } from '../establishment_redux/slices/establishment_slice/countryStateCityLocationSlice';


const CreateLocationInCityModel = ({closeModel}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigatePage=useNavigate();
    const {countries,states,cities,locationInCities,loading} = useSelector((state)=> state.allstorereducer.cscLocation);
    const [locationInCity, setLocationInCity] = useState();
    const [updateLocationInCity, setUpdateLocationInCity] = useState();

    useEffect(()=>{
        // dispatch(showCountry());
        // dispatch(showState());
      if(id){
        const departmenObj = locationInCities.filter((ele)=>ele.id == id);
        setUpdateLocationInCity(departmenObj[0]);
      }
        document.body.style.overflowY = "hidden";
        return ()=>{
            document.body.style.overflowY = "scroll";
        }
    }, []);

    const handleChange=(e)=>{
        if(id){
          setUpdateLocationInCity({...updateLocationInCity, [e.target.name]:e.target.value})
          console.log(updateLocationInCity);
        }else{
          setLocationInCity({...locationInCity, [e.target.name]:e.target.value});
          console.log(locationInCity);
        }     
      }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createLocationInCity(locationInCity));
        disablePopup();
      }
      const disablePopup=(()=>{
        closeModel(false);
      });
      const handleUpdate=(e)=>{
        e.preventDefault();
        dispatch(editLocationInCity(updateLocationInCity));
        //closeModel(false);
        navigatePage("/establishmentSetup/editLocationTab");
      }
      const handleClose=()=>{
        //disablePopup();
        navigatePage("/establishmentSetup/editLocationTab");
      }
  return (
    <>
    <div className='mymodal-wrapper' onClick={closeModel}></div>
    <div className='mymodal-popup'>
        <form method='post'>
            <Card>
                <CardHeader>
                    <label>Add LocationInCity Form</label>
                </CardHeader>
                <CardBody>
                    <Table>
                        <tbody>
                            <tr>
                                <th scope='row'>Country Name</th>
                                <td>
                                <select id='locationInCity.city.state.country.id' name='locationInCity.city.state.country.id' className='form-select' onChange={handleChange} 
                                value={updateLocationInCity && updateLocationInCity.city && updateLocationInCity.city.state && updateLocationInCity.city.state.country && updateLocationInCity.city.state.country.id}>
                                    {
                                      countries.map((inst)=>(
                                        <option value={inst.id}>{inst.name}</option>
                                      ))
                                    }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>State Name</th>
                                <td>
                                <select id='locationInCity.city.state.id' name='locationInCity.city.state.id' className='form-select' onChange={handleChange} 
                                value={updateLocationInCity && updateLocationInCity.city && updateLocationInCity.city.state && updateLocationInCity.city.state.id}>
                                    {
                                      states.map((inst)=>(
                                        <option value={inst.id}>{inst.name}</option>
                                      ))
                                    }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>City</th>
                                <td>
                                    <select id='locationInCity.city.id' name='locationInCity.city.id' className='form-select' onChange={handleChange} 
                                    value={updateLocationInCity && updateLocationInCity.city && updateLocationInCity.city.id}>
                                    {
                                      cities.map((inst)=>(
                                        <option value={inst.id}>{inst.name}</option>
                                      ))
                                    }
                                    </select>
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope='row'>Location Code</th>
                                <td>
                                    <input type='text' id='code' name='code' className='form-control' onChange={handleChange} value={updateLocationInCity && updateLocationInCity.code}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>Location Name</th>
                                <td>
                                    <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateLocationInCity && updateLocationInCity.name}/>
                                </td>
                            </tr>                            
                            {
                                id!==undefined? 
                                <tr>
                                    <th><Button color='success' onClick={handleUpdate}>Update</Button></th>
                                    <th scope='row'><Button onClick={handleClose} color='warning'> Cancel</Button></th>
                                </tr>
                                
                                
                                :
                                <tr>
                                    <th><Button color='success' onClick={handleSubmit}>Save</Button></th>
                                    <th scope='row'><Button onClick={closeModel} color='warning'> Cancel</Button></th>
                                </tr>
                                
                              }                                                            
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </form>
    </div>
    </>
  )
}

export default CreateLocationInCityModel;

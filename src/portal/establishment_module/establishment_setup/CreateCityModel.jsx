import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Table } from 'reactstrap';
import { createCity, createState, editCity, editState } from '../establishment_redux/slices/establishment_slice/countryStateCityLocationSlice';


const CreateCityModel = ({closeModel}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigatePage=useNavigate();
    const {countries,states,cities,loading} = useSelector((state)=> state.allstorereducer.cscLocation);
    const [city, setCity] = useState();
    const [updateCity, setUpdateCity] = useState();

    useEffect(()=>{
        // dispatch(showCountry());
        // dispatch(showState());
      if(id){
        const departmenObj = cities.filter((ele)=>ele.id == id);
        setUpdateCity(departmenObj[0]);
      }
        document.body.style.overflowY = "hidden";
        return ()=>{
            document.body.style.overflowY = "scroll";
        }
    }, []);

    const handleChange=(e)=>{
        if(id){
          setUpdateCity({...updateCity, [e.target.name]:e.target.value})
          console.log(updateCity);
        }else{
          setCity({...city, [e.target.name]:e.target.value});
          console.log(city);
        }     
      }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createCity(city));
        disablePopup();
      }
      const disablePopup=(()=>{
        closeModel(false);
      });
      const handleUpdate=(e)=>{
        e.preventDefault();
        dispatch(editCity(updateCity));
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
                    <label>Add Country Form</label>
                </CardHeader>
                <CardBody>
                    <Table>
                        <tbody>
                            <tr>
                                <th scope='row'>Country Name</th>
                                <td>
                                    <select id='country.id' name='country.id' className='form-select' onChange={handleChange} 
                                    value={updateCity && updateCity.state && updateCity.state.country && updateCity.state.country.id}>
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
                                    <select id='state.id' name='state.id' className='form-select' onChange={handleChange} 
                                    value={updateCity && updateCity.state && updateCity.state.id}>
                                    {
                                      states.map((inst)=>(
                                        <option value={inst.id}>{inst.name}</option>
                                      ))
                                    }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>City Code</th>
                                <td>
                                    <input type='text' id='code' name='code' className='form-control' onChange={handleChange} value={updateCity && updateCity.code}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>City Name</th>
                                <td>
                                    <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateCity && updateCity.name}/>
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

export default CreateCityModel;

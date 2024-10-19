import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Table } from 'reactstrap';
import { createCountry, editCountry } from '../establishment_redux/slices/establishment_slice/countryStateCityLocationSlice';

const CreateCountryModel = ({closeModel}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigatePage=useNavigate();
    const {countries,loading} = useSelector((state)=> state.allstorereducer.cscLocation);
    const [country, setCountry] = useState();
    const [updateCountry, setUpdateCountry] = useState();

    useEffect(()=>{
      if(id){
        const departmenObj = countries.filter((ele)=>ele.id == id);
        setUpdateCountry(departmenObj[0]);
      }
        document.body.style.overflowY = "hidden";
        return ()=>{
            document.body.style.overflowY = "scroll";
        }
    }, []);

    const handleChange=(e)=>{
        if(id){
          setUpdateCountry({...updateCountry, [e.target.name]:e.target.value})
          console.log(updateCountry);
        }else{
          setCountry({...country, [e.target.name]:e.target.value});
          console.log(country);
        }     
      }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createCountry(country));
        disablePopup();
      }
      const disablePopup=(()=>{
        closeModel(false);
      });
      const handleUpdate=(e)=>{
        e.preventDefault();
        dispatch(editCountry(updateCountry));
        navigatePage("/establishmentSetup/editLocationTab");
      }
      const handleClose=()=>{
        navigatePage("/establishmentSetup/editLocationTab");
      }
  return (
    <>
    <div className='mymodal-wrapper' onClick={closeModel}></div>
    <div className='mymodal-popup'>
        <form>
            <Card>
                <CardHeader>
                    <label>Add Country Form</label>
                </CardHeader>
                <CardBody>
                    <Table>
                        <tbody>
                            <tr>
                                <th scope='row'>Country Code</th>
                                <td>
                                    <input type='text' id='code' name='code' className='form-control' onChange={handleChange} value={updateCountry && updateCountry.code}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>Country Name</th>
                                <td>
                                    <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateCountry && updateCountry.name}/>
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
                                    <th scope='row'><Button onClick={handleClose} color='warning'> Cancel</Button></th>
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

export default CreateCountryModel;

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Table } from 'reactstrap';
import { createState, editState } from '../establishment_redux/slices/establishment_slice/countryStateCityLocationSlice';


const CreateStateModel = ({closeModel}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigatePage=useNavigate();
    const {countries,states,loading} = useSelector((state)=> state.allstorereducer.cscLocation);
    const [stat, setStat] = useState();
    const [updateStat, setUpdateStat] = useState();

    useEffect(()=>{
        // dispatch(showCountry());
        // dispatch(showState());
      if(id){
        const departmenObj = states.filter((ele)=>ele.id == id);
        setUpdateStat(departmenObj[0]);
      }
        document.body.style.overflowY = "hidden";
        return ()=>{
            document.body.style.overflowY = "scroll";
        }
    }, []);

    const handleChange=(e)=>{
        if(id){
          setUpdateStat({...updateStat, [e.target.name]:e.target.value})
          console.log(updateStat);
        }else{
          setStat({...stat, [e.target.name]:e.target.value});
          console.log(stat);
        }     
      }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createState(stat));
        disablePopup();
      }
      const disablePopup=(()=>{
        closeModel(false);
      });
      const handleUpdate=(e)=>{
        e.preventDefault();
        dispatch(editState(updateStat));
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
                                    value={updateStat && updateStat.country && updateStat.country.id}>
                                    {
                                      countries.map((inst)=>(
                                        <option value={inst.id}>{inst.name}</option>
                                      ))
                                    }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>State Code</th>
                                <td>
                                    <input type='text' id='code' name='code' className='form-control' onChange={handleChange} value={updateStat && updateStat.code}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>State Name</th>
                                <td>
                                    <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateStat && updateStat.name}/>
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

export default CreateStateModel;

import { ArrowBack } from '@mui/icons-material';
import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { createQualification, editQualification, showQualification } from '../establishment_redux/slices/establishment_slice/qualificationSlice';

const QualificationTypeCreation = () => {
    const navigatePage=useNavigate();
    const [qualificationType, setQualificationType]=useState();
    const dispatch=useDispatch();
    const {id}=useParams();
    const [updateQual, setUpdateQual]=useState();
    const {qualificationsTypes} = useSelector((state)=>state.allstorereducer.qualType);
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
      dispatch(showQualification());
      if(id){
        const emptObj = qualificationsTypes.filter((ele)=>ele.id == id);
        setUpdateQual(emptObj[0]);
        if(emptObj[0] && emptObj[0].isEngineering =='on'){
          setChecked(true);
        }else{
          setChecked(false);
        }
      }
    }, []);

    const handleChange=(e)=>{
      if(id){
        setUpdateQual({...updateQual, [e.target.name]:e.target.value})
        setChecked(e.target.checked);
        console.log("checked="+checked+",  target="+e.target.checked+",  value="+e.target.value);
      }else{
        setQualificationType({...qualificationType, [e.target.name]:e.target.value});
        setChecked(e.target.checked);
        console.log("checked="+checked+",  target="+e.target.checked);
      }     
    }
    const goback=()=>{
        window.history.back();
    }
    const searchEmployeeType=()=>{
        navigatePage("/establishmentSetup/qualificationTypeList");
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createQualification(qualificationType));
      navigatePage("/establishmentSetup/qualificationTypeList");
    }
    const handleUpdate=(e)=>{
      e.preventDefault();
      dispatch(editQualification(updateQual));
      navigatePage("/establishmentSetup/qualificationTypeList");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{minWidth:'70rem'}}>
            <CardHeader  className='p-0'>
              {
                id!==undefined? 
                <label>Establishment / Edit Qualification Type</label>
                :
                <label>Establishment / Qualification Type Creation</label>
              }                
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={searchEmployeeType}>Search</Button>
                {
                  id!==undefined? 
                  <Button color='success' onClick={handleUpdate}>Update</Button>
                  :
                  <Button color='success' onClick={handleSubmit}>Save</Button>
                }
            </CardHeader>
            <CardBody>            
                <Table>
                  <tbody>
                    <tr>
                      <th> Code</th>
                      <td>
                        <input type='text' name='code' className='form-control' onChange={handleChange} value={updateQual && updateQual.code}/>
                      </td>
                    </tr>
                    <tr>
                      <th> Name</th>
                      <td>
                        <input type='text' id='name' name='name' className='form-control' onChange={handleChange} value={updateQual && updateQual.name}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>
                        <select id='type' name='type' aria-placeholder='-- Select Type --' className='form-select' onChange={handleChange} value={updateQual && updateQual.type}>
                            <option value="Select">-- Select Type --</option>
                            <option value="School">School</option>    
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                            <option value="Research Degree">Research Degree</option>
                            <option value="Others">Others</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>Is Engineering</th>
                      <td>
                        <Switch name='isEngineering' checked={checked}
                         onChange={handleChange}/>
                      </td>
                    </tr>
                  </tbody>
                </Table>            
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default QualificationTypeCreation;

import { ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { createDocument, editDocument, showDocument } from '../establishment_redux/slices/establishment_slice/documentSlice';


    const EmployeeDocumentCreation = () => {
    const navigatePage=useNavigate();
    const [designation, setDesignation]=useState();
    const dispatch=useDispatch();
    const {id}=useParams();
    const [updateDoc, setUpdateDoc]=useState();
    const [document, setDocument]=useState();
    const {documents} = useSelector((state)=>state.allstorereducer.empDoc);

    useEffect(()=>{
      dispatch(showDocument());
      if(id){
        const desgObj = documents.filter((ele)=> ele.id == id);
        setUpdateDoc(desgObj[0]);
      }
    }, []);

    const handleChange=(e)=>{
      if(id){
        setUpdateDoc({...updateDoc, [e.target.name]:e.target.value})
        console.log(updateDoc);
      }else{
        setDocument({...document, [e.target.name]:e.target.value});
        console.log(document);
      }     
    }

    const goback=()=>{
        window.history.back();
    }
    const searchDepartment=()=>{
        navigatePage("/establishmentSetup/employeeDocumentList");
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(createDocument(document));
      navigatePage("/establishmentSetup/employeeDocumentList");
    }
    const handleUpdate=(e)=>{
      e.preventDefault();
      dispatch(editDocument(updateDoc));
      navigatePage("/establishmentSetup/employeeDocumentList");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{minWidth:'79rem'}}>
            <CardHeader  className='p-1'>
              {
                id!==undefined? 
                <label>Establishment / Edit Document</label>
                :
                <label>Establishment / Document Creation</label>
              }                
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={searchDepartment}>Search</Button>
                {
                  id!==undefined? 
                  <Button color='success' onClick={handleUpdate}>Update</Button>
                  :
                  <Button color='success' onClick={handleSubmit}>Save</Button>
                }
            </CardHeader>
            <CardBody className='form-shadow'>            
                <Table>
                  <tbody>
                    <tr>
                      <th>Document Name</th>
                      <td>
                        <input type='text' name='docName' className='form-control' onChange={handleChange} value={updateDoc && updateDoc.docName}/>
                      </td>
                    </tr>
                    <tr>
                      <th>Document Type</th>
                      <td>
                      <select className="form-select" id="docType" value={updateDoc && updateDoc.docType} name="docType" onChange={handleChange}>
                          <option selected>-- Select Type --</option>
                          <option value="Establishment Document" >Establishment Document</option>
                          <option value="Issues" >Issues</option>
                          <option value="Library Document" >Library Document</option>
                          <option value="Insurance Document" >Insurance Document</option>
                          <option value="Recruitment" >Recruitment</option>
                      </select>
                      </td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>
                        <textarea id='description' name='description' className='form-control' onChange={handleChange} value={updateDoc && updateDoc.description}/>
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

export default EmployeeDocumentCreation;

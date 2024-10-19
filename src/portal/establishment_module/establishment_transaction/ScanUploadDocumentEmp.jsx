import React, { useEffect, useState } from 'react'
import { FaDownload, FaFileDownload, FaUpload } from 'react-icons/fa';
import Select from 'react-select';
import { Card,CardHeader,CardBody,Row,Col, Table, Button } from "reactstrap";
import BASE_URL from '../../../serviceUrl/AxiosURL';
import { Alert } from 'react-bootstrap';
import { ArrowBack, Delete, DeleteSharp, DeleteTwoTone, Download, Save } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { showEmployeePopup } from '../establishment_redux/slices/establishment_slice/employeeSetupSlice';
import { deleteDocumentVerificationById, findDocumentVerificationByEmployee } from './document_slice/documentVerificationSlice';
import { ToastContainer, toast } from 'react-toastify';


const ScanUploadDocumentEmp = () => {
  const [employeeFullname,setEmployeeFullname]=useState();
  const [documentObj, setDocumentObj]=useState(null);
  const {employeeSelection,personalLoading} = useSelector((state)=>state.allstorereducer.employeeData);
  const {documentVers,docVerLoading} = useSelector((state)=>state.allstorereducer.documentVerification); 
  const dispatch = useDispatch();
  const [submissionDateValue,setSubmissionDateValue] = useState(null);
  const [file,setFile] = useState(null);
  const [docVerId,setDocVerId] = useState(null);

    useEffect(()=>{
      window.scrollTo({top:'0',left:'0', behavior:'smooth'});
      dispatch(showEmployeePopup());
      //setEmployeeList(employeeSelection);
      
    }, []);

    function selectedEmployee(data, field){
      setEmployeeFullname(data);
      dispatch(findDocumentVerificationByEmployee(data.value));   
      setDocumentObj({...documentObj,["employee"]:{"id":data.value,"code":"sbi"}});   
    }

    function getFormattedDate(date) {
      if(date!=undefined && date!=null){
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
        return `${year}-${month}-${day}`;
      }
    }

    const handleDate=(e,docId)=>{
      setDocVerId(docId);
      setSubmissionDateValue(e.target.value);
      setDocumentObj({...documentObj,["submissionDate"]:e.target.value});   
    }
    const handleFileChange=(e)=>{
      //alert(e.target.files[0]);
      setFile(e.target.files[0]);
    }
    function handleChange(e){

      dispatch(findDocumentVerificationByEmployee(employeeFullname && employeeFullname.value));
    }
    const back=()=>{
      window.history.back();
    }
    const handleSubmit= async(event,docv)=>{
      event.preventDefault();
      if(employeeFullname!=null && employeeFullname.value && submissionDateValue!=null){
        const formData = new FormData();
        formData.append('file', file);
        formData.append('employeeId', employeeFullname.value);
        formData.append('submissionDate', submissionDateValue);
        formData.append('documentVerificationId',docv && docv.id);
        formData.append('documentId',docv && docv.document && docv.document.id);
        formData.append('docName',docv && docv.document && docv.document.docName);
        try{
          const currentUser=localStorage.getItem("current-jwtToken");
            const response = await fetch(BASE_URL+"api/documentVerification/uploadDocument",{
              method: 'PUT',
              headers: {"Authorization":`Bearer ${currentUser}`},
              body:formData,
            })
            if (!response.ok) {
              throw new Error('Failed to load record');
            }
            const result = await response.json();
            console.log('Record loaded successfully:', result);
            if(result && result.id){
              toast.success("File updated successfully.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
              });
              dispatch(findDocumentVerificationByEmployee(result && result.employee && result.employee.id));
            }					
            console.log('Arrays : '+result);
        }catch(error){
          console.log(error);
        }
      }else{
        alert("Select proper filed!!");
      }
    }
    const handleDelete=(event,docvId)=>{
      event.preventDefault();
      if(window.confirm("Are you sure to delete?")){
        dispatch(deleteDocumentVerificationById(docvId));
      }      
    }
    const handleDownload = async(event,docv)=>{
      event.preventDefault();
      try {
        const currentUser=localStorage.getItem("current-jwtToken");
        const response = await fetch(BASE_URL+`api/documentVerification/downloadDocument/${docv.document.docName}`, {
            responseType: 'blob', // Important
            headers: {"Authorization":`Bearer ${currentUser}`},
        })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', (docv.document && docv.document.docName)); // or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error downloading the file',+error);
    }

    }
    
  return (
    <div>
      <form style={{minWidth:'80rem', fontSize:'0.8rem'}}>
        <Row className="mt-1" >   
        <Col sm="12">
          <Card>
            <CardHeader>
              <Button onClick={back}><ArrowBack/></Button> Scan Upload/Download Document
            </CardHeader>
            <CardBody>
              <Table>
                <tbody>
                  <tr className='mt-2'>
                    <td>
                      <label>Employee Name</label>
                    </td>
                    <td>
                      <Select options={employeeSelection} id='id' placeholder="-Search Option-" isSearchable={true}
                        value={employeeFullname} onChange={(e)=>selectedEmployee(e, 'id')}>
                      </Select>
                    </td>
                    <td>
                      <Button color='primary' onClick={handleChange}>Find Document</Button>
                    </td>
                    <td>
                      <Button color='success'>Show Report</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>                             
          </CardBody> 
          <CardBody>
            <Table striped>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Document Name</th>
                  <th>Status</th>
                  <th>Upload/Download Document</th>
                  <th>Date of Submission</th>
                </tr>
              </thead>
              <tbody>
                {
                  documentVers && documentVers.map((docv,index)=>(
                    <tr key={docv.id}>
                      <td>{index+1}</td>
                      <td>{docv && docv.document && docv.document.docName}</td>
                      <td>
                        <select className='' id='status' name='status' value={docv && docv.status}>
                          <option value={"N.A."}> N. A. </option>
                          <option value={"Not Submitted"}> Not Submitted </option>
                          <option value={"Submitted"}> Submitted </option>
                        </select>
                      </td>
                      <td>
                        {
                          docv && docv.uploadDocument?
                          <div> <b style={{color:'blue'}}>{docv && docv.uploadDocument}</b>
                            &nbsp; &nbsp; <button onClick={(e)=>{handleDelete(docv.id)}} style={{backgroundColor:'white', border:'none'}} title='Delete the file'><Delete style={{color:'red'}}/> </button>
                            &nbsp; <button onClick={(e)=>{handleDownload(e,docv)}} style={{backgroundColor:'white', border:'none'}} title='Download the file'><Download style={{color:'green'}}/></button>
                          </div>
                          :
                          <div>
                            <input type='file' id='uploadDocument' name='uploadDocument' onChange={handleFileChange} className='form-control'/>
                          </div>
                        }
                      </td>
                      <td> (<i>{getFormattedDate(new Date(docv && docv.submissionDate))}</i>)&nbsp; 
                        <input type='date' id='submissionDate' name='submissionDate' onChange={(e)=>{handleDate(e, docv.id)}}/> &nbsp;&nbsp;
                        <button onClick={(e)=>{handleSubmit(e,docv)}} className='btn btn-primary p-0' title='Click here to save'> <Save /> </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>         
          </CardBody>      
          </Card>
        </Col>
        </Row>
        <ToastContainer></ToastContainer>
      </form>
    </div>
  )
}

export default ScanUploadDocumentEmp;

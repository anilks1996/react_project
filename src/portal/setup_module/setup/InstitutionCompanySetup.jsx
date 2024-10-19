import { ArrowBack, Cancel, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, CardBody, CardFooter, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { ImPlus } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { createInstitutions, deleteInstitutions, filterInstitutionById, findAllInstitutions, updateInstitutions } from '../../establishment_module/establishment_redux/slices/establishment_slice/institutionSlice';
import { findCodeMasterByCode } from '../../establishment_module/establishment_redux/slices/establishment_slice/codeMasterSlice';
import { showCity, showCityByStateId, showCountry, showLocationInCity, showLocationInCityByCityId, showState, showStateByCountryId } from '../../establishment_module/establishment_redux/slices/establishment_slice/countryStateCityLocationSlice';


const InstitutionCompanySetup = () => {
    const dispatch=useDispatch();
    const [updateEmpType, setUpdateEmpType]=useState();
    const [modal, setModal] = useState(false);
    const toggle = () =>{
      setModal(!modal);
      setUpdateEmpType(null);
      dispatch(findAllInstitutions());
    }
    const {codeMasters,codeMaster,codeLoading} = useSelector((state)=>state.allstorereducer.codeMaster);
    const {institutions,institution,loading} = useSelector((state)=>state.allstorereducer.org);
    const {states,countries,cities,locationInCities} = useSelector((state)=>state.allstorereducer.cscLocation);
    const [establishedDate,setEstablishedDate] = useState();
    const [isActive,setIsActive]=useState(false);
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      if(e.target.name==="status"){
        if(e.target.checked){
          setIsActive(e.target.checked);
          setUpdateEmpType({...updateEmpType, ['status']:'Active'});
        }else{
          setIsActive(false);
          setUpdateEmpType({...updateEmpType, ['status']:'De-Activate'});
        }        
      }else if(e.target.name==="established"){
        setEstablishedDate(e.target.value);
        setUpdateEmpType({...updateEmpType, ['established']:e.target.value});
      }else if(e.target.name==="country.id"){
        //setUpdateEmpType({...updateEmpType, ['country']:{'id':e.target.value,'code':'SBI'}});
        dispatch(showStateByCountryId(e.target.value));
      }
      else if(e.target.name==="state.id"){
        //setUpdateEmpType({...updateEmpType, ['country']:{'id':e.target.value,'code':'SBI'}});
        dispatch(showCityByStateId(e.target.value));
      }
      else if(e.target.name==="city.id"){
        //setUpdateEmpType({...updateEmpType, ['country']:{'id':e.target.value,'code':'SBI'}});
        dispatch(showLocationInCityByCityId(e.target.value));
      }
      else{
        setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
      }      
      console.log(updateEmpType);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createInstitutions(updateEmpType));
      if(institution.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
      toggle();
      dispatch(findAllInstitutions());
    }
    useEffect(()=>{
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      dispatch(findAllInstitutions());
      dispatch(findCodeMasterByCode("Company Category"));
      dispatch(showState());
      dispatch(showCountry());
      dispatch(showCity());
      dispatch(showLocationInCity());
    },[]);

    const updateDept=(empObj)=>{
      setModal(true);
      if(empObj && empObj.code){
        setEstablishedDate(getFormattedDate(new Date(empObj.established)));
      }
      if(empObj && empObj.status==='Active'){
        setIsActive(true);
        alert(isActive)
      }
      setUpdateEmpType(empObj);
    }

    const updateEmployeeType=(empObj)=>{
      dispatch(updateInstitutions(empObj));
      dispatch(findAllInstitutions());
      setModal(false);
      if(institution && institution.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
    }
    const viewDept=(e, id)=>{
      alert(id);
    }
    const filterWFP=(e)=>{
      dispatch(filterInstitutionById(e.target.value));  
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteInstitutions(id));
        dispatch(findAllInstitutions());
      } 
    }

    function getFormattedDate(date) {
      if(date.getFullYear()!=1970){
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
        return`${year}-${month}-${day}`;
      }
    }

  return (
    <div>
      <form>
        <Card style={{minWidth:'79rem',fontSize:'0.8rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>setup / InstitutionSetup</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='danger' onClick={toggle}>Add New</Button>
            </CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <td>
                    <th style={{width:'9rem'}}>
                      Select Company : 
                    </th>
                  </td>
                  <th>
                    <select placeholder="select-name" className='form-select' id="id2" name="id2" onChange={filterWFP}>
                      <option value={-1}>-- select --</option>  
                      {
                        institutions.map((dpt)=>(
                          <option value={dpt.id}>{dpt.code} - {dpt.name}</option>
                        ))
                      }
                    </select>
                  </th>
                </tr>
              </Table>
            </CardBody>
            {codeLoading===true? 
              <CardBody>
                <h3>loading...</h3>
              </CardBody>
              :
            <CardBody>
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row'>#</th>
                        <th scope='row'>Company Code</th>
                        <th scope='row'>Company Name</th>
                        <th scope='row'>Establishment Date</th>
                        <th scope='row'>Address</th>
                        <th scope='row'>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      institutions && institutions.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id}>{index+1}</td>
                          <td>{ele.code}</td>
                          <td>{ele.name}</td>
                          <td>{getFormattedDate(new Date(ele.established))}</td>
                          <td>{ele.location}</td>
                          <td>{ele.status}</td>
                          <td><Link onClick={(e)=>{updateDept(ele)}}><FaPencilAlt color='green'/></Link> 
                          <Link  onClick={(e)=>{deleteDept(ele.id)}}><DeleteOutline style={{color:'red'}}/></Link>
                          <Link onClick={(e)=>{viewDept(e, ele.id)}}><FaSearch/> </Link>
                          </td>
                        </tr>
                      ))
                    }                      
                    </tbody>
                </Table>
            </CardBody>
            }
            {/* Modal */}
            <Modal isOpen={modal} toggle={toggle} size='xl'>
            {
              updateEmpType && updateEmpType.id!==undefined?
              <ModalHeader>Update Company</ModalHeader>
              :
              <ModalHeader>New Company</ModalHeader>
            }
              <ModalBody style={{fontSize:'0.8rem'}}>
                <Table border={1}>
                  <tbody>    
                    <tr>
                      <th style={{color:'red'}}>
                        Company Code : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter code here" className='form-control' id="code" name="code" onChange={handleChange} value={updateEmpType && updateEmpType.code} />                          
                      </th>
                      <th style={{color:'red'}}>
                        User Group : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter group" className='form-control' id="group" name="group" onChange={handleChange} value={updateEmpType && updateEmpType.group} disabled/>                          
                      </th>
                    </tr>  
                    <tr>
                      <th style={{color:'red'}}>
                        Company Name : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter name here" className='form-control' id="name" name="name" onChange={handleChange} value={updateEmpType && updateEmpType.name} />                          
                      </th>
                      <th style={{color:'red'}}>
                        Established Date : 
                      </th>
                      <th>
                        <input type='date' id="established" name="established" value={establishedDate} onChange={handleChange} className='form-control' />                          
                      </th>
                    </tr>   
                    <tr>
                      <th>
                        Director Name : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter name here" className='form-control' id="directorName" name="directorName" onChange={handleChange} value={updateEmpType && updateEmpType.directorName} />                          
                      </th>
                      <th>
                        Company Category : 
                      </th>
                      <th>
                        <select className='form-control' id="intitutionCategory.id" name="intitutionCategory.id" onChange={handleChange} value={updateEmpType && updateEmpType.intitutionCategory && updateEmpType.intitutionCategory.id}>
                        <option value={-1}>-- select --</option>
                          {
                            codeMasters.length>0 && codeMasters.map((stat)=>(
                              <option value={stat.id}>{stat.value}</option>
                            ))
                          }
                        </select>
                      </th>
                    </tr>   
                    <tr>
                      <th>
                        Description : 
                      </th>
                      <th>
                        <textarea placeholder="enter description" className='form-control' id="description" name="description" onChange={handleChange} value={updateEmpType && updateEmpType.description}/>
                      </th>
                      <th style={{color:'red'}}>
                        Address : 
                      </th>
                      <th>
                        <textarea placeholder="enter address" className='form-control' id="address1" name="address1" onChange={handleChange} value={updateEmpType && updateEmpType.address1}/>                      
                      </th>
                    </tr> 
                    <tr>
                      <th style={{color:'red'}}>
                        Pin Code : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter code here" className='form-control' id="zipCode" name="zipCode" onChange={handleChange} value={updateEmpType && updateEmpType.zipCode} />                          
                      </th>
                      <th style={{color:'red'}}>
                        Phone : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter code here" className='form-control' id="vision" name="vision" onChange={handleChange} value={updateEmpType && updateEmpType.vision} />                          
                      </th>
                    </tr>  
                    <tr>
                      <th>
                        Country : 
                      </th>
                      <th>
                        <select className='form-select' id="country.id" name="country.id" onChange={handleChange} value={updateEmpType && updateEmpType.country && updateEmpType.country.id}>
                        <option value={-1}>-- select --</option>
                          {
                            countries.map((stat)=>(
                              <option value={stat.id}>{stat.name}</option>
                            ))
                          }
                        </select>
                      </th>
                      <th>
                        State : 
                      </th>
                      <th>
                        <select className='form-select' id="state.id" name="state.id" onChange={handleChange} value={updateEmpType && updateEmpType.country && updateEmpType.state.id}>
                          <option value={-1}>-- select --</option>
                          {
                            states.map((stat)=>(
                              <option value={stat.id}>{stat.name}</option>
                            ))
                          }
                        </select>
                      </th>
                    </tr>     
                    <tr>
                      <th>
                        District Level : 
                      </th>
                      <th>
                      <select className='form-select' id="locationInCity.id" name="locationInCity.id" onChange={handleChange} value={updateEmpType && updateEmpType.country && updateEmpType.locationInCity.id}>
                        <option value={-1}>-- select --</option>
                        {
                          locationInCities.map((stat)=>(
                            <option value={stat.id}>{stat.name}</option>
                          ))
                        }
                      </select>
                      </th>
                      <th>
                        City : 
                      </th>
                      <th>
                      <select className='form-select' id="city.id" name="city.id" onChange={handleChange} value={updateEmpType && updateEmpType.country && updateEmpType.city.id}>
                        <option value={-1}>-- select --</option>
                        {
                          cities.map((stat)=>(
                            <option value={stat.id}>{stat.name}</option>
                          ))
                        }
                      </select>
                      </th>
                    </tr> 
                    <tr>
                      <th>
                        Fax : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter fax here" className='form-control' id="fax" name="fax" onChange={handleChange} value={updateEmpType && updateEmpType.fax} />                          
                      </th>
                      <th>
                        Mobile No : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter mobile here" className='form-control' id="mobile" name="mobile" onChange={handleChange} value={updateEmpType && updateEmpType.mobile} />                          
                      </th>
                    </tr>  
                     <tr>
                      <th>
                        Email : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter code here" className='form-control' id="establishmentCode" name="establishmentCode" onChange={handleChange} value={updateEmpType && updateEmpType.establishmentCode} />                          
                      </th>
                      <th>
                        URL : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter code here" className='form-control' id="websiteAddress" name="websiteAddress" onChange={handleChange} value={updateEmpType && updateEmpType.websiteAddress} />                          
                      </th>
                    </tr>  
                    <tr>
                      <th>
                        isActive : 
                      </th>
                      <th>                      
                        <input type='checkbox'  placeholder="enter code here" className='' id="status" name="status" onChange={handleChange} checked={isActive} />                            
                      </th>
                      <th>
                        Nind Code : 
                      </th>
                      <th>
                        <input type='text' placeholder="enter code here" className='form-control' id="nindCode" name="nindCode" onChange={handleChange} value={updateEmpType && updateEmpType.nindCode} />                          
                      </th>
                    </tr>                        
                  </tbody>                  
                </Table>   
                <Table>
                  <tbody>
                    <tr>
                      <td>
                      {
                        updateEmpType && updateEmpType.id!==undefined?
                        <Button color='success' onClick={(e)=>{updateEmployeeType(updateEmpType)}} style={{width:'100%'}}><GrUpdate/> Update</Button>
                        :
                        <Button color='success' onClick={handleSubmit} style={{width:'100%'}}><ImPlus/> Add</Button>
                      }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button color="btn btn-danger" onClick={toggle} style={{width:'100%'}}><Cancel/> Cancel</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table> 
              </ModalBody>
              <ModalFooter>
                
              </ModalFooter>
            </Modal>
        {/* Modal  */}
            <CardFooter>
              <p>footer</p>
            </CardFooter>
        </Card>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default InstitutionCompanySetup;


import { ArrowBack, Cancel, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, CardBody, CardFooter, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter, Spinner} from 'reactstrap';
import { ImPlus } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import Select from 'react-select';
import { createConfigurationMaster, deleteConfigurationMaster, filterConfigurationMasterByKey, findAllConfigurationMasters, selectionConfigurationMaster, updateConfigurationMaster } from '../../establishment_module/establishment_redux/slices/establishment_slice/configurationMasterSlice';


const ConfigurationMaster = () => {
    const dispatch=useDispatch();
    const [updateEmpType, setUpdateEmpType]=useState();
    const [modal, setModal] = useState(false);
    const [bankObj,setbankObj]=useState();
    const [configKeys,setConfigKeys]=useState();
    const toggle = () =>{
      setModal(!modal);
      setUpdateEmpType(null);
    }
    const {configMaster,configMasters,configMasterCol,configValue,cmLoading,selectionCMstr} = useSelector((state)=>state.allstorereducer.configMaster);     
    const goback=()=>{
        window.history.back();
    }
    const handleChange=(e)=>{
      setUpdateEmpType({...updateEmpType, [e.target.name]:e.target.value})
      if(e.target.name==='bank.id'){
        setbankObj(e.target.value);
      }    
      console.log(updateEmpType);
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      alert('fill all data');
      dispatch(createConfigurationMaster(updateEmpType));
      if(configMaster && configMaster.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
      dispatch(findAllConfigurationMasters());
    }
    useEffect(()=>{
      window.scrollTo({top:'0',left:'0',behavior:'smooth'});
      dispatch(findAllConfigurationMasters());
      dispatch(selectionConfigurationMaster());
    },[]);

    const handleSelect=(data)=>{
      //alert(data.label);
      dispatch(filterConfigurationMasterByKey(data.label));
      setConfigKeys(data);
    }

    const updateDept=(empObj)=>{
      setModal(true);
      setUpdateEmpType(empObj);
      if(empObj && empObj.bankDto && empObj.bankDto.id!=null){
        //alert(empObj.bankDto.id);
        setbankObj(empObj.bankDto.id);
      }
    }

    const updateEmployeeType=(empObj)=>{
      dispatch(updateConfigurationMaster(empObj));
      dispatch(findAllConfigurationMasters());
      setModal(false);
      if(configMaster && configMaster.id>0){
        toast.success("Data updated successfully.");
      }else{
        toast.error("Data not updated successfully!");
      }
    }
    const viewDept=(e, id)=>{
      alert(id);
    }
    const filterByLabelProps=(e)=>{
      dispatch(findAllConfigurationMasters());
    }
    
    const filterByLabelPropsShow=(e)=>{
      
    }
    const filterCodeValue=(e)=>{
      dispatch(filterConfigurationMasterByKey(e.target.value));
      //alert(codeMasters)
    }
    const deleteDept=(id)=>{
      if(window.confirm("Are you sure? to delete record")){
        dispatch(deleteConfigurationMaster(id));
        dispatch(findAllConfigurationMasters());
      } 
    }

  return (
    <div>
      <form>
        <Card style={{minWidth:'80rem',fontSize:'0.8rem'}} className='form-shadow'>
            <CardHeader  className='p-0'>
                <label>setup / Configuration Master</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='danger' onClick={toggle}>Add New</Button>
            </CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <th>
                    <th style={{width:'9rem'}}>
                      Labels / Properties : 
                    </th>
                  </th>
                  <td>
                    <select placeholder="select-type" className='form-select' id="bbName" name="bbName" onChange={filterByLabelProps}>
                      <option value={-1}>-- select --</option>  
                      <option value="Properties">Properties</option>  
                      <option value="Labels">Labels</option>  
                    </select>
                  </td>
                  <th style={{width:'9rem'}}>
                      Configuration Key : 
                    </th>
                  <td>
                    <Select options={selectionCMstr} id='configKey' name='configKey' placeholder="- Search option -" 
                      value={configKeys} 
                      onChange={handleSelect}
                      isSearchable={true}>                             
                    </Select>
                  </td>
                </tr>
              </Table>
            </CardBody>
            {cmLoading===true? 
              <CardBody>
                <h3>loading... <Spinner /> </h3>
              </CardBody>
              :
            <CardBody><hr />
                <Table striped>
                    <thead>
                      <tr>
                        <th scope='row' style={{width:'5%'}}>#</th>
                        <th scope='row' style={{width:'20%'}}>Configuration Key</th>
                        <th scope='row' style={{width:'20%'}}>Configuration Value</th>
                        <th scope='row' style={{width:'15%'}}>Description</th>
                        <th scope='row' style={{width:'10%'}}>config Type</th>
                        <th scope='row' style={{width:'10%'}}>module Name</th>
                        <th scope='row' style={{width:'10%'}}>functionality Name</th>
                        <th scope='row' style={{width:'10%'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      configMasters && configMasters.length>0 && configMasters.map((ele,index)=>(
                        <tr key={ele.id}>
                          <td key={ele.id} style={{width:'5%'}}>{index+1}</td>
                          <td style={{width:'10%'}}>{ele.configKey}</td>
                          <td style={{width:'20%'}}>{ele.configValue}</td>
                          <td style={{width:'15%'}}>{ele.description}</td>
                          <td style={{width:'10%'}}>{ele.configType}</td>
                          <td style={{width:'10%'}}>{ele.moduleName}</td>
                          <td style={{width:'10%'}}>{ele.functionalityName}</td>
                          <td style={{width:'10%'}}><Link onClick={(e)=>{updateDept(ele)}}><FaPencilAlt color='green'/></Link> 
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
              <ModalHeader>Update Configuration Master</ModalHeader>
              :
              <ModalHeader>New Configuration Master</ModalHeader>
            }
              <ModalBody>
                <Table border={1} striped>
                  <tbody>  
                    <tr>
                      <th><label> Labels / Properties </label>
                        <select placeholder="select-type" className='form-select' id="configType" name="configType" onChange={filterByLabelPropsShow}>
                          <option value={-1}>-- select --</option>  
                          <option value="Properties">Properties</option>  
                          <option value="Labels">Labels</option>  
                        </select>
                      </th>
                    </tr>                                 
                    <tr>
                      <th><label> Configuration Key	 : </label>
                        <input placeholder="value" className='form-control' id="configKey" name="configKey" onChange={handleChange} value={updateEmpType && updateEmpType.configKey} />                         
                      </th>   
                    </tr>
                    <tr>                   
                      <th><label> Configuration Value : </label>
                        <input placeholder="value" className='form-control' id="configValue" name="configValue" onChange={handleChange} value={updateEmpType && updateEmpType.configValue} />                         
                      </th> 
                    </tr>
                    <tr>                    
                      <th><label> Configuration Type : </label>
                        <input placeholder="name" className='form-control' id="configType" name="configType" onChange={handleChange} value={updateEmpType && updateEmpType.configType} />                         
                      </th>
                    </tr>
                    <tr>
                      <th><label> Module : </label>
                        <input placeholder="description" className='form-control' id="moduleName" name="moduleName" onChange={handleChange} value={updateEmpType && updateEmpType.moduleName} />                         
                      </th> 
                    </tr>
                    <tr>
                      <th><label> Functionality : </label>
                        <input placeholder="description" className='form-control' id="functionalityName" name="functionalityName" onChange={handleChange} value={updateEmpType && updateEmpType.functionalityName} />                         
                      </th>                                                                
                    </tr>
                    <tr>
                      <th><label> Description : </label>                 
                        <textarea  className='form-control' id="description" name="description" onChange={handleChange} value={updateEmpType && updateEmpType.description} cols={9} rows={3}/>
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
      <ToastContainer>
      </ToastContainer>
    </div>
  )
}

export default ConfigurationMaster;

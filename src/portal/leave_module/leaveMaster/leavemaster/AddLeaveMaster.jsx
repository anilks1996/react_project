import React, {useState} from 'react'
import { FaCut, FaEdit, FaPlus, FaRemoveFormat, FaSearch } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card,CardHeader,CardBody,CardTitle,Button,CardFooter,Row,Col, FormGroup, ButtonGroup,Dropdown,DropdownToggle,DropdownMenu,DropdownItem,Table } from "reactstrap";
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import Switch from '@mui/material/Switch';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddLeaveMaster= ({direction, ...args}) => {
  const [modal, setModal] = useState(false);
    const navigatepage =useNavigate();
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=> setDropdownOpen((prevState)=>!prevState);
    const toggle1 = () => setModal(!modal);
    const [addleave, setLeave]=useState({
      leaveTypeCode:'',
      leaveTypeName:'',
      leaveDescription:'',
    });
    const label = { inputProps: {'aria-label':'Switch' } };
    const handleChange=(event, field)=>{
      let pass=event.target.value;
       setLeave({
        ...addleave,
        [field]:pass
      })
    }    
    const filterOptionChange=(event, field)=>{
      alert('event='+field);
    }
    const createEmp=(event,field)=>{
      alert('event='+field);
      navigatepage("/leaveMaster/AddLeaveMaster");
    };
    const excludeHoliday=[
      {"value":616263,"label":"--Select--"},
      {"value":464748,"label":"Yes"},
      {"value":495051,"label":"No"}
    ]
    const [exclude,setExclude]=useState();
    function selectedEType(data){
      setExclude(data);
    }
    const SuffixHoliday=[
      {"value":646566,"label":"--Select--"},
      {"value":525354,"label":"Yes"},
      {"value":555657,"label":"No"}
    ]
    const [suffix,setSuffix]=useState();
    function selectedSType(data){
      setSuffix(data);
    }

    const leaveTypeList=[
      {"value":585960,"label":"--Select--"},
      {"value":789123,"label":"Casual Leave"},
      {"value":456789,"label":"Casual Leave Female"},

      {"value":101112,"label":"Casual Leave Male"},
      {"value":131415,"label":"Child Care Leave"},
      {"value":161718,"label":"Earned Leave"},

      {"value":192021,"label":"Leave Without Pay"},
      {"value":222324,"label":"Maternity Leave"},
      {"value":252627,"label":"Medical Leave"},

      {"value":282930,"label":"Optional Leave"},
      {"value":313233,"label":"Paternity Leave"},
      {"value":343536,"label":"Restricted Holiday"},
      
      {"value":373839,"label":"Sick Leave"},
      {"value":404142,"label":"Special Leave"},
      {"value":434445,"label":"Station Leave"}
    ]
    const [leavaType,setLeavaType]=useState();
    function selectedSType(data){
      setLeavaType(data);
    }
    return (
      <div>
          <form>
             <Card style={{width:'50rem'}} className='form-shadow'>
              <CardHeader><Button id='radioA' name='Button' onClick={createEmp}><FaPlus/> SAVE </Button></CardHeader>

              <Button color="danger" onClick={toggle1}>
        Add Leave
      </Button>
      <Modal isOpen={modal} toggle={toggle1} {...args}>
        <ModalHeader toggle={toggle1}>Add New Leave</ModalHeader>
        <ModalBody>
          <Card>
        <CardBody>
                <Table>
                  <thead>
                    <th>                  
                      Leave Type
                      <Select options={leaveTypeList} id='id' value={leavaType}
                        onChange={(e)=>{selectedSType(e)}}
                      />                      
                    </th> 
                    </thead>
                    <thead>
                    <th>
                    <label>Leave Code</label>
                            <input type="text" placeholder="" id="leaveTypeCode" className='form-control'
                            value={addleave.leaveTypeCode} onChange={(e)=>handleChange(e,'leaveTypeCode')}/>
                    </th>
                    </thead>
                    <thead>
                    <th>
                    <label>Leave Name</label>
                            <input type="text" placeholder="" id="leaveTypeCode" className='form-control'
                            value={addleave.leaveTypeCode} onChange={(e)=>handleChange(e,'leaveTypeCode')}/>
                    </th>
                    </thead>
                    <thead>
                    <th>                  
                      Exclude Holidays <Switch{...label}defaultChecked/>
                        {/* <Select options={excludeHoliday} id='id' value={exclude} */}
                       {/* // onChange={(e)=>{selectedEType(e)}} */}
                      {/* />                       */}
                    </th>
                    <th>                  
                      Allow Prefix Suffix  <Switch{...label}defaultChecked/>
                      {/* <Select options={SuffixHoliday} id='id' value={suffix} */}
                        {/* //onChange={(e)=>{selectedSType(e)}} */}
                      {/* />                       */}
                    </th> 
                    </thead>
                    <thead>
                    <th>
                    <label>Description</label>
                      <input type="text" placeholder="" id="leaveTypeCode" className='form-control'
                            value={addleave.leaveTypeCode} onChange={(e)=>handleChange(e,'leaveTypeCode')}/>
                    </th>
                    </thead>
                </Table>
              </CardBody>
             </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle1}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle1}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
              <CardBody>
                <Table>
                  <thead>
                    <th>                  
                      Leave Type
                      <Select options={leaveTypeList} id='id' value={leavaType}
                        onChange={(e)=>{selectedSType(e)}}
                      />                      
                    </th> 
                    </thead>
                    <thead>
                    <th>
                    <label>Leave Code</label>
                            <input type="text" placeholder="" id="leaveTypeCode" className='form-control'
                            value={addleave.leaveTypeCode} onChange={(e)=>handleChange(e,'leaveTypeCode')}/>
                    </th>
                    </thead>
                    <thead>
                    <th>
                    <label>Leave Name</label>
                            <input type="text" placeholder="" id="leaveTypeCode" className='form-control'
                            value={addleave.leaveTypeCode} onChange={(e)=>handleChange(e,'leaveTypeCode')}/>
                    </th>
                    </thead>
                    <thead>
                    <th>                  
                      Exclude Holidays <Switch{...label}defaultChecked/>
                        {/* <Select options={excludeHoliday} id='id' value={exclude} */}
                       {/* // onChange={(e)=>{selectedEType(e)}} */}
                      {/* />                       */}
                    </th> 
                    <th>                  
                      Allow Prefix Suffix <Switch{...label}defaultChecked/>
                      {/* <Select options={SuffixHoliday} id='id' value={suffix} */}
                        {/* //onChange={(e)=>{selectedSType(e)}} */}
                      {/* />                       */}
                    </th> 
                    </thead>
                    <thead>
                    <th>
                    <label>Description</label>
                            <input type="text" placeholder="" id="leaveTypeCode" className='form-control'
                            value={addleave.leaveTypeCode} onChange={(e)=>handleChange(e,'leaveTypeCode')}/>
                    </th>
                    </thead>
                </Table>
              </CardBody>
             </Card>
                    <CardFooter>
                    Footer
                    </CardFooter>
          </form>
      </div>
    );
  }
  AddLeaveMaster.propTypes={
    direction:PropTypes.string,
  };
  export default AddLeaveMaster;
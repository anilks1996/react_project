import React, {useEffect, useState} from 'react'
import { FaCut, FaEdit, FaPlus, FaSearch,FaSave} from 'react-icons/fa'; 
import { Navigate, useNavigate } from 'react-router-dom';
import { Card,CardHeader,CardBody,CardTitle,Button,CardFooter,Row,Col, FormGroup, ButtonGroup,Table,Media,Input } from "reactstrap";
import Select from 'react-select';
import { ToastContainer,toast } from 'react-toastify';
import { ArrowBack } from "@mui/icons-material";

const LeaveApproval= () => {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue, onChange]=useState('10:00');
    const [leaveTypeCols, setLeaveTypeCols]=useState();
    const navigatepage =useNavigate();
    const leaveStatus=[
      {"value":585960,"label":"--Select--"},
      {"value":123456,"label":"Pending"},
      {"value":789123,"label":"Approved"},
      {"value":456789,"label":"Rejected"}
    ]
    const [showTable, setShowTable]=useState(false);

    const showLeaveList=()=>{
     //axios.get(BASE_URL+"leaveTypeList1").then((Response)=>{
     // const datalist=responsivePropType.data;
    //  setLeaveTypeCols(datalist);
      //alert(leaveTypeCols)
     //})
      
      setShowTable(true);
    }
    const [leaveStatus1,setleaveStatus1]=useState();
    function selectedSType(data){
      setleaveStatus1(data);
    }

    const leaveApproval=(event,field)=>{
        alert('event='+field);
        navigatepage("/leaveMaster/leaveTransaction/LeaveApproval");
      };
    
    const handleChange=(event, field)=>{
      let pass=event.target.value;
    }     
    
    const filterOptionChange=(event, field)=>{
      alert('event='+field);
    }
    const createholiday=(event,field)=>{
      alert('event='+field);
      navigatepage("");
    };
    const Goback = () => {
      window.history.back();
    }

  return (
    <div>
          <form>
             <Card style={{width:'80rem'}} className='form-shadow'>
             <CardHeader  className='p-0'>
                <i><label>Leave Transactions / Leave Approval </label></i></CardHeader>
              <CardHeader><Button id='radioA' name='Button' onClick={Goback}><ArrowBack></ArrowBack> </Button></CardHeader>
                <Card className='form-shadow'>
                <CardBody>
                <ButtonGroup vertical>
                      <Card className='p-4'>
                      <Row>
                          <Col sm='1'>
                            <Button color="danger" id='radioA' name='filter-option' onClick={(e)=>filterOptionChange(e, 'radioA')}>
                            A </Button>
                          </Col>
                          <Col sm='3'>
                            <span className='text-danger'>*</span>
                              <label>Leave Status</label>
                               <Select class = "form-control" options={leaveStatus} id="leaveType.id" name="leaveType.id" value={showLeaveList}
                                    onChange={(e)=>{selectedSType(e)}}/>
                          </Col>                      
                          <Col sm='3'>
                           <label>From Date</label>
                            <input type='Date' id="description" name='description' className='form-control' onChange={handleChange}/>
                          {/* <DatePicker dateFormat="DD/MM/YYYY" selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                          </Col>
                        <Col sm='3'>
                            <label>To Date</label>
                              <input type='Date' id="description" name='description' className='form-control' onChange={handleChange}/>
                          {/* <DatePicker dateFormat="DD/MM/YYYY" selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                        </Col>
                        <Col sm='2'>                         
                          <Button class="btn btn-primary pull-right" id='radioA' name='Button' color='success'  onClick={showLeaveList}>Filter..</Button> 
                          </Col>
                        </Row>
                        </Card>
                        </ButtonGroup>
                        
                        </CardBody>
                        </Card>
                    <Card className='form-shadow'>
                    <CardBody>
                      <CardHeader>Table</CardHeader>
                      {
                       showTable==false? 
                       <div></div>
                       :                 
                      <Table> 
                      <thead> 
                    <tr> 
                        <th>S.No</th> 
                        <th>Employee Code</th> 
                        <th>Employee Name</th> 
                        <th>Leave Application Date</th>
                        <th>Leave From</th>
                        <th>Leave To</th>
                        <th>No. of Days</th>
                        <th>Leave Status</th>
                        <th>Actions</th>
                    </tr> 
                </thead> 
                <tbody> 
                        {
                          leaveTypeCols && leaveTypeCols.map((ele)=>{
                            <tr>
                              <td key={ele.id}>{ele.id}</td>
                              <td>{ele.code}</td>
                              <td>{ele.name}</td>
                              <td>{ele.leaveType}</td>
                              <td><FaEdit/></td>
                            </tr>
                          })
                        }
                
                    <tr> 
                        <td>1</td> 
                        <td>10006</td> 
                        <td>Ms.Prerna Sihag</td> 
                        <td>12/01/2024</td>
                        <td>31/01/2024</td> 
                        <td>02/02/2024</td> 
                        <td></td> 
                        <td>Pending (Requested)</td>
                        <td className='flex justify-between'>
                        <Button><FaSearch/></Button></td>
                  
                    </tr> 
                    <tr> 
                    <td>2</td> 
                        <td>10006</td> 
                        <td>Ms.Prerna Sihag</td> 
                        <td>12/01/2024</td>
                        <td>31/01/2024</td> 
                        <td>02/02/2024</td> 
                        <td></td> 
                        <td>Pending (Requested)</td>
                        <td className='flex justify-between'>
                        <Button><FaSearch/></Button></td>
                    </tr> 
                    <tr> 
                        <td>3</td> 
                        <td>10006</td> 
                        <td>Ms.Prerna Sihag</td> 
                        <td>12/01/2024</td>
                        <td>31/01/2024</td> 
                        <td>02/02/2024</td> 
                        <td></td> 
                        <td>Pending (Requested)</td>
                        <td className='flex justify-between'>
                        <Button><FaSearch/></Button></td>
                        </tr> 
                </tbody> 
            </Table> 
}
                </CardBody>
                </Card>
                <CardFooter>
                       Footer
                    </CardFooter>
                </Card>
                <ToastContainer />
        </form>
    </div>
  
  )
};

export default LeaveApproval;
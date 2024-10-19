import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Card,CardHeader,CardBody,CardTitle,Button,CardFooter,Row,Col, FormGroup, ButtonGroup } from "reactstrap";

const AddLeaveTypes = () => {

    const [addleave, setLeave]=useState({
      
      leaveTypeCode:'',
      leaveTypeName:'',
      leaveDescription:'',
    });

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

  return (
    <div>
        <form>
            <Row>
            <Col sm="12">
                <Card className='mt-1'>
                    <CardTitle className='mt-1'><Button><FaPlus /> Save </Button></CardTitle>
                </Card>
                <Card>
                    <CardHeader>
                        <i>Create Leave Type</i>                                          
                    </CardHeader>
                    <CardBody>
                    <ButtonGroup vertical>
                    <Card className='p-4'>
                        <Row>
                          <Col sm='1'>
                            <Button color="danger" id='radioA' name='filter-option' onClick={(e)=>filterOptionChange(e, 'radioA')}>
                            A </Button>
                          </Col>
                          <Col sm='3'>
                            <label>Leave Type Code</label>
                            <input type="text" placeholder="" id="leaveTypeCode" className='form-control'
                            value={addleave.leaveTypeCode} onChange={(e)=>handleChange(e,'leaveTypeCode')}/>
                          </Col>
                          <Col sm='3'>
                            <label>Leave Type Name</label>
                            <input type="text" placeholder="" id="leaveTypeName" className='form-control'
                            value={addleave.leaveTypeName} onChange={(e)=>handleChange(e,'leaveTypeName')}/>
                          </Col>
                          <Col sm='3'>
                            <label>Description</label>
                            <input type="text" placeholder="" id="leaveDescription" className='form-control'
                            value={addleave.leaveDescription} onChange={(e)=>handleChange(e,'leaveDescription')}/>
                          </Col>
                        </Row>
                    </Card>
                        </ButtonGroup>
                        </CardBody>
                        </Card>
                        </Col>
                        </Row>
                        </form>
                        </div>
  )
}
export default AddLeaveTypes;


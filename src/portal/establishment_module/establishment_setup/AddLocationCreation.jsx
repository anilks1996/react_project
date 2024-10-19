import { ArrowBack } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';

const AddLocationCreation = () => {
    const navigatePage=useNavigate();
    const goback=()=>{
        window.history.back();
    }
    const searchDesignation=()=>{
        navigatePage("/establishmentSetup/addLocationList");
    }
  return (
    <div>
      <form>
        <Card style={{minWidth:'70rem'}}>
            <CardHeader  className='p-0'>
                <label>Establishment / AddLocationCreation</label>
            </CardHeader>
            <CardHeader className='p-0'>
                <Button color='warning' onClick={goback}><ArrowBack/></Button> <Button color='info' onClick={searchDesignation}>Search</Button>
            </CardHeader>
            <CardBody>
                <Table>

                </Table>
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default AddLocationCreation;

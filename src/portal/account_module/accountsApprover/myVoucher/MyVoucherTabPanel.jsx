import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MdMoveToInbox } from "react-icons/md";
import { MdSend } from "react-icons/md";
import { MdDrafts } from "react-icons/md";
import { MdArchive } from "react-icons/md";
import { FaSearch, FaTrash } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import InboxEmployeeUser from '../../../employeeusr_module/InboxEmployeeUser';
import { Button, Col, Row } from 'react-bootstrap';
import InboxVoucher from './InboxVoucher';
import { useNavigate } from 'react-router-dom';
import SentBoxVoucher from './SentBoxVoucher';
import DraftBoxVoucher from './DraftBoxVoucher';



function MyVoucherTabPanel(props) {
    const { children, value, index, ...other } = props;
    const [userToken,setUserToken]=React.useState('');
    
    React.useEffect(()=>{
        const uToken = localStorage.getItem('user-token');
        if(uToken!=null && uToken!=""){
            //alert('userToken='+uToken)
            setUserToken(uToken);
        }
    },[]);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }} className='p-0'>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

MyVoucherTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [userToken,setUserToken]=React.useState('');
  const navigatePage=useNavigate();
  React.useEffect(()=>{
      const uToken = localStorage.getItem('user-token');
      if(uToken!=null && uToken!=""){
          //alert('userToken='+uToken)
          setUserToken(uToken);
      }
  },[]);

  const createNewVoucher=(e)=>{
    e.preventDefault();
    //alert("New Voucher");
    navigatePage("/createVoucherSteps");
  }

  return (
    <div>
        <Row>
          <Col sm="1">
            <Button className='btn btn-danger' style={{width:'7.6rem'}} title='Click here to create new voucher' onClick={createNewVoucher}>Compose <MdAddChart/> </Button>
          </Col>
          <Col sm="1"></Col>
          {/* 
          <Col sm="10" className='marginLeft-2'>
            <input type='text' id='search' name='search' className='form-control mt-1' placeholder='type and search here'/>
          </Col>  
          */}      
        </Row>
        {/*
        <CardBody style={{backgroundImage: 'linear-gradient(85deg, #ded8d8, #fefbfb)'}}>
        */}
          {/*
            <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
          */}
            <Box 
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
            >
            {/*<Card>
            */}
            <Tabs
                orientation="vertical"
                variant="fullWidth"
                value={value} className='form-shadow'
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', borderBlock: 1}}
            >    
                    
                <Tab icon={<MdMoveToInbox style={{width:'1.2rem', height:'1.2rem'}}/>} iconPosition="start" label="Inbox" {...a11yProps(0)} className='card form-shadow p-3' 
                style={{ background:"linear-gradient(31deg, rgb(45 172 237) 0%, rgb(255 255 255) 51%, rgb(26 207 244) 100%)"}} /> 
                 
                <Tab icon={<MdSend style={{width:'1.2rem', height:'1.2rem'}}/>} iconPosition="start" label=" Sent " {...a11yProps(2)} className='form-shadow p-3 mt-2' 
                style={{ background:"linear-gradient(31deg, rgb(255, 255, 255) 0%, rgb(242 76 112) 61%, rgb(255, 255, 255) 100%)", borderRadius:'.2rem'}} />
                
                <Tab icon={<MdDrafts style={{width:'1.2rem', height:'1.2rem'}}/>} iconPosition="start" label=" Draft" {...a11yProps(3)} className='form-shadow p-3 mt-2' 
                style={{ background:"linear-gradient(31deg, rgb(255 255 255) 0%, rgb(237 237 149) 61%, rgb(255 255 255) 100%)", borderRadius:'.2rem'}}/>
                
                <Tab icon={<MdArchive style={{width:'1.2rem', height:'1.2rem'}}/>} iconPosition="start" label="Archive" {...a11yProps(4)} className='form-shadow p-3 mt-2' 
                style={{ background:"linear-gradient(31deg, rgb(255, 255, 255) 0%, rgb(80 244 100) 61%, rgb(255, 255, 255) 100%)", borderRadius:'.2rem'}}/>
                
                <Tab icon={<FaTrash style={{width:'1rem', height:'1rem'}}/>} iconPosition="start" label="Trash" {...a11yProps(1)} className='form-shadow p-3 mt-2' 
                style={{ background:"linear-gradient(31deg, rgb(255, 255, 255) 0%, rgb(97 125 224) 61%, rgb(255, 255, 255) 100%)", borderRadius:'.2rem'}}/>            
            </Tabs>

            {/*</Card>
          */}
            <MyVoucherTabPanel value={value} index={0}>
                <InboxVoucher />
            </MyVoucherTabPanel>
            <MyVoucherTabPanel value={value} index={1}>
                <SentBoxVoucher />
            </MyVoucherTabPanel>
            <MyVoucherTabPanel value={value} index={2}>
                <DraftBoxVoucher />
            </MyVoucherTabPanel>
            <MyVoucherTabPanel value={value} index={3}>
                
            </MyVoucherTabPanel>
            <MyVoucherTabPanel value={value} index={4}>
                
            </MyVoucherTabPanel>
            </Box>
        {/*
        </CardBody>
        */}
    
    </div>
  );
}
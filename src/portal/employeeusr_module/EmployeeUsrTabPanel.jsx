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
import { FaTrash } from "react-icons/fa";
import InboxEmployeeUser from './InboxEmployeeUser';
import NewComposeRequest from './NewComposeRequest';
import SentboxEmployeeUser from './SentboxEmployeeUser';
import DraftboxEmployeeUser from './DraftboxEmployeeUser';
import ArchivedBoxEmployeeUser from './ArchivedBoxEmployeeUser';


function EmployeeUsrTabPanel(props) {
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

EmployeeUsrTabPanel.propTypes = {
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
  React.useEffect(()=>{
      const uToken = localStorage.getItem('user-token');
      if(uToken!=null && uToken!=""){
          //alert('userToken='+uToken)
          setUserToken(uToken);
      }
  },[]);

  return (
    <div>
        
        <NewComposeRequest/>
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
            <EmployeeUsrTabPanel value={value} index={0}>
                <InboxEmployeeUser />
            </EmployeeUsrTabPanel>
            <EmployeeUsrTabPanel value={value} index={1}>
                <SentboxEmployeeUser />
            </EmployeeUsrTabPanel>
            <EmployeeUsrTabPanel value={value} index={2}>
                <DraftboxEmployeeUser />
            </EmployeeUsrTabPanel>
            <EmployeeUsrTabPanel value={value} index={3}>
                <ArchivedBoxEmployeeUser />
            </EmployeeUsrTabPanel>
            <EmployeeUsrTabPanel value={value} index={4}>
                
            </EmployeeUsrTabPanel>
            </Box>
        {/*
        </CardBody>
        */}
    
    </div>
  );
}
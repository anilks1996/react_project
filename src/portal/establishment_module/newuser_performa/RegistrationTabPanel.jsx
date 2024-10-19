import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { FaBackward } from 'react-icons/fa';
import ApprovedRegisteredEmployee from './ApprovedRegisteredEmployee';
import RejectedRegisteredEmployees from './RejectedRegisteredEmployee';
import SentLinkForRegister from './SentLinkForRegister';
import PendingRegisteredEmployee from './PendingRegisteredEmployee';
import InboxRegisteredEmployee from './InboxRegisteredEmployee';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

TabPanel.propTypes = {
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


  return (
    <div>
    <Card>
        <CardHeader className='p-1'><Button onClick={()=>{window.history.back();}}><FaBackward/></Button>New EmployeeList 
        </CardHeader>

        <CardBody style={{backgroundImage: 'linear-gradient(85deg, #ded8d8, #fefbfb)'}}>
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
                         
                <Tab label="Inbox" {...a11yProps(0)} className='card form-shadow p-3' style={{ width:'3rem', height:'1.1rem',background:
                "linear-gradient(31deg, rgb(45 172 237) 0%, rgb(255 255 255) 51%, rgb(26 207 244) 100%)", boxSizing:'content-box'}} 
                /> 
                 
                <Tab label="Pending" {...a11yProps(2)} className='form-shadow p-3 mt-2' style={{ width:'1rem', height:'1.1rem',background:
                "linear-gradient(31deg, rgb(255 255 255) 0%, rgb(237 237 149) 61%, rgb(255 255 255) 100%)", boxSizing:'content-box', borderRadius:'.2rem'}} />
                <Tab label="Approved" {...a11yProps(3)} className='form-shadow p-3 mt-2' style={{ width:'1rem', height:'1.1rem',background:
                "linear-gradient(31deg, rgb(255, 255, 255) 0%, rgb(80 244 100) 61%, rgb(255, 255, 255) 100%)", boxSizing:'content-box', borderRadius:'.2rem'}}/>
                <Tab label="Rejected" {...a11yProps(4)} className='form-shadow p-3 mt-2' style={{ width:'1rem', height:'1.1rem',background:
                "linear-gradient(31deg, rgb(255, 255, 255) 0%, rgb(242 76 112) 61%, rgb(255, 255, 255) 100%)", boxSizing:'content-box', borderRadius:'.2rem'}}/>
                <Tab label="Sent Link" {...a11yProps(1)} className='form-shadow p-3 mt-2' style={{ width:'1rem', height:'1.1rem',background:
                "linear-gradient(31deg, rgb(255, 255, 255) 0%, rgb(97 125 224) 61%, rgb(255, 255, 255) 100%)", boxSizing:'content-box', borderRadius:'.2rem'}}/>            
            </Tabs>

            {/*</Card>
          */}
            <TabPanel value={value} index={0}>
                <InboxRegisteredEmployee />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PendingRegisteredEmployee />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ApprovedRegisteredEmployee />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <RejectedRegisteredEmployees />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <SentLinkForRegister />
            </TabPanel>
            </Box>

        </CardBody>
    </Card>
    </div>
  );
}
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, Col, Row} from 'react-bootstrap';
import { CardHeader} from 'reactstrap';
import { FaBackward } from 'react-icons/fa';
import EditCountryTab from './EditCountryTab';
import EditStateTab from './EditStateTab';
import EditCityTab from './EditCityTab';
import EditLocationInCityTab from './EditLocationInCityTab';


function LocationPanel(props) {
  const { children, value, index, ...other } = props;

  React.useEffect(()=>{
    window.scrollTo({top:0, left:0, behavior:'smooth'});
  }, []);
  return (
    <div
      role="locationPanel" hidden={value !== index}
      id={`full-width-locationPanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}  style={{minWidth:'65rem'}} className="p-2">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

LocationPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-locationPanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
    <Card>
        <CardHeader className='p-0'><Button onClick={()=>{window.history.back();}}><FaBackward/></Button> Establishment Setup / Add Location</CardHeader>
        <Row>
        
        <Col sm="12">        
            <Box sx={{ bgcolor: 'background.paper'}}>
                <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="COUNTRY" {...a11yProps(0)}/>
                    <Tab label=" STATE" {...a11yProps(1)}/>
                    <Tab label=" CITY" {...a11yProps(2)} />
                    <Tab label=" LOCATION IN CITY" {...a11yProps(3)}/>
                    
                </Tabs>
                </AppBar>
                <Tabs axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value}
                    onChangeIndex={handleChangeIndex}
                >
                <LocationPanel value={value} index={0} dir={theme.direction} >
                    <EditCountryTab/>
                </LocationPanel>
                <LocationPanel value={value} index={1} dir={theme.direction}>
                    <EditStateTab/>
                </LocationPanel>
                <LocationPanel value={value} index={2} dir={theme.direction}>
                    <EditCityTab/>
                </LocationPanel>
                <LocationPanel value={value} index={3} dir={theme.direction}>
                    <EditLocationInCityTab/>
                </LocationPanel>
                
                </Tabs>
            </Box>   
            </Col>
        </Row>    
        </Card> 
    </div>
  );
}
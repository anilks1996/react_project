import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, Col, Row} from 'react-bootstrap';
import { CardBody, CardHeader, CardText, CardTitle, Table} from 'reactstrap';
import EditGeneralEmployeeTab from './EditGeneralEmployeeTab';
import { FaBackward, FaUser } from 'react-icons/fa';
import EditEmploymentTab from './EditEmploymentTab';
import EditPersonalTab from './EditPersonalTab';
import EditQualificationTab from './EditQualificationTab';
import EditExperienceTab from './EditExperienceTab';
import EditContactTab from './EditContactTab';
import EditFamilyTab from './EditFamilyTab';
import EditOthersTab from './EditOthersTab';
import EditPayrollTab from './EditPayrollTab';
import boss_photo from '../../establishment_module/document/rkgupta.png';
import { useDispatch, useSelector } from 'react-redux';
import { downloadDocumentVerificationById, findDocumentVerificationByEmployee } from './document_slice/documentVerificationSlice';
import { Download } from '@mui/icons-material';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel" hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 9 }}  className='p-0' style={{backgroundColor:'#1b4d7e'}}>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
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

  const {employeeById, loading} = useSelector((state)=>state.allstorereducer.employeeData);
  const {documentVers,docVerLoading} = useSelector((state)=>state.allstorereducer.documentVerification); 
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(findDocumentVerificationByEmployee(employeeById.id));
  })

  const handleDownload = async(event,docvId)=>{
    event.preventDefault();
    dispatch(downloadDocumentVerificationById(docvId));
  }

  return (
    <div>
    <Card>
        {/* <CardHeader className='p-0'><Button onClick={()=>{window.history.back();}}><FaBackward/></Button> Establishment Transactions / Employee Register</CardHeader> */}
        <Row>
        <Col sm="2">
            <Card className='form-shadow mt-0'>
              <CardHeader>
                  <FaUser /> ID : {employeeById.code}
              </CardHeader>
              <CardBody className='p-1'>
                <CardTitle tag="h5">
                {
                  employeeById.code=='20003'?
                  <img src={boss_photo} width="90rem" height="100rem" text-align="center" />
                  :
                  <img src="" width="90rem" height="100rem" text-align="center" />
                }                
                </CardTitle>
                <CardTitle>
                  Name : {employeeById && employeeById.fullName}
                </CardTitle>
              </CardBody>
              <CardHeader> Documents </CardHeader>
              <CardBody className='p-0' style={{fontSize:'0.8rem'}}>  
              {
                documentVers && documentVers.length>0?
                <Table>
                  <tbody>
                      {
                        documentVers.map((docv)=>(
                          
                          docv && docv.uploadDocument!=null && docv.uploadDocument!=undefined && docv.uploadDocument!=''?                          
                            <tr key={docv.id} className='p-0'>
                              <td> {docv && docv.uploadDocument} </td>
                              <td> <button onClick={(e)=>{handleDownload(e,docv.id)}} style={{backgroundColor:'white', border:'none'}} title='Download the file'><Download style={{color:'green'}}/></button> </td>
                            </tr>
                            :
                            <></>
                        ))
                      }
                  </tbody>
                </Table>
                :
                <div></div>
              }
              </CardBody>
            </Card>
        </Col>
        <Col sm="10">        
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
                    <Tab label="GENERAL" {...a11yProps(0)}/>
                    <Tab label=" EMPLOYMENT" {...a11yProps(1)} className='p-4' style={{fontSize:'small'}}/>
                    <Tab label=" PERSONAL" {...a11yProps(2)} style={{fontSize:'small'}}/>
                    <Tab label=" QUALIFICATION" {...a11yProps(3)} className='p-4' style={{fontSize:'small'}}/>
                    <Tab label=" EXPERIENCE" {...a11yProps(4)} className='p-4' style={{fontSize:'small'}}/>
                    <Tab label=" CONTACT" {...a11yProps(5)} />
                    <Tab label=" FAMILY" {...a11yProps(6)} />
                    <Tab label=" OTHERS" {...a11yProps(7)} />
                    <Tab label=" PAYROLL" {...a11yProps(8)} />
                </Tabs>
                </AppBar>
                <Tabs axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value}
                    onChangeIndex={handleChangeIndex}
                >
                <TabPanel value={value} index={0} dir={theme.direction} >
                    <EditGeneralEmployeeTab/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <EditEmploymentTab/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <EditPersonalTab/>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <EditQualificationTab/>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <EditExperienceTab/>
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                    <EditContactTab/>
                </TabPanel>
                <TabPanel value={value} index={6} dir={theme.direction}>
                    <EditFamilyTab/>
                </TabPanel>
                <TabPanel value={value} index={7} dir={theme.direction}>
                    <EditOthersTab/>
                </TabPanel>
                <TabPanel value={value} index={8} dir={theme.direction}>
                    <EditPayrollTab/>
                </TabPanel>
                </Tabs>
            </Box>   
            </Col>
        </Row>    
        </Card> 
    </div>
  );
}
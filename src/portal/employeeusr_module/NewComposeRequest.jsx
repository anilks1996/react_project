import * as React from 'react';
import { useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { MdChangeCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import boss_photo from '../../../src/portal/establishment_module/document/rkgupta.png';
import { Dashboard, Edit, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInEmployee, validateLogoutUser } from '../../auth/auth_slice/loginUserSlice';
import { BiPlus } from 'react-icons/bi';
import { FaPlusSquare } from 'react-icons/fa';


export default function NewComposeRequest() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigatePage=useNavigate();
  const dispatch=useDispatch();
  const {activeUserId,loggedInUser,loggedInEmployee,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken]=useState();
  React.useEffect(()=>{
    dispatch(getLoggedInEmployee());
    let ustoken = localStorage.getItem('user-token');       
        if (ustoken || ustoken != 'undefined') {
            setUserToken(ustoken);
            setIsLoggedIn(true);
        } 
  },[]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const leaveRequest=()=>{
    //alert('leave')
    navigatePage(`/employeeUserInbox/showLeaveUserForm/${loggedInEmployee.id}`);
  }
  const storeRequest=()=>{
    alert('store')
  }
  const tourRequest=()=>{
    //alert('tour')
    navigatePage(`/employeeUserInbox/showTourApplicationForm/${loggedInEmployee.id}`);
  }
  const purchaseRequest=()=>{
    alert('purchase')
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Profile settings" className='p-0'>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mr: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <button className='btn btn-info p-1'>&nbsp; Compose <Edit/> </button>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu 
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              padding: 2,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
        <MenuItem onClick={leaveRequest} className='p-3'>
          <FaPlusSquare style={{backgroundColor:'#57afd3',color:'white'}}/> &nbsp; Leave Request 
        </MenuItem>
        <MenuItem onClick={storeRequest} className='p-3'>
          <FaPlusSquare style={{backgroundColor:'#57afd3',color:'white'}}/>&nbsp; Store Request
        </MenuItem>       
        <MenuItem onClick={tourRequest} className='p-3'>
          <FaPlusSquare style={{backgroundColor:'#57afd3',color:'white'}}/> &nbsp; Tour Request
        </MenuItem>
        <MenuItem onClick={purchaseRequest} className='p-3'>
          <FaPlusSquare style={{backgroundColor:'#57afd3',color:'white'}}/> &nbsp; Purchase Request
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

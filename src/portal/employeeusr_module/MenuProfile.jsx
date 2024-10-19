import * as React from 'react';
import { useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { MdChangeCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import boss_photo from '../../../src/portal/establishment_module/document/rkgupta.png';
import { Dashboard, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { validateLogoutUser } from '../../auth/auth_slice/loginUserSlice';


export default function MenuProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigatePage=useNavigate();
  const dispatch=useDispatch();
  const {activeUserId,loggedInUser,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken]=useState();
  React.useEffect(()=>{
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
  const myProfile=()=>{
    navigatePage("/fileManager")
    setAnchorEl(null);
  }
  
  const showDashboard=()=>{
    navigatePage("/");
    setAnchorEl(null);
  }
  const switchRole=()=>{
    navigatePage("/auth/userrole")
    setAnchorEl(null);
  }
  const logout=()=>{
    if(window.confirm('Do you wanna logout?')){
      
      localStorage.clear();
      dispatch(validateLogoutUser());
      //alert(localStorage.getItem("user-token"));
      navigatePage('/auth/login');
      }  
    setAnchorEl(null);
  }
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/*
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        */}
        <Tooltip title="Profile settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
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
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
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
        <MenuItem onClick={myProfile}>
        {
          userToken && userToken==='20003'?
            <img src={boss_photo} width="100rem" height="90rem" text-align="center" className='ml-2'/>
            :
            <img src="" width="100rem" height="90rem" text-align="center" className='ml-2'/>
        }
          {" "}User ID: {userToken}
        </MenuItem>
        <Divider />
        <MenuItem onClick={myProfile}>
          <Avatar style={{backgroundColor:'#57afd3',color:'#fffff'}}/> My Profile {" "}(User Role)
        </MenuItem>
        <MenuItem onClick={showDashboard}>
          <ListItemIcon>
            <Dashboard  style={{backgroundColor:'#57afd3',color:'white',width:'1.5rem',height:'1.5rem'}}/> 
          </ListItemIcon>
          {" "}Dashboard
        </MenuItem>       
        <MenuItem onClick={switchRole}>
          <ListItemIcon>
            <MdChangeCircle style={{backgroundColor:'white',color:'#57afd3',width:'2.1rem',height:'2.1rem'}}/>
          </ListItemIcon>
          {"  "}Switch Your Role {"  "}
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout style={{backgroundColor:'white',color:'#57afd3',width:'1.6rem',height:'1.5rem'}}/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

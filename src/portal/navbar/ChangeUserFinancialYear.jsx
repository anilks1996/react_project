import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import RadioGroup from '@mui/joy/RadioGroup';
import { BsCalendarDate } from "react-icons/bs";
import { BsCalendarDateFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAccCompanyFinancialYear, populateAccCompanyFinancialYearList } from '../account_module/accounts_redux/slices/accounts_slice/accCompanyFinancialSlice';
import { useNavigate } from 'react-router-dom';


const ChangeUserFinancialYear=()=> {
    const {acfy,acfyList,acfyLoading}=useSelector((state)=>state.allstorereducer.acfy);
    const dispatch=useDispatch();
    const [checkedValue,setCheckedValue]=React.useState();
    const navigatePage=useNavigate();

    React.useEffect(()=>{
        dispatch(populateAccCompanyFinancialYearList());
        dispatch(getActiveAccCompanyFinancialYear());

        if(acfy){
            setCheckedValue(acfy.id);
        }
    },[]);

    const handleChange=(e)=>{
        //alert(e.target.name+", value="+e.target.value+", check "+checkedValue);
        if(e.target.value!=undefined){
            if(window.confirm("Are you sure to change f.y.?")){   
                setCheckedValue(e.target.value);         
                toast.success("Financial year changed.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            navigatePage("/auth/userrole");
            }
        }       
    }

  return (
    <RadioGroup aria-label="Your plan" name="accCompanyFinancialYear" defaultValue="Individual">
      <List
        sx={{
          minWidth: 240,
          '--List-gap': '0.4rem',
          '--ListItem-paddingY': '1rem',
          '--ListItem-radius': '8px',
          '--ListItemDecorator-size': '32px',
        }}
      >
        {
        acfyList && acfyList.map((item, index) => (
          <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm', color:'rgb(32,160,181)'}}>
            <ListItemDecorator>
              {[<BsCalendarDate />, <BsCalendarDateFill />, <BsCalendarDate />, <BsCalendarDateFill />,<BsCalendarDate />, <BsCalendarDateFill />,<BsCalendarDate />, <BsCalendarDateFill />,<BsCalendarDate />, <BsCalendarDateFill />][index]}
            </ListItemDecorator>
            <Radio
              overlay
              value={item.id}
              label={(item && item.companyName)+' : '+(item && item.fyName)+' - '+item.status}
              onChange={handleChange} checked={checkedValue==item.id? true:false}
              sx={{ flexGrow: 1, flexDirection: 'row-reverse'}}
              slotProps={{
                action: ({ checked }) => ({sx: (theme) => ({...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </ListItem>
        ))
        }
      </List>
      <ToastContainer></ToastContainer>
    </RadioGroup>
  );
}

export default ChangeUserFinancialYear;

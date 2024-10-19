import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Step1InitiativeVoucher from './Step1InitiativeVoucher';
import Step2VoucherTransaction from './Step2VoucherTransaction';
import Step3PaymentInstument from './Step3PaymentInstument';
import Step4Workflow from './Step4Workflow';
import Step5ViewSubmit from './Step5ViewSubmit';
import { useNavigate, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material';
import { MdSwapHorizontalCircle } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa6";
import { FcWorkflow } from "react-icons/fc";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const steps = ['Initiative (with voucher types)', 'Transactions', 'Payment Instrument', 'Workflow', 'Review & Submit'];

export default function CreateVoucherStepper() {
  const {voucherid,username} = useParams();
  const {voucher,vloading}=useSelector((state)=>state.allstorereducer.voucherEntry);
  const navigatePage=useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    //return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if(voucherid && voucherid!=null && voucherid!=undefined && username!=null){
      //alert("active step="+activeStep+1);
      if(activeStep===0 && username.includes("Draft")){
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }else if(activeStep===1 && username.includes("Draft")){
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }else if(activeStep===2){
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }else if(activeStep===3 && username.includes("workflow")){
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }else if(activeStep===4 && username.includes("workflow")){
        navigatePage("/myVoucherInbox");
      }else{
        toast.error("Please complete step "+(activeStep+1)+" & save !!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }else{
        toast.error("Please complete the step & save!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //
  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 48,
    height: 48,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(69 228 237) 0%, rgb(29 133 159) 50%, rgb(91 225 244) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
  }));
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <FaRegCreditCard />,
      2: <MdSwapHorizontalCircle/>,
      3: <FaMoneyCheck />,
      4: <FcWorkflow />,
      5: <IoCheckmarkDoneSharp />,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }


  return (
    <Box sx={{ width: '80rem',padding:'1rem' }} className="form-shadow">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps} sx={{boxSizing:'border-box',fontSize:'2rem'}}>
              <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon} sx={{boxSizing:'border-box',fontSize:'2rem'}}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
          <i>Step {activeStep + 1}.</i>
          <i style={{color:'red', fontSize:'0.8rem'}}> As you select options and fill values, form will automatically guide you for next steps.</i>
          {
            activeStep===0? 
            <Step1InitiativeVoucher />
            :           
                activeStep===1?
                <Step2VoucherTransaction />
                :
                    activeStep===2?
                    <Step3PaymentInstument />
                    :
                        activeStep===3?
                        <Step4Workflow />
                        :
                            activeStep===4?
                            <Step5ViewSubmit />
                            :
                            <div>Welcome</div>
            
            
          }
          
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button  color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} /> {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>

          <ToastContainer></ToastContainer>
        </React.Fragment>
      )}
    </Box>
  );
}

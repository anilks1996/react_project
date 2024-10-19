import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from "../../serviceUrl/AxiosURL";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaHome, FaLock, FaUser } from "react-icons/fa";
import captch_logo from '../client/images/refresh.jpg';
import cli_logo from '../client/images/logo.png';
import './loginstyle.css'
import WaitScreen from "./WaitScreen";

const Login=()=>{
    var captchVal=0;
    const navigate = useNavigate();
    const [loginCredential, setLoginCredential]=useState({
        username:'',
        password:'',
        captcha:''
    });  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange=(event, field)=>{
        let pass=event.target.value;
        setLoginCredential({
            ...loginCredential,
            [field]:pass
        })
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        //console.log(loginCredential); 
        console.log("loginCredential");        
        if(!checkCaptcha()){
            toast.error('Invalid captch value !', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        if(loginCredential.username.trim().length !==0 && loginCredential.password.trim().length !==0){
            if(validateAlreadyLoggedIn(loginCredential)){                
                if(window.confirm("You'r already logged in. Do you want continue?")){
                    navigateLoginSuccess();
                }else{
                    localStorage.clear();
                    navigate('/auth/login');
                } 
            }else{
                try {
                    const response = await fetch(BASE_URL+"auth/login", {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(loginCredential),
                    });              
                    if (!response.ok) {
                        toast.error("Invalid username or password.", {
                            position: "top-center",autoClose: 3000, hideProgressBar: false,closeOnClick: true,
                            pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
                        });
                        throw new Error(`Error: ${response.status}`);
                    }
                    
                    const result = await response.json();
                    //alert("hellooo"+result)
                    if(result!=undefined){
                        localStorage.setItem('user-token',result.username);
                        localStorage.setItem('current-jwtToken',result.jwtToken);
                        navigateLoginSuccess();
                    }else{
                        toast.error("Invalid username or password.", {
                            position: "top-center",autoClose: 3000, hideProgressBar: false,closeOnClick: true,
                            pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
                        });
                    }                    
                  } catch (error) {
                        toast.error("Invalid username or password.", {
                            position: "top-center",autoClose: 3000, hideProgressBar: false,closeOnClick: true,
                            pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
                        });
                        setError(error.message);
                  } finally {
                        setLoading(false);
                  }
                //navigateLoginSuccess();
            }
        }
    };

    const checkCaptcha=()=>{
        let alreadyCaptcha=document.getElementById('captchaValue').innerHTML;
        if(alreadyCaptcha===loginCredential.captcha){
            return true;
        }else{
            return false;
        }
    }

    const navigateLoginSuccess = async()=>{
        const userToken = localStorage.getItem('user-token');
        setTimeout(() => {
            if (userToken) {
                localStorage.removeItem('user-token');
            }
        }, 300000);
        if(userToken==='setup'){
            navigate("/adminSetupDashboard");
        }else{
            try {
                const response = await fetch(BASE_URL+`auth/firstTimeSetPassword/${userToken}`, {
                  method: 'GET',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(),
                });
          
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
          
                const result = await response.json();               
                if(result!=undefined && result.userId!=undefined){
                    if(result && result.status===0){
                        navigate(`/passwordResetPage/${result.userId}`);
                    }else{
                        navigate('/');
                    }
                }
              } catch (error) {
                    setError(error.message);
              } finally {
                    setLoading(false);
              }
            //navigate page
            //navigate('/');
        }       
    }

    function validateAlreadyLoggedIn(loginCredential){       
        const localUserId=localStorage.getItem('user-token');
        if(localUserId !=null){
            if(localUserId===loginCredential.username){
                return true;            
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    const validateLoginUser = async(loginCredential)=>{
        alert("---- validate login --- ")
        try {
            const response = await fetch(BASE_URL+"auth/login", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginCredential),
            });
      
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
              return false;
            }
      
            const result = await response.json();
            localStorage.setItem('user-token',result.username);
            localStorage.setItem('current-jwtToken',result.jwtToken);
            // Handle successful login (e.g., redirect or update state)
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        navigateLoginSuccess("/");
    }

    useEffect(()=>{
    // axios.get(bsURL).then((response)=>{
    // tempV=response.data;
    // tempV.map(cCode=>{
    // setClientCode(cCode.code);
    //         })
    //     });
    
    localStorage.clear();   
        refreshCaptcha();  
        document.getElementById('captchaid').innerHTML=0;  
    },[])

    function refreshCaptcha(){
        // var allValue=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X',
        // 'Y','Z','0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
        // 'q','r','s','t','u','v','w','x','y','z'];
        var allValue=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X',
            'Y','Z','0','1','2','3','4','5','6','7','8','9'];
        var cValue1=allValue[Math.floor(Math.random()*allValue.length)];
        var cValue2=allValue[Math.floor(Math.random()*allValue.length)];
        var cValue3=allValue[Math.floor(Math.random()*allValue.length)];
        var cValue4=allValue[Math.floor(Math.random()*allValue.length)];
        var cValue5=allValue[Math.floor(Math.random()*allValue.length)];
        var cValue6=allValue[Math.floor(Math.random()*allValue.length)];
        captchVal=cValue1+cValue2+cValue3+cValue4+cValue5+cValue6;
        document.getElementById('captchaValue').innerHTML=captchVal;
    }
    function forgotPassword(){
        alert('forgot password');
    }

    if(loading){
        <WaitScreen />
    }

    return(

    <React.Fragment>
        {/*<div class="container-fluid"> */}
        <div>
            <div class="row" style={{backgroundColor:'lightgray'}}>
                <div class="col-2">
                    <img src={cli_logo} height="70px" width="50%"/>
                    </div>
                    <div class="col-md-8 mt-4">
                    {/*<i><b><h3 class="text-center">Gurugram Metropolitan Development Authority</h3></b></i> */}
                    <i><b><h3 class="text-center">ERP Software Application</h3></b></i>
                    <i><h6 class="text-center">A Statutory Authority Under GMDA Act 2017</h6></i>
                </div>
                    {/* <div class="col-md-2 mt-5">
                    </div> */}
            </div>
        </div>
        
    <div>
        <form onSubmit={handleSubmit}>
            <div className="header-container">
                <div className="login-container">               
                    <div className="login-header">
                    {/* <div className="login-text"><img src={client_logo} alt=""/></div>  */}                                                    
                        <div className="login-underline">User Login</div>              
                    </div>
                    <div className="login-inputs">
                        <div className="login-input">
                            <span><FaUser/></span>
                            <input type="text" placeholder="Username" id="userId" className="" value={loginCredential.username} onChange={(e)=>handleChange(e,'username')}/>
                        </div>
                        <div className="login-input">
                            <span><FaLock/></span>
                            <input type="password" placeholder="Password" id="passid" className="" value={loginCredential.password} onChange={(e)=>handleChange(e,'password')}/>
                        </div>
                        <div className="login-captch">
                            <div id="captchaValue"></div>
                                <button onClick={refreshCaptcha}><img src={captch_logo} alt="Click here to refresh"/></button>
                                <input type="text" placeholder="Captcha" id="captchaid" value={loginCredential.captcha} onChange={(e)=>handleChange(e,'captcha')}/>
                            </div>
                        </div>
                                            
                    <div className="login-submit-container">                   
                        <button type="submit"><div className="login-submit">Sign In</div></button>
                        <button onClick={forgotPassword}><div className="login-submit">Reset Password</div></button>
                    </div>                
                </div>
            </div>
        </form> 
    </div>  
    <ToastContainer>
    </ToastContainer>
    </React.Fragment>

    )
}

export default Login;

import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import PortalFooter from "./portal/footer/PortalFooter";
import PortalNavbar from "./portal/navbar/PortalNavbar";
import { Provider } from "react-redux";
import { store } from "./store_redux/store";
import BASE_URL from "./serviceUrl/AxiosURL";


function App() {
    const navigate=useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser,setLoggedUser] = useState(null);

    const checkUserToken = () => {
        //alert("checkUserToken = "+localStorage.getItem('user-token'));
        try {
            const currentUser=localStorage.getItem("current-jwtToken");
            const response= fetch(BASE_URL+"api/user/activeUserId", {
                method:"GET",
                headers:{"Authorization":`Bearer ${currentUser}`},
                body:JSON.stringify()
            });
      
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }          
            const result = response.json();
            setLoggedUser(result);
          } catch (error) {
                console.log(error.message);
          } finally {
                //setLoading(false);
          }

        const userToken = localStorage.getItem('user-token');  
        if(localStorage.getItem('user-token') || loggedUser!=null){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
            return navigate('/auth/login');
        }     
        
        setIsLoggedIn(true);       
    }
    useEffect(() => {
        checkUserToken();
        //alert("localStorage = "+localStorage.getItem('user-token')+", loggedIn: "+isLoggedIn);
    }, [isLoggedIn]);
	
	return (
		<React.Fragment>
        <Provider store={store}>
        
            {isLoggedIn && <PortalNavbar />}
        {/*     <SideBar>   */}
                <Outlet />
        {/*    </SideBar>         */}
			{isLoggedIn && <PortalFooter />}
            </Provider>
		</React.Fragment>
	);
}

export default App;

import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../serviceUrl/AxiosURL';

export const createAppUser = createAsyncThunk("createAppUser", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/user/create", {
    method:"POST",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    return rejectWithValue(error.response);
  }
}) ;

export const findAppUserById=createAsyncThunk("findAppUserById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/user/${id}`, {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})

export const findUserByStartWithFirstLetter=createAsyncThunk("findUserByStartWithFirstLetter", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/user/firstName/${data}`, {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const findUserByStartWithUserId=createAsyncThunk("findUserByStartWithUserId", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/user/userId/${data}`, {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})

export const updateAppUserById=createAsyncThunk("updateAppUserById", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/user/edit/${data.id}`, {
    method:"PUT",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  });
 try {
  const result=response.json();
  return result;
 } catch (error) {
  return rejectWithValue(error.response);
 }
})

export const resetPasswordOfUser=createAsyncThunk("resetPasswordOfUser", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/user/reset/${id}`, {
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})

export const changePasswordOfUser=createAsyncThunk("changePasswordOfUser", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/user/changePassword/${data.id}`, {
    method:"PUT",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})

export const deleteAppUserById=createAsyncThunk("deleteAppUserById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/user/delete/${id}`, {
    method:"DELETE",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})

export const findAppUsersByUserType=createAsyncThunk("findAppUsersByUserType", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/user/userType/${data}`, {
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const findAllAppUsers=createAsyncThunk("findAllAppUsers", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/user/", {
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})

export const validateLoginUser=createAsyncThunk("validateLoginUser", async(data, {rejectWithValue})=>{
  const response=await fetch("http://localhost:9090/auth/login", {
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify(data)
  });
 try {
  const result=response.json();
  return result;
 } catch (error) {
  return rejectWithValue(error.response);
 }
})

export const getActiveUserId=createAsyncThunk("getActiveUserId", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/user/activeUserId", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})

export const getLoggedInUser=createAsyncThunk("getLoggedInUser", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/user/activeUser", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const getLoggedInEmployee=createAsyncThunk("getLoggedInEmployee", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/user/activeEmployee",{
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})

export const validateLogoutUser=createAsyncThunk("validateLogoutUser", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/user/logout", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
 try {
    const result=response.json();
    return result;
 } catch (error) {
    return console.log(error);
 }
})

export const loginUserSlice = createSlice({
  name:"loginUserSlice",
  initialState:{
    user:[],
    activeUserId:[],
    employeeId:[],
    activeUsers:[],
    userJWTToken:[],
    loggedInUser:[], 
    loggedInEmployee:[],
    loggedEmployeeId:[],
    appUser:[],
    appUsers:[],
    resetUser:[],
    userLoading: false, 
    createLoading:false,
    updateLoading:false,
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    builder.addCase(getLoggedInUser.pending, (state)=>{ state.loading=true; })
    builder.addCase(getLoggedInUser.fulfilled, (state, action)=>{ state.loading=false; state.loggedInUser=action.payload;  state.error=''; })
    builder.addCase(getLoggedInUser.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
    //Logged Employee
    builder.addCase(getLoggedInEmployee.pending, (state)=>{ state.loading=true; })
    builder.addCase(getLoggedInEmployee.fulfilled, (state, action)=>{ state.loading=false; state.loggedInEmployee=action.payload;  state.error=''; })
    builder.addCase(getLoggedInEmployee.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
    
    //setting user
    builder.addCase(validateLoginUser.pending, (state)=>{state.userLoading=true; })
    builder.addCase(validateLoginUser.fulfilled, (state, action)=>{ state.userLoading=false; state.userJWTToken=action.payload; state.error=''; })
    builder.addCase(validateLoginUser.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })    
    //setting user logout
    builder.addCase(validateLogoutUser.pending, (state)=>{state.userLoading=true; })
    builder.addCase(validateLogoutUser.fulfilled, (state, action)=>{ state.userLoading=false; state.activeUserId=null; state.loggedInUser=[]; state.userJWTToken=[]; state.error=''; })
    builder.addCase(validateLogoutUser.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; state.activeUserId=[]; state.userJWTToken=[]; state.loggedInUser=[];})
    
    //getActiveUserId
    builder.addCase(getActiveUserId.pending, (state)=>{state.userLoading=true; })
    builder.addCase(getActiveUserId.fulfilled, (state, action)=>{ state.userLoading=false; state.activeUserId=action.payload; state.error=''; })
    builder.addCase(getActiveUserId.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })
    
    //Create/update/delete/fetch
    builder.addCase(createAppUser.pending, (state)=>{state.createLoading=true; })
    builder.addCase(createAppUser.fulfilled, (state, action)=>{ state.createLoading=false; state.appUser=action.payload; state.error=''; })
    builder.addCase(createAppUser.rejected, (state, action)=>{state.createLoading=false; state.error=action.payload; })
   
    builder.addCase(updateAppUserById.pending, (state)=>{state.updateLoading=true; })
    builder.addCase(updateAppUserById.fulfilled, (state, action)=>{ state.updateLoading=false; state.appUser=action.payload; state.error=''; })
    builder.addCase(updateAppUserById.rejected, (state, action)=>{state.updateLoading=false; state.error=action.payload; })
   
    builder.addCase(deleteAppUserById.pending, (state)=>{state.userLoading=true; })
    builder.addCase(deleteAppUserById.fulfilled, (state, action)=>{ state.userLoading=false; state.appUsers=action.payload; state.error=''; })
    builder.addCase(deleteAppUserById.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })
   
    builder.addCase(findAppUserById.pending, (state)=>{state.userLoading=true; })
    builder.addCase(findAppUserById.fulfilled, (state, action)=>{ state.userLoading=false; state.appUser=action.payload; state.resetUser=null; state.error=''; })
    builder.addCase(findAppUserById.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })
    
    builder.addCase(resetPasswordOfUser.pending, (state)=>{state.userLoading=true; })
    builder.addCase(resetPasswordOfUser.fulfilled, (state, action)=>{ state.userLoading=false; state.resetUser=action.payload; state.error=''; })
    builder.addCase(resetPasswordOfUser.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })
    builder.addCase(changePasswordOfUser.pending, (state)=>{state.userLoading=true; })
    builder.addCase(changePasswordOfUser.fulfilled, (state, action)=>{ state.userLoading=false; state.resetUser=action.payload; state.error=''; })
    builder.addCase(changePasswordOfUser.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })


    builder.addCase(findAllAppUsers.pending, (state)=>{state.userLoading=true; })
    builder.addCase(findAllAppUsers.fulfilled, (state, action)=>{ state.userLoading=false; state.appUsers=action.payload; state.error=''; })
    builder.addCase(findAllAppUsers.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })
    
    builder.addCase(findAppUsersByUserType.pending, (state)=>{state.userLoading=true; })
    builder.addCase(findAppUsersByUserType.fulfilled, (state, action)=>{ state.userLoading=false; state.appUsers=action.payload; state.error=''; })
    builder.addCase(findAppUsersByUserType.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })
  
//Start with firstname 
    builder.addCase(findUserByStartWithFirstLetter.pending, (state)=>{state.userLoading=true; })
    builder.addCase(findUserByStartWithFirstLetter.fulfilled, (state, action)=>{ state.userLoading=false; state.appUsers=action.payload; state.resetUser=null; state.error=''; })
    builder.addCase(findUserByStartWithFirstLetter.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })
  
    builder.addCase(findUserByStartWithUserId.pending, (state)=>{state.userLoading=true; })
    builder.addCase(findUserByStartWithUserId.fulfilled, (state, action)=>{ state.userLoading=false; state.appUsers=action.payload; state.resetUser=null; state.error=''; })
    builder.addCase(findUserByStartWithUserId.rejected, (state, action)=>{state.userLoading=false; state.error=action.payload; })
  

  }
  
});

export default loginUserSlice.reducer;

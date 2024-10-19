import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createEmployeeType = createAsyncThunk("createEmployeeType", async (data, {rejectWithValue})=>{
  //const response=await fetch(BASE_URL+"employeeTypeList", {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/employeeType/", {
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
});

export const showEmployeeType=createAsyncThunk("showEmployeeType", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/employeeType/", {
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  //const response=await fetch(BASE_URL+"employeeTypeList");
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const showUserRoleList=createAsyncThunk("showUserRoleList", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/userrole/", {
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const deleteEmployeeType = createAsyncThunk("deleteEmployeeType", async(id)=>{
    //const response=await fetch(BASE_URL+`employeeTypeList/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/employeeType/${id}`, {
      method:"DELETE",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      console.log("result==="+result)
      return result;
    }catch(error){
      console.log("error= "+error);
    }
  })
export const editEmployeeType = createAsyncThunk("editEmployeeType", async(data)=>{
  //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/employeeType/${data.id}`, {  
    method:"PUT",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  })
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
});

export const employeeTypeSlice = createSlice({
  name:"employeeTypeSlice",
  initialState:{
    employeeTypes:[], 
    userRoles:[],
    loading: false, 
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showEmployeeType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showEmployeeType.fulfilled, (state, action)=>{
      state.loading=false
      state.employeeTypes=action.payload
      console.log("========== User Role ====="+action.payload);
      state.error=''
    })
    builder.addCase(showEmployeeType.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For user Role List
    builder.addCase(showUserRoleList.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showUserRoleList.fulfilled, (state, action)=>{
      state.loading=false
      state.userRoles=action.payload
      state.error=''
    })
    builder.addCase(showUserRoleList.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For Delete
    builder.addCase(deleteEmployeeType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(deleteEmployeeType.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      console.log("state.departments===="+state.departments)
    })
    builder.addCase(deleteEmployeeType.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createEmployeeType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createEmployeeType.fulfilled, (state, action)=>{
      state.loading=false
      //state.employeeTypes=action.payload
      state.error=''
    })
    builder.addCase(createEmployeeType.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editEmployeeType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editEmployeeType.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      //state.error=''
    })
    builder.addCase(editEmployeeType.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default employeeTypeSlice.reducer;

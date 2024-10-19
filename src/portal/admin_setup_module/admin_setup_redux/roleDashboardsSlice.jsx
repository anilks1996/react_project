import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../serviceUrl/AxiosURL";


export const createRoleDashboard = createAsyncThunk("createRoleDashboard",async(data,{rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/roleDashboard/create", {
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

export const updateRoleDashboard=createAsyncThunk("updateRoleDashboard", async(data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/roleDashboard/edit/${data.id}`, {
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
export const deleteRoleDashboard=createAsyncThunk("deleteRoleDashboard", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/roleDashboard/delete/${id}`, {
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

export const findRoleDashboardById=createAsyncThunk("findRoleDashboardById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/roleDashboard/${id}`, {
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

export const findAllRoleDashboards=createAsyncThunk("findAllRoleDashboards", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/roleDashboard/", {
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

export const findRoleDashboardByRoleId=createAsyncThunk("findRoleDashboardByRoleId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/roleDashboard/byRoleId/${id}`, {
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

export const findRoleDashboardByDashboardWgtId=createAsyncThunk("findRoleDashboardByDashboardWgtId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/roleDashboard/byDashboardWgtId/${id}`, {
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

export const findDistinctRoleByRoleDashboard=createAsyncThunk("findDistinctRoleByRoleDashboard", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/roleDashboard/distinctRole", {
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

export const findDistinctDashboardWgtByRoleDashboard=createAsyncThunk("findDistinctDashboardWgtByRoleDashboard", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/roleDashboard/distinctDashboardWgt", {
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

export const roleDashboardsSlice = createSlice({
    name:'roleDashboardsSlice',
    initialState:{
        roleDashboard:[],
        roleDashboards:[],
        group:[],
        rdLoading:[],
        loading:false,
        error:null,
    },
    extraReducers : (builder)=>{
        builder.addCase(createRoleDashboard.pending, (state)=>{state.loading=true; })
        builder.addCase(createRoleDashboard.fulfilled, (state, action)=>{ state.loading=false; state.roleDashboards=action.payload; state.error=''; })
        builder.addCase(createRoleDashboard.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(updateRoleDashboard.pending, (state)=>{state.loading=true; })
        builder.addCase(updateRoleDashboard.fulfilled, (state, action)=>{ state.loading=false; state.roleDashboard=action.payload; state.error=''; })
        builder.addCase(updateRoleDashboard.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(deleteRoleDashboard.pending, (state)=>{state.loading=true; })
        builder.addCase(deleteRoleDashboard.fulfilled, (state, action)=>{ state.loading=false; state.roleDashboards=action.payload; state.error=''; })
        builder.addCase(deleteRoleDashboard.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findRoleDashboardById.pending, (state)=>{state.loading=true; })
        builder.addCase(findRoleDashboardById.fulfilled, (state, action)=>{ state.loading=false; state.roleDashboard=action.payload; state.error=''; })
        builder.addCase(findRoleDashboardById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findAllRoleDashboards.pending, (state)=>{state.loading=true; })
        builder.addCase(findAllRoleDashboards.fulfilled, (state, action)=>{ state.loading=false; state.roleDashboards=action.payload; state.error=''; })
        builder.addCase(findAllRoleDashboards.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findRoleDashboardByRoleId.pending, (state)=>{state.rdLoading=true; })
        builder.addCase(findRoleDashboardByRoleId.fulfilled, (state, action)=>{ state.rdLoading=false; state.roleDashboards=action.payload; state.error=''; })
        builder.addCase(findRoleDashboardByRoleId.rejected, (state, action)=>{state.rdLoading=false; state.error=action.payload; })
       //
        builder.addCase(findRoleDashboardByDashboardWgtId.pending, (state)=>{state.rdLoading=true; })
        builder.addCase(findRoleDashboardByDashboardWgtId.fulfilled, (state, action)=>{ state.rdLoading=false; state.roleDashboards=action.payload; state.error=''; })
        builder.addCase(findRoleDashboardByDashboardWgtId.rejected, (state, action)=>{state.rdLoading=false; state.error=action.payload; })
        
        builder.addCase(findDistinctRoleByRoleDashboard.pending, (state)=>{state.rdLoading=true; })
        builder.addCase(findDistinctRoleByRoleDashboard.fulfilled, (state, action)=>{ state.rdLoading=false; state.roleDashboards=action.payload; state.error=''; })
        builder.addCase(findDistinctRoleByRoleDashboard.rejected, (state, action)=>{state.rdLoading=false; state.error=action.payload; })
        
        builder.addCase(findDistinctDashboardWgtByRoleDashboard.pending, (state)=>{state.rdLoading=true; })
        builder.addCase(findDistinctDashboardWgtByRoleDashboard.fulfilled, (state, action)=>{ state.rdLoading=false; state.roleDashboards=action.payload; state.error=''; })
        builder.addCase(findDistinctDashboardWgtByRoleDashboard.rejected, (state, action)=>{state.rdLoading=false; state.error=action.payload; })
       

    }
})

export default roleDashboardsSlice.reducer;
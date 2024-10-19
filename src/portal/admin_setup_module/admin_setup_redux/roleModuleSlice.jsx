import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../serviceUrl/AxiosURL";


export const createRoleModule = createAsyncThunk("createRoleModule",async(data,{rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/roleModule/create", {
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

export const updateRoleModule=createAsyncThunk("updateRoleModule", async(data, {rejectWithValue})=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/roleModule/edit/${data.id}`, {
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
export const deleteRoleModule=createAsyncThunk("deleteRoleModule", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/roleModule/delete/${id}`, {
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

export const findRoleModuleById=createAsyncThunk("findRoleModuleById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/roleModule/${id}`, {
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

export const findAllRoleModules=createAsyncThunk("findAllRoleModules", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+"api/roleModule/list", {
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

export const findDistinctRoleModules=createAsyncThunk("findDistinctRoleModules", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/roleModule/distinct", {
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


export const roleModuleSlice = createSlice({
    name:'roleModuleSlice',
    initialState:{
        roleModule:[],
        roleModules:[],
        group:[],
        rmLoading:[],
        loading:false,
        error:null,
    },
    extraReducers : (builder)=>{
        builder.addCase(createRoleModule.pending, (state)=>{state.loading=true; })
        builder.addCase(createRoleModule.fulfilled, (state, action)=>{ state.loading=false; state.roleModule=action.payload; state.error=''; })
        builder.addCase(createRoleModule.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(updateRoleModule.pending, (state)=>{state.loading=true; })
        builder.addCase(updateRoleModule.fulfilled, (state, action)=>{ state.loading=false; state.roleModule=action.payload; state.error=''; })
        builder.addCase(updateRoleModule.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(deleteRoleModule.pending, (state)=>{state.loading=true; })
        builder.addCase(deleteRoleModule.fulfilled, (state, action)=>{ state.loading=false; state.roleModules=action.payload; state.error=''; })
        builder.addCase(deleteRoleModule.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findRoleModuleById.pending, (state)=>{state.loading=true; })
        builder.addCase(findRoleModuleById.fulfilled, (state, action)=>{ state.loading=false; state.roleModule=action.payload; state.error=''; })
        builder.addCase(findRoleModuleById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findAllRoleModules.pending, (state)=>{state.loading=true; })
        builder.addCase(findAllRoleModules.fulfilled, (state, action)=>{ state.loading=false; state.roleModules=action.payload; state.error=''; })
        builder.addCase(findAllRoleModules.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findDistinctRoleModules.pending, (state)=>{state.loading=true; })
        builder.addCase(findDistinctRoleModules.fulfilled, (state, action)=>{ state.loading=false; state.roleModules=action.payload; state.error=''; })
        builder.addCase(findDistinctRoleModules.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       

    }
})

export default roleModuleSlice.reducer;
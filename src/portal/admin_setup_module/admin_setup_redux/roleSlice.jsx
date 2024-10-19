import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../serviceUrl/AxiosURL";


export const createRole = createAsyncThunk("createRole",async(data,{rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/role/create", {
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

export const updateRole=createAsyncThunk("updateRole", async(data, {rejectWithValue})=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/role/edit/${data.id}`, {
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
export const deleteRole=createAsyncThunk("deleteRole", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/role/delete/${id}`, {
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

export const findRoleById=createAsyncThunk("findRoleById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/role/${id}`, {
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

export const findAllRoles=createAsyncThunk("findAllRoles", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+"api/role/list", {
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

export const findAllRolesByUserId=createAsyncThunk("findAllRolesByUserId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/role/listByUserId/${id}`, {
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


export const roleSlice = createSlice({
    name:'roleSlice',
    initialState:{
        role:[],
        roles:[],
        group:[],
        loading:false,
        error:null,
    },
    extraReducers : (builder)=>{
        builder.addCase(createRole.pending, (state)=>{state.loading=true; })
        builder.addCase(createRole.fulfilled, (state, action)=>{ state.loading=false; state.role=action.payload; state.error=''; })
        builder.addCase(createRole.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(updateRole.pending, (state)=>{state.loading=true; })
        builder.addCase(updateRole.fulfilled, (state, action)=>{ state.loading=false; state.role=action.payload; state.error=''; })
        builder.addCase(updateRole.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(deleteRole.pending, (state)=>{state.loading=true; })
        builder.addCase(deleteRole.fulfilled, (state, action)=>{ state.loading=false; state.roles=action.payload; state.error=''; })
        builder.addCase(deleteRole.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findRoleById.pending, (state)=>{state.loading=true; })
        builder.addCase(findRoleById.fulfilled, (state, action)=>{ state.loading=false; state.role=action.payload; state.error=''; })
        builder.addCase(findRoleById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findAllRoles.pending, (state)=>{state.loading=true; })
        builder.addCase(findAllRoles.fulfilled, (state, action)=>{ state.loading=false; state.roles=action.payload; state.error=''; })
        builder.addCase(findAllRoles.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findAllRolesByUserId.pending, (state)=>{state.loading=true; })
        builder.addCase(findAllRolesByUserId.fulfilled, (state, action)=>{ state.loading=false; state.roles=action.payload; state.error=''; })
        builder.addCase(findAllRolesByUserId.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       

    }
})

export default roleSlice.reducer;
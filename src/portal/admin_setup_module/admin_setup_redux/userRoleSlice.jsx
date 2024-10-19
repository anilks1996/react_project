import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../serviceUrl/AxiosURL";


export const createUserRole = createAsyncThunk("createUserRole",async(data,{rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/userRole/create", {
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

export const updateUserRole=createAsyncThunk("updateUserRole", async(data, {rejectWithValue})=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/userRole/edit/${data.id}`, {
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
export const deleteUserRole=createAsyncThunk("deleteUserRole", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/userRole/delete/${id}`, {
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

export const findUserRoleById=createAsyncThunk("findUserRoleById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/userRole/${id}`, {
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
//By UserId,RoleId,userGroupId
export const findUserRoleByAppUserId=createAsyncThunk("findUserRoleByAppUserId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/userRole/byUserId/${id}`, {
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
export const findUserRoleByRoleId=createAsyncThunk("findUserRoleByRoleId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/userRole/byRoleId/${id}`, {
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
export const findUserRoleByUserGroupId=createAsyncThunk("findUserRoleByUserGroupId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/userRole/byUserGroupId/${id}`, {
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

export const findAllUserRoles=createAsyncThunk("findAllUserRoles", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+"api/userRole/list", {
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



export const userRoleSlice = createSlice({
    name:'userRoleSlice',
    initialState:{
        userRole:[],
        userRoles:[],
        userRolesByUser:[],
        userRolesByRole:[],
        userRolesByGroup:[],
        group:[],
        loading:false,
        urLoading:[],
        error:null,
    },
    extraReducers : (builder)=>{
        builder.addCase(createUserRole.pending, (state)=>{state.loading=true; })
        builder.addCase(createUserRole.fulfilled, (state, action)=>{ state.loading=false; state.userRole=action.payload; state.error=''; })
        builder.addCase(createUserRole.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(updateUserRole.pending, (state)=>{state.loading=true; })
        builder.addCase(updateUserRole.fulfilled, (state, action)=>{ state.loading=false; state.userRoles=action.payload; state.error=''; })
        builder.addCase(updateUserRole.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(deleteUserRole.pending, (state)=>{state.loading=true; })
        builder.addCase(deleteUserRole.fulfilled, (state, action)=>{ state.loading=false; state.userRoles=action.payload; state.error=''; })
        builder.addCase(deleteUserRole.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findUserRoleById.pending, (state)=>{state.loading=true; })
        builder.addCase(findUserRoleById.fulfilled, (state, action)=>{ state.loading=false; state.userRole=action.payload; state.error=''; })
        builder.addCase(findUserRoleById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findAllUserRoles.pending, (state)=>{state.loading=true; })
        builder.addCase(findAllUserRoles.fulfilled, (state, action)=>{ state.loading=false; state.userRoles=action.payload; state.error=''; })
        builder.addCase(findAllUserRoles.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findUserRoleByAppUserId.pending, (state)=>{state.loading=true; })
        builder.addCase(findUserRoleByAppUserId.fulfilled, (state, action)=>{ state.loading=false; state.userRolesByUser=action.payload; state.error=''; })
        builder.addCase(findUserRoleByAppUserId.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
        
        builder.addCase(findUserRoleByRoleId.pending, (state)=>{state.urLoading=true; })
        builder.addCase(findUserRoleByRoleId.fulfilled, (state, action)=>{ state.urLoading=false; state.userRolesByRole=action.payload; state.error=''; })
        builder.addCase(findUserRoleByRoleId.rejected, (state, action)=>{state.urLoading=false; state.error=action.payload; })
        
        builder.addCase(findUserRoleByUserGroupId.pending, (state)=>{state.loading=true; })
        builder.addCase(findUserRoleByUserGroupId.fulfilled, (state, action)=>{ state.loading=false; state.userRolesByGroup=action.payload; state.error=''; })
        builder.addCase(findUserRoleByUserGroupId.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       

    }
})

export default userRoleSlice.reducer;
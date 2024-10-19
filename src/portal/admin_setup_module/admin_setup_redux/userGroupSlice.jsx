import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../serviceUrl/AxiosURL";


export const createUserGroup = createAsyncThunk("createUserGroup",async(data,{rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/userGroup/create", {
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

export const updateUserGroup=createAsyncThunk("updateUserGroup", async(data, {rejectWithValue})=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/userGroup/edit/${data.id}`, {
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
export const deleteUserGroup=createAsyncThunk("deleteUserGroup", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/userGroup/delete/${id}`, {
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

export const findUserGroupById=createAsyncThunk("findUserGroupById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/userGroup/byId/${id}`, {
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

export const findAllUserGroups=createAsyncThunk("findAllUserGroups", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+"api/userGroup/list", {
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



export const userGroupSlice = createSlice({
    name:'userGroupSlice',
    initialState:{
        userGroup:[],
        userGroups:[],
        group:[],
        loading:false,
        error:null,
    },
    extraReducers : (builder)=>{
        builder.addCase(createUserGroup.pending, (state)=>{state.loading=true; })
        builder.addCase(createUserGroup.fulfilled, (state, action)=>{ state.loading=false; state.userGroup=action.payload; state.error=''; })
        builder.addCase(createUserGroup.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(updateUserGroup.pending, (state)=>{state.loading=true; })
        builder.addCase(updateUserGroup.fulfilled, (state, action)=>{ state.loading=false; state.userGroup=action.payload; state.error=''; })
        builder.addCase(updateUserGroup.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(deleteUserGroup.pending, (state)=>{state.loading=true; })
        builder.addCase(deleteUserGroup.fulfilled, (state, action)=>{ state.loading=false; state.userGroups=action.payload; state.error=''; })
        builder.addCase(deleteUserGroup.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findUserGroupById.pending, (state)=>{state.loading=true; })
        builder.addCase(findUserGroupById.fulfilled, (state, action)=>{ state.loading=false; state.userGroup=action.payload; state.error=''; })
        builder.addCase(findUserGroupById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findAllUserGroups.pending, (state)=>{state.loading=true; })
        builder.addCase(findAllUserGroups.fulfilled, (state, action)=>{ state.loading=false; state.userGroups=action.payload; state.error=''; })
        builder.addCase(findAllUserGroups.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       

    }
})

export default userGroupSlice.reducer;